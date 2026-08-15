import {
  Users,
  Database,
  ShieldCheck,
} from "lucide-react";

export default function ResumenConsolidacion({
  resultado,
  datosConsolidados,
}) {

  if (!resultado) {
    return null;
  }

  return (
    <div
      className="
        grid
        md:grid-cols-3
        gap-5
      "
    >

      {/* ALUMNOS */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <Users
          className="
            text-blue-700
            mb-3
          "
        />

        <p className="text-sm text-slate-500">
          Alumnos
        </p>

        <p
          className="
            text-3xl
            font-black
            text-slate-900
          "
        >
          {resultado.totalAlumnos ||
            datosConsolidados.length ||
            0}
        </p>

      </div>

      {/* ENTREGABLES */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <Database
          className="
            text-blue-700
            mb-3
          "
        />

        <p className="text-sm text-slate-500">
          Entregables
        </p>

        <p
          className="
            text-xl
            font-black
            mt-2
            text-slate-900
          "
        >
          EN1 · EN2 · EN3
        </p>

      </div>

      {/* ESTADO */}

      <div
        className="
          bg-white
          border
          border-green-200
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <ShieldCheck
          className="
            text-green-600
            mb-3
          "
        />

        <p className="text-sm text-slate-500">
          Estado
        </p>

        <p
          className="
            text-xl
            font-black
            text-green-600
            mt-2
          "
        >
          Consolidado
        </p>

      </div>

    </div>
  );
}