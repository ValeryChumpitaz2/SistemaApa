export default function Users() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Una plataforma para todos
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Tanto estudiantes como docentes pueden aprovechar la inteligencia
            artificial para ahorrar tiempo y mejorar la calidad de sus trabajos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Estudiantes */}
          <div className="group rounded-3xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
              👨‍🎓
            </div>

            <h3 className="mt-6 text-3xl font-bold text-slate-900">
              Estudiantes
            </h3>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Obtén retroalimentación automática antes de entregar tus trabajos
              y descubre oportunidades de mejora.
            </p>

            <ul className="mt-8 space-y-3 text-slate-700">
              <li>✔️ Corrección de redacción</li>
              <li>✔️ Detección de errores</li>
              <li>✔️ Sugerencias con IA</li>
              <li>✔️ Retroalimentación inmediata</li>
            </ul>

            <button className="mt-10 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">
              Soy estudiante
            </button>

          </div>

          {/* Docentes */}
          <div className="group rounded-3xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl">
              👨‍🏫
            </div>

            <h3 className="mt-6 text-3xl font-bold text-slate-900">
              Docentes
            </h3>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Evalúa decenas de documentos automáticamente desde Google Drive
              con métricas y reportes inteligentes.
            </p>

            <ul className="mt-8 space-y-3 text-slate-700">
              <li>✔️ Revisión masiva</li>
              <li>✔️ Integración con Drive</li>
              <li>✔️ Reportes automáticos</li>
              <li>✔️ Ahorro de tiempo</li>
            </ul>

            <button className="mt-10 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition">
              Soy docente
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}