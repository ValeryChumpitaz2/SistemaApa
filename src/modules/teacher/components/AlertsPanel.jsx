import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";

export default function AlertsPanel({ resultados = [] }) {
  if (!resultados.length) {
    return (
      <section className="bg-white rounded-3xl shadow border p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 text-amber-700 p-2 rounded-xl">
            <Info size={22} />
          </div>

          <h2 className="text-2xl font-bold">
            Alertas del aula
          </h2>
        </div>

        <div className="text-center py-8 text-gray-500">
          Todavía no existen evaluaciones para generar alertas.
        </div>
      </section>
    );
  }

  const promedio =
    resultados.reduce(
      (sum, item) => sum + (Number(item.puntaje) || 0),
      0
    ) / resultados.length;

  const excelentes = resultados.filter(
    (r) => (Number(r.puntaje) || 0) >= 90
  );

  const riesgo = resultados.filter(
    (r) => (Number(r.puntaje) || 0) < 60
  );

  const observacion = resultados.filter((r) => {
    const nota = Number(r.puntaje) || 0;
    return nota >= 60 && nota < 75;
  });

  return (
    <section className="bg-white rounded-3xl shadow border p-8">

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 text-red-700 p-2 rounded-xl">
          <AlertTriangle size={22} />
        </div>

        <h2 className="text-2xl font-bold">
          Alertas del aula
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="border rounded-2xl p-5 bg-red-50 border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <XCircle className="text-red-600" size={22} />

            <h3 className="font-bold text-red-700">
              Riesgo
            </h3>
          </div>

          <p className="text-4xl font-black text-red-700">
            {riesgo.length}
          </p>

          <p className="text-gray-600 mt-2">
            Estudiantes con puntaje menor a 60.
          </p>
        </div>

        <div className="border rounded-2xl p-5 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle
              className="text-yellow-600"
              size={22}
            />

            <h3 className="font-bold text-yellow-700">
              En observación
            </h3>
          </div>

          <p className="text-4xl font-black text-yellow-700">
            {observacion.length}
          </p>

          <p className="text-gray-600 mt-2">
            Puntajes entre 60 y 74.
          </p>
        </div>

        <div className="border rounded-2xl p-5 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <h3 className="font-bold text-green-700">
              Excelente desempeño
            </h3>
          </div>

          <p className="text-4xl font-black text-green-700">
            {excelentes.length}
          </p>

          <p className="text-gray-600 mt-2">
            Puntajes iguales o mayores a 90.
          </p>
        </div>

      </div>

      <div className="mt-6 border-t pt-6">
        <p className="text-lg">
          <span className="font-semibold">
            Promedio general:
          </span>{" "}
          <span className="text-blue-700 font-bold">
            {promedio.toFixed(1)}
          </span>
        </p>
      </div>

    </section>
  );
}