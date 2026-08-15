import {
  FileSearch,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export default function TablaConsolidacion({
  resultado,
  resultadosFiltrados,
  resultadosPagina,
  busqueda,
  cambiarBusqueda,
  elementosPorPagina,
  cambiarElementosPorPagina,
  paginaActual,
  setPaginaActual,
  totalPaginas,
  indiceInicio,
  indiceFin,
}) {

  if (!resultado) {
    return null;
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
      "
    >

      {/* CABECERA */}

      <div
        className="
          p-6
          border-b
          border-slate-200
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-4
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-black
              text-slate-900
            "
          >
            Resultado de consolidación
          </h2>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            Resultado agrupado por alumno,
            semestre e informe.
          </p>

        </div>

      </div>

      {/* FILTROS */}

      <div
        className="
          px-6
          py-4
          bg-slate-50
          border-b
          border-slate-200
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        "
      >

        {/* BUSCAR */}

        <div
          className="
            relative
            w-full
            lg:max-w-md
          "
        >

          <Search
            size={18}
            className="
              absolute
              left-3
              top-3
              text-slate-400
            "
          />

          <input
            type="text"
            value={busqueda}
            onChange={(e) =>
              cambiarBusqueda(e.target.value)
            }
            placeholder="Buscar alumno, semestre o informe..."
            className="
              w-full
              pl-10
              pr-10
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />

          {busqueda && (
            <button
              type="button"
              onClick={() =>
                cambiarBusqueda("")
              }
              className="
                absolute
                right-3
                top-2.5
                text-slate-400
                hover:text-slate-700
              "
            >
              ×
            </button>
          )}

        </div>

        {/* CANTIDAD */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <span
            className="
              text-xs
              font-bold
              text-slate-500
            "
          >
            Mostrar
          </span>

          <select
            value={elementosPorPagina}
            onChange={(e) =>
              cambiarElementosPorPagina(
                e.target.value
              )
            }
            className="
              px-3
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white
              text-sm
              font-bold
              text-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span className="text-xs text-slate-500">
            por página
          </span>

        </div>

      </div>

      {/* INFORMACIÓN */}

      <div
        className="
          px-6
          py-3
          border-b
          border-slate-100
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        "
      >

        <p className="text-xs text-slate-500">

          Mostrando{" "}

          <span className="font-bold text-slate-700">
            {resultadosFiltrados.length === 0
              ? 0
              : indiceInicio + 1}
          </span>

          {" "}–{" "}

          <span className="font-bold text-slate-700">
            {Math.min(
              indiceFin,
              resultadosFiltrados.length
            )}
          </span>

          {" "}de{" "}

          <span className="font-bold text-slate-700">
            {resultadosFiltrados.length}
          </span>

          {" "}resultados

        </p>

        {busqueda && (
          <p
            className="
              text-xs
              text-blue-600
              font-semibold
            "
          >
            Filtro activo
          </p>
        )}

      </div>

      {/* TABLA */}

      {resultadosPagina.length > 0 ? (

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4 font-black text-slate-700">
                  Alumno
                </th>

                <th className="p-4 font-black text-slate-700">
                  Semestre
                </th>

                <th className="p-4 font-black text-slate-700">
                  Informe
                </th>

                <th className="p-4 font-black text-slate-700">
                  EN1
                </th>

                <th className="p-4 font-black text-slate-700">
                  EN2
                </th>

                <th className="p-4 font-black text-slate-700">
                  EN3
                </th>

                <th className="p-4 font-black text-blue-800">
                  TOTAL
                </th>

              </tr>

            </thead>

            <tbody>

              {resultadosPagina.map(
                (alumno, index) => (

                  <tr
                    key={`${alumno.alumno}-${indiceInicio + index}`}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                      transition
                    "
                  >

                    <td
                      className="
                        p-4
                        font-bold
                        text-slate-900
                      "
                    >
                      {alumno.alumno}
                    </td>

                    <td
                      className="
                        p-4
                        text-center
                        text-slate-600
                      "
                    >
                      {alumno.semestre}
                    </td>

                    <td
                      className="
                        p-4
                        text-center
                        text-slate-600
                      "
                    >
                      {alumno.informe}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {alumno.EN1}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {alumno.EN2}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {alumno.EN3}
                    </td>

                    <td className="p-4 text-center">

                      <span
                        className="
                          inline-flex
                          items-center
                          justify-center
                          min-w-[60px]
                          px-3
                          py-1.5
                          rounded-lg
                          bg-blue-50
                          text-blue-800
                          font-black
                        "
                      >
                        {alumno.total}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      ) : (

        <div
          className="
            p-12
            text-center
            text-slate-500
          "
        >

          <FileSearch
            size={45}
            className="
              mx-auto
              mb-4
              text-slate-300
            "
          />

          <p
            className="
              font-bold
              text-slate-700
            "
          >
            No se encontraron resultados.
          </p>

          <p className="text-sm mt-1">
            Prueba con otro nombre o verifica las carpetas.
          </p>

        </div>

      )}

      {/* PAGINACIÓN */}

      {resultadosFiltrados.length > 0 && (

        <div
          className="
            px-6
            py-5
            border-t
            border-slate-200
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >

          <button
            type="button"
            disabled={paginaActual === 1}
            onClick={() =>
              setPaginaActual(
                (anterior) =>
                  Math.max(1, anterior - 1)
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              font-bold
              text-sm
              hover:bg-slate-50
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronLeft size={18} />
            Anterior
          </button>

          <div
            className="
              flex
              items-center
              justify-center
              gap-1.5
              flex-wrap
            "
          >

            {Array.from(
              { length: totalPaginas },
              (_, index) => index + 1
            )
              .filter((numero) => {

                if (totalPaginas <= 7) {
                  return true;
                }

                return (
                  numero === 1 ||
                  numero === totalPaginas ||
                  Math.abs(
                    numero - paginaActual
                  ) <= 1
                );
              })
              .map(
                (numero, index, array) => {

                  const anteriorNumero =
                    array[index - 1];

                  const mostrarPuntos =
                    anteriorNumero &&
                    numero - anteriorNumero > 1;

                  return (
                    <div
                      key={numero}
                      className="
                        flex
                        items-center
                        gap-1.5
                      "
                    >

                      {mostrarPuntos && (
                        <span className="px-1 text-slate-400">
                          ...
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setPaginaActual(numero)
                        }
                        className={`
                          w-10
                          h-10
                          rounded-xl
                          font-bold
                          text-sm
                          transition
                          ${
                            paginaActual === numero
                              ? "bg-[#1D3681] text-white"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }
                        `}
                      >
                        {numero}
                      </button>

                    </div>
                  );
                }
              )}

          </div>

          <button
            type="button"
            disabled={
              paginaActual === totalPaginas
            }
            onClick={() =>
              setPaginaActual(
                (anterior) =>
                  Math.min(
                    totalPaginas,
                    anterior + 1
                  )
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              font-bold
              text-sm
              hover:bg-slate-50
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            Siguiente
            <ChevronRight size={18} />
          </button>

        </div>

      )}

      {/* PIE */}

      {resultadosFiltrados.length > 0 && (

        <div
          className="
            px-6
            pb-5
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
          "
        >

          <div className="text-xs text-slate-400">
            Página{" "}
            <span className="font-bold text-slate-600">
              {paginaActual}
            </span>
            {" "}de{" "}
            <span className="font-bold text-slate-600">
              {totalPaginas}
            </span>
          </div>

          {busqueda && (
            <button
              type="button"
              onClick={() => {
                cambiarBusqueda("");
              }}
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                text-blue-600
                hover:text-blue-800
              "
            >
              <RotateCcw size={14} />
              Limpiar filtro
            </button>
          )}

        </div>

      )}

    </div>
  );
}