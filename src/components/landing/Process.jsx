import {
  LogIn,
  UploadCloud,
  SearchCheck,
  FileCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


const steps = [

  {
    icon: LogIn,
    title: "Inicia sesión",
    text: "Ingresa a APP Reviewer con tu cuenta institucional.",
  },

  {
    icon: UploadCloud,
    title: "Carga tu documento",
    text: "Selecciona el documento académico que deseas analizar.",
  },

  {
    icon: SearchCheck,
    title: "Analiza tu trabajo",
    text: "El sistema revisa tu documento según los criterios establecidos.",
  },

  {
    icon: FileCheck,
    title: "Corrige y entrega",
    text: "Revisa las observaciones, aplica las mejoras y prepara tu entrega.",
  },

];


export default function Process() {

  return (

    <section
      id="como-funciona"
      className="
        relative
        overflow-hidden
        py-20
        md:py-24
        bg-white
      "
    >

      {/* ==================================================
          DECORACIÓN
      ================================================== */}

      <div
        className="
          absolute
          -top-40
          -right-40
          w-80
          h-80
          rounded-full
          bg-blue-50
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -left-40
          w-80
          h-80
          rounded-full
          bg-indigo-50
          blur-3xl
          pointer-events-none
        "
      />


      <div
        className="
          relative
          max-w-6xl
          mx-auto
          px-6
          lg:px-8
        "
      >


        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div
          className="
            max-w-2xl
            mx-auto
            text-center
          "
        >

          {/* ETIQUETA */}

          <span
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
              text-blue-600
            "
          >

            <CheckCircle2 size={14} />

            Proceso de revisión

          </span>


          {/* TÍTULO */}

          <h2
            className="
              mt-5
              text-3xl
              md:text-4xl
              font-black
              tracking-tight
              text-slate-900
            "
          >

            ¿Cómo funciona?

          </h2>


          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-4
              max-w-xl
              mx-auto
              text-sm
              md:text-base
              leading-7
              text-slate-500
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
            mt-12
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >

          {/* ==================================================
              LÍNEA DEL PROCESO
          ================================================== */}

          <div
            className="
              hidden
              lg:block
              absolute
              top-10
              left-[12%]
              right-[12%]
              h-px
              bg-slate-200
            "
          />


          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="
                  relative
                  group
                "
              >

                {/* ==================================================
                    CONECTOR
                ================================================== */}

                {index < steps.length - 1 && (

                  <div
                    className="
                      hidden
                      lg:flex
                      absolute
                      z-20
                      top-[2.15rem]
                      -right-2
                      w-5
                      h-5
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      border
                      border-slate-200
                      text-slate-400
                    "
                  >

                    <ArrowRight size={11} />

                  </div>

                )}


                {/* ==================================================
                    TARJETA
                ================================================== */}

                <div
                  className="
                    relative
                    h-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-lg
                    hover:shadow-blue-900/5
                  "
                >

                  {/* ==================================================
                      CABECERA
                  ================================================== */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    {/* NÚMERO */}

                    <span
                      className="
                        text-[11px]
                        font-black
                        uppercase
                        tracking-widest
                        text-blue-600
                      "
                    >

                      Paso {String(index + 1).padStart(2, "0")}

                    </span>


                    {/* NÚMERO GRANDE */}

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


                  {/* ==================================================
                      ICONO
                  ================================================== */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-50
                      border
                      border-blue-100
                      text-blue-600
                      transition-all
                      duration-200
                      group-hover:bg-blue-600
                      group-hover:border-blue-600
                      group-hover:text-white
                    "
                  >

                    <Icon
                      size={20}
                      strokeWidth={2}
                    />

                  </div>


                  {/* ==================================================
                      TÍTULO
                  ================================================== */}

                  <h3
                    className="
                      mt-5
                      text-base
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >

                    {step.title}

                  </h3>


                  {/* ==================================================
                      DESCRIPCIÓN
                  ================================================== */}

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >

                    {step.text}

                  </p>


                  {/* ==================================================
                      INDICADOR
                  ================================================== */}

                  <div
                    className="
                      mt-5
                      pt-4
                      border-t
                      border-slate-100
                      flex
                      items-center
                      gap-2
                      text-[11px]
                      font-semibold
                      text-slate-400
                    "
                  >

                    <CheckCircle2
                      size={13}
                      className="
                        text-blue-500
                        shrink-0
                      "
                    />

                    Proceso sencillo

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
            mt-10
            flex
            items-center
            justify-center
            gap-2
            text-center
          "
        >

          <CheckCircle2
            size={16}
            className="text-blue-500 shrink-0"
          />

          <p
            className="
              text-xs
              md:text-sm
              text-slate-500
            "
          >

            Revisa, mejora y prepara tu documento antes de realizar
            la entrega.

          </p>

        </div>

      </div>

    </section>

  );

}
