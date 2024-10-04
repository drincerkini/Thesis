import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../others/Spinner";
import newsStore from "../../stores/newsStore";
import authStore from "../../stores/authStore";

const NewsListComponent: React.FC = () => {
  useEffect(() => {
    newsStore.fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await newsStore.deleteNews(id);
        toast.success("News deleted successfully");
      } catch (error) {
        toast.error("Failed to delete news");
      }
    }
  };

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold mx-auto">Latest News</h2>
          {authStore.isAuthenticated && (
            <Link
              to="/add-news"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              <i className="fas fa-plus mr-2"></i> Add New
            </Link>
          )}
        </div>
        {newsStore.loading ? (
          <Spinner />
        ) : newsStore.error ? (
          <div className="text-center text-red-500">{newsStore.error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsStore.newsList.map((newsItem) => (
              <div
                key={newsItem._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
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
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/news/${newsItem._id}`}
                      className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                    >
                      Read More
                    </Link>
                    {authStore.isAuthenticated && (
                      <button
                        onClick={() => handleDelete(newsItem._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default observer(NewsListComponent);
