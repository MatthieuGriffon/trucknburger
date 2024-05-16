import React from 'react';
import Image from 'next/image';

const images = [
  '/img/glaces.webp',
  '/img/wrap.webp',
  '/img/burger01.webp',
  '/img/wrap01.webp',
  '/img/potatoes.webp',
  '/img/glaces - Copie.webp',
  '/img/wrap - Copie.webp',
  '/img/burger01 - Copie.webp',
  '/img/wrap01 - Copie.webp',
  '/img/potatoes - Copie.webp',
];

const ImageCarousel: React.FC = () => {
  return (
    <div className="relative overflow-hidden h-[7.7rem]">
      <div className="flex w-[200%] animate-marquee whitespace-nowrap">
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 inline-block min-w-[140px] max-w-[140px] px-2"
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={140}
              height={140}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
        {images.map((src, index) => (
          <div
            key={index + images.length}
            className="flex-shrink-0 inline-block min-w-[140px] max-w-[140px] px-2"
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={140}
              height={140}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
