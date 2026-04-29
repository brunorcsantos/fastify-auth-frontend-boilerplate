import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <span>{user!.id}</span>
      <span>{user!.email}</span>
      <span>{user!.name}</span>
    </>
  );
};

export default Dashboard;
