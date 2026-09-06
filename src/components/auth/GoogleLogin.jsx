import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {
  useNavigate
} from "react-router-dom";

import {
  auth
} from "../../auth/firebase";

import {
  useAuth
} from "../../auth/AuthContext";

import {
  registrarAcceso
} from "../../modules/admin/services/estudiantesService";


export default function GoogleLogin() {

  const navigate =
    useNavigate();

  const {
    login
  } = useAuth();


  // ==================================================
  // INGRESAR CON GOOGLE
  // ==================================================

  async function ingresar() {

    try {

      // ==================================================
      // GOOGLE PROVIDER
      // ==================================================

      const provider =
        new GoogleAuthProvider();


      // ==================================================
      // LOGIN FIREBASE
      // ==================================================

      const result =
        await signInWithPopup(
          auth,
          provider
        );


      const user =
        result.user;


      // ==================================================
      // DATOS DE FIREBASE / GOOGLE
      // ==================================================

      const uid =
        user.uid || "";


      const nombre =
        user.displayName || "";


      const correo =
        user.email || "";


      const foto =
        user.photoURL || "";


      // ==================================================
      // VALIDAR CORREO
      // ==================================================

      if (!correo) {

        throw new Error(
          "Google no proporcionó un correo electrónico."
        );

      }


      console.log(
        "===================================="
      );

      console.log(
        "USUARIO GOOGLE"
      );

      console.log({

        uid,

        nombre,

        correo,

        foto

      });


      // ==================================================
      // REGISTRAR ACCESO EN GOOGLE SHEETS
      // ==================================================
      //
      // El backend busca el correo en la columna EMAIL.
      //
      // Si existe:
      //
      // FOTO
      // FECHA_REGISTRO
      // ULTIMO_ACCESO
      // CANTIDAD_ACCESOS
      //
      // se actualizan.
      //
      // Si NO existe:
      //
      // el backend devuelve error.
      //
      // ==================================================

      let estudianteSheets = null;


      try {

        estudianteSheets =
          await registrarAcceso({

            nombre:
              nombre,

            correo:
              correo,

            foto:
              foto

          });


        console.log(
          "===================================="
        );

        console.log(
          "RESPUESTA GOOGLE SHEETS"
        );

        console.log(
          estudianteSheets
        );

      }
      catch (error) {

        console.error(
          "ERROR REGISTRANDO ACCESO:",
          error
        );


        throw new Error(
          error?.message ||
          "No se pudo registrar el acceso del estudiante."
        );

      }


      // ==================================================
      // VALIDAR RESPUESTA DEL BACKEND
      // ==================================================

      if (!estudianteSheets) {

        throw new Error(
          "El servidor no devolvió información del estudiante."
        );

      }


      // ==================================================
      // CREAR USUARIO DE LA APLICACIÓN
      // ==================================================

      const estudiante = {

        // Firebase
        uid:
          uid,


        // Datos personales
        nombre:
          estudianteSheets.nombre ||
          nombre,


        correo:
          estudianteSheets.correo ||
          correo,


        foto:
          estudianteSheets.foto ||
          foto,


        // Rol
        rol:
          "ESTUDIANTE",


        // Datos académicos
        dni:
          estudianteSheets.dni ||
          "",


        tutor:
          estudianteSheets.tutor ||
          "",


        celular:
          estudianteSheets.celular ||
          "",


        sexo:
          estudianteSheets.sexo ||
          "",


        semestre:
          estudianteSheets.semestre ||
          "NO DEFINIDO",


        apto:
          estudianteSheets.apto ||
          "",


        // Datos de acceso
        fechaRegistro:
          estudianteSheets.fechaRegistro ||
          null,


        ultimoAcceso:
          estudianteSheets.ultimoAcceso ||
          null,


        cantidadAccesos:
          Number(
            estudianteSheets.cantidadAccesos
          ) || 0

      };


      // ==================================================
      // MOSTRAR RESULTADO
      // ==================================================

      console.log(
        "===================================="
      );

      console.log(
        "ESTUDIANTE FINAL:"
      );

      console.log(
        estudiante
      );


      // ==================================================
      // GUARDAR EN CONTEXTO
      // ==================================================

      login(
        estudiante
      );


      // ==================================================
      // GUARDAR EN LOCAL STORAGE
      // ==================================================

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          estudiante
        )
      );


      // ==================================================
      // REDIRECCIÓN
      // ==================================================

      navigate(
        "/student/dashboard"
      );

    }
    catch (error) {

      console.error(
        "===================================="
      );

      console.error(
        "ERROR LOGIN GOOGLE:"
      );

      console.error(
        error
      );


      alert(
        error?.message ||
        "Error iniciando sesión con Google."
      );

    }

  }


  // ==================================================
  // UI
  // ==================================================

  return (

    <button

      type="button"

      onClick={
        ingresar
      }

      className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        border
        border-gray-300
        bg-white
        p-4
        shadow-sm
        transition
        hover:bg-gray-50
      "

    >

      <img

        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"

        alt="Google"

        className="
          h-6
          w-6
        "

      />


      <span
        className="
          font-medium
        "
      >
        Continuar con Google
      </span>

    </button>

  );

}
