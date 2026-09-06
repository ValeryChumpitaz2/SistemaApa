import {
  Users,
  GraduationCap,
  BookOpen,
  School,
  BarChart3,
  Settings,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import AdminSidebar
  from "../components/AdminSidebar";

import AdminTopbar
  from "../components/AdminTopbar";

import StatCard
  from "../components/StatCard";

import InfoCard
  from "../components/InfoCard";


// =====================================================
// DASHBOARD ADMINISTRADOR
// =====================================================

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [
    active,
    setActive,
  ] = useState("dashboard");


  // =====================================================
  // ESTADÍSTICAS
  // =====================================================

  const stats = [

    {
      title: "Docentes",
      value: 0,
      description: "Docentes registrados",
      icon: Users,
      color: "indigo",
    },

    {
      title: "Estudiantes",
      value: 0,
      description: "Estudiantes registrados",
      icon: GraduationCap,
      color: "emerald",
    },

    {
      title: "Cursos",
      value: 0,
      description: "Cursos registrados",
      icon: BookOpen,
      color: "violet",
    },

    {
      title: "Carreras",
      value: 0,
      description: "Carreras registradas",
      icon: School,
      color: "amber",
    },

  ];


  // =====================================================
  // VER REPORTES
  // =====================================================

  function handleReportes() {

    setActive("reportes");

    navigate("/admin/reportes");

  }


  // =====================================================
  // DASHBOARD
  // =====================================================

  function renderDashboard() {

    return (

      <section>

        {/* =================================================
            CABECERA
        ================================================= */}

        <header className="mb-8">

          <p
            className="
              mb-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Administración
          </p>


          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div>

              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-slate-900
                  lg:text-4xl
                  dark:text-white
                "
              >
                Dashboard
              </h1>


              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                  lg:text-base
                  dark:text-slate-400
                "
              >
                Gestiona y supervisa los recursos
                principales del Sistema APA.
              </p>

            </div>


            {/* ESTADO */}

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-xs
                font-semibold
                text-slate-500
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-800
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
                "
              />

              Sistema operativo

            </div>

          </div>

        </header>


        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            relative
            mb-8
            overflow-hidden
            rounded-[28px]
            bg-gradient-to-br
            from-[#0f172a]
            via-[#172554]
            to-[#312e81]
            p-7
            text-white
            shadow-[0_20px_50px_rgba(15,23,42,0.15)]
            lg:p-9
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              absolute
              -right-24
              -top-32
              h-80
              w-80
              rounded-full
              bg-blue-500/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              right-20
              h-64
              w-64
              rounded-full
              bg-violet-500/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_38%)]
            "
          />


          {/* CONTENIDO */}

          <div
            className="
              relative
              z-10
              max-w-3xl
            "
          >

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1.5
                text-xs
                font-semibold
                text-slate-200
                backdrop-blur-sm
              "
            >

              <Sparkles
                size={14}
                className="text-cyan-300"
              />

              Panel administrativo

            </div>


            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                lg:text-3xl
              "
            >
              Bienvenido, Administrador 👋
            </h2>


            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-300
              "
            >
              Desde este espacio puedes administrar
              usuarios, cursos, carreras y consultar
              información general del Sistema APA.
            </p>


            <button
              type="button"
              onClick={handleReportes}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-2.5
                text-sm
                font-bold
                text-slate-900
                shadow-lg
                transition-all
                hover:-translate-y-0.5
                hover:bg-slate-100
              "
            >

              Ver reportes

              <ArrowUpRight
                size={16}
              />

            </button>

          </div>

        </section>


        {/* =================================================
            ESTADÍSTICAS
        ================================================= */}

        <section className="mb-8">

          <div className="mb-5">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-blue-600
              "
            >
              Resumen
            </p>


            <h2
              className="
                mt-1
                text-xl
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Resumen del sistema
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Vista general de los recursos registrados.
            </p>

          </div>


          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            {stats.map((stat) => (

              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                color={stat.color}
              />

            ))}

          </div>

        </section>


        {/* =================================================
            ACCESO ADMINISTRATIVO
        ================================================= */}

        <section>

          <div className="mb-5">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-blue-600
              "
            >
              Administración
            </p>


            <h2
              className="
                mt-1
                text-xl
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Acceso administrativo
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Utiliza los módulos disponibles para
              administrar el sistema.
            </p>

          </div>


          <div
            className="
              grid
              gap-5
              md:grid-cols-2
            "
          >

            <InfoCard
              icon={BarChart3}
              title="Resumen general"
              description="
                Consulta información general sobre
                usuarios, cursos, carreras y otros
                recursos del Sistema APA.
              "
            />


            <InfoCard
              icon={Settings}
              title="Configuración"
              description="
                Administra las preferencias y
                configuraciones generales de la
                plataforma.
              "
            />

          </div>

        </section>

      </section>

    );

  }


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#F1F5F9]
        dark:bg-slate-950
      "
    >

      {/* =================================================
          SIDEBAR — UNO SOLO
      ================================================= */}

      <AdminSidebar
        active={active}
        setActive={setActive}
      />


      {/* =================================================
          CONTENIDO
      ================================================= */}

      <div
        className="
          min-h-screen
          xl:pl-[19px]
        "
      >

        {/* =================================================
            TOPBAR — UNO SOLO
        ================================================= */}

        <AdminTopbar />


        {/* =================================================
            MAIN
        ================================================= */}

        <main
          className="
      w-full
      px-5
      py-7
      sm:px-6
      lg:px-7
      lg:py-8
    "
        >
          <div
            className="
        mx-auto
        w-full
        max-w-[1500px]
      "
          >
            {renderDashboard()}
          </div>
        </main>
      </div>

    </div>

  );

}
