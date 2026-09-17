import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  BarChart3,
} from "lucide-react";

export default function FinalCTA() {

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-slate-50
        py-20
        md:py-28
      "
    >

      {/* ==================================================
          DECORACIÓN DE FONDO
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-blue-100/50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-80
          w-80
          rounded-full
          bg-indigo-100/50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-80
          w-80
          rounded-full
          bg-cyan-100/40
          blur-3xl
        "
      />


      {/* ==================================================
          CONTENEDOR
      ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-6
          lg:px-8
        "
      >

        {/* ==================================================
            CABECERA
        ================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          {/* ETIQUETA */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-white
              px-4
              py-2
              text-xs
              font-bold
              text-blue-700
              shadow-sm
            "
          >

            <Sparkles
              size={14}
              className="text-blue-600"
            />

            APP Reviewer

          </div>


          {/* TÍTULO */}

          <h2
            className="
              mt-6
              text-4xl
              font-black
              leading-[1.08]
              tracking-tight
              text-slate-950
              sm:text-5xl
              md:text-6xl
            "
          >

            Revisa.
            <span className="text-blue-600">
              {" "}Mejora.
            </span>
            <br />

            Entrega con mayor claridad.

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-slate-500
              md:text-lg
            "
          >

            APP Reviewer te ayuda a analizar tus documentos
            académicos e identificar aspectos que puedes
            fortalecer antes de realizar tu entrega.

          </p>

        </div>


        {/* ==================================================
            BLOQUE PRINCIPAL
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-12
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-xl
            shadow-slate-900/5
          "
        >

          {/* Línea superior */}

          <div
            className="
              h-1
              w-full
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-indigo-600
            "
          />


          <div
            className="
              grid
              lg:grid-cols-[1fr_auto]
              lg:items-center
            "
          >

            {/* ==================================================
                INFORMACIÓN
            ================================================== */}

            <div className="p-7 sm:p-9 md:p-10">

              <div className="flex items-start gap-4">

                {/* ICONO */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-blue-600
                  "
                >

                  <FileCheck2 size={23} />

                </div>


                <div>

                  <p
                    className="
                      text-lg
                      font-black
                      text-slate-900
                    "
                  >
                    Todo listo para comenzar
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Accede a la plataforma y selecciona
                    el tipo de usuario correspondiente.
                  </p>

                </div>

              </div>


              {/* ==================================================
                  BENEFICIOS
              ================================================== */}

              <div
                className="
                  mt-7
                  grid
                  gap-4
                  sm:grid-cols-3
                "
              >

                <InfoItem
                  icon={<GraduationCap size={16} />}
                  text="Estudiantes"
                />

                <InfoItem
                  icon={<BarChart3 size={16} />}
                  text="Docentes"
                />

                <InfoItem
                  icon={<ShieldCheck size={16} />}
                  text="Administradores"
                />

              </div>

            </div>


            {/* ==================================================
                ACCIÓN
            ================================================== */}

            <div
              className="
                border-t
                border-slate-100
                bg-slate-50/70
                p-7
                sm:p-9
                lg:border-l
                lg:border-t-0
                lg:p-10
              "
            >

              <p
                className="
                  mb-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Acceso a la plataforma
              </p>


              <a
                href="/login"
                className="
                  group
                  flex
                  min-w-[220px]
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-4
                  text-sm
                  font-black
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-700
                  hover:shadow-xl
                  hover:shadow-blue-600/25
                "
              >

                Comenzar ahora

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/15
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >

                  <ArrowRight size={16} />

                </span>

              </a>


              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[11px]
                  text-slate-400
                "
              >

                <CheckCircle2
                  size={13}
                  className="text-emerald-500"
                />

                Acceso seguro

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            FRASE FINAL
        ================================================== */}

        <div className="mt-10 text-center">

          <div
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-medium
              text-slate-400
            "
          >

            <span className="h-px w-8 bg-slate-200" />

            APP Reviewer

            <span className="h-px w-8 bg-slate-200" />

          </div>

        </div>

      </div>

    </section>
  );
}


/* ==================================================
    ITEM INFORMACIÓN
================================================== */

function InfoItem({ icon, text }) {

  return (

    <div
      className="
        flex
        items-center
        gap-2.5
        rounded-xl
        border
        border-slate-100
        bg-slate-50
        px-3.5
        py-3
      "
    >

      <span className="text-blue-600">
        {icon}
      </span>

      <span
        className="
          text-xs
          font-bold
          text-slate-600
        "
      >
        {text}
      </span>

    </div>

  );
}
