import { Quote, Star } from "lucide-react";

const testimonios = [
  {
    texto:
      "La plataforma agiliza la revisión de trabajos y facilita la retroalimentación para los estudiantes.",
    persona: "Docente universitario",
  },
  {
    texto:
      "Pude identificar errores en mi documento antes de entregarlo y mejorar su calidad.",
    persona: "Estudiante",
  },
  {
    texto:
      "La evaluación automática optimiza el seguimiento y la gestión de trabajos académicos.",
    persona: "Coordinador académico",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
            Testimonios
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900">
            Lo que opinan nuestros usuarios
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Estudiantes y docentes utilizan la plataforma para mejorar la
            calidad de sus trabajos académicos antes de la entrega.
          </p>

        </div>

        {/* Tarjetas */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {testimonios.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                p-8
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Icono */}
              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Quote className="text-blue-700" size={22} />
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

              </div>

              {/* Testimonio */}
              <p className="mt-6 text-slate-600 leading-7">
                "{item.texto}"
              </p>

              {/* Usuario */}
              <div className="mt-8 pt-6 border-t border-slate-100">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center">
                    {item.persona.charAt(0)}
                  </div>

                  <div>

                    <h4 className="font-semibold text-slate-900">
                      {item.persona}
                    </h4>

                    <p className="text-sm text-slate-500">
                      Usuario de la plataforma
                    </p>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}