import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore";

const DashboardPage: React.FC = () => {
  const username = authStore.user?.username || "Guest";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* Welcome Card */}
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome, {username}!
        </h1>
        <p className="text-lg text-gray-700">
          "We're glad to have you back. Have fun administrating the univerisity
          web."
        </p>
      </div>
    </div>
  );
};

export default observer(DashboardPage);
