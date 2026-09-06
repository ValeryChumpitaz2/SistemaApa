import {
  useEffect,
  useState,
} from "react";

import {
  FolderSearch,
  CheckCircle2,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";

import {
  analyzeFolder,
} from "../services/teacherService";


export default function FolderAnalyzer({

  setResultados,

  setNoValidos,

}) {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    url,
    setUrl,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    mensaje,
    setMensaje,
  ] = useState(
    "Preparando análisis..."
  );


  const [
    progreso,
    setProgreso,
  ] = useState(0);


  const [
    archivoActual,
    setArchivoActual,
  ] = useState("");


  // =====================================================
  // MENSAJES DE PROGRESO
  // =====================================================

  const mensajes = [

    "Conectando con Google Drive...",

    "Buscando documentos académicos...",

    "Detectando archivos disponibles...",

    "Extrayendo contenido del documento...",

    "Analizando estructura APA...",

    "Evaluando referencias bibliográficas...",

    "Calculando puntajes académicos...",

    "Generando ranking del aula...",

  ];


  // =====================================================
  // ANIMACIÓN DE PROGRESO
  // =====================================================

  useEffect(() => {

    if (!loading) {

      return;

    }


    let i = 0;

    let porcentaje = 5;


    const intervalo =
      setInterval(() => {

        setMensaje(
          mensajes[i]
        );


        porcentaje +=
          Math.floor(
            Math.random() * 7
          ) + 3;


        if (
          porcentaje > 95
        ) {

          porcentaje = 95;

        }


        setProgreso(
          porcentaje
        );


        i++;


        if (
          i >= mensajes.length
        ) {

          i = 0;

        }

      }, 1800);


    return () =>
      clearInterval(
        intervalo
      );

  }, [loading]);


  // =====================================================
  // ANALIZAR CARPETA
  // =====================================================

  async function analizar() {

    if (!url.trim()) {

      alert(
        "Ingresa la URL de la carpeta Google Drive"
      );

      return;

    }


    try {

      setLoading(true);

      setProgreso(5);

      setMensaje(
        "Conectando con la carpeta..."
      );

      setResultados([]);

      // Limpiamos los documentos inválidos
      // del análisis anterior.

      if (
        typeof setNoValidos ===
        "function"
      ) {

        setNoValidos([]);

      }


      localStorage.removeItem(
        "documentosInvalidos"
      );


      setArchivoActual(
        "Conectando con la carpeta..."
      );


      // =================================================
      // LLAMADA AL SERVICIO
      // =================================================

      const respuesta =
        await analyzeFolder(
          url
        );


      console.log(
        "RESPUESTA ANALISIS:",
        respuesta
      );


      // =================================================
      // OBTENER DOCUMENTOS
      // =================================================

      let documentos = [];


      if (
        Array.isArray(
          respuesta
        )
      ) {

        documentos =
          respuesta;

      }

      else if (
        Array.isArray(
          respuesta?.resultados
        )
      ) {

        documentos =
          respuesta.resultados;

      }

      else {

        throw new Error(
          "No se encontraron documentos"
        );

      }


      // =================================================
      // SEPARAR DOCUMENTOS VÁLIDOS E INVÁLIDOS
      // =================================================
      //
      // IMPORTANTE:
      //
      // Aquí contemplamos varios nombres posibles
      // que podría devolver tu backend.
      //
      // Si el backend ya devuelve:
      //
      //   resultados
      //   noValidos
      //
      // también los usamos.
      //
      // =================================================

      let documentosValidos =
        documentos;


      let documentosInvalidos =
        [];


      // -------------------------------------------------
      // CASO 1:
      // El backend devuelve noValidos directamente
      // -------------------------------------------------

      if (
        !Array.isArray(
          respuesta
        ) &&
        Array.isArray(
          respuesta?.noValidos
        )
      ) {

        documentosInvalidos =
          respuesta.noValidos;

      }


      // -------------------------------------------------
      // CASO 2:
      // El backend devuelve documentos inválidos
      // con otro nombre
      // -------------------------------------------------

      else if (
        !Array.isArray(
          respuesta
        ) &&
        Array.isArray(
          respuesta?.documentosInvalidos
        )
      ) {

        documentosInvalidos =
          respuesta.documentosInvalidos;

      }


      // -------------------------------------------------
      // CASO 3:
      // Cada documento viene marcado como válido/inválido
      // -------------------------------------------------

      const documentosMarcados =
        documentos.filter(
          (item) => {

            return (
              item?.valido === false ||
              item?.valido === "false" ||
              item?.valido === 0 ||
              item?.estado === "invalido" ||
              item?.estado === "inválido" ||
              item?.estado === "NO_VALIDO" ||
              item?.esValido === false
            );

          }
        );


      if (
        documentosMarcados.length > 0
      ) {

        documentosInvalidos = [
          ...documentosInvalidos,
          ...documentosMarcados,
        ];

      }


      // -------------------------------------------------
      // ELIMINAR DUPLICADOS
      // -------------------------------------------------

      documentosInvalidos =
        documentosInvalidos.filter(
          (
            item,
            index,
            array
          ) => {

            const nombre =
              item?.nombre ??
              item?.name ??
              item?.archivo ??
              `documento-${index}`;


            return (
              array.findIndex(
                (otro) => {

                  const otroNombre =
                    otro?.nombre ??
                    otro?.name ??
                    otro?.archivo ??
                    "";


                  return (
                    otroNombre ===
                    nombre
                  );

                }
              ) === index
            );

          }
        );


      // =================================================
      // SI HAY DOCUMENTOS MARCADOS COMO INVÁLIDOS
      // LOS SACAMOS DE RESULTADOS
      // =================================================

      if (
        documentosInvalidos.length > 0
      ) {

        const nombresInvalidos =
          new Set(
            documentosInvalidos.map(
              (item) =>
                String(
                  item?.nombre ??
                  item?.name ??
                  item?.archivo ??
                  ""
                ).trim()
            )
          );


        documentosValidos =
          documentos.filter(
            (item) => {

              const nombre =
                String(
                  item?.nombre ??
                  item?.name ??
                  item?.archivo ??
                  ""
                ).trim();


              return !nombresInvalidos.has(
                nombre
              );

            }
          );

      }


      // =================================================
      // NORMALIZAR DOCUMENTOS INVÁLIDOS
      // =================================================

      const noValidosFinales =
        documentosInvalidos.map(
          (item) => {

            return {

              nombre:
                item?.nombre ??
                item?.name ??
                item?.archivo ??
                "Documento sin nombre",

              entregable:
                item?.entregable ??
                item?.tipoEntregable ??
                item?.entregableEsperado ??
                "-",

              entregableDetectado:
                item?.entregableDetectado ??
                item?.tipoDetectado ??
                item?.detectado ??
                "",

              fechaHoraAnalisis:
                item?.fechaHoraAnalisis ??
                item?.fechaHora ??
                item?.fecha ??
                new Date().toISOString(),

              motivo:
                item?.motivo ??
                item?.razon ??
                item?.error ??
                "Documento no válido para la consolidación.",

            };

          }
        );


      console.log(
        "DOCUMENTOS VÁLIDOS:",
        documentosValidos
      );


      console.log(
        "DOCUMENTOS NO VÁLIDOS:",
        noValidosFinales
      );


      // =================================================
      // GUARDAR DOCUMENTOS NO VÁLIDOS
      // =================================================

      if (
        typeof setNoValidos ===
        "function"
      ) {

        setNoValidos(
          noValidosFinales
        );

      }


      localStorage.setItem(
        "documentosInvalidos",
        JSON.stringify(
          noValidosFinales
        )
      );


      // =================================================
      // SIMULACIÓN VISUAL
      // =================================================

      documentosValidos.forEach(
        (
          item,
          index
        ) => {

          setTimeout(
            () => {

              setArchivoActual(

                `Analizando ${
                  index + 1
                }/${
                  documentosValidos.length
                }: ${
                  item?.nombre ??
                  "Documento"
                }`

              );


              if (
                documentosValidos.length > 0
              ) {

                setProgreso(

                  Math.round(

                    (
                      (index + 1) /
                      documentosValidos.length
                    ) * 100

                  )

                );

              }

            },

            index * 600

          );

        }
      );


      // =================================================
      // NORMALIZAR RESULTADOS VÁLIDOS
      // =================================================

      const resultadosFinales =

        documentosValidos.map(

          (item) => ({

            nombre:

              item?.nombre ??

              "Documento sin nombre",


            resumen:

              item?.resumen ??

              {

                palabras: 0,

                titulos: 0,

                parrafos: 0,

              },


            puntaje:

              {

                obtenido:

                  item?.puntaje?.obtenido ??

                  0,


                maximo:

                  item?.puntaje?.maximo ??

                  100,


                porcentaje:

                  Number(

                    item?.puntaje?.porcentaje ??

                    item?.puntaje?.porcentajeFinal ??

                    item?.porcentaje ??

                    0

                  ),

              },


            criterios:

              item?.criterios ??

              [],

          })

        );


      console.log(
        "RESULTADOS FINALES:",
        resultadosFinales
      );


      // =================================================
      // ACTUALIZAR RESULTADOS
      // =================================================

      setProgreso(100);


      setMensaje(
        "Análisis completado correctamente"
      );


      setArchivoActual(

        `${
          documentosValidos.length
        } documentos válidos evaluados${
          noValidosFinales.length > 0
            ? ` · ${noValidosFinales.length} no válidos`
            : ""
        }`

      );


      setResultados(
        resultadosFinales
      );


      localStorage.setItem(

        "resultadosDocente",

        JSON.stringify(
          resultadosFinales
        )

      );


    } catch (error) {

      console.error(
        "ERROR ANALIZANDO CARPETA:",
        error
      );


      alert(

        error?.message ||

        "Error analizando carpeta"

      );


    } finally {

      setTimeout(
        () => {

          setLoading(
            false
          );

        },

        1200

      );

    }

  }


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <section
      className="
        space-y-8
      "
    >

      {/* =================================================
          HERO
      ================================================= */}

      <div
        className="
          bg-gradient-to-r
          from-blue-950
          via-blue-800
          to-indigo-700
          rounded-3xl
          p-10
          text-white
          shadow-xl
        "
      >

        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          <div
            className="
              bg-white/20
              p-5
              rounded-3xl
            "
          >

            <Sparkles
              size={45}
            />

          </div>


          <div>

            <h2
              className="
                text-3xl
                font-black
              "
            >
              Analizador académico IA
            </h2>


            <p
              className="
                text-blue-100
                mt-2
              "
            >
              Evaluación automática de documentos APA
              desde Google Drive.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          FORMULARIO
      ================================================= */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          shadow-lg
          p-8
        "
      >

        <label
          className="
            font-black
            text-gray-700
          "
        >
          Carpeta Google Drive
        </label>


        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
            mt-4
          "
        >

          <input

            value={
              url
            }

            disabled={
              loading
            }

            onChange={
              (e) =>
                setUrl(
                  e.target.value
                )
            }

            placeholder="
              https://drive.google.com/drive/folders/...
            "

            className="
              flex-1
              border
              rounded-2xl
              p-4
              focus:ring-2
              focus:ring-blue-600
              outline-none
            "

          />


          <button

            disabled={
              loading
            }

            onClick={
              analizar
            }

            className="
              bg-blue-950
              hover:bg-blue-900
              disabled:opacity-50
              text-white
              px-8
              py-4
              rounded-2xl
              font-black
              flex
              items-center
              justify-center
              gap-3
            "

          >

            {loading ? (

              <>

                <Loader2
                  className="
                    animate-spin
                  "
                />

                Analizando

              </>

            ) : (

              <>

                <FolderSearch />

                Analizar carpeta

              </>

            )}

          </button>

        </div>


        {/* =================================================
            PROGRESO
        ================================================= */}

        {loading && (

          <div
            className="
              mt-8
              bg-blue-50
              border
              border-blue-200
              rounded-3xl
              p-6
            "
          >

            <div
              className="
                flex
                justify-between
                mb-3
              "
            >

              <h3
                className="
                  font-black
                  text-blue-950
                "
              >
                Examinando documentos
              </h3>


              <span
                className="
                  font-black
                  text-blue-700
                "
              >
                {progreso}%
              </span>

            </div>


            <div
              className="
                h-4
                bg-blue-100
                rounded-full
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  bg-gradient-to-r
                  from-blue-700
                  to-indigo-600
                  transition-all
                  duration-700
                "
                style={{
                  width:
                    `${progreso}%`,
                }}
              />

            </div>


            <div
              className="
                mt-5
                flex
                items-center
                gap-3
              "
            >

              <Loader2
                className="
                  text-blue-700
                  animate-spin
                "
              />


              <p
                className="
                  text-gray-700
                  font-semibold
                "
              >
                {mensaje}
              </p>

            </div>


            {archivoActual && (

              <div
                className="
                  mt-4
                  bg-white
                  rounded-xl
                  p-4
                  flex
                  items-center
                  gap-3
                  border
                "
              >

                <FileText
                  className="
                    text-blue-700
                  "
                />


                <p
                  className="
                    text-sm
                    text-gray-600
                    truncate
                  "
                >
                  {archivoActual}
                </p>

              </div>

            )}

          </div>

        )}

      </div>


      {/* =================================================
          CARACTERÍSTICAS
      ================================================= */}

      <div
        className="
          grid
          md:grid-cols-3
          gap-5
        "
      >

        <div
          className="
            bg-blue-50
            rounded-2xl
            p-5
          "
        >

          <CheckCircle2
            className="
              text-blue-700
              mb-3
            "
          />


          <h3
            className="
              font-black
            "
          >
            Evaluación APA
          </h3>


          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Analiza formato, contenido y referencias.
          </p>

        </div>


        <div
          className="
            bg-green-50
            rounded-2xl
            p-5
          "
        >

          <CheckCircle2
            className="
              text-green-700
              mb-3
            "
          />


          <h3
            className="
              font-black
            "
          >
            Ranking automático
          </h3>


          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Ordena resultados por rendimiento.
          </p>

        </div>


        <div
          className="
            bg-purple-50
            rounded-2xl
            p-5
          "
        >

          <CheckCircle2
            className="
              text-purple-700
              mb-3
            "
          />


          <h3
            className="
              font-black
            "
          >
            Reportes inteligentes
          </h3>


          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Genera informes académicos.
          </p>

        </div>

      </div>

    </section>

  );

}
