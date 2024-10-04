import React from "react";
import slide1 from "../../assets/uni.jpg";

const Activities = () => {
  // Sample data for display
  const activities = [
    {
      _id: "1",
      image: { filename: slide1 },
      title: "Activity Title 1",
      description: "Description of Activity 1",
      category: "Category 1",
      createdAt: "2023-10-03",
    },
    {
      _id: "2",
      image: { filename: slide1 },
      title: "Activity Title 2",
      description: "Description of Activity 2",
      category: "Category 2",
      createdAt: "2023-09-25",
    },
    {
      _id: "3",
      image: { filename: slide1 },
      title: "Activity Title 3",
      description: "Description of Activity 3",
      category: "Category 3",
      createdAt: "2023-09-20",
    },
    {
      _id: "4",
      image: { filename: slide1 },
      title: "Activity Title 3",
      description: "Description of Activity 3",
      category: "Category 3",
      createdAt: "2023-09-20",
    },
  ];

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex flex-wrap -m-4">
        {activities.map((info) => (
          <div key={info._id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`${info.image.filename}`}
                alt="Thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>{info.createdAt}</span>
                  <span className="text-red-500 font-medium">{info.title}</span>
                </div>
                <h2 className="text-lg text-gray-300 mb-2 font-semibold">
                  {info.description}
                </h2>
                <div className="text-sm text-red-500 mt-4">
                  <a
                    href="#"
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    {info.createdAt}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
