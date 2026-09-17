import {
  FileCheck,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        top-0
        w-full
        z-50
        border-b
        border-slate-200/60
        bg-white/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          py-3.5
          flex
          items-center
        "
      >
        {/* LOGO */}

        <div className="flex items-center gap-3">

          {/* ICONO */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
              w-12
              h-12
              bg-gradient-to-br
              from-blue-700
              to-indigo-600
              text-white
              rounded-2xl
              shadow-lg
              shadow-blue-900/20
            "
          >
            <FileCheck size={25} />

            {/* ESTRELLA */}

            <div
              className="
                absolute
                -top-1
                -right-1
                flex
                items-center
                justify-center
                w-5
                h-5
                bg-cyan-400
                text-slate-900
                rounded-full
                shadow-sm
              "
            >
              <Sparkles size={10} />
            </div>
          </div>

          {/* NOMBRE DE LA APLICACIÓN */}

          <h1
            className="
              font-black
              text-xl
              text-slate-900
              leading-none
              tracking-tight
            "
          >
            APP Reviewer
          </h1>

        </div>
      </div>
    </nav>
  );
}
