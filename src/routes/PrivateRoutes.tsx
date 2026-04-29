import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Verificar o bug de carregamento ao invés de direcionamento.
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>{isAuthenticated ?  <Outlet/>  : <Navigate to="/login" replace />}</>
  );
};

export default PrivateRoutes;
