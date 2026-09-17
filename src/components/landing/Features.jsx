import {
  FileText,
  BookOpen,
  BarChart3,
  Layers,
  CheckCircle2,
} from "lucide-react";


const data = [
  {
    icon: FileText,
    number: "01",
    title: "Análisis documental",
    text: "Procesa documentos académicos y organiza la información necesaria para su evaluación.",
  },

  {
    icon: BookOpen,
    number: "02",
    title: "Validación académica",
    text: "Comprueba criterios institucionales como estructura, formato APA y referencias.",
  },

  {
    icon: BarChart3,
    number: "03",
    title: "Reportes claros",
    text: "Obtén resultados organizados con observaciones y recomendaciones para mejorar.",
  },

  {
    icon: Layers,
    number: "04",
    title: "Revisión masiva",
    text: "Procesa múltiples documentos de estudiantes de manera rápida y ordenada.",
  },
];


export default function Features() {

  return (

    <section
      id="features"
      className="
        py-20
        md:py-24
        bg-slate-50
      "
    >

      <div className="max-w-6xl mx-auto px-6 lg:px-8">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="max-w-2xl mx-auto text-center">

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
              px-3.5
              py-1.5
              text-xs
              font-bold
              text-blue-600
            "
          >

            <CheckCircle2 size={14} />

            Todo en un solo lugar

          </div>


          {/* TÍTULO */}

          <h2
            className="
              mt-5
              text-3xl
              md:text-4xl
              font-black
              tracking-tight
              text-slate-900
            "
          >

            Una evaluación más clara

            <span className="block text-blue-600">
              y organizada
            </span>

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-4
              text-sm
              md:text-base
              leading-7
              text-slate-500
              max-w-xl
              mx-auto
            "
          >

            APP Reviewer reúne las herramientas necesarias
            para analizar y evaluar documentos académicos
            desde una sola plataforma.

          </p>

        </div>


        {/* ==================================================
            TARJETAS
        ================================================== */}

        <div
          className="
            mt-12
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >

          {data.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.number}
                className="
                  group
                  relative
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  p-5
                  transition-all
                  duration-200
                  hover:border-blue-200
                  hover:shadow-lg
                  hover:shadow-blue-900/5
                "
              >

                {/* ==================================================
                    CABECERA
                ================================================== */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  {/* ICONO */}

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      transition-colors
                      duration-200
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >

                    <Icon size={21} />

                  </div>


                  {/* NÚMERO */}

                  <span
                    className="
                      text-[11px]
                      font-black
                      tracking-widest
                      text-slate-300
                      group-hover:text-blue-200
                      transition-colors
                    "
                  >

                    {item.number}

                  </span>

                </div>


                {/* ==================================================
                    TÍTULO
                ================================================== */}

                <h3
                  className="
                    mt-5
                    text-base
                    font-bold
                    text-slate-900
                  "
                >

                  {item.title}

                </h3>


                {/* ==================================================
                    DESCRIPCIÓN
                ================================================== */}

                <p
                  className="
                    mt-2.5
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >

                  {item.text}

                </p>


                {/* LÍNEA */}

                <div
                  className="
                    mt-5
                    h-px
                    w-8
                    bg-blue-500
                    opacity-40
                    transition-all
                    duration-300
                    group-hover:w-12
                    group-hover:opacity-100
                  "
                />

              </div>

            );

          })}

        </div>


        {/* ==================================================
            MENSAJE INFERIOR
        ================================================== */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-2
            text-xs
            md:text-sm
            text-slate-400
            text-center
          "
        >

          <CheckCircle2
            size={15}
            className="text-blue-500 shrink-0"
          />

          <span>
            Diseñado para facilitar la evaluación académica
            en Valle Grande.
          </span>

        </div>

      </div>

    </section>

  );
}
