import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/HeroImage.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-red-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse lg:flex-row items-center">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4 animate-fadeInUp">
            Donate Blood, Save Lives
          </h1>
          <p className="text-gray-700 text-lg mb-6 animate-fadeInUp delay-150">
            Join our community of heroes and make a difference today. Your
            single donation can save multiple lives.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 animate-fadeInUp delay-300">
            <Link
              to="/register"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:bg-red-700 transform hover:-translate-y-1 transition duration-300"
            >
              Become a Donor
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transform hover:-translate-y-1 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 relative animate-float">
          <img
            src={heroImage}
            alt="Blood Donation"
            className="w-full rounded-lg shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
          />
          {/* Optional animated circles for decoration */}
          <span className="absolute -top-10 -left-10 w-24 h-24 bg-red-200 rounded-full opacity-50 animate-pulseSlow"></span>
          <span className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-300 rounded-full opacity-40 animate-pulseSlow delay-200"></span>
        </div>
      </div>

      {/* Decorative SVG Waves */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-24"
        >
          <path
            d="M0,0V46.29c47.61,22.62,104.44,28.54,158,9.57,70.18-24.64,136.08-64.91,208-67.36,81-2.8,155,35.22,236,44.86,85,10.13,169-7.41,252-35.37,85-28.43,168-64.21,252-52.23,43,6.21,83,23.71,125,34.1V0Z"
            opacity=".25"
            className="fill-red-600"
          ></path>
          <path
            d="M0,0V15.81C47.61,37.4,104.44,43.32,158,24.35c70.18-24.64,136.08-64.91,208-67.36,81-2.8,155,35.22,236,44.86,85,10.13,169-7.41,252-35.37,85-28.43,168-64.21,252-52.23,43,6.21,83,23.71,125,34.1V0Z"
            opacity=".5"
            className="fill-red-500"
          ></path>
          <path
            d="M0,0V5.81C47.61,27.4,104.44,33.32,158,14.35c70.18-24.64,136.08-64.91,208-67.36,81-2.8,155,35.22,236,44.86,85,10.13,169-7.41,252-35.37,85-28.43,168-64.21,252-52.23,43,6.21,83,23.71,125,34.1V0Z"
            className="fill-red-400"
          ></path>
        </svg>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
          .animate-fadeInUp.delay-150 { animation-delay: 0.15s; }
          .animate-fadeInUp.delay-300 { animation-delay: 0.3s; }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }

          @keyframes pulseSlow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          .animate-pulseSlow { animation: pulseSlow 6s ease-in-out infinite; }
          .animate-pulseSlow.delay-200 { animation-delay: 2s; }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
