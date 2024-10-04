import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

// Define the interface for activity items
interface IActivity {
  _id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
  image: {
    filename: string;
    mimetype: string;
    size: number;
    url: string;
  };
}

class ActivityStore {
  activityList: IActivity[] = [];
  currentActivity: IActivity | null = null;
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

  // GET all activities
  async fetchActivities() {
    this.setLoading(true);
    try {
      const response = await axios.get<IActivity[]>(
        "http://localhost:5001/api/activities"
      );
      runInAction(() => {
        this.activityList = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch activities");
        this.setLoading(false);
      });
    }
  }

  // GET activity by ID
  async fetchActivityById(id: string) {
    this.setLoading(true);
    try {
      const response = await axios.get<IActivity>(
        `http://localhost:5001/api/activities/${id}`
      );
      runInAction(() => {
        this.currentActivity = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch activity details.");
        this.setLoading(false);
      });
    }
  }

  // POST new activity
  async addActivity(formData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/activities",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Activity added successfully", response.data);
      runInAction(() => {
        this.activityList.push(response.data);
      });
    } catch (error) {
      console.error("Failed to add activity", error);
      throw error;
    }
  }

  // DELETE an activity
  async deleteActivity(id: string) {
    try {
      await axios.delete(`http://localhost:5001/api/activities/${id}`);
      runInAction(() => {
        this.activityList = this.activityList.filter(
          (activity) => activity._id !== id
        );
      });
    } catch (error) {
      console.error("Failed to delete activity", error);
      throw error;
    }
  }
}

export default new ActivityStore();
