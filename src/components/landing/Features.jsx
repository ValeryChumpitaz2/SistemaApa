import {
  FileText,
  BookOpen,
  BarChart3,
  Layers
} from "lucide-react";


const data = [

  {
    icon: <FileText />,
    title: "Análisis documental",
    text: "Procesa archivos Word, PDF y enlaces institucionales."
  },

  {
    icon: <BookOpen />,
    title: "Validación APA",
    text: "Comprueba los criterios académicos definidos por la institución."
  },

  {
    icon: <BarChart3 />,
    title: "Reportes claros",
    text: "Obtén resultados fáciles de interpretar y recomendaciones concretas."
  },

  {
    icon: <Layers />,
    title: "Revisión masiva",
    text: "Evalúa grupos completos de estudiantes de forma rápida y organizada."
  }

];


export default function Features() {

  return (

    <section
      id="features"
      className="py-24 bg-white"
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
            Todo en un solo lugar
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
            Una evaluación más clara
          </h2>


          <p className="mt-5 text-lg text-slate-600">

            Obtén información útil para mejorar tus documentos
            académicos antes de presentarlos.

          </p>

        </div>


        <div
          className="
            mt-16
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {data.map((item, index) => (

            <div
              key={index}
              className="
                group
                bg-white
                p-7
                rounded-3xl
                border
                border-slate-200
                shadow-sm
                hover:-translate-y-2
                hover:shadow-xl
                hover:border-blue-300
                transition-all
              "
            >

              <div
                className="
                  bg-blue-100
                  text-blue-700
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  group-hover:bg-blue-600
                  group-hover:text-white
                  transition
                "
              >

                {item.icon}

              </div>


              <h3 className="mt-6 text-xl font-bold text-slate-900">

                {item.title}

              </h3>


              <p className="mt-3 text-slate-600 leading-7">

                {item.text}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}