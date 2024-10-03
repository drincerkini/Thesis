import React from "react";
import ApplicationFormComponent from "../../components/Applications/ApplicationFormComponent";

const ApplicationPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 mb-10">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="flex flex-col">
          <h3 className="text-center text-3xl font-semibold mt-8">
            Apply for University
          </h3>
          <div className="p-8">
            <ApplicationFormComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
