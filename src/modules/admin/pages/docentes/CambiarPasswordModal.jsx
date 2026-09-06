import {
  Eye,
  EyeOff,
  KeyRound,
  X,
  ShieldCheck,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  cambiarPasswordAdmin,
} from "../../services/docentesService";


// =====================================================
// MODAL CAMBIAR PASSWORD
// =====================================================

export default function CambiarPasswordModal({
  docente,
  onClose,
  onSuccess,
}) {

  const [password, setPassword] =
    useState("");

  const [confirmar, setConfirmar] =
    useState("");

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  const [mostrarConfirmar, setMostrarConfirmar] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =====================================================
  // DATOS
  // =====================================================

  const correo =
    docente?.correo ||
    docente?.email ||
    docente?.correoElectronico ||
    "";

  const nombre =
    `${docente?.nombre || docente?.nombres || ""} ${
      docente?.apellido || docente?.apellidos || ""
    }`
      .trim() ||
    "Docente";

  const inicial =
    nombre
      .charAt(0)
      .toUpperCase();


  // =====================================================
  // RESET AL CAMBIAR DOCENTE
  // =====================================================

  useEffect(() => {

    setPassword("");
    setConfirmar("");
    setError("");
    setSuccess("");
    setMostrarPassword(false);
    setMostrarConfirmar(false);

  }, [docente]);


  // =====================================================
  // CERRAR CON ESC
  // =====================================================

  useEffect(() => {

    function handleKeyDown(event) {

      if (
        event.key === "Escape" &&
        !loading
      ) {
        onClose?.();
      }

    }

    if (docente) {

      document.addEventListener(
        "keydown",
        handleKeyDown
      );

    }

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    docente,
    loading,
    onClose,
  ]);


  // =====================================================
  // SUBMIT
  // =====================================================

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setSuccess("");


    if (!correo) {

      setError(
        "El docente no tiene un correo registrado."
      );

      return;

    }


    if (!password) {

      setError(
        "Ingrese la nueva contraseña."
      );

      return;

    }


    if (password.length < 8) {

      setError(
        "La contraseña debe tener al menos 8 caracteres."
      );

      return;

    }


    if (password !== confirmar) {

      setError(
        "Las contraseñas no coinciden."
      );

      return;

    }


    try {

      setLoading(true);

      await cambiarPasswordAdmin(
        correo,
        password
      );

      setSuccess(
        "Contraseña actualizada correctamente."
      );

      setPassword("");
      setConfirmar("");


      setTimeout(() => {

        if (
          typeof onSuccess ===
          "function"
        ) {

          onSuccess();

        } else {

          onClose?.();

        }

      }, 900);

    } catch (err) {

      console.error(
        "ERROR CAMBIANDO CONTRASEÑA:",
        err
      );

      setError(
        err?.message ||
        "No se pudo cambiar la contraseña."
      );

    } finally {

      setLoading(false);

    }

  }


  // =====================================================
  // NO MOSTRAR
  // =====================================================

  if (!docente) {
    return null;
  }


  return (

    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-md
      "
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget &&
          !loading
        ) {

          onClose?.();

        }

      }}
    >

      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-[0_25px_80px_rgba(15,23,42,0.25)]
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            overflow-hidden
            border-b
            border-slate-200
            px-6
            py-5
            dark:border-slate-800
          "
        >

          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-indigo-50
              dark:bg-indigo-950/30
            "
          />


          <div
            className="
              relative
              flex
              items-center
              justify-between
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-50
                  text-indigo-600
                  dark:bg-indigo-950/40
                  dark:text-indigo-400
                "
              >
                <LockKeyhole size={20} />
              </div>


              <div>

                <h2
                  className="
                    text-base
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  Cambiar contraseña
                </h2>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Actualizar acceso del docente
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                disabled:opacity-50
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <X size={18} />
            </button>

          </div>

        </div>


        {/* =================================================
            BODY
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          {/* DOCENTE */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-3.5
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
              dark:border-slate-700
              dark:bg-slate-800/60
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-violet-500
                text-sm
                font-black
                text-white
              "
            >
              {inicial}
            </div>


            <div className="min-w-0">

              <p
                className="
                  truncate
                  text-sm
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >
                {nombre}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {correo || "Sin correo"}
              </p>

            </div>

          </div>


          {/* SEGURIDAD */}

          <div
            className="
              mb-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-indigo-100
              bg-indigo-50/70
              px-4
              py-3
              dark:border-indigo-900/40
              dark:bg-indigo-950/20
            "
          >

            <ShieldCheck
              size={17}
              className="
                mt-0.5
                shrink-0
                text-indigo-500
              "
            />

            <p
              className="
                text-[11px]
                leading-5
                text-indigo-700
                dark:text-indigo-300
              "
            >
              La contraseña debe tener como
              mínimo 8 caracteres. Esta acción
              actualizará las credenciales de
              acceso del docente.
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div
              className="
                mb-4
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-xs
                font-semibold
                leading-5
                text-red-700
                dark:border-red-900/50
                dark:bg-red-950/20
                dark:text-red-300
              "
            >
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div
              className="
                mb-4
                flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-3
                text-xs
                font-semibold
                text-emerald-700
                dark:border-emerald-900/50
                dark:bg-emerald-950/20
                dark:text-emerald-300
              "
            >

              <CheckCircle2
                size={17}
              />

              {success}

            </div>

          )}


          {/* PASSWORD */}

          <label className="mb-4 block">

            <span
              className="
                mb-2
                block
                text-xs
                font-bold
                text-slate-700
                dark:text-slate-300
              "
            >
              Nueva contraseña
            </span>


            <div className="relative">

              <KeyRound
                size={16}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                type={
                  mostrarPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Mínimo 8 caracteres"
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-10
                  pr-11
                  text-sm
                  font-medium
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-indigo-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-indigo-500/10
                  disabled:opacity-60
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />


              <button
                type="button"
                onClick={() =>
                  setMostrarPassword(
                    (value) => !value
                  )
                }
                disabled={loading}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-700
                  dark:hover:text-white
                "
              >

                {mostrarPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}

              </button>

            </div>

          </label>


          {/* CONFIRMAR */}

          <label className="block">

            <span
              className="
                mb-2
                block
                text-xs
                font-bold
                text-slate-700
                dark:text-slate-300
              "
            >
              Confirmar contraseña
            </span>


            <div className="relative">

              <KeyRound
                size={16}
                className="
                  absolute
                  left-3.5
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
                value={confirmar}
                onChange={(event) =>
                  setConfirmar(
                    event.target.value
                  )
                }
                placeholder="Repita la contraseña"
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-10
                  pr-11
                  text-sm
                  font-medium
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-indigo-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-indigo-500/10
                  disabled:opacity-60
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />


              <button
                type="button"
                onClick={() =>
                  setMostrarConfirmar(
                    (value) => !value
                  )
                }
                disabled={loading}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-700
                  dark:hover:text-white
                "
              >

                {mostrarConfirmar ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}

              </button>

            </div>

          </label>


          {/* BOTONES */}

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-3
            "
          >

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                h-11
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                font-bold
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Cancelar
            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                text-sm
                font-bold
                text-white
                transition
                hover:bg-indigo-600
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:bg-white
                dark:text-slate-900
                dark:hover:bg-slate-100
              "
            >

              {loading ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                      dark:border-slate-900/30
                      dark:border-t-slate-900
                    "
                  />

                  Guardando...
                </>
              ) : (
                <>
                  <KeyRound size={16} />

                  Actualizar
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
