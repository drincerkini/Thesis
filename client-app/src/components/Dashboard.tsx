import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore"; // Import the authStore

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Welcome, {authStore.user?.username || "Guest"}!</h1>
    </div>
  );
};

export default observer(Dashboard);
