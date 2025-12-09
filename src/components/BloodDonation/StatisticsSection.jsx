import React, { useEffect, useState, useRef } from "react";
import {
  FaHeart,
  FaUsers,
  FaClinicMedical,
  FaHandsHelping,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const statsData = [
  {
    icon: <FaHeart size={40} className="text-red-500 animate-pulse" />,
    label: "Units Donated",
    value: 12500,
  },
  {
    icon: <FaUsers size={40} className="text-red-500 animate-pulse" />,
    label: "Lives Saved",
    value: 37000,
  },
  {
    icon: <FaClinicMedical size={40} className="text-red-500 animate-pulse" />,
    label: "Donation Camps",
    value: 150,
  },
  {
    icon: <FaHandsHelping size={40} className="text-red-500 animate-pulse" />,
    label: "Registered Donors",
    value: 4500,
  },
];

const StatisticsSection = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    statsData.forEach((stat, index) => {
      let start = null;
      const duration = 2000; // 2 seconds for counting

      const animateCount = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const value = Math.min(
          Math.floor((progress / duration) * stat.value),
          stat.value
        );

        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = value;
          return newCounts;
        });

        if (progress < duration) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    });
  }, [inView]);

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-r from-red-400 to-red-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-4xl font-bold  mb-12 bg-gradient-to-br from-sky-900 to-red-900 bg-clip-text text-transparent"
        >
          Our Impact So Far
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-gray-200 bg-opacity-20 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white border-opacity-30"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-red-700 mb-2">
                {counts[index].toLocaleString()}
              </h3>
              <p className="text-red-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
