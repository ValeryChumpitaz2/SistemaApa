import {
  Quote,
  Star
} from "lucide-react";


const testimonios = [

  {
    texto: "La plataforma agiliza la revisión de trabajos y facilita la retroalimentación para los estudiantes.",
    persona: "Docente universitario",
    inicial: "D"
  },

  {
    texto: "Pude identificar errores en mi documento antes de entregarlo y mejorar su calidad.",
    persona: "Estudiante",
    inicial: "E"
  },

  {
    texto: "La evaluación automática optimiza el seguimiento y la gestión de trabajos académicos.",
    persona: "Coordinador académico",
    inicial: "C"
  }

];


export default function Testimonials() {

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">

            Experiencias reales

          </span>


          <h2 className="mt-5 text-4xl md:text-5xl font-black text-slate-900">

            Una mejor forma de revisar tus trabajos

          </h2>


          <p className="mt-5 text-lg text-slate-600">

            La plataforma ayuda a estudiantes, docentes y coordinadores
            a simplificar la revisión académica.

          </p>

        </div>


        <div className="mt-14 grid md:grid-cols-3 gap-7">

          {testimonios.map((item, index) => (

            <div
              key={index}
              className="
                bg-slate-50
                rounded-3xl
                border
                border-slate-200
                p-8
                hover:-translate-y-2
                hover:shadow-xl
                transition
              "
            >

              <div className="flex justify-between">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Quote
                    className="text-blue-700"
                    size={22}
                  />

                </div>


                <div className="flex gap-1">

                  {[1,2,3,4,5].map(i => (

                    <Star
                      key={i}
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />

                  ))}

                </div>

              </div>


              <p className="mt-6 text-slate-600 leading-7">

                "{item.texto}"

              </p>


              <div className="mt-7 pt-6 border-t border-slate-200 flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                  {item.inicial}

                </div>


                <div>

                  <p className="font-bold text-slate-900">

                    {item.persona}

                  </p>

                  <p className="text-sm text-slate-500">

                    Usuario de la plataforma

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}