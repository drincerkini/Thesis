import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import newsStore from "../stores/newsStore"; // Import your news store
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsList: React.FC = () => {
  useEffect(() => {
    newsStore.fetchNews(); // Fetch the news on component mount
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
          <Link
            to="/add-news" // Adjust the path as needed
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            <i className="fas fa-plus mr-2"></i> Add New
          </Link>
        </div>
        {newsStore.loading ? (
          <div className="text-center text-blue-500">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
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
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Read More
                    </Link>
                    <button
                      onClick={() => handleDelete(newsItem._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
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

export default observer(NewsList);
