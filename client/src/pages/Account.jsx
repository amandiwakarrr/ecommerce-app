
import CreateAccount from "./CreateAccount";
import UserDashboard from "./UserDashboard";
import { useAuth } from "../context/useAuth";

function Account() {
  const { isAuthenticated, loading } = useAuth();

  // Wait until authentication check finishes
  if (loading) {
    return (
      <div className="w-full min-h-80 grid place-items-center">
        Loading account...
      </div>
    );
  }

  // Logged out: show login/register page
  if (!isAuthenticated) {
    return <CreateAccount />;
  }

  // Logged in: show dashboard
  return <UserDashboard />;
}

export default Account;
