import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  Clock3,
  CheckCircle2,
  MessageSquareWarning
} from "lucide-react";

import ReporteIncidencia
  from "../components/ReporteIncidencia";


export default function ReportsIncidencias({
  setPagina
}) {

  // ==================================================
  // VOLVER
  // ==================================================

  const volver = () => {

    if (setPagina) {
      setPagina("dashboard");
      return;
    }

    window.history.back();

  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="space-y-8">


      {/* ==================================================
          BOTÓN VOLVER
      ================================================== */}

      <button
        type="button"
        onClick={volver}
        className="
          group
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2.5
          text-sm
          font-bold
          text-slate-600
          shadow-sm
          transition-all
          duration-200
          hover:border-blue-200
          hover:bg-blue-50
          hover:text-[#1D3681]
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-300
          dark:hover:bg-slate-800
        "
      >

        <ArrowLeft
          size={18}
          className="
            transition-transform
            group-hover:-translate-x-1
          "
        />

        Volver al inicio

      </button>


      {/* ==================================================
          ENCABEZADO
      ================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          shadow-sm
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -right-16
            -top-20
            h-56
            w-56
            rounded-full
            bg-amber-100
            dark:bg-amber-900/20
          "
        />


        <div
          className="
            absolute
            right-24
            -bottom-16
            h-36
            w-36
            rounded-full
            bg-blue-100
            dark:bg-blue-900/20
          "
        />


        <div
          className="
            relative
            p-8
            md:p-10
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
            "
          >

            {/* INFORMACIÓN */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-amber-50
                  dark:bg-amber-900/30
                  px-3
                  py-1.5
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-amber-700
                  dark:text-amber-300
                "
              >

                <ShieldAlert size={14} />

                Centro de soporte

              </div>


              <h1
                className="
                  mt-4
                  text-3xl
                  md:text-4xl
                  font-black
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >

                Reportar una incidencia

              </h1>


              <p
                className="
                  mt-3
                  max-w-2xl
                  text-slate-500
                  dark:text-slate-400
                  leading-7
                "
              >

                ¿Encontraste un problema durante el uso de
                VG Smart Review? Cuéntanos qué ocurrió para
                que podamos ayudarte.

              </p>

            </div>


            {/* ICONO PRINCIPAL */}

            <div
              className="
                hidden
                lg:flex
                h-24
                w-24
                shrink-0
                items-center
                justify-center
                rounded-3xl
                bg-amber-50
                text-amber-600
                dark:bg-amber-900/30
                dark:text-amber-400
              "
            >

              <MessageSquareWarning
                size={44}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          INFORMACIÓN IMPORTANTE
      ================================================== */}

      <section
        className="
          rounded-2xl
          border
          border-amber-200
          bg-amber-50
          p-5
          dark:border-amber-900/50
          dark:bg-amber-900/10
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          {/* ICONO */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-amber-100
              text-amber-600
              dark:bg-amber-900/40
              dark:text-amber-400
            "
          >

            <AlertTriangle
              size={21}
            />

          </div>


          {/* TEXTO */}

          <div>

            <h2
              className="
                font-black
                text-amber-900
                dark:text-amber-300
              "
            >

              Antes de enviar tu incidencia

            </h2>


            <p
              className="
                mt-1.5
                text-sm
                leading-6
                text-amber-800
                dark:text-amber-400
              "
            >

              Describe el problema de la manera más clara
              posible. Si recibiste algún mensaje de error,
              incluye los detalles para facilitar la revisión.

            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          CONTENIDO PRINCIPAL
      ================================================== */}

      <div
        className="
          grid
          lg:grid-cols-[1fr_300px]
          gap-6
          items-start
        "
      >


        {/* ==================================================
            FORMULARIO
        ================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            md:p-8
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div
            className="
              mb-7
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#1D3681]
                dark:bg-blue-900/30
                dark:text-blue-300
              "
            >

              <MessageSquareWarning
                size={21}
              />

            </div>


            <div>

              <h2
                className="
                  text-xl
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >

                Detalles de la incidencia

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >

                Completa los datos del problema.

              </p>

            </div>

          </div>


          <ReporteIncidencia />

        </section>


        {/* ==================================================
            INFORMACIÓN LATERAL
        ================================================== */}

        <aside
          className="
            space-y-4
          "
        >

          {/* PASO 1 */}

          <InfoCard
            icon={<MessageSquareWarning size={20} />}
            titulo="1. Describe"
            texto="Explica qué problema encontraste y cuándo ocurrió."
          />


          {/* PASO 2 */}

          <InfoCard
            icon={<Clock3 size={20} />}
            titulo="2. Revisión"
            texto="Tu incidencia será revisada por el equipo responsable."
          />


          {/* PASO 3 */}

          <InfoCard
            icon={<CheckCircle2 size={20} />}
            titulo="3. Solución"
            texto="Trabajaremos para resolver el problema reportado."
          />


          {/* CONSEJO */}

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              p-5
              dark:border-blue-900/40
              dark:bg-blue-900/10
            "
          >

            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-wider
                text-[#1D3681]
                dark:text-blue-300
              "
            >

              Consejo

            </p>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-600
                dark:text-slate-400
              "
            >

              Mientras más información proporciones,
              más fácil será identificar y solucionar
              la incidencia.

            </p>

          </div>

        </aside>

      </div>


    </div>

  );
}


/* ==================================================
   TARJETA INFORMACIÓN
================================================== */

function InfoCard({
  icon,
  titulo,
  texto
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-[#1D3681]
            dark:bg-slate-800
            dark:text-blue-300
          "
        >

          {icon}

        </div>


        <h3
          className="
            font-black
            text-slate-800
            dark:text-white
          "
        >

          {titulo}

        </h3>

      </div>


      <p
        className="
          mt-3
          text-sm
          leading-6
          text-slate-500
          dark:text-slate-400
        "
      >

        {texto}

      </p>

    </div>

  );

}