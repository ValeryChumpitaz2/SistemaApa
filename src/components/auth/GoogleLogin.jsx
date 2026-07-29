import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { auth } from "../../auth/firebase";

import { useAuth } from "../../auth/AuthContext";


export default function GoogleLogin(){

  const navigate = useNavigate();

  const { login } = useAuth();



  async function ingresar(){

    try{


      const provider =
      new GoogleAuthProvider();



      const result =
      await signInWithPopup(
        auth,
        provider
      );



      const estudiante = {

        nombre: result.user.displayName,

        correo: result.user.email,

        foto: result.user.photoURL,

        rol:"ESTUDIANTE"

      };



      login(estudiante);



      localStorage.setItem(
        "usuario",
        JSON.stringify(estudiante)
      );



      navigate("/student/dashboard");



    }catch(error){

      console.error(error);

      alert(
        "Error iniciando sesión con Google"
      );

    }

  }



  return (

    <button

      onClick={ingresar}

      className="
      w-full
      flex
      items-center
      justify-center
      gap-3
      bg-white
      border
      border-gray-300
      p-4
      rounded-xl
      hover:bg-gray-50
      transition
      shadow-sm
      "

    >


      <img

        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"

        className="w-6 h-6"

      />


      <span className="font-medium">

        Continuar con Google

      </span>


    </button>

  );

}