import {
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  useAuth
} from "../../auth/AuthContext";


import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2
} from "lucide-react";


import {
  loginDocente
} from "../../modules/teacher/services/teacherLoginService";


// ==================================================
// COMPONENTE LOGIN DOCENTE
// ==================================================

export default function TeacherLogin() {

  const navigate =
    useNavigate();


  const { login } =
    useAuth();


  // ==================================================
  // ESTADOS
  // ==================================================

  const [
    correo,
    setCorreo
  ] = useState("");


  const [
    password,
    setPassword
  ] = useState("");


  const [
    mostrarPassword,
    setMostrarPassword
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    cargando,
    setCargando
  ] = useState(false);


  // ==================================================
  // INGRESAR
  // ==================================================

  async function ingresar() {

    // Limpiar error anterior

    setError("");


    // ==================================================
    // VALIDAR CORREO
    // ==================================================

    if (!correo.trim()) {

      setError(
        "Ingrese su correo institucional."
      );

      return;

    }


    // ==================================================
    // VALIDAR PASSWORD
    // ==================================================

    if (!password) {

      setError(
        "Ingrese su contraseña."
      );

      return;

    }


    // ==================================================
    // ACTIVAR CARGANDO
    // ==================================================

    setCargando(true);


    try {

      // ==================================================
      // LOGIN
      // ==================================================

      const respuesta =
        await loginDocente(
          correo,
          password
        );


      console.log(
        "RESPUESTA LOGIN DOCENTE:",
        respuesta
      );


      // ==================================================
      // CREAR OBJETO DOCENTE
      // ==================================================

      const docente = {

        nombre:
          respuesta?.nombre ||
          "",

        correo:
          respuesta?.correo ||
          correo
            .trim()
            .toLowerCase(),

        codigo:
          respuesta?.codigo ||
          "",

        rol:
          respuesta?.rol ||
          "DOCENTE",

        debeCambiarPassword:
          respuesta
            ?.debeCambiarPassword === true

      };


      console.log(
        "DOCENTE LOGUEADO:",
        docente
      );


      // ==================================================
      // GUARDAR SESIÓN EN AUTH
      // ==================================================

      login(
        docente
      );


      // ==================================================
      // GUARDAR EN LOCAL STORAGE
      // ==================================================

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          docente
        )
      );


      // ==================================================
      // CONTRASEÑA TEMPORAL
      // ==================================================
      //
      // Si el docente todavía utiliza VG2026,
      // el backend devuelve:
      //
      // debeCambiarPassword: true
      //
      // Lo enviamos a cambiar contraseña.
      // ==================================================

      if (
        docente.debeCambiarPassword
      ) {

        console.log(
          "El docente debe cambiar su contraseña."
        );


        navigate(
          "/teacher/cambiar-password"
        );


        return;

      }


      // ==================================================
      // LOGIN NORMAL
      // ==================================================

      navigate(
        "/teacher/dashboard"
      );

    }
    catch (error) {

      console.error(
        "ERROR LOGIN DOCENTE:",
        error
      );


      // ==================================================
      // MOSTRAR ERROR DEL BACKEND
      // ==================================================

      setError(
        error?.message ||
        "No se pudo conectar con el servidor."
      );

    }
    finally {

      // ==================================================
      // FINALIZAR CARGANDO
      // ==================================================

      setCargando(false);

    }

  }


  // ==================================================
  // IR A RECUPERAR PASSWORD
  // ==================================================

  function irARecuperarPassword() {

    navigate(
      "/teacher/recuperar-password"
    );

  }


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="w-full">


      {/* ==================================================
          TITULO
      ================================================== */}

      <div className="mb-8">

        <p
          className="
            mb-2
            text-sm
            font-semibold
            text-blue-600
          "
        >

          Acceso docente

        </p>


        <h1
          className="
            text-3xl
            font-black
            tracking-tight
            text-slate-900
          "
        >

          Portal Docente

        </h1>


        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >

          Ingresa con tu cuenta institucional
          de Valle Grande.

        </p>

      </div>



      {/* ==================================================
          FORMULARIO
      ================================================== */}

      <div className="space-y-5">


        {/* ==================================================
            CORREO
        ================================================== */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >

            Correo institucional

          </label>


          <div className="relative">

            {/* ICONO CORREO */}

            <Mail
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />


            {/* INPUT CORREO */}

            <input

              type="email"

              value={
                correo
              }

              onChange={
                e => {

                  setCorreo(
                    e.target.value
                  );

                  // Limpiar error mientras escribe

                  if (error) {
                    setError("");
                  }

                }
              }

              onKeyDown={
                e => {

                  if (
                    e.key === "Enter" &&
                    !cargando
                  ) {

                    ingresar();

                  }

                }
              }

              placeholder="correo@vallegrande.edu.pe"

              autoComplete="email"

              disabled={
                cargando
              }

              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-600
                focus:bg-white
                focus:ring-4
                focus:ring-blue-600/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "

            />

          </div>

        </div>



        {/* ==================================================
            CONTRASEÑA
        ================================================== */}

        <div>

          <div
            className="
              mb-2
              flex
              items-center
              justify-between
            "
          >

            <label
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >

              Contraseña

            </label>

          </div>


          <div className="relative">

            {/* ICONO CANDADO */}

            <Lock
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />


            {/* INPUT PASSWORD */}

            <input

              type={
                mostrarPassword
                  ? "text"
                  : "password"
              }

              value={
                password
              }

              onChange={
                e => {

                  setPassword(
                    e.target.value
                  );

                  // Limpiar error mientras escribe

                  if (error) {
                    setError("");
                  }

                }
              }

              onKeyDown={
                e => {

                  if (
                    e.key === "Enter" &&
                    !cargando
                  ) {

                    ingresar();

                  }

                }
              }

              placeholder="Ingresa tu contraseña"

              autoComplete="current-password"

              disabled={
                cargando
              }

              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-12
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-600
                focus:bg-white
                focus:ring-4
                focus:ring-blue-600/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "

            />


            {/* ==================================================
                MOSTRAR / OCULTAR PASSWORD
            ================================================== */}

            <button

              type="button"

              onClick={() =>
                setMostrarPassword(
                  !mostrarPassword
                )
              }

              disabled={
                cargando
              }

              className="
                absolute
                right-2
                top-1/2
                flex
                h-9
                w-9
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-blue-50
                hover:text-blue-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "

              aria-label={
                mostrarPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }

            >

              {mostrarPassword ? (

                <EyeOff
                  size={18}
                />

              ) : (

                <Eye
                  size={18}
                />

              )}

            </button>

          </div>

        </div>



        {/* ==================================================
            OLVIDASTE TU PASSWORD
        ================================================== */}

        <div
          className="
            flex
            justify-end
          "
        >

          <button

            type="button"

            onClick={
              irARecuperarPassword
            }

            disabled={
              cargando
            }

            className="
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:text-blue-800
              hover:underline
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            ¿Olvidaste tu contraseña?

          </button>

        </div>



        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div
            className="
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-3
            "
          >

            {/* ICONO */}

            <AlertCircle
              size={18}
              className="
                mt-0.5
                shrink-0
                text-red-500
              "
            />


            {/* MENSAJE */}

            <p
              className="
                text-sm
                font-medium
                text-red-700
              "
            >

              {error}

            </p>

          </div>

        )}



        {/* ==================================================
            BOTÓN INGRESAR
        ================================================== */}

        <button

          type="button"

          onClick={
            ingresar
          }

          disabled={
            cargando
          }

          className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-700
            font-bold
            text-white
            shadow-lg
            shadow-blue-700/20
            transition
            hover:-translate-y-0.5
            hover:bg-blue-800
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:bg-blue-400
            disabled:hover:translate-y-0
          "
        >

          {cargando ? (

            <>

              <Loader2
                size={18}
                className="animate-spin"
              />

              Verificando...

            </>

          ) : (

            <>

              <LogIn
                size={18}
              />

              Ingresar

            </>

          )}

        </button>


      </div>



      {/* ==================================================
          INFORMACIÓN
      ================================================== */}

      <div
        className="
          mt-7
          border-t
          border-slate-100
          pt-5
          text-center
        "
      >

        <p
          className="
            text-xs
            text-slate-400
          "
        >

          Acceso exclusivo para docentes

        </p>


        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >

          Valle Grande · VG Smart Review

        </p>

      </div>


    </div>

  );

}
