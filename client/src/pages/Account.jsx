import Registration from "../components/Registration";
import { useState } from "react";
import UserProfile from "../components/UserProfile";
function Account() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-full h-auto">
      {isLogin ? <UserProfile /> : <Registration />}

      <button onClick={()=> setIsLogin(!isLogin)}>Set Login</button>
    </div>
  );
}

export default Account;
