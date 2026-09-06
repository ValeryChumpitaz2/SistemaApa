import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";


export default function FinalCTA() {

  return (

    <section
      className="
        py-20
        md:py-24
        px-6
        bg-white
      "
    >

      <div
        className="
          relative
          max-w-6xl
          mx-auto
          overflow-hidden
          rounded-[2rem]
          bg-gradient-to-br
          from-slate-950
          via-blue-950
          to-indigo-800
          px-6
          py-14
          md:px-14
          md:py-16
          text-white
          shadow-2xl
          shadow-blue-950/20
        "
      >

        {/* ==================================================
            DECORACIÓN
        ================================================== */}

        <div
          className="
            absolute
            -top-32
            -right-32
            w-96
            h-96
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            absolute
            -top-20
            -right-20
            w-64
            h-64
            rounded-full
            bg-cyan-400/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-32
            w-80
            h-80
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />


        {/* ==================================================
            CONTENIDO
        ================================================== */}

        <div
          className="
            relative
            z-10
            max-w-3xl
            mx-auto
            text-center
          "
        >

          {/* ETIQUETA */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-300/20
              bg-white/10
              backdrop-blur-sm
              px-4
              py-2
              text-sm
              font-bold
              text-cyan-200
            "
          >

            <Sparkles size={15} />

            Empieza ahora

          </div>


          {/* TÍTULO */}

          <h2
            className="
              mt-6
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-black
              tracking-tight
              leading-tight
            "
          >

            Mejora tus documentos
            <span className="block text-cyan-300">
              antes de entregarlos
            </span>

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-5
              text-sm
              md:text-lg
              text-blue-100
              leading-relaxed
              max-w-2xl
              mx-auto
            "
          >

            Analiza tus trabajos académicos, identifica
            oportunidades de mejora y revisa los criterios
            establecidos por tu institución.

          </p>


          {/* BENEFICIOS */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              justify-center
              gap-x-6
              gap-y-3
              text-sm
              text-blue-100
            "
          >

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={16}
                className="text-cyan-300"
              />

              Análisis automatizado

            </div>


            <div className="flex items-center gap-2">

              <CheckCircle2
                size={16}
                className="text-cyan-300"
              />

              Criterios académicos

            </div>


            <div className="flex items-center gap-2">

              <CheckCircle2
                size={16}
                className="text-cyan-300"
              />

              Resultados organizados

            </div>

          </div>


          {/* BOTÓN */}

          <a
            href="/login"
            className="
              group
              mt-9
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-white
              text-slate-950
              px-7
              py-4
              text-sm
              md:text-base
              font-bold
              shadow-xl
              shadow-black/10
              transition-all
              duration-300
              hover:bg-blue-50
              hover:-translate-y-0.5
              hover:shadow-2xl
            "
          >

            Comenzar evaluación

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </a>


          {/* SEGURIDAD */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-blue-200/80
            "
          >

            <ShieldCheck size={14} />

            Acceso seguro para la comunidad académica de Valle Grande.

          </div>

        </div>

      </div>

    </section>

  );

}