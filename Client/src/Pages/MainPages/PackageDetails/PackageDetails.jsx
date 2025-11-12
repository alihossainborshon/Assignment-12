import { GallerySection } from "../../../components/PackageDetails/GallerySection";
import { AboutTourSection } from "../../../components/PackageDetails/AboutTourSection";
import { useLocation, useParams } from "react-router-dom";
import { TourPlanSection } from "../../../components/PackageDetails/TourPlanSection";
import { TourGuidesSection } from "../../../components/PackageDetails/TourGuidesSection";
import { BookingFormSection } from "../../../components/PackageDetails/BookingFormSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import img1 from "../../../assets/travel/bandorban.png";
import img2 from "../../../assets/travel/cox.png";
import img3 from "../../../assets/travel/sada_pathor.png";
import img4 from "../../../assets/travel/sajek.png";
import img5 from "../../../assets/travel/sentmartin.png";
import img6 from "../../../assets/travel/sundorban.png";
import logo from "../../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { LoadingSpinner } from "../../../components/Shared/LoadingSpinner";

export const PackageDetails = () => {
  const { Loading } = useContext(AuthContext);
  const location = useLocation();
  const { id } = useParams();
  const { packageData: stateData } = location.state || {};

  const { data: fetchedData, isLoading: packageLoading } = useQuery({
    queryKey: ["package-details", id],
    enabled: !stateData,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/packages/${id}`
      );
      return data;
    },
  });

  const packageData = stateData || fetchedData;

  // Guides fetch
  const fetchGuides = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/guides/random`
    );
    return data;
  };

  const { data: guides = [], isLoading: guidesLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
  });

  if (Loading || packageLoading || guidesLoading) {
    return <LoadingSpinner />;
  }

  const images = [img1, img2, img3, img4, img5, img6];

  const plans = [
    {
      day: 1,
      details:
        "Arrival, check-in, and local sightseeing. Enjoy a relaxing afternoon at Laboni Beach. In the evening, visit the local Burmese Market for shopping and local seafood dinner.",
    },
    {
      day: 2,
      details:
        "Beach visit and adventure activities. After breakfast, head to Inani and Himchari Beach for sightseeing and photography. Afternoon free for beach activities or parasailing. Enjoy sunset view from the beach.",
    },
    {
      day: 3,
      details:
        "Market tour and departure. Morning visit to Radiant Fish Market or local souvenir shops. Check-out from hotel after breakfast and depart for return journey with unforgettable memories.",
    },
  ];

  return (
    <section className="bg-base-100 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-5">
        <h1 className="flex items-center justify-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-14 h-14 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <span className="text-4xl font-bold font-dancing text-white bg-gradient-to-r from-blue-700 via-blue-900 to-black px-8 py-2 rounded-full shadow-lg">
            Package Details
          </span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover the beauty and adventure of Bangladesh with{" "}
          <span className="font-semibold text-blue-700">BD Travel</span>.
          Explore breathtaking landscapes, local culture, and unforgettable
          experiences through our curated travel packages.
        </p>
      </div>

      {/* Sections */}
      <div className="container mx-auto px-4 space-y-12">
        <GallerySection images={images} />
        <AboutTourSection
          about={packageData.description}
          name={packageData.spotName}
        />
        <TourPlanSection plans={plans} name={packageData.spotName} />
        <TourGuidesSection guides={guides} />
        <BookingFormSection pkg={packageData} guides={guides} />
      </div>
    </section>
  );
};
