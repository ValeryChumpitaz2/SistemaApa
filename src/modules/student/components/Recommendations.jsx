import {
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";


export default function Recommendations({

  criterios = []

}) {


  // ==================================================
  // CRITERIOS QUE NECESITAN ATENCIÓN
  // ==================================================

  const pendientes = criterios.filter(
    item => !item.cumple
  );


  // ==================================================
  // TODOS CUMPLEN
  // ==================================================

  const todoCorrecto =
    pendientes.length === 0;


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      border
      border-gray-200
      dark:border-slate-800
      shadow-sm
      p-6
    ">


      {/* ==================================================
          CABECERA
      ================================================== */}

      <div className="
        flex
        items-center
        gap-3
        mb-5
      ">


        <div className="
          bg-yellow-100
          dark:bg-yellow-900/30
          text-yellow-700
          dark:text-yellow-400
          p-3
          rounded-xl
        ">

          <AlertTriangle size={24}/>

        </div>


        <div>

          <h3 className="
            text-xl
            font-black
            text-gray-800
            dark:text-white
          ">

            Recomendaciones para mejorar

          </h3>


          <p className="
            text-sm
            text-gray-500
            dark:text-gray-400
            mt-1
          ">

            Aspectos que requieren atención en el documento.

          </p>

        </div>


      </div>



      {/* ==================================================
          TODO CORRECTO
      ================================================== */}

      {

        todoCorrecto

          ?

          (

            <div className="
              flex
              items-center
              gap-3
              bg-green-50
              dark:bg-green-900/20
              text-green-700
              dark:text-green-400
              border
              border-green-200
              dark:border-green-900
              p-4
              rounded-2xl
            ">


              <CheckCircle
                size={22}
                className="shrink-0"
              />


              <div>

                <p className="
                  font-bold
                ">

                  ¡Excelente!

                </p>


                <p className="
                  text-sm
                  mt-1
                ">

                  Todos los criterios cumplen
                  correctamente.

                </p>

              </div>


            </div>

          )


          :

          (

            <div className="space-y-3">


              {

                pendientes.map(
                  (item, index) => {


                    const puntaje =
                      Number(
                        item.puntaje || 0
                      );


                    const maximo =
                      Number(
                        item.maximo || 0
                      );


                    const noCumple =
                      puntaje === 0;


                    return (

                      <div

                        key={index}

                        className={`
                          rounded-2xl
                          p-4
                          border

                          ${
                            noCumple

                              ?

                              `
                                bg-red-50
                                dark:bg-red-900/20
                                border-red-200
                                dark:border-red-900
                              `

                              :

                              `
                                bg-yellow-50
                                dark:bg-yellow-900/20
                                border-yellow-200
                                dark:border-yellow-900
                              `
                          }

                        `}

                      >


                        {/* ==================================================
                            CABECERA DE RECOMENDACIÓN
                        ================================================== */}

                        <div className="
                          flex
                          items-start
                          gap-3
                        ">


                          {

                            noCumple

                              ?

                              (

                                <XCircle
                                  size={20}
                                  className="
                                    text-red-500
                                    shrink-0
                                    mt-0.5
                                  "
                                />

                              )

                              :

                              (

                                <AlertTriangle
                                  size={20}
                                  className="
                                    text-yellow-600
                                    shrink-0
                                    mt-0.5
                                  "
                                />

                              )

                          }


                          <div className="flex-1">


                            <div className="
                              flex
                              justify-between
                              items-start
                              gap-3
                            ">


                              <p className="
                                font-bold
                                text-gray-800
                                dark:text-white
                              ">

                                {item.criterio}

                              </p>


                              <span className="
                                text-xs
                                font-bold
                                text-gray-500
                                dark:text-gray-400
                                whitespace-nowrap
                              ">

                                {puntaje} / {maximo}

                              </span>


                            </div>



                            {/* ==================================================
                                RECOMENDACIÓN REAL
                            ================================================== */}

                            <p className="
                              text-sm
                              text-gray-600
                              dark:text-gray-300
                              mt-2
                              leading-relaxed
                            ">

                              {

                                item.recomendacion ||

                                "Revisar los puntos pendientes de este criterio."

                              }

                            </p>


                          </div>


                        </div>


                      </div>

                    );

                  }

                )

              }


            </div>

          )

      }


    </div>

  );

}