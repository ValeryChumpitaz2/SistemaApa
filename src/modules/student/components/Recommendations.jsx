import {
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";


export default function Recommendations({
  criterios = []
}) {

  // ==================================================
  // NORMALIZAR CRITERIOS PENDIENTES
  // ==================================================

  const pendientes = criterios.filter((item) => {

    const puntaje =
      Number(item?.puntaje ?? 0);

    const maximo =
      Number(item?.maximo ?? 0);

    // Si existe explícitamente cumple,
    // respetamos ese valor.
    if (
      typeof item?.cumple === "boolean"
    ) {

      return !item.cumple;

    }

    // Si no existe cumple,
    // usamos el puntaje.
    return puntaje < maximo;

  });


  // ==================================================
  // TODO CORRECTO
  // ==================================================

  const todoCorrecto =
    pendientes.length === 0;


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <section className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      border
      border-gray-200
      dark:border-slate-800
      shadow-sm
      overflow-hidden
    ">


      {/* ==================================================
          CABECERA
      ================================================== */}

      <div className="
        px-6
        py-5
        border-b
        border-gray-100
        dark:border-slate-800
        flex
        items-center
        gap-3
      ">


        <div className={`
          p-2.5
          rounded-xl

          ${
            todoCorrecto

              ? `
                bg-green-100
                text-green-700
                dark:bg-green-900/30
                dark:text-green-400
              `

              : `
                bg-amber-100
                text-amber-700
                dark:bg-amber-900/30
                dark:text-amber-400
              `
          }
        `}>

          {
            todoCorrecto

              ? <CheckCircle size={21} />

              : <AlertTriangle size={21} />
          }

        </div>


        <div>

          <h2 className="
            text-xl
            font-black
            text-gray-800
            dark:text-white
          ">

            Recomendaciones

          </h2>


          <p className="
            text-sm
            text-gray-500
            dark:text-gray-400
            mt-0.5
          ">

            {
              todoCorrecto

                ? "Todos los criterios fueron cumplidos."

                : `${pendientes.length} criterio${
                    pendientes.length === 1
                      ? ""
                      : "s"
                  } requiere${
                    pendientes.length === 1
                      ? ""
                      : "n"
                  } atención.`
            }

          </p>

        </div>

      </div>


      {/* ==================================================
          CONTENIDO
      ================================================== */}

      <div className="p-6">


        {/* ==================================================
            TODO CORRECTO
        ================================================== */}

        {
          todoCorrecto && (

            <div className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-green-50
              dark:bg-green-900/20
              border
              border-green-200
              dark:border-green-900
              px-4
              py-4
            ">


              <CheckCircle
                size={21}
                className="
                  text-green-600
                  dark:text-green-400
                  shrink-0
                "
              />


              <div>

                <p className="
                  font-bold
                  text-green-700
                  dark:text-green-400
                ">

                  Documento listo

                </p>


                <p className="
                  text-sm
                  text-green-700/80
                  dark:text-green-300/80
                  mt-0.5
                ">

                  No hay recomendaciones pendientes
                  para esta evaluación.

                </p>

              </div>

            </div>

          )
        }


        {/* ==================================================
            PENDIENTES
        ================================================== */}

        {
          !todoCorrecto && (

            <div className="space-y-3">

              {
                pendientes.map(
                  (item, index) => {

                    const puntaje =
                      Number(
                        item?.puntaje ?? 0
                      );

                    const maximo =
                      Number(
                        item?.maximo ?? 0
                      );


                    const sinPuntaje =
                      puntaje <= 0;


                    const recomendacion =
                      item?.recomendacion ||
                      item?.recomendaciones ||
                      item?.sugerencia ||
                      item?.sugerencias ||
                      "Revisar este criterio antes de realizar la entrega.";


                    return (

                      <div
                        key={
                          item?.criterio ||
                          index
                        }
                        className="
                          rounded-2xl
                          border
                          border-amber-200
                          dark:border-amber-900
                          bg-amber-50
                          dark:bg-amber-900/10
                          p-4
                        "
                      >


                        <div className="
                          flex
                          items-start
                          gap-3
                        ">


                          <div className="
                            mt-0.5
                            shrink-0
                          ">

                            {
                              sinPuntaje

                                ?

                                <XCircle
                                  size={20}
                                  className="
                                    text-red-500
                                    dark:text-red-400
                                  "
                                />

                                :

                                <AlertTriangle
                                  size={20}
                                  className="
                                    text-amber-600
                                    dark:text-amber-400
                                  "
                                />
                            }

                          </div>


                          <div className="
                            min-w-0
                            flex-1
                          ">


                            <div className="
                              flex
                              flex-col
                              sm:flex-row
                              sm:items-center
                              sm:justify-between
                              gap-2
                            ">


                              <h3 className="
                                font-black
                                text-gray-800
                                dark:text-white
                              ">

                                {item?.criterio ||
                                  `Criterio ${index + 1}`}

                              </h3>


                              <span className="
                                w-fit
                                rounded-lg
                                bg-white
                                dark:bg-slate-900
                                border
                                border-amber-200
                                dark:border-amber-900
                                px-2.5
                                py-1
                                text-xs
                                font-black
                                text-gray-600
                                dark:text-gray-300
                              ">

                                {puntaje} / {maximo}

                              </span>

                            </div>


                            <p className="
                              mt-2
                              text-sm
                              leading-relaxed
                              text-gray-600
                              dark:text-gray-300
                            ">

                              {recomendacion}

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

    </section>

  );

}
