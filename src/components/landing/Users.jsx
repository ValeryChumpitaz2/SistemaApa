import {
  GraduationCap,
  UserRound,
  Check
} from "lucide-react";


export default function Users() {

  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">

            Para toda la comunidad académica

          </span>


          <h2 className="mt-5 text-4xl md:text-5xl font-black text-slate-900">

            Una plataforma para estudiantes y docentes

          </h2>


          <p className="mt-5 text-lg text-slate-600">

            Cada usuario tiene herramientas pensadas para
            simplificar la revisión y mejorar el proceso académico.

          </p>

        </div>


        <div className="mt-14 grid md:grid-cols-2 gap-8">

          {/* ESTUDIANTE */}

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-10
              shadow-sm
              hover:shadow-xl
              transition
            "
          >

            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">

              <GraduationCap size={32} />

            </div>


            <h3 className="mt-6 text-3xl font-black text-slate-900">

              Estudiantes

            </h3>


            <p className="mt-4 text-slate-600 leading-7">

              Revisa tus trabajos antes de entregarlos,
              identifica errores y recibe recomendaciones.

            </p>


            <ul className="mt-7 space-y-3">

              <Item text="Corrección de redacción" />

              <Item text="Detección de errores" />

              <Item text="Sugerencias con IA" />

              <Item text="Retroalimentación inmediata" />

            </ul>


            <a
              href="/login"
              className="
                mt-8
                block
                text-center
                rounded-xl
                bg-blue-600
                py-3
                font-bold
                text-white
                hover:bg-blue-700
                transition
              "
            >

              Ingresar como estudiante

            </a>

          </div>


          {/* DOCENTE */}

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-10
              shadow-sm
              hover:shadow-xl
              transition
            "
          >

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">

              <UserRound size={32} />

            </div>


            <h3 className="mt-6 text-3xl font-black text-slate-900">

              Docentes

            </h3>


            <p className="mt-4 text-slate-600 leading-7">

              Evalúa documentos de forma eficiente, analiza
              entregables y realiza seguimiento académico.

            </p>


            <ul className="mt-7 space-y-3">

              <Item text="Revisión masiva" />

              <Item text="Integración con Drive" />

              <Item text="Reportes automáticos" />

              <Item text="Ahorro de tiempo" />

            </ul>


            <a
              href="/login"
              className="
                mt-8
                block
                text-center
                rounded-xl
                bg-indigo-600
                py-3
                font-bold
                text-white
                hover:bg-indigo-700
                transition
              "
            >

              Ingresar como docente

            </a>

          </div>

        </div>

      </div>

    </section>

  );

}


function Item({ text }) {

  return (

    <li className="flex items-center gap-3 text-slate-700">

      <Check
        size={18}
        className="text-green-600"
      />

      {text}

    </li>

  );

}