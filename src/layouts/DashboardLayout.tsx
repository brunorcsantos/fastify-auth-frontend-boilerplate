import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiHome,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState<boolean>(window.innerWidth >= 768);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout({ id: user!.id });
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`
  flex flex-col h-full overflow-hidden
  bg-sidebar border-r border-border
  fixed z-40 w-64 transition-transform duration-300
  ${isExpanded ? "translate-x-0" : "-translate-x-full"}
  md:relative md:translate-x-0 md:transition-all md:duration-300
  ${isExpanded ? "md:w-60" : "md:w-16"}
`}
      >
        <div
          className={`flex  ${isExpanded ? "justify-between" : ""} items-center p-4`}
        >
          <h1
            style={{ fontFamily: "Space Grotesk" }}
            className={`font-bold text-lg ${isExpanded ? "block" : "hidden"}`}
          >
            AuthApp
          </h1>
          {isExpanded ? (
            <FiChevronsLeft
              size={20}
              className="cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          ) : (
            <FiChevronsRight
              size={20}
              className="cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
        <nav className="flex-1 ">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-sidebar-accent transition-colors duration-200 ${isActive("/dashboard") ? "bg-sidebar-accent font-semibold" : ""}`}
          >
            <div className="flex items-center gap-3 ">
              <FiHome />
              <p className={`${isExpanded ? "block" : "hidden"}`}>Home</p>
            </div>
          </Link>
          <Link
            to="/profile"
            className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-sidebar-accent transition-colors duration-200 ${isActive("/profile") ? "bg-sidebar-accent font-semibold" : ""}`}
          >
            <div className={`flex items-center gap-3 `}>
              <FiUser />
              <p className={`${isExpanded ? "block" : "hidden"}`}>Profile</p>
            </div>
          </Link>
        </nav>
        
        <div
          onClick={handleLogout}
          className=" cursor-pointer flex items-center gap-3 px-4 py-3 text-destructive hover:bg-sidebar-accent transition-colors duration-200"
        >
          <FiLogOut />
          <p className={`${isExpanded ? "block" : "hidden"}`}>Logout</p>
        </div>
      </aside>
      {isExpanded && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsExpanded(false)}
          />
        )}
      <div className="flex   flex-col flex-1 bg-background ">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <FiMenu />
          </button>
          <p>{location.pathname}</p>
          <ThemeToggle />
        </div>
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
