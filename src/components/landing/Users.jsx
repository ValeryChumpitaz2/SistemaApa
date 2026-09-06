import {
  GraduationCap,
  UserRound,
  ShieldCheck,
  Check
} from "lucide-react";


export default function Users() {

  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* ENCABEZADO */}

        <div className="text-center max-w-3xl mx-auto">

          <span
            className="
              inline-flex
              rounded-full
              bg-blue-100
              text-blue-700
              px-4
              py-2
              text-sm
              font-semibold
            "
          >
            Para toda la comunidad académica
          </span>


          <h2
            className="
              mt-5
              text-4xl
              md:text-5xl
              font-black
              text-slate-900
            "
          >
            Una plataforma para toda la comunidad
          </h2>


          <p className="mt-5 text-lg text-slate-600">

            Cada tipo de usuario cuenta con herramientas
            diseñadas para facilitar la gestión y revisión
            de los trabajos académicos.

          </p>

        </div>


        {/* TARJETAS */}

        <div
          className="
            mt-14
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-7
          "
        >

          {/* ==================================================
              ESTUDIANTE
          ================================================== */}

          <div
            className="
              group
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
              shadow-sm
              hover:-translate-y-2
              hover:shadow-xl
              hover:border-blue-300
              transition-all
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-blue-100
                text-blue-700
                flex
                items-center
                justify-center
                group-hover:bg-blue-600
                group-hover:text-white
                transition
              "
            >
              <GraduationCap size={32} />
            </div>


            <h3 className="mt-6 text-2xl font-black text-slate-900">
              Estudiantes
            </h3>


            <p className="mt-4 text-slate-600 leading-7">

              Revisa tus trabajos antes de entregarlos,
              identifica errores y recibe recomendaciones
              para mejorar tus documentos.

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


          {/* ==================================================
              DOCENTE
          ================================================== */}

          <div
            className="
              group
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
              shadow-sm
              hover:-translate-y-2
              hover:shadow-xl
              hover:border-indigo-300
              transition-all
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-indigo-100
                text-indigo-700
                flex
                items-center
                justify-center
                group-hover:bg-indigo-600
                group-hover:text-white
                transition
              "
            >
              <UserRound size={32} />
            </div>


            <h3 className="mt-6 text-2xl font-black text-slate-900">
              Docentes
            </h3>


            <p className="mt-4 text-slate-600 leading-7">

              Evalúa documentos de forma eficiente,
              analiza entregables y realiza seguimiento
              del progreso académico.

            </p>


            <ul className="mt-7 space-y-3">

              <Item text="Revisión masiva" />

              <Item text="Integración con Drive" />

              <Item text="Reportes automáticos" />

              <Item text="Historial de consolidación" />

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


          {/* ==================================================
              ADMINISTRADOR
          ================================================== */}

          <div
            className="
              group
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
              shadow-sm
              hover:-translate-y-2
              hover:shadow-xl
              hover:border-violet-300
              transition-all
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-violet-100
                text-violet-700
                flex
                items-center
                justify-center
                group-hover:bg-violet-600
                group-hover:text-white
                transition
              "
            >
              <ShieldCheck size={32} />
            </div>


            <h3 className="mt-6 text-2xl font-black text-slate-900">
              Administradores
            </h3>


            <p className="mt-4 text-slate-600 leading-7">

              Gestiona las cuentas docentes y administra
              el acceso a la plataforma de manera segura
              y organizada.

            </p>


            <ul className="mt-7 space-y-3">

              <Item text="Gestión de cuentas docentes" />

              <Item text="Recuperación de contraseñas" />

              <Item text="Administración de accesos" />

              <Item text="Gestión segura del sistema" />

            </ul>


            <a
              href="/login"
              className="
                mt-8
                block
                text-center
                rounded-xl
                bg-violet-600
                py-3
                font-bold
                text-white
                hover:bg-violet-700
                transition
              "
            >
              Ingresar como administrador
            </a>

          </div>

        </div>


        {/* MENSAJE INFERIOR */}

        <div className="mt-12 text-center">

          <p className="text-sm text-slate-500">

            VG Smart Review centraliza la revisión,
            evaluación y gestión académica en una sola plataforma.

          </p>

        </div>

      </div>

    </section>

  );

}


/* ==================================================
    ITEM DE LISTA
================================================== */

function Item({ text }) {

  return (

    <li className="flex items-center gap-3 text-slate-700">

      <span
        className="
          w-5
          h-5
          rounded-full
          bg-green-100
          flex
          items-center
          justify-center
          shrink-0
        "
      >

        <Check
          size={13}
          className="text-green-600"
        />

      </span>

      <span>
        {text}
      </span>

    </li>

  );

}
