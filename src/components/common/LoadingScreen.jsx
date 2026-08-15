import {
  FileCheck2,
  Sparkles,
  ShieldCheck,
  BrainCircuit
} from "lucide-react";


export default function LoadingScreen() {

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-slate-950
      "
    >

      {/* =========================
          FONDOS DECORATIVOS
      ========================= */}

      <div
        className="
          absolute
          -top-40
          -left-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-blue-600/20
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-indigo-600/20
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[350px]
          h-[350px]
          rounded-full
          bg-cyan-500/10
          blur-[100px]
        "
      />


      {/* =========================
          CONTENIDO
      ========================= */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          px-6
          text-center
        "
      >


        {/* =========================
            LOGO
        ========================= */}

        <div
          className="
            relative
            mx-auto
            w-24
            h-24
          "
        >

          {/* Glow */}

          <div
            className="
              absolute
              inset-0
              rounded-[2rem]
              bg-blue-500/30
              blur-xl
              animate-pulse
            "
          />


          {/* Caja */}

          <div
            className="
              relative
              w-full
              h-full
              rounded-[2rem]
              bg-gradient-to-br
              from-blue-500
              to-indigo-700
              border
              border-white/20
              shadow-2xl
              shadow-blue-900/40
              flex
              items-center
              justify-center
            "
          >

            <FileCheck2
              size={46}
              strokeWidth={1.8}
              className="text-white"
            />


            {/* Spark */}

            <div
              className="
                absolute
                -top-3
                -right-3
                w-9
                h-9
                rounded-full
                bg-cyan-400
                text-slate-950
                flex
                items-center
                justify-center
                shadow-lg
                shadow-cyan-500/30
                animate-bounce
              "
            >

              <Sparkles size={18}/>

            </div>

          </div>

        </div>


        {/* =========================
            MARCA
        ========================= */}

        <div className="mt-8">

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-black
              tracking-tight
              text-white
            "
          >

  VG Smart 
            <span className="text-cyan-400">
              {" "}Review
            </span>

          </h1>


          <div
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-2
              text-blue-200
            "
          >

            <ShieldCheck size={16}/>

            <span className="text-sm">
  Plataforma inteligente de revisión académica
            </span>

          </div>

        </div>


        {/* =========================
            ESTADO
        ========================= */}

        <div
          className="
            mt-10
            rounded-2xl
            border
            border-white/10
            bg-white/[0.06]
            backdrop-blur-xl
            px-5
            py-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              text-white
            "
          >

            <BrainCircuit
              size={20}
              className="
                text-cyan-400
                animate-pulse
              "
            />

            <span className="font-medium">
  Preparando tu espacio académico...
            </span>

          </div>


          <p
            className="
              mt-2
              text-sm
              text-blue-200
            "
          >

            Cargando herramientas de evaluación académica...

          </p>


          {/* =========================
              BARRA
          ========================= */}

          <div
            className="
              mt-5
              h-1.5
              w-full
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >

            <div
              className="
                h-full
                w-1/2
                rounded-full
                bg-gradient-to-r
                from-blue-500
                via-cyan-400
                to-blue-500
                animate-loading
              "
            />

          </div>

        </div>


        {/* =========================
            TEXTO INFERIOR
        ========================= */}

        <p
          className="
            mt-6
            text-xs
            text-slate-500
          "
        >

          Evaluación inteligente · Criterios institucionales · VG

        </p>


      </div>

    </div>

  );
}