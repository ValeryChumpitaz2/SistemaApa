import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, rol }) {

  const { user } = useAuth();

  console.log("PROTECTED USER:", user);

  // No hay sesión
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  // Hay sesión pero no tiene el rol requerido
  if (
    rol &&
    user.rol?.toUpperCase() !== rol.toUpperCase()
  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;
}