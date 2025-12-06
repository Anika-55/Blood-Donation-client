import React from "react";
import {
  FaHandHoldingHeart,
  FaUserCheck,
  FaHospital,
  FaSmile,
} from "react-icons/fa";

const donationSteps = [
  {
    icon: <FaUserCheck size={36} className="text-red-600" />,
    title: "Register as a Donor",
    description:
      "Sign up and fill in your details to become a registered blood donor.",
  },
  {
    icon: <FaHandHoldingHeart size={36} className="text-red-600" />,
    title: "Schedule Appointment",
    description: "Choose a convenient date and center to donate blood safely.",
  },
  {
    icon: <FaHospital size={36} className="text-red-600" />,
    title: "Donate Blood",
    description:
      "Visit the center, complete the medical checkup, and donate blood.",
  },
  {
    icon: <FaSmile size={36} className="text-red-600" />,
    title: "Save Lives",
    description:
      "Your donation helps save multiple lives. Feel proud and happy!",
  },
];

const DonationSteps = () => {
  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-8">
          How to Donate Blood
        </h2>
        <p className="text-gray-700 mb-12">
          Follow these simple steps to make a lifesaving donation. It's safe,
          quick, and rewarding!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {donationSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition hover:-translate-y-2 hover:shadow-2xl duration-500"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional animation for steps connecting line */}
      <style>
        {`
          @media (min-width: 768px) {
            .grid-cols-4 > div:not(:last-child)::after {
              content: '';
              position: absolute;
              width: calc(100% + 2rem);
              height: 4px;
              background: #f87171; /* red-400 */
              top: 50%;
              left: 50%;
              transform: translateY(-50%) translateX(100%);
              z-index: -1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default DonationSteps;
