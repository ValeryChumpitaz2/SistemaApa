import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Lock,
  Eye,
  EyeOff,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

import {
  cambiarPasswordDocente
} from "../services/teacherLoginService";


export default function CambiarPassword() {

  const navigate =
    useNavigate();


  const usuarioGuardado =
    localStorage.getItem(
      "usuario"
    );


  let usuario = null;


  try {

    usuario =
      usuarioGuardado
        ? JSON.parse(usuarioGuardado)
        : null;

  } catch {

    usuario = null;

  }


  const correo =
    usuario?.correo || "";


  const [
    passwordActual,
    setPasswordActual
  ] = useState("");


  const [
    nuevaPassword,
    setNuevaPassword
  ] = useState("");


  const [
    confirmarPassword,
    setConfirmarPassword
  ] = useState("");


  const [
    mostrarActual,
    setMostrarActual
  ] = useState(false);


  const [
    mostrarNueva,
    setMostrarNueva
  ] = useState(false);


  const [
    mostrarConfirmar,
    setMostrarConfirmar
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    mensaje,
    setMensaje
  ] = useState("");


  const [
    cargando,
    setCargando
  ] = useState(false);


  // ==================================================
  // CAMBIAR
  // ==================================================

  async function cambiarPassword() {

    setError("");
    setMensaje("");


    if (!correo) {

      setError(
        "No se encontró la sesión del docente."
      );

      return;

    }


    if (!passwordActual) {

      setError(
        "Ingrese su contraseña actual."
      );

      return;

    }


    if (!nuevaPassword) {

      setError(
        "Ingrese su nueva contraseña."
      );

      return;

    }


    if (
      nuevaPassword.length < 8
    ) {

      setError(
        "La nueva contraseña debe tener al menos 8 caracteres."
      );

      return;

    }


    if (
      nuevaPassword !==
      confirmarPassword
    ) {

      setError(
        "Las contraseñas nuevas no coinciden."
      );

      return;

    }


    if (
      nuevaPassword ===
      passwordActual
    ) {

      setError(
        "La nueva contraseña debe ser diferente a la actual."
      );

      return;

    }


    setCargando(true);


    try {

      await cambiarPasswordDocente(
        correo,
        passwordActual,
        nuevaPassword
      );


      // ==================================================
      // ACTUALIZAR SESIÓN
      // ==================================================

      const usuarioActualizado = {

        ...usuario,

        debeCambiarPassword:
          false

      };


      localStorage.setItem(
        "usuario",
        JSON.stringify(
          usuarioActualizado
        )
      );


      setMensaje(
        "Contraseña cambiada correctamente."
      );


      setTimeout(() => {

        navigate(
          "/teacher/dashboard"
        );

      }, 1200);


    } catch (error) {

      console.error(
        error
      );


      setError(
        error.message ||
        "No se pudo cambiar la contraseña."
      );

    } finally {

      setCargando(false);

    }

  }


  return (

    <div className="
      min-h-screen
      bg-slate-50
      flex
      items-center
      justify-center
      px-4
    ">

      <div className="
        w-full
        max-w-md
        rounded-2xl
        bg-white
        p-8
        shadow-xl
        border
        border-slate-100
      ">


        {/* TITULO */}

        <div className="mb-7">

          <div className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-blue-100
            text-blue-700
          ">

            <Lock
              size={24}
            />

          </div>


          <h1 className="
            text-2xl
            font-black
            text-slate-900
          ">

            Cambiar contraseña

          </h1>


          <p className="
            mt-2
            text-sm
            text-slate-500
          ">

            Por seguridad debes cambiar
            tu contraseña temporal antes
            de continuar.

          </p>


          <p className="
            mt-2
            text-xs
            font-medium
            text-slate-400
          ">

            {correo}

          </p>

        </div>


        <div className="space-y-5">


          {/* ACTUAL */}

          <div>

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            ">

              Contraseña actual

            </label>


            <div className="relative">

              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input

                type={
                  mostrarActual
                    ? "text"
                    : "password"
                }

                value={
                  passwordActual
                }

                onChange={
                  e =>
                    setPasswordActual(
                      e.target.value
                    )
                }

                placeholder="VG2026"

                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-12
                  outline-none
                  focus:border-blue-600
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-600/10
                "

              />


              <button

                type="button"

                onClick={() =>
                  setMostrarActual(
                    !mostrarActual
                  )
                }

                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >

                {mostrarActual ? (
                  <EyeOff size={18}/>
                ) : (
                  <Eye size={18}/>
                )}

              </button>

            </div>

          </div>


          {/* NUEVA */}

          <div>

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            ">

              Nueva contraseña

            </label>


            <div className="relative">

              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input

                type={
                  mostrarNueva
                    ? "text"
                    : "password"
                }

                value={
                  nuevaPassword
                }

                onChange={
                  e =>
                    setNuevaPassword(
                      e.target.value
                    )
                }

                placeholder="Mínimo 8 caracteres"

                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-12
                  outline-none
                  focus:border-blue-600
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-600/10
                "

              />


              <button

                type="button"

                onClick={() =>
                  setMostrarNueva(
                    !mostrarNueva
                  )
                }

                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >

                {mostrarNueva ? (
                  <EyeOff size={18}/>
                ) : (
                  <Eye size={18}/>
                )}

              </button>

            </div>

          </div>


          {/* CONFIRMAR */}

          <div>

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            ">

              Confirmar contraseña

            </label>


            <div className="relative">

              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input

                type={
                  mostrarConfirmar
                    ? "text"
                    : "password"
                }

                value={
                  confirmarPassword
                }

                onChange={
                  e =>
                    setConfirmarPassword(
                      e.target.value
                    )
                }

                placeholder="Repite la contraseña"

                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-12
                  outline-none
                  focus:border-blue-600
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-600/10
                "

              />


              <button

                type="button"

                onClick={() =>
                  setMostrarConfirmar(
                    !mostrarConfirmar
                  )
                }

                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >

                {mostrarConfirmar ? (
                  <EyeOff size={18}/>
                ) : (
                  <Eye size={18}/>
                )}

              </button>

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="
              flex
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-3
            ">

              <AlertCircle
                size={18}
                className="
                  shrink-0
                  text-red-500
                "
              />

              <p className="
                text-sm
                font-medium
                text-red-700
              ">

                {error}

              </p>

            </div>

          )}


          {/* CORRECTO */}

          {mensaje && (

            <div className="
              flex
              gap-3
              rounded-xl
              border
              border-green-200
              bg-green-50
              p-3
            ">

              <CheckCircle2
                size={18}
                className="
                  shrink-0
                  text-green-600
                "
              />

              <p className="
                text-sm
                font-medium
                text-green-700
              ">

                {mensaje}

              </p>

            </div>

          )}


          {/* BOTON */}

          <button

            type="button"

            onClick={
              cambiarPassword
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
              transition
              hover:bg-blue-800
              disabled:bg-blue-400
            "
          >

            {cargando ? (

              <>

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Guardando...

              </>

            ) : (

              <>

                <Save
                  size={18}
                />

                Cambiar contraseña

              </>

            )}

          </button>

        </div>

      </div>

    </div>

  );

}
