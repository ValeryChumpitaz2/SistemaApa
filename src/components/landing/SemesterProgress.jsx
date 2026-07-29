import {
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";


const semesters = [
  {
    semester: "1° Semestre",
    goal: 55,
    description: "Aplicación básica del formato APA.",
  },
  {
    semester: "2° Semestre",
    goal: 65,
    description: "Uso correcto de citas y referencias.",
  },
  {
    semester: "3° Semestre",
    goal: 75,
    description: "Mayor consistencia en la estructura académica.",
  },
  {
    semester: "4° Semestre",
    goal: 80,
    description: "Aplicación de criterios institucionales.",
  },
  {
    semester: "5° Semestre",
    goal: 85,
    description: "Documentos con menor margen de error.",
  },
  {
    semester: "6° Semestre",
    goal: 90,
    description: "Nivel esperado para trabajos finales.",
  },
];


export default function SemesterProgress() {

  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">


        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">


          <div className="
            inline-flex
            items-center
            gap-2
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
          ">

            <GraduationCap size={18}/>

            Ruta académica

          </div>



          <h2 className="
            mt-6
            text-4xl
            md:text-5xl
            font-bold
            text-slate-900
          ">

            Progreso APA por semestre

          </h2>



          <p className="
            mt-5
            text-lg
            text-slate-600
          ">

            El nivel de exigencia aumenta progresivamente para fortalecer
            las competencias de redacción académica y formato institucional.

          </p>


        </div>



        {/* Cards */}

        <div className="
          mt-16
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">


          {
            semesters.map((item,index)=>(


              <div
                key={index}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >


                <div className="
                  flex
                  justify-between
                  items-center
                ">


                  <span className="
                    text-blue-600
                    font-semibold
                  ">

                    {item.semester}

                  </span>



                  <span className="
                    text-3xl
                    font-bold
                    text-slate-900
                  ">

                    {item.goal}%

                  </span>


                </div>




                {/* Barra de progreso */}

                <div className="
                  mt-6
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                ">


                  <div

                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-500
                      transition-all
                      duration-700
                    "

                    style={{
                      width:`${item.goal}%`
                    }}

                  />


                </div>




                <p className="
                  mt-5
                  text-slate-600
                  leading-7
                ">

                  {item.description}

                </p>




                <div className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                ">


                  <TrendingUp size={16}/>


                  Nivel esperado


                </div>


              </div>


            ))
          }


        </div>





        {/* Banner final */}

        <div className="
          mt-16
          rounded-3xl
          bg-gradient-to-r
          from-blue-950
          to-indigo-700
          p-10
          text-white
        ">


          <div className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-8
          ">


            <div>


              <div className="
                flex
                items-center
                gap-2
                text-cyan-200
              ">


                <TrendingUp size={18}/>


                Evolución académica


              </div>




              <h3 className="
                mt-4
                text-3xl
                font-bold
              ">

                Mejora tu desempeño semestre a semestre

              </h3>




              <p className="
                mt-3
                text-blue-100
                max-w-2xl
              ">

                La plataforma adapta los criterios de evaluación según
                la etapa formativa del estudiante.

              </p>


            </div>




            <div className="
              text-center
            ">


              <div className="
                text-6xl
                font-bold
              ">

                90%

              </div>



              <p className="
                text-blue-200
              ">

                Meta final


              </p>



              <div className="
                mt-5
                inline-flex
                items-center
                gap-2
                bg-white/10
                px-5
                py-3
                rounded-xl
              ">


                Nivel de egreso

                <ArrowRight size={18}/>


              </div>


            </div>



          </div>


        </div>


      </div>


    </section>

  );

}