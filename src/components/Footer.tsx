"use client";
import React from "react";
import Image from "next/image";
import ImageCarousel from "./ImageCarrousel";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <div className="flex flex-col w-full relative">
        <div className="bg-[#eedfb5] flex items-center justify-evenly">
          <div className="container mx-auto my-8 flex">
            <ImageCarousel />
          </div>
        </div>
      </div>
      <footer className="bg-[#D99153] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Contactez-nous</h2>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@trucknburger.com"
                  className="text-black"
                >
                  contact@trucknburger.com
                </a>
              </p>
              <p>
                Téléphone:{" "}
                <a href="tel:+33123456789" className="text-black">
                  +33 1 23 45 67 89
                </a>
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Liens Utiles</h2>
              <ul>
                <li>
                  <Link href="/privacy-policy" legacyBehavior>
                    <a className="text-black">Politique de confidentialité</a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" legacyBehavior>
                    <a className="text-black">Conditions d&apos;utilisation</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-bold mb-2">Suivez-nous</h2>
              <div className="flex space-x-4">
                <Link href="https://facebook.com/trucknburger" legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-6 h-6 text-black hover:text-white" />
                  </a>
                </Link>
                <Link href="https://instagram.com/trucknburger" legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6 text-black hover:text-white" />
                  </a>
                </Link>
                <Link href="https://twitter.com/trucknburger" legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-6 h-6 text-black hover:text-white" />
                  </a>
                </Link>
                <Link
                  href="https://linkedin.com/company/trucknburger"
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-6 h-6 text-black hover:text-white" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} Matthieu Griffon. Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
