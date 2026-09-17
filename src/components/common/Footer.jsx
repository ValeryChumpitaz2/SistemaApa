import {
  useState
} from "react";

import {
  Mail,
  ShieldCheck,
  Sparkles,
  Code2,
  Heart,
  X,
  UserRound,
  ExternalLink,
} from "lucide-react";


export default function Footer() {

  const [mostrarCreditos, setMostrarCreditos] = useState(false);


  return (

    <footer className="relative bg-slate-950 text-white overflow-hidden">

      {/* ==================================================
          DECORACIÓN DE FONDO
      ================================================== */}

      <div
        className="
          absolute
          -top-40
          -right-40
          w-96
          h-96
          rounded-full
          bg-blue-600/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -left-40
          w-96
          h-96
          rounded-full
          bg-indigo-600/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[30rem]
          h-[30rem]
          rounded-full
          bg-cyan-500/[0.03]
          blur-3xl
          pointer-events-none
        "
      />


      {/* ==================================================
          CONTENIDO
      ================================================== */}

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          py-14
          md:py-16
        "
      >

        {/* ==================================================
            BLOQUE PRINCIPAL
        ================================================== */}

        <div
          className="
            grid
            lg:grid-cols-[1.2fr_0.8fr]
            gap-10
            lg:gap-16
            items-center
          "
        >


          {/* ==================================================
              APP REVIEWER
          ================================================== */}

          <div>

            {/* MARCA */}

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-500
                  to-indigo-600
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-blue-900/30
                "
              >

                <Sparkles
                  size={23}
                  className="text-white"
                />

              </div>


              <div>

                <h2
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  APP Reviewer
                </h2>

                <p
                  className="
                    mt-0.5
                    text-sm
                    text-slate-400
                  "
                >
                  Plataforma Inteligente de revisión académica
                </p>

              </div>

            </div>


            {/* DESCRIPCIÓN */}

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                md:text-base
                leading-7
                text-slate-400
              "
            >
              Plataforma diseñada para apoyar el análisis,
              revisión y seguimiento de documentos académicos,
              facilitando la identificación de oportunidades
              de mejora antes de la entrega final.
            </p>


            {/* BADGES */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >

              <Badge
                icon={<ShieldCheck size={14} />}
                text="Revisión académica"
              />

              <Badge
                icon={<Code2 size={14} />}
                text="Desarrollo propio"
              />

            </div>

          </div>


          {/* ==================================================
              CONTACTO
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-6
              md:p-7
              shadow-xl
              shadow-black/10
              backdrop-blur-sm
            "
          >

            {/* DECORACIÓN TARJETA */}

            <div
              className="
                absolute
                -top-16
                -right-16
                w-40
                h-40
                rounded-full
                bg-cyan-400/10
                blur-3xl
                pointer-events-none
              "
            />


            {/* ENCABEZADO */}

            <div
              className="
                relative
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-cyan-400/10
                  border
                  border-cyan-400/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <Mail
                  size={20}
                  className="text-cyan-300"
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.16em]
                    font-bold
                    text-slate-500
                  "
                >
                  Más información
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  Estamos para ayudarte
                </p>

              </div>

            </div>


            {/* CORREO APP */}

            <a
              href="mailto:app.reviewer@vallegrande.edu.pe"
              className="
                group
                relative
                mt-6
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-4
                transition-all
                duration-300
                hover:bg-white/[0.08]
                hover:border-cyan-400/30
                hover:-translate-y-0.5
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <Mail
                  size={17}
                  className="
                    text-blue-400
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

              </div>


              <div className="min-w-0 flex-1">

                <p className="text-xs text-slate-500">
                  Correo de la plataforma
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-semibold
                    text-slate-200
                    break-all
                  "
                >
                  app.reviewer@vallegrande.edu.pe
                </p>

              </div>


              <ExternalLink
                size={15}
                className="
                  text-slate-600
                  group-hover:text-cyan-400
                  transition-colors
                  shrink-0
                "
              />

            </a>


            {/* TEXTO */}

            <p
              className="
                relative
                mt-4
                text-xs
                leading-5
                text-slate-500
              "
            >
              Para consultas, sugerencias o información
              relacionada con APP Reviewer.
            </p>

          </div>

        </div>


        {/* ==================================================
            SEPARADOR
        ================================================== */}

        <div
          className="
            mt-12
            pt-6
            border-t
            border-white/10
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
            "
          >


            {/* ==================================================
                COPYRIGHT + AUTOR
            ================================================== */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-2
                gap-y-1
                text-xs
                text-slate-500
              "
            >

              <span>
                © 2026 Valle Grande
              </span>

              <span className="text-slate-700">
                •
              </span>

              <span>
                APP Reviewer
              </span>

              <span className="text-slate-700">
                •
              </span>

              <span
                className="
                  text-slate-400
                  font-medium
                "
              >
                Desarrollado por Valery Chumpitaz
              </span>

            </div>


            {/* ==================================================
                CRÉDITOS
            ================================================== */}

            <button
              type="button"
              onClick={() => setMostrarCreditos(true)}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-xs
                font-semibold
                text-slate-500
                transition-all
                duration-300
                hover:border-blue-400/30
                hover:bg-blue-500/10
                hover:text-blue-300
              "
            >

              <Code2
                size={14}
                className="
                  text-blue-400
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-6
                "
              />

              Créditos de desarrollo

            </button>


            {/* ==================================================
                ESTADO
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-emerald-400
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-emerald-400
                  shadow
                  shadow-emerald-400/50
                "
              />

              Plataforma activa

            </div>

          </div>

        </div>

      </div>


      {/* ==================================================
          MODAL DE CRÉDITOS
      ================================================== */}

      {mostrarCreditos && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/70
            backdrop-blur-md
            px-5
            py-8
          "
          onClick={() => setMostrarCreditos(false)}
        >

          <div
            className="
              relative
              w-full
              max-w-md
              max-h-[90vh]
              overflow-y-auto
              rounded-[2rem]
              border
              border-white/10
              bg-slate-900
              p-7
              md:p-8
              shadow-2xl
              shadow-black/40
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* DECORACIÓN */}

            <div
              className="
                absolute
                -top-20
                -right-20
                w-48
                h-48
                rounded-full
                bg-blue-500/10
                blur-3xl
                pointer-events-none
              "
            />

            <div
              className="
                absolute
                -bottom-20
                -left-20
                w-48
                h-48
                rounded-full
                bg-indigo-500/10
                blur-3xl
                pointer-events-none
              "
            />


            {/* CERRAR */}

            <button
              type="button"
              onClick={() => setMostrarCreditos(false)}
              aria-label="Cerrar créditos"
              className="
                absolute
                top-5
                right-5
                w-9
                h-9
                rounded-xl
                bg-white/5
                border
                border-white/5
                text-slate-400
                flex
                items-center
                justify-center
                transition-all
                duration-200
                hover:bg-white/10
                hover:text-white
              "
            >

              <X size={18} />

            </button>


            {/* ICONO */}

            <div
              className="
                relative
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                flex
                items-center
                justify-center
                shadow-xl
                shadow-blue-900/30
              "
            >

              <Code2
                size={28}
                className="text-white"
              />

            </div>


            {/* TÍTULO */}

            <div className="relative mt-6">

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  font-bold
                  text-blue-400
                "
              >
                Créditos de desarrollo
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  md:text-3xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                APP Reviewer
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-400
                "
              >
                Plataforma Inteligente de revisión académica
              </p>

            </div>


            {/* ==================================================
                AUTORÍA
            ================================================== */}

            <div
              className="
                relative
                mt-7
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-blue-500/10
                    border
                    border-blue-500/10
                    text-blue-400
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <UserRound size={20} />

                </div>


                <div className="min-w-0">

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Desarrolladora
                  </p>

                  <p
                    className="
                      mt-0.5
                      font-bold
                      text-white
                    "
                  >
                    Valery Chumpitaz Caycho
                  </p>

                </div>

              </div>

            </div>


            {/* ==================================================
                DESCRIPCIÓN
            ================================================== */}

            <p
              className="
                relative
                mt-5
                text-sm
                leading-6
                text-slate-400
              "
            >
              APP Reviewer fue diseñado y desarrollado
              para apoyar la revisión y mejora de documentos
              académicos, facilitando el análisis de criterios
              y resultados.
            </p>


            {/* ==================================================
                CORREO DESARROLLADORA
            ================================================== */}

            <a
              href="mailto:valery.chumpitaz@vallegrande.edu.pe"
              className="
                group
                relative
                mt-5
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-3
                transition-all
                duration-200
                hover:bg-white/[0.08]
                hover:border-blue-400/20
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <Mail
                  size={17}
                  className="
                    text-blue-400
                    transition-transform
                    group-hover:scale-110
                  "
                />

              </div>


              <div className="min-w-0">

                <p className="text-xs text-slate-500">
                  Correo institucional
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-semibold
                    text-slate-200
                    break-all
                  "
                >
                  valery.chumpitaz@vallegrande.edu.pe
                </p>

              </div>

            </a>


            {/* ==================================================
                CORREO APP
            ================================================== */}

            <a
              href="mailto:app.reviewer@vallegrande.edu.pe"
              className="
                group
                relative
                mt-3
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-3
                transition-all
                duration-200
                hover:bg-white/[0.08]
                hover:border-cyan-400/20
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <Mail
                  size={17}
                  className="
                    text-cyan-400
                    transition-transform
                    group-hover:scale-110
                  "
                />

              </div>


              <div className="min-w-0">

                <p className="text-xs text-slate-500">
                  Correo de APP Reviewer
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-semibold
                    text-slate-200
                    break-all
                  "
                >
                  app.reviewer@vallegrande.edu.pe
                </p>

              </div>

            </a>


            {/* ==================================================
                PIE
            ================================================== */}

            <div
              className="
                relative
                mt-6
                pt-5
                border-t
                border-white/10
                flex
                items-start
                gap-2
                text-xs
                leading-5
                text-slate-500
              "
            >

              <Heart
                size={13}
                className="
                  mt-0.5
                  text-red-400
                  fill-red-400
                  shrink-0
                "
              />

              <span>
                Desarrollado por Valery Chumpitaz Caycho
                para la comunidad académica de Valle Grande.
              </span>

            </div>

          </div>

        </div>

      )}

    </footer>

  );

}


/* ==================================================
    BADGE
================================================== */

function Badge({
  icon,
  text,
}) {

  return (

    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/[0.04]
        px-3
        py-1.5
        text-xs
        font-semibold
        text-slate-400
      "
    >

      <span className="text-cyan-400">
        {icon}
      </span>

      {text}

    </div>

  );

}
