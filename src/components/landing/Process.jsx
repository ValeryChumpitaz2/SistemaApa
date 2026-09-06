import {
  UploadCloud,
  SearchCheck,
  BarChart3,
  FileCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


const steps = [

  {
    icon: UploadCloud,
    title: "Inicia sesión",
    text: "Ingresa a VG Smart Review utilizando tu cuenta institucional.",
  },

  {
    icon: UploadCloud,
    title: "Carga tu documento",
    text: "Selecciona el documento académico que deseas analizar.",
  },

  {
    icon: SearchCheck,
    title: "Analiza tu trabajo",
    text: "El sistema revisa el documento según los criterios establecidos.",
  },

  {
    icon: FileCheck,
    title: "Corrige y entrega",
    text: "Revisa las observaciones, realiza las mejoras y prepara tu entrega.",
  },

];


export default function Process() {

  return (

    <section
      id="como-funciona"
      className="
        relative
        overflow-hidden
        py-24
        md:py-28
        bg-slate-50
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
          w-80
          h-80
          rounded-full
          bg-blue-100/60
          blur-3xl
          pointer-events-none
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
          bg-indigo-100/50
          blur-3xl
          pointer-events-none
        "
      />


      <div className="relative max-w-7xl mx-auto px-6">


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="text-center max-w-3xl mx-auto">

          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-blue-100
              text-blue-700
              px-4
              py-2
              text-sm
              font-bold
            "
          >

            Proceso de revisión

          </span>


          <h2
            className="
              mt-5
              text-4xl
              md:text-5xl
              font-black
              tracking-tight
              text-slate-900
            "
          >

            ¿Cómo funciona?

          </h2>


          <p
            className="
              mt-5
              text-base
              md:text-lg
              text-slate-600
              leading-8
            "
          >

            Revisa tu documento en pocos pasos y obtén información
            clara para mejorar tus entregables académicos.

          </p>

        </div>


        {/* ==================================================
            PASOS
        ================================================== */}

        <div
          className="
            relative
            mt-16
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
            lg:gap-8
          "
        >

          {/* LÍNEA DEL PROCESO */}

          <div
            className="
              hidden
              lg:block
              absolute
              top-[4.7rem]
              left-[12%]
              right-[12%]
              h-px
              bg-blue-200
            "
          />


          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="relative group"
              >

                {/* ==================================================
                    CONECTOR
                ================================================== */}

                {index < steps.length - 1 && (

                  <ArrowRight
                    className="
                      hidden
                      lg:block
                      absolute
                      z-20
                      top-[4.1rem]
                      -right-5
                      text-blue-300
                      bg-slate-50
                    "
                    size={22}
                  />

                )}


                {/* ==================================================
                    TARJETA
                ================================================== */}

                <div
                  className="
                    relative
                    h-full
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-7
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-blue-300
                    hover:shadow-xl
                  "
                >

                  {/* NÚMERO */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-sm
                        font-black
                        tracking-wider
                        text-blue-600
                      "
                    >

                      PASO {String(index + 1).padStart(2, "0")}

                    </span>


                    <span
                      className="
                        text-xs
                        font-bold
                        text-slate-300
                      "
                    >

                      0{index + 1}

                    </span>

                  </div>


                  {/* ICONO */}

                  <div
                    className="
                      mt-6
                      relative
                      w-16
                      h-16
                      rounded-2xl
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      shadow-blue-600/20
                      transition-all
                      duration-300
                      group-hover:bg-blue-700
                      group-hover:scale-105
                    "
                  >

                    <Icon size={28} strokeWidth={2} />

                  </div>


                  {/* TÍTULO */}

                  <h3
                    className="
                      mt-6
                      text-xl
                      font-bold
                      text-slate-900
                    "
                  >

                    {step.title}

                  </h3>


                  {/* DESCRIPCIÓN */}

                  <p
                    className="
                      mt-3
                      text-slate-600
                      leading-7
                    "
                  >

                    {step.text}

                  </p>


                  {/* INDICADOR */}

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-semibold
                      text-slate-400
                    "
                  >

                    <CheckCircle2
                      size={15}
                      className="text-blue-500"
                    />

                    Proceso sencillo y organizado

                  </div>

                </div>

              </div>

            );

          })}

        </div>


        {/* ==================================================
            MENSAJE FINAL
        ================================================== */}

        <div
          className="
            mt-12
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
              w-9
              h-9
              rounded-xl
              bg-blue-100
              text-blue-600
              flex
              items-center
              justify-center
            "
          >

            <CheckCircle2 size={18} />

          </div>


          <p className="text-sm text-slate-500">

            Obtén una revisión clara para tomar mejores decisiones
            antes de entregar tu documento.

          </p>

        </div>

      </div>

    </section>

  );

}