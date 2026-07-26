import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import StudentDashboard from "../modules/student/pages/Dashboard";
import TeacherDashboard from "../modules/teacher/pages/TeacherDashboard";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute rol="DOCENTE">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute rol="ESTUDIANTE">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
