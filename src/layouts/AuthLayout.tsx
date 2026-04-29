import type { ReactNode } from "react";
import ThemeToggle from "../components/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full h-screen flex  bg-background">
      <div className=" relative w-full h-full md:w-2/5 flex flex-col items-center justify-center px-8 md:px-12">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        {children}
      </div>
      <div className="hidden md:block h-full w-3/5 overflow-hidden">
        <img src="https://images.pexels.com/photos/14920864/pexels-photo-14920864.jpeg" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default AuthLayout;
