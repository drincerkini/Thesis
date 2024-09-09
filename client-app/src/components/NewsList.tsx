// src/components/NewsList.tsx
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import newsStore from "../stores/newsStore"; // Import your news store
import { Link } from "react-router-dom";

const NewsList: React.FC = () => {
  useEffect(() => {
    newsStore.fetchNews(); // Fetch the news on component mount
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Latest News</h2>
        {newsStore.loading ? (
          <div className="text-center text-blue-500">Loading...</div>
        ) : newsStore.error ? (
          <div className="text-center text-red-500">{newsStore.error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsStore.newsList.map((newsItem) => (
              <div
                key={newsItem._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={`../../public/uploads/${newsItem.image.filename}`}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{newsItem.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(newsItem.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    {newsItem.content.substring(0, 100)}...
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
    </section>
  );
};

export default observer(NewsList);
