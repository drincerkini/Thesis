import React from "react";

const FeaturesSectionComponent: React.FC = () => {
  return (
    <>
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose Our University?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                World-Class Education
              </h3>
              <p className="text-gray-600">
                Our university offers top-tier academic programs, taught by
                highly qualified professors who are leaders in their fields.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                State-of-the-Art Facilities
              </h3>
              <p className="text-gray-600">
                From modern labs to extensive libraries and cutting-edge
                technology, our facilities provide the tools you need to excel.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                Global Opportunities
              </h3>
              <p className="text-gray-600">
                With exchange programs, internships, and partnerships with
                leading universities worldwide, we prepare you for a global
                career.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSectionComponent;
