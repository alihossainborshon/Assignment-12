import logo from "../../assets/logo.png";

export const TourGuidesSection = ({ guides }) => {
  return (
    <section className="py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-12 h-12 inline" />
        <h2 className="text-4xl font-oleo text-[#000000] bg-clip-text ">
          Our Tour Guides
        </h2>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {guides.map((guide) => (
          <div
            key={guide._id}
            className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-[#ff9639] to-[#d21f1f] transition-transform hover:scale-105"
          >
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center h-full">
              <div className="relative">
                <div className="p-[2px] rounded-full bg-gradient-to-r from-[#ff9639] to-[#d21f1f]">
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              </div>
              <h4 className="mt-3 text-lg font-semibold text-[#d21f1f] group-hover:font-oleo transition">
                {guide.name}
              </h4>
              <p className="text-sm text-gray-500 ">
                {guide.experience || "Experienced Tour Guide"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
