import {
  useState
} from "react";

import {
  ChevronDown,
  HelpCircle
} from "lucide-react";


const preguntas = [

  {
    q: "¿Qué es VG Smart Review?",
    a: "Es una plataforma institucional diseñada para analizar documentos académicos y generar resultados de evaluación de acuerdo con criterios previamente definidos."
  },

  {
    q: "¿Quién puede utilizar la plataforma?",
    a: "Los estudiantes pueden revisar sus trabajos antes de entregarlos, mientras que los docentes pueden analizar múltiples entregas y realizar un seguimiento de los resultados obtenidos."
  },

  {
    q: "¿El docente debe revisar documento por documento?",
    a: "No necesariamente. La plataforma permite procesar múltiples documentos, facilitando la revisión, comparación y seguimiento de las entregas académicas."
  },

  {
    q: "¿Qué criterios evalúa?",
    a: "La evaluación puede considerar aspectos como formato APA, estructura del documento, conclusiones, referencias bibliográficas, glosario y otros criterios definidos por la institución."
  },

  {
    q: "¿La plataforma reemplaza la revisión del docente?",
    a: "No. VG Smart Review funciona como una herramienta de apoyo que facilita el análisis de los documentos y la generación de retroalimentación. La revisión y criterio final siguen correspondiendo al docente."
  },

  {
    q: "¿Los resultados se generan automáticamente?",
    a: "Sí. El sistema procesa el documento y genera automáticamente un resultado de evaluación junto con los criterios analizados y las observaciones correspondientes."
  }

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

    <section className="py-24 md:py-28 bg-slate-50">

      <div className="max-w-4xl mx-auto px-6">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="text-center">

          {/* ETIQUETA */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-50
              border
              border-blue-100
              text-blue-700
              px-4
              py-2
              text-sm
              font-bold
            "
          >

            <HelpCircle size={16} />

            Preguntas frecuentes

          </div>


          {/* TÍTULO */}

          <h2
            className="
              mt-5
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-black
              text-slate-900
              tracking-tight
            "
          >

            Todo lo que necesitas saber

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-5
              text-base
              md:text-lg
              text-slate-500
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >

            Resolvemos las preguntas más frecuentes sobre
            VG Smart Review, su funcionamiento y las
            posibilidades que ofrece.

          </p>

        </div>


        {/* ==================================================
            PREGUNTAS
        ================================================== */}

        <div className="mt-12 space-y-4">

          {preguntas.map((item, index) => {

            const isOpen = open === index;

            return (

              <div
                key={index}
                className={`
                  group
                  bg-white
                  rounded-2xl
                  border
                  overflow-hidden
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-blue-200 shadow-lg shadow-blue-900/5"
                      : "border-slate-200 hover:border-blue-200 hover:shadow-md"
                  }
                `}
              >

                {/* ==================================================
                    PREGUNTA
                ================================================== */}

                <button
                  type="button"
                  onClick={() => togglePregunta(index)}
                  aria-expanded={isOpen}
                  className="
                    w-full
                    px-5
                    md:px-6
                    py-5
                    flex
                    items-center
                    gap-4
                    text-left
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-blue-500/30
                  "
                >

                  {/* NÚMERO */}

                  <div
                    className={`
                      hidden
                      sm:flex
                      shrink-0
                      w-9
                      h-9
                      rounded-xl
                      items-center
                      justify-center
                      text-xs
                      font-black
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
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
                      md:text-base
                      font-bold
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


                  {/* ICONO */}

                  <div
                    className={`
                      shrink-0
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
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
                        md:px-6
                        pb-6
                        pt-0
                        sm:pl-[4.75rem]
                        pr-14
                      "
                    >

                      <div className="h-px bg-slate-100 mb-5" />

                      <p
                        className="
                          text-sm
                          md:text-[15px]
                          text-slate-500
                          leading-7
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
            TEXTO FINAL
        ================================================== */}

        <div
          className="
            mt-10
            text-center
            text-sm
            text-slate-400
          "
        >

          ¿Tienes alguna otra consulta?

          <span className="text-blue-600 font-semibold ml-1">
            Estamos para ayudarte.
          </span>

        </div>

      </div>

    </section>

  );

}