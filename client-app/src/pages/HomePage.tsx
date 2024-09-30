import React from "react";
import BannerSectionComponent from "../components/Home/BannerSectionComponent";
import CallToActionComponent from "../components/Home/CallToActionComponent";
import FeaturesSectionComponent from "../components/Home/FeaturesSectionComponent";
import NewsListComponent from "../components/Home/NewsListComponent";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Banner Section */}
      <BannerSectionComponent />

      {/* Features Section */}
      <FeaturesSectionComponent />

      {/* News List Section */}
      <NewsListComponent />

      {/* Call to Action Section */}
      <CallToActionComponent />
    </div>
  );
};

export default HomePage;
