import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logo from "../../assets/logo.png";
import { PackageCard } from "../Shared/PackageCard";
import { GuideCard } from "../Shared/GuideCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { GuideDescriptionModal } from './../Modal/GuideDescriptionModal ';

export const HomeTab = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [currentGuidePage, setCurrentGuidePage] = useState(1);
  const itemsPerPage = 6;

  // Fetch Random Packages
  const fetchPackages = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/packages/random`
    );
    return data;
  };

  // Fetch All Guides
  const fetchGuides = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/guides/random`
    );
    return data;
  };

  const { data: packages, isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const { data: guides, isLoading: guidesLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
  });

  // Guides Pagination Logic
  const totalGuidePages = Math.ceil((guides?.length || 0) / itemsPerPage);
  const startIndex = (currentGuidePage - 1) * itemsPerPage;
  const currentGuides = guides?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-20">
      <Tabs>
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="flex items-center justify-center gap-4">
            <img src={logo} alt="logo" className="w-12" />
            <p className="text-4xl font-dancing font-semibold text-[#d8d8dd] bg-gradient-to-r from-[#0d389d] via-[#0a2d65] to-[#0f172a] px-6 py-1 rounded-full">
              Place & Person You Like
            </p>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3">
            Explore Bangladesh with its stunning beaches, hills, forests, and
            cultural heritage. Discover packages and meet expert tour guides.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex font-marcellus justify-center text-2xl font-semibold italic mt-10">
          <TabList>
            <Tab>Our Packages</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>
        </div>

        {/* Packages Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {packagesLoading
              ? "Loading packages..."
              : packages?.map((item) => (
                  <PackageCard key={item._id} item={item} />
                ))}
          </div>
        </TabPanel>

        {/* Guides Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {guidesLoading
              ? "Loading guides..."
              : currentGuides?.map((guide) => (
                  <GuideCard
                    key={guide._id}
                    item={guide}
                    onView={() => setSelectedGuide(guide)}
                  />
                ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={currentGuidePage === 1}
              onClick={() => setCurrentGuidePage((prev) => prev - 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalGuidePages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentGuidePage(i + 1)}
                className={`px-3 py-2 rounded-lg ${
                  currentGuidePage === i + 1
                    ? "bg-orange-700 text-white"
                    : "bg-orange-300 hover:bg-orange-400"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentGuidePage === totalGuidePages}
              onClick={() => setCurrentGuidePage((prev) => prev + 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Guide Modal */}
          {selectedGuide && (
            <GuideDescriptionModal
              guide={selectedGuide}
              onClose={() => setSelectedGuide(null)}
            />
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};
