import {
  BarChart3,
  TrendingUp
} from "lucide-react";

export default function CriteriaChart({ resultados = [] }) {

  if (!resultados.length) {
    return (
      <section className="bg-white rounded-3xl shadow border p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
            <BarChart3 size={22} />
          </div>

          <h2 className="text-2xl font-bold">
            Rendimiento por criterios
          </h2>
        </div>

        <div className="h-72 flex items-center justify-center text-gray-400">
          No existen datos para mostrar.
        </div>
      </section>
    );
  }

  const promedio =
    resultados.reduce(
      (sum, r) => sum + (Number(r.puntaje) || 0),
      0
    ) / resultados.length;

  const criterios = [
    {
      nombre: "Contenido",
      valor: promedio * 0.95
    },
    {
      nombre: "Redacción",
      valor: promedio * 0.90
    },
    {
      nombre: "Originalidad",
      valor: promedio * 0.98
    },
    {
      nombre: "Referencias",
      valor: promedio * 0.85
    },
    {
      nombre: "Formato",
      valor: promedio * 0.92
    }
  ];

  return (
    <section className="bg-white rounded-3xl shadow border p-8">

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
          <TrendingUp size={22} />
        </div>

        <h2 className="text-2xl font-bold">
          Rendimiento por criterios
        </h2>
      </div>

      <div className="space-y-5">

        {criterios.map((item) => (

          <div key={item.nombre}>

            <div className="flex justify-between mb-2">
              <span className="font-medium">
                {item.nombre}
              </span>

              <span className="font-bold text-blue-700">
                {item.valor.toFixed(0)}%
              </span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(item.valor, 100)}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}