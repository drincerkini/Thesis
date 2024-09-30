import React from "react";

const FeaturesSectionComponent: React.FC = () => {
  return (
    <>
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Manage Departments</h3>
              <p className="text-gray-600">
                Easily add, edit, or delete departments from the university.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Student Directory</h3>
              <p className="text-gray-600">
                Access a comprehensive list of students with filtering options.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                User Authentication
              </h3>
              <p className="text-gray-600">
                Secure login and registration system to manage user access.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSectionComponent;
