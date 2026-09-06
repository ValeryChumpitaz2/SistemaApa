import { useState } from "react";

import {
  Star,
  Send,
  CheckCircle2,
  MessageSquare
} from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../../../auth/firebase";


export default function TestimonialForm() {

  const [comentario, setComentario] = useState("");

  const [calificacion, setCalificacion] = useState(5);

  const [enviando, setEnviando] = useState(false);

  const [enviado, setEnviado] = useState(false);

  const [error, setError] = useState("");


  // ==================================================
  // USUARIO ACTUAL
  // ==================================================

  const usuario = (() => {

    try {

      const guardado =
        localStorage.getItem("usuario");

      return guardado
        ? JSON.parse(guardado)
        : null;

    } catch {

      return null;

    }

  })();


  // ==================================================
  // ENVIAR TESTIMONIO
  // ==================================================

  async function enviarTestimonio(e) {

    e.preventDefault();

    setError("");


    if (!usuario) {

      setError(
        "No se encontró una sesión activa."
      );

      return;

    }


    if (!comentario.trim()) {

      setError(
        "Por favor, escribe tu experiencia."
      );

      return;

    }


    if (comentario.trim().length < 10) {

      setError(
        "El comentario debe tener al menos 10 caracteres."
      );

      return;

    }


    try {

      setEnviando(true);


      await addDoc(
        collection(db, "testimonios"),
        {

          usuarioId:
            usuario.codigo ||
            usuario.correo ||
            "usuario",

          nombre:
            usuario.nombre ||
            "Usuario",

          correo:
            usuario.correo ||
            "",

          rol:
            usuario.rol ||
            "USUARIO",

          comentario:
            comentario.trim(),

          calificacion:
            calificacion,

          estado:
            "PENDIENTE",

          visible:
            false,

          fecha:
            serverTimestamp()

        }
      );


      setComentario("");

      setCalificacion(5);

      setEnviado(true);


    } catch (error) {

      console.error(
        "Error guardando testimonio:",
        error
      );

      setError(
        "No se pudo enviar tu testimonio. Inténtalo nuevamente."
      );

    } finally {

      setEnviando(false);

    }

  }


  // ==================================================
  // MENSAJE DE ÉXITO
  // ==================================================

  if (enviado) {

    return (

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-green-200
          bg-green-50
          p-10
          text-center
          shadow-sm

          dark:border-green-900/60
          dark:bg-green-950/30
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-green-200/40

            dark:bg-green-500/10
          "
        />

        <div
          className="
            absolute
            -bottom-12
            -left-12
            h-36
            w-36
            rounded-full
            bg-green-200/30

            dark:bg-green-500/10
          "
        />


        {/* ICONO */}

        <div
          className="
            relative
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-green-100
            text-green-600
            shadow-sm

            dark:bg-green-900/40
            dark:text-green-400
          "
        >

          <CheckCircle2 size={38} />

        </div>


        <h3
          className="
            relative
            mt-6
            text-2xl
            font-black
            text-slate-900

            dark:text-white
          "
        >

          ¡Gracias por tu opinión! 💙

        </h3>


        <p
          className="
            relative
            mx-auto
            mt-3
            max-w-md
            leading-7
            text-slate-600

            dark:text-slate-300
          "
        >

          Tu testimonio fue enviado correctamente.

          <br />

          Será revisado por un administrador
          antes de publicarse.

        </p>

      </div>

    );

  }


  // ==================================================
  // FORMULARIO
  // ==================================================

  return (

    <form
      onSubmit={enviarTestimonio}

      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-colors

        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* ==========================================
          DECORACIÓN SUPERIOR
      ========================================== */}

      <div
        className="
          absolute
          right-0
          top-0
          h-32
          w-32
          translate-x-12
          -translate-y-12
          rounded-full
          bg-blue-100/60

          dark:bg-blue-500/10
        "
      />

      <div
        className="
          absolute
          right-10
          top-10
          h-12
          w-12
          rounded-full
          bg-blue-50

          dark:bg-blue-500/10
        "
      />


      {/* ==========================================
          ENCABEZADO
      ========================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-[#1D3681]

            dark:bg-blue-900/40
            dark:text-blue-300
          "
        >

          <MessageSquare size={25} />

        </div>


        <div>

          <h3
            className="
              text-xl
              font-black
              text-slate-900

              dark:text-white
            "
          >

            Comparte tu experiencia

          </h3>


          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >

            Tu opinión nos ayuda a mejorar VG Smart Review.

          </p>

        </div>

      </div>


      {/* ==========================================
          USUARIO
      ========================================== */}

      <div
        className="
          mt-7
          flex
          items-center
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          px-5
          py-4

          dark:border-slate-800
          dark:bg-slate-800/60
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#1D3681]
            text-sm
            font-black
            text-white
          "
        >

          {
            usuario?.nombre
              ?.charAt(0)
              ?.toUpperCase() || "U"
          }

        </div>


        <div className="min-w-0">

          <p
            className="
              truncate
              text-sm
              font-bold
              text-slate-800

              dark:text-white
            "
          >

            {usuario?.nombre || "Usuario"}

          </p>


          <p
            className="
              mt-1
              text-xs
              text-slate-500

              dark:text-slate-400
            "
          >

            {
              usuario?.rol === "DOCENTE"
                ? "Docente"
                : "Estudiante"
            }

          </p>

        </div>

      </div>


      {/* ==========================================
          CALIFICACIÓN
      ========================================== */}

      <div className="mt-8">

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <div>

            <p
              className="
                text-sm
                font-bold
                text-slate-800

                dark:text-slate-200
              "
            >

              ¿Cómo calificarías tu experiencia?

            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >

              Selecciona de 1 a 5 estrellas.

            </p>

          </div>


          <span
            className="
              rounded-full
              bg-yellow-100
              px-3
              py-1
              text-xs
              font-black
              text-yellow-700

              dark:bg-yellow-900/30
              dark:text-yellow-400
            "
          >

            {calificacion}/5

          </span>

        </div>


        <div
          className="
            mt-4
            flex
            gap-1
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-3
            w-fit

            dark:border-slate-800
            dark:bg-slate-800/60
          "
        >

          {[1, 2, 3, 4, 5].map(
            (estrella) => (

              <button
                key={estrella}
                type="button"
                aria-label={`Calificar ${estrella} estrellas`}
                onClick={() =>
                  setCalificacion(estrella)
                }
                className="
                  rounded-xl
                  p-2
                  transition-all
                  duration-200
                  hover:scale-110
                  hover:bg-white

                  dark:hover:bg-slate-700
                "
              >

                <Star
                  size={28}
                  className={

                    estrella <= calificacion

                      ?

                      "fill-yellow-400 text-yellow-400"

                      :

                      "text-slate-300 dark:text-slate-600"

                  }
                />

              </button>

            )
          )}

        </div>

      </div>


      {/* ==========================================
          COMENTARIO
      ========================================== */}

      <div className="mt-8">

        <div
          className="
            flex
            items-center
            justify-between
            mb-2
          "
        >

          <label
            htmlFor="comentario"
            className="
              text-sm
              font-bold
              text-slate-800

              dark:text-slate-200
            "
          >

            Cuéntanos tu experiencia

          </label>


          <span
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >

            {comentario.length}/500

          </span>

        </div>


        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) =>
            setComentario(e.target.value)
          }
          placeholder="¿Cómo te ayudó VG Smart Review?"
          rows={6}
          maxLength={500}
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-5
            py-4
            text-sm
            text-slate-900
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/10

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-blue-500
            dark:focus:bg-slate-800
          "
        />


        <div
          className="
            mt-2
            flex
            justify-between
            text-xs
          "
        >

          <span
            className="
              text-slate-400
            "
          >

            Mínimo 10 caracteres

          </span>


          <span
            className={`
              font-medium

              ${
                comentario.length >= 10
                  ? "text-green-500"
                  : "text-slate-400"
              }
            `}
          >

            {
              comentario.length >= 10
                ? "✓ Listo"
                : `${10 - comentario.length} caracteres restantes`
            }

          </span>

        </div>

      </div>


      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (

        <div
          className="
            mt-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-4
            py-4
            text-sm
            text-red-600

            dark:border-red-900/60
            dark:bg-red-950/30
            dark:text-red-400
          "
        >

          <span className="font-bold">
            !
          </span>

          <span>
            {error}
          </span>

        </div>

      )}


      {/* ==========================================
          BOTÓN
      ========================================== */}

      <button
        type="submit"
        disabled={enviando}
        className="
          mt-7
          flex
          h-13
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-[#1D3681]
          px-6
          py-4
          font-black
          text-white
          shadow-lg
          shadow-blue-900/20
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-blue-800
          hover:shadow-xl
          active:translate-y-0
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0
        "
      >

        {enviando ? (

          <>
            <span
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-white/30
                border-t-white
              "
            />

            Enviando testimonio...

          </>

        ) : (

          <>

            Enviar testimonio

            <Send size={18} />

          </>

        )}

      </button>


      {/* ==========================================
          PIE
      ========================================== */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          text-center
          text-xs
          text-slate-400
        "
      >

        <CheckCircle2
          size={14}
          className="text-green-500"
        />

        Tu testimonio será revisado antes de publicarse.

      </div>

    </form>

  );

}