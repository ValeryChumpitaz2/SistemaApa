import {
  Mail,
  Clock,
  Eye,
  LogIn,
  UserRound,
  Phone,
  CreditCard,
  GraduationCap,
} from "lucide-react";


// =====================================================
// ESTUDIANTE CARD
// =====================================================

export default function EstudianteCard({
  estudiante,
  onView,
}) {

  const nombre =
    estudiante?.nombre ||
    "Estudiante sin nombre";

  const correo =
    estudiante?.correo ||
    "Sin correo";

  const foto =
    estudiante?.foto ||
    "";

  const semestre =
    estudiante?.semestre ||
    "NO DEFINIDO";

  const dni =
    estudiante?.dni ||
    "Sin DNI";

  const celular =
    estudiante?.celular ||
    "";

  const accesos =
    Number(
      estudiante?.cantidadAccesos
    ) || 0;


  // ===================================================
  // FORMATEAR FECHA
  // ===================================================

  function formatearFecha(fecha) {

    if (
      fecha === null ||
      fecha === undefined ||
      fecha === ""
    ) {
      return "Sin registros";
    }


    let date;


    if (
      fecha instanceof Date
    ) {

      date = fecha;

    }
    else if (
      typeof fecha === "object" &&
      fecha?.seconds
    ) {

      date =
        new Date(
          Number(fecha.seconds) * 1000
        );

    }
    else {

      date =
        new Date(fecha);

    }


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return "Sin registros";

    }


    return date.toLocaleString(
      "es-PE",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  }


  return (

    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-indigo-200
        hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:border-indigo-900
      "
    >

      <div className="p-5">

        {/* =================================================
            PERFIL
        ================================================= */}

        <div className="flex items-start gap-4">

          {/* FOTO */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-slate-100
              dark:border-slate-700
              dark:bg-slate-800
            "
          >

            {foto ? (

              <img
                src={foto}
                alt={nombre}
                className="
                  h-full
                  w-full
                  object-cover
                "
                onError={(event) => {

                  event.currentTarget.style.display =
                    "none";

                }}
              />

            ) : (

              <UserRound
                size={25}
                className="text-slate-400"
              />

            )}

          </div>


          {/* INFORMACIÓN */}

          <div className="min-w-0 flex-1">

            <h3
              className="
                truncate
                text-base
                font-black
                text-slate-900
                dark:text-white
              "
              title={nombre}
            >
              {nombre}
            </h3>


            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >

              <Mail
                size={13}
                className="shrink-0"
              />

              <span
                className="truncate"
                title={correo}
              >
                {correo}
              </span>

            </div>

          </div>


          {/* SEMESTRE */}

          <span
            className="
              shrink-0
              rounded-full
              bg-indigo-50
              px-2.5
              py-1
              text-[10px]
              font-black
              uppercase
              tracking-wide
              text-indigo-600
              dark:bg-indigo-950/40
              dark:text-indigo-400
            "
          >
            {semestre}
          </span>

        </div>


        {/* =================================================
            DATOS RÁPIDOS
        ================================================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-3
          "
        >

          {/* DNI */}

          <div
            className="
              rounded-xl
              bg-slate-50
              p-3
              dark:bg-slate-800/70
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[11px]
                font-bold
                text-slate-400
              "
            >

              <CreditCard size={13} />

              DNI

            </div>

            <p
              className="
                mt-1.5
                truncate
                text-xs
                font-bold
                text-slate-700
                dark:text-slate-200
              "
            >
              {dni}

            </p>

          </div>


          {/* CELULAR */}

          <div
            className="
              rounded-xl
              bg-slate-50
              p-3
              dark:bg-slate-800/70
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[11px]
                font-bold
                text-slate-400
              "
            >

              <Phone size={13} />

              Celular

            </div>

            <p
              className="
                mt-1.5
                truncate
                text-xs
                font-bold
                text-slate-700
                dark:text-slate-200
              "
            >
              {celular || "Sin celular"}

            </p>

          </div>

        </div>


        {/* =================================================
            ACCESO
        ================================================= */}

        <div
          className="
            mt-3
            grid
            grid-cols-2
            gap-3
          "
        >

          {/* ÚLTIMO ACCESO */}

          <div
            className="
              rounded-xl
              bg-slate-50
              p-3
              dark:bg-slate-800/70
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[11px]
                font-bold
                text-slate-400
              "
            >

              <Clock size={13} />

              Último acceso

            </div>

            <p
              className="
                mt-1.5
                truncate
                text-xs
                font-bold
                text-slate-700
                dark:text-slate-200
              "
              title={
                formatearFecha(
                  estudiante?.ultimoAcceso
                )
              }
            >
              {formatearFecha(
                estudiante?.ultimoAcceso
              )}
            </p>

          </div>


          {/* ACCESOS */}

          <div
            className="
              rounded-xl
              bg-emerald-50
              p-3
              dark:bg-emerald-950/30
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[11px]
                font-bold
                text-emerald-600
                dark:text-emerald-400
              "
            >

              <LogIn size={13} />

              Accesos

            </div>

            <p
              className="
                mt-1.5
                text-xs
                font-black
                text-emerald-700
                dark:text-emerald-300
              "
            >
              {accesos}
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        className="
          border-t
          border-slate-100
          bg-slate-50/70
          px-5
          py-3
          dark:border-slate-800
          dark:bg-slate-900/70
        "
      >

        <button
          type="button"
          onClick={() =>
            onView?.(estudiante)
          }
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-900
            px-4
            py-2.5
            text-xs
            font-black
            text-white
            transition
            hover:bg-indigo-600
            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-indigo-500
            dark:hover:text-white
          "
        >

          <Eye size={15} />

          Ver estudiante

        </button>

      </div>

    </article>

  );

}
