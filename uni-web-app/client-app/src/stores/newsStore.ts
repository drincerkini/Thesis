import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

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

class NewsStore {
  newsList: INews[] = [];
  currentNews: INews | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  // GET all news
  async fetchNews() {
    this.setLoading(true);
    try {
      const response = await axios.get<INews[]>(
        "http://localhost:5001/api/news"
      );
      runInAction(() => {
        this.newsList = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch news");
        this.setLoading(false);
      });
    }
  }

  // GET news by ID
  async fetchNewsById(id: string) {
    this.setLoading(true);
    try {
      const response = await axios.get<INews>(
        `http://localhost:5001/api/news/${id}`
      );
      runInAction(() => {
        this.currentNews = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch news details.");
        this.setLoading(false);
      });
    }
  }

  // POST new news item
  async addNews(formData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("News added successfully", response.data);
    } catch (error) {
      console.error("Failed to add news", error);
      throw error;
    }
  }

  // DELETE a news item
  async deleteNews(id: string) {
    try {
      await axios.delete(`http://localhost:5001/api/news/${id}`);
      runInAction(() => {
        this.newsList = this.newsList.filter((news) => news._id !== id);
      });
    } catch (error) {
      console.error("Failed to delete news", error);
      throw error;
    }
  }
}

export default new NewsStore();
