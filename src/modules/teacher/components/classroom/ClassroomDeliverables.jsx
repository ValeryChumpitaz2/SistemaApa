import React from "react";

import {
reconocerEntregable,
obtenerTitulo,
obtenerCourseWorkId,
} from "./classroomUtils";

export default function ClassroomDeliverables({
actividades = [],
}) {

console.log(
"========== CLASSROOM DELIVERABLES =========="
);

console.log(
"actividades recibidas:",
actividades
);

console.log(
"cantidad:",
Array.isArray(actividades)
? actividades.length
: "NO ES ARRAY"
);

if (!Array.isArray(actividades)) {

return (
  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">

    <h2 className="font-black text-red-700">
      Error
    </h2>

    <p className="mt-2 text-sm text-red-600">
      ClassroomDeliverables recibió un valor
      que no es un array.
    </p>

  </div>
);


}

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
      pero no llegaron actividades.
    </p>

  </div>
);


}

return (
<div className=" mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm " >

  <div className="mb-6">

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


  <div className="space-y-4">

    {actividades.map(
      (actividad, index) => {

        const titulo =
          obtenerTitulo(
            actividad
          );


        const id =
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


        return (
          <div
            key={
              id ||
              `actividad-${index}`
            }
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-5
            "
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div>

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

                <h3
                  className="
                    mt-1
                    text-sm
                    font-black
                    text-slate-800
                  "
                >
                  {titulo ||
                    "Actividad sin título"}
                </h3>

                {id && (
                  <p
                    className="
                      mt-2
                      text-[10px]
                      text-slate-400
                    "
                  >
                    ID: {id}
                  </p>
                )}

              </div>


              <span
                className="
                  rounded-lg
                  bg-emerald-100
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-emerald-700
                "
              >
                Cargada
              </span>

            </div>

          </div>
        );

      }
    )}

  </div>

</div>


);
}