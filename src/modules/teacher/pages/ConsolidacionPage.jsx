import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Check,
  Database,
  FileSearch,
  FolderOpen,
  Loader2,
  Search,
  Sparkles,
  Trash2,
  Users,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { consolidarEntregables } from "../services/teacherService";

const STORAGE_KEY = "historial-consolidacion";

export default function ConsolidacionPage() {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [carpetas, setCarpetas] = useState({
    EN1: "",
    EN2: "",
    EN3: "",
  });

  const [resultado, setResultado] = useState(null);

  const [cargando, setCargando] = useState(false);

  const [error, setError] = useState("");

  const [paso, setPaso] = useState(
    "Preparando consolidación..."
  );

  const [mensajeProceso, setMensajeProceso] = useState(
    "Preparando análisis..."
  );

  const [etapaActual, setEtapaActual] = useState(0);

  const [tiempoInicio, setTiempoInicio] = useState(null);

  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);

  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);

  const [elementosPorPagina, setElementosPorPagina] =
    useState(10);


  // =====================================================
  // CONTADOR DE TIEMPO
  // =====================================================

  useEffect(() => {

    if (!cargando || !tiempoInicio) {
      return;
    }

    const intervalo = setInterval(() => {

      setTiempoTranscurrido(
        Math.floor(
          (Date.now() - tiempoInicio) / 1000
        )
      );

    }, 1000);

    return () => clearInterval(intervalo);

  }, [cargando, tiempoInicio]);


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
  // GUARDAR CONSOLIDACIÓN EN HISTORIAL
  // =====================================================
// =====================================================
// GUARDAR CONSOLIDACIÓN EN HISTORIAL
// =====================================================

function guardarEnHistorial(data) {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);

    let historialAnterior = [];

    if (guardado) {
      try {
        const parseado = JSON.parse(guardado);

        if (Array.isArray(parseado)) {
          historialAnterior = parseado;
        }
      } catch (errorLectura) {
        console.error(
          "❌ Error leyendo historial anterior:",
          errorLectura
        );

        historialAnterior = [];
      }
    }

    const ahora = new Date();

    const nuevaConsolidacion = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,

      fecha: ahora.toLocaleDateString("es-PE"),

      hora: ahora.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),

      timestamp: ahora.toISOString(),

      carpetas: {
        ...carpetas,
      },

      totalAlumnos:
        data?.totalAlumnos ??
        data?.consolidado?.length ??
        0,

      resultado: data,

      consolidado: Array.isArray(data?.consolidado)
        ? data.consolidado
        : [],
    };

    const historialNuevo = [
      nuevaConsolidacion,
      ...historialAnterior,
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(historialNuevo)
    );

    // Notificar a otras páginas/componentes
    window.dispatchEvent(
      new Event("historialConsolidacionActualizado")
    );

    console.log("=================================");
    console.log("✅ CONSOLIDACIÓN GUARDADA");
    console.log("Clave:", STORAGE_KEY);
    console.log(
      "Total de consolidaciones:",
      historialNuevo.length
    );
    console.log(
      "Nueva consolidación:",
      nuevaConsolidacion
    );
    console.log(
      "Historial completo:",
      historialNuevo
    );
    console.log(
      "LocalStorage:",
      localStorage.getItem(STORAGE_KEY)
    );
    console.log("=================================");
  } catch (err) {
    console.error(
      "❌ ERROR GUARDANDO HISTORIAL:",
      err
    );
  }
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

    const inicio = Date.now();

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

      // -------------------------------------------------
      // EN1
      // -------------------------------------------------

      if (carpetas.EN1.trim()) {

        setEtapaActual(0);

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

        setEtapaActual(1);

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

        setEtapaActual(2);

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

      setEtapaActual(3);

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
      // VALIDAR RESPUESTA
      // -------------------------------------------------

      if (!data) {

        throw new Error(
          "El servidor no devolvió resultados."
        );

      }

      // -------------------------------------------------
      // VALIDAR CONSOLIDADO
      // -------------------------------------------------

      if (
        data.consolidado &&
        Array.isArray(data.consolidado)
      ) {

        console.log(
          "RESULTADOS CONSOLIDADOS:",
          data.consolidado
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
      // GUARDAR RESULTADO
      // -------------------------------------------------

      setResultado(data);

      guardarEnHistorial(data);

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

  const datosConsolidados =
    useMemo(() => {

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
  // CONFIGURACIÓN VISUAL DE ETAPAS
  // =====================================================

  const etapas = [
    {
      codigo: 1,
      titulo: "Procesamiento EN1",
      descripcion: "Analizando entregables EN1",
      color: "blue",
    },
    {
      codigo: 2,
      titulo: "Procesamiento EN2",
      descripcion: "Analizando entregables EN2",
      color: "violet",
    },
    {
      codigo: 3,
      titulo: "Procesamiento EN3",
      descripcion: "Analizando entregables EN3",
      color: "amber",
    },
  ];


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <section
      className="
        min-h-screen
        bg-slate-50/70
        px-3
        pb-16
        pt-2
        sm:px-5
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          space-y-7
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <div
          className="
            relative
            isolate
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-br
            from-[#0d1b4f]
            via-[#1D3681]
            to-[#3654c7]
            px-6
            py-7
            text-white
            shadow-[0_20px_60px_rgba(29,54,129,0.25)]
            sm:px-9
            sm:py-9
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              absolute
              -right-20
              -top-24
              h-72
              w-72
              rounded-full
              bg-blue-300/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-20
              h-80
              w-80
              rounded-full
              bg-indigo-300/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              right-1/3
              top-1/2
              h-32
              w-32
              rounded-full
              bg-white/5
              blur-2xl
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

            {/* TITULO */}

            <div
              className="
                flex
                items-start
                gap-4
                sm:gap-5
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
                  border
                  border-white/20
                  bg-white/10
                  shadow-lg
                  backdrop-blur-md
                  sm:h-16
                  sm:w-16
                "
              >

                <Database
                  size={29}
                  strokeWidth={1.8}
                />

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
                    text-[11px]
                    font-black
                    uppercase
                    tracking-wider
                    text-blue-100
                    backdrop-blur
                  "
                >

                  <Sparkles size={13} />

                  Módulo docente

                </div>


                <h1
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  Consolidación
                </h1>


                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-relaxed
                    text-blue-100
                    sm:text-base
                  "
                >

                  Reúne automáticamente los resultados de{" "}

                  <span
                    className="
                      font-black
                      text-white
                    "
                  >
                    EN1, EN2 y EN3
                  </span>

                  {" "}por alumno en una sola tabla.

                </p>

              </div>

            </div>


            {/* TIEMPO */}

            <div
              className="
                flex
                w-full
                items-center
                gap-3
                sm:w-auto
              "
            >

              <div
                className="
                  flex
                  min-w-[150px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-3
                  backdrop-blur-md
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                  "
                >

                  <Clock3 size={19} />

                </div>


                <div>

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-blue-200
                    "
                  >
                    Tiempo
                  </p>

                  <p
                    className="
                      mt-0.5
                      font-mono
                      text-xl
                      font-black
                    "
                  >
                    {formatearTiempo(
                      tiempoTranscurrido
                    )}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            CARPETAS
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-white
            shadow-[0_10px_40px_rgba(15,23,42,0.05)]
          "
        >

          {/* HEADER */}

          <div
            className="
              border-b
              border-slate-100
              bg-gradient-to-r
              from-slate-50
              to-white
              px-6
              py-6
              sm:px-8
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
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-[#1D3681]
                "
              >

                <FolderOpen size={21} />

              </div>


              <div>

                <h2
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-slate-800
                  "
                >
                  Carpetas de entregables
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Ingresa las carpetas que deseas consolidar.
                </p>

              </div>

            </div>

          </div>


          <div className="p-6 sm:p-8">

            {/* CARPETAS */}

            <div
              className="
                grid
                gap-5
                md:grid-cols-3
              "
            >

              {["EN1", "EN2", "EN3"].map(
                (entregable, index) => {

                  const colores = [
                    {
                      fondo: "bg-blue-50",
                      icono: "bg-blue-100 text-blue-700",
                      borde: "focus-within:border-blue-300",
                      ring: "focus-within:ring-blue-500/10",
                    },
                    {
                      fondo: "bg-violet-50",
                      icono: "bg-violet-100 text-violet-700",
                      borde: "focus-within:border-violet-300",
                      ring: "focus-within:ring-violet-500/10",
                    },
                    {
                      fondo: "bg-amber-50",
                      icono: "bg-amber-100 text-amber-700",
                      borde: "focus-within:border-amber-300",
                      ring: "focus-within:ring-amber-500/10",
                    },
                  ];

                  const color =
                    colores[index];

                  return (

                    <div
                      key={entregable}
                      className={`
                        group
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50/60
                        p-5
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-slate-300
                        hover:shadow-md
                        ${color.borde}
                        ${color.ring}
                        focus-within:bg-white
                        focus-within:ring-4
                      `}
                    >

                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
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
                            className={`
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              ${color.icono}
                            `}
                          >

                            <FolderOpen size={18} />

                          </div>


                          <div>

                            <p
                              className="
                                text-sm
                                font-black
                                text-slate-800
                              "
                            >
                              {entregable}
                            </p>

                            <p
                              className="
                                text-[11px]
                                text-slate-400
                              "
                            >
                              Entregable
                            </p>

                          </div>

                        </div>


                        {carpetas[entregable] && (

                          <button
                            type="button"
                            onClick={() =>
                              limpiarCarpeta(
                                entregable
                              )
                            }
                            title={`Limpiar ${entregable}`}
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-400
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                            "
                          >

                            <Trash2 size={15} />

                          </button>

                        )}

                      </div>


                      <input
                        type="text"
                        value={
                          carpetas[entregable]
                        }
                        onChange={(e) =>
                          cambiarCarpeta(
                            entregable,
                            e.target.value
                          )
                        }
                        placeholder={
                          `Carpeta ${entregable}`
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-slate-700
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:border-transparent
                          focus:ring-0
                        "
                      />

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
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
                "
              >

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-100
                    text-red-600
                  "
                >
                  !
                </div>


                <div>

                  <p
                    className="
                      text-sm
                      font-black
                      text-red-700
                    "
                  >
                    No se puede continuar
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      text-red-600
                    "
                  >
                    {error}
                  </p>

                </div>

              </div>

            )}


            {/* BOTÓN */}

            <button
              type="button"
              onClick={
                ejecutarConsolidacion
              }
              disabled={cargando}
              className="
                group
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-[#1D3681]
                to-blue-700
                px-6
                py-4
                text-sm
                font-black
                text-white
                shadow-lg
                shadow-blue-900/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:from-[#162b6b]
                hover:to-blue-800
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
              "
            >

              {cargando ? (

                <>

                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Procesando consolidación...

                </>

              ) : (

                <>

                  <Sparkles
                    size={19}
                    className="
                      transition-transform
                      duration-200
                      group-hover:rotate-12
                    "
                  />

                  Realizar consolidación

                </>

              )}

            </button>

          </div>

        </div>


        {/* =================================================
            PROCESO
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-white
            shadow-[0_10px_40px_rgba(15,23,42,0.05)]
          "
        >

          <div
            className="
              border-b
              border-slate-100
              px-6
              py-6
              sm:px-8
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

              <div>

                <h2
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-slate-800
                  "
                >
                  Estado del proceso
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Seguimiento de la consolidación.
                </p>

              </div>


              {cargando && (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1.5
                    text-xs
                    font-black
                    text-blue-700
                  "
                >

                  <span
                    className="
                      h-2
                      w-2
                      animate-pulse
                      rounded-full
                      bg-blue-600
                    "
                  />

                  En proceso

                </div>

              )}

              {!cargando && resultado && (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-xs
                    font-black
                    text-emerald-700
                  "
                >

                  <Check size={14} />

                  Completado

                </div>

              )}

            </div>

          </div>


          <div className="p-6 sm:p-8">

            <div className="relative space-y-3">

              {etapas.map(
                (etapa, index) => {

                  const estado =
                    estadoEtapa(
                      etapa.codigo - 1
                    );

                  const tiene =
                    carpetas[
                      `EN${etapa.codigo}`
                    ]?.trim();

                  const iconClasses = {
                    blue:
                      "bg-blue-100 text-blue-700",
                    violet:
                      "bg-violet-100 text-violet-700",
                    amber:
                      "bg-amber-100 text-amber-700",
                  };

                  return (

                    <div
                      key={etapa.codigo}
                      className={`
                        relative
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        p-4
                        transition-all
                        duration-300
                        ${
                          !tiene
                            ? "border-slate-200 bg-slate-50 opacity-50"
                            : estado === "completa"
                            ? "border-emerald-200 bg-emerald-50/70"
                            : estado === "activa"
                            ? "border-blue-200 bg-blue-50 shadow-sm"
                            : "border-slate-200 bg-slate-50"
                        }
                      `}
                    >

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          text-xs
                          font-black
                          ${
                            !tiene
                              ? "bg-slate-200 text-slate-400"
                              : estado === "completa"
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                              : estado === "activa"
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                              : iconClasses[
                                  etapa.color
                                ]
                          }
                        `}
                      >

                        {!tiene
                          ? etapa.codigo
                          : estado === "completa"
                          ? <Check size={19} />
                          : <FolderOpen size={18} />}

                      </div>


                      <div className="min-w-0 flex-1">

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
                              font-black
                              text-slate-800
                            "
                          >
                            {etapa.titulo}
                          </p>


                          {tiene && estado === "activa" && (

                            <span
                              className="
                                rounded-full
                                bg-blue-100
                                px-2
                                py-0.5
                                text-[9px]
                                font-black
                                uppercase
                                tracking-wide
                                text-blue-700
                              "
                            >
                              Procesando
                            </span>

                          )}

                        </div>


                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-slate-500
                          "
                        >

                          {!tiene
                            ? "No seleccionado"
                            : estado === "completa"
                            ? "Procesamiento completado"
                            : estado === "activa"
                            ? "Procesando documentos..."
                            : etapa.descripcion}

                        </p>

                      </div>


                      {tiene &&
                        estado === "activa" && (

                          <Loader2
                            size={20}
                            className="
                              shrink-0
                              animate-spin
                              text-blue-600
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
                  duration-300
                  ${
                    estadoEtapa(3) === "completa"
                      ? "border-emerald-200 bg-emerald-50/70"
                      : estadoEtapa(3) === "activa"
                      ? "border-blue-200 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-slate-50"
                  }
                `}
              >

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${
                      estadoEtapa(3) === "completa"
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : estadoEtapa(3) === "activa"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "bg-slate-200 text-slate-500"
                    }
                  `}
                >

                  {estadoEtapa(3) ===
                  "completa" ? (
                    <Check size={20} />
                  ) : (
                    <FileSearch size={20} />
                  )}

                </div>


                <div className="min-w-0 flex-1">

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
                        font-black
                        text-slate-800
                      "
                    >
                      Consolidación
                    </p>


                    {estadoEtapa(3) === "activa" && (

                      <span
                        className="
                          rounded-full
                          bg-blue-100
                          px-2
                          py-0.5
                          text-[9px]
                          font-black
                          uppercase
                          tracking-wide
                          text-blue-700
                        "
                      >
                        Analizando
                      </span>

                    )}

                  </div>


                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-500
                    "
                  >

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
                    size={20}
                    className="
                      shrink-0
                      animate-spin
                      text-blue-600
                    "
                  />

                )}

              </div>

            </div>


            {/* MENSAJE DE PROCESO */}

            {cargando && (

              <div
                className="
                  mt-6
                  overflow-hidden
                  rounded-2xl
                  border
                  border-blue-100
                  bg-gradient-to-r
                  from-blue-50
                  to-indigo-50
                  p-5
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
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-600
                      text-white
                    "
                  >

                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                  </div>


                  <div>

                    <p
                      className="
                        font-black
                        text-blue-900
                      "
                    >
                      {paso}
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-relaxed
                        text-blue-600
                      "
                    >
                      {mensajeProceso}
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            RESULTADOS
        ================================================= */}

        {resultado && (

          <div
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-slate-200
              bg-white
              shadow-[0_10px_40px_rgba(15,23,42,0.06)]
            "
          >

            {/* HEADER RESULTADOS */}

            <div
              className="
                relative
                overflow-hidden
                border-b
                border-slate-100
                bg-gradient-to-r
                from-slate-50
                via-white
                to-blue-50/50
                px-6
                py-6
                sm:px-8
              "
            >

              <div
                className="
                  absolute
                  -right-16
                  -top-20
                  h-52
                  w-52
                  rounded-full
                  bg-blue-100/40
                  blur-3xl
                "
              />


              <div
                className="
                  relative
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
                      bg-[#1D3681]
                      text-white
                      shadow-lg
                      shadow-blue-900/20
                    "
                  >

                    <Users size={25} />

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
                          text-xl
                          font-black
                          tracking-tight
                          text-slate-800
                        "
                      >
                        Resultados consolidados
                      </h2>


                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-emerald-100
                          px-2.5
                          py-1
                          text-[10px]
                          font-black
                          uppercase
                          tracking-wide
                          text-emerald-700
                        "
                      >

                        <Check size={11} />

                        Completado

                      </span>

                    </div>


                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                      "
                    >

                      Se encontraron{" "}

                      <span
                        className="
                          font-black
                          text-slate-700
                        "
                      >
                        {resultado.totalAlumnos ??
                          datosConsolidados.length ??
                          0}
                      </span>

                      {" "}alumnos.

                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-blue-100
                      bg-blue-50
                      px-5
                      py-3
                    "
                  >

                    <p
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wider
                        text-blue-500
                      "
                    >
                      Total
                    </p>


                    <p
                      className="
                        mt-0.5
                        text-2xl
                        font-black
                        text-[#1D3681]
                      "
                    >
                      {resultado.totalAlumnos ??
                        datosConsolidados.length ??
                        0}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* CONTENIDO */}

            <div className="p-5 sm:p-8">

              {/* FILTROS */}

              <div
                className="
                  mb-6
                  flex
                  flex-col
                  gap-3
                  md:flex-row
                "
              >

                <div
                  className="
                    relative
                    flex-1
                  "
                >

                  <Search
                    size={19}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />


                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) =>
                      cambiarBusqueda(
                        e.target.value
                      )
                    }
                    placeholder="
                      Buscar alumno, semestre o informe...
                    "
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      font-medium
                      text-slate-700
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-blue-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />

                </div>


                <select
                  value={
                    elementosPorPagina
                  }
                  onChange={(e) =>
                    cambiarElementosPorPagina(
                      e.target.value
                    )
                  }
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-slate-600
                    outline-none
                    transition
                    hover:border-slate-300
                    focus:border-blue-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                >

                  <option value="10">
                    10 por página
                  </option>

                  <option value="20">
                    20 por página
                  </option>

                  <option value="50">
                    50 por página
                  </option>

                </select>

              </div>


              {/* TABLA */}

              {resultadosFiltrados.length > 0 ? (

                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                  "
                >

                  <div className="overflow-x-auto">

                    <table
                      className="
                        w-full
                        min-w-[720px]
                        text-sm
                      "
                    >

                      <thead>

                        <tr
                          className="
                            bg-[#1D3681]
                            text-left
                            text-[11px]
                            uppercase
                            tracking-wider
                            text-white
                          "
                        >

                          <th
                            className="
                              px-5
                              py-4
                              font-black
                            "
                          >
                            Alumno
                          </th>

                          <th
                            className="
                              px-5
                              py-4
                              text-center
                              font-black
                            "
                          >
                            EN1
                          </th>

                          <th
                            className="
                              px-5
                              py-4
                              text-center
                              font-black
                            "
                          >
                            EN2
                          </th>

                          <th
                            className="
                              px-5
                              py-4
                              text-center
                              font-black
                            "
                          >
                            EN3
                          </th>

                          <th
                            className="
                              px-5
                              py-4
                              text-center
                              font-black
                            "
                          >
                            Total
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {resultadosPagina.map(
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

                              {/* ALUMNO */}

                              <td
                                className="
                                  px-5
                                  py-4
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
                                      h-9
                                      w-9
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-xl
                                      bg-blue-100
                                      text-xs
                                      font-black
                                      text-[#1D3681]
                                    "
                                  >

                                    {String(
                                      alumno.alumno ||
                                      "A"
                                    )
                                      .charAt(0)
                                      .toUpperCase()}

                                  </div>


                                  <div>

                                    <p
                                      className="
                                        font-bold
                                        text-slate-700
                                      "
                                    >
                                      {alumno.alumno ||
                                        "--"}
                                    </p>


                                    {alumno.semestre && (

                                      <p
                                        className="
                                          mt-0.5
                                          text-xs
                                          text-slate-400
                                        "
                                      >
                                        {alumno.semestre}
                                      </p>

                                    )}

                                  </div>

                                </div>

                              </td>


                              {/* EN1 */}

                              <td
                                className="
                                  px-5
                                  py-4
                                  text-center
                                "
                              >

                                <span
                                  className="
                                    inline-flex
                                    min-w-[52px]
                                    justify-center
                                    rounded-lg
                                    bg-blue-50
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-black
                                    text-blue-700
                                  "
                                >
                                  {alumno.EN1 ??
                                    "--"}
                                </span>

                              </td>


                              {/* EN2 */}

                              <td
                                className="
                                  px-5
                                  py-4
                                  text-center
                                "
                              >

                                <span
                                  className="
                                    inline-flex
                                    min-w-[52px]
                                    justify-center
                                    rounded-lg
                                    bg-violet-50
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-black
                                    text-violet-700
                                  "
                                >
                                  {alumno.EN2 ??
                                    "--"}
                                </span>

                              </td>


                              {/* EN3 */}

                              <td
                                className="
                                  px-5
                                  py-4
                                  text-center
                                "
                              >

                                <span
                                  className="
                                    inline-flex
                                    min-w-[52px]
                                    justify-center
                                    rounded-lg
                                    bg-amber-50
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-black
                                    text-amber-700
                                  "
                                >
                                  {alumno.EN3 ??
                                    "--"}
                                </span>

                              </td>


                              {/* TOTAL */}

                              <td
                                className="
                                  px-5
                                  py-4
                                  text-center
                                "
                              >

                                <span
                                  className="
                                    inline-flex
                                    min-w-[62px]
                                    justify-center
                                    rounded-xl
                                    bg-emerald-50
                                    px-3
                                    py-1.5
                                    text-sm
                                    font-black
                                    text-emerald-700
                                  "
                                >
                                  {alumno.total ??
                                    "--"}
                                </span>

                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              ) : (

                /* ESTADO VACÍO */

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    px-6
                    py-14
                    text-center
                  "
                >

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-200
                      text-slate-400
                    "
                  >

                    <Search size={27} />

                  </div>


                  <h3
                    className="
                      mt-4
                      font-black
                      text-slate-700
                    "
                  >
                    No se encontraron resultados
                  </h3>


                  <p
                    className="
                      mt-1
                      max-w-sm
                      text-sm
                      text-slate-400
                    "
                  >
                    Intenta cambiar el término de búsqueda
                    o revisa los datos consolidados.
                  </p>

                </div>

              )}


              {/* PAGINACIÓN */}

              {resultadosFiltrados.length > 0 && (

                <div
                  className="
                    mt-6
                    flex
                    flex-col
                    gap-4
                    border-t
                    border-slate-100
                    pt-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <p
                    className="
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >

                    Mostrando{" "}

                    <span
                      className="
                        font-black
                        text-slate-700
                      "
                    >
                      {indiceInicio + 1}
                    </span>

                    {" "}-{" "}

                    <span
                      className="
                        font-black
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
                        font-black
                        text-slate-700
                      "
                    >
                      {resultadosFiltrados.length}
                    </span>

                  </p>


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <button
                      type="button"
                      disabled={
                        paginaActual === 1
                      }
                      onClick={() =>
                        setPaginaActual(
                          (p) =>
                            Math.max(
                              1,
                              p - 1
                            )
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-slate-600
                        shadow-sm
                        transition
                        hover:bg-slate-50
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >

                      <ChevronLeft size={16} />

                      Anterior

                    </button>


                    <div
                      className="
                        flex
                        min-w-[80px]
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#1D3681]
                        px-4
                        py-2.5
                        text-sm
                        font-black
                        text-white
                        shadow-sm
                      "
                    >

                      {paginaActual}

                      <span
                        className="
                          mx-1
                          text-blue-200
                        "
                      >
                        /
                      </span>

                      {totalPaginas}

                    </div>


                    <button
                      type="button"
                      disabled={
                        paginaActual ===
                        totalPaginas
                      }
                      onClick={() =>
                        setPaginaActual(
                          (p) =>
                            Math.min(
                              totalPaginas,
                              p + 1
                            )
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-slate-600
                        shadow-sm
                        transition
                        hover:bg-slate-50
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >

                      Siguiente

                      <ChevronRight size={16} />

                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        )}

      </div>

    </section>

  );

}
