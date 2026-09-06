import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock3,
} from "lucide-react";


export default function Hero() {

  return (

    <section
      className="
        relative
        overflow-hidden
        min-h-[calc(100vh-80px)]
        flex
        items-center
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-indigo-800
        text-white
      "
    >

      {/* ==================================================
          DECORACIÓN DE FONDO
      ================================================== */}

      <div
        className="
          absolute
          -top-40
          -left-40
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-blue-500/20
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-indigo-500/20
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
          h-72
          w-72
          rounded-full
          bg-cyan-400/5
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
          w-full
          px-6
          lg:px-8
          py-20
          lg:py-24
          grid
          lg:grid-cols-[1.05fr_0.95fr]
          gap-14
          lg:gap-20
          items-center
        "
      >

        {/* ==================================================
            COLUMNA IZQUIERDA
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
              border-white/15
              bg-white/10
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-100
              backdrop-blur-md
            "
          >

            <span
              className="
                flex
                items-center
                justify-center
                w-5
                h-5
                rounded-full
                bg-cyan-400/20
              "
            >

              <Sparkles
                size={13}
                className="text-cyan-300"
              />

            </span>

            Plataforma académica inteligente

          </div>


          {/* TÍTULO */}

          <h1
            className="
              mt-7
              text-4xl
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-black
              leading-[1.05]
              tracking-tight
              max-w-3xl
            "
          >

            Evalúa tus trabajos

            <span
              className="
                block
                text-cyan-300
              "
            >
              antes de entregarlos.
            </span>

          </h1>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-7
              max-w-2xl
              text-base
              md:text-lg
              text-blue-100
              leading-8
            "
          >

            Analiza tus documentos académicos, revisa los
            criterios establecidos por la institución y
            descubre qué aspectos puedes mejorar antes
            de realizar tu entrega.

          </p>


          {/* BOTONES */}

          <div
            className="
              mt-9
              flex
              flex-col
              sm:flex-row
              gap-3
            "
          >

            <a
              href="/login"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-white
                text-slate-950
                px-7
                py-4
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


            <a
              href="#como-funciona"
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                bg-white/5
                px-7
                py-4
                font-semibold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white/10
                hover:border-white/30
              "
            >

              Cómo funciona

            </a>

          </div>


          {/* ==================================================
              BENEFICIOS
          ================================================== */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-sm
              text-blue-100
            "
          >

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={16}
                className="text-cyan-300"
              />

              Evaluación institucional

            </div>


            <div className="flex items-center gap-2">

              <Clock3
                size={16}
                className="text-cyan-300"
              />

              Resultados organizados

            </div>

          </div>

        </div>


        {/* ==================================================
            COLUMNA DERECHA
        ================================================== */}

        <div className="flex justify-center lg:justify-end">

          <div className="relative w-full max-w-md">


            {/* BRILLO DETRÁS */}

            <div
              className="
                absolute
                inset-0
                bg-cyan-400/10
                blur-3xl
                scale-90
              "
            />


            {/* ==================================================
                TARJETA PRINCIPAL
            ================================================== */}

            <div
              className="
                relative
                w-full
                rounded-[2rem]
                bg-white
                text-slate-900
                shadow-2xl
                shadow-black/30
                overflow-hidden
                border
                border-white/20
              "
            >

              {/* CABECERA */}

              <div
                className="
                  bg-slate-50
                  px-6
                  py-5
                  border-b
                  border-slate-200
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-100
                      text-blue-700
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <FileText size={23} />

                  </div>


                  <div className="flex-1 min-w-0">

                    <h3
                      className="
                        font-bold
                        text-slate-900
                        truncate
                      "
                    >

                      Trabajo_Final.docx

                    </h3>


                    <p className="text-sm text-slate-500">

                      Resultado del análisis

                    </p>

                  </div>


                  <div
                    className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-500
                    "
                  />

                </div>

              </div>


              {/* RESULTADOS */}

              <div className="p-6">

                <div className="space-y-5">

                  <Resultado
                    nombre="Formato APA"
                    valor="96%"
                    correcto
                  />

                  <Resultado
                    nombre="Referencias"
                    valor="100%"
                    correcto
                  />

                  <Resultado
                    nombre="Conclusiones"
                    valor="100%"
                    correcto
                  />

                  <Resultado
                    nombre="Márgenes"
                    valor="Revisar"
                  />

                  <Resultado
                    nombre="Estructura"
                    valor="Correcta"
                    correcto
                  />

                </div>


                {/* SEPARADOR */}

                <div className="my-6 border-t border-slate-100" />


                {/* RESULTADO GENERAL */}

                <div
                  className="
                    rounded-2xl
                    bg-green-50
                    border
                    border-green-200
                    p-5
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-green-600
                        "
                      >

                        Resultado general

                      </p>


                      <p
                        className="
                          mt-1
                          text-4xl
                          font-black
                          text-green-700
                        "
                      >

                        92%

                      </p>

                    </div>


                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-green-100
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <CheckCircle2
                        className="text-green-600"
                        size={27}
                      />

                    </div>

                  </div>


                  <p
                    className="
                      mt-3
                      text-sm
                      text-green-700
                    "
                  >

                    Documento listo para revisar.

                  </p>

                </div>


                {/* PIE DE TARJETA */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    text-slate-400
                  "
                >

                  <ShieldCheck size={13} />

                  Evaluación automatizada

                </div>

              </div>

            </div>


            {/* ==================================================
                BADGE FLOTANTE
            ================================================== */}

            <div
              className="
                absolute
                -bottom-5
                -left-4
                sm:-left-8
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white
                px-4
                py-3
                shadow-xl
                border
                border-slate-100
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-blue-100
                  text-blue-700
                  flex
                  items-center
                  justify-center
                "
              >

                <Sparkles size={17} />

              </div>


              <div>

                <p className="text-xs text-slate-400">
                  Análisis completado
                </p>

                <p className="text-sm font-bold text-slate-800">
                  Resultado disponible
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}


/* ==================================================
    COMPONENTE RESULTADO
================================================== */

function Resultado({
  nombre,
  valor,
  correcto = false,
}) {

  return (

    <div className="flex items-center justify-between gap-4">

      <span
        className="
          text-sm
          font-semibold
          text-slate-700
        "
      >

        {nombre}

      </span>


      <span
        className={`
          flex
          items-center
          gap-2
          text-sm
          font-bold
          whitespace-nowrap
          ${
            correcto
              ? "text-green-600"
              : "text-amber-600"
          }
        `}
      >

        {correcto ? (

          <CheckCircle2 size={17} />

        ) : (

          <AlertCircle size={17} />

        )}

        {valor}

      </span>

    </div>

  );

} 