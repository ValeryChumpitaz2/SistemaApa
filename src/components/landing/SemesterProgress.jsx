import {
  GraduationCap,
  TrendingUp,
  ArrowRight
} from "lucide-react";


const semesters = [

  {
    semester: "1° Semestre",
    goal: 55,
    description: "Aplicación básica del formato APA."
  },

  {
    semester: "2° Semestre",
    goal: 65,
    description: "Uso correcto de citas y referencias."
  },

  {
    semester: "3° Semestre",
    goal: 75,
    description: "Mayor consistencia en la estructura académica."
  },

  {
    semester: "4° Semestre",
    goal: 80,
    description: "Aplicación de criterios institucionales."
  },

  {
    semester: "5° Semestre",
    goal: 85,
    description: "Documentos con menor margen de error."
  },

  {
    semester: "6° Semestre",
    goal: 90,
    description: "Nivel esperado para trabajos finales."
  }

];


export default function SemesterProgress() {

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-blue-100
              text-blue-700
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            "
          >

            <GraduationCap size={18} />

            Ruta académica

          </span>


          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-black
              text-slate-900
            "
          >

            Una revisión que crece contigo

          </h2>


          <p className="mt-5 text-lg text-slate-600">

            A medida que avanzas en tu formación,
            los criterios académicos aumentan progresivamente
            para acompañar tu desarrollo.

          </p>

        </div>


        <div
          className="
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
                bg-slate-50
                border
                border-slate-200
                rounded-3xl
                p-7
                hover:shadow-xl
                hover:-translate-y-2
                transition
              "
            >

              <div className="flex justify-between items-center">

                <span className="font-bold text-blue-600">
                  {item.semester}
                </span>


                <span className="text-3xl font-black text-slate-900">
                  {item.goal}%
                </span>

              </div>


              <div className="mt-6 h-3 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                  "
                  style={{
                    width: `${item.goal}%`
                  }}
                />

              </div>


              <p className="mt-5 text-slate-600 leading-7">

                {item.description}

              </p>


              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                "
              >

                <TrendingUp size={16} />

                Criterios adaptados al semestre

              </div>

            </div>

          ))}

        </div>


        <div
          className="
            mt-14
            rounded-3xl
            bg-gradient-to-r
            from-blue-950
            to-indigo-700
            p-10
            text-white
          "
        >

          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">

            <div>

              <div className="flex items-center gap-2 text-cyan-200">

                <TrendingUp size={18} />

                Evolución académica

              </div>


              <h3 className="mt-4 text-3xl font-black">

                Prepárate para cada etapa de tu carrera

              </h3>


              <p className="mt-3 text-blue-100 max-w-2xl">

                VG Smart Review adapta la evaluación a la etapa
                formativa del estudiante.

              </p>

            </div>


            <div className="text-center">

              <div className="text-6xl font-black">
                90%
              </div>

              <p className="text-blue-200">
                Nivel esperado al egresar
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-5 py-3 rounded-xl">

                Sexto semestre

                <ArrowRight size={18} />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}