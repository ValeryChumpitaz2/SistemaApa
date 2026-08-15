import {
  UploadCloud,
  SearchCheck,
  BarChart3,
  FileCheck,
  ArrowRight
} from "lucide-react";


const steps = [

  {
    icon: UploadCloud,
    title: "Inicia sesión",
    text: "Ingresa a la plataforma utilizando tu cuenta institucional."
  },

  {
    icon: SearchCheck,
    title: "Carga tu documento",
    text: "Selecciona el documento académico que deseas analizar."
  },

  {
    icon: BarChart3,
    title: "Revisa el resultado",
    text: "Consulta el puntaje, criterios cumplidos y aspectos que puedes mejorar."
  },

  {
    icon: FileCheck,
    title: "Corrige y entrega",
    text: "Aplica las sugerencias y presenta un documento con mayor calidad."
  }

];


export default function Process() {

  return (

    <section
      id="como-funciona"
      className="py-24 bg-slate-50"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span
            className="
              inline-flex
              rounded-full
              bg-blue-100
              text-blue-700
              px-4
              py-2
              text-sm
              font-semibold
            "
          >
            Proceso de revisión
          </span>


          <h2
            className="
              mt-5
              text-4xl
              md:text-5xl
              font-black
              text-slate-900
            "
          >
            ¿Cómo funciona?
          </h2>


          <p className="mt-5 text-lg text-slate-600">

            Obtén una evaluación de tu documento en pocos pasos
            y conoce qué puedes mejorar antes de entregarlo.

          </p>

        </div>


        <div className="mt-16 grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="relative"
              >

                {index < 3 && (

                  <ArrowRight
                    className="
                      hidden
                      md:block
                      absolute
                      top-16
                      -right-5
                      text-blue-200
                    "
                  />

                )}


                <div
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    p-7
                    h-full
                    shadow-sm
                    hover:-translate-y-2
                    hover:shadow-xl
                    transition
                  "
                >

                  <span className="text-sm font-black text-blue-600">
                    0{index + 1}
                  </span>


                  <div
                    className="
                      mt-5
                      w-14
                      h-14
                      rounded-2xl
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Icon size={28} />

                  </div>


                  <h3 className="mt-6 text-xl font-bold text-slate-900">

                    {step.title}

                  </h3>


                  <p className="mt-3 text-slate-600 leading-7">

                    {step.text}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

}