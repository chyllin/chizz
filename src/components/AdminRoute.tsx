import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) return null;

  if (!user || role !== "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
