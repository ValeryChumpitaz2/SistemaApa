import {
  ArrowRight,
  Sparkles
} from "lucide-react";


export default function FinalCTA() {

  return (

    <section
      className="
        py-20
        px-6
        bg-white
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
          rounded-[2rem]
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-indigo-800
          p-10
          md:p-14
          text-white
          text-center
          shadow-2xl
          overflow-hidden
          relative
        "
      >

        <div
          className="
            absolute
            -top-20
            -right-20
            w-64
            h-64
            bg-cyan-400/20
            rounded-full
            blur-3xl
          "
        />

        <div className="relative">

          <div
            className="
              inline-flex
              items-center
              gap-2
              text-cyan-300
              text-sm
              font-semibold
            "
          >

            <Sparkles size={17} />

            Empieza ahora

          </div>


          <h2
            className="
              mt-5
              text-3xl
              md:text-5xl
              font-bold
            "
          >

            ¿Listo para revisar tu trabajo?

          </h2>


          <p
            className="
              mt-5
              text-blue-100
              text-lg
              max-w-2xl
              mx-auto
            "
          >

            Detecta errores, revisa los criterios y conoce
            qué puedes mejorar antes de entregar tu documento.

          </p>


          <a
            href="/login"
            className="
              mt-8
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

        </div>

      </div>

    </section>

  );

}