import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  ShieldCheck,
  FlaskConical,
  Mail,
  ArrowRight,
  Loader2,
  Info
} from "lucide-react";

import {
  auth
} from "../../auth/firebase";

import {
  useAuth
} from "../../auth/AuthContext";

import {
  registrarAcceso
} from "../../modules/admin/services/estudiantesService";


const BACKEND_ESTUDIANTE_PRUEBA =
  "https://script.google.com/macros/s/AKfycbxKKJ2UzyZaVlZOhbq15XBDAlNC-31AxvpslF8WMrsoV4crKqWjCh32TiSz1dg6b3HGIg/exec";


// ==================================================
// COMPONENTE
// ==================================================

export default function GoogleLogin() {

  const navigate =
    useNavigate();

  const {
    login
  } = useAuth();


  // ==================================================
  // ESTADOS
  // ==================================================

  const [
    correoPrueba,
    setCorreoPrueba
  ] = useState("");


  const [
    cargandoGoogle,
    setCargandoGoogle
  ] = useState(false);


  const [
    cargandoPrueba,
    setCargandoPrueba
  ] = useState(false);


  const [
    errorPrueba,
    setErrorPrueba
  ] = useState("");


  // ==================================================
  // INGRESAR CON GOOGLE
  // ==================================================

  async function ingresar() {

    try {

      setCargandoGoogle(true);

      setErrorPrueba("");


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
      // DATOS
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
      // REGISTRAR ACCESO
      // ==================================================

      let estudianteSheets = null;


      try {

        estudianteSheets =
          await registrarAcceso({

            nombre,

            correo,

            foto

          });

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
      // VALIDAR
      // ==================================================

      if (!estudianteSheets) {

        throw new Error(
          "El servidor no devolvió información del estudiante."
        );

      }


      // ==================================================
      // CREAR ESTUDIANTE
      // ==================================================

      const estudiante = {

        uid,

        nombre:
          estudianteSheets.nombre ||
          nombre,

        correo:
          estudianteSheets.correo ||
          correo,

        foto:
          estudianteSheets.foto ||
          foto,

        rol:
          "ESTUDIANTE",

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
      // GUARDAR
      // ==================================================

      login(
        estudiante
      );


      localStorage.setItem(
        "usuario",
        JSON.stringify(
          estudiante
        )
      );


      localStorage.setItem(
        "correo",
        estudiante.correo
      );


      // ==================================================
      // DASHBOARD
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
        "ERROR LOGIN GOOGLE:",
        error
      );


      alert(
        error?.message ||
        "Error iniciando sesión con Google."
      );

    }
    finally {

      setCargandoGoogle(false);

    }

  }


  // ==================================================
  // INGRESAR ESTUDIANTE DE PRUEBA
  // ==================================================

  async function ingresarEstudiantePrueba() {

    try {

      setErrorPrueba("");


      const correo =
        correoPrueba
          .trim()
          .toLowerCase();


      // ==================================================
      // VALIDAR CORREO
      // ==================================================

      if (!correo) {

        setErrorPrueba(
          "Ingresa el correo del estudiante."
        );

        return;

      }


      // ==================================================
      // VALIDACIÓN BÁSICA
      // ==================================================

      if (
        !correo.includes("@")
      ) {

        setErrorPrueba(
          "Ingresa un correo electrónico válido."
        );

        return;

      }


      setCargandoPrueba(true);


      console.log(
        "===================================="
      );

      console.log(
        "INGRESANDO ESTUDIANTE DE PRUEBA"
      );

      console.log(
        "CORREO:",
        correo
      );


      // ==================================================
      // PETICIÓN AL BACKEND
      // ==================================================

      const respuesta =
        await fetch(
          BACKEND_ESTUDIANTE_PRUEBA,
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "text/plain;charset=utf-8"

            },

            body:
              JSON.stringify({

                accion:
                  "estudiantePrueba",

                correo:
                  correo

              })

          }
        );


      // ==================================================
      // LEER RESPUESTA
      // ==================================================

      const data =
        await respuesta.json();


      console.log(
        "===================================="
      );

      console.log(
        "RESPUESTA ESTUDIANTE PRUEBA:"
      );

      console.log(
        data
      );


      // ==================================================
      // VALIDAR RESPUESTA
      // ==================================================

      if (!data) {

        throw new Error(
          "El servidor no devolvió información."
        );

      }


      if (
        data.ok === false
      ) {

        throw new Error(
          data.mensaje ||
          "El estudiante no está autorizado."
        );

      }


      // ==================================================
      // OBTENER ESTUDIANTE
      // ==================================================

      const estudianteBackend =
        data.data ||
        data;


      if (
        !estudianteBackend ||
        !estudianteBackend.uid
      ) {

        throw new Error(
          "El correo no corresponde a un estudiante autorizado."
        );

      }


      // ==================================================
      // CREAR USUARIO
      // ==================================================

      const estudiante = {

        uid:
          estudianteBackend.uid,

        nombre:
          estudianteBackend.nombre ||
          "",

        correo:
          estudianteBackend.correo ||
          correo,

        foto:
          estudianteBackend.foto ||
          "",

        rol:
          "ESTUDIANTE",

        dni:
          estudianteBackend.dni ||
          "",

        tutor:
          estudianteBackend.tutor ||
          "",

        celular:
          estudianteBackend.celular ||
          "",

        sexo:
          estudianteBackend.sexo ||
          "",

        semestre:
          estudianteBackend.semestre ||
          "NO DEFINIDO",

        apto:
          estudianteBackend.apto ||
          "",

        fechaRegistro:
          estudianteBackend.fechaRegistro ||
          null,

        ultimoAcceso:
          estudianteBackend.ultimoAcceso ||
          null,

        cantidadAccesos:
          Number(
            estudianteBackend.cantidadAccesos
          ) || 0

      };


      console.log(
        "===================================="
      );

      console.log(
        "ESTUDIANTE DE PRUEBA:"
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


      localStorage.setItem(
        "correo",
        estudiante.correo
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
        "ERROR ESTUDIANTE DE PRUEBA:"
      );

      console.error(
        error
      );


      setErrorPrueba(
        error?.message ||
        "No se pudo ingresar con el estudiante."
      );

    }
    finally {

      setCargandoPrueba(false);

    }

  }


  // ==================================================
  // UI
  // ==================================================

  return (

    <div className="w-full space-y-5">


      {/* ==================================================
          GOOGLE
      ================================================== */}

      <button

        type="button"

        onClick={
          ingresar
        }

        disabled={
          cargandoGoogle ||
          cargandoPrueba
        }

        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-4
          text-slate-700
          shadow-sm
          transition-all
          duration-200
          hover:border-slate-300
          hover:bg-slate-50
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-60
        "

      >

        {cargandoGoogle ? (

          <Loader2
            size={21}
            className="animate-spin"
          />

        ) : (

          <img

            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"

            alt="Google"

            className="
              h-6
              w-6
            "

          />

        )}


        <span className="font-semibold">

          {cargandoGoogle
            ? "Conectando..."
            : "Continuar con Google"
          }

        </span>

      </button>


      {/* ==================================================
          SEPARADOR
      ================================================== */}

      <div className="flex items-center gap-3">

        <div className="h-px flex-1 bg-slate-200" />

        <span
          className="
            rounded-full
            bg-slate-100
            px-3
            py-1
            text-[11px]
            font-semibold
            text-slate-400
          "
        >
          o
        </span>

        <div className="h-px flex-1 bg-slate-200" />

      </div>


      {/* ==================================================
          ACCESO DE PRUEBA
      ================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-emerald-100
          bg-gradient-to-br
          from-emerald-50
          via-white
          to-teal-50
          p-5
          shadow-sm
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-24
            w-24
            rounded-full
            bg-emerald-200/30
            blur-2xl
          "
        />


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="relative flex items-start gap-3">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-emerald-100
              text-emerald-600
            "
          >

            <FlaskConical
              size={21}
            />

          </div>


          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <p
                className="
                  font-bold
                  text-slate-800
                "
              >
                Acceso de prueba
              </p>


              <span
                className="
                  rounded-full
                  bg-emerald-100
                  px-2
                  py-0.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-emerald-700
                "
              >
                Test
              </span>

            </div>


            <p
              className="
                mt-1
                text-xs
                leading-relaxed
                text-slate-500
              "
            >
              Ingresa el correo autorizado para acceder
              al entorno de prueba.
            </p>

          </div>

        </div>


        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="relative mt-5">

          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >

            <Mail
              size={18}
            />

          </div>


          <input

            type="email"

            value={
              correoPrueba
            }

            onChange={(e) => {

              setCorreoPrueba(
                e.target.value
              );

              if (
                errorPrueba
              ) {

                setErrorPrueba("");

              }

            }}

            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !cargandoPrueba
              ) {

                ingresarEstudiantePrueba();

              }

            }}

            placeholder="
              correo@vallegrande.edu.pe
            "

            disabled={
              cargandoPrueba
            }

            autoComplete="email"

            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              text-slate-800
              outline-none
              transition-all
              placeholder:text-slate-400
              hover:border-slate-300
              focus:border-emerald-400
              focus:ring-4
              focus:ring-emerald-500/10
              disabled:cursor-not-allowed
              disabled:bg-slate-50
            "

          />

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {errorPrueba && (

          <div
            className="
              mt-3
              flex
              items-start
              gap-2
              rounded-xl
              border
              border-red-100
              bg-red-50
              px-3
              py-2.5
              text-xs
              text-red-600
            "
          >

            <Info
              size={15}
              className="mt-0.5 shrink-0"
            />

            <span>
              {errorPrueba}
            </span>

          </div>

        )}


        {/* ==================================================
            BOTÓN
        ================================================== */}

        <button

          type="button"

          onClick={
            ingresarEstudiantePrueba
          }

          disabled={
            cargandoPrueba ||
            cargandoGoogle
          }

          className="
            group
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-4
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-sm
            shadow-emerald-600/20
            transition-all
            duration-200
            hover:bg-emerald-700
            hover:shadow-md
            hover:shadow-emerald-600/20
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "

        >

          {cargandoPrueba ? (

            <>

              <Loader2
                size={18}
                className="animate-spin"
              />

              <span>
                Verificando...
              </span>

            </>

          ) : (

            <>

              <span>
                Ingresar estudiante
              </span>

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />

            </>

          )}

        </button>


        {/* ==================================================
            AYUDA
        ================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-1.5
            text-[10px]
            text-slate-400
          "
        >

          <ShieldCheck
            size={12}
          />

          <span>
            El acceso es validado por el servidor
          </span>

        </div>

      </div>

    </div>

  );

}
