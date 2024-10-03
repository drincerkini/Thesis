import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const DashboardPage: React.FC = () => {
  const username = authStore.user?.username || "Guest";
  const numberOfContacts = 10;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        {/* Welcome Card */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome, {username}!
          </h1>
          <p className="text-lg text-gray-700">
            "We're glad to have you back. Have fun administrating the university
            web."
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {/* Contacts Section */}
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <Link to="/contact-list" className="text-white">
              <p className="text-sm uppercase">Contacts</p>
              <FontAwesomeIcon
                icon={faClipboardList}
                className="text-5xl mb-3"
              />
              <hr className="my-3" />
              <p className="text-3xl font-bold">{numberOfContacts}</p>
              <small>Number of Contacts</small>
            </Link>
          </div>
          {/* Additional cards can be added here */}
        </div>
      </div>
    </>
  );
};

export default observer(DashboardPage);
