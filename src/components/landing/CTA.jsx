import {
  ArrowRight,
  Sparkles
} from "lucide-react";


export default function CTA() {

  return (

    <section className="py-20 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <div
          className="
            rounded-[2rem]
            bg-gradient-to-r
            from-blue-950
            via-blue-900
            to-indigo-700
            p-10
            md:p-14
            text-white
            text-center
            relative
            overflow-hidden
          "
        >

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


          <div className="relative">

            <div className="flex justify-center">

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">

                <Sparkles size={28} />

              </div>

            </div>


            <h2 className="mt-6 text-3xl md:text-4xl font-black">

              ¿Listo para revisar tu trabajo?

            </h2>


            <p className="mt-4 text-blue-100 max-w-2xl mx-auto">

              Detecta errores antes de entregar tu documento
              y conoce qué puedes mejorar.

            </p>


            <a
              href="/login"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                bg-white
                text-blue-900
                px-7
                py-4
                rounded-xl
                font-bold
                hover:scale-105
                transition
              "
            >

              Ingresar a VG Smart Review

              <ArrowRight size={18} />

            </a>

          </div>

        </div>

      </div>

    </section>

  );

}