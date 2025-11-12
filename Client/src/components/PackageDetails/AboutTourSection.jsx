import React from "react";
import logo from "../../assets/logo.png";

export const AboutTourSection = ({ about, name }) => {
  return (
    <section className="py-10 space-y-6">
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-12 h-12 inline" />
        <h2 className="text-4xl font-oleo">About {name}</h2>
      </div>

      {/* gradient text */}
      <p
        className="w-2/3 mx-auto text-center 
        bg-gradient-to-r from-[#ff9639] to-[#d21f1f]
        bg-clip-text text-transparent 
        leading-relaxed font-marcellus"
      > 
        {about}
      </p>
    </section>
  );
};
