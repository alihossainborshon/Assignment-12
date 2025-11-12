import React from "react";
import { FaTools, FaUserTie, FaCloudSun } from "react-icons/fa";
import logoHero from "../../assets/logo.png";

export const OurServe = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-[clamp(1rem,3vw,4rem)] px-[clamp(1rem,4vw,6rem)] py-[clamp(2rem,5vw,8rem)]">
      {/* Section Header */}
      <div className="text-center md:text-left space-y-[clamp(0.5rem,1.5vw,2rem)] md:pl-4">
        <div className="inline-flex items-center gap-3 font-dancing text-[clamp(1rem,2vw,1.5rem)] font-semibold text-[#d8d8dd] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] px-6 py-1 rounded-full">
          <p>What We Serve</p>
          <img className="w-[clamp(1.5rem,3vw,2.5rem)] object-contain" src={logoHero} alt="logo" />
        </div>
        <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] md:text-[clamp(2.5rem,4vw,3rem)] font-marcellus font-medium text-gray-800 leading-snug">
          We Offer Our Best Service
        </h2>
      </div>

      {/* Service Cards */}
      <div className="flex justify-center md:justify-end gap-[clamp(1rem,2vw,3rem)] md:w-2/3 flex-wrap md:flex-nowrap">
        {/* card 1 */}
        <div className="relative w-[clamp(15rem,22vw,18rem)] rounded-2xl px-[3px] pb-[3px] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#182646] transition-all duration-300">
          <div className="card bg-base-100 w-full h-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <span className="text-[clamp(2rem,5vw,3rem)] text-[#0d389d] mb-3">
                <FaTools />
              </span>
              <h2 className="card-title mb-2 text-[clamp(1rem,2vw,1.25rem)]">Customization</h2>
              <p className="text-gray-600 text-[clamp(0.8rem,1vw,1rem)]">
                Flexible customization options to fit your unique travel preferences perfectly.
              </p>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div className="relative w-[clamp(15rem,22vw,18rem)] rounded-2xl px-[3px] pb-[3px] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#182646] transition-all duration-300">
          <div className="card bg-base-100 w-full h-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <span className="text-[clamp(2rem,5vw,3rem)] text-[#0d389d] mb-3">
                <FaUserTie />
              </span>
              <h2 className="card-title mb-2 text-[clamp(1rem,2vw,1.25rem)]">Best Tour Guide</h2>
              <p className="text-gray-600 text-[clamp(0.8rem,1vw,1rem)]">
                Our professional guides ensure fun, safety, and unforgettable memories on every trip.
              </p>
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div className="relative w-[clamp(15rem,22vw,18rem)] rounded-2xl px-[3px] pb-[3px] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#182646] transition-all duration-300">
          <div className="card bg-base-100 w-full h-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <span className="text-[clamp(2rem,5vw,3rem)] text-[#0d389d] mb-3">
                <FaCloudSun />
              </span>
              <h2 className="card-title mb-2 text-[clamp(1rem,2vw,1.25rem)]">Calculate Weather</h2>
              <p className="text-gray-600 text-[clamp(0.8rem,1vw,1rem)]">
                Get accurate weather updates for a smooth and well-planned journey every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
