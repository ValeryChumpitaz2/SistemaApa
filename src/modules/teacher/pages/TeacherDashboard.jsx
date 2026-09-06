import {
  FolderSearch,
  ClipboardList,
  BarChart3,
  FileBarChart,
  GraduationCap,
  History,
  TrendingUp,
  FileWarning,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import TeacherSidebar
  from "../components/TeacherSidebar";

import FolderAnalyzer
  from "../components/FolderAnalyzer";

import ResultsTable
  from "../components/ResultsTable";

import DetailModal
  from "../components/DetailModal";

import GeneralReportButton
  from "../components/GeneralReportButton";

import DetailReportButton
  from "../components/DetailReportButton";

import RankingTable
  from "../components/RankingTable";

import MaintenanceModal
  from "../components/MaintenanceModal";

import TeacherSettings
  from "../components/TeacherSettings";

import TeacherAnalytics
  from "../components/TeacherAnalytics";

import PerformanceChart
  from "../components/PerformanceChart";

import ConsolidacionPage
  from "./ConsolidacionPage";

import HistorialConsolidacionPage
  from "./HistorialConsolidacionPage";

import { useAuth } from "../../../auth/AuthContext";


// =====================================================
// LOCAL STORAGE
// =====================================================

const RESULTADOS_STORAGE_KEY =
  "resultadosDocente";

const HISTORIAL_STORAGE_KEY =
  "historialConsolidaciones";

const NO_VALIDOS_STORAGE_KEY =
  "documentosInvalidos";


// =====================================================
// HELPERS
// =====================================================

function leerStorage(
  key,
  fallback = []
) {
  try {
    const data =
      localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    const parsed =
      JSON.parse(data);

    return Array.isArray(parsed)
      ? parsed
      : fallback;

  } catch (error) {

    console.error(
      `Error leyendo ${key}:`,
      error
    );

    return fallback;
  }
}


// =====================================================
// HEADER DE PÁGINA
// =====================================================

function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <header className="mb-8">

      {eyebrow && (
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#1D3681]
            mb-2
          "
        >
          {eyebrow}
        </p>
      )}

      <h1
        className="
          text-2xl
          lg:text-3xl
          font-black
          tracking-tight
          text-slate-900
          dark:text-white
        "
      >
        {title}
      </h1>

      {description && (
        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            lg:text-base
            text-slate-500
            dark:text-slate-400
          "
        >
          {description}
        </p>
      )}

    </header>
  );
}


// =====================================================
// TARJETA DE ESTADÍSTICA
// =====================================================

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
}) {

  const colors = {

    blue: {
      icon:
        "bg-blue-50 text-[#1D3681] dark:bg-blue-900/30 dark:text-blue-300",
      value:
        "text-[#1D3681] dark:text-blue-300",
    },

    emerald: {
      icon:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
      value:
        "text-emerald-600 dark:text-emerald-300",
    },

    violet: {
      icon:
        "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",
      value:
        "text-violet-600 dark:text-violet-300",
    },

    red: {
      icon:
        "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300",
      value:
        "text-red-500 dark:text-red-300",
    },

  };

  const theme =
    colors[color] || colors.blue;

  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200/80
        dark:border-slate-800
        rounded-2xl
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-slate-400
              dark:text-slate-500
            "
          >
            {title}
          </p>

          <p
            className={`
              mt-2
              text-3xl
              font-black
              ${theme.value}
            `}
          >
            {value}
          </p>

          {description && (
            <p
              className="
                mt-1
                text-xs
                font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              {description}
            </p>
          )}

        </div>

        <div
          className={`
            w-11
            h-11
            shrink-0
            rounded-xl
            flex
            items-center
            justify-center
            ${theme.icon}
          `}
        >
          <Icon
            size={21}
            strokeWidth={2.2}
          />
        </div>

      </div>

    </div>
  );
}


// =====================================================
// ACCIÓN RÁPIDA
// =====================================================

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        text-left
        bg-white
        dark:bg-slate-900
        border
        border-slate-200/80
        dark:border-slate-800
        rounded-2xl
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        hover:border-blue-200
        dark:hover:border-blue-900
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            w-11
            h-11
            shrink-0
            rounded-xl
            bg-[#EEF3FF]
            dark:bg-blue-900/30
            text-[#1D3681]
            dark:text-blue-300
            flex
            items-center
            justify-center
            transition-transform
            duration-200
            group-hover:scale-105
          "
        >
          <Icon
            size={21}
            strokeWidth={2.2}
          />
        </div>

        <div className="min-w-0 flex-1">

          <p
            className="
              font-bold
              text-slate-800
              dark:text-white
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
              truncate
            "
          >
            {description}
          </p>

        </div>

        <ArrowRight
          size={18}
          className="
            shrink-0
            text-slate-300
            transition-all
            duration-200
            group-hover:text-[#1D3681]
            group-hover:translate-x-1
          "
        />

      </div>

    </button>
  );
}


// =====================================================
// DASHBOARD PRINCIPAL
// =====================================================

export default function TeacherDashboard() {

  const {
    user,
  } = useAuth();


  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    resultados,
    setResultados,
  ] = useState([]);


  const [
    noValidos,
    setNoValidos,
  ] = useState([]);


  const [
    historialConsolidaciones,
    setHistorialConsolidaciones,
  ] = useState([]);


  const [
    selected,
    setSelected,
  ] = useState(null);


  const [
    active,
    setActive,
  ] = useState("dashboard");


  const [
    maintenance,
    setMaintenance,
  ] = useState(false);


  // =====================================================
  // CARGAR DATOS
  // =====================================================

  useEffect(() => {

    setResultados(
      leerStorage(
        RESULTADOS_STORAGE_KEY
      )
    );

    setNoValidos(
      leerStorage(
        NO_VALIDOS_STORAGE_KEY
      )
    );

    setHistorialConsolidaciones(
      leerStorage(
        HISTORIAL_STORAGE_KEY
      )
    );

  }, []);


  // =====================================================
  // ACTUALIZAR RESULTADOS
  // =====================================================

  function actualizarResultados(
    data
  ) {

    const nuevosResultados =
      Array.isArray(data)
        ? data
        : [];

    setResultados(
      nuevosResultados
    );

    localStorage.setItem(
      RESULTADOS_STORAGE_KEY,
      JSON.stringify(
        nuevosResultados
      )
    );
  }


  // =====================================================
  // ACTUALIZAR NO VÁLIDOS
  // =====================================================

  function actualizarNoValidos(
    data
  ) {

    const nuevosNoValidos =
      Array.isArray(data)
        ? data
        : [];

    setNoValidos(
      nuevosNoValidos
    );

    localStorage.setItem(
      NO_VALIDOS_STORAGE_KEY,
      JSON.stringify(
        nuevosNoValidos
      )
    );
  }


  // =====================================================
  // GUARDAR CONSOLIDACIÓN
  // =====================================================

  function guardarConsolidacion(
    consolidacion
  ) {

    const ahora =
      new Date();

    const nuevaConsolidacion = {

      id:
        Date.now(),

      fecha:
        ahora.toLocaleDateString(
          "es-PE",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        ),

      hora:
        ahora.toLocaleTimeString(
          "es-PE",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

      ...consolidacion,
    };


    const nuevoHistorial = [
      nuevaConsolidacion,
      ...historialConsolidaciones,
    ];


    setHistorialConsolidaciones(
      nuevoHistorial
    );


    localStorage.setItem(
      HISTORIAL_STORAGE_KEY,
      JSON.stringify(
        nuevoHistorial
      )
    );


    window.dispatchEvent(
      new Event(
        "historialConsolidacionActualizado"
      )
    );
  }


  // =====================================================
  // DASHBOARD HOME
  // =====================================================

  function renderDashboard() {

    const totalResultados =
      resultados.length;

    const totalNoValidos =
      noValidos.length;

    const totalEvaluados =
      Math.max(
        totalResultados - totalNoValidos,
        0
      );


    return (
      <section>

        {/* HEADER */}

        <PageHeader
          eyebrow="Panel docente"
          title={
            `Buenos días, ${
              user?.usuario ||
              "Docente"
            } 👋`
          }
          description="
            Aquí tienes un resumen general
            del estado de tus evaluaciones
            académicas.
          "
        />


        {/* HERO */}

        <div
          className="
            relative
            overflow-hidden
            mb-8
            rounded-3xl
            bg-[#1D3681]
            p-6
            lg:p-8
            text-white
            shadow-lg
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              absolute
              -right-16
              -top-20
              w-64
              h-64
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              right-20
              -bottom-24
              w-48
              h-48
              rounded-full
              bg-blue-300/10
            "
          />

          <div
            className="
              relative
              z-10
              max-w-2xl
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-white/10
                border
                border-white/10
                text-xs
                font-bold
                mb-4
              "
            >
              <Sparkles size={14} />

              Panel académico
            </div>


            <h2
              className="
                text-2xl
                lg:text-3xl
                font-black
                tracking-tight
              "
            >
              Gestiona tus evaluaciones
              desde un solo lugar.
            </h2>


            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-blue-100
              "
            >
              Analiza documentos, revisa
              resultados, consulta el
              rendimiento académico y genera
              reportes de tus evaluaciones.
            </p>


            <button
              type="button"
              onClick={() =>
                setActive("analyzer")
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                bg-white
                text-[#1D3681]
                px-5
                py-3
                rounded-xl
                text-sm
                font-bold
                shadow-sm
                transition-all
                duration-200
                hover:bg-blue-50
                hover:-translate-y-0.5
              "
            >
              <FolderSearch size={18} />

              Analizar carpeta

              <ArrowRight size={16} />

            </button>

          </div>

        </div>


        {/* ESTADÍSTICAS */}

        <div className="mb-8">

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >
                Resumen académico
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Estado actual de tus evaluaciones
              </p>

            </div>

          </div>


          <div
            className="
              grid
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
            "
          >

            <StatCard
              title="Documentos"
              value={
                totalResultados
              }
              description="Resultados registrados"
              icon={
                ClipboardList
              }
              color="blue"
            />


            <StatCard
              title="Evaluados"
              value={
                totalEvaluados
              }
              description="Documentos procesados"
              icon={
                BarChart3
              }
              color="emerald"
            />


            <StatCard
              title="Consolidaciones"
              value={
                historialConsolidaciones.length
              }
              description="Procesos registrados"
              icon={
                GraduationCap
              }
              color="violet"
            />


            <StatCard
              title="No válidos"
              value={
                totalNoValidos
              }
              description="Documentos pendientes de revisión"
              icon={
                FileWarning
              }
              color="red"
            />

          </div>

        </div>


        {/* GRÁFICO */}

        <div className="mb-8">

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >
                Rendimiento académico
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Evolución de los resultados
                registrados.
              </p>

            </div>

          </div>


          <div
            className="
              bg-white
              dark:bg-slate-900
              border
              border-slate-200/80
              dark:border-slate-800
              rounded-2xl
              p-5
              lg:p-6
              shadow-sm
              overflow-hidden
            "
          >

            <PerformanceChart
              resultados={
                resultados
              }
            />

          </div>

        </div>


        {/* ACCIONES RÁPIDAS */}

        <div>

          <div className="mb-4">

            <h2
              className="
                text-lg
                font-black
                text-slate-900
                dark:text-white
              "
            >
              Acciones rápidas
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Accede rápidamente a las
              herramientas principales.
            </p>

          </div>


          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-4
            "
          >

            <QuickAction
              icon={
                FolderSearch
              }
              title="Analizar carpeta"
              description="
                Procesa documentos académicos
                automáticamente.
              "
              onClick={() =>
                setActive("analyzer")
              }
            />


            <QuickAction
              icon={
                TrendingUp
              }
              title="Ver analítica"
              description="
                Consulta gráficos y métricas
                académicas.
              "
              onClick={() =>
                setActive("analytics")
              }
            />


            <QuickAction
              icon={
                FileBarChart
              }
              title="Generar reportes"
              description="
                Crea informes académicos
                profesionales.
              "
              onClick={() =>
                setActive("reports")
              }
            />


            <QuickAction
              icon={
                ClipboardList
              }
              title="Ver resultados"
              description="
                Revisa las evaluaciones
                procesadas.
              "
              onClick={() =>
                setActive("results")
              }
            />


            <QuickAction
              icon={
                GraduationCap
              }
              title="Consolidación"
              description="
                Consolida los resultados
                académicos.
              "
              onClick={() =>
                setActive(
                  "consolidacion"
                )
              }
            />


            <QuickAction
              icon={
                History
              }
              title="Historial"
              description="
                Consulta consolidaciones
                anteriores.
              "
              onClick={() =>
                setActive(
                  "historial-consolidacion"
                )
              }
            />

          </div>

        </div>

      </section>
    );
  }


  // =====================================================
  // CONTENIDO
  // =====================================================

  function renderContenido() {

    switch (active) {

      // =================================================
      // DASHBOARD
      // =================================================

      case "dashboard":

        return renderDashboard();


      // =================================================
      // ANALIZADOR
      // =================================================

      case "analyzer":

        return (
          <section>

            <PageHeader
              eyebrow="Evaluación"
              title="Analizar carpeta"
              description="
                Analiza automáticamente los
                documentos académicos de una carpeta.
              "
            />

            <FolderAnalyzer
              setResultados={
                actualizarResultados
              }
              setNoValidos={
                actualizarNoValidos
              }
            />

          </section>
        );


      // =================================================
      // RESULTADOS
      // =================================================

      case "results":

        return (
          <section>

            <PageHeader
              eyebrow="Resultados"
              title="Resultados por carpeta"
              description="
                Consulta y revisa los resultados
                obtenidos durante el análisis.
              "
            />


            <div
              className="
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                p-5
                lg:p-7
                shadow-sm
              "
            >

              {resultados.length > 0 ? (

                <ResultsTable
                  resultados={
                    resultados
                  }
                  onSelect={
                    setSelected
                  }
                />

              ) : (

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    py-20
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-[#EEF3FF]
                      text-[#1D3681]
                      flex
                      items-center
                      justify-center
                      mb-5
                    "
                  >

                    <ClipboardList
                      size={30}
                    />

                  </div>


                  <h2
                    className="
                      text-lg
                      font-black
                      text-slate-800
                      dark:text-white
                    "
                  >
                    Aún no hay resultados
                  </h2>


                  <p
                    className="
                      mt-2
                      max-w-md
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Analiza una carpeta para
                    comenzar a visualizar las
                    evaluaciones académicas.
                  </p>


                  <button
                    type="button"
                    onClick={() =>
                      setActive(
                        "analyzer"
                      )
                    }
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      bg-[#1D3681]
                      hover:bg-[#172D6D]
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      text-sm
                      font-bold
                      transition-all
                    "
                  >
                    <FolderSearch
                      size={17}
                    />

                    Analizar carpeta

                  </button>

                </div>

              )}

            </div>

          </section>
        );


      // =================================================
      // ANALÍTICA
      // =================================================

      case "analytics":

        return (
          <section>

            <PageHeader
              eyebrow="Análisis"
              title="Analítica académica"
              description="
                Explora el rendimiento y las
                tendencias de las evaluaciones.
              "
            />

            <TeacherAnalytics
              resultados={
                resultados
              }
            />

          </section>
        );


      // =================================================
      // RANKING
      // =================================================

      case "ranking":

        return (
          <section>

            <PageHeader
              eyebrow="Análisis"
              title="Ranking académico"
              description="
                Consulta la posición y rendimiento
                de los resultados evaluados.
              "
            />


            <div
              className="
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                p-5
                lg:p-7
                shadow-sm
              "
            >

              <RankingTable
                resultados={
                  resultados
                }
              />

            </div>

          </section>
        );


      // =================================================
      // CONSOLIDACIÓN
      // =================================================

      case "consolidacion":

        return (
          <section>

            <PageHeader
              eyebrow="Consolidación"
              title="Consolidación"
              description="
                Consolida los resultados académicos
                de tus evaluaciones.
              "
            />


            <div
              className="
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                p-5
                lg:p-7
                shadow-sm
              "
            >

              <ConsolidacionPage
                onConsolidacionCompletada={
                  guardarConsolidacion
                }
              />

            </div>

          </section>
        );


      // =================================================
      // HISTORIAL
      // =================================================

      case "historial-consolidacion":

        return (
          <section>

            <PageHeader
              eyebrow="Consolidación"
              title="Historial de consolidación"
              description="
                Consulta los procesos de consolidación
                realizados anteriormente.
              "
            />


            <div
              className="
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                p-5
                lg:p-7
                shadow-sm
              "
            >

              <HistorialConsolidacionPage />

            </div>

          </section>
        );


      // =================================================
      // REPORTES
      // =================================================

      case "reports":

        return (
          <section>

            <PageHeader
              eyebrow="Documentación"
              title="Reportes académicos"
              description="
                Genera informes profesionales a partir
                de los resultados de evaluación.
              "
            />


            <div
              className="
                grid
                lg:grid-cols-2
                gap-5
              "
            >

              {/* REPORTE GENERAL */}

              <div
                className="
                  bg-white
                  dark:bg-slate-900
                  rounded-2xl
                  border
                  border-slate-200/80
                  dark:border-slate-800
                  p-6
                  shadow-sm
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-emerald-50
                    dark:bg-emerald-900/30
                    text-emerald-600
                    dark:text-emerald-300
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                >

                  <FileBarChart
                    size={21}
                  />

                </div>


                <h2
                  className="
                    text-lg
                    font-black
                    text-slate-800
                    dark:text-white
                  "
                >
                  Reporte general
                </h2>


                <p
                  className="
                    mt-2
                    mb-6
                    text-sm
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Obtén un resumen completo
                  del rendimiento académico
                  registrado.
                </p>


                <GeneralReportButton
                  resultados={
                    resultados
                  }
                />

              </div>


              {/* REPORTE DETALLADO */}

              <div
                className="
                  bg-white
                  dark:bg-slate-900
                  rounded-2xl
                  border
                  border-slate-200/80
                  dark:border-slate-800
                  p-6
                  shadow-sm
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-violet-50
                    dark:bg-violet-900/30
                    text-violet-600
                    dark:text-violet-300
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                >

                  <ClipboardList
                    size={21}
                  />

                </div>


                <h2
                  className="
                    text-lg
                    font-black
                    text-slate-800
                    dark:text-white
                  "
                >
                  Reporte detallado
                </h2>


                <p
                  className="
                    mt-2
                    mb-6
                    text-sm
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Consulta un análisis
                  individual y detallado
                  de cada evaluación.
                </p>


                <DetailReportButton
                  resultados={
                    resultados
                  }
                />

              </div>

            </div>

          </section>
        );


      // =================================================
      // COMUNICACIONES
      // =================================================

      case "communications":

        return (
          <section>

            <PageHeader
              eyebrow="Sistema"
              title="Centro de comunicaciones"
              description="
                Gestiona las comunicaciones y
                notificaciones del sistema.
              "
            />


            <div
              className="
                bg-white
                dark:bg-slate-900
                rounded-2xl
                border
                border-slate-200/80
                dark:border-slate-800
                p-6
                shadow-sm
              "
            >

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-5
                "
              >

                <div>

                  <h2
                    className="
                      text-lg
                      font-black
                      text-slate-800
                      dark:text-white
                    "
                  >
                    Estado del módulo
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Este módulo se encuentra
                    actualmente en mantenimiento.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setMaintenance(
                      true
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-[#1D3681]
                    hover:bg-[#172D6D]
                    text-white
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-bold
                    transition-all
                  "
                >
                  Ver estado
                </button>

              </div>

            </div>


            <MaintenanceModal
              open={
                maintenance
              }
              onClose={() =>
                setMaintenance(
                  false
                )
              }
            />

          </section>
        );


      // =================================================
      // CONFIGURACIÓN
      // =================================================

      case "settings":

        return (
          <section>

            <PageHeader
              eyebrow="Sistema"
              title="Configuración"
              description="
                Personaliza las preferencias de
                tu panel docente.
              "
            />

            <TeacherSettings />

          </section>
        );


      // =================================================
      // DEFAULT
      // =================================================

      default:

        return renderDashboard();

    }

  }


  // =====================================================
  // RENDER PRINCIPAL
  // =====================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#F6F8FC]
        dark:bg-slate-950
      "
    >

      {/* SIDEBAR */}

      <TeacherSidebar
        active={
          active
        }
        setActive={
          setActive
        }
      />


      {/* CONTENIDO */}

      <main
        className="
          min-h-screen
          xl:ml-64
        "
      >

        <div
          className="
            max-w-[1600px]
            mx-auto
            p-5
            sm:p-6
            lg:p-8
          "
        >

          {renderContenido()}

        </div>

      </main>


      {/* MODAL DETALLE */}

      {selected && (

        <DetailModal
          analysis={
            selected
          }
          onClose={() =>
            setSelected(
              null
            )
          }
        />

      )}

    </div>
  );
}
