import {
  Bell,
  UserCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";


import {
  useAuth
} from "../../../auth/AuthContext";



export default function DashboardHeader({
  notificaciones = []
}) {


  const {
    user
  } = useAuth();



  return (


    <section

      className="
      relative
      overflow-hidden
      bg-gradient-to-r
      from-[#1D3681]
      via-blue-700
      to-blue-500
      rounded-3xl
      p-8
      text-white
      shadow-xl
      "

    >



      {/* DECORACION */}

      <div
        className="
        absolute
        -right-10
        -top-10
        w-40
        h-40
        bg-white/10
        rounded-full
        "
      />

      <div
        className="
        absolute
        right-20
        bottom-0
        w-24
        h-24
        bg-white/10
        rounded-full
        "
      />





      <div
        className="
        relative
        flex
        flex-col
        lg:flex-row
        lg:items-center
        justify-between
        gap-6
        "
      >





        {/* TEXTO */}

        <div>


          <div
            className="
            flex
            items-center
            gap-2
            mb-3
            "
          >

            <Sparkles
              size={22}
            />


            <span
              className="
              text-blue-100
              text-sm
              font-semibold
              "
            >

              Asistente académico inteligente

            </span>


          </div>




          <h1
            className="
            text-3xl
            md:text-4xl
            font-black
            "
          >

            Hola,{" "}

            {
              user?.usuario || "Estudiante"
            }

            👋


          </h1>



          <p
            className="
            mt-3
            text-blue-100
            max-w-xl
            "
          >

            Analiza tus documentos, mejora tus normas APA
            y recibe recomendaciones para obtener mejores resultados.


          </p>





          <button

            className="
            mt-6
            bg-white
            text-blue-700
            px-6
            py-3
            rounded-2xl
            font-bold
            flex
            items-center
            gap-2
            hover:bg-blue-50
            transition
            shadow-lg
            "

          >

            Nueva evaluación


            <ArrowRight
              size={18}
            />

          </button>



        </div>








        {/* PANEL DERECHO */}


        <div

          className="
          bg-white/15
          backdrop-blur-md
          rounded-3xl
          p-6
          min-w-[240px]
          "

        >



          <div
            className="
            flex
            items-center
            justify-between
            mb-5
            "
          >


            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              <UserCircle
                size={45}
              />


              <div>

                <p
                  className="
                  font-bold
                  "
                >

                  Perfil activo

                </p>


                <span
                  className="
                  text-xs
                  text-blue-100
                  "
                >

                  Estudiante

                </span>


              </div>


            </div>


          </div>





          <div
            className="
            border-t
            border-white/20
            pt-4
            flex
            items-center
            justify-between
            "
          >


            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <Bell
                size={20}
              />


              <span
                className="
                text-sm
                "
              >

                Alertas

              </span>


            </div>




            <span

              className="
              bg-red-500
              px-3
              py-1
              rounded-full
              text-xs
              font-bold
              "

            >

              {
                notificaciones.length
              }

            </span>


          </div>




        </div>



      </div>



    </section>


  );

}