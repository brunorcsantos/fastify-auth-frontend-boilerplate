import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Verificar o bug de carregamento ao invés de direcionamento.
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>{isAuthenticated ? <Navigate to="/dashboard" replace /> : children }</>
  );
};

export default PublicRoutes;
