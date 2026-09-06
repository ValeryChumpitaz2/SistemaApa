import {
  X,
  Mail,
  CalendarDays,
  Clock,
  LogIn,
  UserRound,
  GraduationCap,
  Phone,
  CreditCard,
  VenusAndMars,
  UsersRound,
  BadgeCheck,
} from "lucide-react";


// =====================================================
// MODAL VER ESTUDIANTE
// =====================================================

export default function VerEstudianteModal({
  estudiante,
  onClose,
}) {

  if (!estudiante) {
    return null;
  }


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
    "Sin celular";

  const sexo =
    estudiante?.sexo ||
    "Sin especificar";

  const tutor =
    estudiante?.tutor ||
    "Sin tutor";

  const apto =
    estudiante?.apto ||
    "";

  const accesos =
    Number(
      estudiante?.cantidadAccesos
    ) || 0;


  // ===================================================
  // FORMATEAR FECHA
  // ===================================================

  function formatearFecha(
    fecha,
    incluirHora = true
  ) {

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
      incluirHora
        ? {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        : {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
    );

  }


  // ===================================================
  // FOTO FALLBACK
  // ===================================================

  function imagenFallback(event) {

    event.currentTarget.style.display =
      "none";

    const contenedor =
      event.currentTarget.parentElement;

    if (contenedor) {

      contenedor.classList.add(
        "flex",
        "items-center",
        "justify-center"
      );

      const icono =
        document.createElement("div");

      icono.innerHTML =
        "👤";

      icono.className =
        "text-3xl";

      contenedor.appendChild(
        icono
      );

    }

  }


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/60
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          onClose();

        }

      }}
    >

      <div
        className="
          max-h-[92vh]
          w-full
          max-w-2xl
          overflow-y-auto
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            px-6
            py-4
            dark:border-slate-800
          "
        >

          <div>

            <p
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.14em]
                text-indigo-500
              "
            >
              Información del estudiante
            </p>

            <h2
              className="
                mt-1
                text-lg
                font-black
                text-slate-900
                dark:text-white
              "
            >
              Perfil académico
            </h2>

          </div>


          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >

            <X size={19} />

          </button>

        </div>


        {/* =================================================
            PERFIL
        ================================================= */}

        <div className="px-6 py-6">

          <div
            className="
              flex
              flex-col
              items-center
              text-center
            "
          >

            {/* FOTO */}

            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-slate-100
                shadow-sm
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
                  onError={
                    imagenFallback
                  }
                />

              ) : (

                <UserRound
                  size={42}
                  className="text-slate-400"
                />

              )}

            </div>


            {/* NOMBRE */}

            <h3
              className="
                mt-4
                max-w-xl
                text-xl
                font-black
                text-slate-900
                dark:text-white
              "
            >
              {nombre}
            </h3>


            {/* CORREO */}

            <div
              className="
                mt-1
                flex
                max-w-full
                items-center
                gap-1.5
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >

              <Mail
                size={14}
                className="shrink-0"
              />

              <span className="truncate">
                {correo}
              </span>

            </div>


            {/* SEMESTRE */}

            <span
              className="
                mt-3
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-indigo-50
                px-3
                py-1.5
                text-xs
                font-black
                text-indigo-600
                dark:bg-indigo-950/40
                dark:text-indigo-400
              "
            >

              <GraduationCap size={14} />

              Semestre {semestre}

            </span>

          </div>


          {/* =================================================
              INFORMACIÓN PERSONAL
          ================================================= */}

          <div className="mt-7">

            <p
              className="
                mb-3
                text-xs
                font-black
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Información personal
            </p>


            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              "
            >

              {/* DNI */}

              <Dato
                icon={
                  <CreditCard size={16} />
                }
                label="DNI"
                value={dni}
              />


              {/* CELULAR */}

              <Dato
                icon={
                  <Phone size={16} />
                }
                label="Celular"
                value={celular}
              />


              {/* SEXO */}

              <Dato
                icon={
                  <VenusAndMars size={16} />
                }
                label="Sexo"
                value={sexo}
              />


              {/* TUTOR */}

              <Dato
                icon={
                  <UsersRound size={16} />
                }
                label="Tutor"
                value={tutor}
              />

            </div>

          </div>


          {/* =================================================
              ACTIVIDAD
          ================================================= */}

          <div className="mt-7">

            <p
              className="
                mb-3
                text-xs
                font-black
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Actividad del sistema
            </p>


            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              "
            >

              {/* FECHA REGISTRO */}

              <Dato
                icon={
                  <CalendarDays size={16} />
                }
                label="Fecha de registro"
                value={
                  formatearFecha(
                    estudiante?.fechaRegistro,
                    false
                  )
                }
              />


              {/* ÚLTIMO ACCESO */}

              <Dato
                icon={
                  <Clock size={16} />
                }
                label="Último acceso"
                value={
                  formatearFecha(
                    estudiante?.ultimoAcceso
                  )
                }
              />


              {/* ACCESOS */}

              <div
                className="
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-emerald-50/60
                  p-4
                  dark:border-emerald-900/50
                  dark:bg-emerald-950/20
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >

                  <LogIn size={16} />

                  Cantidad de accesos

                </div>

                <p
                  className="
                    mt-2
                    text-2xl
                    font-black
                    text-emerald-700
                    dark:text-emerald-300
                  "
                >
                  {accesos}
                </p>

              </div>


              {/* APTO */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  dark:border-slate-700
                  dark:bg-slate-800/60
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    text-slate-400
                  "
                >

                  <BadgeCheck size={16} />

                  Estado académico

                </div>

                <p
                  className="
                    mt-2
                    text-sm
                    font-black
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {apto || "Sin información"}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


// =====================================================
// COMPONENTE DATO
// =====================================================

function Dato({
  icon,
  label,
  value,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          font-bold
          text-slate-400
        "
      >

        {icon}

        {label}

      </div>

      <p
        className="
          mt-2
          text-sm
          font-bold
          text-slate-800
          dark:text-slate-200
        "
      >
        {value || "Sin información"}
      </p>

    </div>

  );

}
