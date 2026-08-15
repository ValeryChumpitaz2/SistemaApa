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

      {/* Luces */}

      <div
        className="
          absolute
          -top-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-blue-500/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-80
          w-80
          rounded-full
          bg-indigo-500/20
          blur-3xl
        "
      />


      <div
        className="
          relative
          max-w-7xl
          mx-auto
          w-full
          px-6
          lg:px-8
          py-20
          grid
          lg:grid-cols-2
          gap-16
          items-center
        "
      >

        {/* IZQUIERDA */}

        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white/10
              px-4
              py-2
              text-sm
              backdrop-blur
            "
          >

            <Sparkles size={16} />

            Plataforma académica inteligente

          </div>


          <h1
            className="
              mt-6
              text-5xl
              lg:text-6xl
              font-black
              leading-tight
            "
          >

            Evalúa tus trabajos

            <span className="text-cyan-300">
              {" "}antes de entregarlos.
            </span>

          </h1>


          <p
            className="
              mt-6
              max-w-xl
              text-lg
              text-blue-100
              leading-8
            "
          >

            Analiza automáticamente tus documentos académicos,
            revisa criterios institucionales y descubre qué aspectos
            puedes mejorar antes de realizar tu entrega.

          </p>


          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/login"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                text-slate-900
                px-7
                py-4
                font-bold
                hover:scale-105
                transition
              "
            >

              Comenzar evaluación

              <ArrowRight size={18} />

            </a>


            <a
              href="#como-funciona"
              className="
                rounded-xl
                border
                border-white/30
                px-7
                py-4
                font-semibold
                hover:bg-white/10
                transition
              "
            >

              Cómo funciona

            </a>

          </div>


          {/* MINI ESTADÍSTICAS */}

          <div className="mt-12 flex flex-wrap gap-8">

            <div>

              <p className="text-2xl font-black">
                APA
              </p>

              <p className="text-blue-200 text-sm">
                Validación
              </p>

            </div>


            <div>

              <p className="text-2xl font-black">
                IA
              </p>

              <p className="text-blue-200 text-sm">
                Análisis
              </p>

            </div>


            <div>

              <p className="text-2xl font-black">
                Rápido
              </p>

              <p className="text-blue-200 text-sm">
                Resultado
              </p>

            </div>

          </div>

        </div>


        {/* DERECHA */}

        <div className="flex justify-center">

          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              text-slate-900
              shadow-2xl
              overflow-hidden
            "
          >

            <div
              className="
                bg-slate-100
                px-6
                py-5
                border-b
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    rounded-xl
                    bg-blue-100
                    p-3
                  "
                >

                  <FileText
                    className="text-blue-700"
                    size={24}
                  />

                </div>


                <div>

                  <h3 className="font-bold">
                    Trabajo_Final.docx
                  </h3>

                  <p className="text-sm text-slate-500">
                    Resultado del análisis
                  </p>

                </div>

              </div>

            </div>


            <div className="p-6 space-y-5">

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


              <div className="pt-5 border-t">

                <div
                  className="
                    rounded-xl
                    bg-green-50
                    border
                    border-green-200
                    p-4
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-sm text-green-700">
                        Resultado general
                      </p>

                      <p className="text-3xl font-black text-green-700">
                        92%
                      </p>

                    </div>


                    <CheckCircle2
                      className="text-green-600"
                      size={34}
                    />

                  </div>


                  <p className="text-sm text-green-600 mt-2">
                    Documento listo para revisar.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}


function Resultado({
  nombre,
  valor,
  correcto = false
}) {

  return (

    <div className="flex justify-between items-center">

      <span className="font-medium">
        {nombre}
      </span>

      <span
        className={`
          flex
          items-center
          gap-2
          font-bold
          ${correcto
            ? "text-green-600"
            : "text-yellow-600"
          }
        `}
      >

        {correcto
          ? <CheckCircle2 size={18} />
          : <AlertCircle size={18} />
        }

        {valor}

      </span>

    </div>

  );

}