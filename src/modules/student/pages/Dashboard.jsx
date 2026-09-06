import {
  FileText,
  UploadCloud,
  Award,
  CheckCircle,
  BarChart3,
  History as HistoryIcon,
  AlertTriangle,
  MessageSquare
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
import TestimonialForm from "../components/TestimonialForm";

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

      {/*==================================================
       * SIDEBAR
       *==================================================*/}

      <StudentSidebar

        pagina={pagina}

        setPagina={setPagina}

      />


      {/*==================================================
       * CONTENIDO PRINCIPAL
       *==================================================*/}

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
           * DASHBOARD / INICIO
           *==================================================*/}

          {
            pagina === "dashboard"

            &&

            <div className="space-y-8">

              <DashboardHeader />


              {/*==================================================
               * ESTADÍSTICAS
               *==================================================*/}

              <section
                className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-4
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
               * PROGRESO Y RECOMENDACIÓN
               *==================================================*/}

              <section
                className="
                  grid
                  md:grid-cols-2
                  gap-6
                "
              >

                {/* PROGRESO APA */}

                <div
                  className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    p-8
                    border
                    border-slate-200
                    dark:border-slate-800
                    shadow-sm
                  "
                >

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                      dark:text-white
                    "
                  >

                    Tu progreso APA

                  </h2>


                  <p
                    className="
                      mt-3
                      text-gray-500
                      dark:text-gray-400
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


                {/* RECOMENDACIÓN IA */}

                <div
                  className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    p-8
                    border
                    border-slate-200
                    dark:border-slate-800
                    shadow-sm
                  "
                >

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-slate-900
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
                      leading-7
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
                  border-slate-200
                  dark:border-slate-800
                  shadow-sm
                "
              >

                <h2
                  className="
                    text-2xl
                    font-black
                    text-slate-900
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


                  {/* REPORTES */}

                  <Action

                    icon={<BarChart3 />}

                    texto="Ver reportes"

                    click={() =>
                      setPagina("reports")
                    }

                  />


                  {/* INCIDENCIA */}

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


                  {/*==================================================
                   * TESTIMONIO
                   *==================================================*/}

                  <Action

                    icon={<MessageSquare />}

                    texto="Compartir mi experiencia"

                    click={() =>
                      setPagina("testimonio")
                    }

                  />

                </div>

              </section>


              {/*==================================================
               * PEQUEÑO CTA DE TESTIMONIO
               *==================================================*/}

              <section
                className="
                  rounded-3xl
                  bg-gradient-to-r
                  from-blue-950
                  to-indigo-700
                  p-8
                  text-white
                  shadow-xl
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-6
                  "
                >

                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-cyan-200
                      "
                    >

                      Comunidad VG Smart Review

                    </p>


                    <h2
                      className="
                        mt-2
                        text-2xl
                        md:text-3xl
                        font-black
                      "
                    >

                      ¿Cómo ha sido tu experiencia?

                    </h2>


                    <p
                      className="
                        mt-2
                        text-blue-100
                      "
                    >

                      Comparte tu opinión y ayuda a otros
                      estudiantes a conocer la plataforma.

                    </p>

                  </div>


                  <button

                    onClick={() =>
                      setPagina("testimonio")
                    }

                    className="
                      shrink-0
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-6
                      py-3
                      font-bold
                      text-blue-900
                      transition
                      hover:scale-105
                      hover:bg-blue-50
                    "
                  >

                    <MessageSquare size={18} />

                    Dejar testimonio

                  </button>

                </div>

              </section>

            </div>

          }


          {/*==================================================
           * TESTIMONIO
           *
           * IMPORTANTE:
           * Está FUERA del bloque dashboard.
           *==================================================*/}

          {
            pagina === "testimonio"

            &&

            <div
              className="
                max-w-3xl
                mx-auto
              "
            >

              {/* BOTÓN VOLVER */}

              <button

                onClick={() =>
                  setPagina("dashboard")
                }

                className="
                  mb-6
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:text-blue-800
                  transition
                "
              >

                ← Volver al dashboard

              </button>


              {/* ENCABEZADO */}

              <div className="mb-8">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-blue-600
                  "
                >

                  Comunidad

                </p>


                <h1
                  className="
                    mt-2
                    text-3xl
                    md:text-4xl
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >

                  Comparte tu experiencia

                </h1>


                <p
                  className="
                    mt-3
                    text-slate-500
                    dark:text-slate-400
                    leading-7
                  "
                >

                  Cuéntanos cómo ha sido tu experiencia
                  utilizando VG Smart Review.

                </p>

              </div>


              {/* FORMULARIO */}

              <TestimonialForm />

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
           * REPORTES
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
        border-slate-200
        dark:border-slate-800
        shadow-sm
      "
    >

      <div
        className="
          text-[#1D3681]
          dark:text-blue-400
        "
      >

        {icon}

      </div>


      <p
        className="
          mt-4
          text-gray-500
          dark:text-gray-400
        "
      >

        {titulo}

      </p>


      <h3
        className="
          text-3xl
          font-black
          text-slate-900
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

      type="button"

      onClick={click}

      className="
        flex
        items-center
        gap-3
        p-4
        rounded-xl
        bg-blue-50
        dark:bg-blue-950/40
        text-[#1D3681]
        dark:text-blue-300
        font-bold
        hover:bg-blue-100
        dark:hover:bg-blue-900/50
        transition
        text-left
      "

    >

      {icon}

      {texto}

    </button>

  );

}