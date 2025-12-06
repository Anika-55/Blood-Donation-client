import React, { useState, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import faqImage from "../../assets/Image4.jpg";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Anyone aged 18-65, in good health, and weighing at least 50 kg can donate blood. Certain medical conditions may prevent donation.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Whole blood donations can be made every 3 months, while platelet donations can be done more frequently.",
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes! Blood donation is safe. All equipment is sterile and used only once, and the process is carefully monitored.",
  },
  {
    question: "How will my donation help?",
    answer:
      "Your blood can save up to three lives. Donated blood is used for surgeries, emergencies, anemia treatments, and more.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".faq-card");
      const windowBottom = window.innerHeight + window.scrollY;

      cards.forEach((card, index) => {
        const cardTop = card.offsetTop + 100; // trigger 100px before
        if (windowBottom > cardTop) {
          setVisibleCards((prev) => {
            if (!prev.includes(index)) return [...prev, index];
            return prev;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - FAQs */}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-red-600 mb-8">
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-card bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] duration-700 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center text-red-600 font-semibold focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <FaTint className="text-red-600 animate-bounce" />
                  <span className="text-lg sm:text-xl">{faq.question}</span>
                </div>
                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`px-6 pb-5 text-gray-700 text-base transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 pt-2" : "max-h-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src={faqImage}
            alt="FAQ Illustration"
            className="w-full rounded-xl shadow-lg object-cover animate-fadeIn"
          />
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </section>
  );
};

export default FAQSection;
