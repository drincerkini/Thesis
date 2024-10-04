import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import activityStore from "../../stores/activityStore";

const ActivityDetailPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityDetail = async () => {
      if (id) {
        await activityStore.fetchActivityById(id);
      }
    };

    fetchActivityDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (activityStore.loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (activityStore.error) {
    return (
      <div className="text-center text-red-500">{activityStore.error}</div>
    );
  }

  const activityItem = activityStore.currentActivity;

  return (
    <div className="container mx-auto mt-8 px-4">
      {activityItem && (
        <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={
                activityItem.image?.filename
                  ? `/uploads/${activityItem.image.filename}`
                  : "/path/to/default/image.jpg"
              }
              alt={activityItem.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            {/* Date display at the top left */}
            <span className="absolute top-2 left-2 text-white bg-black bg-opacity-70 px-2 py-1 rounded-md">
              {new Date(activityItem.createdAt).toLocaleDateString()}
            </span>
            {/* Category display positioned at the top right */}
            <div className="absolute top-2 right-2 text-sm text-red-500 bg-opacity-70 px-2 py-1 rounded-md">
              <span className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                {activityItem.category}
              </span>
            </div>
          </div>
          <div className="p-6 text-gray-300">
            <h1 className="text-3xl font-bold mb-4">{activityItem.title}</h1>
            <p className="text-gray-300 mb-6">{activityItem.description}</p>
            <button
              onClick={handleGoBack}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default ActivityDetailPage;
