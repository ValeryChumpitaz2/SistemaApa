import React from "react";

import {
  reconocerEntregable,
  obtenerTitulo,
  obtenerCourseWorkId,
} from "./classroomUtils";


export default function ClassroomDeliverables({
  actividades = [],
  onSelectDeliverable,
}) {

  console.log(
    "========== CLASSROOM DELIVERABLES =========="
  );

  console.log(
    "Actividades recibidas:",
    actividades
  );

  console.log(
    "Cantidad:",
    Array.isArray(actividades)
      ? actividades.length
      : "NO ES ARRAY"
  );


  // ============================================================
  // VALIDAR ARRAY
  // ============================================================

  if (!Array.isArray(actividades)) {

    return (
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
        "
      >

        <h2
          className="
            font-black
            text-red-700
          "
        >
          Error
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-red-600
          "
        >
          ClassroomDeliverables recibió un
          valor que no es un array.
        </p>

      </div>
    );

  }


  // ============================================================
  // SIN ACTIVIDADES
  // ============================================================

  if (actividades.length === 0) {

    return (
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-amber-200
          bg-amber-50
          p-6
        "
      >

        <h2
          className="
            text-lg
            font-black
            text-amber-700
          "
        >
          No hay actividades
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-amber-600
          "
        >
          El tema fue seleccionado correctamente,
          pero no llegaron actividades desde
          Classroom.
        </p>

      </div>
    );

  }


  // ============================================================
  // NORMALIZAR ACTIVIDADES
  // ============================================================

  const actividadesNormalizadas =
    actividades.map(
      (
        actividad,
        index
      ) => {

        const titulo =
          obtenerTitulo(
            actividad
          ) ||
          "Actividad sin título";


        const courseWorkId =
          obtenerCourseWorkId(
            actividad
          );


        let tipo = null;


        try {

          tipo =
            reconocerEntregable(
              actividad
            );

        } catch (error) {

          console.error(
            "Error reconociendo entregable:",
            error,
            actividad
          );

        }


        return {
          actividad,
          titulo,
          courseWorkId,
          tipo,
          index,
        };

      }
    );


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* ======================================================
          CABECERA
      ======================================================= */}

      <div
        className="
          mb-6
        "
      >

        <p
          className="
            text-xs
            font-black
            uppercase
            tracking-wider
            text-blue-600
          "
        >
          Paso 3
        </p>

        <h2
          className="
            mt-1
            text-xl
            font-black
            text-slate-900
          "
        >
          Entregables
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {actividades.length} actividad(es)
          encontrada(s).
        </p>

      </div>


      {/* ======================================================
          LISTA
      ======================================================= */}

      <div
        className="
          space-y-4
        "
      >

        {actividadesNormalizadas.map(
          ({
            actividad,
            titulo,
            courseWorkId,
            tipo,
            index,
          }) => {

            const esEntregable =
              Boolean(tipo);


            return (
              <div
                key={
                  courseWorkId ||
                  `actividad-${index}`
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition
                  hover:border-blue-200
                  hover:bg-blue-50/30
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  {/* ==================================================
                      INFORMACIÓN
                  =================================================== */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >

                      <p
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-wider
                          text-blue-600
                        "
                      >
                        {tipo || "ACTIVIDAD"}
                      </p>


                      {courseWorkId && (

                        <span
                          className="
                            rounded-full
                            bg-slate-200
                            px-2
                            py-0.5
                            text-[9px]
                            font-bold
                            text-slate-500
                          "
                        >
                          Classroom
                        </span>

                      )}

                    </div>


                    <h3
                      className="
                        mt-1
                        break-words
                        text-sm
                        font-black
                        text-slate-800
                      "
                    >
                      {titulo}
                    </h3>


                    {courseWorkId && (

                      <p
                        className="
                          mt-2
                          break-all
                          text-[10px]
                          text-slate-400
                        "
                      >
                        ID: {courseWorkId}
                      </p>

                    )}

                  </div>


                  {/* ==================================================
                      ACCIONES
                  =================================================== */}

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-2
                    "
                  >

                    <span
                      className={`
                        rounded-lg
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        ${
                          esEntregable
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-600"
                        }
                      `}
                    >
                      {esEntregable
                        ? tipo
                        : "Actividad"}
                    </span>


                    {esEntregable &&
                      courseWorkId && (

                        <button
                          type="button"
                          onClick={() => {

                            console.log(
                              "========== SELECCIONANDO ENTREGABLE =========="
                            );

                            console.log(
                              "Tipo:",
                              tipo
                            );

                            console.log(
                              "CourseWork ID:",
                              courseWorkId
                            );

                            console.log(
                              "Actividad:",
                              actividad
                            );


                            if (
                              typeof onSelectDeliverable ===
                              "function"
                            ) {

                              onSelectDeliverable({
                                actividad,
                                tipo,
                                courseWorkId,
                              });

                            }

                          }}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#1D3681]
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-white
                            transition
                            hover:bg-[#162b68]
                            active:scale-[0.98]
                          "
                        >
                          Ver entregas
                        </button>

                      )}

                  </div>

                </div>

              </div>
            );

          }
        )}

      </div>

    </div>
  );

}
