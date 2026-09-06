import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-24 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-blue-950
            via-blue-900
            to-indigo-700
            px-6
            py-14
            md:px-14
            md:py-16
            text-white
            shadow-2xl
            shadow-blue-900/20
          "
        >

          {/* ==================================================
              DECORACIÓN DE FONDO
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
              bg-blue-400/20
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
              bg-indigo-400/20
              blur-3xl
            "
          />

          {/* Pequeños puntos decorativos */}

          <div
            className="
              absolute
              top-12
              left-12
              w-2
              h-2
              rounded-full
              bg-blue-300/50
            "
          />

          <div
            className="
              absolute
              top-20
              left-20
              w-1.5
              h-1.5
              rounded-full
              bg-white/30
            "
          />

          <div
            className="
              absolute
              bottom-14
              right-20
              w-2
              h-2
              rounded-full
              bg-white/20
            "
          />

          {/* ==================================================
              CONTENIDO
          ================================================== */}

          <div className="relative z-10 max-w-3xl mx-auto text-center">

            {/* ICONO */}

            <div className="flex justify-center">

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <Sparkles
                  size={29}
                  className="text-blue-200"
                />
              </div>

            </div>

            {/* ETIQUETA */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                mt-7
                px-3
                py-1.5
                rounded-full
                bg-white/10
                border
                border-white/10
                text-xs
                font-semibold
                text-blue-100
              "
            >
              <ShieldCheck size={13} />

              Evaluación académica inteligente
            </div>

            {/* TÍTULO */}

            <h2
              className="
                mt-5
                text-3xl
                md:text-4xl
                lg:text-5xl
                font-black
                tracking-tight
                leading-tight
              "
            >
              ¿Listo para mejorar
              <span className="block text-blue-300">
                tu trabajo académico?
              </span>
            </h2>

            {/* DESCRIPCIÓN */}

            <p
              className="
                mt-5
                text-blue-100
                text-sm
                md:text-base
                leading-relaxed
                max-w-2xl
                mx-auto
              "
            >
              Revisa tus documentos antes de entregarlos, identifica
              oportunidades de mejora y conoce qué aspectos puedes
              fortalecer.
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
                  className="text-blue-300"
                />
                Revisión automatizada
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-blue-300"
                />
                Criterios de evaluación
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-blue-300"
                />
                Resultados organizados
              </div>

            </div>

            {/* BOTÓN */}

            <a
              href="/login"
              className="
                mt-9
                inline-flex
                items-center
                justify-center
                gap-3
                bg-white
                text-blue-950
                px-7
                py-4
                rounded-xl
                font-bold
                text-sm
                md:text-base
                shadow-xl
                shadow-black/10
                transition-all
                duration-300
                hover:bg-blue-50
                hover:shadow-2xl
                hover:-translate-y-0.5
                group
              "
            >

              Ingresar a VG Smart Review

              <ArrowRight
                size={19}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </a>

            {/* TEXTO INFERIOR */}

            <p className="mt-5 text-xs text-blue-200/80">
              Acceso seguro para la comunidad académica de Valle Grande.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}