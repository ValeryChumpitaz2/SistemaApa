import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  History,
  CalendarDays,
  Clock3,
  Users,
  Database,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  FolderOpen,
  ChevronRight,
  FileDown,
  Loader2,
  AlertTriangle,
  FileWarning,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =====================================================
// CONFIGURACIÓN
// =====================================================

const STORAGE_KEY = "historial-consolidacion";

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

function generarId() {
  return (
    Date.now().toString(36) +
    "-" +
    Math.random()
      .toString(36)
      .slice(2, 10)
  );
}

// =====================================================
// FECHA Y HORA
// =====================================================

function obtenerFechaHora(consolidacion) {
  if (consolidacion?.fechaHoraConsolidacion) {
    const fechaHora =
      consolidacion.fechaHoraConsolidacion;

    try {
      const fecha = new Date(fechaHora);

      if (!Number.isNaN(fecha.getTime())) {
        return {
          fecha: fecha.toLocaleDateString("es-PE"),
          hora: fecha.toLocaleTimeString("es-PE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };
      }
    } catch (error) {
      console.warn(
        "No se pudo convertir fechaHoraConsolidacion:",
        error
      );
    }
  }

  return {
    fecha: consolidacion?.fecha || "--",
    hora: consolidacion?.hora || "--",
  };
}

// =====================================================
// NORMALIZAR CONSOLIDACIÓN
// =====================================================

function normalizarConsolidacion(item, index = 0) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const resultado =
    item.resultado &&
    typeof item.resultado === "object"
      ? item.resultado
      : null;

  const consolidado = Array.isArray(item.consolidado)
    ? item.consolidado
    : Array.isArray(resultado?.consolidado)
      ? resultado.consolidado
      : [];

  const noValidos = Array.isArray(item.noValidos)
    ? item.noValidos
    : Array.isArray(resultado?.noValidos)
      ? resultado.noValidos
      : [];

  const totalAlumnos = Number(
    item.totalAlumnos ??
      resultado?.totalAlumnos ??
      consolidado.length
  );

  const totalNoValidos = Number(
    item.totalNoValidos ??
      resultado?.totalNoValidos ??
      noValidos.length
  );

  const fechaHora = obtenerFechaHora(item);

  const carpetas =
    item.carpetas ||
    resultado?.carpetas ||
    {
      EN1: item.EN1 || "",
      EN2: item.EN2 || "",
      EN3: item.EN3 || "",
    };

  return {
    ...item,

    id:
      item.id ||
      `consolidacion-${index}-${generarId()}`,

    fecha: fechaHora.fecha,
    hora: fechaHora.hora,

    fechaHoraConsolidacion:
      item.fechaHoraConsolidacion ||
      resultado?.fechaHoraConsolidacion ||
      null,

    totalAlumnos,
    totalNoValidos,

    consolidado,
    noValidos,
    carpetas,
  };
}

// =====================================================
// LEER HISTORIAL DESDE LOCALSTORAGE
// =====================================================

function leerHistorialStorage() {
  console.log("========================================");
  console.log("📚 LEYENDO HISTORIAL");
  console.log("Clave:", STORAGE_KEY);

  try {
    const datosGuardados =
      localStorage.getItem(STORAGE_KEY);

    console.log(
      "Valor RAW:",
      datosGuardados
    );

    if (!datosGuardados) {
      console.warn(
        "⚠️ No existe historial en localStorage."
      );

      return [];
    }

    const datos =
      JSON.parse(datosGuardados);

    console.log(
      "Datos parseados:",
      datos
    );

    if (!Array.isArray(datos)) {
      console.warn(
        "⚠️ El historial no es un array."
      );

      return [];
    }

    const normalizados =
      datos
        .map(
          (item, index) =>
            normalizarConsolidacion(
              item,
              index
            )
        )
        .filter(Boolean);

    console.log(
      "📚 HISTORIAL NORMALIZADO:",
      normalizados
    );

    console.log(
      "📊 Total:",
      normalizados.length
    );

    return normalizados;
  } catch (error) {
    console.error(
      "❌ ERROR LEYENDO HISTORIAL:",
      error
    );

    return [];
  }
}

// =====================================================
// COMPONENTE
// =====================================================

export default function HistorialConsolidacionPage() {
  // ===================================================
  // ESTADOS
  // ===================================================

  const [
    historial,
    setHistorial,
  ] = useState([]);

  const [
    consolidacionSeleccionada,
    setConsolidacionSeleccionada,
  ] = useState(null);

  const [
    documentosInvalidosSeleccionados,
    setDocumentosInvalidosSeleccionados,
  ] = useState(null);

  const [
    generandoPDF,
    setGenerandoPDF,
  ] = useState(false);

  // ===================================================
  // CARGAR HISTORIAL
  // ===================================================

  const cargarHistorial =
    useCallback(() => {
      const datos =
        leerHistorialStorage();

      setHistorial(datos);
    }, []);

  // ===================================================
  // CARGAR AL MONTAR
  // ===================================================

  useEffect(() => {
    cargarHistorial();

    function actualizarHistorial() {
      console.log(
        "🔄 Evento historialConsolidacionActualizado recibido."
      );

      cargarHistorial();
    }

    function actualizarStorage(event) {
      if (
        !event ||
        event.key === STORAGE_KEY ||
        event.key === null
      ) {
        console.log(
          "🔄 Cambio detectado en localStorage."
        );

        cargarHistorial();
      }
    }

    window.addEventListener(
      "historialConsolidacionActualizado",
      actualizarHistorial
    );

    window.addEventListener(
      "storage",
      actualizarStorage
    );

    window.addEventListener(
      "pageshow",
      cargarHistorial
    );

    return () => {
      window.removeEventListener(
        "historialConsolidacionActualizado",
        actualizarHistorial
      );

      window.removeEventListener(
        "storage",
        actualizarStorage
      );

      window.removeEventListener(
        "pageshow",
        cargarHistorial
      );
    };
  }, [cargarHistorial]);

  // ===================================================
  // RECARGAR CUANDO LA PÁGINA VUELVE A ESTAR ACTIVA
  // ===================================================

  useEffect(() => {
    function manejarVisibilidad() {
      if (
        document.visibilityState ===
        "visible"
      ) {
        console.log(
          "👁️ Página visible nuevamente. Recargando historial."
        );

        cargarHistorial();
      }
    }

    document.addEventListener(
      "visibilitychange",
      manejarVisibilidad
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        manejarVisibilidad
      );
    };
  }, [cargarHistorial]);

  // ===================================================
  // OBTENER CONSOLIDADO
  // ===================================================

  function obtenerConsolidado(consolidacion) {
    if (
      Array.isArray(
        consolidacion?.consolidado
      )
    ) {
      return consolidacion.consolidado;
    }

    if (
      Array.isArray(
        consolidacion?.resultado?.consolidado
      )
    ) {
      return consolidacion.resultado.consolidado;
    }

    return [];
  }

  // ===================================================
  // OBTENER NO VÁLIDOS
  // ===================================================

  function obtenerNoValidos(consolidacion) {
    if (
      Array.isArray(
        consolidacion?.noValidos
      )
    ) {
      return consolidacion.noValidos;
    }

    if (
      Array.isArray(
        consolidacion?.resultado?.noValidos
      )
    ) {
      return consolidacion.resultado.noValidos;
    }

    return [];
  }

  // ===================================================
  // ORDENAR ALUMNOS
  // ===================================================

  function obtenerConsolidadoOrdenado(
    consolidacion
  ) {
    const alumnos =
      obtenerConsolidado(
        consolidacion
      );

    return [...alumnos].sort(
      (a, b) => {
        const nombreA =
          String(
            a?.alumno ??
              a?.nombre ??
              ""
          ).trim();

        const nombreB =
          String(
            b?.alumno ??
              b?.nombre ??
              ""
          ).trim();

        return nombreA.localeCompare(
          nombreB,
          "es",
          {
            sensitivity: "base",
          }
        );
      }
    );
  }

  // ===================================================
  // TOTAL ALUMNOS
  // ===================================================

  function obtenerTotalAlumnos(
    consolidacion
  ) {
    if (
      consolidacion?.totalAlumnos !==
        undefined &&
      consolidacion?.totalAlumnos !==
        null
    ) {
      return Number(
        consolidacion.totalAlumnos
      );
    }

    return obtenerConsolidado(
      consolidacion
    ).length;
  }

  // ===================================================
  // VER CONSOLIDACIÓN
  // ===================================================

  function verConsolidacion(
    consolidacion
  ) {
    setConsolidacionSeleccionada(
      consolidacion
    );
  }

  // ===================================================
  // VER DOCUMENTOS NO VÁLIDOS
  // ===================================================

  function verDocumentosInvalidos(
    consolidacion
  ) {
    const documentos =
      obtenerNoValidos(
        consolidacion
      );

    setDocumentosInvalidosSeleccionados(
      documentos
    );
  }

  // ===================================================
  // CERRAR MODAL DE CONSOLIDACIÓN
  // ===================================================

  function cerrarDetalle() {
    setConsolidacionSeleccionada(
      null
    );
  }

  // ===================================================
  // CERRAR MODAL DE NO VÁLIDOS
  // ===================================================

  function cerrarDocumentosInvalidos() {
    setDocumentosInvalidosSeleccionados(
      null
    );
  }

  // ===================================================
  // FORMATEAR FECHA
  // ===================================================

  function formatearFecha(fecha) {
    if (!fecha) {
      return "Sin fecha";
    }

    try {
      const fechaObj =
        new Date(fecha);

      if (
        Number.isNaN(
          fechaObj.getTime()
        )
      ) {
        return fecha;
      }

      return fechaObj.toLocaleString(
        "es-PE",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return fecha;
    }
  }

  // ===================================================
  // GENERAR PDF
  // ===================================================

  function generarReportePDF(
    consolidacion
  ) {
    const alumnos =
      obtenerConsolidadoOrdenado(
        consolidacion
      );

    if (alumnos.length === 0) {
      alert(
        "Esta consolidación no contiene resultados para exportar."
      );

      return;
    }

    try {
      setGenerandoPDF(true);

      const doc =
        new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

      const colorPrincipal = [
        29,
        54,
        129,
      ];

      const colorSecundario = [
        239,
        246,
        255,
      ];

      // =================================================
      // ENCABEZADO
      // =================================================

      doc.setFillColor(
        ...colorPrincipal
      );

      doc.rect(
        0,
        0,
        297,
        42,
        "F"
      );

      doc.setTextColor(
        255,
        255,
        255
      );

      doc.setFontSize(22);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "VG Smart Review",
        148.5,
        17,
        {
          align: "center",
        }
      );

      doc.setFontSize(14);

      doc.text(
        "Reporte de Consolidación",
        148.5,
        29,
        {
          align: "center",
        }
      );

      // =================================================
      // INFORMACIÓN
      // =================================================

      doc.setTextColor(
        40,
        40,
        40
      );

      doc.setFontSize(11);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        `Fecha: ${
          consolidacion?.fecha ||
          "--"
        }`,
        15,
        55
      );

      doc.text(
        `Hora: ${
          consolidacion?.hora ||
          "--"
        }`,
        15,
        63
      );

      doc.text(
        `Total de alumnos: ${
          obtenerTotalAlumnos(
            consolidacion
          )
        }`,
        15,
        71
      );

      doc.text(
        `Documentos no válidos: ${
          obtenerNoValidos(
            consolidacion
          ).length
        }`,
        15,
        79
      );

      doc.text(
        "Entregables: EN1 · EN2 · EN3",
        15,
        87
      );

      // =================================================
      // TABLA
      // =================================================

      const filas =
        alumnos.map(
          (alumno) => [
            alumno?.alumno ??
              alumno?.nombre ??
              "--",

            alumno?.EN1 ??
              "--",

            alumno?.EN2 ??
              "--",

            alumno?.EN3 ??
              "--",

            alumno?.total ??
              "--",
          ]
        );

      autoTable(
        doc,
        {
          startY: 95,

          head: [
            [
              "Alumno",
              "EN1",
              "EN2",
              "EN3",
              "Total",
            ],
          ],

          body: filas,

          theme: "grid",

          styles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: [
              50,
              50,
              50,
            ],
          },

          headStyles: {
            fillColor:
              colorPrincipal,

            textColor: 255,

            fontStyle: "bold",

            halign: "center",
          },

          columnStyles: {
            0: {
              cellWidth: 100,
              halign: "left",
            },

            1: {
              cellWidth: 30,
              halign: "center",
            },

            2: {
              cellWidth: 30,
              halign: "center",
            },

            3: {
              cellWidth: 30,
              halign: "center",
            },

            4: {
              cellWidth: 35,
              halign: "center",
              fontStyle: "bold",
            },
          },

          alternateRowStyles: {
            fillColor:
              colorSecundario,
          },

          margin: {
            left: 15,
            right: 15,
          },
        }
      );

      // =================================================
      // PIE
      // =================================================

      const ultimaY =
        doc.lastAutoTable?.finalY ??
        180;

      const pagina =
        doc.internal.pageSize
          .getHeight();

      if (
        ultimaY + 20 <
        pagina
      ) {
        doc.setFontSize(8);

        doc.setTextColor(
          130,
          130,
          130
        );

        doc.text(
          "Reporte generado automáticamente por VG Smart Review",
          148.5,
          pagina - 10,
          {
            align: "center",
          }
        );
      }

      // =================================================
      // ARCHIVO
      // =================================================

      const fechaArchivo =
        new Date()
          .toISOString()
          .slice(
            0,
            10
          );

      doc.save(
        `Reporte_Consolidacion_${fechaArchivo}.pdf`
      );
    } catch (error) {
      console.error(
        "❌ ERROR GENERANDO PDF:",
        error
      );

      alert(
        "Ocurrió un error al generar el reporte PDF."
      );
    } finally {
      setGenerandoPDF(false);
    }
  }

  // ===================================================
  // ELIMINAR
  // ===================================================

  function eliminarConsolidacion(id) {
    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar esta consolidación del historial?"
      );

    if (!confirmar) {
      return;
    }

    const nuevoHistorial =
      historial.filter(
        (item) =>
          item.id !== id
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        nuevoHistorial
      )
    );

    setHistorial(
      nuevoHistorial
    );

    setConsolidacionSeleccionada(
      null
    );

    setDocumentosInvalidosSeleccionados(
      null
    );

    window.dispatchEvent(
      new Event(
        "historialConsolidacionActualizado"
      )
    );
  }

  // ===================================================
  // LIMPIAR TODO
  // ===================================================

  function limpiarTodo() {
    if (
      historial.length === 0
    ) {
      return;
    }

    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar TODAS las consolidaciones?"
      );

    if (!confirmar) {
      return;
    }

    localStorage.removeItem(
      STORAGE_KEY
    );

    setHistorial([]);

    setConsolidacionSeleccionada(
      null
    );

    setDocumentosInvalidosSeleccionados(
      null
    );

    window.dispatchEvent(
      new Event(
        "historialConsolidacionActualizado"
      )
    );
  }

  // ===================================================
  // TOTAL NO VÁLIDOS
  // ===================================================

  const totalNoValidos =
    useMemo(
      () =>
        historial.reduce(
          (total, item) =>
            total +
            obtenerNoValidos(
              item
            ).length,
          0
        ),
      [historial]
    );

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        space-y-8
        pb-14
      "
    >

      {/* =================================================
          HERO
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          bg-gradient-to-br
          from-[#10245f]
          via-[#1D3681]
          to-indigo-700
          p-7
          text-white
          shadow-xl
          sm:p-9
        "
      >

        <div
          className="
            absolute
            -right-20
            -top-24
            h-72
            w-72
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-20
            h-72
            w-72
            rounded-full
            bg-blue-400/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-7
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div
            className="
              flex
              items-start
              gap-5
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/20
                bg-white/15
                shadow-lg
              "
            >

              <History size={31} />

            </div>

            <div>

              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-blue-100
                "
              >

                <Database size={14} />

                Registro de consolidaciones

              </div>

              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  sm:text-4xl
                "
              >
                Historial de consolidación
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  leading-relaxed
                  text-blue-100
                "
              >
                Consulta y revisa las
                consolidaciones realizadas
                anteriormente, junto con sus
                resultados y entregables.
              </p>

            </div>

          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            <div
              className="
                min-w-[125px]
                rounded-2xl
                border
                border-white/15
                bg-white/10
                px-5
                py-4
                backdrop-blur
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  text-blue-200
                "
              >
                Registros
              </p>

              <p
                className="
                  mt-1
                  text-2xl
                  font-black
                "
              >
                {historial.length}
              </p>

            </div>

            <div
              className="
                min-w-[125px]
                rounded-2xl
                border
                border-white/15
                bg-white/10
                px-5
                py-4
                backdrop-blur
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  text-blue-200
                "
              >
                No válidos
              </p>

              <p
                className="
                  mt-1
                  text-2xl
                  font-black
                "
              >
                {totalNoValidos}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          ENCABEZADO
      ================================================= */}

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

        <div>

          <h2
            className="
              text-xl
              font-black
              text-slate-800
            "
          >
            Consolidaciones realizadas
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Revisa el detalle de cada proceso
            almacenado.
          </p>

        </div>

        {historial.length > 0 && (
          <button
            type="button"
            onClick={limpiarTodo}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-2.5
              text-sm
              font-bold
              text-red-600
              transition
              hover:bg-red-100
            "
          >

            <Trash2 size={17} />

            Limpiar historial

          </button>
        )}

      </div>

      {/* =================================================
          SIN HISTORIAL
      ================================================= */}

      {historial.length === 0 && (
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-white
            p-12
            text-center
            shadow-sm
          "
        >

          <div
            className="
              absolute
              left-1/2
              top-0
              h-32
              w-64
              -translate-x-1/2
              rounded-full
              bg-blue-50
              blur-3xl
            "
          />

          <div
            className="
              relative
              mx-auto
              mb-5
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-blue-50
              text-[#1D3681]
            "
          >

            <History size={34} />

          </div>

          <h2
            className="
              relative
              text-xl
              font-black
              text-slate-700
            "
          >
            No hay consolidaciones realizadas
          </h2>

          <p
            className="
              relative
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            Cuando realices una consolidación,
            aparecerá aquí automáticamente.
          </p>

          <button
            type="button"
            onClick={cargarHistorial}
            className="
              relative
              mt-6
              rounded-xl
              bg-[#1D3681]
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              transition
              hover:bg-blue-900
            "
          >
            Actualizar historial
          </button>

        </div>
      )}

      {/* =================================================
          HISTORIAL
      ================================================= */}

      {historial.length > 0 && (
        <div className="space-y-5">

          {historial.map(
            (consolidacion, index) => (

              <div
                key={
                  consolidacion.id ||
                  index
                }
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition
                  hover:border-blue-200
                  hover:shadow-md
                "
              >

                {/* CABECERA */}

                <div
                  className="
                    border-b
                    border-slate-100
                    bg-gradient-to-r
                    from-white
                    to-slate-50/70
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          from-blue-50
                          to-indigo-100
                          text-[#1D3681]
                          shadow-sm
                        "
                      >

                        <Database size={25} />

                      </div>

                      <div>

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >

                          <h2
                            className="
                              font-black
                              text-slate-800
                            "
                          >
                            Consolidación #
                            {historial.length -
                              index}
                          </h2>

                          <span
                            className="
                              rounded-full
                              bg-emerald-50
                              px-2.5
                              py-1
                              text-[11px]
                              font-black
                              text-emerald-700
                            "
                          >
                            Completado
                          </span>

                        </div>

                        <div
                          className="
                            mt-2
                            flex
                            flex-wrap
                            gap-x-5
                            gap-y-2
                            text-sm
                            text-slate-500
                          "
                        >

                          <span
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <CalendarDays
                              size={15}
                              className="text-blue-500"
                            />

                            {consolidacion.fecha ||
                              "--"}

                          </span>

                          <span
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Clock3
                              size={15}
                              className="text-violet-500"
                            />

                            {consolidacion.hora ||
                              "--"}

                          </span>

                        </div>

                      </div>

                    </div>

                    <div
                      className="
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-emerald-100
                        bg-emerald-50
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-emerald-700
                      "
                    >

                      <CheckCircle2 size={17} />

                      Consolidado

                    </div>

                  </div>

                </div>

                {/* INFORMACIÓN */}

                <div className="p-6">

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-3
                    "
                  >

                    {/* ALUMNOS */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-blue-100
                        bg-gradient-to-br
                        from-blue-50
                        to-white
                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <p
                          className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          Alumnos
                        </p>

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                          "
                        >

                          <Users size={18} />

                        </div>

                      </div>

                      <p
                        className="
                          mt-3
                          text-3xl
                          font-black
                          text-slate-800
                        "
                      >
                        {obtenerTotalAlumnos(
                          consolidacion
                        )}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Registros encontrados
                      </p>

                    </div>

                    {/* ENTREGABLES */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-violet-100
                        bg-gradient-to-br
                        from-violet-50
                        to-white
                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <p
                          className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          Entregables
                        </p>

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-violet-100
                            text-violet-600
                          "
                        >

                          <Database size={18} />

                        </div>

                      </div>

                      <p
                        className="
                          mt-3
                          text-lg
                          font-black
                          text-slate-800
                        "
                      >
                        EN1 · EN2 · EN3
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Fuentes consideradas
                      </p>

                    </div>

                    {/* FECHA */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <p
                          className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          Fecha y hora
                        </p>

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            text-slate-500
                            shadow-sm
                          "
                        >

                          <Clock3 size={18} />

                        </div>

                      </div>

                      <p
                        className="
                          mt-3
                          text-sm
                          font-bold
                          text-slate-700
                        "
                      >
                        {consolidacion.fecha ||
                          "--"}
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >
                        {consolidacion.hora ||
                          "--"}
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      CARPETAS
                  ================================================= */}

                  <div
                    className="
                      mt-5
                      rounded-2xl
                      border
                      border-slate-100
                      bg-slate-50/70
                      p-4
                    "
                  >

                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <FolderOpen
                        size={16}
                        className="text-slate-400"
                      />

                      <span
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wide
                          text-slate-400
                        "
                      >
                        Entregables utilizados
                      </span>

                    </div>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                      "
                    >

                      {consolidacion.carpetas?.EN1 && (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-blue-100
                            bg-blue-50
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-blue-700
                          "
                        >

                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-blue-500
                            "
                          />

                          EN1

                        </span>
                      )}

                      {consolidacion.carpetas?.EN2 && (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-violet-100
                            bg-violet-50
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-violet-700
                          "
                        >

                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-violet-500
                            "
                          />

                          EN2

                        </span>
                      )}

                      {consolidacion.carpetas?.EN3 && (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-emerald-100
                            bg-emerald-50
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-emerald-700
                          "
                        >

                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-emerald-500
                            "
                          />

                          EN3

                        </span>
                      )}

                      {!consolidacion.carpetas?.EN1 &&
                        !consolidacion.carpetas?.EN2 &&
                        !consolidacion.carpetas?.EN3 && (
                          <span
                            className="
                              text-xs
                              text-slate-400
                            "
                          >
                            No se registraron las URLs
                            de las carpetas.
                          </span>
                        )}

                    </div>

                  </div>

                  {/* =================================================
                      NO VÁLIDOS
                  ================================================= */}

                  {obtenerNoValidos(
                    consolidacion
                  ).length > 0 && (

                    <div
                      className="
                        mt-5
                        flex
                        flex-col
                        gap-4
                        rounded-2xl
                        border
                        border-amber-200
                        bg-amber-50
                        p-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >

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
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-amber-100
                            text-amber-700
                          "
                        >

                          <AlertTriangle
                            size={19}
                          />

                        </div>

                        <div>

                          <p
                            className="
                              text-sm
                              font-black
                              text-amber-800
                            "
                          >
                            Documentos no válidos
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-amber-700
                            "
                          >
                            {
                              obtenerNoValidos(
                                consolidacion
                              ).length
                            }{" "}
                            documento(s) fueron
                            excluidos de esta
                            consolidación.
                          </p>

                        </div>

                      </div>

                      {/* OJITO */}

                      <button
                        type="button"
                        onClick={() =>
                          verDocumentosInvalidos(
                            consolidacion
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-amber-300
                          bg-white
                          px-4
                          py-2.5
                          text-sm
                          font-black
                          text-amber-700
                          shadow-sm
                          transition
                          hover:bg-amber-100
                        "
                      >

                        <Eye size={17} />

                        Ver documentos

                      </button>

                    </div>

                  )}

                  {/* =================================================
                      BOTONES
                  ================================================= */}

                  <div
                    className="
                      mt-6
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                    "
                  >

                    <button
                      type="button"
                      onClick={() =>
                        verConsolidacion(
                          consolidacion
                        )
                      }
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#1D3681]
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-900
                        hover:shadow-md
                      "
                    >

                      <Eye size={17} />

                      Ver resultados

                      <ChevronRight
                        size={16}
                      />

                    </button>

                    <button
                      type="button"
                      disabled={
                        generandoPDF
                      }
                      onClick={() =>
                        generarReportePDF(
                          consolidacion
                        )
                      }
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-violet-200
                        bg-violet-50
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-violet-700
                        transition
                        hover:bg-violet-100
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >

                      {generandoPDF ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <FileDown
                          size={17}
                        />
                      )}

                      {generandoPDF
                        ? "Generando..."
                        : "Reporte PDF"}

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        eliminarConsolidacion(
                          consolidacion.id
                        )
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                    >

                      <Trash2 size={17} />

                      Eliminar

                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* =================================================
          MODAL RESULTADOS
      ================================================= */}

      {consolidacionSeleccionada && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
            backdrop-blur-sm
          "
          onClick={cerrarDetalle}
        >

          <div
            className="
              w-full
              max-w-6xl
              overflow-hidden
              rounded-[2rem]
              border
              border-white/20
              bg-white
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div
              className="
                border-b
                border-slate-100
                bg-gradient-to-r
                from-[#10245f]
                via-[#1D3681]
                to-indigo-700
                p-6
                text-white
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/10
                    "
                  >

                    <Database size={23} />

                  </div>

                  <div>

                    <h2
                      className="
                        text-xl
                        font-black
                      "
                    >
                      Resultados de consolidación
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-blue-100
                      "
                    >
                      {consolidacionSeleccionada.fecha ||
                        "--"}

                      {" · "}

                      {consolidacionSeleccionada.hora ||
                        "--"}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={
                    cerrarDetalle
                  }
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-white
                    transition
                    hover:bg-white/20
                  "
                  aria-label="Cerrar"
                >

                  <X size={19} />

                </button>

              </div>

            </div>

            {/* RESUMEN */}

            <div
              className="
                border-b
                border-slate-100
                bg-slate-50/70
                px-6
                py-4
              "
            >

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-blue-100
                    bg-blue-50
                    px-3
                    py-2
                    text-xs
                    font-bold
                    text-blue-700
                  "
                >

                  <Users size={15} />

                  {obtenerTotalAlumnos(
                    consolidacionSeleccionada
                  )}
                  {" "}
                  alumnos

                </div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-emerald-100
                    bg-emerald-50
                    px-3
                    py-2
                    text-xs
                    font-bold
                    text-emerald-700
                  "
                >

                  <CheckCircle2 size={15} />

                  Consolidación completada

                </div>

                {obtenerNoValidos(
                  consolidacionSeleccionada
                ).length > 0 && (

                  <button
                    type="button"
                    onClick={() =>
                      verDocumentosInvalidos(
                        consolidacionSeleccionada
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-amber-200
                      bg-amber-50
                      px-3
                      py-2
                      text-xs
                      font-black
                      text-amber-700
                      transition
                      hover:bg-amber-100
                    "
                  >

                    <FileWarning size={15} />

                    {
                      obtenerNoValidos(
                        consolidacionSeleccionada
                      ).length
                    }{" "}
                    no válidos

                    <Eye size={14} />

                  </button>

                )}

              </div>

            </div>

            {/* TABLA */}

            <div
              className="
                max-h-[70vh]
                overflow-auto
                p-6
              "
            >

              {obtenerConsolidadoOrdenado(
                consolidacionSeleccionada
              ).length > 0 ? (

                <div
                  className="
                    overflow-x-auto
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                  "
                >

                  <table
                    className="
                      w-full
                      min-w-[650px]
                      text-sm
                    "
                  >

                    <thead>

                      <tr
                        className="
                          border-b
                          border-slate-200
                          bg-slate-50
                        "
                      >

                        <th
                          className="
                            whitespace-nowrap
                            p-4
                            text-left
                            font-black
                            text-slate-600
                          "
                        >
                          Alumno
                        </th>

                        <th
                          className="
                            whitespace-nowrap
                            p-4
                            text-left
                            font-black
                            text-slate-600
                          "
                        >
                          EN1
                        </th>

                        <th
                          className="
                            whitespace-nowrap
                            p-4
                            text-left
                            font-black
                            text-slate-600
                          "
                        >
                          EN2
                        </th>

                        <th
                          className="
                            whitespace-nowrap
                            p-4
                            text-left
                            font-black
                            text-slate-600
                          "
                        >
                          EN3
                        </th>

                        <th
                          className="
                            whitespace-nowrap
                            p-4
                            text-left
                            font-black
                            text-slate-600
                          "
                        >
                          Total
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {obtenerConsolidadoOrdenado(
                        consolidacionSeleccionada
                      ).map(
                        (alumno, index) => (

                          <tr
                            key={
                              alumno.id ||
                              `${alumno.alumno}-${index}`
                            }
                            className="
                              border-b
                              border-slate-100
                              transition
                              last:border-b-0
                              hover:bg-blue-50/40
                            "
                          >

                            <td
                              className="
                                p-4
                                font-bold
                                text-slate-700
                              "
                            >
                              {alumno.alumno ||
                                alumno.nombre ||
                                "--"}
                            </td>

                            <td
                              className="
                                p-4
                                text-slate-600
                              "
                            >
                              {alumno.EN1 ??
                                "--"}
                            </td>

                            <td
                              className="
                                p-4
                                text-slate-600
                              "
                            >
                              {alumno.EN2 ??
                                "--"}
                            </td>

                            <td
                              className="
                                p-4
                                text-slate-600
                              "
                            >
                              {alumno.EN3 ??
                                "--"}
                            </td>

                            <td
                              className="
                                p-4
                                font-black
                                text-[#1D3681]
                              "
                            >
                              {alumno.total ??
                                "--"}
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
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    p-10
                    text-center
                  "
                >

                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-200
                      text-slate-400
                    "
                  >

                    <Database size={24} />

                  </div>

                  <p
                    className="
                      font-bold
                      text-slate-500
                    "
                  >
                    Esta consolidación no contiene
                    resultados detallados.
                  </p>

                </div>

              )}

            </div>

            {/* FOOTER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-slate-100
                bg-slate-50
                px-6
                py-4
              "
            >

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Historial de consolidación
              </p>

              <button
                type="button"
                onClick={cerrarDetalle}
                className="
                  rounded-xl
                  bg-[#1D3681]
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-blue-900
                "
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          MODAL DOCUMENTOS NO VÁLIDOS
      ================================================= */}

      {documentosInvalidosSeleccionados && (

        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
            backdrop-blur-sm
          "
          onClick={
            cerrarDocumentosInvalidos
          }
        >

          <div
            className="
              w-full
              max-w-5xl
              overflow-hidden
              rounded-[2rem]
              border
              border-white/20
              bg-white
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div
              className="
                border-b
                border-amber-200
                bg-gradient-to-r
                from-amber-500
                to-orange-500
                p-6
                text-white
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/15
                    "
                  >

                    <FileWarning
                      size={25}
                    />

                  </div>

                  <div>

                    <h2
                      className="
                        text-xl
                        font-black
                      "
                    >
                      Documentos no válidos
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-amber-100
                      "
                    >
                      {
                        documentosInvalidosSeleccionados.length
                      }{" "}
                      documento(s) fueron
                      excluidos de la
                      consolidación.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={
                    cerrarDocumentosInvalidos
                  }
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    transition
                    hover:bg-white/20
                  "
                  aria-label="Cerrar"
                >

                  <X size={19} />

                </button>

              </div>

            </div>

            {/* TABLA */}

            <div
              className="
                max-h-[75vh]
                overflow-auto
                p-6
              "
            >

              <div
                className="
                  overflow-x-auto
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                "
              >

                <table
                  className="
                    w-full
                    min-w-[850px]
                    text-sm
                  "
                >

                  <thead>

                    <tr
                      className="
                        border-b
                        border-slate-200
                        bg-slate-50
                      "
                    >

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-black
                          text-slate-600
                        "
                      >
                        #
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-black
                          text-slate-600
                        "
                      >
                        Nombre
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-black
                          text-slate-600
                        "
                      >
                        Entregable
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-black
                          text-slate-600
                        "
                      >
                        Fecha y hora
                      </th>

                      <th
                        className="
                          px-5
                          py-4
                          text-left
                          font-black
                          text-slate-600
                        "
                      >
                        Motivo
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {documentosInvalidosSeleccionados.map(
                      (item, index) => (

                        <tr
                          key={
                            item?.id ||
                            `${item?.nombre || "sin-nombre"}-${index}`
                          }
                          className="
                            border-b
                            border-slate-100
                            last:border-b-0
                            hover:bg-amber-50/40
                          "
                        >

                          <td
                            className="
                              px-5
                              py-4
                              font-bold
                              text-slate-500
                            "
                          >
                            {index + 1}
                          </td>

                          <td
                            className="
                              px-5
                              py-4
                              font-bold
                              text-slate-800
                            "
                          >

                            {item?.nombre ||
                              "(SIN NOMBRE)"}

                          </td>

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <span
                              className="
                                inline-flex
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-xs
                                font-bold
                                text-blue-700
                              "
                            >

                              {item?.entregable ||
                                "-"}

                            </span>

                            {item?.entregableDetectado && (
                              <span
                                className="
                                  mt-1
                                  block
                                  text-xs
                                  text-red-500
                                "
                              >
                                Detectado:{" "}
                                {
                                  item.entregableDetectado
                                }
                              </span>
                            )}

                          </td>

                          <td
                            className="
                              whitespace-nowrap
                              px-5
                              py-4
                              text-slate-600
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <Clock3
                                size={15}
                                className="text-slate-400"
                              />

                              {formatearFecha(
                                item?.fechaHoraAnalisis
                              )}

                            </div>

                          </td>

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >

                            <span
                              className="
                                font-semibold
                                text-red-600
                              "
                            >

                              {item?.motivo ||
                                "Sin motivo especificado."}

                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* FOOTER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-slate-100
                bg-slate-50
                px-6
                py-4
              "
            >

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Revisión de documentos excluidos
              </p>

              <button
                type="button"
                onClick={
                  cerrarDocumentosInvalidos
                }
                className="
                  rounded-xl
                  bg-amber-500
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-amber-600
                "
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
