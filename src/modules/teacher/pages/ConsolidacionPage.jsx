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
  X,
  ExternalLink,
  BarChart3,
  RefreshCw,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { consolidarEntregables } from "../services/teacherService";


// =====================================================
// CONSTANTES
// =====================================================

const ENTREGABLES = [
  {
    codigo: "EN1",
    numero: "01",
    titulo: "Entregable 1",
    descripcion: "Primera evaluación",
    color: "blue",
  },
  {
    codigo: "EN2",
    numero: "02",
    titulo: "Entregable 2",
    descripcion: "Segunda evaluación",
    color: "violet",
  },
  {
    codigo: "EN3",
    numero: "03",
    titulo: "Entregable 3",
    descripcion: "Tercera evaluación",
    color: "emerald",
  },
];

const MENSAJES_PROCESAMIENTO = [
  "Conectando con Google Drive...",
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


// =====================================================
// COMPONENTE
// =====================================================

export default function ConsolidacionPage() {

  // =====================================================
  // CARPETAS
  // =====================================================

  const [carpetas, setCarpetas] = useState({
    EN1: "",
    EN2: "",
    EN3: "",
  });


  // =====================================================
  // RESULTADO
  // =====================================================

  const [resultado, setResultado] = useState(null);


  // =====================================================
  // ESTADOS
  // =====================================================

  const [cargando, setCargando] = useState(false);

  const [error, setError] = useState("");

  const [paso, setPaso] = useState(
    "Esperando inicio..."
  );

  const [mensajeProceso, setMensajeProceso] = useState(
    "Preparando análisis..."
  );

  const [tiempoInicio, setTiempoInicio] =
    useState(null);

  const [tiempoTranscurrido, setTiempoTranscurrido] =
    useState(0);

  const [etapaActual, setEtapaActual] =
    useState(0);


  // =====================================================
  // TABLA
  // =====================================================

  const [paginaActual, setPaginaActual] =
    useState(1);

  const [elementosPorPagina, setElementosPorPagina] =
    useState(10);

  const [busqueda, setBusqueda] =
    useState("");


  // =====================================================
  // CONTADOR DE TIEMPO
  // =====================================================

  useEffect(() => {

    if (!cargando || !tiempoInicio) {
      return;
    }

    const intervalo = setInterval(() => {

      const ahora = Date.now();

      const segundos = Math.floor(
        (ahora - tiempoInicio) / 1000
      );

      setTiempoTranscurrido(segundos);

    }, 1000);

    return () => clearInterval(intervalo);

  }, [cargando, tiempoInicio]);


  // =====================================================
  // MENSAJES AUTOMÁTICOS
  // =====================================================

  useEffect(() => {

    if (!cargando) {
      return;
    }

    let indice = 0;

    setMensajeProceso(
      MENSAJES_PROCESAMIENTO[0]
    );

    const intervalo = setInterval(() => {

      indice =
        (indice + 1) %
        MENSAJES_PROCESAMIENTO.length;

      setMensajeProceso(
        MENSAJES_PROCESAMIENTO[indice]
      );

    }, 3500);

    return () => clearInterval(intervalo);

  }, [cargando]);


  // =====================================================
  // ETAPAS VISUALES
  // =====================================================

  useEffect(() => {

    if (!cargando) {
      return;
    }

    const intervalo = setInterval(() => {

      setEtapaActual((anterior) => {

        if (anterior >= 3) {
          return anterior;
        }

        return anterior + 1;

      });

    }, 5000);

    return () => clearInterval(intervalo);

  }, [cargando]);


  // =====================================================
  // FORMATEAR TIEMPO
  // =====================================================

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


  // =====================================================
  // CAMBIAR CARPETA
  // =====================================================

  function cambiarCarpeta(
    entregable,
    valor
  ) {

    setCarpetas((anterior) => ({
      ...anterior,
      [entregable]: valor,
    }));

    if (error) {
      setError("");
    }
  }


  // =====================================================
  // LIMPIAR CARPETA
  // =====================================================

  function limpiarCarpeta(entregable) {

    setCarpetas((anterior) => ({
      ...anterior,
      [entregable]: "",
    }));
  }


  // =====================================================
  // ESPERAR
  // =====================================================

  function esperar(ms) {

    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }


  // =====================================================
  // EJECUTAR CONSOLIDACIÓN
  // =====================================================

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


    // -------------------------------------------------
    // VALIDACIÓN
    // -------------------------------------------------

    const hayCarpeta =
      carpetas.EN1.trim() ||
      carpetas.EN2.trim() ||
      carpetas.EN3.trim();

    if (!hayCarpeta) {

      setError(
        "Debes ingresar al menos una carpeta de EN1, EN2 o EN3."
      );

      return;
    }


    // -------------------------------------------------
    // INICIO
    // -------------------------------------------------

    const inicio =
      Date.now();

    setCargando(true);

    setTiempoInicio(inicio);

    setTiempoTranscurrido(0);

    setEtapaActual(0);

    setPaso(
      "Preparando consolidación..."
    );

    setMensajeProceso(
      "Preparando análisis..."
    );


    try {

      await esperar(500);


      setPaso(
        "Preparando las carpetas..."
      );

      await esperar(500);


      // -------------------------------------------------
      // EN1
      // -------------------------------------------------

      if (carpetas.EN1.trim()) {

        setPaso(
          "📁 Procesando carpeta EN1..."
        );

        console.log(
          "EN1 incluida:",
          carpetas.EN1
        );

        await esperar(300);
      }


      // -------------------------------------------------
      // EN2
      // -------------------------------------------------

      if (carpetas.EN2.trim()) {

        setPaso(
          "📁 Procesando carpeta EN2..."
        );

        console.log(
          "EN2 incluida:",
          carpetas.EN2
        );

        await esperar(300);
      }


      // -------------------------------------------------
      // EN3
      // -------------------------------------------------

      if (carpetas.EN3.trim()) {

        setPaso(
          "📁 Procesando carpeta EN3..."
        );

        console.log(
          "EN3 incluida:",
          carpetas.EN3
        );

        await esperar(300);
      }


      // -------------------------------------------------
      // BACKEND
      // -------------------------------------------------

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


      console.log(
        "CONSOLIDACIÓN TERMINADA:",
        data
      );


      // -------------------------------------------------
      // MOSTRAR RESULTADOS EN CONSOLA
      // -------------------------------------------------

      if (data?.consolidado) {

        console.log(
          "RESULTADOS CONSOLIDADOS"
        );

        data.consolidado.forEach(
          (alumno) => {

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
      }


      // -------------------------------------------------
      // FINAL
      // -------------------------------------------------

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
          Math.floor(
            (Date.now() - inicio) /
            1000
          )
        )
      );

    }
  }


  // =====================================================
  // DATOS CONSOLIDADOS
  // =====================================================

  const datosConsolidados = useMemo(() => {

    const datos =
      resultado?.consolidado || [];

    return [...datos].sort(
      (a, b) => {

        const nombreA =
          String(
            a.alumno || ""
          ).trim();

        const nombreB =
          String(
            b.alumno || ""
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

  }, [resultado]);


  // =====================================================
  // FILTRO
  // =====================================================

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
        (alumno) => {

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
      busqueda,
    ]);


  // =====================================================
  // PAGINACIÓN
  // =====================================================

  const totalPaginas =
    Math.max(
      1,
      Math.ceil(
        resultadosFiltrados.length /
        elementosPorPagina
      )
    );


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
    totalPaginas,
  ]);


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


  // =====================================================
  // CAMBIAR BÚSQUEDA
  // =====================================================

  function cambiarBusqueda(valor) {

    setBusqueda(valor);

    setPaginaActual(1);
  }


  // =====================================================
  // CAMBIAR CANTIDAD
  // =====================================================

  function cambiarElementosPorPagina(
    valor
  ) {

    setElementosPorPagina(
      Number(valor)
    );

    setPaginaActual(1);
  }


  // =====================================================
  // EXPORTAR CSV
  // =====================================================

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
        (alumno) => [

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
        (fila) =>
          fila
            .map(
              (valor) =>
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
          csv
        ],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const enlace =
      document.createElement(
        "a"
      );

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

    URL.revokeObjectURL(
      url
    );
  }


  // =====================================================
  // EXPORTAR PDF
  // =====================================================

  function exportarPDF() {

    if (
      !resultadosFiltrados.length
    ) {
      return;
    }


    try {

      const doc =
        new jsPDF({
          orientation:
            "landscape",
          unit: "mm",
          format: "a4",
        });


      // ENCABEZADO

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


      doc.setFontSize(
        18
      );

      doc.setFont(
        "helvetica",
        "bold"
      );


      doc.text(
        "Consolidación de Entregables",
        14,
        13
      );


      doc.setFontSize(
        9
      );

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
        `Generado: ${new Date().toLocaleString(
          "es-PE"
        )}`,
        220,
        21
      );


      const filasPDF =
        resultadosFiltrados.map(
          (alumno) => [

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

          head: [
            [
              "Alumno",
              "Semestre",
              "Informe",
              "EN1",
              "EN2",
              "EN3",
              "TOTAL",
            ],
          ],

          body:
            filasPDF,

          theme:
            "grid",

          styles: {
            fontSize: 8,
            cellPadding: 3,
            valign:
              "middle",
          },

          headStyles: {
            fillColor: [
              29,
              54,
              129,
            ],
            textColor:
              255,
            fontStyle:
              "bold",
            halign:
              "center",
          },

          columnStyles: {

            0: {
              cellWidth: 70,
            },

            1: {
              cellWidth: 28,
              halign:
                "center",
            },

            2: {
              cellWidth: 28,
              halign:
                "center",
            },

            3: {
              cellWidth: 25,
              halign:
                "center",
            },

            4: {
              cellWidth: 25,
              halign:
                "center",
            },

            5: {
              cellWidth: 25,
              halign:
                "center",
            },

            6: {
              cellWidth: 30,
              halign:
                "center",
            },

          },

          alternateRowStyles: {
            fillColor: [
              248,
              250,
              252,
            ],
          },

          didParseCell(
            data
          ) {

            if (
              data.section ===
                "body" &&
              data.column.index ===
                6
            ) {

              data.cell.styles.fontStyle =
                "bold";

              data.cell.styles.textColor =
                [
                  29,
                  54,
                  129,
                ];
            }
          },

          didDrawPage() {

            const pageHeight =
              doc.internal
                .pageSize
                .height;


            doc.setFontSize(
              8
            );

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


  // =====================================================
  // CARPETAS SELECCIONADAS
  // =====================================================

  const carpetasSeleccionadas =
    [
      carpetas.EN1,
      carpetas.EN2,
      carpetas.EN3,
    ].filter(
      (carpeta) =>
        carpeta.trim() !== ""
    ).length;


  // =====================================================
  // ESTADO DE ETAPA
  // =====================================================

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


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <section className="max-w-7xl mx-auto space-y-8 pb-14">


      {/* =================================================
          HERO
      ================================================= */}

      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#10245f] via-[#1D3681] to-indigo-700 p-7 sm:p-9 text-white shadow-xl">

        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -left-20 -bottom-32 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />


        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 shadow-lg">

              <Database
                size={30}
              />

            </div>


            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-blue-100 mb-3">

                <Sparkles
                  size={14}
                />

                Módulo docente

              </div>


              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">

                Consolidación

              </h1>


              <p className="mt-2 text-blue-100 max-w-2xl leading-relaxed">

                Reúne automáticamente los resultados de
                <span className="font-bold text-white">
                  {" "}EN1, EN2 y EN3
                </span>
                {" "}por alumno en una sola tabla.

              </p>

            </div>

          </div>


          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-white/10 border border-white/15 px-5 py-4 backdrop-blur">

              <p className="text-xs text-blue-100">
                Carpetas listas
              </p>

              <p className="text-2xl font-black mt-1">
                {carpetasSeleccionadas}
                <span className="text-base text-blue-200">
                  {" "} / 3
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          INFORMACIÓN
      ================================================= */}

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">

              <FolderOpen
                size={23}
              />

            </div>


            <div>

              <h2 className="font-black text-lg text-slate-900">
                ¿Cómo funciona?
              </h2>

              <p className="text-sm text-slate-500 mt-2 leading-relaxed">

                Ingresa las carpetas de Google Drive
                correspondientes a cada entregable.
                El sistema analizará los documentos,
                identificará a cada alumno y reunirá
                sus puntajes.

              </p>

            </div>

          </div>


          <div className="mt-6 flex items-center gap-2 flex-wrap">

            {["EN1", "+", "EN2", "+", "EN3"].map(
              (texto, index) => (

                <div
                  key={index}
                  className={
                    texto === "+"
                      ? "text-slate-300 font-black px-1"
                      : "px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-black"
                  }
                >
                  {texto}
                </div>

              )
            )}

            <div className="text-slate-400 mx-1">
              →
            </div>

            <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm font-black">
              Total del alumno
            </div>

          </div>

        </div>


        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">

              <ShieldCheck
                size={23}
              />

            </div>


            <div>

              <h3 className="font-black text-emerald-900">
                Procesamiento seguro
              </h3>

              <p className="text-sm text-emerald-700 mt-2 leading-relaxed">

                El procesamiento se realiza mediante
                el servicio configurado para analizar
                las carpetas y devolver los resultados
                consolidados.

              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          CONFIGURACIÓN DE CARPETAS
      ================================================= */}

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-6 sm:p-8 border-b border-slate-100">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">

                  <Link
                    size={19}
                  />

                </div>

                <h2 className="text-xl font-black text-slate-900">
                  Carpetas de entregables
                </h2>

              </div>

              <p className="text-sm text-slate-500 mt-2 ml-13">
                Coloca la URL de Google Drive para cada entregable.
              </p>

            </div>


            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">

              <div className="w-2 h-2 rounded-full bg-blue-600" />

              <span className="text-xs font-bold text-slate-600">

                {carpetasSeleccionadas === 0
                  ? "Sin carpetas"
                  : `${carpetasSeleccionadas} de 3 configuradas`}

              </span>

            </div>

          </div>

        </div>


        <div className="p-6 sm:p-8">

          <div className="grid lg:grid-cols-3 gap-5">

            {ENTREGABLES.map(
              (entregable) => {

                const valor =
                  carpetas[
                    entregable.codigo
                  ];

                const tieneCarpeta =
                  valor.trim() !== "";


                const colores = {

                  blue: {
                    card: tieneCarpeta
                      ? "border-blue-200 bg-blue-50/40"
                      : "border-slate-200 bg-slate-50/50",
                    icon: "bg-blue-100 text-blue-700",
                    badge: "bg-blue-50 text-blue-700 border-blue-100",
                  },

                  violet: {
                    card: tieneCarpeta
                      ? "border-violet-200 bg-violet-50/40"
                      : "border-slate-200 bg-slate-50/50",
                    icon: "bg-violet-100 text-violet-700",
                    badge: "bg-violet-50 text-violet-700 border-violet-100",
                  },

                  emerald: {
                    card: tieneCarpeta
                      ? "border-emerald-200 bg-emerald-50/40"
                      : "border-slate-200 bg-slate-50/50",
                    icon: "bg-emerald-100 text-emerald-700",
                    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
                  },

                }[
                  entregable.color
                ];


                return (

                  <div
                    key={
                      entregable.codigo
                    }
                    className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${colores.card}`}
                  >

                    <div className="flex items-start justify-between gap-3 mb-5">

                      <div>

                        <div className="flex items-center gap-2">

                          <span className="text-xs font-black text-slate-400">
                            {entregable.numero}
                          </span>

                          <span className="text-lg font-black text-slate-900">
                            {entregable.codigo}
                          </span>

                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                          {entregable.descripcion}
                        </p>

                      </div>


                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${colores.icon}`}
                      >

                        {tieneCarpeta ? (
                          <CheckCircle2
                            size={20}
                          />
                        ) : (
                          <FolderOpen
                            size={20}
                          />
                        )}

                      </div>

                    </div>


                    <div className="relative">

                      <Link
                        size={17}
                        className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
                      />


                      <input
                        type="text"
                        value={valor}
                        disabled={cargando}
                        onChange={(e) =>
                          cambiarCarpeta(
                            entregable.codigo,
                            e.target.value
                          )
                        }
                        placeholder="Pega aquí la URL de Google Drive"
                        className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                      />


                      {tieneCarpeta && !cargando && (

                        <button
                          type="button"
                          onClick={() =>
                            limpiarCarpeta(
                              entregable.codigo
                            )
                          }
                          className="absolute right-3 top-3 text-slate-400 hover:text-red-500 transition"
                          title="Limpiar"
                        >

                          <X
                            size={17}
                          />

                        </button>

                      )}

                    </div>


                    <div className="mt-4 flex items-center justify-between gap-2">

                      <div className="flex items-center gap-2">

                        <span
                          className={`w-2 h-2 rounded-full ${
                            tieneCarpeta
                              ? "bg-emerald-500"
                              : "bg-slate-300"
                          }`}
                        />

                        <span className="text-xs font-semibold text-slate-500">

                          {tieneCarpeta
                            ? "Carpeta configurada"
                            : "Esperando carpeta"}

                        </span>

                      </div>


                      {tieneCarpeta && (

                        <span
                          className={`text-[10px] uppercase tracking-wide font-black border px-2 py-1 rounded-lg ${colores.badge}`}
                        >
                          Lista
                        </span>

                      )}

                    </div>

                  </div>

                );

              }
            )}

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">

                  <AlertCircle
                    size={19}
                  />

                </div>


                <div className="min-w-0">

                  <p className="font-black text-red-800">
                    No se pudo realizar la consolidación
                  </p>

                  <p className="text-sm text-red-700 mt-1 leading-relaxed">
                    {error}
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* =================================================
              BOTÓN
          ================================================= */}

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">

            <button
              type="button"
              onClick={
                ejecutarConsolidacion
              }
              disabled={
                cargando
              }
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1D3681] hover:bg-[#14285f] text-white font-black shadow-lg shadow-blue-900/15 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >

              {cargando ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Procesando...

                </>

              ) : (

                <>
                  <CheckCircle2
                    size={20}
                  />

                  Consolidar entregables

                </>

              )}

            </button>


            {!cargando && (

              <p className="text-xs text-slate-400 flex items-center gap-2">

                <ShieldCheck
                  size={15}
                />

                Puedes ingresar una, dos o las tres carpetas.

              </p>

            )}

          </div>

        </div>

      </div>


      {/* =================================================
          PROCESAMIENTO
      ================================================= */}

      {cargando && (

        <div className="rounded-[2rem] overflow-hidden border border-blue-200 bg-white shadow-xl">

          <div className="relative overflow-hidden bg-gradient-to-r from-[#10245f] via-[#1D3681] to-indigo-700 p-6 sm:p-8 text-white">

            <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />


            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">

                  <Sparkles
                    size={27}
                    className="animate-pulse"
                  />

                </div>


                <div>

                  <p className="text-xl font-black">
                    Consolidando entregables
                  </p>

                  <p className="text-sm text-blue-100 mt-1">
                    El servidor está procesando los documentos.
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5">

                <Clock3
                  size={17}
                />

                <span className="font-mono font-bold">
                  {formatearTiempo(
                    tiempoTranscurrido
                  )}
                </span>

              </div>

            </div>


            <div className="mt-7 h-1.5 w-full bg-white/15 rounded-full overflow-hidden">

              <div
                className="h-full w-1/3 bg-white rounded-full"
                style={{
                  animation:
                    "consolidacionLoading 1.5s ease-in-out infinite",
                }}
              />

            </div>


            <style>
              {`
                @keyframes consolidacionLoading {
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


          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-4 rounded-2xl bg-blue-50 border border-blue-100 p-5">

              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">

                <Loader2
                  size={21}
                  className="animate-spin"
                />

              </div>


              <div className="min-w-0">

                <p className="font-black text-blue-900">
                  {paso}
                </p>

                <p className="text-sm text-blue-700 mt-1">
                  {mensajeProceso}
                </p>

              </div>

            </div>


            <div className="mt-5 flex items-center justify-between gap-4 text-xs">

              <div className="flex items-center gap-2 text-slate-500">

                <Clock3
                  size={15}
                />

                Tiempo transcurrido:

                <span className="font-mono font-black text-slate-700">
                  {formatearTiempo(
                    tiempoTranscurrido
                  )}
                </span>

              </div>


              <span className="text-slate-400 hidden sm:block">
                No cierres ni recargues esta página.
              </span>

            </div>


            {/* ETAPAS */}

            <div className="mt-7 space-y-3">

              {ENTREGABLES.map(
                (etapa) => {

                  const estado =
                    estadoEtapa(
                      Number(
                        etapa.numero
                      ) - 1
                    );

                  const tiene =
                    carpetas[
                      etapa.codigo
                    ].trim() !== "";


                  return (

                    <div
                      key={
                        etapa.codigo
                      }
                      className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                        !tiene
                          ? "opacity-40 border-slate-200 bg-slate-50"
                          : estado ===
                            "completa"
                          ? "border-emerald-200 bg-emerald-50"
                          : estado ===
                            "activa"
                          ? "border-blue-300 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >

                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          !tiene
                            ? "bg-slate-200 text-slate-400"
                            : estado ===
                              "completa"
                            ? "bg-emerald-600 text-white"
                            : estado ===
                              "activa"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >

                        {!tiene
                          ? etapa.codigo
                          : estado ===
                            "completa"
                          ? (
                            <Check
                              size={18}
                            />
                          )
                          : etapa.codigo}

                      </div>


                      <div className="flex-1">

                        <p className="font-bold text-slate-800">
                          {etapa.titulo}
                        </p>

                        <p className="text-xs text-slate-500 mt-0.5">

                          {!tiene
                            ? "No seleccionado"
                            : estado ===
                              "completa"
                            ? "Procesamiento completado"
                            : estado ===
                              "activa"
                            ? "Procesando documentos..."
                            : "Pendiente"}

                        </p>

                      </div>


                      {tiene &&
                        estado ===
                          "activa" && (

                          <Loader2
                            size={19}
                            className="text-blue-600 animate-spin"
                          />

                        )}

                    </div>

                  );

                }
              )}


              {/* CONSOLIDACIÓN */}

              <div
                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                  estadoEtapa(3) ===
                  "completa"
                    ? "border-emerald-200 bg-emerald-50"
                    : estadoEtapa(3) ===
                      "activa"
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-slate-50"
                }`}
              >

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    estadoEtapa(3) ===
                    "completa"
                      ? "bg-emerald-600 text-white"
                      : estadoEtapa(3) ===
                        "activa"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >

                  {estadoEtapa(3) ===
                  "completa" ? (

                    <Check
                      size={19}
                    />

                  ) : (

                    <FileSearch
                      size={19}
                    />

                  )}

                </div>


                <div className="flex-1">

                  <p className="font-bold text-slate-800">
                    Consolidación
                  </p>

                  <p className="text-xs text-slate-500 mt-0.5">

                    {estadoEtapa(3) ===
                    "completa"
                      ? "Resultados preparados"
                      : estadoEtapa(3) ===
                        "activa"
                      ? "Calculando resultados finales..."
                      : "Pendiente"}

                  </p>

                </div>


                {estadoEtapa(3) ===
                  "activa" && (

                  <Loader2
                    size={19}
                    className="text-blue-600 animate-spin"
                  />

                )}

              </div>

            </div>


            <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-100 p-4">

              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">

                  <Clock3
                    size={16}
                  />

                </div>


                <div>

                  <p className="text-sm font-black text-amber-900">
                    El análisis puede tardar varios minutos
                  </p>

                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    Cada documento puede requerir un análisis individual.
                    Mantén esta página abierta hasta recibir los resultados.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          RESUMEN
      ================================================= */}

      {resultado && (

        <div>

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">

              <BarChart3
                size={20}
              />

            </div>

            <div>

              <h2 className="text-xl font-black text-slate-900">
                Resumen
              </h2>

              <p className="text-sm text-slate-500">
                Vista general de la consolidación.
              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-3 gap-5">

            {/* ALUMNOS */}

            <div className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">

                  <Users
                    size={21}
                  />

                </div>

                <span className="text-xs font-bold text-slate-400">
                  REGISTROS
                </span>

              </div>


              <p className="text-sm text-slate-500 mt-5">
                Alumnos encontrados
              </p>

              <p className="text-3xl font-black text-slate-900 mt-1">

                {resultado.totalAlumnos ||
                  datosConsolidados.length ||
                  0}

              </p>

            </div>


            {/* ENTREGABLES */}

            <div className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">

                  <Database
                    size={21}
                  />

                </div>

                <span className="text-xs font-bold text-slate-400">
                  EVALUACIONES
                </span>

              </div>


              <p className="text-sm text-slate-500 mt-5">
                Entregables procesados
              </p>

              <p className="text-lg font-black text-slate-900 mt-2">
                EN1 · EN2 · EN3
              </p>

            </div>


            {/* ESTADO */}

            <div className="group bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-start justify-between">

                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">

                  <ShieldCheck
                    size={21}
                  />

                </div>

                <span className="text-xs font-bold text-emerald-600">
                  FINALIZADO
                </span>

              </div>


              <p className="text-sm text-slate-500 mt-5">
                Estado
              </p>

              <p className="text-lg font-black text-emerald-600 mt-2">
                Consolidado correctamente
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          TABLA
      ================================================= */}

      {resultado && (

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">


          {/* CABECERA */}

          <div className="p-6 sm:p-7 border-b border-slate-200">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">

                    <Database
                      size={19}
                    />

                  </div>

                  <h2 className="text-xl font-black text-slate-900">
                    Resultado de consolidación
                  </h2>

                </div>

                <p className="text-sm text-slate-500 mt-2 ml-13">
                  Resultados agrupados por alumno, semestre e informe.
                </p>

              </div>


              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={
                    exportarCSV
                  }
                  disabled={
                    !resultadosFiltrados.length
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
                >

                  <Download
                    size={17}
                  />

                  Exportar CSV

                </button>


                <button
                  type="button"
                  onClick={
                    exportarPDF
                  }
                  disabled={
                    !resultadosFiltrados.length
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
                >

                  <FileDown
                    size={17}
                  />

                  Exportar PDF

                </button>

              </div>

            </div>

          </div>


          {/* FILTROS */}

          <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-b border-slate-200">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div className="relative w-full lg:max-w-lg">

                <Search
                  size={18}
                  className="absolute left-3.5 top-3 text-slate-400"
                />


                <input
                  type="text"
                  value={
                    busqueda
                  }
                  onChange={(e) =>
                    cambiarBusqueda(
                      e.target.value
                    )
                  }
                  placeholder="Buscar alumno, semestre o informe..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />


                {busqueda && (

                  <button
                    type="button"
                    onClick={() =>
                      cambiarBusqueda(
                        ""
                      )
                    }
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                  >

                    <X
                      size={17}
                    />

                  </button>

                )}

              </div>


              <div className="flex items-center gap-3">

                <span className="text-xs font-bold text-slate-500">
                  Mostrar
                </span>


                <select
                  value={
                    elementosPorPagina
                  }
                  onChange={(e) =>
                    cambiarElementosPorPagina(
                      e.target.value
                    )
                  }
                  className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
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


                <span className="text-xs text-slate-500">
                  por página
                </span>

              </div>

            </div>

          </div>


          {/* INFORMACIÓN */}

          <div className="px-6 sm:px-7 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <p className="text-xs text-slate-500">

              Mostrando{" "}

              <span className="font-black text-slate-700">

                {resultadosFiltrados.length ===
                0
                  ? 0
                  : indiceInicio + 1}

              </span>

              {" – "}

              <span className="font-black text-slate-700">

                {Math.min(
                  indiceFin,
                  resultadosFiltrados.length
                )}

              </span>

              {" de "}

              <span className="font-black text-slate-700">

                {resultadosFiltrados.length}

              </span>

              {" resultados"}

            </p>


            {busqueda && (

              <div className="inline-flex items-center gap-2 text-xs text-blue-600 font-bold">

                <Search
                  size={13}
                />

                Filtro activo

              </div>

            )}

          </div>


          {/* TABLA */}

          {resultadosPagina.length > 0 ? (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="bg-slate-100 border-b border-slate-200">

                    <th className="text-left p-4 pl-6 font-black text-slate-700 whitespace-nowrap">
                      Alumno
                    </th>

                    <th className="p-4 font-black text-slate-700 whitespace-nowrap">
                      Semestre
                    </th>

                    <th className="p-4 font-black text-slate-700 whitespace-nowrap">
                      Informe
                    </th>

                    <th className="p-4 font-black text-slate-700 whitespace-nowrap">
                      EN1
                    </th>

                    <th className="p-4 font-black text-slate-700 whitespace-nowrap">
                      EN2
                    </th>

                    <th className="p-4 font-black text-slate-700 whitespace-nowrap">
                      EN3
                    </th>

                    <th className="p-4 pr-6 font-black text-blue-800 whitespace-nowrap">
                      TOTAL
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {resultadosPagina.map(
                    (
                      alumno,
                      index
                    ) => (

                      <tr
                        key={`${alumno.alumno}-${indiceInicio + index}`}
                        className="border-b border-slate-100 last:border-0 hover:bg-blue-50/30 transition"
                      >

                        <td className="p-4 pl-6">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs shrink-0">

                              {String(
                                alumno.alumno ||
                                "?"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>


                            <span className="font-bold text-slate-900 whitespace-nowrap">

                              {alumno.alumno ||
                                "-"}

                            </span>

                          </div>

                        </td>


                        <td className="p-4 text-center text-slate-600 whitespace-nowrap">

                          {alumno.semestre ||
                            "-"}

                        </td>


                        <td className="p-4 text-center text-slate-600 whitespace-nowrap">

                          {alumno.informe ||
                            "-"}

                        </td>


                        <td className="p-4 text-center font-semibold text-slate-700">

                          {alumno.EN1 ??
                            0}

                        </td>


                        <td className="p-4 text-center font-semibold text-slate-700">

                          {alumno.EN2 ??
                            0}

                        </td>


                        <td className="p-4 text-center font-semibold text-slate-700">

                          {alumno.EN3 ??
                            0}

                        </td>


                        <td className="p-4 pr-6 text-center">

                          <span className="inline-flex items-center justify-center min-w-[64px] px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 font-black">

                            {alumno.total ??
                              0}

                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="p-14 text-center">

              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mx-auto">

                <FileSearch
                  size={30}
                />

              </div>


              <p className="font-black text-slate-700 mt-5">
                No se encontraron resultados
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Prueba con otro nombre, semestre o informe.
              </p>


              {busqueda && (

                <button
                  type="button"
                  onClick={() => {
                    setBusqueda("");
                    setPaginaActual(1);
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
                >

                  <RotateCcw
                    size={15}
                  />

                  Limpiar búsqueda

                </button>

              )}

            </div>

          )}


          {/* PAGINACIÓN */}

          {resultadosFiltrados.length > 0 && (

            <div className="px-6 sm:px-7 py-5 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <button
                type="button"
                disabled={
                  paginaActual === 1
                }
                onClick={() =>
                  setPaginaActual(
                    (anterior) =>
                      Math.max(
                        1,
                        anterior - 1
                      )
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >

                <ChevronLeft
                  size={17}
                />

                Anterior

              </button>


              <div className="flex items-center justify-center gap-1.5 flex-wrap">

                {Array.from(
                  {
                    length:
                      totalPaginas,
                  },
                  (_, index) =>
                    index + 1
                )
                  .filter(
                    (numero) => {

                      if (
                        totalPaginas <=
                        7
                      ) {
                        return true;
                      }

                      return (
                        numero ===
                          1 ||
                        numero ===
                          totalPaginas ||
                        Math.abs(
                          numero -
                            paginaActual
                        ) <= 1
                      );
                    }
                  )
                  .map(
                    (
                      numero,
                      index,
                      array
                    ) => {

                      const anteriorNumero =
                        array[
                          index - 1
                        ];

                      const mostrarPuntos =
                        anteriorNumero &&
                        numero -
                          anteriorNumero >
                          1;


                      return (

                        <div
                          key={
                            numero
                          }
                          className="flex items-center gap-1.5"
                        >

                          {mostrarPuntos && (

                            <span className="px-1 text-slate-400">
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
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition ${
                              paginaActual ===
                              numero
                                ? "bg-[#1D3681] text-white shadow-md"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
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
                  paginaActual ===
                  totalPaginas
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >

                Siguiente

                <ChevronRight
                  size={17}
                />

              </button>

            </div>

          )}


          {/* PIE */}

          {resultadosFiltrados.length > 0 && (

            <div className="px-6 sm:px-7 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <p className="text-xs text-slate-400">

                Página{" "}

                <span className="font-black text-slate-600">
                  {paginaActual}
                </span>

                {" de "}

                <span className="font-black text-slate-600">
                  {totalPaginas}
                </span>

              </p>


              {busqueda && (

                <button
                  type="button"
                  onClick={() => {

                    setBusqueda(
                      ""
                    );

                    setPaginaActual(
                      1
                    );

                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800"
                >

                  <RotateCcw
                    size={14}
                  />

                  Limpiar filtro

                </button>

              )}

            </div>

          )}

        </div>

      )}


      {/* =================================================
          ANIMACIÓN EXTRA
      ================================================= */}

      <style>
        {`
          @keyframes pulse-soft {
            0%, 100% {
              opacity: 1;
            }

            50% {
              opacity: .65;
            }
          }

          .animate-pulse-soft {
            animation: pulse-soft 2s ease-in-out infinite;
          }
        `}
      </style>

    </section>

  );
}