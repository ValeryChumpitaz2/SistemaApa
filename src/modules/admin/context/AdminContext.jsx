import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  obtenerAdminActual,
} from "../services/adminService";

const AdminContext =
  createContext(null);

// ============================================================
// PROVIDER
// ============================================================

export function AdminProvider({
  children,
}) {
  const [admin, setAdmin] =
    useState(null);

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {
    const usuario =
      obtenerAdminActual();

    setAdmin(usuario);
    setCargando(false);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        cargando,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================

export function useAdmin() {
  const context =
    useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin debe utilizarse dentro de AdminProvider"
    );
  }

  return context;
}
