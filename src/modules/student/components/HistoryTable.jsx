import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  CalendarDays,
  Timer,
  ChevronRight
} from "lucide-react";


export default function HistoryTable({
  documentos = []
}) {


  // ==================================================
  // OBTENER ESTADO
  // ==================================================

  function obtenerEstado(item) {

    const porcentaje =
      item.puntaje?.porcentaje ?? 0;


    if (porcentaje >= 95) {

      return {
        texto: "Listo",
        descripcion: "Excelente resultado",
        clase: "bg-emerald-50 text-emerald-700 border-emerald-100",
        icono: CheckCircle
      };

    }


    if (porcentaje >= 70) {

      return {
        texto: "En mejora",
        descripcion: "Puedes seguir mejorando",
        clase: "bg-amber-50 text-amber-700 border-amber-100",
        icono: Clock
      };

    }


    return {

      texto: "Necesita revisión",
      descripcion: "Revisa las recomendaciones",
      clase: "bg-red-50 text-red-700 border-red-100",
      icono: AlertTriangle

    };

  }


  // ==================================================
  // FORMATEAR FECHA
  // ==================================================

  function obtenerFecha(item) {

    /*
      Intentamos encontrar la fecha
      en diferentes propiedades.

      Esto permite que funcione aunque
      tus documentos tengan estructuras
      diferentes.
    */

    const valor =
      item.fechaAnalisis ||
      item.fecha ||
      item.createdAt ||
      item.fechaCreacion;


    if (!valor) {

      return {
        fecha: "Hoy",
        hora: "Hora no disponible"
      };

    }


    try {

      let fecha;


      // Firebase Timestamp

      if (
        valor &&
        typeof valor.toDate === "function"
      ) {

        fecha = valor.toDate();

      }

      // Date normal

      else if (
        valor instanceof Date
      ) {

        fecha = valor;

      }

      // String / número

      else {

        fecha = new Date(valor);

      }


      if (
        Number.isNaN(
          fecha.getTime()
        )
      ) {

        return {
          fecha: "Fecha no disponible",
          hora: "Hora no disponible"
        };

      }


      return {

        fecha:
          fecha.toLocaleDateString(
            "es-PE",
            {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }
          ),

        hora:
          fecha.toLocaleTimeString(
            "es-PE",
            {
              hour: "2-digit",
              minute: "2-digit"
            }
          )

      };

    }
    catch {

      return {

        fecha: "Fecha no disponible",
        hora: "Hora no disponible"

      };

    }

  }


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* ==========================================
          CABECERA
      =========================================== */}

      <div
        className="
          border-b
          border-slate-100
          px-6
          py-5
          dark:border-slate-800
        "
      >

        <div
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <h3
              className="
                text-lg
                font-black
                text-slate-900
                dark:text-white
              "
            >

              Historial de evaluaciones

            </h3>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >

              Consulta los documentos que has analizado.

            </p>

          </div>


          {/* TOTAL */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-blue-50
              px-3
              py-2
              text-sm
              font-bold
              text-[#1D3681]
              dark:bg-blue-900/20
              dark:text-blue-300
            "
          >

            <FileText size={16} />

            {documentos.length}

            {documentos.length === 1
              ? " evaluación"
              : " evaluaciones"
            }

          </div>

        </div>

      </div>


      {/* ==========================================
          TABLA
      =========================================== */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[760px]">

          {/* CABECERA */}

          <thead>

            <tr
              className="
                border-b
                border-slate-100
                bg-slate-50/70
                dark:border-slate-800
                dark:bg-slate-800/40
              "
            >

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-[11px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >

                Documento

              </th>


              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-[11px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >

                Fecha y hora

              </th>


              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-[11px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >

                Resultado

              </th>


              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-[11px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >

                Estado

              </th>


              <th className="w-10" />

            </tr>

          </thead>


          {/* CUERPO */}

          <tbody>

            {documentos.map(
              (doc, index) => {

                const estado =
                  obtenerEstado(doc);

                const IconoEstado =
                  estado.icono;

                const fecha =
                  obtenerFecha(doc);


                return (

                  <tr
                    key={
                      doc.id ||
                      doc.codigo ||
                      index
                    }
                    className="
                      group
                      border-b
                      border-slate-100
                      transition
                      last:border-b-0
                      hover:bg-blue-50/40
                      dark:border-slate-800
                      dark:hover:bg-slate-800/50
                    "
                  >

                    {/* =================================
                        DOCUMENTO
                    ================================== */}

                    <td className="px-6 py-5">

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-[#1D3681]
                            transition
                            group-hover:bg-[#1D3681]
                            group-hover:text-white
                            dark:bg-blue-900/20
                            dark:text-blue-300
                          "
                        >

                          <FileText size={20} />

                        </div>


                        <div className="min-w-0">

                          <p
                            className="
                              max-w-[280px]
                              truncate
                              font-bold
                              text-slate-800
                              dark:text-white
                            "
                            title={
                              doc.nombre ||
                              doc.resumen?.nombre ||
                              "Documento académico"
                            }
                          >

                            {
                              doc.nombre ||
                              doc.resumen?.nombre ||
                              "Documento académico"
                            }

                          </p>


                          <p
                            className="
                              mt-1
                              text-xs
                              text-slate-400
                            "
                          >

                            Evaluación automática

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* =================================
                        FECHA + HORA
                    ================================== */}

                    <td className="px-6 py-5">

                      <div className="space-y-1">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        >

                          <CalendarDays
                            size={15}
                            className="text-slate-400"
                          />

                          {fecha.fecha}

                        </div>


                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-slate-400
                          "
                        >

                          <Timer size={14} />

                          Analizado a las {fecha.hora}

                        </div>

                      </div>

                    </td>


                    {/* =================================
                        RESULTADO
                    ================================== */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <span
                          className="
                            text-xl
                            font-black
                            text-[#1D3681]
                            dark:text-blue-300
                          "
                        >

                          {doc.puntaje?.porcentaje ?? 0}%

                        </span>


                        <div
                          className="
                            hidden
                            h-1.5
                            w-16
                            overflow-hidden
                            rounded-full
                            bg-slate-100
                            sm:block
                            dark:bg-slate-700
                          "
                        >

                          <div
                            className="
                              h-full
                              rounded-full
                              bg-[#1D3681]
                            "
                            style={{
                              width: `${Math.min(
                                doc.puntaje?.porcentaje ?? 0,
                                100
                              )}%`
                            }}
                          />

                        </div>

                      </div>

                    </td>


                    {/* =================================
                        ESTADO
                    ================================== */}

                    <td className="px-6 py-5">

                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          px-3
                          py-2
                          ${estado.clase}
                        `}
                      >

                        <IconoEstado size={15} />

                        <div>

                          <p className="text-xs font-black">

                            {estado.texto}

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* =================================
                        FLECHA
                    ================================== */}

                    <td className="px-3 py-5">

                      <ChevronRight
                        size={18}
                        className="
                          text-slate-300
                          transition
                          group-hover:translate-x-1
                          group-hover:text-[#1D3681]
                        "
                      />

                    </td>

                  </tr>

                );

              }
            )}


            {/* ========================================
                SIN DOCUMENTOS
            ========================================= */}

            {documentos.length === 0 && (

              <tr>

                <td
                  colSpan="5"
                  className="px-6 py-16 text-center"
                >

                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                      text-slate-400
                      dark:bg-slate-800
                    "
                  >

                    <FileText size={25} />

                  </div>


                  <h4
                    className="
                      mt-4
                      font-bold
                      text-slate-700
                      dark:text-slate-200
                    "
                  >

                    No hay evaluaciones todavía

                  </h4>


                  <p
                    className="
                      mx-auto
                      mt-1
                      max-w-sm
                      text-sm
                      text-slate-400
                    "
                  >

                    Cuando analices tu primer documento,
                    aparecerá aquí junto con su resultado,
                    fecha y hora.

                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}