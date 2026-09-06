import {
  useNavigate
} from "react-router-dom";

import {
  ShieldAlert,
  ArrowLeft,
  LockKeyhole
} from "lucide-react";


export default function RecuperarPassword() {

  const navigate =
    useNavigate();


  // ==================================================
  // VOLVER AL LOGIN
  // ==================================================

  function volverLogin() {

    navigate(
      "/login"
    );

  }


  return (

    <div
      className="
        min-h-screen
        bg-slate-50
        flex
        items-center
        justify-center
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-slate-100
          bg-white
          p-8
          shadow-xl
        "
      >

        {/* ==================================================
            VOLVER
        ================================================== */}

        <button

          type="button"

          onClick={
            volverLogin
          }

          className="
            mb-7
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:text-blue-600
          "
        >

          <ArrowLeft
            size={17}
          />

          Volver al inicio de sesión

        </button>


        {/* ==================================================
            ICONO
        ================================================== */}

        <div
          className="
            mx-auto
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
          "
        >

          <LockKeyhole
            size={30}
          />

        </div>


        {/* ==================================================
            TITULO
        ================================================== */}

        <div
          className="
            text-center
            mb-7
          "
        >

          <h1
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >

            Recuperación de acceso

          </h1>


          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >

            Si olvidaste tu contraseña,
            comunícate con el administrador
            del sistema para solicitar su
            restablecimiento.

          </p>

        </div>


        {/* ==================================================
            AVISO
        ================================================== */}

        <div
          className="
            rounded-xl
            border
            border-amber-200
            bg-amber-50
            p-4
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <ShieldAlert
              size={21}
              className="
                mt-0.5
                shrink-0
                text-amber-600
              "
            />


            <div>

              <p
                className="
                  text-sm
                  font-bold
                  text-amber-900
                "
              >

                ¿Olvidaste tu contraseña?

              </p>


              <p
                className="
                  mt-1
                  text-sm
                  leading-5
                  text-amber-800
                "
              >

                Por seguridad, el cambio de
                contraseña debe ser realizado
                por el administrador.

              </p>

            </div>

          </div>

        </div>


        {/* ==================================================
            INFORMACIÓN
        ================================================== */}

        <div
          className="
            mt-6
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-4
            text-center
          "
        >

          <p
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >

            Solicita al administrador
            el restablecimiento de tu cuenta.

          </p>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >

            Una vez restablecida, podrás
            ingresar nuevamente al Portal Docente.

          </p>

        </div>


        {/* ==================================================
            BOTON
        ================================================== */}

        <button

          type="button"

          onClick={
            volverLogin
          }

          className="
            mt-6
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
          "
        >

          <ArrowLeft
            size={18}
          />

          Volver al inicio de sesión

        </button>


        {/* ==================================================
            PIE
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

    </div>

  );

}
