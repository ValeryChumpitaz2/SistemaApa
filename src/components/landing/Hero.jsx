import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-screen
        flex
        items-center
        bg-gradient-to-br
        from-slate-950
        via-blue-950
        to-indigo-900
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
          w-[28rem]
          h-[28rem]
          rounded-full
          bg-blue-500/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-[28rem]
          h-[28rem]
          rounded-full
          bg-indigo-500/10
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
          w-full
          max-w-6xl
          mx-auto
          px-6
          lg:px-8
          pt-28
          pb-16
          lg:pt-32
          lg:pb-20
          grid
          lg:grid-cols-[1fr_370px]
          gap-12
          lg:gap-16
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
              border-white/10
              bg-white/5
              px-3.5
              py-1.5
              text-xs
              font-semibold
              text-blue-100
            "
          >

            <Sparkles
              size={13}
              className="text-cyan-300"
            />

            Revisión académica inteligente

          </div>


          {/* TÍTULO */}

          <h1
            className="
              mt-6
              text-4xl
              sm:text-5xl
              lg:text-[3.2rem]
              font-black
              leading-[1.05]
              tracking-tight
              max-w-xl
            "
          >

            Revisa tu documento

            <span
              className="
                block
                text-cyan-300
              "
            >
              antes de entregar
            </span>

          </h1>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-5
              max-w-lg
              text-base
              leading-7
              text-blue-100/75
            "
          >
            Comprueba la estructura, formato y contenido
            de tu documento académico e identifica qué
            aspectos necesitas mejorar.
          </p>


          {/* BOTÓN */}

          <div className="mt-7">

            <a
              href="/login"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2.5
                rounded-lg
                bg-white
                text-slate-900
                px-5
                py-3
                text-sm
                font-bold
                shadow-lg
                shadow-black/10
                transition-all
                duration-200
                hover:bg-blue-50
                hover:-translate-y-0.5
              "
            >

              Comenzar evaluación

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />

            </a>

          </div>


          {/* BENEFICIOS */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-xs
              text-blue-100/65
            "
          >

            <Beneficio texto="Revisión académica" />

            <Beneficio texto="Estructura y formato" />

            <Beneficio texto="Antes de entregar" />

          </div>

        </div>


        {/* ==================================================
            TARJETA
        ================================================== */}

        <div
          className="
            flex
            justify-center
            lg:justify-end
            lg:pt-4
          "
        >

          <div
            className="
              relative
              w-full
              max-w-[370px]
            "
          >

            {/* BRILLO */}

            <div
              className="
                absolute
                inset-6
                rounded-3xl
                bg-cyan-400/10
                blur-3xl
                pointer-events-none
              "
            />


            {/* TARJETA */}

            <div
              className="
                relative
                rounded-2xl
                bg-white
                text-slate-900
                shadow-2xl
                shadow-black/25
                overflow-hidden
                border
                border-white/10
              "
            >

              {/* ==================================================
                  DOCUMENTO
              ================================================== */}

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-slate-100
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >

                    <FileText size={18} />

                  </div>


                  <div className="min-w-0">

                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-800
                        truncate
                      "
                    >
                      ASE262_IS1_EN1_Estudiante
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        text-slate-400
                      "
                    >
                      Revisado el 11/09/2026 · 10:00 AM
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  RESULTADOS
              ================================================== */}

              <div className="px-5 py-4">

                <p
                  className="
                    mb-3
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                    text-blue-600
                  "
                >
                  Resultado de revisión
                </p>


                <div className="space-y-0.5">

                  <Resultado
                    nombre="Nombre de archivo"
                    correcto
                  />

                  <Resultado
                    nombre="Estructura de contenidos"
                    correcto
                  />

                  <Resultado
                    nombre="Aplicación de formatos de texto"
                    correcto
                  />

                  <Resultado
                    nombre="Conclusiones"
                  />

                  <Resultado
                    nombre="Referencias Bibliográficas"
                    correcto
                  />

                  <Resultado
                    nombre="Glosario"
                  />

                  <Resultado
                    nombre="Recomendaciones"
                    correcto
                  />

                </div>


                {/* ==================================================
                    92%
                ================================================== */}

                <div
                  className="
                    mt-4
                    rounded-xl
                    bg-blue-50
                    border
                    border-blue-100
                    px-4
                    py-3.5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-blue-500
                        "
                      >
                        Resultado
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-3xl
                          font-black
                          tracking-tight
                          text-blue-700
                        "
                      >
                        92%
                      </p>

                    </div>


                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <CheckCircle2
                        size={22}
                        className="text-blue-600"
                      />

                    </div>

                  </div>


                  <p
                    className="
                      mt-1.5
                      text-xs
                      leading-5
                      text-slate-600
                    "
                  >
                    Vas por buen camino. Revisa los detalles
                    del resultado e implementa las mejoras.
                  </p>

                </div>


                {/* ==================================================
                    ASPECTOS POR REVISAR
                ================================================== */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    text-amber-600
                  "
                >

                  <AlertCircle size={14} />

                  <span>
                    2 aspectos requieren revisión
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ==================================================
    BENEFICIO
================================================== */

function Beneficio({ texto }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <span
        className="
          w-1.5
          h-1.5
          rounded-full
          bg-cyan-300
          shrink-0
        "
      />

      <span>
        {texto}
      </span>

    </div>
  );
}


/* ==================================================
    RESULTADO
================================================== */

function Resultado({
  nombre,
  correcto = false,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        px-2.5
        py-2
        rounded-lg
        hover:bg-slate-50
        transition-colors
      "
    >

      <span
        className="
          text-xs
          font-medium
          text-slate-600
        "
      >
        {nombre}
      </span>


      <span
        className={`
          flex
          items-center
          gap-1.5
          text-xs
          font-bold
          shrink-0

          ${
            correcto
              ? "text-green-600"
              : "text-amber-600"
          }
        `}
      >

        {correcto ? (
          <CheckCircle2 size={14} />
        ) : (
          <AlertCircle size={14} />
        )}

        {correcto ? "OK" : "Revisar"}

      </span>

    </div>
  );
}
