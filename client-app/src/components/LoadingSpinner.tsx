import "../index.css";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-200 opacity-75">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-24 w-24"></div>
    </div>
  );
};

export default LoadingSpinner;
