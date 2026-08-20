import {
  FileText,
  UploadCloud,
  Award,
  CheckCircle,
  BarChart3,
  History as HistoryIcon,
  AlertTriangle
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import StudentSidebar from "../components/StudentSidebar";
import TopNavbar from "../components/TopNavbar";
import DashboardHeader from "../components/DashboardHeader";

import Evaluation from "./Evaluation";
import Results from "./Results";
import History from "./History";
import Reports from "./Reports";
import ReportsIncidencias from "./ReportsIncidencias";
import Achievements from "./Achievements";
import Settings from "./Settings";


export default function Dashboard() {

  const [
    pagina,
    setPagina
  ] = useState("dashboard");


  /*==================================================
   * DOCUMENTOS GUARDADOS
   *==================================================*/

  const [
    documentos,
    setDocumentos
  ] = useState(() => {

    const guardados =
      localStorage.getItem("documentos");

    return guardados
      ? JSON.parse(guardados)
      : [];

  });


  /*==================================================
   * GUARDAR DOCUMENTOS
   *==================================================*/

  useEffect(() => {

    localStorage.setItem(
      "documentos",
      JSON.stringify(documentos)
    );

  }, [documentos]);


  /*==================================================
   * DOCUMENTOS EVALUADOS
   *==================================================*/

  const evaluados =
    documentos.filter(
      doc => doc.puntaje
    );


  /*==================================================
   * PROMEDIO
   *==================================================*/

  const promedio =

    evaluados.length

      ?

      Math.round(

        evaluados.reduce(

          (total, item) =>

            total +
            (item.puntaje?.porcentaje || 0),

          0

        ) /

        evaluados.length

      )

      :

      0;


  /*==================================================
   * RENDER
   *==================================================*/

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        dark:bg-slate-950
      "
    >

      {/* SIDEBAR */}

      <StudentSidebar

        pagina={pagina}

        setPagina={setPagina}

      />


      {/* CONTENIDO PRINCIPAL */}

      <div
        className="
          xl:ml-72
        "
      >

        <TopNavbar />


        <main
          className="
            max-w-7xl
            mx-auto
            p-6
            md:p-10
          "
        >


          {/*==================================================
           * INICIO
           *==================================================*/}

          {
            pagina === "dashboard"

            &&

            <div className="space-y-8">

              <DashboardHeader />


              {/* ESTADÍSTICAS */}

              <section
                className="
                  grid
                  md:grid-cols-4
                  gap-6
                "
              >

                <Card

                  icon={<FileText />}

                  titulo="Documentos"

                  valor={documentos.length}

                />


                <Card

                  icon={<Award />}

                  titulo="Promedio APA"

                  valor={`${promedio}%`}

                />


                <Card

                  icon={<CheckCircle />}

                  titulo="Estado"

                  valor={

                    promedio >= 95

                      ?

                      "Excelente"

                      :

                    promedio >= 70

                      ?

                      "Buen avance"

                      :

                      "En mejora"

                  }

                />


                <Card

                  icon={<BarChart3 />}

                  titulo="Evaluados"

                  valor={evaluados.length}

                />

              </section>


              {/*==================================================
               * PROGRESO
               *==================================================*/}

              <section
                className="
                  grid
                  md:grid-cols-2
                  gap-6
                "
              >

                <div
                  className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    p-8
                    border
                    dark:border-slate-800
                  "
                >

                  <h2
                    className="
                      text-2xl
                      font-black
                      dark:text-white
                    "
                  >
                    Tu progreso APA
                  </h2>


                  <p
                    className="
                      mt-3
                      text-gray-500
                    "
                  >
                    Mejora tus documentos para alcanzar
                    el estándar institucional.
                  </p>


                  <div
                    className="
                      mt-6
                      h-4
                      bg-gray-200
                      dark:bg-slate-700
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      className="
                        bg-[#1D3681]
                        h-full
                        rounded-full
                        transition-all
                      "
                      style={{
                        width: `${promedio}%`
                      }}
                    />

                  </div>


                  <div
                    className="
                      mt-3
                      flex
                      justify-between
                      text-sm
                      text-gray-500
                    "
                  >

                    <span>
                      Progreso APA
                    </span>

                    <strong>
                      {promedio}%
                    </strong>

                  </div>

                </div>


                {/* RECOMENDACIÓN */}

                <div
                  className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    p-8
                    border
                    dark:border-slate-800
                  "
                >

                  <h2
                    className="
                      text-2xl
                      font-black
                      dark:text-white
                    "
                  >
                    🤖 Recomendación IA
                  </h2>


                  <p
                    className="
                      mt-4
                      text-gray-600
                      dark:text-gray-300
                    "
                  >

                    {
                      promedio >= 90

                        ?

                        "Excelente trabajo. Tu documento cumple los criterios institucionales."

                        :

                        "Mejora referencias bibliográficas, conclusiones y glosario para aumentar tu puntuación."

                    }

                  </p>

                </div>

              </section>


              {/*==================================================
               * ACCIONES RÁPIDAS
               *==================================================*/}

              <section
                className="
                  bg-white
                  dark:bg-slate-900
                  rounded-3xl
                  p-8
                  border
                  dark:border-slate-800
                "
              >

                <h2
                  className="
                    text-2xl
                    font-black
                    dark:text-white
                  "
                >
                  Acciones rápidas
                </h2>


                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-4
                    mt-5
                  "
                >

                  {/* ANALIZAR */}

                  <Action

                    icon={<UploadCloud />}

                    texto="Analizar documento"

                    click={() =>
                      setPagina("evaluation")
                    }

                  />


                  {/* RESULTADOS */}

                  <Action

                    icon={<CheckCircle />}

                    texto="Ver resultados"

                    click={() =>
                      setPagina("results")
                    }

                  />


                  {/* REPORTES ACADÉMICOS */}

                  <Action

                    icon={<BarChart3 />}

                    texto="Ver reportes"

                    click={() =>
                      setPagina("reports")
                    }

                  />


                  {/* REPORTAR INCIDENCIA */}

                  <Action

                    icon={<AlertTriangle />}

                    texto="Reportar incidencia"

                    click={() =>
                      setPagina("reports-incidencias")
                    }

                  />


                  {/* HISTORIAL */}

                  <Action

                    icon={<HistoryIcon />}

                    texto="Historial"

                    click={() =>
                      setPagina("history")
                    }

                  />

                </div>

              </section>

            </div>

          }


          {/*==================================================
           * EVALUACIÓN
           *==================================================*/}

          {
            pagina === "evaluation"

            &&

            <Evaluation

              setDocumentos={
                setDocumentos
              }

            />

          }


          {/*==================================================
           * RESULTADOS
           *==================================================*/}

          {
            pagina === "results"

            &&

            <Results

              documentos={
                documentos
              }

            />

          }


          {/*==================================================
           * HISTORIAL
           *==================================================*/}

          {
            pagina === "history"

            &&

            <History

              documentos={
                documentos
              }

            />

          }


          {/*==================================================
           * REPORTES ACADÉMICOS
           *==================================================*/}

          {
            pagina === "reports"

            &&

            <Reports

              documentos={
                documentos
              }

            />

          }


          {/*==================================================
           * REPORTES DE INCIDENCIAS
           *==================================================*/}

        {
  pagina === "reports-incidencias"

  &&

  <ReportsIncidencias
    setPagina={setPagina}
  />

}


          {/*==================================================
           * LOGROS
           *==================================================*/}

          {
            pagina === "achievements"

            &&

            <Achievements />

          }


          {/*==================================================
           * CONFIGURACIÓN
           *==================================================*/}

          {
            pagina === "settings"

            &&

            <Settings />

          }

        </main>

      </div>

    </div>

  );

}


/*==================================================
 * CARD
 *==================================================*/

function Card({

  icon,

  titulo,

  valor

}) {

  return (

    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-3xl
        p-6
        border
        dark:border-slate-800
        shadow-sm
      "
    >

      <div
        className="
          text-[#1D3681]
        "
      >

        {icon}

      </div>


      <p
        className="
          mt-4
          text-gray-500
        "
      >

        {titulo}

      </p>


      <h3
        className="
          text-3xl
          font-black
          dark:text-white
        "
      >

        {valor}

      </h3>

    </div>

  );

}


/*==================================================
 * ACTION
 *==================================================*/

function Action({

  icon,

  texto,

  click

}) {

  return (

    <button

      onClick={click}

      className="
        flex
        items-center
        gap-3
        p-4
        rounded-xl
        bg-blue-50
        text-[#1D3681]
        font-bold
        hover:bg-blue-100
        transition
      "

    >

      {icon}

      {texto}

    </button>

  );

}