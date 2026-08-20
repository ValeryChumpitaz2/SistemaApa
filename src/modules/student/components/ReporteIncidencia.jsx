import {
  AlertTriangle,
  Send,
  CheckCircle,
  Loader2
} from "lucide-react";

import { useState } from "react";

import { enviarIncidencia } from "../services/reportsService";

import { useAuth } from "../../../auth/AuthContext";


export default function ReporteIncidencia() {

  const { user } = useAuth();


  const [tipo, setTipo] =
    useState("Problema con mi evaluación");


  const [asunto, setAsunto] =
    useState("");


  const [descripcion, setDescripcion] =
    useState("");


  const [enviando, setEnviando] =
    useState(false);


  const [mensaje, setMensaje] =
    useState("");


  const [error, setError] =
    useState("");


  async function handleSubmit(e) {

    e.preventDefault();

    setMensaje("");
    setError("");


    if (!asunto.trim()) {

      setError(
        "Ingresa un asunto para la incidencia."
      );

      return;

    }


    if (!descripcion.trim()) {

      setError(
        "Describe la incidencia."
      );

      return;

    }


    try {

      setEnviando(true);


      const datos = {

        nombre:
          user?.usuario ||
          user?.nombre ||
          "Estudiante",

        email:
          user?.correo ||
          user?.email ||
          "",

        tipo,

        asunto:
          asunto.trim(),

        descripcion:
          descripcion.trim(),

        fecha:
          new Date().toLocaleString(
            "es-PE"
          )

      };


      await enviarIncidencia(
        datos
      );


      setMensaje(
        "Tu incidencia fue enviada correctamente. Te responderemos lo antes posible."
      );


      setAsunto("");

      setDescripcion("");


    } catch (error) {

      console.error(
        "Error enviando incidencia:",
        error
      );


      setError(
        error?.message ||
        "No se pudo enviar la incidencia. Intenta nuevamente."
      );


    } finally {

      setEnviando(false);

    }

  }


  return (

    <div className="space-y-8">


      {/* CABECERA */}

      <div className="flex items-center gap-4">

        <div
          className="
            bg-red-100
            text-red-600
            p-3
            rounded-xl
          "
        >

          <AlertTriangle size={28}/>

        </div>


        <div>

          <h1
            className="
              text-3xl
              font-black
              text-gray-800
              dark:text-white
            "
          >

            Reportar una incidencia

          </h1>


          <p
            className="
              text-gray-500
              mt-1
            "
          >

            Comunica cualquier problema relacionado
            con tus evaluaciones o documentos.

          </p>

        </div>

      </div>



      {/* FORMULARIO */}

      <section
        className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          dark:border-slate-800
          p-6
          md:p-8
          shadow-sm
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >


          {/* TIPO */}

          <div>

            <label
              className="
                block
                font-bold
                text-gray-700
                dark:text-gray-200
                mb-2
              "
            >

              Tipo de incidencia

            </label>


            <select

              value={tipo}

              onChange={(e)=>
                setTipo(e.target.value)
              }

              className="
                w-full
                border
                border-gray-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            >

              <option>
                Problema con mi evaluación
              </option>

              <option>
                Problema con mi documento
              </option>

              <option>
                Puntaje incorrecto
              </option>

              <option>
                Problema al subir documento
              </option>

              <option>
                Problema con los resultados
              </option>

              <option>
                Otro
              </option>

            </select>

          </div>



          {/* ASUNTO */}

          <div>

            <label
              className="
                block
                font-bold
                text-gray-700
                dark:text-gray-200
                mb-2
              "
            >

              Asunto

            </label>


            <input

              type="text"

              value={asunto}

              onChange={(e)=>
                setAsunto(e.target.value)
              }

              placeholder="Ej. Mi puntaje no aparece correctamente"

              className="
                w-full
                border
                border-gray-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

          </div>



          {/* DESCRIPCIÓN */}

          <div>

            <label
              className="
                block
                font-bold
                text-gray-700
                dark:text-gray-200
                mb-2
              "
            >

              Descripción de la incidencia

            </label>


            <textarea

              value={descripcion}

              onChange={(e)=>
                setDescripcion(e.target.value)
              }

              rows={7}

              placeholder="
Describe detalladamente qué ocurrió...
              "

              className="
                w-full
                border
                border-gray-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                rounded-xl
                px-4
                py-3
                outline-none
                resize-none
                focus:ring-2
                focus:ring-blue-500
              "

            />

          </div>



          {/* INFORMACIÓN */}

          <div
            className="
              bg-blue-50
              dark:bg-blue-900/20
              rounded-xl
              p-4
              text-sm
              text-blue-800
              dark:text-blue-200
            "
          >

            La incidencia será enviada al área correspondiente
            para su revisión.

          </div>



          {/* MENSAJE ÉXITO */}

          {mensaje && (

            <div
              className="
                flex
                items-center
                gap-3
                bg-green-50
                text-green-700
                p-4
                rounded-xl
                font-semibold
              "
            >

              <CheckCircle size={20}/>

              {mensaje}

            </div>

          )}



          {/* ERROR */}

          {error && (

            <div
              className="
                bg-red-50
                text-red-700
                p-4
                rounded-xl
                font-semibold
              "
            >

              {error}

            </div>

          )}



          {/* BOTÓN */}

          <button

            type="submit"

            disabled={enviando}

            className="
              w-full
              bg-[#1D3681]
              hover:bg-blue-900
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              py-4
              rounded-xl
              font-black
              flex
              items-center
              justify-center
              gap-3
              transition
            "

          >

            {enviando ? (

              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Enviando incidencia...
              </>

            ) : (

              <>
                <Send size={20}/>

                Enviar incidencia
              </>

            )}

          </button>


        </form>

      </section>

    </div>

  );

}