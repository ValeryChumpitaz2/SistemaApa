import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Landing from "../pages/Landing";
import Login from "../pages/Login";

import StudentDashboard from "../modules/student/pages/Dashboard";
import TeacherDashboard from "../modules/teacher/pages/TeacherDashboard";

import ProtectedRoute from "../auth/ProtectedRoute";


export default function AppRoutes(){

return (

<Routes>


<Route
path="/"
element={<Landing />}
/>


<Route
path="/login"
element={<Login />}
/>



<Route
path="/student/dashboard"
element={
<ProtectedRoute rol="student">
<StudentDashboard />
</ProtectedRoute>
}
/>



<Route
path="/teacher/dashboard"
element={
<ProtectedRoute rol="teacher">
<TeacherDashboard />
</ProtectedRoute>
}
/>



<Route
path="*"
element={<Navigate to="/" replace />}
/>


</Routes>

);

}