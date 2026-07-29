import {
  UploadCloud,
  SearchCheck,
  BarChart3,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Carga tu documento",
    text: "Sube un archivo Word, PDF o selecciónalo desde Google Drive.",
    color: "bg-blue-600",
  },
  {
    icon: SearchCheck,
    title: "Análisis automático",
    text: "La IA verifica formato APA, citas, referencias y criterios institucionales.",
    color: "bg-indigo-600",
  },
  {
    icon: BarChart3,
    title: "Reporte detallado",
    text: "Consulta observaciones, errores detectados y recomendaciones de mejora.",
    color: "bg-violet-600",
  },
  {
    icon: FileCheck,
    title: "Corrige y entrega",
    text: "Aplica las sugerencias y presenta un documento con mayor calidad.",
    color: "bg-emerald-600",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
            Proceso de revisión
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900">
            Revisa tu documento en solo
            <span className="text-blue-600"> 4 pasos</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Desde la carga del archivo hasta el reporte final,
            la plataforma analiza automáticamente tu trabajo
            para ayudarte a cumplir con los criterios académicos.
          </p>

        </div>

        {/* Pasos */}
        <div className="mt-20 grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="relative">

                {/* Flecha */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-14 -right-8 z-10">
                    <ArrowRight className="text-slate-300" size={30} />
                  </div>
                )}

                <div className="
                  h-full
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  hover:border-blue-300
                ">

                  {/* Paso */}
                  <span className="text-sm font-semibold text-blue-600">
                    Paso {index + 1}
                  </span>

                  {/* Icono */}
                  <div
                    className={`mt-5 h-16 w-16 rounded-2xl flex items-center justify-center text-white ${step.color}`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Título */}
                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  {/* Texto */}
                  <p className="mt-4 text-slate-600 leading-7">
                    {step.text}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}