import {
  useEffect,
  useState
} from "react";


import {
  History as HistoryIcon,
  FileText,
  TrendingUp,
  LoaderCircle,
  AlertTriangle
} from "lucide-react";


import HistoryTable from "../components/HistoryTable";


import {
  obtenerHistorial,
  obtenerCorreoEstudiante
} from "../services/studentService";



export default function History({
  documentos = [],
  setDocumentos
}) {


  // ==================================================
  // ESTADOS
  // ==================================================

  const [
    cargando,
    setCargando
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");



  // ==================================================
  // CARGAR HISTORIAL REAL
  // ==================================================

  useEffect(() => {

    cargarHistorial();

  }, []);



  async function cargarHistorial() {

    try {

      setCargando(true);

      setError("");


      // ==================================================
      // OBTENER CORREO
      // ==================================================

      const correo =
        obtenerCorreoEstudiante();


      console.log(
        "Cargando historial de:",
        correo
      );


      // ==================================================
      // CONSULTAR SHEETS
      // ==================================================

      const historial =
        await obtenerHistorial(
          correo
        );


      console.log(
        "HISTORIAL RECIBIDO:",
        historial
      );


      // ==================================================
      // GUARDAR EN ESTADO GLOBAL
      // ==================================================

      if (
        typeof setDocumentos ===
        "function"
      ) {

        setDocumentos(
          historial
        );

      }

    }
    catch (err) {

      console.error(
        "Error cargando historial:",
        err
      );


      setError(
        err.message ||
        "No fue posible cargar el historial."
      );

    }
    finally {

      setCargando(false);

    }

  }



  // ==================================================
  // DATOS
  // ==================================================

  const total =
    documentos.length;


  const promedio =
    total

      ?

      Math.round(

        documentos.reduce(

          (total, item) => {

            return (
              total +
              Number(
                item.puntaje?.porcentaje ||
                0
              )
            );

          },

          0

        ) / total

      )

      :

      0;



  // ==================================================
  // ÚLTIMA ACTIVIDAD
  // ==================================================

  function obtenerUltimaActividad() {

    if (!documentos.length) {

      return "Sin datos";

    }


    const fechas =
      documentos
        .map(
          item =>
            item.fechaAnalisis ||
            item.fecha ||
            item.createdAt ||
            item.fechaCreacion
        )
        .filter(Boolean)
        .map(
          fecha =>
            new Date(fecha)
        )
        .filter(
          fecha =>
            !Number.isNaN(
              fecha.getTime()
            )
        );


    if (!fechas.length) {

      return "Reciente";

    }


    const ultima =
      new Date(
        Math.max(
          ...fechas.map(
            fecha =>
              fecha.getTime()
          )
        )
      );


    return ultima.toLocaleDateString(
      "es-PE",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  }



  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div
      className="
        space-y-8
      "
    >


      {/* ==================================================
          TITULO
      ================================================== */}

      <section>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              bg-purple-100
              text-purple-700
              p-3
              rounded-xl
            "
          >

            <HistoryIcon />

          </div>


          <div>

            <h1
              className="
                text-3xl
                font-black
                text-gray-800
                dark:text-white
              "
            >

              Historial de evaluaciones

            </h1>


            <p
              className="
                text-gray-500
                mt-1
              "
            >

              Consulta todos tus documentos analizados.

            </p>

          </div>

        </div>

      </section>



      {/* ==================================================
          ESTADÍSTICAS
      ================================================== */}

      <div
        className="
          grid
          md:grid-cols-3
          gap-5
        "
      >

        <Card

          icon={
            <FileText />
          }

          titulo="Documentos analizados"

          valor={total}

        />


        <Card

          icon={
            <TrendingUp />
          }

          titulo="Promedio general"

          valor={`${promedio}%`}

        />


        <Card

          icon={
            <HistoryIcon />
          }

          titulo="Última actividad"

          valor={
            obtenerUltimaActividad()
          }

        />

      </div>



      {/* ==================================================
          ERROR
      ================================================== */}

      {
        error &&

        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            dark:bg-red-950/20
            dark:border-red-900
            p-4
            flex
            items-center
            gap-3
          "
        >

          <AlertTriangle
            size={20}
            className="
              text-red-500
              shrink-0
            "
          />


          <p
            className="
              text-sm
              font-semibold
              text-red-700
              dark:text-red-400
            "
          >

            {error}

          </p>

        </div>

      }



      {/* ==================================================
          TABLA
      ================================================== */}

      <section
        className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-800
          shadow-sm
          p-6
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-5
          "
        >

          <div>

            <h2
              className="
                text-xl
                font-black
                text-gray-800
                dark:text-white
              "
            >

              Mis documentos

            </h2>


            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >

              Información almacenada en el historial.

            </p>

          </div>


          {
            cargando &&

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-400
              "
            >

              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Cargando...

            </div>

          }

        </div>


        {

          cargando

          ?

          <div
            className="
              py-16
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            <LoaderCircle
              size={35}
              className="
                animate-spin
                text-[#1D3681]
              "
            />


            <p
              className="
                mt-4
                font-semibold
                text-slate-600
                dark:text-slate-300
              "
            >

              Cargando historial...

            </p>

          </div>

          :

          <HistoryTable

            documentos={
              documentos
            }

          />

        }

      </section>

    </div>

  );

}



// ==================================================
// CARD
// ==================================================

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
        border
        border-slate-200
        dark:border-slate-800
        rounded-3xl
        p-6
        shadow-sm
        flex
        items-center
        gap-4
      "
    >

      <div
        className="
          bg-blue-100
          text-blue-700
          p-4
          rounded-2xl
        "
      >

        {icon}

      </div>


      <div>

        <p
          className="
            text-sm
            text-gray-500
          "
        >

          {titulo}

        </p>


        <h3
          className="
            text-2xl
            font-black
            text-gray-800
            dark:text-white
          "
        >

          {valor}

        </h3>

      </div>

    </div>

  );

}
