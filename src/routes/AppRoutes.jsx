import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Landing from "../pages/Landing";

import StudentDashboard
  from "../modules/student/pages/Dashboard";

import TeacherDashboard
  from "../modules/teacher/pages/TeacherDashboard";

import RecuperarPassword
  from "../modules/teacher/pages/RecuperarPassword";

import CambiarPassword
  from "../modules/teacher/pages/CambiarPassword";

import AdminLayout
  from "../modules/admin/layout/AdminLayout";

import AdminDashboard
  from "../modules/admin/pages/AdminDashboard";

import Docentes
  from "../modules/admin/pages/docentes/Docentes";

import Estudiantes
  from "../modules/admin/pages/estudiantes/Estudiantes";

import Cursos
  from "../modules/admin/pages/cursos/Cursos";

import Carreras
  from "../modules/admin/pages/carreras/Carreras";

import Reportes
  from "../modules/admin/pages/reportes/Reportes";

import Configuracion
  from "../modules/admin/pages/configuracion/Configuracion";

import ProtectedRoute
  from "../auth/ProtectedRoute";


export default function AppRoutes() {

  return (

    <Routes>

      {/* ==================================================
          INICIO
      ================================================== */}

      <Route
        path="/"
        element={<Landing />}
      />


      {/* ==================================================
          LOGIN GENERAL
      ================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ==================================================
          LOGIN POR TIPO DE USUARIO
      ================================================== */}

      {/* ESTUDIANTE */}

      <Route
        path="/login/estudiante"
        element={<Login tipoInicial="ESTUDIANTE" />}
      />


      {/* DOCENTE */}

      <Route
        path="/login/docente"
        element={<Login tipoInicial="DOCENTE" />}
      />


      {/* ADMINISTRADOR */}

      <Route
        path="/login/administrador"
        element={<Login tipoInicial="ADMIN" />}
      />


      {/* ==================================================
          RECUPERAR PASSWORD DOCENTE
      ================================================== */}

      <Route
        path="/teacher/recuperar-password"
        element={<RecuperarPassword />}
      />


      {/* ==================================================
          CAMBIAR PASSWORD DOCENTE
      ================================================== */}

      <Route
        path="/teacher/cambiar-password"
        element={
          <ProtectedRoute rol="DOCENTE">
            <CambiarPassword />
          </ProtectedRoute>
        }
      />


      {/* ==================================================
          DASHBOARD DOCENTE
      ================================================== */}

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute rol="DOCENTE">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />


      {/* ==================================================
          DASHBOARD ESTUDIANTE
      ================================================== */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute rol="ESTUDIANTE">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />


      {/* ==================================================
          ADMINISTRADOR
      ================================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute rol="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="docentes"
          element={<Docentes />}
        />

        <Route
          path="estudiantes"
          element={<Estudiantes />}
        />

        <Route
          path="cursos"
          element={<Cursos />}
        />

        <Route
          path="carreras"
          element={<Carreras />}
        />

        <Route
          path="reportes"
          element={<Reportes />}
        />

        <Route
          path="configuracion"
          element={<Configuracion />}
        />

      </Route>


      {/* ==================================================
          RUTA NO ENCONTRADA
      ================================================== */}

      <Route
        path="*"
        element={<Login />}
      />

    </Routes>

  );
}
