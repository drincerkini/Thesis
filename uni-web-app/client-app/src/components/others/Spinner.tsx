import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
