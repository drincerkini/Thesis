import { observer } from "mobx-react-lite";
import authStore from "../stores/authStore";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome, {authStore.user?.username || "Guest"}!</h1>
    </div>
  );
};

export default observer(DashboardPage);
