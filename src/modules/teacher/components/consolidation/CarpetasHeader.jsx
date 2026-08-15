import { Database } from "lucide-react";

export default function CarpetasHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-blue-100
            text-blue-700
            flex
            items-center
            justify-center
          "
        >
          <Database size={25} />
        </div>

        <div>
          <h1
            className="
              text-3xl
              font-black
              text-slate-900
            "
          >
            Consolidación
          </h1>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Consolida los resultados de EN1, EN2 y EN3 por alumno.
          </p>
        </div>

      </div>
    </div>
  );
}