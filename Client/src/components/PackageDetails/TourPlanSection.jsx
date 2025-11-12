import { useState } from "react";
import logo from "../../assets/logo.png";

export const TourPlanSection = ({ plans = [], name }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 space-y-8">
      <div className="flex items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-12 h-12 inline" />
        <h2 className="text-4xl font-oleo text-center text-[#111111]">
          Our Plans in {name}
        </h2> 
      </div>

      <div className="w-11/12 md:w-3/5 mx-auto space-y-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gradient-to-r from-[#ff9639] to-[#d21f1f] p-[2px] transition-transform hover:scale-[1.01]"
          >
            <div className="bg-white rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 text-lg font-marcellus font-semibold text-left transition-all"
              >
                <span className="text-gray-800 ">Day {plan.day}</span>
                <span className="text-2xl text-[#d21f1f]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="p-4 text-gray-600  border-t border-gray-200 dark:border-gray-700">
                  {plan.details}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
