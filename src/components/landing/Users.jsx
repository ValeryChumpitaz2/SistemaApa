import {
  GraduationCap,
  UserRound,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";


export default function Users() {

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        md:py-28
      "
    >

      {/* ==================================================
          FONDO
      ================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            w-[700px]
            h-[300px]
            rounded-full
            bg-blue-50
            blur-3xl
            opacity-70
          "
        />

        <div
          className="
            absolute
            -left-40
            bottom-0
            w-80
            h-80
            rounded-full
            bg-indigo-50
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            top-40
            w-80
            h-80
            rounded-full
            bg-cyan-50
            blur-3xl
          "
        />

      </div>


      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="max-w-3xl mx-auto text-center">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-blue-700
              shadow-sm
            "
          >

            <Sparkles
              size={14}
              className="text-blue-600"
            />

            Comunidad académica

          </div>


          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              leading-[1.05]
              tracking-tight
              text-slate-950
            "
          >

            Una plataforma para

            <span
              className="
                block
                mt-1
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              toda la comunidad
            </span>

          </h2>


          <p
            className="
              mt-6
              max-w-2xl
              mx-auto
              text-base
              md:text-lg
              leading-8
              text-slate-500
            "
          >

            Cada usuario dispone de herramientas específicas
            para revisar, evaluar y gestionar los trabajos
            académicos de forma organizada.

          </p>

        </div>


        {/* ==================================================
            TARJETAS
        ================================================== */}

        <div
          className="
            mt-16
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            lg:gap-7
          "
        >

          {/* ==================================================
              ESTUDIANTE
          ================================================== */}

          <UserCard

            number="01"

            icon={<GraduationCap size={30} />}

            title="Estudiantes"

            label="Área académica"

            description="
              Revisa tus trabajos antes de entregarlos,
              identifica errores y recibe recomendaciones
              para mejorar tus documentos.
            "

            benefits={[
              "Corrección de redacción",
              "Detección de errores",
              "Sugerencias con IA",
              "Retroalimentación inmediata",
            ]}

            buttonText="Ingresar como estudiante"

            href="/login/estudiante"

            color="blue"

          />


          {/* ==================================================
              DOCENTE
          ================================================== */}

          <UserCard

            number="02"

            icon={<UserRound size={30} />}

            title="Docentes"

            label="Área de evaluación"

            description="
              Evalúa documentos de forma eficiente,
              analiza entregables y realiza seguimiento
              del progreso académico.
            "

            benefits={[
              "Revisión masiva",
              "Integración con Drive",
              "Reportes automáticos",
              "Historial de consolidación",
            ]}

            buttonText="Ingresar como docente"

            href="/login/docente"

            color="indigo"

          />


          {/* ==================================================
              ADMINISTRADOR
          ================================================== */}

          <UserCard

            number="03"

            icon={<ShieldCheck size={30} />}

            title="Administradores"

            label="Área de gestión"

            description="
              Gestiona las cuentas docentes y administra
              el acceso a la plataforma de manera segura
              y organizada.
            "

            benefits={[
              "Gestión de cuentas docentes",
              "Recuperación de contraseñas",
              "Administración de accesos",
              "Gestión segura del sistema",
            ]}

            buttonText="Ingresar como administrador"

            href="/login/administrador"

            color="violet"

          />

        </div>


        {/* ==================================================
            MENSAJE INFERIOR
        ================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
            text-center
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-full
              bg-emerald-50
              text-emerald-600
              border
              border-emerald-100
            "
          >

            <Check
              size={17}
              strokeWidth={3}
            />

          </div>


          <p
            className="
              text-sm
              text-slate-500
            "
          >

            Un mismo entorno para revisar, evaluar y
            gestionar la actividad académica.

          </p>

        </div>

      </div>

    </section>

  );

}


/* ==================================================
    TARJETA DE USUARIO
================================================== */

function UserCard({
  number,
  icon,
  title,
  label,
  description,
  benefits,
  buttonText,
  href,
  color,
}) {

  const themes = {

    blue: {

      line:
        "from-blue-500 to-cyan-400",

      icon:
        "bg-blue-50 text-blue-600 border-blue-100",

      iconHover:
        "group-hover:bg-blue-600 group-hover:text-white",

      label:
        "bg-blue-50 text-blue-700 border-blue-100",

      button:
        "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",

      check:
        "bg-blue-50 text-blue-600",

      border:
        "hover:border-blue-200",

      glow:
        "group-hover:bg-blue-400/10",

    },


    indigo: {

      line:
        "from-indigo-500 to-blue-500",

      icon:
        "bg-indigo-50 text-indigo-600 border-indigo-100",

      iconHover:
        "group-hover:bg-indigo-600 group-hover:text-white",

      label:
        "bg-indigo-50 text-indigo-700 border-indigo-100",

      button:
        "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20",

      check:
        "bg-indigo-50 text-indigo-600",

      border:
        "hover:border-indigo-200",

      glow:
        "group-hover:bg-indigo-400/10",

    },


    violet: {

      line:
        "from-violet-500 to-fuchsia-500",

      icon:
        "bg-violet-50 text-violet-600 border-violet-100",

      iconHover:
        "group-hover:bg-violet-600 group-hover:text-white",

      label:
        "bg-violet-50 text-violet-700 border-violet-100",

      button:
        "bg-violet-600 hover:bg-violet-700 shadow-violet-600/20",

      check:
        "bg-violet-50 text-violet-600",

      border:
        "hover:border-violet-200",

      glow:
        "group-hover:bg-violet-400/10",

    },

  };


  const theme = themes[color];


  return (

    <article
      className={`
        group
        relative
        overflow-hidden
        flex
        flex-col
        min-h-[475px]
        rounded-[2rem]
        border
        border-slate-200
        bg-white
        p-7
        md:p-8
        shadow-[0_10px_35px_-15px_rgba(15,23,42,0.15)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_25px_55px_-20px_rgba(15,23,42,0.20)]
        ${theme.border}
      `}
    >

      {/* ==================================================
          LÍNEA SUPERIOR
      ================================================== */}

      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-1
          bg-gradient-to-r
          ${theme.line}
        `}
      />


      {/* ==================================================
          BRILLO
      ================================================== */}

      <div
        className={`
          absolute
          -right-20
          -top-20
          w-48
          h-48
          rounded-full
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          ${theme.glow}
        `}
      />


      <div className="relative flex flex-col h-full">


        {/* ==================================================
            CABECERA
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div
            className={`
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              border
              ${theme.icon}
              ${theme.iconHover}
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:shadow-lg
            `}
          >

            {icon}

          </div>


          <span
            className="
              text-xs
              font-black
              tracking-[0.2em]
              text-slate-300
            "
          >

            {number}

          </span>

        </div>


        {/* ==================================================
            TÍTULO
        ================================================== */}

        <div className="mt-6">

          <span
            className={`
              inline-flex
              rounded-full
              border
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              ${theme.label}
            `}
          >

            {label}

          </span>


          <h3
            className="
              mt-3
              text-2xl
              font-black
              tracking-tight
              text-slate-950
            "
          >

            {title}

          </h3>

        </div>


        {/* ==================================================
            DESCRIPCIÓN
        ================================================== */}

        <p
          className="
            mt-4
            text-sm
            leading-7
            text-slate-500
          "
        >

          {description}

        </p>


        {/* ==================================================
            BENEFICIOS
        ================================================== */}

        <div
          className="
            mt-6
            pt-5
            border-t
            border-slate-100
          "
        >

          <p
            className="
              mb-3
              text-[10px]
              font-black
              uppercase
              tracking-[0.15em]
              text-slate-400
            "
          >

            Incluye

          </p>


          <ul className="space-y-3">

            {benefits.map((benefit, index) => (

              <li
                key={index}
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-slate-600
                "
              >

                <span
                  className={`
                    flex
                    items-center
                    justify-center
                    w-5
                    h-5
                    rounded-full
                    shrink-0
                    ${theme.check}
                  `}
                >

                  <Check
                    size={12}
                    strokeWidth={3}
                  />

                </span>


                <span>
                  {benefit}
                </span>

              </li>

            ))}

          </ul>

        </div>


        {/* ==================================================
            BOTÓN
        ================================================== */}

        <div className="mt-auto pt-7">

          <a
            href={href}
            className={`
              flex
              items-center
              justify-center
              gap-2
              w-full
              rounded-xl
              px-5
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-xl
              ${theme.button}
            `}
          >

            {buttonText}

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />

          </a>

        </div>

      </div>

    </article>

  );

}
