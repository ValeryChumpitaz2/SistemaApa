import {
  FileText,
  BookOpen,
  BarChart3,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";


const data = [

  {
    icon: FileText,
    number: "01",
    title: "Análisis documental",
    text: "Procesa documentos académicos en distintos formatos y centraliza la información necesaria para su evaluación.",
    color: "blue",
  },

  {
    icon: BookOpen,
    number: "02",
    title: "Validación académica",
    text: "Comprueba los criterios establecidos por la institución, incluyendo formato APA, estructura y referencias.",
    color: "indigo",
  },

  {
    icon: BarChart3,
    number: "03",
    title: "Reportes claros",
    text: "Obtén resultados organizados, observaciones y recomendaciones que facilitan la interpretación de la evaluación.",
    color: "emerald",
  },

  {
    icon: Layers,
    number: "04",
    title: "Revisión masiva",
    text: "Procesa múltiples documentos de un grupo de estudiantes de manera rápida, ordenada y eficiente.",
    color: "violet",
  },

];


const colorStyles = {

  blue: {
    icon: "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
    number: "text-blue-600",
    line: "bg-blue-600",
  },

  indigo: {
    icon: "bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white",
    number: "text-indigo-600",
    line: "bg-indigo-600",
  },

  emerald: {
    icon: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
    number: "text-emerald-600",
    line: "bg-emerald-600",
  },

  violet: {
    icon: "bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white",
    number: "text-violet-600",
    line: "bg-violet-600",
  },

};


export default function Features() {

  return (

    <section
      id="features"
      className="
        py-24
        md:py-28
        bg-white
      "
    >

      <div className="max-w-7xl mx-auto px-6">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="text-center max-w-3xl mx-auto">

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

            <CheckCircle2 size={15} />

            Todo en un solo lugar

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

            Una evaluación más clara
            <span className="block text-blue-600">
              y organizada
            </span>

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-5
              text-base
              md:text-lg
              text-slate-500
              leading-relaxed
              max-w-2xl
              mx-auto
            "
          >

            VG Smart Review reúne las herramientas necesarias
            para analizar, evaluar y mejorar documentos académicos
            desde una sola plataforma.

          </p>

        </div>


        {/* ==================================================
            TARJETAS
        ================================================== */}

        <div
          className="
            mt-14
            md:mt-16
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          "
        >

          {data.map((item) => {

            const Icon = item.icon;
            const styles = colorStyles[item.color];

            return (

              <div
                key={item.number}
                className="
                  group
                  relative
                  bg-white
                  p-7
                  rounded-3xl
                  border
                  border-slate-200
                  shadow-sm
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-xl
                  hover:shadow-slate-900/5
                "
              >

                {/* LÍNEA SUPERIOR */}

                <div
                  className={`
                    absolute
                    top-0
                    left-0
                    h-1
                    w-0
                    ${styles.line}
                    transition-all
                    duration-500
                    group-hover:w-full
                  `}
                />


                {/* ==================================================
                    CABECERA DE TARJETA
                ================================================== */}

                <div className="flex items-start justify-between">

                  {/* ICONO */}

                  <div
                    className={`
                      w-14
                      h-14
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      ${styles.icon}
                    `}
                  >

                    <Icon size={26} />

                  </div>


                  {/* NÚMERO */}

                  <span
                    className={`
                      text-xs
                      font-black
                      tracking-widest
                      ${styles.number}
                    `}
                  >

                    {item.number}

                  </span>

                </div>


                {/* ==================================================
                    CONTENIDO
                ================================================== */}

                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    text-slate-900
                    tracking-tight
                  "
                >

                  {item.title}

                </h3>


                <p
                  className="
                    mt-3
                    text-sm
                    text-slate-500
                    leading-7
                  "
                >

                  {item.text}

                </p>


                {/* ==================================================
                    INDICADOR
                ================================================== */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-400
                    group-hover:text-slate-600
                    transition-colors
                  "
                >

                  <span>
                    Conocer más
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />

                </div>

              </div>

            );

          })}

        </div>


        {/* ==================================================
            MENSAJE INFERIOR
        ================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-2
            text-sm
            text-slate-400
            text-center
          "
        >

          <CheckCircle2
            size={16}
            className="text-blue-500"
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