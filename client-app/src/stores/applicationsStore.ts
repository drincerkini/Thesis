import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

interface IApplication {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  birthDate: string;
  address: string;
  phoneNumber?: string;
  department: string;
  createdAt?: string;
}

class ApplicationStore {
  applicationList: IApplication[] = [];
  currentApplication: IApplication | null = null;
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

  // GET all applications
  async fetchApplications() {
    this.setLoading(true);
    try {
      const response = await axios.get<IApplication[]>(
        "http://localhost:5001/api/applications"
      );
      runInAction(() => {
        this.applicationList = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch applications");
        this.setLoading(false);
      });
    }
  }

  // GET application by ID
  async fetchApplicationById(id: string) {
    this.setLoading(true);
    try {
      const response = await axios.get<IApplication>(
        `http://localhost:5001/api/applications/${id}`
      );
      runInAction(() => {
        this.currentApplication = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch application details.");
        this.setLoading(false);
      });
    }
  }

  // POST new application
  async addApplication(formData: IApplication): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/applications",
        formData
      );
      runInAction(() => {
        this.applicationList.push(response.data);
      });
      console.log("Application added successfully", response.data);
    } catch (error) {
      console.error("Failed to add application", error);
      throw error;
    }
  }

  // DELETE an application
  async deleteApplication(id: string) {
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`);
      runInAction(() => {
        this.applicationList = this.applicationList.filter(
          (application) => application._id !== id
        );
      });
    } catch (error) {
      console.error("Failed to delete application", error);
      throw error;
    }
  }
}

export default new ApplicationStore();
