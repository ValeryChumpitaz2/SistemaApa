import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function ProtectedRoute({children, rol}){


  const { user } = useAuth();


  console.log("PROTECTED USER:", user);



  if(!user){

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }



  if(
    rol &&
    user.rol !== rol
  ){

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }



  return children;

}