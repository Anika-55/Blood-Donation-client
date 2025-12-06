import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection";
import DonationSteps from "../../components/BloodDonation/DonationSteps";
import WhoWeAre from "../../components/BloodDonation/WhoWeAre";
import FAQSection from "../../components/BloodDonation/FQASection";
import StatisticsSection from "../../components/BloodDonation/StatisticsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <DonationSteps />

      <WhoWeAre />
      <StatisticsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
