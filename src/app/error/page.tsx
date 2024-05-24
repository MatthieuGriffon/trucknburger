"use client";
import "../../app/globals.css";
import React from "react";
import Image from "next/image";
import notFoundImage from "../../../public/img/notFoundImage.gif"; 

const Custom404: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "35vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
       <Image 
        src={notFoundImage} 
        alt="Page Not Found" 
        width={500} height={500}
        unoptimized
       />
      <h1>404 - Burger Not Found</h1>
      <p>Oops! It looks like you&apos;ve taken a wrong turn on your way to the best burger in town. Let&apos;s get you back on track!</p>
    </div>
  );
};

export default Custom404;
