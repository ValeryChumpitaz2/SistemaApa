import React from "react";

export default function ClassroomSelector({
  cursos = [],
  cursoSeleccionado = "",
  onChange,
  cargando = false,
}) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="mb-4">

        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-blue-600
          "
        >
          Classroom
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-black
            text-slate-900
          "
        >
          Selecciona la experiencia formativa
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Selecciona el curso que deseas revisar.
        </p>

      </div>


      <select
        value={cursoSeleccionado || ""}
        onChange={(event) => {

          const valor =
            event.target.value;

          console.log(
            "Curso seleccionado:",
            valor
          );

          if (typeof onChange === "function") {
            onChange(valor);
          }

        }}
        disabled={cargando}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-sm
          font-medium
          text-slate-800
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          disabled:cursor-not-allowed
          disabled:bg-slate-100
        "
      >

        <option value="">
          {cargando
            ? "Cargando experiencias formativas..."
            : "Selecciona una experiencia formativa"}
        </option>


        {!cargando &&
          cursos.map((curso, index) => {

            const id =
              String(
                curso?.id ||
                curso?.courseId ||
                curso?.courseID ||
                ""
              ).trim();


            const nombre =
              curso?.name ||
              curso?.nombre ||
              curso?.title ||
              curso?.courseName ||
              `Experiencia formativa ${index + 1}`;


            if (!id) {
              return null;
            }


            return (
              <option
                key={id}
                value={id}
              >
                {nombre}
              </option>
            );

          })}

      </select>


      {!cargando &&
        cursos.length === 0 && (

        <div
          className="
            mt-3
            rounded-xl
            bg-amber-50
            px-4
            py-3
            text-sm
            text-amber-700
          "
        >
          No se encontraron experiencias formativas
          en Google Classroom.
        </div>

      )}

    </div>
  );
}
