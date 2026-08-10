import {
  ClipboardList,
  FileDown,
  SearchCheck,
  FileText,
  BarChart3,
  Sparkles
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import TeacherSidebar
  from "../components/TeacherSidebar";

import TeacherHeader
  from "../components/TeacherHeader";

import TeacherFooter
  from "../components/TeacherFooter";

import DashboardOverview
  from "../components/DashboardOverview";

import FolderAnalyzer
  from "../components/FolderAnalyzer";

import ResultsTable
  from "../components/ResultsTable";

import DetailModal
  from "../components/DetailModal";

import GeneralReportButton
  from "../components/GeneralReportButton";

import DetailReportButton
  from "../components/DetailReportButton";

import RankingTable
  from "../components/RankingTable";

import AlertsPanel
  from "../components/AlertsPanel";

import MaintenanceModal
  from "../components/MaintenanceModal";

import TeacherSettings
  from "../components/TeacherSettings";

import TeacherAnalytics
  from "../components/TeacherAnalytics";

import PerformanceChart
  from "../components/PerformanceChart";

import ConsolidacionPage
  from "./ConsolidacionPage";


export default function TeacherDashboard() {


  const [
    resultados,
    setResultados
  ] = useState([]);


  const [
    selected,
    setSelected
  ] = useState(null);


  const [
    active,
    setActive
  ] = useState("dashboard");


  const [
    maintenance,
    setMaintenance
  ] = useState(false);


  useEffect(() => {

    const guardado =
      localStorage.getItem(
        "resultadosDocente"
      );


    if (guardado) {

      setResultados(
        JSON.parse(guardado)
      );

    }

  }, []);



  function actualizarResultados(data) {

    setResultados(data);

    localStorage.setItem(

      "resultadosDocente",

      JSON.stringify(data)

    );

  }



  function renderContenido() {

    switch (active) {


      // =================================
      // INICIO
      // =================================

      case "dashboard":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Inicio

            </h1>


            <div className="
              grid
              md:grid-cols-3
              gap-6
            ">


              {/* ANALIZAR DOCUMENTOS */}

              <div className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-6
                hover:shadow-lg
                transition
              ">

                <h2 className="
                  text-xl
                  font-black
                ">

                  📂 Analizar documentos

                </h2>


                <p className="
                  mt-2
                  text-gray-500
                ">

                  Evalúa entregas académicas automáticamente.

                </p>


                <button

                  onClick={() =>
                    setActive("analyzer")
                  }

                  className="
                    mt-5
                    bg-blue-900
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-bold
                  "

                >

                  Abrir

                </button>

              </div>



              {/* ANALÍTICA */}

              <div className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-6
                hover:shadow-lg
                transition
              ">

                <h2 className="
                  text-xl
                  font-black
                ">

                  📊 Analítica académica

                </h2>


                <p className="
                  mt-2
                  text-gray-500
                ">

                  Gráficos y rendimiento APA.

                </p>


                <button

                  onClick={() =>
                    setActive("analytics")
                  }

                  className="
                    mt-5
                    bg-purple-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-bold
                  "

                >

                  Ver

                </button>

              </div>



              {/* REPORTES */}

              <div className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-6
                hover:shadow-lg
                transition
              ">

                <h2 className="
                  text-xl
                  font-black
                ">

                  📄 Reportes

                </h2>


                <p className="
                  mt-2
                  text-gray-500
                ">

                  Genera informes académicos.

                </p>


                <button

                  onClick={() =>
                    setActive("reports")
                  }

                  className="
                    mt-5
                    bg-green-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-bold
                  "

                >

                  Abrir

                </button>

              </div>


            </div>



            <PerformanceChart
              resultados={resultados}
            />


          </section>

        );



      // =================================
      // ANALIZADOR
      // =================================

      case "analyzer":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Analizar carpeta

            </h1>


            <FolderAnalyzer

              setResultados={
                actualizarResultados
              }

            />

          </section>

        );



      // =================================
      // RESULTADOS
      // =================================

      case "results":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Resultados APA

            </h1>


            <div className="
              bg-white
              rounded-3xl
              border
              p-8
            ">


              {

                resultados.length > 0 ?

                  <ResultsTable

                    resultados={
                      resultados
                    }

                    onSelect={
                      setSelected
                    }

                  />

                  :

                  <div className="
                    text-center
                    py-16
                    text-gray-500
                  ">

                    <ClipboardList

                      size={50}

                      className="
                        mx-auto
                        mb-4
                      "

                    />

                    <p className="
                      font-bold
                    ">

                      No existen resultados

                    </p>

                  </div>

              }


            </div>

          </section>

        );



      // =================================
      // ANALITICA
      // =================================

      case "analytics":

        return (

          <TeacherAnalytics

            resultados={
              resultados
            }

          />

        );



      // =================================
      // RANKING
      // =================================

      case "ranking":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Ranking académico

            </h1>


            <div className="
              bg-white
              rounded-3xl
              border
              p-8
            ">


              <RankingTable

                resultados={
                  resultados
                }

              />


            </div>

          </section>

        );



      // =================================
      // CONSOLIDACIÓN
      // =================================

      case "consolidacion":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Consolidación

            </h1>


            <div className="
              bg-white
              rounded-3xl
              border
              p-8
            ">


              <ConsolidacionPage />


            </div>

          </section>

        );



      // =================================
      // REPORTES
      // =================================

      case "reports":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Reportes académicos

            </h1>


            <p className="
              text-gray-500
              mb-8
            ">

              Genera informes profesionales
              de evaluación APA.

            </p>



            {/* REPORTE GENERAL */}

            <div className="
              bg-white
              rounded-3xl
              border
              p-8
              mb-6
            ">

              <h2 className="
                text-xl
                font-black
                mb-2
              ">

                Reporte general

              </h2>


              <p className="
                text-gray-500
                mb-5
              ">

                Resumen completo del rendimiento
                académico del aula.

              </p>


              <GeneralReportButton

                resultados={
                  resultados
                }

              />

            </div>



            {/* REPORTE DETALLADO */}

            <div className="
              bg-white
              rounded-3xl
              border
              p-8
            ">

              <h2 className="
                text-xl
                font-black
                mb-2
              ">

                Reporte detallado

              </h2>


              <p className="
                text-gray-500
                mb-5
              ">

                Análisis individual de cada
                evaluación APA.

              </p>


              <DetailReportButton

                resultados={
                  resultados
                }

              />

            </div>


          </section>

        );



      // =================================
      // COMUNICACION
      // =================================

      case "communications":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Centro de comunicaciones

            </h1>


            <button

              onClick={() =>
                setMaintenance(true)
              }

              className="
                mt-6
                bg-blue-900
                text-white
                px-6
                py-3
                rounded-xl
                font-bold
              "

            >

              Estado

            </button>


            <MaintenanceModal

              open={
                maintenance
              }

              onClose={() =>
                setMaintenance(false)
              }

            />

          </section>

        );



      // =================================
      // CONFIGURACIÓN
      // =================================

      case "settings":

        return (

          <section>

            <h1 className="
              text-3xl
              font-black
              mb-8
            ">

              Configuración

            </h1>


            <TeacherSettings />

          </section>

        );



      // =================================
      // DEFAULT
      // =================================

      default:

        return null;

    }

  }



  return (

    <div className="
      min-h-screen
      bg-gray-50
    ">


      <TeacherSidebar

        active={
          active
        }

        setActive={
          setActive
        }

      />

<main className="
  min-h-screen
  p-6
  xl:ml-72
">

        {

          renderContenido()

        }


        {

          selected &&

          <DetailModal

            analysis={
              selected
            }

            onClose={() =>
              setSelected(null)
            }

          />

        }


      </main>


    </div>

  );

}