import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { observer } from "mobx-react-lite";

interface INews {
  _id: string;
  title: string;
  content: string;
  image: {
    filename: string;
    mimetype: string;
    size: number;
    url: string;
  };
  createdAt: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [newsItem, setNewsItem] = useState<INews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get<INews>(
          `http://localhost:5001/api/news/${id}`
        );
        setNewsItem(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch news details.");
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading)
    return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {newsItem && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={`../../public/uploads/${newsItem.image.filename}`}
              alt={newsItem.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(newsItem.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-6">{newsItem.content}</p>
              <button
                onClick={handleGoBack}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(NewsDetail);
