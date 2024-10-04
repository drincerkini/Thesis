import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

interface IContact {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber?: string;
  message: string;
  createdAt?: string;
}

class ContactStore {
  contactList: IContact[] = [];
  currentContact: IContact | null = null;
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

  // GET all contacts
  async fetchContacts() {
    this.setLoading(true);
    try {
      const response = await axios.get<IContact[]>(
        "http://localhost:5001/api/contacts"
      );
      runInAction(() => {
        this.contactList = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch contacts");
        this.setLoading(false);
      });
    }
  }

  // GET contact by ID
  async fetchContactById(id: string) {
    this.setLoading(true);
    try {
      const response = await axios.get<IContact>(
        `http://localhost:5001/api/contacts/${id}`
      );
      runInAction(() => {
        this.currentContact = response.data;
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Failed to fetch contact details.");
        this.setLoading(false);
      });
    }
  }

  // POST new contact
  async addContact(formData: IContact): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/contacts",
        formData
      );
      runInAction(() => {
        this.contactList.push(response.data);
      });
      console.log("Contact added successfully", response.data);
    } catch (error) {
      console.error("Failed to add contact", error);
      throw error;
    }
  }

  // DELETE a contact
  async deleteContact(id: string) {
    try {
      await axios.delete(`http://localhost:5001/api/contacts/${id}`);
      runInAction(() => {
        this.contactList = this.contactList.filter(
          (contact) => contact._id !== id
        );
      });
    } catch (error) {
      console.error("Failed to delete contact", error);
      throw error;
    }
  }
}

export default new ContactStore();
