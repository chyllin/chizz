import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export default function RoleProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole: string;
}) {
  const { user, role, loading } = useAuth();

  if (loading) return null; // wait for auth to finish

  if (!user || role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
