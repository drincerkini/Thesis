import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import newsStore from "../stores/newsStore"; // Import your news store
import { Link } from "react-router-dom";

const NewsList: React.FC = () => {
  useEffect(() => {
    newsStore.fetchNews(); // Fetch the news on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-center mb-10">
          University News
        </h1>
        {newsStore.loading ? (
          <div className="text-center text-blue-500">Loading...</div>
        ) : newsStore.error ? (
          <div className="text-center text-red-500">{newsStore.error}</div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-center">
            {newsStore.newsList.map((newsItem) => (
              <div
                key={newsItem._id}
                className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <img
                  src={`../../public/uploads/${newsItem.image.filename}`}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{newsItem.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(newsItem.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/news/${newsItem._id}`}
                    className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(NewsList);
