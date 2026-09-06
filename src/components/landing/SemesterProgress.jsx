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
    goal: 80,
    description: "Aplicación de criterios académicos institucionales.",
  },

  {
    semester: "5° Semestre",
    goal: 85,
    description: "Documentos con mayor precisión y menor margen de error.",
  },

  {
    semester: "6° Semestre",
    goal: 90,
    description: "Mayor dominio de los criterios para trabajos finales.",
  },

];


export default function SemesterProgress() {

  return (

    <section
      className="
        relative
        overflow-hidden
        py-24
        md:py-28
        bg-white
      "
    >

      {/* ==================================================
          DECORACIÓN
      ================================================== */}

      <div
        className="
          absolute
          -top-40
          -right-40
          w-96
          h-96
          rounded-full
          bg-blue-50
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
          bg-indigo-50
          blur-3xl
          pointer-events-none
        "
      />


      <div className="relative max-w-7xl mx-auto px-6">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="text-center max-w-3xl mx-auto">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-100
              text-blue-700
              px-4
              py-2
              text-sm
              font-bold
            "
          >

            <GraduationCap size={17} />

            Ruta académica

          </span>


          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-black
              tracking-tight
              text-slate-900
            "
          >

            Una revisión que crece contigo

          </h2>


          <p
            className="
              mt-5
              text-base
              md:text-lg
              text-slate-600
              leading-8
            "
          >

            A medida que avanzas en tu formación académica,
            puedes fortalecer progresivamente la calidad y
            consistencia de tus documentos.

          </p>

        </div>


        {/* ==================================================
            PROGRESO
        ================================================== */}

        <div
          className="
            relative
            mt-16
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {semesters.map((item, index) => (

            <div
              key={index}
              className="
                group
                relative
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                p-7
                transition-all
                duration-300
                hover:-translate-y-2
                hover:bg-white
                hover:border-blue-200
                hover:shadow-xl
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
                  gap-4
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-100
                      text-blue-700
                      flex
                      items-center
                      justify-center
                      font-black
                      text-sm
                    "
                  >

                    {index + 1}

                  </div>


                  <span
                    className="
                      font-bold
                      text-slate-800
                    "
                  >

                    {item.semester}

                  </span>

                </div>


                <span
                  className="
                    text-2xl
                    font-black
                    text-blue-700
                  "
                >

                  {item.goal}%

                </span>

              </div>


              {/* ==================================================
                  BARRA
              ================================================== */}

              <div
                className="
                  mt-6
                  h-2.5
                  rounded-full
                  bg-slate-200
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
                    group-hover:from-blue-500
                    group-hover:to-cyan-400
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
                  mt-5
                  text-slate-600
                  leading-7
                "
              >

                {item.description}

              </p>


              {/* ==================================================
                  INDICADOR
              ================================================== */}

              <div
                className="
                  mt-6
                  pt-5
                  border-t
                  border-slate-200
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-slate-500
                "
              >

                <CheckCircle2
                  size={15}
                  className="text-blue-600"
                />

                Desarrollo progresivo

              </div>

            </div>

          ))}

        </div>


        {/* ==================================================
            BLOQUE FINAL
        ================================================== */}

        <div
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-indigo-800
            p-8
            md:p-12
            text-white
            shadow-2xl
            shadow-blue-950/15
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              absolute
              -right-24
              -top-24
              w-72
              h-72
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />


          <div
            className="
              relative
              flex
              flex-col
              lg:flex-row
              items-center
              justify-between
              gap-10
            "
          >

            {/* TEXTO */}

            <div className="max-w-2xl">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-cyan-300
                  text-sm
                  font-bold
                "
              >

                <TrendingUp size={17} />

                Evolución académica

              </div>


              <h3
                className="
                  mt-4
                  text-3xl
                  md:text-4xl
                  font-black
                  leading-tight
                "
              >

                Prepárate para cada etapa
                de tu carrera

              </h3>


              <p
                className="
                  mt-4
                  text-blue-100
                  leading-7
                "
              >

                Fortalece progresivamente tus documentos y
                desarrolla mejores prácticas de presentación
                académica durante tu formación.

              </p>

            </div>


            {/* INDICADOR */}

            <div
              className="
                shrink-0
                text-center
              "
            >

              <div
                className="
                  text-5xl
                  md:text-6xl
                  font-black
                  text-white
                "
              >

                90%

              </div>


              <p className="mt-1 text-sm text-blue-200">

                Referencia de progreso

              </p>


              <div
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/10
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  backdrop-blur-sm
                "
              >

                6° semestre

                <ArrowRight size={17} />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}