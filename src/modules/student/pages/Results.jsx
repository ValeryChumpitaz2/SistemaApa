import {
  BarChart3,
  Award,
  FileCheck
} from "lucide-react";

import ResultCard from "../components/ResultCard";
import CriteriaList from "../components/CriteriaList";
import Recommendations from "../components/Recommendations";


export default function Results({
  documentos = []
}) {

  const ultimoResultado =
    documentos.length > 0
      ? documentos[documentos.length - 1]
      : null;


  return (
    <div className="space-y-6">

      {/* ==================================================
          ENCABEZADO
      ================================================== */}

      <section>
        <div className="flex items-center gap-3">

          <div className="
            bg-blue-100
            dark:bg-blue-900/30
            text-blue-700
            dark:text-blue-400
            p-3
            rounded-2xl
          ">
            <BarChart3 size={24} />
          </div>

          <div>
            <h1 className="
              text-2xl
              md:text-3xl
              font-black
              text-gray-800
              dark:text-white
            ">
              Resultados del análisis
            </h1>

            <p className="
              text-sm
              md:text-base
              text-gray-500
              dark:text-gray-400
              mt-1
            ">
              Consulta el resultado de tus evaluaciones.
            </p>
          </div>

        </div>
      </section>


      {/* ==================================================
          SIN RESULTADOS
      ================================================== */}

      {!ultimoResultado && (
        <div className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-gray-200
          dark:border-slate-800
          p-10
          text-center
          shadow-sm
        ">

          <Award
            size={56}
            className="
              mx-auto
              text-blue-600
              mb-5
            "
          />

          <h2 className="
            text-2xl
            font-black
            text-gray-800
            dark:text-white
          ">
            Aún no tienes resultados
          </h2>

          <p className="
            text-gray-500
            dark:text-gray-400
            mt-2
          ">
            Realiza una evaluación para ver el análisis.
          </p>

        </div>
      )}


      {/* ==================================================
          RESULTADO
      ================================================== */}

      {ultimoResultado && (
        <>

          {/* RESULTADO PRINCIPAL */}

          <ResultCard
            analysis={ultimoResultado}
          />


          {/* ==================================================
              CRITERIOS
          ================================================== */}

          <section className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-gray-200
            dark:border-slate-800
            shadow-sm
            overflow-hidden
          ">

            {/* CABECERA */}

            <div className="
              px-5
              md:px-6
              py-4
              border-b
              border-gray-100
              dark:border-slate-800
              flex
              items-center
              gap-3
            ">

              <div className="
                bg-blue-100
                dark:bg-blue-900/30
                text-blue-700
                dark:text-blue-400
                p-2
                rounded-xl
              ">
                <FileCheck size={20} />
              </div>

              <div>
                <h2 className="
                  text-lg
                  md:text-xl
                  font-black
                  text-gray-800
                  dark:text-white
                ">
                  Criterios evaluados
                </h2>

                <p className="
                  text-xs
                  md:text-sm
                  text-gray-500
                  dark:text-gray-400
                  mt-1
                ">
                  Revisa el detalle de cada criterio.
                </p>
              </div>

            </div>


            {/* LISTA */}

            <div className="p-4 md:p-5">

              <CriteriaList
                criterios={
                  ultimoResultado.criterios || []
                }
              />

            </div>

          </section>


          {/* ==================================================
              RECOMENDACIONES
          ================================================== */}

          <Recommendations
            criterios={
              ultimoResultado.criterios || []
            }
          />

        </>
      )}

    </div>
  );
}
