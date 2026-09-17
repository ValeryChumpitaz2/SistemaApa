import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  BarChart3,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">

      {/* ==================================================
          FONDO
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_50%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(79,70,229,0.08),transparent_30%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-full
          max-w-6xl
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-slate-200
          to-transparent
        "
      />


      {/* ==================================================
          CONTENEDOR
      ================================================== */}

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-20
          "
        >

          {/* ==================================================
              IZQUIERDA
          ================================================== */}

          <div>

            {/* ETIQUETA */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-3.5
                py-1.5
                text-xs
                font-bold
                text-blue-700
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
                max-w-2xl
                text-4xl
                font-black
                leading-[1.08]
                tracking-tight
                text-slate-950
                sm:text-5xl
                lg:text-6xl
              "
            >

              Convierte la revisión
              <span className="block text-blue-600">
                en una oportunidad de mejora.
              </span>

            </h2>


            {/* DESCRIPCIÓN */}

            <p
              className="
                mt-6
                max-w-xl
                text-base
                leading-8
                text-slate-500
                md:text-lg
              "
            >
              Revisa tus documentos académicos, identifica los
              aspectos que puedes mejorar y obtén una visión más
              clara antes de realizar tu entrega.
            </p>


            {/* BENEFICIOS */}

            <div className="mt-8 space-y-4">

              <CheckItem
                icon={<FileCheck2 size={17} />}
                title="Revisión automatizada"
                text="Analiza los criterios definidos para tu documento."
              />

              <CheckItem
                icon={<BarChart3 size={17} />}
                title="Resultados organizados"
                text="Consulta los resultados de forma clara y estructurada."
              />

              <CheckItem
                icon={<GraduationCap size={17} />}
                title="Pensado para el entorno académico"
                text="Una herramienta de apoyo para estudiantes y docentes."
              />

            </div>

          </div>


          {/* ==================================================
              DERECHA
          ================================================== */}

          <div className="relative">

            {/* LÍNEA DECORATIVA */}

            <div
              className="
                absolute
                -left-7
                top-0
                hidden
                h-full
                w-px
                bg-gradient-to-b
                from-transparent
                via-blue-200
                to-transparent
                lg:block
              "
            />


            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-slate-950
                px-7
                py-9
                shadow-2xl
                shadow-blue-950/15
                sm:px-9
                sm:py-10
              "
            >

              {/* GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-blue-600/30
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-indigo-600/20
                  blur-3xl
                "
              />


              {/* CONTENIDO */}

              <div className="relative z-10">

                {/* ICONO */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-600/30
                  "
                >
                  <ShieldCheck size={22} />
                </div>


                {/* PEQUEÑO TÍTULO */}

                <p
                  className="
                    mt-7
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-blue-300
                  "
                >
                  Tu siguiente paso
                </p>


                <h3
                  className="
                    mt-3
                    text-2xl
                    font-black
                    leading-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  Revisa antes de entregar.
                </h3>


                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-slate-400
                  "
                >
                  Accede a APP Reviewer y selecciona el tipo de
                  usuario correspondiente para comenzar.
                </p>


                {/* BOTÓN */}

                <a
                  href="/login"
                  className="
                    group
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    bg-white
                    px-5
                    py-4
                    text-sm
                    font-black
                    text-slate-950
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-blue-50
                    hover:shadow-xl
                  "
                >

                  <span>
                    Ingresar a APP Reviewer
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-600
                      text-white
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >

                    <ArrowRight size={17} />

                  </span>

                </a>


                {/* SEGURIDAD */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-slate-500
                  "
                >

                  <CheckCircle2
                    size={14}
                    className="text-emerald-400"
                  />

                  Acceso seguro para la comunidad académica

                </div>

              </div>

            </div>


            {/* ==================================================
                ELEMENTOS DECORATIVOS EXTERNOS
            ================================================== */}

            <div
              className="
                absolute
                -bottom-5
                -right-5
                hidden
                h-20
                w-20
                rounded-2xl
                border
                border-blue-100
                bg-blue-50
                lg:block
              "
            />

            <div
              className="
                absolute
                -right-2
                -top-4
                h-3
                w-3
                rounded-full
                bg-blue-500
                shadow-lg
                shadow-blue-500/30
              "
            />

          </div>

        </div>


        {/* ==================================================
            PARTE INFERIOR
        ================================================== */}

        <div
          className="
            mt-20
            flex
            flex-col
            items-center
            justify-between
            gap-5
            border-t
            border-slate-100
            pt-7
            sm:flex-row
          "
        >

          <p className="text-xs text-slate-400">
            APP Reviewer · Revisión académica inteligente
          </p>


          <div className="flex items-center gap-5">

            <span className="text-xs font-semibold text-slate-400">
              Estudiantes
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <span className="text-xs font-semibold text-slate-400">
              Docentes
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <span className="text-xs font-semibold text-slate-400">
              Administradores
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ==================================================
    ITEM
================================================== */

function CheckItem({ icon, title, text }) {

  return (
    <div className="flex items-start gap-3">

      <div
        className="
          mt-0.5
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
        "
      >
        {icon}
      </div>


      <div>

        <p className="text-sm font-bold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}
