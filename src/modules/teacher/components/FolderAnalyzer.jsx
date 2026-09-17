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
  Clock3,
  Zap,
  AlertTriangle,
  Check,
  ArrowRight,
} from "lucide-react";

import {
  analyzeFolder,
} from "../services/teacherService";


export default function FolderAnalyzer({
  setResultados,
  setNoValidos,
  onVerResultados,
}) {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [
    mensaje,
    setMensaje,
  ] = useState("Preparando revisión...");

  const [
    progreso,
    setProgreso,
  ] = useState(0);

  const [
    archivoActual,
    setArchivoActual,
  ] = useState("");

  const [
    tiempoTranscurrido,
    setTiempoTranscurrido,
  ] = useState(0);

  const [
    tiempoTotal,
    setTiempoTotal,
  ] = useState(null);

  const [
    estado,
    setEstado,
  ] = useState("idle");


  // =====================================================
  // MENSAJES
  // =====================================================

  const mensajes = [
    "Conectando con Google Drive...",
    "Buscando documentos del entregable...",
    "Detectando archivos disponibles...",
    "Extrayendo contenido de los documentos...",
    "Analizando estructura y formato APA...",
    "Revisando referencias bibliográficas...",
    "Evaluando criterios académicos...",
    "Generando resultados de la revisión...",
  ];


  // =====================================================
  // CRONÓMETRO
  // =====================================================

  useEffect(() => {

    if (!loading) {
      return;
    }

    const inicio = Date.now();

    const intervalo = setInterval(() => {

      const ahora = Date.now();

      const segundos =
        Math.floor(
          (ahora - inicio) / 1000
        );

      setTiempoTranscurrido(
        segundos
      );

    }, 1000);

    return () => {
      clearInterval(intervalo);
    };

  }, [loading]);


  // =====================================================
  // ANIMACIÓN DE PROGRESO
  // =====================================================

  useEffect(() => {

    if (!loading) {
      return;
    }

    let indice = 0;

    const intervalo = setInterval(() => {

      setMensaje(
        mensajes[indice]
      );

      setProgreso((actual) => {

        if (actual >= 90) {
          return actual;
        }

        const incremento =
          Math.floor(
            Math.random() * 6
          ) + 2;

        return Math.min(
          actual + incremento,
          90
        );

      });

      indice =
        (indice + 1) %
        mensajes.length;

    }, 1800);

    return () => {
      clearInterval(intervalo);
    };

  }, [loading]);


  // =====================================================
  // FORMATEAR TIEMPO
  // =====================================================

  function formatearTiempo(segundos) {

    const minutos =
      Math.floor(
        segundos / 60
      );

    const segundosRestantes =
      segundos % 60;

    if (minutos === 0) {
      return `${segundosRestantes}s`;
    }

    return `${minutos}m ${String(
      segundosRestantes
    ).padStart(2, "0")}s`;

  }


  // =====================================================
  // NORMALIZAR PUNTAJE
  // =====================================================

  function normalizarPuntaje(item) {

    if (!item) {

      return {
        obtenido: 0,
        maximo: 2,
        porcentaje: 0,
      };

    }


    // ===================================================
    // OBJETO
    // ===================================================

    if (
      item.puntaje &&
      typeof item.puntaje === "object"
    ) {

      const obtenido =
        Number(
          item.puntaje.obtenido ?? 0
        );

      const maximo =
        Number(
          item.puntaje.maximo ?? 2
        );

      let porcentaje =
        Number(
          item.puntaje.porcentaje
        );


      if (
        !Number.isFinite(
          porcentaje
        )
      ) {

        porcentaje =
          maximo > 0
            ? (
                obtenido /
                maximo
              ) * 100
            : 0;

      }


      return {

        obtenido:
          Number(
            obtenido.toFixed(2)
          ),

        maximo:
          maximo > 0
            ? maximo
            : 2,

        porcentaje:
          Math.round(
            Math.max(
              0,
              Math.min(
                100,
                porcentaje
              )
            )
          ),

      };

    }


    // ===================================================
    // NÚMERO
    // ===================================================

    const obtenido =
      Number(
        item.puntaje ?? 0
      );

    const maximo = 2;

    const porcentaje =
      maximo > 0
        ? (
            obtenido /
            maximo
          ) * 100
        : 0;


    return {

      obtenido:
        Number(
          Math.max(
            0,
            obtenido
          ).toFixed(2)
        ),

      maximo,

      porcentaje:
        Math.round(
          Math.max(
            0,
            Math.min(
              100,
              porcentaje
            )
          )
        ),

    };

  }


  // =====================================================
  // EXTRAER DOCUMENTOS
  // =====================================================

  function extraerDocumentos(respuesta) {

    if (
      Array.isArray(
        respuesta
      )
    ) {

      return respuesta;

    }


    if (
      Array.isArray(
        respuesta?.resultados
      )
    ) {

      return respuesta.resultados;

    }


    if (
      Array.isArray(
        respuesta?.documentos
      )
    ) {

      return respuesta.documentos;

    }


    if (
      Array.isArray(
        respuesta?.consolidado
      )
    ) {

      return respuesta.consolidado;

    }


    return [];

  }


  // =====================================================
  // EXTRAER NO VÁLIDOS
  // =====================================================

  function extraerNoValidos(respuesta) {

    if (
      !respuesta ||
      Array.isArray(
        respuesta
      )
    ) {

      return [];

    }


    if (
      Array.isArray(
        respuesta.noValidos
      )
    ) {

      return respuesta.noValidos;

    }


    if (
      Array.isArray(
        respuesta.documentosInvalidos
      )
    ) {

      return respuesta.documentosInvalidos;

    }


    return [];

  }


  // =====================================================
  // OBTENER NOMBRE
  // =====================================================

  function obtenerNombre(item) {

    return (
      item?.nombre ??
      item?.name ??
      item?.archivo ??
      item?.titulo ??
      "Documento sin nombre"
    );

  }


  // =====================================================
  // NORMALIZAR DOCUMENTO
  // =====================================================

  function normalizarDocumento(item) {

    const puntaje =
      normalizarPuntaje(
        item
      );


    return {

      ...item,

      nombre:
        obtenerNombre(
          item
        ),

      resumen:
        item?.resumen ??
        {
          palabras: 0,
          titulos: 0,
          parrafos: 0,
          encabezados: 0,
        },

      criterios:
        Array.isArray(
          item?.criterios
        )
          ? item.criterios
          : [],

      puntaje,

    };

  }


  // =====================================================
  // ANALIZAR ENTREGABLE
  // =====================================================

  async function analizar() {

    const urlLimpia =
      String(
        url || ""
      ).trim();


    // ===================================================
    // VALIDAR
    // ===================================================

    if (!urlLimpia) {

      alert(
        "Ingresa la URL de la carpeta de Google Drive."
      );

      return;

    }


    // ===================================================
    // INICIO
    // ===================================================

    const inicio =
      Date.now();


    try {

      setLoading(true);

      setEstado("loading");

      setProgreso(5);

      setTiempoTranscurrido(0);

      setTiempoTotal(null);

      setMensaje(
        "Conectando con el entregable..."
      );

      setArchivoActual(
        "Preparando revisión..."
      );


      // =================================================
      // LIMPIAR RESULTADOS
      // =================================================

      setResultados([]);


      if (
        typeof setNoValidos ===
        "function"
      ) {

        setNoValidos([]);

      }


      localStorage.removeItem(
        "documentosInvalidos"
      );


      // =================================================
      // CONSUMIR API
      // =================================================

      const respuesta =
        await analyzeFolder(
          urlLimpia
        );


      // =================================================
      // TIEMPO TOTAL
      // =================================================

      const fin =
        Date.now();


      const segundosTotales =
        Math.floor(
          (fin - inicio) / 1000
        );


      setTiempoTotal(
        segundosTotales
      );


      setTiempoTranscurrido(
        segundosTotales
      );


      // =================================================
      // EXTRAER DOCUMENTOS
      // =================================================

      const documentos =
        extraerDocumentos(
          respuesta
        );


      if (
        documentos.length === 0
      ) {

        throw new Error(
          "La revisión terminó, pero no se encontraron documentos en el entregable."
        );

      }


      // =================================================
      // EXTRAER INVÁLIDOS
      // =================================================

      let documentosInvalidos =
        extraerNoValidos(
          respuesta
        );


      // =================================================
      // DETECTAR INVÁLIDOS
      // =================================================

      const marcadosInvalidos =
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


      documentosInvalidos = [
        ...documentosInvalidos,
        ...marcadosInvalidos,
      ];


      // =================================================
      // ELIMINAR DUPLICADOS
      // =================================================

      const mapaInvalidos =
        new Map();


      documentosInvalidos.forEach(
        (item, index) => {

          const nombre =
            obtenerNombre(
              item
            );


          if (
            !mapaInvalidos.has(
              nombre
            )
          ) {

            mapaInvalidos.set(
              nombre,
              {
                ...item,
                _index: index,
              }
            );

          }

        }
      );


      documentosInvalidos =
        Array.from(
          mapaInvalidos.values()
        );


      // =================================================
      // NOMBRES INVÁLIDOS
      // =================================================

      const nombresInvalidos =
        new Set(

          documentosInvalidos.map(
            (item) =>
              obtenerNombre(
                item
              ).trim()
          )

        );


      // =================================================
      // DOCUMENTOS VÁLIDOS
      // =================================================

      const documentosValidos =
        documentos.filter(
          (item) => {

            const nombre =
              obtenerNombre(
                item
              ).trim();


            return (
              !nombresInvalidos.has(
                nombre
              )
            );

          }
        );


      // =================================================
      // NORMALIZAR INVÁLIDOS
      // =================================================

      const noValidosFinales =
        documentosInvalidos.map(
          (item) => {

            return {

              ...item,

              nombre:
                obtenerNombre(
                  item
                ),

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
                "Documento no válido para la evaluación.",

            };

          }
        );


      // =================================================
      // NORMALIZAR RESULTADOS
      // =================================================

      const resultadosFinales =
        documentosValidos.map(
          (item) => {

            return normalizarDocumento(
              item
            );

          }
        );


      // =================================================
      // GUARDAR INVÁLIDOS
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
      // PROGRESO
      // =================================================

      setProgreso(95);

      setMensaje(
        "Preparando resultados..."
      );


      if (
        resultadosFinales.length > 0
      ) {

        setArchivoActual(
          `${resultadosFinales.length} documentos revisados`
        );

      }
      else {

        setArchivoActual(
          "No se encontraron documentos válidos."
        );

      }


      // =================================================
      // ACTUALIZAR FRONT
      // =================================================

      setResultados(
        resultadosFinales
      );


      localStorage.setItem(
        "resultadosDocente",
        JSON.stringify(
          resultadosFinales
        )
      );


      // =================================================
      // FINALIZAR
      // =================================================

      setProgreso(100);

      setMensaje(
        "Revisión terminada."
      );


      setArchivoActual(
        `${resultadosFinales.length} documentos revisados${
          noValidosFinales.length > 0
            ? ` · ${noValidosFinales.length} no válidos`
            : ""
        }`
      );


      setEstado("success");


    } catch (error) {

      console.error(
        "ERROR EN LA REVISIÓN:",
        error
      );


      setEstado("error");


      setMensaje(
        "No se pudo completar la revisión."
      );


      setArchivoActual(
        error?.message ||
        "Error desconocido."
      );


      alert(
        error?.message ||
        "Error realizando la revisión."
      );


    } finally {

      setTimeout(
        () => {

          setLoading(false);

        },
        800
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
          ENCABEZADO
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-blue-950
          via-blue-900
          to-indigo-700
          rounded-[2rem]
          p-8
          md:p-10
          text-white
          shadow-2xl
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -top-20
            -right-20
            w-64
            h-64
            bg-cyan-400/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -left-20
            w-64
            h-64
            bg-indigo-400/20
            rounded-full
            blur-3xl
          "
        />


        <div
          className="
            relative
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
          "
        >

          {/* =================================================
              TITULO
          ================================================= */}

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-white/10
                border
                border-white/15
                backdrop-blur-sm
                px-3
                py-1.5
                rounded-full
                text-xs
                font-bold
                text-blue-100
                mb-4
              "
            >

              <Sparkles
                size={14}
                className="text-cyan-300"
              />

              APP REVIEWER

            </div>


            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                tracking-tight
              "
            >
              Revisión Automatizada
            </h2>


            <p
              className="
                text-blue-100
                mt-3
                max-w-2xl
                leading-relaxed
              "
            >
              Lee y analiza los documentos de un
              entregable mediante la URL de una carpeta
              de Google Drive.
            </p>

          </div>


          {/* =================================================
              CRONÓMETRO
          ================================================= */}

          {loading && (

            <div
              className="
                min-w-[210px]
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                p-5
                shadow-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-blue-100
                  "
                >

                  <Clock3
                    size={18}
                  />

                  <span
                    className="
                      text-sm
                      font-bold
                    "
                  >
                    Tiempo de revisión
                  </span>

                </div>


                <div
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-cyan-400
                    animate-pulse
                  "
                />

              </div>


              <div
                className="
                  text-4xl
                  font-black
                  tracking-tight
                "
              >

                {formatearTiempo(
                  tiempoTranscurrido
                )}

              </div>


              <p
                className="
                  text-xs
                  text-blue-200
                  mt-1
                "
              >
                Analizando tu entregable...
              </p>

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          FORMULARIO
      ================================================= */}

      <div
        className="
          bg-white
          rounded-[2rem]
          border
          border-slate-100
          shadow-xl
          p-6
          md:p-8
        "
      >

        {/* TITULO */}

        <div
          className="
            flex
            items-start
            gap-4
            mb-6
          "
        >

          <div
            className="
              bg-blue-100
              text-blue-800
              p-3
              rounded-2xl
              shrink-0
            "
          >

            <FolderSearch
              size={23}
            />

          </div>


          <div>

            <h3
              className="
                font-black
                text-slate-800
                text-lg
              "
            >
              Analizar Entregable
            </h3>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
                leading-relaxed
              "
            >
              Ingresa la URL de la carpeta de Google
              Drive donde se encuentra tu entregable.
            </p>

          </div>

        </div>


        {/* INPUT */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >

          <input
            value={url}
            disabled={loading}
            onChange={(e) =>
              setUrl(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !loading
              ) {

                analizar();

              }

            }}
            placeholder="https://drive.google.com/drive/folders/..."
            className="
              flex-1
              border
              border-slate-200
              bg-slate-50
              rounded-2xl
              p-4
              text-slate-700
              font-medium
              outline-none
              transition
              focus:bg-white
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              disabled:opacity-60
            "
          />


          <button
            disabled={loading}
            onClick={analizar}
            className="
              bg-gradient-to-r
              from-blue-950
              to-blue-800
              hover:from-blue-900
              hover:to-indigo-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              px-8
              py-4
              rounded-2xl
              font-black
              flex
              items-center
              justify-center
              gap-3
              shadow-lg
              shadow-blue-900/20
              transition-all
              hover:-translate-y-0.5
              active:translate-y-0
            "
          >

            {loading ? (

              <>

                <Loader2
                  className="animate-spin"
                  size={21}
                />

                Revisando...

              </>

            ) : (

              <>

                <FolderSearch
                  size={21}
                />

                Analizar Entregable

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
              bg-gradient-to-br
              from-blue-50
              to-indigo-50
              border
              border-blue-100
              rounded-3xl
              p-6
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Zap
                    size={18}
                    className="text-blue-700"
                  />

                  <h3
                    className="
                      font-black
                      text-blue-950
                    "
                  >
                    Revisando entregable
                  </h3>

                </div>


                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-1
                  "
                >
                  El tiempo depende de la cantidad
                  de documentos encontrados.
                </p>

              </div>


              <span
                className="
                  bg-blue-700
                  text-white
                  px-3
                  py-1.5
                  rounded-full
                  text-sm
                  font-black
                "
              >
                {progreso}%
              </span>

            </div>


            {/* BARRA */}

            <div
              className="
                h-4
                bg-blue-100
                rounded-full
                overflow-hidden
                shadow-inner
              "
            >

              <div
                className="
                  h-full
                  bg-gradient-to-r
                  from-blue-700
                  via-cyan-500
                  to-indigo-600
                  transition-all
                  duration-700
                  relative
                "
                style={{
                  width:
                    `${progreso}%`,
                }}
              >

                <div
                  className="
                    absolute
                    inset-0
                    bg-white/20
                    animate-pulse
                  "
                />

              </div>

            </div>


            {/* MENSAJE */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  bg-blue-100
                  p-2
                  rounded-xl
                "
              >

                <Loader2
                  size={20}
                  className="
                    text-blue-700
                    animate-spin
                  "
                />

              </div>


              <div>

                <p
                  className="
                    text-slate-800
                    font-bold
                  "
                >
                  {mensaje}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-0.5
                  "
                >
                  Tiempo:{" "}
                  {formatearTiempo(
                    tiempoTranscurrido
                  )}
                </p>

              </div>

            </div>


            {/* DOCUMENTOS */}

            {archivoActual && (

              <div
                className="
                  mt-5
                  bg-white
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  gap-3
                  border
                  border-blue-100
                  shadow-sm
                "
              >

                <FileText
                  className="
                    text-blue-700
                    flex-shrink-0
                  "
                  size={21}
                />


                <p
                  className="
                    text-sm
                    text-slate-600
                    truncate
                  "
                >
                  {archivoActual}
                </p>

              </div>

            )}

          </div>

        )}


        {/* =================================================
            REVISION TERMINADA
        ================================================= */}

        {!loading &&
          estado === "success" && (

          <div
            className="
              mt-8
              rounded-3xl
              border
              border-emerald-200
              bg-gradient-to-br
              from-emerald-50
              to-green-50
              p-6
              md:p-7
            "
          >

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
              "
            >

              {/* MENSAJE */}

              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-emerald-100
                    text-emerald-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <CheckCircle2
                    size={27}
                  />

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      font-black
                      text-emerald-600
                    "
                  >
                    Revisión completada
                  </p>


                  <h3
                    className="
                      mt-1
                      text-xl
                      md:text-2xl
                      font-black
                      text-emerald-950
                    "
                  >
                    Revisión terminada
                  </h3>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-emerald-700
                    "
                  >
                    Tus documentos ya fueron analizados.
                    Puedes consultar los resultados de la revisión.
                  </p>

                </div>

              </div>


              {/* BOTÓN */}

              <button
                type="button"
                onClick={() => {

                  if (
                    typeof onVerResultados ===
                    "function"
                  ) {

                    onVerResultados();

                  }

                  else {

                    document
                      .getElementById(
                        "resultados"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });

                  }

                }}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  px-6
                  py-3.5
                  font-black
                  shadow-lg
                  shadow-emerald-600/20
                  transition-all
                  hover:-translate-y-0.5
                  whitespace-nowrap
                "
              >

                Ver los resultados

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />

              </button>

            </div>


            {/* TIEMPO */}

            {tiempoTotal !== null && (

              <div
                className="
                  mt-5
                  pt-4
                  border-t
                  border-emerald-200
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-emerald-700
                "
              >

                <Clock3
                  size={14}
                />

                Revisión completada en{" "}
                <strong>
                  {formatearTiempo(
                    tiempoTotal
                  )}
                </strong>

              </div>

            )}

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!loading &&
          estado === "error" && (

          <div
            className="
              mt-6
              bg-red-50
              border
              border-red-200
              rounded-2xl
              p-5
              flex
              items-start
              gap-3
            "
          >

            <AlertTriangle
              className="
                text-red-600
                flex-shrink-0
              "
            />


            <div>

              <h4
                className="
                  font-black
                  text-red-800
                "
              >
                Error durante la revisión
              </h4>


              <p
                className="
                  text-sm
                  text-red-700
                  mt-1
                "
              >
                {archivoActual}
              </p>

            </div>

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

        {/* =================================================
            APA
        ================================================= */}

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-3xl
            p-6
            transition
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          <div
            className="
              bg-blue-100
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <CheckCircle2
              className="
                text-blue-700
              "
            />

          </div>


          <h3
            className="
              font-black
              text-slate-800
            "
          >
            Criterios APA
          </h3>


          <p
            className="
              text-slate-500
              text-sm
              mt-2
              leading-relaxed
            "
          >
            Revisa formato, estructura,
            contenido y referencias
            bibliográficas.
          </p>

        </div>


        {/* =================================================
            RESULTADOS
        ================================================= */}

        <div
          className="
            bg-emerald-50
            border
            border-emerald-100
            rounded-3xl
            p-6
            transition
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          <div
            className="
              bg-emerald-100
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <CheckCircle2
              className="
                text-emerald-700
              "
            />

          </div>


          <h3
            className="
              font-black
              text-slate-800
            "
          >
            Resultados claros
          </h3>


          <p
            className="
              text-slate-500
              text-sm
              mt-2
              leading-relaxed
            "
          >
            Consulta el resultado de cada
            documento revisado y conoce
            qué aspectos puedes mejorar.
          </p>

        </div>


        {/* =================================================
            MEJORA
        ================================================= */}

        <div
          className="
            bg-violet-50
            border
            border-violet-100
            rounded-3xl
            p-6
            transition
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          <div
            className="
              bg-violet-100
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <Sparkles
              className="
                text-violet-700
              "
            />

          </div>


          <h3
            className="
              font-black
              text-slate-800
            "
          >
            Mejora tu entregable
          </h3>


          <p
            className="
              text-slate-500
              text-sm
              mt-2
              leading-relaxed
            "
          >
            Identifica los aspectos que
            debes corregir antes de enviar
            tu informe por Google Classroom.
          </p>

        </div>

      </div>

    </section>

  );

}
