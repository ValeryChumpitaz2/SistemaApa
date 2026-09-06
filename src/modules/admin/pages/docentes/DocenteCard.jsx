import {
  KeyRound,
  Mail,
  UserRound,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";


// =====================================================
// TARJETA DOCENTE
// =====================================================

export default function DocenteCard({
  docente,
  onChangePassword,
}) {

  const nombre =
    docente?.nombre ||
    docente?.nombres ||
    "";

  const apellido =
    docente?.apellido ||
    docente?.apellidos ||
    "";

  const correo =
    docente?.correo ||
    docente?.email ||
    docente?.correoElectronico ||
    "Sin correo";

  const usuario =
    docente?.usuario ||
    "";

  const estado =
    String(
      docente?.estado || "ACTIVO"
    )
      .trim()
      .toUpperCase();

  const activo =
    estado === "ACTIVO" ||
    estado === "HABILITADO" ||
    estado === "TRUE" ||
    estado === "VERDADERO";

  const nombreCompleto =
    `${nombre} ${apellido}`
      .trim() ||
    "Docente";

  const inicial =
    nombreCompleto
      .charAt(0)
      .toUpperCase();


  return (

    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]
        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:border-slate-700
      "
    >

      {/* DECORACIÓN */}

      <div
        className="
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          bg-indigo-50
          transition-transform
          duration-500
          group-hover:scale-125
          dark:bg-indigo-950/20
        "
      />


      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3.5
          "
        >

          <div
            className="
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-500
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-indigo-500/20
            "
          >

            {inicial}

          </div>


          <div className="min-w-0">

            <h3
              className="
                truncate
                text-sm
                font-black
                text-slate-900
                dark:text-white
              "
            >
              {nombreCompleto}
            </h3>


            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
              "
            >

              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    activo
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }
                `}
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  text-slate-400
                "
              >
                {activo
                  ? "Cuenta activa"
                  : "Cuenta inactiva"}
              </span>

            </div>

          </div>

        </div>


        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-400
            transition
            group-hover:text-indigo-500
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <UserRound size={16} />
        </div>

      </div>


      {/* =================================================
          INFORMACIÓN
      ================================================= */}

      <div
        className="
          relative
          mt-5
          space-y-2.5
        "
      >

        {/* CORREO */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-slate-50
            px-3.5
            py-3
            dark:bg-slate-800/70
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
              bg-white
              text-slate-400
              shadow-sm
              dark:bg-slate-700
            "
          >
            <Mail size={15} />
          </div>


          <div className="min-w-0">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Correo electrónico
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                font-semibold
                text-slate-700
                dark:text-slate-200
              "
              title={correo}
            >
              {correo}
            </p>

          </div>

        </div>


        {/* USUARIO */}

        {usuario && (

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-slate-50
              px-3.5
              py-3
              dark:bg-slate-800/70
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
                bg-white
                text-slate-400
                shadow-sm
                dark:bg-slate-700
              "
            >
              <UserRound size={15} />
            </div>


            <div className="min-w-0">

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Usuario
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                {usuario}
              </p>

            </div>

          </div>

        )}

      </div>


      {/* =================================================
          ACCIÓN
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          onChangePassword?.(docente)
        }
        className="
          relative
          mt-5
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-xl
          bg-slate-900
          text-sm
          font-bold
          text-white
          transition-all
          hover:bg-indigo-600
          active:scale-[0.98]
          dark:bg-slate-800
          dark:hover:bg-indigo-600
        "
      >

        <KeyRound size={16} />

        Cambiar contraseña

        <ArrowUpRight
          size={15}
          className="
            absolute
            right-3
            opacity-0
            transition
            group-hover:opacity-100
          "
        />

      </button>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        className="
          relative
          mt-3
          flex
          items-center
          justify-center
          gap-1.5
          text-[10px]
          font-semibold
          text-slate-400
        "
      >

        <ShieldCheck size={12} />

        Credenciales administradas por el sistema

      </div>

    </article>

  );

}
