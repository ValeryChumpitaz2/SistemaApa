import { useState } from "react";

import {
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


const preguntas = [

  {
    q: "¿Qué es APP Reviewer?",
    a: "Es una plataforma institucional diseñada para analizar documentos académicos y generar resultados de evaluación de acuerdo con criterios previamente definidos.",
  },

  {
    q: "¿Quién puede utilizar la plataforma?",
  a: "Los estudiantes de Análisis de Sistemas Empresariales pueden revisar sus informes de Sprint, mientras que los docentes pueden analizar múltiples entregas de informes de estudiantes y realizar un seguimiento de los resultados obtenidos para la mejora continua.",
  },

  {
    q: "¿El docente debe revisar documento por documento?",
    a: "No necesariamente. La plataforma permite procesar múltiples documentos, facilitando la revisión, comparación y seguimiento de las entregas académicas.",
  },

  {
    q: "¿Qué criterios evalúa?",
    a: "La evaluación puede considerar aspectos como formato APA, estructura del documento, conclusiones, referencias bibliográficas, glosario y otros criterios definidos por la institución.",
  },

  {
    q: "¿La plataforma reemplaza la revisión del docente?",
    a: "No. APP Reviewer funciona como una herramienta de apoyo que facilita el análisis de los documentos y la generación de retroalimentación. La revisión y criterio final siguen correspondiendo al docente.",
  },

  {
    q: "¿Los resultados se generan automáticamente?",
    a: "Sí. El sistema procesa el documento y genera automáticamente un resultado de evaluación junto con los criterios analizados y las observaciones correspondientes.",
  },

];


export default function FAQ() {

  const [open, setOpen] = useState(null);


  const togglePregunta = (index) => {

    setOpen(
      open === index
        ? null
        : index
    );

  };


  return (

    <section
      id="preguntas-frecuentes"
      className="
        relative
        overflow-hidden
        py-20
        md:py-28
        bg-white
      "
    >

      {/* ==================================================
          DECORACIÓN DE FONDO
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          w-[28rem]
          h-[28rem]
          rounded-full
          bg-blue-100/50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          w-[28rem]
          h-[28rem]
          rounded-full
          bg-indigo-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[32rem]
          h-[32rem]
          rounded-full
          bg-cyan-100/20
          blur-3xl
        "
      />


      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="max-w-3xl mx-auto text-center">

          {/* ETIQUETA */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-4
              py-2
              text-xs
              font-bold
              text-blue-700
              shadow-sm
            "
          >

            <span
              className="
                flex
                items-center
                justify-center
                w-6
                h-6
                rounded-full
                bg-blue-600
                text-white
              "
            >

              <HelpCircle size={13} />

            </span>

            Preguntas frecuentes

          </div>


          {/* TÍTULO */}

          <h2
            className="
              mt-6
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              tracking-tight
              leading-tight
              text-slate-900
            "
          >

            Todo lo que necesitas saber

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-5
              max-w-2xl
              mx-auto
              text-sm
              md:text-base
              lg:text-lg
              leading-7
              text-slate-500
            "
          >

            Resolvemos las preguntas más frecuentes sobre
            APP Reviewer, su funcionamiento y las herramientas
            que ofrece para facilitar la revisión académica.

          </p>

        </div>


        {/* ==================================================
            INDICADORES
        ================================================== */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-slate-50
              border
              border-slate-200
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-500
            "
          >

            <CheckCircle2
              size={14}
              className="text-emerald-500"
            />

            Información clara

          </div>


          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-slate-50
              border
              border-slate-200
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-500
            "
          >

            <Sparkles
              size={14}
              className="text-blue-500"
            />

            Revisión académica

          </div>

        </div>


        {/* ==================================================
            PREGUNTAS - 2 COLUMNAS
        ================================================== */}

        <div
          className="
            mt-12
            grid
            md:grid-cols-2
            gap-4
            items-start
          "
        >

          {preguntas.map((item, index) => {

            const isOpen = open === index;

            return (

              <div
                key={index}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? `
                        border-blue-200
                        shadow-xl
                        shadow-blue-900/5
                      `
                      : `
                        border-slate-200
                        shadow-sm
                        hover:border-blue-200
                        hover:shadow-lg
                        hover:shadow-slate-900/5
                      `
                  }
                `}
              >

                {/* LÍNEA LATERAL */}

                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    bottom-0
                    w-1
                    bg-gradient-to-b
                    from-blue-500
                    to-indigo-500
                    transition-opacity
                    duration-300
                    ${
                      isOpen
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  `}
                />


                {/* ==================================================
                    PREGUNTA
                ================================================== */}

                <button
                  type="button"
                  onClick={() => togglePregunta(index)}
                  aria-expanded={isOpen}
                  className="
                    w-full
                    flex
                    items-center
                    gap-4
                    px-5
                    py-5
                    text-left
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-blue-500/30
                  "
                >

                  {/* NÚMERO */}

                  <div
                    className={`
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-xl
                      shrink-0
                      text-xs
                      font-black
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? `
                            bg-blue-600
                            text-white
                            shadow-md
                            shadow-blue-600/20
                          `
                          : `
                            bg-slate-100
                            text-slate-500
                            group-hover:bg-blue-50
                            group-hover:text-blue-600
                          `
                      }
                    `}
                  >

                    {String(index + 1).padStart(2, "0")}

                  </div>


                  {/* PREGUNTA */}

                  <span
                    className={`
                      flex-1
                      text-sm
                      md:text-[15px]
                      font-bold
                      leading-6
                      transition-colors
                      duration-300
                      ${
                        isOpen
                          ? "text-blue-700"
                          : "text-slate-800 group-hover:text-blue-700"
                      }
                    `}
                  >

                    {item.q}

                  </span>


                  {/* FLECHA */}

                  <div
                    className={`
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-xl
                      shrink-0
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }
                    `}
                  >

                    <ChevronDown
                      size={18}
                      className={`
                        transition-transform
                        duration-300
                        ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />

                  </div>

                </button>


                {/* ==================================================
                    RESPUESTA
                ================================================== */}

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <div
                      className="
                        px-5
                        pb-6
                        pl-[4.75rem]
                        pr-6
                      "
                    >

                      <div
                        className="
                          h-px
                          bg-slate-100
                          mb-5
                        "
                      />

                      <p
                        className="
                          text-sm
                          leading-7
                          text-slate-500
                        "
                      >

                        {item.a}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

        </div>


        {/* ==================================================
            BLOQUE FINAL
        ================================================== */}

        <div
          className="
            relative
            mt-12
            overflow-hidden
            rounded-3xl
            border
            border-blue-100
            bg-gradient-to-r
            from-blue-50
            via-white
            to-indigo-50
            p-6
            md:p-7
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              w-40
              h-40
              rounded-full
              bg-blue-100/60
              blur-2xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -left-16
              -bottom-16
              w-32
              h-32
              rounded-full
              bg-indigo-100/50
              blur-2xl
            "
          />


          <div
            className="
              relative
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
            "
          >

            {/* CONTENIDO */}

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-2xl
                  bg-blue-600
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  shrink-0
                "
              >

                <MessageCircleQuestion size={22} />

              </div>


              <div>

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={14}
                    className="text-blue-500"
                  />

                  <p
                    className="
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >

                    ¿Tienes alguna otra consulta?

                  </p>

                </div>


                <p
                  className="
                    mt-1
                    text-xs
                    md:text-sm
                    text-slate-500
                  "
                >

                  Estamos para ayudarte a conocer mejor APP Reviewer.

                </p>

              </div>

            </div>


            {/* BOTÓN */}

            <button
              type="button"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                shrink-0
                rounded-xl
                bg-white
                border
                border-blue-200
                px-5
                py-3
                text-sm
                font-bold
                text-blue-600
                shadow-sm
                transition-all
                duration-200
                hover:bg-blue-600
                hover:border-blue-600
                hover:text-white
                hover:shadow-lg
                hover:shadow-blue-600/20
              "
            >

              Conocer más

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />

            </button>

          </div>

        </div>


        {/* ==================================================
            PIE
        ================================================== */}

        <div className="mt-8 text-center">

          <p className="text-xs text-slate-400">

            APP Reviewer · Plataforma institucional de revisión académica

          </p>

        </div>

      </div>

    </section>

  );

}
