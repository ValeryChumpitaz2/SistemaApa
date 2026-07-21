import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 text-white">

      {/* Luces de fondo */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* IZQUIERDA */}
        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <Sparkles size={16} />
            Plataforma académica con IA
          </div>

          <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight">
            Corrige y valida tus
            <span className="text-cyan-300"> trabajos académicos </span>
            antes de entregarlos.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-blue-100 leading-8">
            Analiza automáticamente formato APA, citas, referencias y criterios
            institucionales para entregar documentos con mayor calidad.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/login"
              className="rounded-xl bg-white text-slate-900 px-8 py-4 font-semibold hover:scale-105 transition"
            >
              Ingresar
            </a>

            <a
              href="#como-funciona"
              className="rounded-xl border border-white/30 px-8 py-4 hover:bg-white/10 transition"
            >
              Cómo funciona
            </a>

          </div>

          <div className="mt-12 flex gap-10">

            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-blue-200">Documentos</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-blue-200">Precisión</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">10 s</h3>
              <p className="text-blue-200">Tiempo promedio</p>
            </div>

          </div>

        </div>

        {/* DERECHA */}
        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden">

            <div className="bg-slate-100 px-6 py-5 border-b">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3">
                  <FileText className="text-blue-700" size={24} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Trabajo_Final.docx
                  </h3>

                  <p className="text-sm text-slate-500">
                    Resultado del análisis
                  </p>
                </div>

              </div>

            </div>

            <div className="p-6 space-y-5">

              <div className="flex justify-between">
                <span>Formato APA</span>

                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle2 size={18} />
                  96%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Referencias</span>

                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle2 size={18} />
                  100%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Márgenes</span>

                <span className="flex items-center gap-2 text-yellow-600 font-semibold">
                  <AlertCircle size={18} />
                  Revisar
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estructura</span>

                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle2 size={18} />
                  Correcta
                </span>
              </div>

              <div className="pt-6 border-t">

                <div className="rounded-xl bg-green-50 border border-green-200 p-4">

                  <p className="font-semibold text-green-700">
                    ✓ Documento listo para entregar
                  </p>

                  <p className="text-sm text-green-600 mt-1">
                    Se detectó únicamente una observación menor en los márgenes.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}