import React from "react";

import {
  ArrowLeft,
  BarChart3,
  Users,
  GraduationCap,
  BookOpen,
  LogIn,
  FileText,
  TrendingUp,
  Clock3,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


// =====================================================
// PÁGINA REPORTES
// =====================================================

const Reportes = () => {

  const navigate = useNavigate();


  // ===================================================
  // REPORTES DISPONIBLES
  // ===================================================

  const reportes = [

    {
      titulo: "Estudiantes",
      descripcion:
        "Consulta información, actividad y registros de los estudiantes.",
      icono: Users,
      color: "indigo",
      estado: "Disponible",
    },

    {
      titulo: "Cursos",
      descripcion:
        "Visualiza las unidades didácticas organizadas por semestre.",
      icono: BookOpen,
      color: "emerald",
      estado: "Disponible",
    },

    {
      titulo: "Docentes",
      descripcion:
        "Consulta docentes y las unidades didácticas que tienen asignadas.",
      icono: GraduationCap,
      color: "violet",
      estado: "Disponible",
    },

    {
      titulo: "Accesos",
      descripcion:
        "Revisa la actividad y los accesos registrados en el sistema.",
      icono: LogIn,
      color: "amber",
      estado: "Disponible",
    },

    {
      titulo: "Rendimiento académico",
      descripcion:
        "Analiza información relacionada con el desempeño académico.",
      icono: TrendingUp,
      color: "rose",
      estado: "Próximamente",
    },

    {
      titulo: "Reportes generales",
      descripcion:
        "Genera reportes administrativos consolidados del sistema.",
      icono: FileText,
      color: "sky",
      estado: "Próximamente",
    },

  ];


  // ===================================================
  // COLORES
  // ===================================================

  const colores = {

    indigo: {
      fondo:
        "bg-indigo-50 dark:bg-indigo-950/30",
      icono:
        "text-indigo-600 dark:text-indigo-400",
      borde:
        "border-indigo-100 dark:border-indigo-900/50",
    },

    emerald: {
      fondo:
        "bg-emerald-50 dark:bg-emerald-950/30",
      icono:
        "text-emerald-600 dark:text-emerald-400",
      borde:
        "border-emerald-100 dark:border-emerald-900/50",
    },

    violet: {
      fondo:
        "bg-violet-50 dark:bg-violet-950/30",
      icono:
        "text-violet-600 dark:text-violet-400",
      borde:
        "border-violet-100 dark:border-violet-900/50",
    },

    amber: {
      fondo:
        "bg-amber-50 dark:bg-amber-950/30",
      icono:
        "text-amber-600 dark:text-amber-400",
      borde:
        "border-amber-100 dark:border-amber-900/50",
    },

    rose: {
      fondo:
        "bg-rose-50 dark:bg-rose-950/30",
      icono:
        "text-rose-600 dark:text-rose-400",
      borde:
        "border-rose-100 dark:border-rose-900/50",
    },

    sky: {
      fondo:
        "bg-sky-50 dark:bg-sky-950/30",
      icono:
        "text-sky-600 dark:text-sky-400",
      borde:
        "border-sky-100 dark:border-sky-900/50",
    },

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section
      className="
        min-h-[calc(100vh-5rem)]
        w-full
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="mb-8">

        {/* VOLVER */}

        <button
          type="button"
          onClick={() =>
            navigate("/admin/dashboard")
          }
          className="
            group
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-lg
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:text-white
          "
        >

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              transition
              group-hover:-translate-x-0.5
              group-hover:border-slate-300
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <ArrowLeft size={16} />
          </span>

          Volver al dashboard

        </button>


        {/* TITULO */}

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-100
                bg-indigo-50
                px-3
                py-1.5
                text-[11px]
                font-black
                uppercase
                tracking-[0.12em]
                text-indigo-600
                dark:border-indigo-900/50
                dark:bg-indigo-950/30
                dark:text-indigo-400
              "
            >

              <Sparkles size={13} />

              Administración

            </div>


            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
                dark:text-white
              "
            >
              Reportes
            </h1>


            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Consulta y analiza la información
              académica y administrativa del sistema.
            </p>

          </div>


          {/* ICONO PRINCIPAL */}

          <div
            className="
              hidden
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-indigo-50
              text-indigo-600
              lg:flex
              dark:bg-indigo-950/30
              dark:text-indigo-400
            "
          >

            <BarChart3 size={30} />

          </div>

        </div>

      </header>


      {/* =================================================
          ESTADÍSTICAS
      ================================================= */}

      <div
        className="
          mb-7
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-3
        "
      >

        <StatCard
          icon={<FileText size={21} />}
          label="Reportes"
          value={reportes.length}
          description="Módulos disponibles"
          color="indigo"
        />


        <StatCard
          icon={<BarChart3 size={21} />}
          label="Disponibles"
          value={
            reportes.filter(
              (reporte) =>
                reporte.estado ===
                "Disponible"
            ).length
          }
          description="Listos para consultar"
          color="emerald"
        />


        <StatCard
          icon={<Clock3 size={21} />}
          label="Próximamente"
          value={
            reportes.filter(
              (reporte) =>
                reporte.estado ===
                "Próximamente"
            ).length
          }
          description="En desarrollo"
          color="amber"
        />

      </div>


      {/* =================================================
          TITULO SECCIÓN
      ================================================= */}

      <div className="mb-4">

        <h2
          className="
            text-lg
            font-black
            text-slate-900
            dark:text-white
          "
        >
          Centro de reportes
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Selecciona el módulo que deseas consultar.
        </p>

      </div>


      {/* =================================================
          TARJETAS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {reportes.map(
          (reporte) => {

            const Icono =
              reporte.icono;

            const color =
              colores[
                reporte.color
              ];


            const disponible =
              reporte.estado ===
              "Disponible";


            return (

              <button
                key={
                  reporte.titulo
                }
                type="button"
                disabled={!disponible}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  text-left
                  shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                  transition-all
                  duration-200
                  dark:border-slate-800
                  dark:bg-slate-900
                  ${
                    disponible
                      ? "cursor-pointer hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:hover:border-slate-700"
                      : "cursor-default opacity-75"
                  }
                `}
              >

                {/* DECORACIÓN */}

                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-slate-50
                    opacity-70
                    dark:bg-slate-800
                  "
                />


                {/* ICONO */}

                <div
                  className={`
                    relative
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    ${color.fondo}
                    ${color.icono}
                  `}
                >

                  <Icono
                    size={22}
                    strokeWidth={2.2}
                  />

                </div>


                {/* CONTENIDO */}

                <div
                  className="
                    relative
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >

                    <h3
                      className="
                        text-base
                        font-black
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {reporte.titulo}
                    </h3>


                    <span
                      className={`
                        shrink-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-black
                        ${
                          disponible
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }
                      `}
                    >
                      {reporte.estado}
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      min-h-[48px]
                      text-sm
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {reporte.descripcion}
                  </p>


                  {/* FOOTER */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                      border-t
                      border-slate-100
                      pt-4
                      dark:border-slate-800
                    "
                  >

                    <span
                      className={`
                        text-xs
                        font-black
                        ${
                          disponible
                            ? color.icono
                            : "text-slate-400"
                        }
                      `}
                    >
                      {disponible
                        ? "Ver reporte"
                        : "En desarrollo"}
                    </span>


                    {disponible && (

                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-50
                          text-slate-400
                          transition
                          group-hover:bg-indigo-50
                          group-hover:text-indigo-600
                          dark:bg-slate-800
                          dark:group-hover:bg-indigo-950/40
                          dark:group-hover:text-indigo-400
                        "
                      >

                        <ChevronRight
                          size={16}
                        />

                      </span>

                    )}

                  </div>

                </div>

              </button>

            );

          }
        )}

      </div>


      {/* =================================================
          INFORMACIÓN
      ================================================= */}

      <div
        className="
          mt-7
          flex
          items-start
          gap-4
          rounded-2xl
          border
          border-indigo-100
          bg-indigo-50/70
          p-5
          dark:border-indigo-900/40
          dark:bg-indigo-950/20
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
            bg-white
            text-indigo-600
            shadow-sm
            dark:bg-slate-900
            dark:text-indigo-400
          "
        >

          <BarChart3 size={19} />

        </div>


        <div>

          <p
            className="
              text-sm
              font-black
              text-indigo-900
              dark:text-indigo-200
            "
          >
            Centro de información administrativa
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-indigo-700
              dark:text-indigo-300
            "
          >
            Los reportes te permitirán consultar
            y analizar la información de estudiantes,
            docentes, cursos y actividad del sistema
            desde un solo lugar.
          </p>

        </div>

      </div>

    </section>
  );
};


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  label,
  value,
  description,
  color,
}) {

  const estilos = {

    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",

    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",

    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",

  };


  const texto = {

    indigo:
      "text-indigo-600 dark:text-indigo-400",

    emerald:
      "text-emerald-600 dark:text-emerald-400",

    amber:
      "text-amber-600 dark:text-amber-400",

  };


  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-[11px]
              font-black
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            {label}
          </p>


          <p
            className={`
              mt-2
              text-3xl
              font-black
              tracking-tight
              ${texto[color]}
            `}
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            ${estilos[color]}
          `}
        >
          {icon}
        </div>

      </div>

    </div>

  );
};


export default Reportes;
