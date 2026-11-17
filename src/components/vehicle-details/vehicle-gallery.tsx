"use client";

import { useState } from "react";
import Image from "next/image";

interface VehicleGalleryProps {
  vehicleName: string;
  images: {
    main: string;
    interior: string;
    rear: string;
    battery: string;
  };
}

export function VehicleGallery({ vehicleName, images }: VehicleGalleryProps) {
  const galleryList = [
    { id: "main", src: images.main, alt: `${vehicleName} Front Exterior` },
    { id: "interior", src: images.interior, alt: `${vehicleName} Cockpit & Interior` },
    { id: "rear", src: images.rear, alt: `${vehicleName} Rear Angle` },
    { id: "battery", src: images.battery, alt: `${vehicleName} Battery & Powertrain Architecture` },
  ];

  const [activeImage, setActiveImage] = useState(galleryList[0].src);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
      {/* Featured Large Main Image */}
      <div className="relative flex-1 min-h-[280px] sm:min-h-[380px] md:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-slate-900 shadow-md">
        <Image
          src={activeImage}
          alt={vehicleName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-cover object-center transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Vertical Thumbnails Stack on the Right */}
      <div className="flex sm:flex-col gap-3 w-full sm:w-36 md:w-44 shrink-0">
        {galleryList.slice(1).map((item) => {
          const isActive = activeImage === item.src;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveImage(item.src)}
              className={`relative flex-1 min-h-[90px] sm:min-h-[115px] md:min-h-[135px] w-full rounded-xl overflow-hidden border-2 transition-all duration-200 group bg-slate-900 ${
                isActive
                  ? "border-[#00DF8F] shadow-[0_0_12px_rgba(0,223,143,0.35)]"
                  : "border-slate-200 dark:border-slate-800/80 hover:border-slate-400 dark:hover:border-slate-600 opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 33vw, 180px"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
