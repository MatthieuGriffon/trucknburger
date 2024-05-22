import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv';
import { Adapter } from "next-auth/adapters";
import bcrypt from 'bcrypt';
import { compare } from 'bcrypt';  // 
dotenv.config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.PGPORT || '5432', 10),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

interface Credentials {
  email: string;
  password: string;
  
}

async function findUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

async function createUser({ email, password }: Credentials) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
}

async function updateUserLoginTimestamp(email: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'UPDATE users SET updated_at = NOW() WHERE email = $1 RETURNING *',
      [email]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
}

const handler = NextAuth({
  adapter: PostgresAdapter(pool) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Credentials | undefined, req) {
        if (!credentials) {
          return null;
        }
        
        const { email, password } = credentials;

        // Vérifiez si l'utilisateur existe dans la base de données
        const user = await findUserByEmail(email);
        console.log("User du routes.ts", user)
        if (user) {
          const isValidPassword = await compare(password, user.password);
          if (isValidPassword) {
            const updatedUser = await updateUserLoginTimestamp(email);
            return updatedUser;
          } else {
            return null;
          }
        } else {
          const newUser = await createUser({ email, password });
          return newUser;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.updated_at = token.updated_at as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.updated_at = user.updated_at;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
