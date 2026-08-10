import { useEffect, useMemo, useState } from "react";

import {
  FolderOpen,
  Link,
  Loader2,
  Users,
  CheckCircle2,
  Download,
  AlertCircle,
  Clock3,
  FileSearch,
  Database,
  ShieldCheck,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  FileDown,
  RotateCcw,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { consolidarEntregables } from "../services/teacherService";

export default function ConsolidacionPage() {

  // ==================================================
  // CARPETAS
  // ==================================================

  const [carpetas, setCarpetas] = useState({
    EN1: "",
    EN2: "",
    EN3: "",
  });

  // ==================================================
  // RESULTADO
  // ==================================================

  const [resultado, setResultado] = useState(null);

  // ==================================================
  // ESTADOS
  // ==================================================

  const [cargando, setCargando] = useState(false);

  const [error, setError] = useState("");

  const [paso, setPaso] = useState(
    "Esperando inicio..."
  );

  const [tiempoInicio, setTiempoInicio] =
    useState(null);

  const [tiempoTranscurrido, setTiempoTranscurrido] =
    useState(0);

  const [mensajeProceso, setMensajeProceso] =
    useState(
      "Preparando análisis..."
    );

  const [etapaActual, setEtapaActual] =
    useState(0);

  // ==================================================
  // PAGINACIÓN
  // ==================================================

  const [paginaActual, setPaginaActual] =
    useState(1);

  const [elementosPorPagina, setElementosPorPagina] =
    useState(10);

  const [busqueda, setBusqueda] =
    useState("");

  // ==================================================
  // MENSAJES
  // ==================================================

  const mensajesProcesamiento = [
    "Conectando con las carpetas de Google Drive...",
    "Obteniendo los documentos de las carpetas...",
    "Identificando los archivos de cada entregable...",
    "Analizando los documentos de EN1...",
    "Analizando los documentos de EN2...",
    "Analizando los documentos de EN3...",
    "Ejecutando la evaluación de los documentos...",
    "Calculando los puntajes obtenidos...",
    "Relacionando los documentos con cada alumno...",
    "Consolidando EN1, EN2 y EN3...",
    "Verificando los resultados...",
    "Preparando la tabla final...",
  ];

  // ==================================================
  // CONTADOR DE TIEMPO
  // ==================================================

  useEffect(() => {

    if (!cargando || !tiempoInicio) {
      return;
    }

    const intervalo = setInterval(() => {

      const ahora = Date.now();

      const segundos =
        Math.floor(
          (ahora - tiempoInicio) / 1000
        );

      setTiempoTranscurrido(segundos);

    }, 1000);

    return () => {
      clearInterval(intervalo);
    };

  }, [cargando, tiempoInicio]);

  // ==================================================
  // CAMBIAR MENSAJES
  // ==================================================

  useEffect(() => {

    if (!cargando) {
      return;
    }

    let indice = 0;

    setMensajeProceso(
      mensajesProcesamiento[0]
    );

    const intervalo = setInterval(() => {

      indice =
        (indice + 1) %
        mensajesProcesamiento.length;

      setMensajeProceso(
        mensajesProcesamiento[indice]
      );

    }, 3500);

    return () => {
      clearInterval(intervalo);
    };

  }, [cargando]);

  // ==================================================
  // ACTUALIZAR ETAPA
  // ==================================================

  useEffect(() => {

    if (!cargando) {
      return;
    }

    const intervalo = setInterval(() => {

      setEtapaActual(anterior => {

        if (anterior >= 3) {
          return anterior;
        }

        return anterior + 1;

      });

    }, 5000);

    return () => {
      clearInterval(intervalo);
    };

  }, [cargando]);

  // ==================================================
  // FORMATEAR TIEMPO
  // ==================================================

  function formatearTiempo(segundos) {

    const minutos =
      Math.floor(segundos / 60);

    const segundosRestantes =
      segundos % 60;

    return (
      String(minutos).padStart(2, "0") +
      ":" +
      String(segundosRestantes).padStart(2, "0")
    );
  }

  // ==================================================
  // CAMBIAR CARPETA
  // ==================================================

  function cambiarCarpeta(
    entregable,
    valor
  ) {

    setCarpetas(
      anterior => ({
        ...anterior,
        [entregable]: valor,
      })
    );

  }

  // ==================================================
  // EJECUTAR CONSOLIDACIÓN
  // ==================================================

  async function ejecutarConsolidacion() {

    console.log(
      "================================="
    );

    console.log(
      "INICIANDO CONSOLIDACIÓN"
    );

    console.log(
      "CARPETAS:",
      carpetas
    );

    setError("");

    setResultado(null);

    setPaginaActual(1);

    setBusqueda("");

    // --------------------------------------------------
    // VALIDAR
    // --------------------------------------------------

    if (
      !carpetas.EN1.trim() &&
      !carpetas.EN2.trim() &&
      !carpetas.EN3.trim()
    ) {

      setError(
        "Debes ingresar al menos una carpeta."
      );

      return;

    }

    // --------------------------------------------------
    // INICIAR
    // --------------------------------------------------

    const inicio = Date.now();

    setCargando(true);

    setTiempoInicio(inicio);

    setTiempoTranscurrido(0);

    setEtapaActual(0);

    setMensajeProceso(
      "Preparando análisis..."
    );

    setPaso(
      "Preparando consolidación..."
    );

    try {

      await esperar(500);

      setPaso(
        "Preparando las carpetas..."
      );

      await esperar(500);

      // ------------------------------------------------
      // EN1
      // ------------------------------------------------

      if (carpetas.EN1.trim()) {

        setPaso(
          "📁 Procesando carpeta EN1..."
        );

        console.log(
          "EN1 incluida"
        );

        await esperar(300);

      }

      // ------------------------------------------------
      // EN2
      // ------------------------------------------------

      if (carpetas.EN2.trim()) {

        setPaso(
          "📁 Procesando carpeta EN2..."
        );

        console.log(
          "EN2 incluida"
        );

        await esperar(300);

      }

      // ------------------------------------------------
      // EN3
      // ------------------------------------------------

      if (carpetas.EN3.trim()) {

        setPaso(
          "📁 Procesando carpeta EN3..."
        );

        console.log(
          "EN3 incluida"
        );

        await esperar(300);

      }

      // ------------------------------------------------
      // ANÁLISIS REAL
      // ------------------------------------------------

      setEtapaActual(0);

      setPaso(
        "🔍 Analizando documentos..."
      );

      setMensajeProceso(
        "El servidor está analizando los documentos..."
      );

      console.log(
        "ENVIANDO SOLICITUD AL BACKEND..."
      );

      const data =
        await consolidarEntregables({
          carpetas,
        });

      // ------------------------------------------------
      // RESPUESTA
      // ------------------------------------------------

      console.log(
        "CONSOLIDACIÓN TERMINADA:",
        data
      );

      if (data?.consolidado) {

        console.log(
          "================================="
        );

        console.log(
          "RESULTADOS CONSOLIDADOS"
        );

        data.consolidado.forEach(
          alumno => {

            console.log(
              alumno.alumno +
              " | EN1: " +
              alumno.EN1 +
              " | EN2: " +
              alumno.EN2 +
              " | EN3: " +
              alumno.EN3 +
              " | TOTAL: " +
              alumno.total
            );

          }
        );

        console.log(
          "================================="
        );

      }

      // ------------------------------------------------
      // FINALIZAR
      // ------------------------------------------------

      setEtapaActual(4);

      setPaso(
        "✅ Consolidación completada."
      );

      setMensajeProceso(
        "Los resultados fueron procesados correctamente."
      );

      setResultado(data);

      setPaginaActual(1);

    } catch (err) {

      console.error(
        "ERROR CONSOLIDACIÓN:",
        err
      );

      setError(
        err?.message ||
        "No se pudo realizar la consolidación."
      );

      setPaso(
        "❌ La consolidación terminó con error."
      );

      setMensajeProceso(
        "No fue posible completar el procesamiento."
      );

    } finally {

      setCargando(false);

      console.log(
        "TIEMPO TOTAL:",
        formatearTiempo(
          inicio
            ? Math.floor(
                (Date.now() - inicio) /
                1000
              )
            : 0
        )
      );

    }

  }

  // ==================================================
  // ESPERAR
  // ==================================================

  function esperar(ms) {

    return new Promise(
      resolve =>
        setTimeout(
          resolve,
          ms
        )
    );

  }

  // ==================================================
  // DATOS CONSOLIDADOS
  // ==================================================

  const datosConsolidados =
    resultado?.consolidado || [];

  // ==================================================
  // FILTRAR RESULTADOS
  // ==================================================

  const resultadosFiltrados =
    useMemo(() => {

      const texto =
        busqueda
          .trim()
          .toLowerCase();

      if (!texto) {
        return datosConsolidados;
      }

      return datosConsolidados.filter(
        alumno => {

          const nombre =
            String(
              alumno.alumno || ""
            ).toLowerCase();

          const semestre =
            String(
              alumno.semestre || ""
            ).toLowerCase();

          const informe =
            String(
              alumno.informe || ""
            ).toLowerCase();

          return (
            nombre.includes(texto) ||
            semestre.includes(texto) ||
            informe.includes(texto)
          );

        }
      );

    }, [
      datosConsolidados,
      busqueda
    ]);

  // ==================================================
  // TOTAL DE PÁGINAS
  // ==================================================

  const totalPaginas =
    Math.max(
      1,
      Math.ceil(
        resultadosFiltrados.length /
        elementosPorPagina
      )
    );

  // ==================================================
  // CORREGIR PÁGINA
  // ==================================================

  useEffect(() => {

    if (
      paginaActual >
      totalPaginas
    ) {

      setPaginaActual(
        totalPaginas
      );

    }

  }, [
    paginaActual,
    totalPaginas
  ]);

  // ==================================================
  // RESULTADOS DE LA PÁGINA
  // ==================================================

  const indiceInicio =
    (paginaActual - 1) *
    elementosPorPagina;

  const indiceFin =
    indiceInicio +
    elementosPorPagina;

  const resultadosPagina =
    resultadosFiltrados.slice(
      indiceInicio,
      indiceFin
    );

  // ==================================================
  // CAMBIAR BÚSQUEDA
  // ==================================================

  function cambiarBusqueda(valor) {

    setBusqueda(valor);

    setPaginaActual(1);

  }

  // ==================================================
  // CAMBIAR CANTIDAD
  // ==================================================

  function cambiarElementosPorPagina(valor) {

    setElementosPorPagina(
      Number(valor)
    );

    setPaginaActual(1);

  }

  // ==================================================
  // EXPORTAR CSV
  // ==================================================

  function exportarCSV() {

    if (
      !resultadosFiltrados.length
    ) {
      return;
    }

    const encabezados = [
      "Alumno",
      "Semestre",
      "Informe",
      "EN1",
      "EN2",
      "EN3",
      "Total",
    ];

    const filas =
      resultadosFiltrados.map(
        alumno => [

          alumno.alumno,

          alumno.semestre,

          alumno.informe,

          alumno.EN1,

          alumno.EN2,

          alumno.EN3,

          alumno.total,

        ]
      );

    const csv = [
      encabezados,
      ...filas,
    ]
      .map(
        fila =>
          fila
            .map(
              valor =>
                `"${String(
                  valor ?? ""
                ).replace(
                  /"/g,
                  '""'
                )}"`
            )
            .join(",")
      )
      .join("\n");

    const blob =
      new Blob(
        [
          "\ufeff" +
          csv,
        ],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const enlace =
      document.createElement("a");

    enlace.href = url;

    enlace.download =
      "consolidacion_entregables.csv";

    document.body.appendChild(
      enlace
    );

    enlace.click();

    document.body.removeChild(
      enlace
    );

    URL.revokeObjectURL(url);

  }

  // ==================================================
  // EXPORTAR PDF
  // ==================================================

  function exportarPDF() {

    if (
      !resultadosFiltrados.length
    ) {
      return;
    }

    try {

      const doc =
        new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

      // ------------------------------------------------
      // ENCABEZADO
      // ------------------------------------------------

      doc.setFillColor(
        29,
        54,
        129
      );

      doc.rect(
        0,
        0,
        297,
        30,
        "F"
      );

      doc.setTextColor(
        255,
        255,
        255
      );

      doc.setFontSize(18);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Consolidación de Entregables",
        14,
        13
      );

      doc.setFontSize(9);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        "Resultados consolidados por alumno",
        14,
        21
      );

      doc.text(
        `Total de alumnos: ${resultadosFiltrados.length}`,
        220,
        13
      );

      doc.text(
        `Generado: ${new Date().toLocaleString("es-PE")}`,
        220,
        21
      );

      // ------------------------------------------------
      // TABLA
      // ------------------------------------------------

      const filasPDF =
        resultadosFiltrados.map(
          alumno => [

            alumno.alumno || "-",

            alumno.semestre || "-",

            alumno.informe || "-",

            alumno.EN1 ?? 0,

            alumno.EN2 ?? 0,

            alumno.EN3 ?? 0,

            alumno.total ?? 0,

          ]
        );

      autoTable(
        doc,
        {
          startY: 37,

          head: [[
            "Alumno",
            "Semestre",
            "Informe",
            "EN1",
            "EN2",
            "EN3",
            "TOTAL",
          ]],

          body: filasPDF,

          theme: "grid",

          styles: {
            fontSize: 8,
            cellPadding: 3,
            valign: "middle",
          },

          headStyles: {
            fillColor: [
              29,
              54,
              129
            ],
            textColor: 255,
            fontStyle: "bold",
            halign: "center",
          },

          columnStyles: {
            0: {
              cellWidth: 70,
            },

            1: {
              cellWidth: 28,
              halign: "center",
            },

            2: {
              cellWidth: 28,
              halign: "center",
            },

            3: {
              cellWidth: 25,
              halign: "center",
            },

            4: {
              cellWidth: 25,
              halign: "center",
            },

            5: {
              cellWidth: 25,
              halign: "center",
            },

            6: {
              cellWidth: 30,
              halign: "center",
            },
          },

          alternateRowStyles: {
            fillColor: [
              248,
              250,
              252
            ],
          },

          didParseCell: function (data) {

            if (
              data.section === "body" &&
              data.column.index === 6
            ) {

              data.cell.styles.fontStyle =
                "bold";

              data.cell.styles.textColor =
                [
                  29,
                  54,
                  129
                ];

            }

          },

          didDrawPage: function () {

            const pageHeight =
              doc.internal.pageSize.height;

            doc.setFontSize(8);

            doc.setTextColor(
              100,
              116,
              139
            );

            doc.text(
              "Sistema de consolidación de entregables",
              14,
              pageHeight - 8
            );

            doc.text(
              `Página ${doc.internal.getNumberOfPages()}`,
              260,
              pageHeight - 8
            );

          },

        }
      );

      // ------------------------------------------------
      // GUARDAR
      // ------------------------------------------------

      doc.save(
        "consolidacion_entregables.pdf"
      );

    } catch (err) {

      console.error(
        "ERROR GENERANDO PDF:",
        err
      );

      setError(
        "No se pudo generar el PDF. Verifica que jspdf y jspdf-autotable estén instalados."
      );

    }

  }

  // ==================================================
  // CANTIDAD DE CARPETAS
  // ==================================================

  const carpetasSeleccionadas =
    [
      carpetas.EN1,
      carpetas.EN2,
      carpetas.EN3,
    ].filter(
      carpeta =>
        carpeta.trim() !== ""
    ).length;

  // ==================================================
  // ESTADO ETAPA
  // ==================================================

  function estadoEtapa(numero) {

    if (!cargando) {

      if (
        resultado &&
        numero <= 3
      ) {
        return "completa";
      }

      return "pendiente";

    }

    if (
      numero < etapaActual
    ) {
      return "completa";
    }

    if (
      numero === etapaActual
    ) {
      return "activa";
    }

    return "pendiente";

  }

  // ==================================================
  // RENDER
  // ==================================================

  return (

    <section
      className="
        max-w-7xl
        mx-auto
        space-y-8
        pb-10
      "
    >

      {/* ==========================================
          ENCABEZADO
      =========================================== */}

      <div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-blue-100
              text-blue-700
              flex
              items-center
              justify-center
            "
          >

            <Database size={25} />

          </div>

          <div>

            <h1
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              Consolidación
            </h1>

            <p
              className="
                mt-1
                text-slate-500
              "
            >
              Consolida los resultados de EN1,
              EN2 y EN3 por alumno.
            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          INFORMACIÓN
      =========================================== */}

      <div
        className="
          bg-gradient-to-r
          from-blue-50
          to-indigo-50
          border
          border-blue-100
          rounded-3xl
          p-6
        "
      >

        <div
          className="
            flex
            gap-4
          "
        >

          <div
            className="
              bg-blue-600
              text-white
              rounded-2xl
              p-3
              h-fit
              shrink-0
            "
          >

            <FolderOpen size={24} />

          </div>

          <div>

            <h2
              className="
                font-black
                text-blue-900
              "
            >
              ¿Cómo funciona?
            </h2>

            <p
              className="
                text-sm
                text-blue-800
                mt-1
                leading-relaxed
              "
            >
              Ingresa las carpetas de EN1,
              EN2 y EN3. El sistema analizará
              los documentos, identificará al
              alumno mediante el nombre del
              archivo y reunirá sus puntajes
              en una sola fila.
            </p>

            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2
              "
            >

              {[
                "EN1",
                "+",
                "EN2",
                "+",
                "EN3",
              ].map(
                (texto, index) => (

                  <span
                    key={index}
                    className="
                      bg-white
                      border
                      border-blue-100
                      text-blue-800
                      text-xs
                      font-bold
                      px-3
                      py-1.5
                      rounded-lg
                    "
                  >
                    {texto}
                  </span>

                )
              )}

              <span
                className="
                  text-xs
                  font-bold
                  text-blue-700
                  flex
                  items-center
                  ml-1
                "
              >
                = Total del alumno
              </span>

            </div>

            <p
              className="
                text-xs
                text-blue-700
                mt-4
                font-semibold
              "
            >
              Ejemplo de nombre:
              {" "}
              ASE242S5_IS1_EN2_CondeCerronTatiana
            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          CARPETAS
      =========================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-8
        "
      >

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mb-6
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
              Carpetas de entregables
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              Selecciona una carpeta para
              cada entregable.
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-bold
              text-slate-500
              bg-slate-100
              px-3
              py-2
              rounded-xl
            "
          >

            <FolderOpen size={15} />

            {carpetasSeleccionadas}
            {" "}
            de 3 carpetas

          </div>

        </div>


        {/* CARPETAS */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {[
            "EN1",
            "EN2",
            "EN3",
          ].map(
            entregable => {

              const tieneCarpeta =
                carpetas[
                  entregable
                ].trim() !== "";

              return (

                <div
                  key={entregable}
                  className={`
                    border
                    rounded-2xl
                    p-5
                    transition
                    ${
                      tieneCarpeta
                        ? "border-green-200 bg-green-50/40"
                        : "border-slate-200 bg-slate-50"
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                    "
                  >

                    <div>

                      <span
                        className="
                          font-black
                          text-lg
                          text-slate-900
                        "
                      >
                        {entregable}
                      </span>

                      <p
                        className="
                          text-xs
                          text-slate-500
                          mt-0.5
                        "
                      >
                        Entregable{" "}
                        {entregable.replace(
                          "EN",
                          ""
                        )}
                      </p>

                    </div>

                    <div
                      className={`
                        rounded-xl
                        p-2.5
                        ${
                          tieneCarpeta
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >

                      {tieneCarpeta
                        ? (
                          <CheckCircle2
                            size={20}
                          />
                        )
                        : (
                          <FolderOpen
                            size={20}
                          />
                        )}

                    </div>

                  </div>

                  <div
                    className="
                      relative
                    "
                  >

                    <Link
                      size={17}
                      className="
                        absolute
                        left-3
                        top-3
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      value={
                        carpetas[
                          entregable
                        ]
                      }
                      disabled={cargando}
                      onChange={
                        e =>
                          cambiarCarpeta(
                            entregable,
                            e.target.value
                          )
                      }
                      placeholder="URL de Google Drive"
                      className="
                        w-full
                        pl-10
                        pr-3
                        py-3
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                        disabled:bg-slate-100
                      "
                    />

                  </div>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <div
                      className={`
                        w-2
                        h-2
                        rounded-full
                        ${
                          tieneCarpeta
                            ? "bg-green-500"
                            : "bg-slate-300"
                        }
                      `}
                    />

                    <span
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {tieneCarpeta
                        ? "Carpeta configurada"
                        : "Esperando carpeta"}
                    </span>

                  </div>

                </div>

              );

            }
          )}

        </div>


        {/* ERROR */}

        {error && (

          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              bg-red-50
              border
              border-red-200
              text-red-700
              rounded-2xl
              p-4
            "
          >

            <AlertCircle
              size={20}
              className="
                shrink-0
                mt-0.5
              "
            />

            <div>

              <p
                className="
                  font-bold
                "
              >
                No se pudo realizar la consolidación
              </p>

              <p
                className="
                  text-sm
                  mt-1
                "
              >
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ========================================
            PROCESAMIENTO
        ========================================= */}

        {cargando && (

          <div
            className="
              mt-6
              bg-white
              border
              border-blue-200
              rounded-3xl
              shadow-lg
              overflow-hidden
            "
          >

            <div
              className="
                px-6
                py-6
                bg-gradient-to-r
                from-[#1D3681]
                via-blue-700
                to-indigo-700
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
                      w-14
                      h-14
                      rounded-2xl
                      bg-white/15
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Sparkles
                      size={26}
                      className="
                        animate-pulse
                      "
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-xl
                        font-black
                      "
                    >
                      Consolidando entregables
                    </p>

                    <p
                      className="
                        text-sm
                        text-blue-100
                        mt-1
                      "
                    >
                      El servidor está procesando
                      los documentos.
                    </p>

                  </div>

                </div>

                <div
                  className="
                    hidden
                    sm:flex
                    items-center
                    gap-2
                    bg-white/10
                    border
                    border-white/10
                    rounded-xl
                    px-4
                    py-2
                  "
                >

                  <Clock3 size={17} />

                  <span
                    className="
                      font-mono
                      font-bold
                    "
                  >
                    {formatearTiempo(
                      tiempoTranscurrido
                    )}
                  </span>

                </div>

              </div>

              <div
                className="
                  mt-6
                  h-1.5
                  w-full
                  bg-white/15
                  rounded-full
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    w-1/3
                    bg-white
                    rounded-full
                  "
                  style={{
                    animation:
                      "loading 1.5s ease-in-out infinite",
                  }}
                />

              </div>

              <style>
                {`
                  @keyframes loading {
                    0% {
                      transform: translateX(-120%);
                    }

                    50% {
                      transform: translateX(100%);
                    }

                    100% {
                      transform: translateX(320%);
                    }
                  }
                `}
              </style>

            </div>


            <div
              className="
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-blue-50
                  border
                  border-blue-100
                  rounded-2xl
                  p-5
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <Loader2
                    size={21}
                    className="
                      animate-spin
                    "
                  />

                </div>

                <div
                  className="
                    min-w-0
                  "
                >

                  <p
                    className="
                      font-bold
                      text-blue-900
                    "
                  >
                    {paso}
                  </p>

                  <p
                    className="
                      text-sm
                      text-blue-700
                      mt-1
                    "
                  >
                    {mensajeProceso}
                  </p>

                </div>

              </div>


              <div
                className="
                  mt-4
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-slate-500
                  "
                >

                  <Clock3 size={15} />

                  Tiempo transcurrido:

                  <span
                    className="
                      font-mono
                      font-bold
                      text-slate-700
                    "
                  >
                    {formatearTiempo(
                      tiempoTranscurrido
                    )}
                  </span>

                </div>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  No cierres ni recargues esta página.
                </p>

              </div>


              {/* ETAPAS */}

              <div
                className="
                  mt-6
                  space-y-3
                "
              >

                {[
                  {
                    codigo: "EN1",
                    numero: 0,
                    titulo: "Entregable 1",
                  },
                  {
                    codigo: "EN2",
                    numero: 1,
                    titulo: "Entregable 2",
                  },
                  {
                    codigo: "EN3",
                    numero: 2,
                    titulo: "Entregable 3",
                  },
                ].map(
                  etapa => {

                    const codigo =
                      etapa.codigo;

                    const estado =
                      estadoEtapa(
                        etapa.numero
                      );

                    const tiene =
                      carpetas[codigo]
                        .trim() !== "";

                    return (

                      <div
                        key={codigo}
                        className={`
                          flex
                          items-center
                          gap-4
                          rounded-2xl
                          border
                          p-4
                          transition-all
                          ${
                            !tiene
                              ? "opacity-40 border-slate-200 bg-slate-50"
                              : estado === "completa"
                                ? "border-green-200 bg-green-50"
                                : estado === "activa"
                                  ? "border-blue-300 bg-blue-50 shadow-sm"
                                  : "border-slate-200 bg-slate-50"
                          }
                        `}
                      >

                        <div
                          className={`
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            font-black
                            text-xs
                            shrink-0
                            ${
                              !tiene
                                ? "bg-slate-200 text-slate-400"
                                : estado === "completa"
                                  ? "bg-green-600 text-white"
                                  : estado === "activa"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-200 text-slate-500"
                            }
                          `}
                        >

                          {!tiene
                            ? codigo
                            : estado === "completa"
                              ? <Check size={18} />
                              : codigo}

                        </div>

                        <div className="flex-1">

                          <p
                            className="
                              font-bold
                              text-slate-800
                            "
                          >
                            {etapa.titulo}
                          </p>

                          <p
                            className="
                              text-xs
                              text-slate-500
                              mt-0.5
                            "
                          >
                            {!tiene
                              ? "No seleccionado"
                              : estado === "completa"
                                ? "Procesamiento completado"
                                : estado === "activa"
                                  ? "Procesando documentos..."
                                  : "Pendiente"}
                          </p>

                        </div>

                        {tiene &&
                          estado === "activa" && (

                            <Loader2
                              size={19}
                              className="
                                text-blue-600
                                animate-spin
                              "
                            />

                          )}

                      </div>

                    );

                  }
                )}


                {/* CONSOLIDACIÓN */}

                <div
                  className={`
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    p-4
                    transition-all
                    ${
                      estadoEtapa(3) === "completa"
                        ? "border-green-200 bg-green-50"
                        : estadoEtapa(3) === "activa"
                          ? "border-blue-300 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-slate-50"
                    }
                  `}
                >

                  <div
                    className={`
                      w-10
                      h-10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                      ${
                        estadoEtapa(3) === "completa"
                          ? "bg-green-600 text-white"
                          : estadoEtapa(3) === "activa"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-500"
                      }
                    `}
                  >

                    {estadoEtapa(3) === "completa"
                      ? (
                        <Check size={19} />
                      )
                      : (
                        <FileSearch size={19} />
                      )}

                  </div>

                  <div className="flex-1">

                    <p
                      className="
                        font-bold
                        text-slate-800
                      "
                    >
                      Consolidación
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                        mt-0.5
                      "
                    >
                      {estadoEtapa(3) === "completa"
                        ? "Resultados preparados"
                        : estadoEtapa(3) === "activa"
                          ? "Calculando resultados finales..."
                          : "Pendiente"}
                    </p>

                  </div>

                  {estadoEtapa(3) === "activa" && (

                    <Loader2
                      size={19}
                      className="
                        text-blue-600
                        animate-spin
                      "
                    />

                  )}

                </div>

              </div>


              <div
                className="
                  mt-6
                  rounded-2xl
                  bg-slate-50
                  border
                  border-slate-200
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <div
                    className="
                      w-8
                      h-8
                      rounded-lg
                      bg-amber-100
                      text-amber-700
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >

                    <Clock3 size={16} />

                  </div>

                  <div>

                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-700
                      "
                    >
                      El análisis puede tardar varios minutos
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                        mt-1
                        leading-relaxed
                      "
                    >
                      Cada documento puede requerir
                      análisis individual. Mantén esta
                      página abierta hasta recibir los
                      resultados.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ========================================
            BOTÓN
        ========================================= */}

        <button
          onClick={
            ejecutarConsolidacion
          }
          disabled={cargando}
          className="
            mt-6
            bg-[#1D3681]
            hover:bg-blue-950
            disabled:opacity-60
            disabled:cursor-not-allowed
            text-white
            px-6
            py-3
            rounded-xl
            font-black
            flex
            items-center
            gap-2
            transition
            shadow-sm
          "
        >

          {cargando ? (

            <>

              <Loader2
                size={20}
                className="
                  animate-spin
                "
              />

              Procesando...

            </>

          ) : (

            <>

              <CheckCircle2 size={20} />

              Consolidar entregables

            </>

          )}

        </button>

      </div>


      {/* ==========================================
          RESUMEN
      =========================================== */}

      {resultado && (

        <div
          className="
            grid
            md:grid-cols-3
            gap-5
          "
        >

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-6
              shadow-sm
            "
          >

            <Users
              className="
                text-blue-700
                mb-3
              "
            />

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Alumnos
            </p>

            <p
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              {resultado.totalAlumnos ||
                datosConsolidados.length ||
                0}
            </p>

          </div>


          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-6
              shadow-sm
            "
          >

            <Database
              className="
                text-blue-700
                mb-3
              "
            />

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Entregables
            </p>

            <p
              className="
                text-xl
                font-black
                mt-2
                text-slate-900
              "
            >
              EN1 · EN2 · EN3
            </p>

          </div>


          <div
            className="
              bg-white
              border
              border-green-200
              rounded-2xl
              p-6
              shadow-sm
            "
          >

            <ShieldCheck
              className="
                text-green-600
                mb-3
              "
            />

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Estado
            </p>

            <p
              className="
                text-xl
                font-black
                text-green-600
                mt-2
              "
            >
              Consolidado
            </p>

          </div>

        </div>

      )}


      {/* ==========================================
          TABLA
      =========================================== */}

      {resultado && (

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


            {/* ACCIONES */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >

              <button
                onClick={
                  exportarCSV
                }
                disabled={
                  !resultadosFiltrados.length
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-bold
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >

                <Download size={18} />

                CSV

              </button>


              <button
                onClick={
                  exportarPDF
                }
                disabled={
                  !resultadosFiltrados.length
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-bold
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >

                <FileDown size={18} />

                PDF

              </button>

            </div>

          </div>


          {/* ========================================
              FILTROS
          ========================================= */}

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
                onChange={
                  e =>
                    cambiarBusqueda(
                      e.target.value
                    )
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
                  title="Limpiar búsqueda"
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
                value={
                  elementosPorPagina
                }
                onChange={
                  e =>
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

                <option value={10}>
                  10
                </option>

                <option value={25}>
                  25
                </option>

                <option value={50}>
                  50
                </option>

                <option value={100}>
                  100
                </option>

              </select>

              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                por página
              </span>

            </div>

          </div>


          {/* ========================================
              INFORMACIÓN PAGINACIÓN
          ========================================= */}

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

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Mostrando{" "}
              <span
                className="
                  font-bold
                  text-slate-700
                "
              >
                {resultadosFiltrados.length === 0
                  ? 0
                  : indiceInicio + 1}
              </span>
              {" "}–{" "}
              <span
                className="
                  font-bold
                  text-slate-700
                "
              >
                {Math.min(
                  indiceFin,
                  resultadosFiltrados.length
                )}
              </span>
              {" "}de{" "}
              <span
                className="
                  font-bold
                  text-slate-700
                "
              >
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


          {/* ========================================
              TABLA
          ========================================= */}

          {resultadosPagina.length > 0 ? (

            <div
              className="
                overflow-x-auto
              "
            >

              <table
                className="
                  w-full
                  text-sm
                "
              >

                <thead
                  className="
                    bg-slate-100
                  "
                >

                  <tr>

                    <th
                      className="
                        text-left
                        p-4
                        font-black
                        text-slate-700
                      "
                    >
                      Alumno
                    </th>

                    <th
                      className="
                        p-4
                        font-black
                        text-slate-700
                      "
                    >
                      Semestre
                    </th>

                    <th
                      className="
                        p-4
                        font-black
                        text-slate-700
                      "
                    >
                      Informe
                    </th>

                    <th
                      className="
                        p-4
                        font-black
                        text-slate-700
                      "
                    >
                      EN1
                    </th>

                    <th
                      className="
                        p-4
                        font-black
                        text-slate-700
                      "
                    >
                      EN2
                    </th>

                    <th
                      className="
                        p-4
                        font-black
                        text-slate-700
                      "
                    >
                      EN3
                    </th>

                    <th
                      className="
                        p-4
                        font-black
                        text-blue-800
                      "
                    >
                      TOTAL
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {resultadosPagina.map(
                    (alumno, index) => (

                      <tr
                        key={
                          `${alumno.alumno}-${indiceInicio + index}`
                        }
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

                        <td
                          className="
                            p-4
                            text-center
                            font-semibold
                          "
                        >
                          {alumno.EN1}
                        </td>

                        <td
                          className="
                            p-4
                            text-center
                            font-semibold
                          "
                        >
                          {alumno.EN2}
                        </td>

                        <td
                          className="
                            p-4
                            text-center
                            font-semibold
                          "
                        >
                          {alumno.EN3}
                        </td>

                        <td
                          className="
                            p-4
                            text-center
                          "
                        >

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

              <p
                className="
                  text-sm
                  mt-1
                "
              >
                Prueba con otro nombre o
                verifica las carpetas.
              </p>

            </div>

          )}


          {/* ========================================
              PAGINACIÓN
          ========================================= */}

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

              {/* ANTERIOR */}

              <button
                type="button"
                disabled={
                  paginaActual === 1
                }
                onClick={() =>
                  setPaginaActual(
                    anterior =>
                      Math.max(
                        1,
                        anterior - 1
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
                  transition
                "
              >

                <ChevronLeft size={18} />

                Anterior

              </button>


              {/* PÁGINAS */}

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
                  {
                    length: totalPaginas
                  },
                  (_, index) =>
                    index + 1
                )
                  .filter(numero => {

                    if (
                      totalPaginas <= 7
                    ) {
                      return true;
                    }

                    return (
                      numero === 1 ||
                      numero === totalPaginas ||
                      Math.abs(
                        numero -
                        paginaActual
                      ) <= 1
                    );

                  })
                  .map(
                    (numero, index, array) => {

                      const anteriorNumero =
                        array[index - 1];

                      const mostrarPontos =
                        anteriorNumero &&
                        numero -
                          anteriorNumero >
                          1;

                      return (

                        <div
                          key={numero}
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          {mostrarPontos && (

                            <span
                              className="
                                px-1
                                text-slate-400
                              "
                            >
                              ...
                            </span>

                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setPaginaActual(
                                numero
                              )
                            }
                            className={`
                              w-10
                              h-10
                              rounded-xl
                              font-bold
                              text-sm
                              transition
                              ${
                                paginaActual ===
                                numero
                                  ? "bg-[#1D3681] text-white shadow-sm"
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


              {/* SIGUIENTE */}

              <button
                type="button"
                disabled={
                  paginaActual ===
                  totalPaginas
                }
                onClick={() =>
                  setPaginaActual(
                    anterior =>
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
                  transition
                "
              >

                Siguiente

                <ChevronRight size={18} />

              </button>

            </div>

          )}


          {/* ========================================
              PIE DE TABLA
          ========================================= */}

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

              <div
                className="
                  text-xs
                  text-slate-400
                "
              >
                Página{" "}
                <span
                  className="
                    font-bold
                    text-slate-600
                  "
                >
                  {paginaActual}
                </span>
                {" "}de{" "}
                <span
                  className="
                    font-bold
                    text-slate-600
                  "
                >
                  {totalPaginas}
                </span>
              </div>

              {busqueda && (

                <button
                  type="button"
                  onClick={() => {
                    setBusqueda("");
                    setPaginaActual(1);
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

      )}

    </section>

  );

}
