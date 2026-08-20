import {
  ArrowLeft,
  AlertTriangle
} from "lucide-react";

import ReporteIncidencia
  from "../components/ReporteIncidencia";


export default function ReportsIncidencias({

  setPagina

}) {

  return (

    <div className="space-y-8">


      {/*================================================
       * VOLVER
       *================================================*/}

      <button

        onClick={() =>
          setPagina
            ? setPagina("dashboard")
            : window.history.back()
        }

        className="
          flex
          items-center
          gap-2
          text-[#1D3681]
          font-bold
          hover:underline
        "

      >

        <ArrowLeft
          size={20}
        />

        Volver

      </button>


      {/*================================================
       * INFORMACIÓN
       *================================================*/}

      <div
        className="
          bg-amber-50
          dark:bg-amber-900/20
          border
          border-amber-200
          dark:border-amber-800
          rounded-2xl
          p-5
          flex
          gap-4
        "
      >

        <AlertTriangle
          className="
            text-amber-600
            shrink-0
          "
          size={24}
        />


        <div>

          <p
            className="
              font-black
              text-amber-800
              dark:text-amber-300
            "
          >

            ¿Tienes un problema?

          </p>


          <p
            className="
              text-sm
              text-amber-700
              dark:text-amber-400
              mt-1
            "
          >

            Completa el formulario y describe
            claramente lo ocurrido. Tu incidencia
            será enviada para su revisión.

          </p>

        </div>

      </div>


      {/*================================================
       * FORMULARIO
       *================================================*/}

      <ReporteIncidencia />

    </div>

  );

}