import Registration from "../components/Registration";
import { useState } from "react";
import UserDashboard from "./UserDashboard";

function Account() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full h-auto">
      {isLogin ? (
        <UserDashboard />
      ) : (
        <Registration />
      )}

      <button onClick={() => setIsLogin(!isLogin)}>
        Set Login
      </button>
    </div>
  );
}

export default Account;