import {
  useState
} from "react";


import {
  Search,
  CheckCircle,
  LoaderCircle,
  AlertTriangle,
  X
} from "lucide-react";


import {
  getDocumentName,
  analyzeDocument,
  guardarAnalisis,
  obtenerCorreoEstudiante
} from "../services/studentService";



export default function SubmitDocument({
  setDocumentos
}) {


  // ==================================================
  // ESTADOS
  // ==================================================

  const [
    url,
    setUrl
  ] = useState("");


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    mensaje,
    setMensaje
  ] = useState("");


  const [
    errorNombre,
    setErrorNombre
  ] = useState(false);


  const [
    nombreDetectado,
    setNombreDetectado
  ] = useState("");


  const [
    errorSistema,
    setErrorSistema
  ] = useState("");



  // ==================================================
  // FORMATO DEL NOMBRE
  // ==================================================

  const FORMATO_NOMBRE =
    /^ASE\d{3}S\d_IS\d_EN\d_[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;



  // ==================================================
  // ENVIAR
  // ==================================================

  async function enviar(e) {

    e.preventDefault();


    setMensaje("");

    setErrorNombre(false);

    setErrorSistema("");

    setNombreDetectado("");


    // ==================================================
    // VALIDAR URL
    // ==================================================

    if (!url.trim()) {

      setErrorSistema(
        "Ingresa el enlace de tu documento de Google Docs."
      );

      return;

    }



    try {

      setLoading(true);


      // ==================================================
      // OBTENER NOMBRE
      // ==================================================

      const nombreDocumento =
        await getDocumentName(url);


      const nombreLimpio =
        nombreDocumento.trim();


      setNombreDetectado(
        nombreLimpio
      );


      // ==================================================
      // VALIDAR NOMBRE
      // ==================================================

      const nombreValido =
        FORMATO_NOMBRE.test(
          nombreLimpio
        );


      if (!nombreValido) {

        setErrorNombre(true);

        return;

      }



      // ==================================================
      // ANALIZAR
      // ==================================================

      const data =
        await analyzeDocument(url);


      console.log(
        "ANÁLISIS RECIBIDO:",
        data
      );



      // ==================================================
      // OBTENER CORREO
      // ==================================================

      const correo =
        obtenerCorreoEstudiante();


      console.log(
        "CORREO ESTUDIANTE:",
        correo
      );



      // ==================================================
      // GUARDAR EN SHEETS
      // ==================================================

      const guardado =
        await guardarAnalisis({

          url:
            url,

          nombre:
            data.resumen?.nombre ||
            nombreLimpio ||
            "Documento académico",

          resumen:
            data.resumen,

          puntaje:
            data.puntaje,

          criterios:
            data.criterios || [],

          correo:
            correo

        });


      console.log(
        "ANÁLISIS GUARDADO:",
        guardado
      );



      // ==================================================
      // CREAR OBJETO LOCAL
      // ==================================================

      const documento = {

        id:
          guardado?.id ||
          guardado?.registroId ||
          Date.now().toString(),

        nombre:
          data.resumen?.nombre ||
          nombreLimpio ||
          "Documento académico",

        url:
          url,

        resumen:
          data.resumen,

        puntaje:
          data.puntaje,

        criterios:
          data.criterios || [],

        correo:
          correo,

        fecha:
          new Date().toISOString(),

        fechaAnalisis:
          new Date().toISOString()

      };



      // ==================================================
      // ACTUALIZAR FRONT
      // ==================================================

      setDocumentos(
        prev => [

          ...prev,

          documento

        ]
      );



      // ==================================================
      // ÉXITO
      // ==================================================

      setMensaje(
        "Documento analizado y guardado correctamente."
      );


      setUrl("");

      setNombreDetectado("");


    }
    catch (error) {

      console.error(
        "Error al procesar documento:",
        error
      );


      setErrorSistema(
        error.message ||
        "No pudimos procesar el documento."
      );

    }
    finally {

      setLoading(false);

    }

  }



  // ==================================================
  // CAMBIAR URL
  // ==================================================

  function cambiarUrl(e) {

    setUrl(
      e.target.value
    );

    setErrorNombre(false);

    setErrorSistema("");

    setMensaje("");

    setNombreDetectado("");

  }



  // ==================================================
  // CERRAR AVISO
  // ==================================================

  function cerrarAvisoNombre() {

    setErrorNombre(false);

  }



  // ==================================================
  // JSX
  // ==================================================

  return (

    <div
      className="
        space-y-6
      "
    >

      <div
        className="
          bg-white
          dark:bg-slate-900
          border
          border-gray-100
          dark:border-slate-800
          rounded-3xl
          p-8
          shadow-sm
        "
      >

        {/* ENCABEZADO */}

        <h3
          className="
            text-xl
            font-black
            text-gray-800
            dark:text-white
          "
        >

          Evaluador institucional

        </h3>


        <p
          className="
            text-gray-500
            dark:text-gray-400
            mt-2
            leading-relaxed
          "
        >

          Ingresa el enlace de tu Google Docs
          para verificar y evaluar tu documento.

        </p>



        {/* FORMULARIO */}

        <form
          onSubmit={enviar}
          className="
            mt-6
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >

          <input

            type="url"

            value={url}

            onChange={cambiarUrl}

            disabled={loading}

            placeholder="https://docs.google.com/document/..."

            className={`
              flex-1
              p-4
              rounded-xl
              border
              outline-none
              transition
              dark:bg-slate-800
              dark:text-white

              ${
                errorNombre

                  ? `
                    border-amber-400
                    focus:ring-2
                    focus:ring-amber-400
                  `

                  : `
                    border-gray-200
                    dark:border-slate-700
                    focus:ring-2
                    focus:ring-blue-600
                  `
              }
            `}

          />


          <button

            type="submit"

            disabled={loading}

            className="
              bg-[#1D3681]
              hover:bg-[#162b68]
              text-white
              px-8
              py-3
              rounded-xl
              font-bold
              flex
              items-center
              justify-center
              gap-2
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
              md:min-w-[220px]
            "
          >

            {

              loading

              ?

              <>

                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />

                Guardando análisis...

              </>

              :

              <>

                <Search
                  size={20}
                />

                Analizar documento

              </>

            }

          </button>

        </form>



        {/* AVISO NOMBRE INCORRECTO */}

        {
          errorNombre &&

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-amber-200
              bg-amber-50
              dark:bg-amber-950/20
              dark:border-amber-800
              overflow-hidden
            "
          >

            <div
              className="
                px-5
                py-4
                flex
                items-center
                justify-between
                border-b
                border-amber-200
                dark:border-amber-800
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
                    w-10
                    h-10
                    rounded-xl
                    bg-amber-100
                    dark:bg-amber-900/40
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <AlertTriangle
                    size={21}
                    className="
                      text-amber-600
                      dark:text-amber-400
                    "
                  />

                </div>


                <div>

                  <h4
                    className="
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >

                    El nombre necesita corregirse

                  </h4>


                  <p
                    className="
                      text-sm
                      text-amber-700
                      dark:text-amber-400
                    "
                  >

                    Tu documento todavía no será evaluado
                    por la aplicación APA Reviewer.
                    Se te podría descontar 2 puntos.

                  </p>

                </div>

              </div>


              <button

                type="button"

                onClick={
                  cerrarAvisoNombre
                }

                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-gray-700
                  hover:bg-amber-100
                  dark:hover:bg-amber-900/40
                  transition
                "
              >

                <X size={18} />

              </button>

            </div>


            <div
              className="p-5"
            >

              <p
                className="
                  text-sm
                  text-gray-600
                  dark:text-gray-400
                  leading-relaxed
                "
              >

                El sistema detectó que el nombre
                de tu documento no coincide con el
                formato establecido.

              </p>


              <div
                className="
                  mt-4
                  rounded-xl
                  bg-white
                  dark:bg-slate-900
                  border
                  border-amber-200
                  dark:border-slate-700
                  p-4
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    font-bold
                    text-gray-500
                    dark:text-gray-400
                  "
                >

                  Nombre detectado

                </p>


                <p
                  className="
                    mt-2
                    font-mono
                    text-sm
                    font-bold
                    text-red-600
                    dark:text-red-400
                    break-all
                  "
                >

                  {nombreDetectado}

                </p>

              </div>


              <div
                className="
                  mt-4
                  rounded-xl
                  bg-white
                  dark:bg-slate-900
                  border
                  border-gray-200
                  dark:border-slate-700
                  p-4
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    font-bold
                    text-gray-500
                    dark:text-gray-400
                  "
                >

                  Debe tener este formato

                </p>


                <p
                  className="
                    mt-2
                    font-mono
                    text-base
                    font-bold
                    text-[#1D3681]
                    dark:text-blue-400
                    break-all
                  "
                >

                  ASE###S#_IS#_EN#_ApellidoNombre

                </p>

              </div>


              <div
                className="
                  mt-4
                  rounded-xl
                  bg-blue-50
                  dark:bg-blue-950/30
                  border
                  border-blue-100
                  dark:border-blue-900
                  p-4
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    font-bold
                    text-blue-600
                    dark:text-blue-400
                  "
                >

                  Ejemplo válido

                </p>


                <p
                  className="
                    mt-2
                    font-mono
                    font-bold
                    text-gray-800
                    dark:text-gray-200
                    break-all
                  "
                >

                  ASE123S4_IS5_EN6_PerezJuan

                </p>

              </div>


              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-gray-600
                  dark:text-gray-400
                "
              >

                <span
                  className="
                    text-lg
                    leading-none
                  "
                >

                  ✏️

                </span>


                <p>

                  Ve a tu documento de Google Docs,
                  cambia el nombre siguiendo el formato
                  indicado y luego vuelve a intentarlo.

                </p>

              </div>

            </div>

          </div>

        }



        {/* ERROR */}

        {
          errorSistema &&

          <div
            className="
              mt-5
              rounded-xl
              border
              border-red-200
              bg-red-50
              dark:bg-red-950/20
              dark:border-red-900
              p-4
              flex
              items-start
              gap-3
            "
          >

            <AlertTriangle
              size={20}
              className="
                text-red-500
                shrink-0
                mt-0.5
              "
            />


            <p
              className="
                text-sm
                font-medium
                text-red-700
                dark:text-red-400
              "
            >

              {errorSistema}

            </p>

          </div>

        }



        {/* ÉXITO */}

        {
          mensaje &&

          <div
            className="
              mt-5
              rounded-xl
              border
              border-green-200
              bg-green-50
              dark:bg-green-950/20
              dark:border-green-900
              p-4
              flex
              items-center
              gap-3
            "
          >

            <CheckCircle
              size={22}
              className="
                text-green-600
                dark:text-green-400
                shrink-0
              "
            />


            <p
              className="
                text-sm
                font-semibold
                text-green-700
                dark:text-green-400
              "
            >

              {mensaje}

            </p>

          </div>

        }

      </div>

    </div>

  );

}
