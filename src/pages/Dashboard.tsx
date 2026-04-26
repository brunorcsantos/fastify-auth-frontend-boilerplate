import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  
  useEffect(() => {
    
  }, [])
  
  console.log(user)

  const handleLogout = async () => {
    await logout({ id: user!.id });
    navigate("/login")
  };

  return (
    <div className="flex flex-col">
      <span>{user!.id}</span>
      <span>{user!.email}</span>
      <span>{user!.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
