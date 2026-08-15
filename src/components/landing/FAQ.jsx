import {
  useState
} from "react";

import {
  ChevronDown
} from "lucide-react";


const preguntas = [

  {
    q: "¿Qué es VG Smart Review?",
    a: "Es una plataforma institucional que analiza documentos académicos y genera resultados según criterios definidos."
  },

  {
    q: "¿Quién puede utilizar la plataforma?",
    a: "Los estudiantes pueden revisar sus trabajos antes de entregarlos y los docentes pueden analizar múltiples entregas."
  },

  {
    q: "¿El docente debe revisar documento por documento?",
    a: "No necesariamente. La plataforma permite procesar múltiples documentos para facilitar la revisión y el seguimiento académico."
  },

  {
    q: "¿Qué criterios evalúa?",
    a: "La evaluación puede considerar formato APA, estructura, conclusiones, referencias bibliográficas, glosario y otros criterios institucionales."
  },

  {
    q: "¿La plataforma reemplaza la revisión del docente?",
    a: "No. VG Smart Review funciona como una herramienta de apoyo para facilitar el análisis y la retroalimentación."
  },

  {
    q: "¿Los resultados se generan automáticamente?",
    a: "Sí. El sistema procesa el documento y genera un resultado de evaluación junto con los criterios y observaciones correspondientes."
  }

];


export default function FAQ() {

  const [open, setOpen] = useState(null);


  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">

            Preguntas frecuentes

          </span>


          <h2 className="mt-5 text-4xl md:text-5xl font-black text-slate-900">

            Todo lo que necesitas saber

          </h2>


          <p className="mt-5 text-lg text-slate-600">

            Resolvemos las preguntas más frecuentes sobre
            VG Smart Review y su funcionamiento.

          </p>

        </div>


        <div className="mt-12 space-y-4">

          {preguntas.map((item, index) => (

            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                overflow-hidden
              "
            >

              <button
                onClick={() =>
                  setOpen(
                    open === index
                      ? null
                      : index
                  )
                }
                className="
                  w-full
                  px-6
                  py-5
                  flex
                  justify-between
                  items-center
                  text-left
                  font-bold
                  text-slate-900
                "
              >

                <span>
                  {item.q}
                </span>


                <ChevronDown
                  size={20}
                  className={`
                    transition
                    ${
                      open === index
                        ? "rotate-180 text-blue-600"
                        : ""
                    }
                  `}
                />

              </button>


              {open === index && (

                <div className="px-6 pb-6 text-slate-600 leading-7">

                  {item.a}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}