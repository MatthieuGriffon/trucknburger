import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt';

// Informations de connexion à la base de données en dur
const DATABASE_HOST = '85.215.39.148';
const DATABASE_USER = 'abolas';
const DATABASE_PASSWORD = '44Xstd6f-@';
const DATABASE_NAME = 'TrucknBurger';
const PGPORT = 5432;

const pool = new Pool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function createTestUser() {
  const email = 'tounoui.grifffon@test.com';
  const name = 'Test User';
  const password = '123456'; // Mot de passe à hacher
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *',
      [email, name, hashedPassword]
    );
    console.log('User created:', res.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    client.release();
  }
}

createTestUser().catch((error) => console.error('Unexpected error:', error));