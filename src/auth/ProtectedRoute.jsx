import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function ProtectedRoute({
children,
rol
}){


const {user}=useAuth();



if(!user){

return <Navigate to="/login"/>

}



if(user.rol !== rol){

return <Navigate to="/"/>

}



return children;


}