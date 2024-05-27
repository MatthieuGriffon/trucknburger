import Image from "next/image";
import backgroundHome from "../../public/img/backgroundHome.webp";
import PreOrderMenu from "../components/PreOrderMenu";
import Map from "../components/Map";

export default function Home() {
  return (
    <section>
      <div className="relative h-[50vh] sm:h-[64.5vh] md:h-[80vh] lg:h-[85vh]">
        <Image
          priority
          placeholder="blur"
          quality={100}
          fill
          src={backgroundHome}
          alt="Background Page Home TrucknBurger"
          className="object-cover z-[-1]"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 md:left-10 md:w-1/4 z-10">
        <div className="bg-black bg-opacity-60 p-4 rounded text-center text-white">
          <h1 className="text-xl md:text-2xl">Bienvenue chez TrucknBurger !</h1>
          <p className="text-xs md:text-base text-justify">
            Vivez l&apos;ultime aventure de la street food avec TrucknBurger, votre food truck de référence pour des burgers maison savoureux ! Notre site web dynamique et interactif vous permet de suivre notre food truck à travers différentes villes, apportant nos délicieux burgers faits maison directement dans votre quartier.
          </p>
        </div>
      </div>
      <div id="section1">
        <PreOrderMenu />
      </div>
      <div id="section2">
        <section className="bg-[#eedfb5] flex flex-col w-full items-center py-8">
          <Map />
        </section>
      </div>
    </section>
  );
}