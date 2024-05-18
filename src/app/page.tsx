import Image from "next/image";
import backgroundHome from "../../public/img/backgroundHome.webp";
import PreOrderMenu from "../components/PreOrderMenu";
import Map from "../components/Map";

export default function Home() {
  return (
    <section>
      <div className="relative h-[64.5vh]">
        <Image
          priority
          placeholder="blur"
          quality={100}
          fill
          src={backgroundHome}
          alt="Background Page Home TrucknBurger"
          style={{
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      </div>
      <div className="absolute top-0 left-10 w-1/4 h-full flex items-center justify-center z-10">
        <div className="text-l text-center text-white bg-black bg-opacity-60 p-4 rounded">
          <h1>Bienvenue chez TrucknBurger !</h1>
          <p className="text-justify">
            Vivez l&apos;ultime aventure de la street food avec TrucknBurger,
            votre food truck de référence pour des burgers maison savoureux !
            Notre site web dynamique et interactif vous permet de suivre notre
            food truck à travers différentes villes, apportant nos délicieux
            burgers faits maison directement dans votre quartier.
          </p>
        </div>
      </div>
      <div id="section1">
      <PreOrderMenu />
      </div>
      <div id="section2">
      <section className=" bg-[#eedfb5] flex flex-col w-full items-center">
          <Map />
      </section>
      </div>
    </section>
  );
}
