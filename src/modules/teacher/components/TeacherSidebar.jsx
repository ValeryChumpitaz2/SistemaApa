import {
  Home,
  FolderSearch,
  ClipboardList,
  BarChart3,
  FileBarChart,
  Settings,
  LogOut,
  UserCircle,
  GraduationCap
} from "lucide-react";

import {
  useAuth
} from "../../../auth/AuthContext";


export default function TeacherSidebar({

  active,

  setActive

}) {

  const {
    user,
    logout
  } = useAuth();



  const opciones = [

    {
      id: "dashboard",
      nombre: "Inicio",
      icon: <Home size={20} />
    },

    {
      id: "analyzer",
      nombre: "Analizar carpeta",
      icon: <FolderSearch size={20} />
    },

    {
      id: "consolidacion",
      nombre: "Consolidación",
      icon: <GraduationCap size={20} />
    },

    {
      id: "results",
      nombre: "Resultados",
      icon: <ClipboardList size={20} />
    },

    {
      id: "ranking",
      nombre: "Ranking",
      icon: <BarChart3 size={20} />
    },

    {
      id: "analytics",
      nombre: "Analítica",
      icon: <BarChart3 size={20} />
    },

    {
      id: "reports",
      nombre: "Reportes",
      icon: <FileBarChart size={20} />
    },

    {
      id: "communications",
      nombre: "Comunicación",
      icon: <ClipboardList size={20} />
    },

    {
      id: "settings",
      nombre: "Configuración",
      icon: <Settings size={20} />
    }

  ];



  return (

    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-72
        bg-white
        dark:bg-slate-900
        border-r
        dark:border-slate-800
        shadow-xl
        z-40
        hidden
        xl:flex
        flex-col
      "
    >


      {/* PERFIL DOCENTE */}

      <div
        className="
          p-6
          border-b
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
              bg-blue-100
              text-blue-700
              rounded-full
              w-14
              h-14
              flex
              items-center
              justify-center
            "
          >

            <UserCircle size={32} />

          </div>


          <div>

            <h2
              className="
                font-black
                text-gray-800
                dark:text-white
              "
            >

              {
                user?.usuario ||
                "Docente"
              }

            </h2>


            <p
              className="
                text-sm
                text-gray-500
              "
            >

              Panel Docente

            </p>

          </div>

        </div>

      </div>



      {/* MENU */}

      <div
        className="
          flex-1
          p-5
          space-y-2
          overflow-y-auto
        "
      >

        {

          opciones.map(item => (

            <button

              key={item.id}

              onClick={() =>
                setActive(item.id)
              }

              className={`

                w-full

                flex

                items-center

                gap-3

                px-4

                py-3

                rounded-xl

                font-bold

                transition

                ${
                  active === item.id

                    ?

                    "bg-[#1D3681] text-white shadow-md"

                    :

                    "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800"
                }

              `}

            >

              {item.icon}

              {item.nombre}

            </button>

          ))

        }

      </div>



      {/* LOGOUT */}

      <div
        className="
          p-5
          border-t
          dark:border-slate-800
        "
      >

        <button

          onClick={logout}

          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            rounded-xl
            font-bold
            transition
          "

        >

          <LogOut size={19} />

          Cerrar sesión

        </button>

      </div>


    </aside>

  );

}