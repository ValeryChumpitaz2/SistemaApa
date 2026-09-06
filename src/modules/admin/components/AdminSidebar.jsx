import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  School,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  UserRound,
  Camera,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../../auth/AuthContext";


// =====================================================
// SIDEBAR ADMINISTRADOR
// =====================================================

export default function AdminSidebar({
  active,
  setActive,
}) {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    logout,
  } = useAuth();


  // =====================================================
  // PERFIL DEL ADMIN
  // =====================================================

  const perfilInicial = {

    nombre:
      "Administrador",

    correo:
      "admin@vallegrande.edu.pe",

    foto:
      "",

    rol:
      "Administrador",

  };


  function obtenerPerfilGuardado() {

    try {

      const guardado =
        localStorage.getItem(
          "adminPerfil"
        );


      if (!guardado) {

        return perfilInicial;

      }


      const perfil =
        JSON.parse(
          guardado
        );


      return {

        ...perfilInicial,

        ...perfil,

      };

    }
    catch (error) {

      console.error(
        "Error leyendo perfil del administrador:",
        error
      );

      return perfilInicial;

    }

  }


  const [
    perfil,
    setPerfil,
  ] = useState(
    obtenerPerfilGuardado
  );


  // =====================================================
  // ACTUALIZAR PERFIL
  // =====================================================

  useEffect(() => {

    function actualizarPerfil() {

      setPerfil(
        obtenerPerfilGuardado()
      );

    }


    // Evento personalizado
    window.addEventListener(
      "adminPerfilActualizado",
      actualizarPerfil
    );


    // Cambios entre pestañas
    window.addEventListener(
      "storage",
      actualizarPerfil
    );


    return () => {

      window.removeEventListener(
        "adminPerfilActualizado",
        actualizarPerfil
      );

      window.removeEventListener(
        "storage",
        actualizarPerfil
      );

    };

  }, []);


  // =====================================================
  // DETECTAR RUTA ACTUAL
  // =====================================================

  function obtenerActivo() {

    const ruta =
      location.pathname;


    if (
      ruta ===
      "/admin/dashboard"
    ) {

      return "dashboard";

    }


    if (
      ruta.startsWith(
        "/admin/docentes"
      )
    ) {

      return "docentes";

    }


    if (
      ruta.startsWith(
        "/admin/estudiantes"
      )
    ) {

      return "estudiantes";

    }


    if (
      ruta.startsWith(
        "/admin/cursos"
      )
    ) {

      return "cursos";

    }


    if (
      ruta.startsWith(
        "/admin/carreras"
      )
    ) {

      return "carreras";

    }


    if (
      ruta.startsWith(
        "/admin/reportes"
      )
    ) {

      return "reportes";

    }


    if (
      ruta.startsWith(
        "/admin/configuracion"
      )
    ) {

      return "configuracion";

    }


    return active || "dashboard";

  }


  const activo =
    obtenerActivo();


  // =====================================================
  // MENÚ PRINCIPAL
  // =====================================================

  const opcionesPrincipales = [

    {
      id: "dashboard",
      nombre: "Dashboard",
      icon: Home,
      route: "/admin/dashboard",
    },

    {
      id: "docentes",
      nombre: "Docentes",
      icon: Users,
      route: "/admin/docentes",
    },

    {
      id: "estudiantes",
      nombre: "Estudiantes",
      icon: GraduationCap,
      route: "/admin/estudiantes",
    },

  ];


  // =====================================================
  // ACADÉMICO
  // =====================================================

  const opcionesAcademicas = [

    {
      id: "cursos",
      nombre: "Cursos",
      icon: BookOpen,
      route: "/admin/cursos",
    },

    {
      id: "carreras",
      nombre: "Carreras",
      icon: School,
      route: "/admin/carreras",
    },

  ];


  // =====================================================
  // REPORTES
  // =====================================================

  const opcionesReportes = [

    {
      id: "reportes",
      nombre: "Reportes",
      icon: BarChart3,
      route: "/admin/reportes",
    },

  ];


  // =====================================================
  // SISTEMA
  // =====================================================

  const opcionesSistema = [

    {
      id: "configuracion",
      nombre: "Configuración",
      icon: Settings,
      route: "/admin/configuracion",
    },

  ];


  // =====================================================
  // NAVEGAR
  // =====================================================

  function handleNavigation(item) {

    if (
      typeof setActive ===
      "function"
    ) {

      setActive(
        item.id
      );

    }


    navigate(
      item.route
    );

  }


  // =====================================================
  // ABRIR PERFIL
  // =====================================================

  function irAlPerfil() {

    if (
      typeof setActive ===
      "function"
    ) {

      setActive(
        "configuracion"
      );

    }


    navigate(
      "/admin/configuracion"
    );

  }


  // =====================================================
  // CERRAR SESIÓN
  // =====================================================

  function handleLogout() {

    try {

      if (
        typeof logout ===
        "function"
      ) {

        logout();

      }
      else {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "usuario"
        );

        localStorage.removeItem(
          "rol"
        );

      }

    }
    catch (error) {

      console.error(
        "Error cerrando sesión:",
        error
      );

    }


    navigate(
      "/login"
    );

  }


  // =====================================================
  // OPCIÓN
  // =====================================================

  function renderOpcion(item) {

    const Icon =
      item.icon;


    const isActive =
      activo === item.id;


    return (

      <button
        key={item.id}
        type="button"
        onClick={() =>
          handleNavigation(
            item
          )
        }
        className={`
          group
          relative
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-left
          font-semibold
          transition-all
          duration-200

          ${
            isActive

              ? `
                bg-[#1D3681]
                text-white
                shadow-lg
                shadow-blue-900/20
              `

              : `
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

        {isActive && (

          <span
            className="
              absolute
              left-0
              top-1/2
              h-7
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-blue-300
            "
          />

        )}


        <Icon
          size={20}
          strokeWidth={
            isActive
              ? 2.5
              : 2
          }
          className={`
            shrink-0

            ${
              isActive
                ? "text-white"
                : "text-slate-500 group-hover:text-[#1D3681] dark:group-hover:text-blue-300"
            }
          `}
        />


        <span className="flex-1">
          {item.nombre}
        </span>


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

  }


  // =====================================================
  // RENDER
  // =====================================================

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
        flex-col
        border-r
        border-slate-200
        bg-white
        shadow-xl
        dark:border-slate-800
        dark:bg-slate-900
        xl:flex
      "
    >

      {/* =================================================
          LOGO
      ================================================= */}

      <div
        className="
          border-b
          border-slate-200
          px-5
          pb-4
          pt-5
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

            <ShieldCheck
              size={23}
              strokeWidth={2.3}
            />

          </div>


          <div className="min-w-0">

            <h1
              className="
                truncate
                text-base
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Sistema APA
            </h1>

            <p
              className="
                mt-0.5
                text-[11px]
                font-medium
                text-slate-400
              "
            >
              Panel administrativo
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          MENÚ
      ================================================= */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-5
        "
      >

        <MenuSection
          titulo="Principal"
          opciones={
            opcionesPrincipales
          }
          renderOpcion={
            renderOpcion
          }
        />


        <MenuSection
          titulo="Académico"
          opciones={
            opcionesAcademicas
          }
          renderOpcion={
            renderOpcion
          }
        />


        <MenuSection
          titulo="Reportes"
          opciones={
            opcionesReportes
          }
          renderOpcion={
            renderOpcion
          }
        />


        <MenuSection
          titulo="Sistema"
          opciones={
            opcionesSistema
          }
          renderOpcion={
            renderOpcion
          }
        />

      </nav>


      {/* =================================================
          PERFIL
      ================================================= */}

      <div
        className="
          border-t
          border-slate-200
          px-4
          py-3
          dark:border-slate-800
        "
      >

        <button
          type="button"
          onClick={
            irAlPerfil
          }
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-3
            text-left
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            dark:border-slate-700
            dark:bg-slate-800/70
            dark:hover:border-blue-800
            dark:hover:bg-slate-800
          "
        >

          {/* FOTO */}

          <div
            className="
              relative
              h-11
              w-11
              shrink-0
            "
          >

            {perfil?.foto ? (

              <img
                src={
                  perfil.foto
                }
                alt={
                  perfil?.nombre ||
                  "Administrador"
                }
                className="
                  h-11
                  w-11
                  rounded-xl
                  object-cover
                  shadow-sm
                  ring-2
                  ring-white
                  dark:ring-slate-700
                "
              />

            ) : (

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#1D3681]
                  text-white
                "
              >

                <UserRound
                  size={22}
                />

              </div>

            )}


            {/* ONLINE */}

            <span
              className="
                absolute
                -bottom-0.5
                -right-0.5
                h-3
                w-3
                rounded-full
                border-2
                border-white
                bg-emerald-500
                dark:border-slate-800
              "
            />

          </div>


          {/* INFORMACIÓN */}

          <div className="min-w-0 flex-1">

            <p
              className="
                truncate
                text-sm
                font-black
                text-slate-800
                dark:text-white
              "
            >
              {
                perfil?.nombre ||
                "Administrador"
              }
            </p>


            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                font-medium
                text-slate-400
              "
            >
              {
                perfil?.correo ||
                "admin@vallegrande.edu.pe"
              }
            </p>


            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
              "
            >

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
                  dark:bg-blue-950/50
                  dark:text-blue-300
                "
              >
                Administrador
              </span>

            </div>

          </div>


          <Camera
            size={15}
            className="
              shrink-0
              text-slate-400
              opacity-0
              transition-opacity
              group-hover:opacity-100
            "
          />

        </button>

      </div>


      {/* =================================================
          LOGOUT
      ================================================= */}

      <div
        className="
          px-4
          pb-4
          pt-1
        "
      >

        <button
          type="button"
          onClick={
            handleLogout
          }
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-500
            py-3
            font-bold
            text-white
            shadow-md
            shadow-red-500/20
            transition-all
            duration-200
            hover:bg-red-600
            active:bg-red-700
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


// =====================================================
// SECCIÓN
// =====================================================

function MenuSection({
  titulo,
  opciones,
  renderOpcion,
}) {

  return (

    <div className="mb-6">

      <p
        className="
          mb-2
          px-3
          text-[11px]
          font-black
          uppercase
          tracking-widest
          text-slate-400
        "
      >
        {titulo}
      </p>


      <div className="space-y-1">

        {opciones.map(
          renderOpcion
        )}

      </div>

    </div>

  );

}
