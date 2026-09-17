import {
  GraduationCap,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


const semesters = [

  {
    semester: "1° Semestre",
    goal: 55,
    description: "Aplicación básica del formato académico.",
  },

  {
    semester: "2° Semestre",
    goal: 65,
    description: "Uso adecuado de citas y referencias.",
  },

  {
    semester: "3° Semestre",
    goal: 75,
    description: "Mayor consistencia en la estructura del documento.",
  },

  {
    semester: "4° Semestre",
    goal: 85,
    description: "Aplicación de criterios académicos institucionales.",
  },

  {
    semester: "5° Semestre",
    goal: 90,
    description: "Documentos con mayor precisión y menor margen de error.",
  },

 {
  semester: "6° Semestre",
  goal: 97,
  description: "Mayor dominio de los criterios para trabajos finales.",
},

];


export default function SemesterProgress() {

  return (

    <section
      className="
        relative
        overflow-hidden
        py-20
        md:py-24
        bg-slate-50
      "
    >

      {/* ==================================================
          DECORACIÓN DE FONDO
      ================================================== */}

      <div
        className="
          absolute
          -top-40
          -right-40
          w-96
          h-96
          rounded-full
          bg-blue-100/50
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -left-40
          w-96
          h-96
          rounded-full
          bg-indigo-100/40
          blur-3xl
          pointer-events-none
        "
      />


      <div
        className="
          relative
          max-w-6xl
          mx-auto
          px-6
          lg:px-8
        "
      >


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div
          className="
            max-w-2xl
            mx-auto
            text-center
          "
        >

          <span
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

            <GraduationCap size={15} />

            Ruta académica

          </span>


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

            Una revisión que crece contigo

          </h2>


          <p
            className="
              mt-4
              max-w-xl
              mx-auto
              text-sm
              md:text-base
              leading-7
              text-slate-500
            "
          >

            A medida que avanzas en tu formación académica,
            puedes fortalecer progresivamente la calidad y
            consistencia de tus documentos.

          </p>

        </div>


        {/* ==================================================
            TARJETAS DE SEMESTRES
        ================================================== */}

        <div
          className="
            mt-12
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
        >

          {semesters.map((item, index) => (

            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                transition-all
                duration-200
                hover:-translate-y-1
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
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-xl
                      bg-blue-50
                      border
                      border-blue-100
                      text-blue-600
                      text-xs
                      font-black
                      shrink-0
                      transition-colors
                      duration-200
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >

                    {index + 1}

                  </div>


                  <span
                    className="
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >

                    {item.semester}

                  </span>

                </div>


                {/* PORCENTAJE */}

                <span
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-slate-900
                  "
                >

                  {item.goal}%

                </span>

              </div>


              {/* ==================================================
                  BARRA DE PROGRESO
              ================================================== */}

              <div
                className="
                  mt-5
                  h-1.5
                  rounded-full
                  bg-slate-100
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    transition-all
                    duration-500
                  "
                  style={{
                    width: `${item.goal}%`,
                  }}
                />

              </div>


              {/* ==================================================
                  DESCRIPCIÓN
              ================================================== */}

              <p
                className="
                  mt-4
                  text-sm
                  leading-6
                  text-slate-500
                "
              >

                {item.description}

              </p>


              {/* ==================================================
                  INDICADOR
              ================================================== */}

              <div
                className="
                  mt-5
                  pt-4
                  border-t
                  border-slate-100
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-slate-400
                "
              >

                <CheckCircle2
                  size={14}
                  className="
                    text-blue-500
                    shrink-0
                  "
                />

                Desarrollo progresivo

              </div>

            </div>

          ))}

        </div>


        {/* ==================================================
            BLOQUE INFORMATIVO FINAL
        ================================================== */}

        <div
          className="
            mt-10
            rounded-2xl
            border
            border-blue-100
            bg-white
            px-6
            py-5
            shadow-sm
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-5
            "
          >

            {/* ==================================================
                TEXTO
            ================================================== */}

            <div
              className="
                flex
                items-start
                gap-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  shrink-0
                "
              >

                <TrendingUp size={19} />

              </div>


              <div>

                <p
                  className="
                    text-sm
                    font-bold
                    text-slate-800
                  "
                >

                  Evolución académica

                </p>


                <p
                  className="
                    mt-1
                    text-xs
                    md:text-sm
                    leading-5
                    text-slate-500
                  "
                >

                  Fortalece progresivamente la calidad de tus
                  documentos durante tu formación.

                </p>

              </div>

            </div>


            {/* ==================================================
                REFERENCIA FINAL
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-4
                shrink-0
              "
            >

              <div className="text-right">

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wide
                    font-bold
                    text-slate-400
                  "
                >

                  6° semestre

                </p>


                <p
                  className="
                    mt-0.5
                    text-2xl
                    font-black
                    text-blue-600
                  "
                >

                  97%

                </p>

              </div>


              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  rounded-full
                  bg-blue-50
                  text-blue-600
                "
              >

                <ArrowRight size={17} />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}
