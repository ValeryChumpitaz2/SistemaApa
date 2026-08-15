import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import { useState } from "react";


// ==================================================
// RESUMEN DEL CRITERIO
// ==================================================

function obtenerResumenCriterio(criterio) {

  // -----------------------------------------------
  // CONCLUSIONES
  // -----------------------------------------------

  if (
    criterio.criterio === "Conclusiones"
  ) {

    const calculo =
      criterio.detalles?.find(
        detalle =>
          detalle.titulo === "Cálculo requerido"
      );


    if (calculo) {

      return calculo.descripcion;

    }


    return "Se verificaron las conclusiones requeridas.";

  }


  // -----------------------------------------------
  // REFERENCIAS
  // -----------------------------------------------

  if (
    criterio.criterio ===
    "Referencias bibliográficas"
  ) {

    return (
      "Se verificó la cantidad y existencia " +
      "de referencias bibliográficas."
    );

  }


  // -----------------------------------------------
  // GLOSARIO
  // -----------------------------------------------

  if (
    criterio.criterio === "Glosario"
  ) {

    return (
      "Se verificó la existencia y cantidad " +
      "de términos del glosario."
    );

  }


  // -----------------------------------------------
  // FORMATO
  // -----------------------------------------------

  if (
    criterio.criterio ===
    "Nombre archivo, estructura y formato institucional"
  ) {

    return (
      "Se verificó la estructura y el formato " +
      "institucional del documento."
    );

  }


  // -----------------------------------------------
  // RESUMEN POR DEFECTO
  // -----------------------------------------------

  return "Criterio evaluado correctamente.";

}



// ==================================================
// COMPONENTE
// ==================================================

export default function CriteriaList({

  criterios = []

}) {


  // ==================================================
  // ESTADO DE DETALLES ABIERTOS
  // ==================================================

  const [
    detallesAbiertos,
    setDetallesAbiertos
  ] = useState({});


  // ==================================================
  // ABRIR / CERRAR DETALLE
  // ==================================================

  const toggleDetalle = (index) => {

    setDetallesAbiertos(prev => ({

      ...prev,

      [index]: !prev[index]

    }));

  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="space-y-4">


      {/* ==================================================
          TÍTULO
      ================================================== */}

      <h2 className="
        text-2xl
        font-black
        text-gray-800
        dark:text-white
        mb-5
      ">

        Detalle de evaluación

      </h2>



      {/* ==================================================
          CRITERIOS
      ================================================== */}

      {

        criterios.map((criterio, index) => {


          // ==================================================
          // PUNTAJE
          // ==================================================

          const puntaje =
            Number(
              criterio.puntaje || 0
            );


          const maximo =
            Number(
              criterio.maximo || 0
            );


          // ==================================================
          // ESTADO
          // ==================================================

          const cumpleTotal =
            puntaje >= maximo - 0.001;


          const noCumple =
            puntaje <= 0;


          const estadoColor =

            cumpleTotal

              ?

              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"

              :

              noCumple

                ?

                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"

                :

                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";


          const EstadoIcono =

            cumpleTotal

              ?

              CheckCircle

              :

              noCumple

                ?

                XCircle

                :

                AlertTriangle;


          const estadoTexto =

            cumpleTotal

              ?

              "Cumple"

              :

              noCumple

                ?

                "No cumple"

                :

                "Cumple parcialmente";


          // ==================================================
          // DETALLE ABIERTO
          // ==================================================

          const abierto =
            !!detallesAbiertos[index];


          // ==================================================
          // RESUMEN
          // ==================================================

          const resumen =
            obtenerResumenCriterio(
              criterio
            );


          // ==================================================
          // RENDER DE TARJETA
          // ==================================================

          return (

            <div

              key={index}

              className="
                bg-white
                dark:bg-slate-900
                border
                border-gray-200
                dark:border-slate-800
                rounded-3xl
                shadow-sm
                overflow-hidden
              "

            >


              {/* ==================================================
                  CABECERA
              ================================================== */}

              <div className="
                p-5
                flex
                justify-between
                items-center
                gap-4
              ">


                {/* ==================================================
                    NOMBRE Y PUNTAJE
                ================================================== */}

                <div className="
                  min-w-0
                  flex-1
                ">


                  <h3 className="
                    font-black
                    text-lg
                    text-gray-800
                    dark:text-white
                    truncate
                  ">

                    {criterio.criterio}

                  </h3>


                  <p className="
                    text-gray-500
                    dark:text-gray-400
                    text-sm
                    mt-1
                  ">

                    Puntuación:

                    <strong className="
                      text-gray-800
                      dark:text-white
                      ml-1
                    ">

                      {puntaje}

                    </strong>

                    <span className="mx-1">
                      /
                    </span>

                    {maximo}

                  </p>


                </div>



                {/* ==================================================
                    ESTADO
                ================================================== */}

                <div className={`
                  px-3
                  py-1.5
                  rounded-full
                  font-bold
                  text-sm
                  flex
                  items-center
                  gap-2
                  shrink-0
                  ${estadoColor}
                `}>


                  <EstadoIcono
                    size={16}
                  />


                  <span>

                    {estadoTexto}

                  </span>


                </div>


              </div>



              {/* ==================================================
                  RESUMEN
              ================================================== */}

              <div className="
                px-5
                pb-4
              ">


                <p className="
                  text-sm
                  text-gray-600
                  dark:text-gray-300
                  leading-relaxed
                ">

                  {resumen}

                </p>


              </div>



              {/* ==================================================
                  BOTÓN VER DETALLE
              ================================================== */}

              <button

                type="button"

                onClick={() =>
                  toggleDetalle(index)
                }

                className="
                  w-full
                  border-t
                  border-gray-100
                  dark:border-slate-800
                  px-5
                  py-3
                  flex
                  items-center
                  justify-between
                  text-sm
                  font-bold
                  text-blue-600
                  dark:text-blue-400
                  hover:bg-blue-50
                  dark:hover:bg-slate-800
                  transition-colors
                "

              >


                <span>

                  {

                    abierto

                      ?

                      "Ocultar detalle"

                      :

                      "Ver detalle"

                  }

                </span>


                {

                  abierto

                    ?

                    <ChevronUp
                      size={18}
                    />

                    :

                    <ChevronDown
                      size={18}
                    />

                }


              </button>



              {/* ==================================================
                  CONTENIDO DEL DETALLE
              ================================================== */}

              {

                abierto && (

                  <div className="
                    border-t
                    border-gray-100
                    dark:border-slate-800
                    p-5
                    space-y-3
                    bg-gray-50
                    dark:bg-slate-950/50
                  ">


                    {/* ==================================================
                        DETALLES
                    ================================================== */}

                    {

                      criterio.detalles?.map(
                        (detalle, i) => {


                          // -----------------------------------------------
                          // Colores según estado
                          // -----------------------------------------------

                          const detalleColor =

                            detalle.cumple

                              ?

                              `
                                border-green-200
                                bg-green-50
                                dark:border-green-900
                                dark:bg-green-900/20
                              `

                              :

                              `
                                border-red-200
                                bg-red-50
                                dark:border-red-900
                                dark:bg-red-900/20
                              `;


                          return (

                            <div

                              key={i}

                              className={`
                                border
                                rounded-2xl
                                p-4
                                ${detalleColor}
                              `}

                            >


                              {/* ==================================================
                                  TÍTULO DETALLE
                              ================================================== */}

                              <div className="
                                flex
                                items-start
                                gap-2
                                font-bold
                                text-gray-800
                                dark:text-white
                              ">


                                {

                                  detalle.cumple

                                    ?

                                    <CheckCircle
                                      size={18}
                                      className="
                                        text-green-500
                                        shrink-0
                                        mt-0.5
                                      "
                                    />

                                    :

                                    <XCircle
                                      size={18}
                                      className="
                                        text-red-500
                                        shrink-0
                                        mt-0.5
                                      "
                                    />

                                }


                                <span>

                                  {detalle.titulo}

                                </span>


                              </div>



                              {/* ==================================================
                                  DESCRIPCIÓN
                              ================================================== */}

                              {

                                detalle.descripcion && (

                                  <p className="
                                    text-sm
                                    text-gray-600
                                    dark:text-gray-300
                                    mt-2
                                    leading-relaxed
                                  ">

                                    {
                                      detalle.descripcion
                                    }

                                  </p>

                                )

                              }


                            </div>

                          );

                        }

                      )

                    }



                    {/* ==================================================
                        RECOMENDACIÓN
                    ================================================== */}

                    {

                      !criterio.cumple && (

                        <div className="
                          mt-4
                          bg-yellow-50
                          dark:bg-yellow-900/20
                          border
                          border-yellow-200
                          dark:border-yellow-900
                          rounded-2xl
                          p-4
                          flex
                          gap-3
                          items-start
                        ">


                          <AlertTriangle
                            size={20}
                            className="
                              text-yellow-600
                              dark:text-yellow-400
                              shrink-0
                            "
                          />


                          <div>


                            <p className="
                              font-bold
                              text-yellow-700
                              dark:text-yellow-400
                            ">

                              Recomendación

                            </p>


                            <p className="
                              text-sm
                              text-yellow-700
                              dark:text-yellow-300
                              mt-1
                              leading-relaxed
                            ">

                              {

                                criterio.recomendacion ||

                                "Revisar los puntos pendientes."

                              }

                            </p>


                          </div>


                        </div>

                      )

                    }


                  </div>

                )

              }


            </div>

          );

        })

      }


      {/* ==================================================
          SIN CRITERIOS
      ================================================== */}

      {

        criterios.length === 0 && (

          <div className="
            bg-white
            dark:bg-slate-900
            border
            border-gray-200
            dark:border-slate-800
            rounded-3xl
            p-8
            text-center
          ">


            <AlertTriangle
              size={32}
              className="
                mx-auto
                text-gray-400
                mb-3
              "
            />


            <p className="
              text-gray-500
              dark:text-gray-400
            ">

              No hay criterios de evaluación disponibles.

            </p>


          </div>

        )

      }


    </div>

  );

}