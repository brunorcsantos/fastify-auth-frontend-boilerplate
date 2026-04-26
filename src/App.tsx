import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register/>
          </PublicRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login/>
          </PublicRoutes>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard/>
          </PrivateRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <div>Profile</div>
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
