// ==================================================
// VG SMART REVIEW
// PÁGINA: REPORTAR INCIDENCIA
// ==================================================

import {
  useEffect,
  useState
} from "react";

import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ImagePlus,
  Loader2,
  Mail,
  MessageSquareWarning,
  Paperclip,
  Send,
  ShieldCheck,
  X
} from "lucide-react";

import { useAuth } from "../../../auth/AuthContext";

import {
  registrarIncidencia
} from "../services/incidenciasService";


// ==================================================
// COMPONENTE
// ==================================================

export default function ReportsIncidencias({
  setPagina
}) {

  // ==================================================
  // AUTH
  // ==================================================

  const {
    user
  } = useAuth();


  // ==================================================
  // ESTADOS
  // ==================================================

  const [
    correo,
    setCorreo
  ] = useState("");


  const [
    tipo,
    setTipo
  ] = useState("");


  const [
    asunto,
    setAsunto
  ] = useState("");


  const [
    descripcion,
    setDescripcion
  ] = useState("");


  const [
    evidencia,
    setEvidencia
  ] = useState(null);


  const [
    vistaPrevia,
    setVistaPrevia
  ] = useState("");


  const [
    enviando,
    setEnviando
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  const [
    exito,
    setExito
  ] = useState(null);


  // ==================================================
  // OBTENER USUARIO
  // ==================================================

  useEffect(() => {

    console.log(
      "===================================="
    );

    console.log(
      "USUARIO PARA INCIDENCIA:"
    );

    console.log(
      user
    );


    const correoUsuario =
      String(
        user?.correo ||
        user?.email ||
        localStorage.getItem("correo") ||
        ""
      )
        .trim()
        .toLowerCase();


    console.log(
      "CORREO PARA INCIDENCIA:",
      correoUsuario
    );


    setCorreo(
      correoUsuario
    );

  }, [user]);


  // ==================================================
  // VOLVER
  // ==================================================

  const volver = () => {

    if (setPagina) {

      setPagina(
        "dashboard"
      );

      return;

    }

    window.history.back();

  };


  // ==================================================
  // SELECCIONAR EVIDENCIA
  // ==================================================

  const manejarEvidencia = (
    event
  ) => {

    const archivo =
      event.target.files?.[0];


    if (!archivo) {

      return;

    }


    // ==================================================
    // VALIDAR TIPO
    // ==================================================

    if (
      !archivo.type.startsWith(
        "image/"
      )
    ) {

      setError(
        "La evidencia debe ser una imagen."
      );

      return;

    }


    // ==================================================
    // VALIDAR TAMAÑO
    // ==================================================

    if (
      archivo.size >
      5 * 1024 * 1024
    ) {

      setError(
        "La imagen no debe superar los 5 MB."
      );

      return;

    }


    setError("");


    setEvidencia(
      archivo
    );


    // ==================================================
    // PREVIEW
    // ==================================================

    const url =
      URL.createObjectURL(
        archivo
      );


    setVistaPrevia(
      url
    );

  };


  // ==================================================
  // ELIMINAR EVIDENCIA
  // ==================================================

  const eliminarEvidencia = () => {

    if (vistaPrevia) {

      URL.revokeObjectURL(
        vistaPrevia
      );

    }


    setEvidencia(
      null
    );


    setVistaPrevia(
      ""
    );

  };


  // ==================================================
  // ENVIAR
  // ==================================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    setError("");


    setExito(null);


    // ==================================================
    // VALIDAR CORREO
    // ==================================================

    if (!correo) {

      setError(
        "No se pudo identificar al usuario. Cierra sesión y vuelve a ingresar."
      );

      return;

    }


    // ==================================================
    // VALIDAR TIPO
    // ==================================================

    if (!tipo) {

      setError(
        "Selecciona el tipo de incidencia."
      );

      return;

    }


    // ==================================================
    // VALIDAR ASUNTO
    // ==================================================

    if (
      !asunto.trim()
    ) {

      setError(
        "Ingresa el asunto de la incidencia."
      );

      return;

    }


    // ==================================================
    // VALIDAR DESCRIPCIÓN
    // ==================================================

    if (
      !descripcion.trim()
    ) {

      setError(
        "Ingresa la descripción del problema."
      );

      return;

    }


    // ==================================================
    // VALIDAR DESCRIPCIÓN MÍNIMA
    // ==================================================

    if (
      descripcion.trim().length < 15
    ) {

      setError(
        "Describe un poco más el problema para facilitar la revisión."
      );

      return;

    }


    try {

      setEnviando(
        true
      );


      console.log(
        "===================================="
      );

      console.log(
        "ENVIANDO INCIDENCIA"
      );

      console.log({

        correo,

        tipo,

        asunto,

        descripcion,

        evidencia:
          evidencia?.name || null

      });


      // ==================================================
      // REGISTRAR
      // ==================================================

      const resultado =
        await registrarIncidencia({

          correo,

          tipo,

          asunto,

          descripcion,

          evidencia

        });


      console.log(
        "RESPUESTA INCIDENCIA:"
      );

      console.log(
        resultado
      );


      // ==================================================
      // ÉXITO
      // ==================================================

      setExito({

        id:
          resultado?.id ||
          resultado?.data?.id ||
          "INC-REGISTRADA",

        mensaje:
          resultado?.mensaje ||
          resultado?.message ||
          "Incidencia registrada correctamente."

      });


      // ==================================================
      // LIMPIAR FORMULARIO
      // ==================================================

      setTipo("");

      setAsunto("");

      setDescripcion("");

      eliminarEvidencia();

    }
    catch (error) {

      console.error(
        "===================================="
      );

      console.error(
        "ERROR ENVIANDO INCIDENCIA:",
        error
      );


      setError(
        error?.message ||
        "No se pudo registrar la incidencia."
      );

    }
    finally {

      setEnviando(
        false
      );

    }

  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div
      className="
        min-h-full
        space-y-5
        pb-6
      "
    >


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
          px-3.5
          py-2
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
          size={17}
          className="
            transition-transform
            group-hover:-translate-x-1
          "
        />

        Volver al inicio

      </button>


      {/* ==================================================
          CABECERA
      ================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-20
            h-52
            w-52
            rounded-full
            bg-blue-100/70
            blur-2xl
            dark:bg-blue-900/20
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            right-32
            h-40
            w-40
            rounded-full
            bg-amber-100/70
            blur-2xl
            dark:bg-amber-900/20
          "
        />


        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-5
            px-6
            py-5
            md:px-7
          "
        >

          {/* INFORMACIÓN */}

          <div className="min-w-0">

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-[10px]
                font-black
                uppercase
                tracking-wider
                text-[#1D3681]
                dark:bg-blue-900/30
                dark:text-blue-300
              "
            >

              <ShieldCheck
                size={13}
              />

              Centro de soporte

            </div>


            <h1
              className="
                mt-2
                text-2xl
                font-black
                tracking-tight
                text-slate-900
                md:text-3xl
                dark:text-white
              "
            >

              Reportar una incidencia

            </h1>


            <p
              className="
                mt-1
                max-w-2xl
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >

              Ayúdanos a mejorar VG Smart Review reportando
              cualquier problema que encuentres.

            </p>

          </div>


          {/* ICONO */}

          <div
            className="
              hidden
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-[#1D3681]
              sm:flex
              dark:bg-blue-900/30
              dark:text-blue-300
            "
          >

            <MessageSquareWarning
              size={31}
            />

          </div>

        </div>

      </section>


      {/* ==================================================
          CONTENIDO 2 COLUMNAS
      ================================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          grid
          gap-5
          lg:grid-cols-[minmax(0,1fr)_330px]
          lg:items-start
        "
      >


        {/* ==================================================
            COLUMNA IZQUIERDA
        ================================================== */}

        <section
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            md:p-6
            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          {/* ENCABEZADO */}

          <div
            className="
              mb-5
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
                bg-blue-50
                text-[#1D3681]
                dark:bg-blue-900/30
                dark:text-blue-300
              "
            >

              <MessageSquareWarning
                size={19}
              />

            </div>


            <div>

              <h2
                className="
                  text-lg
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >

                Detalles de la incidencia

              </h2>


              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >

                Completa la información del problema.

              </p>

            </div>

          </div>


          {/* ==================================================
              USUARIO
          ================================================== */}

          <div
            className="
              mb-5
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/70
              p-4
              dark:border-emerald-900/40
              dark:bg-emerald-900/10
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
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-100
                  text-emerald-600
                  dark:bg-emerald-900/40
                  dark:text-emerald-400
                "
              >

                <Mail
                  size={17}
                />

              </div>


              <div className="min-w-0">

                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                    text-emerald-700
                    dark:text-emerald-400
                  "
                >

                  Reportando como

                </p>


                <p
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >

                  {correo ||
                    "Usuario no identificado"
                  }

                </p>

              </div>


              <div
                className="
                  ml-auto
                  hidden
                  rounded-full
                  bg-emerald-100
                  px-2
                  py-1
                  text-[9px]
                  font-black
                  uppercase
                  text-emerald-700
                  sm:block
                  dark:bg-emerald-900/40
                  dark:text-emerald-400
                "
              >

                Sesión activa

              </div>

            </div>

          </div>


          {/* ==================================================
              TIPO + ASUNTO
          ================================================== */}

          <div
            className="
              grid
              gap-4
              md:grid-cols-[210px_1fr]
            "
          >

            {/* TIPO */}

            <div>

              <label
                className="
                  mb-1.5
                  block
                  text-xs
                  font-black
                  text-slate-700
                  dark:text-slate-300
                "
              >

                Tipo de incidencia
                <span className="text-red-500">
                  {" "}*
                </span>

              </label>


              <select
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value)
                }
                disabled={enviando}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  transition
                  focus:border-blue-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:focus:bg-slate-800
                "
              >

                <option value="">
                  Selecciona una opción
                </option>

                <option value="Problema de acceso">
                  Problema de acceso
                </option>

                <option value="Problema con evaluación">
                  Problema con evaluación
                </option>

                <option value="Problema de visualización">
                  Problema de visualización
                </option>

                <option value="Error del sistema">
                  Error del sistema
                </option>

                <option value="Problema con resultados">
                  Problema con resultados
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

            </div>


            {/* ASUNTO */}

            <div>

              <div
                className="
                  mb-1.5
                  flex
                  items-center
                  justify-between
                "
              >

                <label
                  className="
                    text-xs
                    font-black
                    text-slate-700
                    dark:text-slate-300
                  "
                >

                  Asunto
                  <span className="text-red-500">
                    {" "}*
                  </span>

                </label>


                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-slate-400
                  "
                >

                  {asunto.length}/150

                </span>

              </div>


              <input
                type="text"
                value={asunto}
                onChange={(e) =>
                  setAsunto(
                    e.target.value.slice(
                      0,
                      150
                    )
                  )
                }
                disabled={enviando}
                placeholder="Ej. No puedo cargar mi evaluación"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-blue-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:focus:bg-slate-800
                "
              />

            </div>

          </div>


          {/* ==================================================
              DESCRIPCIÓN
          ================================================== */}

          <div className="mt-4">

            <div
              className="
                mb-1.5
                flex
                items-center
                justify-between
              "
            >

              <label
                className="
                  text-xs
                  font-black
                  text-slate-700
                  dark:text-slate-300
                "
              >

                Descripción del problema
                <span className="text-red-500">
                  {" "}*
                </span>

              </label>


              <span
                className="
                  text-[10px]
                  font-semibold
                  text-slate-400
                "
              >

                {descripcion.length}/1500

              </span>

            </div>


            <textarea
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value.slice(
                    0,
                    1500
                  )
                )
              }
              disabled={enviando}
              rows={6}
              placeholder="Explica qué ocurrió, qué estabas haciendo y qué mensaje apareció..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                py-3
                text-sm
                leading-6
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-400
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
                disabled:cursor-not-allowed
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
                dark:focus:bg-slate-800
              "
            />

          </div>


          {/* ==================================================
              AYUDA
          ================================================== */}

          <div
            className="
              mt-3
              flex
              items-start
              gap-2
              text-[11px]
              leading-5
              text-slate-400
            "
          >

            <AlertTriangle
              size={14}
              className="
                mt-0.5
                shrink-0
                text-amber-500
              "
            />

            <span>
              Describe el problema con suficiente detalle
              para que el equipo pueda reproducirlo y revisarlo.
            </span>

          </div>

        </section>


        {/* ==================================================
            COLUMNA DERECHA
        ================================================== */}

        <div
          className="
            space-y-4
          "
        >


          {/* ==================================================
              EVIDENCIA
          ================================================== */}

          <section
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div
              className="
                mb-4
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
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-50
                  text-violet-600
                  dark:bg-violet-900/30
                  dark:text-violet-400
                "
              >

                <ImagePlus
                  size={19}
                />

              </div>


              <div>

                <h2
                  className="
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >

                  Evidencia

                  <span
                    className="
                      ml-2
                      text-[10px]
                      font-bold
                      text-slate-400
                    "
                  >
                    Opcional
                  </span>

                </h2>


                <p
                  className="
                    text-[11px]
                    text-slate-400
                  "
                >

                  Adjunta una captura del problema.

                </p>

              </div>

            </div>


            {!evidencia ? (

              <label
                className="
                  group
                  flex
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-7
                  text-center
                  transition-all
                  hover:border-blue-300
                  hover:bg-blue-50/50
                  dark:border-slate-700
                  dark:bg-slate-800/50
                  dark:hover:border-blue-700
                  dark:hover:bg-blue-900/10
                "
              >

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    manejarEvidencia
                  }
                  disabled={
                    enviando
                  }
                  className="hidden"
                />


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-slate-400
                    shadow-sm
                    transition
                    group-hover:scale-105
                    group-hover:text-[#1D3681]
                    dark:bg-slate-800
                  "
                >

                  <Paperclip
                    size={21}
                  />

                </div>


                <p
                  className="
                    mt-3
                    text-sm
                    font-bold
                    text-slate-700
                    dark:text-slate-200
                  "
                >

                  Adjuntar captura

                </p>


                <p
                  className="
                    mt-1
                    text-[10px]
                    text-slate-400
                  "
                >

                  PNG, JPG o JPEG · Máx. 5 MB

                </p>

              </label>

            ) : (

              <div>

                {/* PREVIEW */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                  "
                >

                  {vistaPrevia && (

                    <img
                      src={
                        vistaPrevia
                      }
                      alt="Vista previa de evidencia"
                      className="
                        h-44
                        w-full
                        object-cover
                      "
                    />

                  )}


                  <button
                    type="button"
                    onClick={
                      eliminarEvidencia
                    }
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-900/80
                      text-white
                      backdrop-blur
                      transition
                      hover:bg-red-600
                    "
                  >

                    <X
                      size={15}
                    />

                  </button>

                </div>


                {/* INFO ARCHIVO */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-slate-50
                    p-3
                    dark:bg-slate-800
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-violet-100
                      text-violet-600
                      dark:bg-violet-900/40
                      dark:text-violet-400
                    "
                  >

                    <ImagePlus
                      size={17}
                    />

                  </div>


                  <div className="min-w-0">

                    <p
                      className="
                        truncate
                        text-xs
                        font-bold
                        text-slate-700
                        dark:text-slate-200
                      "
                    >

                      {evidencia.name}

                    </p>


                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        text-slate-400
                      "
                    >

                      {(
                        evidencia.size /
                        1024 /
                        1024
                      ).toFixed(2)} MB

                    </p>

                  </div>

                </div>

              </div>

            )}

          </section>


          {/* ==================================================
              PROCESO
          ================================================== */}

          <section
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <p
              className="
                mb-3
                text-[10px]
                font-black
                uppercase
                tracking-wider
                text-slate-400
              "
            >

              ¿Qué sucede después?

            </p>


            <div
              className="
                space-y-3
              "
            >

              <ProcesoItem
                numero="01"
                icon={
                  <MessageSquareWarning
                    size={15}
                  />
                }
                titulo="Reporte enviado"
                texto="Registramos tu incidencia."
              />


              <ProcesoItem
                numero="02"
                icon={
                  <Clock3
                    size={15}
                  />
                }
                titulo="Revisión"
                texto="El equipo analiza el problema."
              />


              <ProcesoItem
                numero="03"
                icon={
                  <CheckCircle2
                    size={15}
                  />
                }
                titulo="Seguimiento"
                texto="Se trabaja en una solución."
              />

            </div>

          </section>

        </div>


        {/* ==================================================
            MENSAJE ERROR
        ================================================== */}

        {error && (

          <div
            className="
              lg:col-span-2
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              text-red-700
              dark:border-red-900/50
              dark:bg-red-900/10
              dark:text-red-300
            "
          >

            <AlertTriangle
              size={19}
              className="
                mt-0.5
                shrink-0
              "
            />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* ==================================================
            MENSAJE ÉXITO
        ================================================== */}

        {exito && (

          <div
            className="
              lg:col-span-2
              overflow-hidden
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              dark:border-emerald-900/50
              dark:bg-emerald-900/10
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                p-4
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
                  bg-emerald-100
                  text-emerald-600
                  dark:bg-emerald-900/40
                  dark:text-emerald-400
                "
              >

                <CheckCircle2
                  size={21}
                />

              </div>


              <div>

                <p
                  className="
                    font-black
                    text-emerald-800
                    dark:text-emerald-300
                  "
                >

                  ¡Incidencia registrada correctamente!

                </p>


                <p
                  className="
                    mt-0.5
                    text-xs
                    text-emerald-700
                    dark:text-emerald-400
                  "
                >

                  Código de seguimiento:

                  <span
                    className="
                      ml-1
                      font-black
                    "
                  >
                    {exito.id}
                  </span>

                </p>

              </div>

            </div>

          </div>

        )}


        {/* ==================================================
            BOTÓN ENVIAR
        ================================================== */}

        <div
          className="
            lg:col-span-2
            flex
            justify-end
          "
        >

          <button
            type="submit"
            disabled={
              enviando ||
              !correo
            }
            className="
              group
              inline-flex
              min-w-[220px]
              items-center
              justify-center
              gap-2.5
              rounded-2xl
              bg-[#1D3681]
              px-6
              py-3.5
              text-sm
              font-black
              text-white
              shadow-lg
              shadow-blue-900/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#162b6b]
              hover:shadow-xl
              hover:shadow-blue-900/25
              active:translate-y-0
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >

            {enviando ? (

              <>

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Enviando incidencia...

              </>

            ) : (

              <>

                <Send
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-0.5
                  "
                />

                Enviar incidencia

              </>

            )}

          </button>

        </div>

      </form>


      {/* ==================================================
          PIE
      ================================================== */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          text-[10px]
          text-slate-400
        "
      >

        <ShieldCheck
          size={12}
        />

        <span>
          Tu información se utiliza únicamente para gestionar
          la incidencia reportada.
        </span>

      </div>

    </div>

  );

}


// ==================================================
// COMPONENTE PROCESO
// ==================================================

function ProcesoItem({
  numero,
  icon,
  titulo,
  texto
}) {

  return (

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
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-slate-100
          text-[#1D3681]
          dark:bg-slate-800
          dark:text-blue-300
        "
      >

        {icon}

      </div>


      <div className="min-w-0 flex-1">

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              text-[9px]
              font-black
              text-slate-300
              dark:text-slate-600
            "
          >
            {numero}
          </span>


          <p
            className="
              text-xs
              font-black
              text-slate-700
              dark:text-slate-200
            "
          >

            {titulo}

          </p>

        </div>


        <p
          className="
            text-[10px]
            text-slate-400
          "
        >

          {texto}

        </p>

      </div>

    </div>

  );

}
