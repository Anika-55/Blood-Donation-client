import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/AboutImage.jpg"; // Replace with your image

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src={aboutImage}
            alt="Who We Are"
            className="w-full rounded-xl shadow-lg object-cover animate-fadeIn"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-red-600 mb-6">Who We Are</h2>
          <p className="text-gray-700 text-lg mb-6">
            We are a passionate team dedicated to saving lives through voluntary
            blood donation. We connect donors with those in need and raise
            awareness about the importance of giving blood. Join us and become
            part of a community that makes a real difference!
          </p>

          <Link
            to="/register"
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
          >
            Donate Now
          </Link>
        </div>
      </div>

      {/* Optional fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
        `}
      </style>
    </section>
  );
};

export default WhoWeAre;
