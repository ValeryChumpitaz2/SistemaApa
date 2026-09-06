import {
  Home,
  FileSearch,
  BarChart3,
  History,
  Settings,
  LogOut,
  UserCircle,
  FileBarChart,
  FileWarning,
  Trophy,
  MessageSquare,
} from "lucide-react";

import {
  useAuth
} from "../../../auth/AuthContext";


export default function StudentSidebar({
  pagina,
  setPagina
}) {

  const {
    user,
    logout
  } = useAuth();


  // ==================================================
  // MENÚ PRINCIPAL
  // ==================================================

  const opcionesPrincipales = [

    {
      id: "dashboard",
      nombre: "Inicio",
      icon: Home
    },

    {
      id: "evaluation",
      nombre: "Evaluación",
      icon: FileSearch
    },

    {
      id: "results",
      nombre: "Resultados",
      icon: BarChart3
    },

    {
      id: "history",
      nombre: "Historial",
      icon: History
    }

  ];


  // ==================================================
  // SECCIÓN ACADÉMICA
  // ==================================================

  const opcionesAcademicas = [

    {
      id: "achievements",
      nombre: "Mis logros",
      icon: Trophy
    },

    {
      id: "reports",
      nombre: "Reportes",
      icon: FileBarChart
    },

    {
      id: "reports-incidencias",
      nombre: "Reportar incidencia",
      icon: FileWarning
    }

  ];


  // ==================================================
  // COMUNIDAD
  // ==================================================

  const opcionesComunidad = [

    {
      id: "testimonio",
      nombre: "Mi testimonio",
      icon: MessageSquare
    }

  ];


  // ==================================================
  // SISTEMA
  // ==================================================

  const opcionesSistema = [

    {
      id: "settings",
      nombre: "Configuración",
      icon: Settings
    }

  ];


  // ==================================================
  // RENDER OPCIÓN
  // ==================================================

  const renderOpcion = (item) => {

    const Icon = item.icon;

    const isActive =
      pagina === item.id;


    return (

      <button

        key={item.id}

        type="button"

        onClick={() =>
          setPagina(item.id)
        }

        className={`
          group
          relative
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          text-left
          font-semibold
          transition-all
          duration-200

          ${
            isActive

              ?

              `
                bg-[#1D3681]
                text-white
                shadow-lg
                shadow-blue-900/20
              `

              :

              `
                text-slate-600
                dark:text-slate-300
                hover:bg-blue-50
                dark:hover:bg-slate-800
                hover:text-[#1D3681]
                dark:hover:text-blue-300
              `
          }
        `}

      >

        {/* INDICADOR DE PÁGINA ACTIVA */}

        {isActive && (

          <span
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              w-1
              h-7
              bg-blue-300
              rounded-r-full
            "
          />

        )}


        {/* ICONO */}

        <Icon

          size={20}

          strokeWidth={
            isActive
              ? 2.5
              : 2
          }

          className={`
            shrink-0
            transition-colors

            ${
              isActive

                ?

                "text-white"

                :

                `
                  text-slate-500
                  group-hover:text-[#1D3681]
                  dark:group-hover:text-blue-300
                `
            }
          `}

        />


        {/* TEXTO */}

        <span className="flex-1">

          {item.nombre}

        </span>


        {/* PUNTO ACTIVO */}

        {isActive && (

          <span
            className="
              h-2
              w-2
              rounded-full
              bg-blue-300
            "
          />

        )}

      </button>

    );

  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <aside

      className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        w-72
        xl:flex
        flex-col

        bg-white
        dark:bg-slate-900

        border-r
        border-slate-200
        dark:border-slate-800

        shadow-xl
      "

    >


      {/* ==================================================
          LOGO
      ================================================== */}

      <div
        className="
          px-5
          pt-5
          pb-4
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* LOGO VG */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#1D3681]
              text-white
              shadow-md
            "
          >

            <span
              className="
                text-lg
                font-black
                tracking-tight
              "
            >
              VG
            </span>

          </div>


          {/* NOMBRE */}

          <div>

            <h1
              className="
                text-base
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              VG Smart Review
            </h1>


            <p
              className="
                mt-0.5
                text-[11px]
                font-medium
                text-slate-400
              "
            >
              Plataforma académica
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          PERFIL
      ================================================== */}

      <div
        className="
          px-5
          py-5
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-slate-50
            dark:bg-slate-800/70
            p-3
          "
        >

          {/* FOTO */}

          <div
            className="
              h-11
              w-11
              shrink-0
              overflow-hidden
              rounded-xl
              bg-blue-100
              text-[#1D3681]
              dark:bg-blue-900/40
              dark:text-blue-300
              flex
              items-center
              justify-center
            "
          >

            {user?.foto ? (

              <img
                src={user.foto}
                alt="Perfil"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

            ) : (

              <UserCircle size={30} />

            )}

          </div>


          {/* DATOS */}

          <div className="min-w-0 flex-1">

            <p
              className="
                text-[10px]
                uppercase
                tracking-widest
                font-black
                text-slate-400
              "
            >
              Estudiante
            </p>


            <h2
              className="
                mt-0.5
                truncate
                text-sm
                font-black
                text-slate-800
                dark:text-white
              "
            >

              {
                user?.nombre ||
                user?.usuario ||
                "Estudiante"
              }

            </h2>


            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                text-slate-400
              "
            >

              {
                user?.correo ||
                "Cuenta institucional"
              }

            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          MENÚ
      ================================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-5

          scrollbar-thin
          scrollbar-thumb-slate-300
        "
      >


        {/* ==================================================
            PRINCIPAL
        ================================================== */}

        <MenuSection
          titulo="Principal"
          opciones={opcionesPrincipales}
          renderOpcion={renderOpcion}
        />


        {/* ==================================================
            ACADÉMICO
        ================================================== */}

        <MenuSection
          titulo="Académico"
          opciones={opcionesAcademicas}
          renderOpcion={renderOpcion}
        />


        {/* ==================================================
            COMUNIDAD
        ================================================== */}

        <MenuSection
          titulo="Comunidad"
          opciones={opcionesComunidad}
          renderOpcion={renderOpcion}
        />


        {/* ==================================================
            SISTEMA
        ================================================== */}

        <MenuSection
          titulo="Sistema"
          opciones={opcionesSistema}
          renderOpcion={renderOpcion}
        />

      </nav>


      {/* ==================================================
          CERRAR SESIÓN
      ================================================== */}

      <div
        className="
          border-t
          border-slate-200
          dark:border-slate-800
          p-4
        "
      >

        {/* SESIÓN ACTIVA */}

        <div
          className="
            mb-3
            rounded-xl
            bg-slate-50
            dark:bg-slate-800/70
            px-3
            py-2.5
          "
        >

          <div className="flex items-center gap-2">

            <span
              className="
                h-2
                w-2
                rounded-full
                bg-green-500
                shadow-sm
                shadow-green-500/50
              "
            />

            <p
              className="
                text-[10px]
                uppercase
                tracking-widest
                font-black
                text-slate-400
              "
            >
              Sesión activa
            </p>

          </div>


          <p
            className="
              mt-1
              truncate
              text-sm
              font-bold
              text-slate-700
              dark:text-slate-200
            "
          >

            {
              user?.nombre ||
              user?.usuario ||
              "Estudiante"
            }

          </p>

        </div>


        {/* BOTÓN LOGOUT */}

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

            rounded-xl

            bg-red-500
            hover:bg-red-600
            active:bg-red-700

            py-3

            text-white
            font-bold

            shadow-md
            shadow-red-500/20

            transition-all
            duration-200
          "
        >

          <LogOut
            size={19}
            className="
              transition-transform
              group-hover:-translate-x-0.5
            "
          />

          Cerrar sesión

        </button>

      </div>

    </aside>

  );

}


/* ==================================================
   SECCIÓN DEL MENÚ
================================================== */

function MenuSection({
  titulo,
  opciones,
  renderOpcion
}) {

  return (

    <div className="mb-6">

      <p
        className="
          px-3
          mb-2

          text-[11px]
          uppercase
          tracking-widest
          font-black

          text-slate-400
        "
      >

        {titulo}

      </p>


      <div className="space-y-1">

        {

          opciones.map(
            renderOpcion
          )

        }

      </div>

    </div>

  );

}