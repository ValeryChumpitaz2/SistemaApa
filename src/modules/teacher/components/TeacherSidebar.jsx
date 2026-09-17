import {
  Home,
  FolderSearch,
  ClipboardList,
  BarChart3,
  FileBarChart,
  Settings,
  LogOut,
  UserCircle,
  GraduationCap,
  History,
  MessageSquare,
  TrendingUp,
  ClipboardCheck,
} from "lucide-react";

import { useAuth } from "../../../auth/AuthContext";


export default function TeacherSidebar({
  active,
  setActive,
}) {

  const {
    user,
    logout,
  } = useAuth();


  // =====================================================
  // DATOS DEL DOCENTE
  // =====================================================

  const nombreDocente =
    user?.usuario ||
    user?.nombre ||
    "Docente";


  const especialidad =
    user?.especialidad ||
    "Docente";


  const foto =
    user?.foto ||
    "";


  // =====================================================
  // MENÚ PRINCIPAL
  // =====================================================

  const opcionesPrincipales = [

    {
      id: "dashboard",
      nombre: "Inicio",
      icon: Home,
    },

    {
      id: "analyzer",
      nombre: "Analizar carpeta",
      icon: FolderSearch,
    },

    {
      id: "results",
      nombre: "Ver resultados",
      icon: ClipboardList,
    },

  ];


  // =====================================================
  // CONSOLIDACIÓN
  // =====================================================

  const opcionesConsolidacion = [

    {
      id: "consolidacion",
      nombre: "Consolidación",
      icon: GraduationCap,
    },

    {
      id: "calificar",
      nombre: "Calificar entregables",
      icon: ClipboardCheck,
    },

    {
      id: "historial-consolidacion",
      nombre: "Historial consolidación",
      icon: History,
    },

  ];


  // =====================================================
  // ANÁLISIS
  // =====================================================

  const opcionesAnalisis = [

    {
      id: "ranking",
      nombre: "Ranking",
      icon: BarChart3,
    },

    {
      id: "analytics",
      nombre: "Analítica",
      icon: TrendingUp,
    },

    {
      id: "reports",
      nombre: "Reportes",
      icon: FileBarChart,
    },

  ];


  // =====================================================
  // SISTEMA
  // =====================================================

  const opcionesSistema = [

    {
      id: "communications",
      nombre: "Comunicación",
      icon: MessageSquare,
    },

    {
      id: "settings",
      nombre: "Configuración",
      icon: Settings,
    },

  ];


  // =====================================================
  // CAMBIAR SECCIÓN
  // =====================================================

  const navegar = (id) => {

    if (active === id) {
      return;
    }

    setActive(id);

  };


  // =====================================================
  // RENDER OPCIÓN
  // =====================================================

  const renderOpcion = (item) => {

    const Icon =
      item.icon;


    const isActive =
      active === item.id;


    return (

      <button
        key={item.id}
        type="button"
        title={item.nombre}
        onClick={() =>
          navegar(item.id)
        }
        aria-current={
          isActive
            ? "page"
            : undefined
        }
        className={`
          group
          relative
          w-full
          flex
          items-center
          gap-3
          px-3
          py-2.5
          rounded-xl
          text-left
          text-sm
          font-semibold
          transition-all
          duration-200
          outline-none

          ${
            isActive

              ? `
                bg-[#EEF3FF]
                text-[#1D3681]
                shadow-sm
              `

              : `
                text-slate-600
                dark:text-slate-300

                hover:bg-slate-50
                dark:hover:bg-slate-800/80

                hover:text-slate-900
                dark:hover:text-white
              `
          }

          focus-visible:ring-2
          focus-visible:ring-[#1D3681]/30
        `}
      >

        {/* INDICADOR ACTIVO */}

        {isActive && (

          <span
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              w-1
              h-6
              rounded-r-full
              bg-[#1D3681]
            "
          />

        )}


        {/* ICONO */}

        <Icon
          size={19}
          strokeWidth={
            isActive
              ? 2.5
              : 2
          }
          className={`
            shrink-0
            transition-all
            duration-200

            ${
              isActive

                ? `
                  text-[#1D3681]
                `

                : `
                  text-slate-400
                  group-hover:text-[#1D3681]
                  group-hover:scale-105
                `
            }
          `}
        />


        {/* TEXTO */}

        <span
          className="
            flex-1
            truncate
          "
        >
          {item.nombre}
        </span>


        {/* PUNTO ACTIVO */}

        {isActive && (

          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-[#1D3681]
              shrink-0
            "
          />

        )}

      </button>

    );

  };


  // =====================================================
  // RENDER SECCIÓN
  // =====================================================

  const renderSeccion = (
    titulo,
    opciones,
    className = ""
  ) => (

    <div
      className={`
        mb-7
        ${className}
      `}
    >

      {/* TÍTULO */}

      <p
        className="
          px-3
          mb-2
          text-[10px]
          uppercase
          tracking-[0.14em]
          font-bold
          text-slate-400
          dark:text-slate-500
        "
      >
        {titulo}
      </p>


      {/* OPCIONES */}

      <div
        className="
          space-y-1
        "
      >

        {opciones.map(
          renderOpcion
        )}

      </div>

    </div>

  );


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-64

        bg-white
        dark:bg-slate-900

        border-r
        border-slate-200/80
        dark:border-slate-800

        z-40

        hidden
        xl:flex
        flex-col
      "
    >

      {/* =================================================
          PERFIL DOCENTE
      ================================================= */}

      <div
        className="
          px-5
          pt-6
          pb-5

          border-b
          border-slate-200/80
          dark:border-slate-800
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            min-w-0
          "
        >

          {/* AVATAR */}

          <div
            className="
              relative
              shrink-0
            "
          >

            {foto ? (

              <img
                src={foto}
                alt={`Foto de ${nombreDocente}`}
                className="
                  w-11
                  h-11
                  rounded-xl
                  object-cover

                  border
                  border-slate-200
                  dark:border-slate-700

                  shadow-sm
                "
              />

            ) : (

              <div
                className="
                  w-11
                  h-11

                  rounded-xl

                  bg-[#EEF3FF]
                  dark:bg-blue-900/40

                  text-[#1D3681]
                  dark:text-blue-300

                  flex
                  items-center
                  justify-center
                "
              >

                <UserCircle
                  size={27}
                  strokeWidth={2}
                />

              </div>

            )}


            {/* ESTADO ONLINE */}

            <span
              className="
                absolute
                right-[-1px]
                bottom-[-1px]

                w-3
                h-3

                rounded-full

                bg-emerald-500

                border-2
                border-white
                dark:border-slate-900

                shadow-sm
              "
              title="Sesión activa"
            />

          </div>


          {/* INFORMACIÓN */}

          <div
            className="
              min-w-0
              flex-1
            "
          >

            <h2
              className="
                text-sm
                font-extrabold

                text-slate-800
                dark:text-white

                truncate
              "
              title={nombreDocente}
            >

              {nombreDocente}

            </h2>


            <p
              className="
                mt-0.5

                text-xs
                font-medium

                text-slate-500
                dark:text-slate-400

                truncate
              "
              title={especialidad}
            >

              {especialidad}

            </p>

          </div>

        </div>


        {/* CORREO */}

        {user?.correo && (

          <div
            className="
              mt-4
              px-3
              py-2

              rounded-lg

              bg-slate-50
              dark:bg-slate-800/70

              border
              border-slate-100
              dark:border-slate-800
            "
          >

            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                dark:text-slate-500
              "
            >
              Cuenta
            </p>


            <p
              className="
                mt-0.5

                text-[11px]
                font-medium

                text-slate-600
                dark:text-slate-300

                truncate
              "
              title={user.correo}
            >

              {user.correo}

            </p>

          </div>

        )}

      </div>


      {/* =================================================
          MENÚ
      ================================================= */}

      <nav
        className="
          flex-1

          px-3
          py-5

          overflow-y-auto

          scrollbar-thin
          scrollbar-thumb-slate-200
          dark:scrollbar-thumb-slate-700

          scrollbar-track-transparent
        "
        aria-label="Navegación docente"
      >

        {/* PRINCIPAL */}

        {renderSeccion(
          "Principal",
          opcionesPrincipales
        )}


        {/* CONSOLIDACIÓN */}

        {renderSeccion(
          "Consolidación",
          opcionesConsolidacion
        )}


        {/* ANÁLISIS */}

        {renderSeccion(
          "Análisis",
          opcionesAnalisis
        )}


        {/* SISTEMA */}

        {renderSeccion(
          "Sistema",
          opcionesSistema,
          "mb-0"
        )}

      </nav>


      {/* =================================================
          PARTE INFERIOR
      ================================================= */}

      <div
        className="
          p-4

          border-t
          border-slate-200/80
          dark:border-slate-800
        "
      >

        {/* ESTADO DE SESIÓN */}

        <div
          className="
            mb-3

            flex
            items-center
            gap-2

            px-3
            py-2

            rounded-xl

            bg-slate-50
            dark:bg-slate-800/60

            border
            border-slate-100
            dark:border-slate-800
          "
        >

          <span
            className="
              w-2
              h-2

              rounded-full

              bg-emerald-500

              shrink-0
            "
          />


          <div
            className="
              min-w-0
            "
          >

            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                dark:text-slate-500
              "
            >
              Sesión activa
            </p>


            <p
              className="
                text-[11px]
                font-semibold
                text-slate-600
                dark:text-slate-300
                truncate
              "
              title={nombreDocente}
            >
              {nombreDocente}
            </p>

          </div>

        </div>


        {/* CERRAR SESIÓN */}

        <button
          type="button"
          onClick={logout}
          className="
            group

            w-full

            flex
            items-center
            justify-center
            gap-2

            py-2.5
            px-3

            rounded-xl

            border
            border-red-200
            dark:border-red-900/50

            text-red-500
            dark:text-red-400

            hover:bg-red-50
            dark:hover:bg-red-950/30

            hover:border-red-300
            dark:hover:border-red-800

            active:bg-red-100
            dark:active:bg-red-950/50

            text-sm
            font-bold

            transition-all
            duration-200

            outline-none

            focus-visible:ring-2
            focus-visible:ring-red-500/20
          "
        >

          <LogOut
            size={18}
            strokeWidth={2.2}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-0.5
            "
          />


          <span>
            Cerrar sesión
          </span>

        </button>

      </div>

    </aside>

  );

}
