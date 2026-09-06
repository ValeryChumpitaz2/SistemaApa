import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

import {
  useAuth,
} from "../../../auth/AuthContext";


// =====================================================
// TOPBAR ADMINISTRADOR
// =====================================================

export default function AdminTopbar({
  onMenuClick,
}) {

  const {
    user,
  } = useAuth();


  // =====================================================
  // DATOS DEL USUARIO
  // =====================================================

  const nombre =
    user?.nombre ||
    user?.usuario ||
    "Administrador";


  const correo =
    user?.correo ||
    "Cuenta institucional";


  const inicial =
    nombre
      .charAt(0)
      .toUpperCase();


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <header
      className="
        sticky
        top-0
        z-30
        h-[76px]
        border-b
        border-slate-200
        bg-white/90
        backdrop-blur-xl
        dark:border-slate-800
        dark:bg-slate-900/90
      "
    >

      <div
        className="
          flex
          h-full
          items-center
          justify-between
          gap-4
          px-5
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            IZQUIERDA
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >

          {/* MOBILE */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menú"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition
              hover:bg-slate-50
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
              xl:hidden
            "
          >

            <Menu size={20} />

          </button>


          {/* BUSCADOR */}

          <div
            className="
              hidden
              h-10
              w-72
              items-center
              gap-2.5
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3.5
              text-slate-400
              md:flex
              lg:w-80
              dark:border-slate-700
              dark:bg-slate-800/70
            "
          >

            <Search size={17} />

            <span
              className="
                flex-1
                text-xs
                font-medium
              "
            >
              Buscar en el sistema...
            </span>

            <span
              className="
                hidden
                rounded-md
                border
                border-slate-200
                bg-white
                px-1.5
                py-0.5
                text-[9px]
                font-bold
                text-slate-400
                lg:block
              "
            >
              /
            </span>

          </div>


          {/* MOBILE */}

          <div
            className="
              min-w-0
              md:hidden
            "
          >

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-widest
                text-blue-600
              "
            >
              Sistema APA
            </p>

            <h2
              className="
                truncate
                text-sm
                font-black
                text-slate-800
                dark:text-white
              "
            >
              Administración
            </h2>

          </div>

        </div>


        {/* =================================================
            DERECHA
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            sm:gap-3
          "
        >

          {/* CAMPANA ÚNICA */}

          <button
            type="button"
            aria-label="Notificaciones"
            className="
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#1D3681]
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
            "
          >

            <Bell
              size={18}
              strokeWidth={2}
            />

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                border-2
                border-white
                bg-rose-500
                dark:border-slate-800
              "
            />

          </button>


          {/* SEPARADOR */}

          <div
            className="
              hidden
              h-8
              w-px
              bg-slate-200
              sm:block
              dark:bg-slate-700
            "
          />


          {/* PERFIL ÚNICO */}

          <div
            className="
              flex
              items-center
              gap-2.5
            "
          >

            {/* AVATAR */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-[#1D3681]
                text-sm
                font-black
                text-white
                shadow-md
                shadow-blue-900/15
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

                inicial

              )}

            </div>


            {/* INFORMACIÓN */}

            <div
              className="
                hidden
                min-w-0
                sm:block
              "
            >

              <p
                className="
                  max-w-[160px]
                  truncate
                  text-sm
                  font-black
                  text-slate-800
                  dark:text-white
                "
              >
                {nombre}
              </p>

              <p
                className="
                  mt-0.5
                  max-w-[160px]
                  truncate
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >
                {correo}
              </p>

            </div>


            <ChevronDown
              size={15}
              className="
                hidden
                text-slate-400
                sm:block
              "
            />

          </div>

        </div>

      </div>

    </header>

  );

}
