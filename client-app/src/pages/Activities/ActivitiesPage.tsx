import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import activityStore from "../../stores/activityStore";
import authStore from "../../stores/authStore"; // Ensure this store handles user authentication status
import slide1 from "../../assets/uni.jpg"; // Default image if needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivitiesPage: React.FC = observer(() => {
  useEffect(() => {
    activityStore.fetchActivities(); // Fetch activities on component mount
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await activityStore.deleteActivity(id);
        toast.success("Activity deleted successfully");
      } catch (error) {
        toast.error("Failed to delete activity");
      }
    }
  };

  const shortenDescription = (description: string) => {
    // Adjust the length as necessary
    return description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 border-b-2 border-gray-600 pb-2 flex-1 text-center">
          Activities
        </h1>
        {authStore.isAuthenticated && (
          <Link
            to="/add-activity"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-4"
          >
            + Add Activity
          </Link>
        )}
      </div>

      {activityStore.loading && (
        <p className="text-center text-gray-400">Loading...</p>
      )}
      {activityStore.error && (
        <p className="text-center text-red-500">{activityStore.error}</p>
      )}

      <div className="flex flex-wrap -m-4">
        {activityStore.activityList.map((activity) => (
          <div key={activity._id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src={
                    activity.image?.filename
                      ? `/uploads/${activity.image.filename}`
                      : slide1
                  }
                  alt="Thumbnail"
                  className="w-full h-48 object-cover"
                />
                {/* Date display positioned absolutely */}
                <span className="absolute top-2 left-2 text-white bg-black bg-opacity-70 px-2 py-1 rounded-md">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
                {/* Category display positioned absolutely with red text */}
                <div className="absolute top-2 right-2 text-sm text-red-500 bg-opacity-70 px-2 py-1 rounded-md">
                  <span className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    {activity.category}
                  </span>
                </div>
              </div>
              <div className="p-5 text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-3">
                  <span className="text-red-500 font-medium">
                    {activity.title}
                  </span>
                </div>
                <h2 className="text-lg text-gray-300 mb-2 font-semibold">
                  {shortenDescription(activity.description)}
                </h2>
                <div className="text-sm text-red-500 mt-4">
                  <Link
                    to={`/activities/${activity._id}`} // Adjust this path as needed
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Read More
                  </Link>
                </div>
                {authStore.isAuthenticated && (
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="mt-4 text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
});

export default ActivitiesPage;
