import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import { useState } from "react";


function obtenerResumenCriterio(criterio) {

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


  if (
    criterio.criterio ===
    "Referencias bibliográficas"
  ) {
    return "Se verificó la cantidad y existencia de referencias bibliográficas.";
  }


  if (
    criterio.criterio === "Glosario"
  ) {
    return "Se verificó la existencia y cantidad de términos del glosario.";
  }


  if (
    criterio.criterio ===
    "Nombre archivo, estructura y formato institucional"
  ) {
    return "Se verificó la estructura y el formato institucional del documento.";
  }


  return "Criterio evaluado correctamente.";
}


export default function CriteriaList({
  criterios = []
}) {

  const [
    detallesAbiertos,
    setDetallesAbiertos
  ] = useState({});


  const toggleDetalle = (index) => {

    setDetallesAbiertos(prev => ({
      ...prev,
      [index]: !prev[index]
    }));

  };


  if (criterios.length === 0) {

    return (
      <div className="
        border
        border-gray-200
        dark:border-slate-800
        rounded-2xl
        p-8
        text-center
      ">

        <AlertTriangle
          size={30}
          className="
            mx-auto
            text-gray-400
            mb-3
          "
        />

        <p className="
          text-sm
          text-gray-500
          dark:text-gray-400
        ">
          No hay criterios de evaluación disponibles.
        </p>

      </div>
    );

  }


  return (
    <div className="space-y-3">

      {criterios.map((criterio, index) => {

        const puntaje =
          Number(criterio.puntaje || 0);

        const maximo =
          Number(criterio.maximo || 0);


        const cumpleTotal =
          puntaje >= maximo - 0.001;


        const noCumple =
          puntaje <= 0;


        const parcialmente =
          !cumpleTotal && !noCumple;


        const abierto =
          !!detallesAbiertos[index];


        let estadoTexto;
        let estadoColor;
        let EstadoIcono;


        if (cumpleTotal) {

          estadoTexto = "Cumple";
          EstadoIcono = CheckCircle;

          estadoColor = `
            bg-green-50
            text-green-700
            border-green-200
            dark:bg-green-900/20
            dark:text-green-400
            dark:border-green-900
          `;

        } else if (parcialmente) {

          estadoTexto = "Cumple parcialmente";
          EstadoIcono = AlertTriangle;

          estadoColor = `
            bg-yellow-50
            text-yellow-700
            border-yellow-200
            dark:bg-yellow-900/20
            dark:text-yellow-400
            dark:border-yellow-900
          `;

        } else {

          estadoTexto = "No cumple";
          EstadoIcono = XCircle;

          estadoColor = `
            bg-red-50
            text-red-700
            border-red-200
            dark:bg-red-900/20
            dark:text-red-400
            dark:border-red-900
          `;

        }


        const resumen =
          obtenerResumenCriterio(criterio);


        return (
          <div
            key={index}
            className="
              border
              border-gray-200
              dark:border-slate-800
              rounded-2xl
              overflow-hidden
              bg-white
              dark:bg-slate-900
            "
          >

            {/* ==================================================
                FILA PRINCIPAL
            ================================================== */}

            <div className="
              p-4
              md:p-5
            ">

              <div className="
                flex
                items-start
                gap-3
              ">

                {/* NÚMERO */}

                <div className={`
                  h-9
                  w-9
                  shrink-0
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  font-black
                  text-sm
                  ${
                    cumpleTotal
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : parcialmente
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }
                `}>
                  {index + 1}
                </div>


                {/* INFORMACIÓN */}

                <div className="flex-1 min-w-0">

                  <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-start
                    md:justify-between
                    gap-2
                  ">

                    <h3 className="
                      font-black
                      text-base
                      md:text-lg
                      text-gray-800
                      dark:text-white
                    ">
                      {criterio.criterio}
                    </h3>


                    {/* ESTADO */}

                    <div className={`
                      border
                      rounded-full
                      px-3
                      py-1
                      flex
                      items-center
                      gap-1.5
                      text-xs
                      font-black
                      whitespace-nowrap
                      w-fit
                      ${estadoColor}
                    `}>

                      <EstadoIcono size={14} />

                      {estadoTexto}

                    </div>

                  </div>


                  {/* PUNTAJE */}

                  <div className="
                    flex
                    items-center
                    gap-2
                    mt-2
                    text-sm
                  ">

                    <span className="
                      text-gray-500
                      dark:text-gray-400
                    ">
                      Puntuación
                    </span>

                    <span className="
                      font-black
                      text-gray-800
                      dark:text-white
                    ">
                      {puntaje} / {maximo}
                    </span>

                  </div>


                  {/* RESUMEN */}

                  <p className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                    mt-2
                    leading-relaxed
                  ">
                    {resumen}
                  </p>

                </div>

              </div>

            </div>


            {/* ==================================================
                BOTÓN DETALLE
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
                transition
              "
            >

              <span>
                {abierto
                  ? "Ocultar detalle"
                  : "Ver detalle"
                }
              </span>

              {abierto
                ? <ChevronUp size={18} />
                : <ChevronDown size={18} />
              }

            </button>


            {/* ==================================================
                DETALLE
            ================================================== */}

            {abierto && (

              <div className="
                border-t
                border-gray-100
                dark:border-slate-800
                p-4
                md:p-5
                bg-gray-50
                dark:bg-slate-950/50
                space-y-3
              ">

                {criterio.detalles?.length > 0 ? (

                  criterio.detalles.map(
                    (detalle, i) => {

                      const detalleCumple =
                        detalle.cumple !== false;


                      return (
                        <div
                          key={i}
                          className={`
                            rounded-xl
                            border
                            p-4
                            ${
                              detalleCumple
                                ? `
                                  bg-green-50
                                  border-green-200
                                  dark:bg-green-900/20
                                  dark:border-green-900
                                `
                                : `
                                  bg-red-50
                                  border-red-200
                                  dark:bg-red-900/20
                                  dark:border-red-900
                                `
                            }
                          `}
                        >

                          <div className="
                            flex
                            items-start
                            gap-2
                          ">

                            {detalleCumple ? (

                              <CheckCircle
                                size={17}
                                className="
                                  text-green-600
                                  shrink-0
                                  mt-0.5
                                "
                              />

                            ) : (

                              <XCircle
                                size={17}
                                className="
                                  text-red-600
                                  shrink-0
                                  mt-0.5
                                "
                              />

                            )}


                            <div>

                              <p className="
                                font-bold
                                text-sm
                                text-gray-800
                                dark:text-white
                              ">
                                {detalle.titulo}
                              </p>


                              {detalle.descripcion && (

                                <p className="
                                  text-sm
                                  text-gray-600
                                  dark:text-gray-300
                                  mt-2
                                  leading-relaxed
                                ">
                                  {detalle.descripcion}
                                </p>

                              )}

                            </div>

                          </div>

                        </div>
                      );

                    }
                  )

                ) : (

                  <p className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  ">
                    No hay información adicional para este criterio.
                  </p>

                )}


                {/* RECOMENDACIÓN */}

                {!criterio.cumple && (

                  <div className="
                    rounded-xl
                    bg-yellow-50
                    dark:bg-yellow-900/20
                    border
                    border-yellow-200
                    dark:border-yellow-900
                    p-4
                  ">

                    <div className="
                      flex
                      items-start
                      gap-3
                    ">

                      <AlertTriangle
                        size={18}
                        className="
                          text-yellow-600
                          dark:text-yellow-400
                          shrink-0
                        "
                      />

                      <div>

                        <p className="
                          text-sm
                          font-black
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

                  </div>

                )}

              </div>

            )}

          </div>
        );

      })}

    </div>
  );
}
