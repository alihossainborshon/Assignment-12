import React from "react";
import img1 from "../../assets/travel/bandorban.png";
import img2 from "../../assets/travel/cox.png";
import img3 from "../../assets/travel/sada_pathor.png";
import img4 from "../../assets/travel/sajek.png";
import img5 from "../../assets/travel/sentmartin.png";
import img6 from "../../assets/travel/sundorban.png";
import logo from "../../assets/logo.png";
import { GallerySection } from "../PackageDetails/GallerySection";

export const Gallery = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="flex items-center justify-center gap-4 ">
          <img src={logo} alt="logo" className="w-12" />
          <p className="text-4xl font-dancing font-semibold text-[#d8d8dd] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] px-6 py-1 rounded-full">
            Explore Our Gallery
          </p>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto mt-3">
          Discover the most breathtaking destinations and natural beauty of
          Bangladesh through our curated photo collection.
        </p>
      </div>
    

      {/* Gallery Images */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl  border border-white/10 p-6">
        <GallerySection images={images} />
      </div>
    </div>
  );
};
