import {
  useEffect,
  useState
} from "react";

import {
  Star,
  Send,
  MessageSquareText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Heart,
  Quote,
  ShieldCheck
} from "lucide-react";

import {
  registrarTestimonio
} from "../services/testimoniosService";



export default function TestimonialForm() {

  // ==================================================
  // ESTADOS
  // ==================================================

  const [
    usuario,
    setUsuario
  ] = useState(null);

  const [
    correo,
    setCorreo
  ] = useState("");

  const [
    nombre,
    setNombre
  ] = useState("Estudiante");

  const [
    calificacion,
    setCalificacion
  ] = useState(5);

  const [
    experiencia,
    setExperiencia
  ] = useState("");

  const [
    ayuda,
    setAyuda
  ] = useState("");

  const [
    enviando,
    setEnviando
  ] = useState(false);

  const [
    exito,
    setExito
  ] = useState("");

  const [
    error,
    setError
  ] = useState("");

  const [
    hoverEstrella,
    setHoverEstrella
  ] = useState(0);



  // ==================================================
  // CARGAR USUARIO
  // ==================================================

  useEffect(() => {

    cargarUsuario();

  }, []);



  function cargarUsuario() {

    try {

      const usuarioGuardado =
        localStorage.getItem("usuario");


      let usuarioLocal = null;


      if (usuarioGuardado) {

        try {

          usuarioLocal =
            JSON.parse(usuarioGuardado);

        } catch {

          usuarioLocal = null;

        }

      }


      const correoLocal =
        String(
          usuarioLocal?.correo ||
          usuarioLocal?.email ||
          localStorage.getItem("correo") ||
          ""
        )
          .trim()
          .toLowerCase();


      const nombreLocal =
        String(
          usuarioLocal?.nombre ||
          usuarioLocal?.displayName ||
          "Estudiante"
        )
          .trim();


      setUsuario(usuarioLocal);
      setCorreo(correoLocal);
      setNombre(nombreLocal);


      console.log(
        "===================================="
      );

      console.log(
        "USUARIO PARA TESTIMONIO:",
        usuarioLocal
      );

      console.log(
        "CORREO TESTIMONIO:",
        correoLocal
      );

    }
    catch (err) {

      console.error(
        "Error obteniendo usuario:",
        err
      );

      setError(
        "No se pudo identificar al usuario."
      );

    }

  }



  // ==================================================
  // CONTADORES
  // ==================================================

  const cantidadExperiencia =
    experiencia.length;

  const cantidadAyuda =
    ayuda.length;



  // ==================================================
  // ENVIAR TESTIMONIO
  // ==================================================

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setExito("");


    if (!correo) {

      setError(
        "No se pudo identificar tu correo. Cierra sesión y vuelve a ingresar."
      );

      return;

    }


    if (
      experiencia.trim().length < 10
    ) {

      setError(
        "Cuéntanos un poco más sobre tu experiencia. Mínimo 10 caracteres."
      );

      return;

    }


    if (
      ayuda.trim().length < 10
    ) {

      setError(
        "Cuéntanos cómo te ayudó VG Smart Review. Mínimo 10 caracteres."
      );

      return;

    }


    try {

      setEnviando(true);


      const resultado =
        await registrarTestimonio({

          nombre,
          correo,
          calificacion,
          experiencia,
          ayuda

        });


      console.log(
        "RESPUESTA:",
        resultado
      );


      setExito(
        "¡Gracias por compartir tu experiencia! Tu testimonio fue enviado correctamente y será revisado antes de publicarse."
      );


      setExperiencia("");
      setAyuda("");
      setCalificacion(5);
      setHoverEstrella(0);

    }
    catch (err) {

      console.error(
        "ERROR ENVIANDO TESTIMONIO:",
        err
      );


      setError(
        err?.message ||
        "No se pudo enviar el testimonio."
      );

    }
    finally {

      setEnviando(false);

    }

  }



  // ==================================================
  // RENDER
  // ==================================================

  return (

    <section
      className="
        relative
        w-full
        overflow-hidden
        rounded-[2rem]
        border
        border-slate-200
        bg-white
        shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]
      "
    >

      {/* ==================================================
          DECORACIÓN GENERAL
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-100/60
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-[35%]
          h-72
          w-72
          rounded-full
          bg-indigo-100/40
          blur-3xl
        "
      />



      {/* ==================================================
          CONTENIDO PRINCIPAL
      ================================================== */}

      <div
        className="
          relative
          grid
          lg:min-h-[560px]
          lg:grid-cols-[0.9fr_1.1fr]
          xl:min-h-[520px]
        "
      >


        {/* ==================================================
            COLUMNA IZQUIERDA
        ================================================== */}

        <aside
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#12255C]
            via-[#1D3681]
            to-[#3156B3]
            px-7
            py-8
            text-white
            sm:px-9
            lg:px-10
            lg:py-9
            xl:px-12
          "
        >

          {/* DECORACIÓN */}

          <div
            className="
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-white/[0.07]
            "
          />


          <div
            className="
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-white/[0.05]
            "
          />


          <div
            className="
              absolute
              right-12
              top-[45%]
              h-20
              w-20
              rounded-full
              border
              border-white/10
            "
          />


          <div className="relative flex h-full flex-col">


            {/* ==================================================
                ICONO + ETIQUETA
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  ring-1
                  ring-white/20
                  shadow-lg
                "
              >

                <MessageSquareText
                  size={23}
                  strokeWidth={1.8}
                />

              </div>


              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-blue-100
                  backdrop-blur-sm
                "
              >

                <Sparkles size={11} />

                Comunidad académica

              </span>

            </div>



            {/* ==================================================
                TITULO
            ================================================== */}

            <div className="mt-7">

              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-blue-200
                "
              >

                VG Smart Review

              </p>


              <h2
                className="
                  mt-2
                  max-w-md
                  text-[2rem]
                  font-black
                  leading-[1.08]
                  tracking-tight
                  sm:text-[2.2rem]
                "
              >

                Tu experiencia
                <span
                  className="
                    block
                    text-blue-200
                  "
                >
                  también cuenta.
                </span>

              </h2>


              <p
                className="
                  mt-4
                  max-w-md
                  text-sm
                  leading-6
                  text-blue-100
                "
              >

                Comparte cómo ha sido tu experiencia
                utilizando VG Smart Review y ayuda a
                otros estudiantes a conocer mejor la
                plataforma.

              </p>

            </div>



            {/* ==================================================
                FRASE DESTACADA
            ================================================== */}

            <div
              className="
                mt-7
                rounded-2xl
                border
                border-white/10
                bg-white/[0.08]
                p-4
                backdrop-blur-md
              "
            >

              <div
                className="
                  flex
                  gap-3
                "
              >

                <Quote
                  size={20}
                  className="
                    mt-0.5
                    shrink-0
                    text-blue-200
                  "
                />


                <p
                  className="
                    text-xs
                    leading-5
                    text-white
                  "
                >

                  Tu opinión nos permite mejorar la
                  experiencia académica y construir una
                  plataforma cada vez más útil para
                  nuestra comunidad.

                </p>

              </div>

            </div>



            {/* ==================================================
                USUARIO
            ================================================== */}

            <div
              className="
                mt-auto
                pt-7
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
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-white/10
                    ring-1
                    ring-white/20
                  "
                >

                  {
                    usuario?.foto

                      ?

                      <img
                        src={usuario.foto}
                        alt={nombre}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                      :

                      <User
                        size={17}
                        className="text-white/80"
                      />

                  }

                </div>


                <div className="min-w-0">

                  <p
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-white
                    "
                  >

                    {nombre}

                  </p>


                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      font-medium
                      text-blue-200
                    "
                  >

                    Estudiante · Comunidad VG Smart Review

                  </p>

                </div>

              </div>

            </div>

          </div>

        </aside>



        {/* ==================================================
            COLUMNA DERECHA
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            relative
            flex
            flex-col
            px-7
            py-7
            sm:px-9
            lg:px-10
            lg:py-8
            xl:px-12
          "
        >


          {/* ==================================================
              CABECERA
          ================================================== */}

          <div>

            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#3156B3]
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#3156B3]
                "
              />

              Comparte tu opinión

            </div>


            <h3
              className="
                mt-2
                text-2xl
                font-black
                tracking-tight
                text-slate-900
                xl:text-[1.8rem]
              "
            >

              ¿Cómo ha sido tu experiencia?

            </h3>


            <p
              className="
                mt-1.5
                text-xs
                leading-5
                text-slate-500
              "
            >

              Tu valoración puede ayudar a otros estudiantes
              y contribuir a mejorar la plataforma.

            </p>

          </div>



          {/* ==================================================
              CALIFICACIÓN COMPACTA
          ================================================== */}

          <div
            className="
              mt-5
              flex
              flex-col
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3.5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >

                Tu valoración

              </p>


              <p
                className="
                  mt-0.5
                  text-xs
                  font-bold
                  text-slate-700
                "
              >

                {
                  calificacion === 5
                    ? "Excelente experiencia"
                    : calificacion === 4
                    ? "Muy buena experiencia"
                    : calificacion === 3
                    ? "Buena experiencia"
                    : calificacion === 2
                    ? "Puede mejorar"
                    : "Necesita mejorar"
                }

              </p>

            </div>


            <div
              className="
                flex
                items-center
                gap-1
              "
            >

              {
                [1, 2, 3, 4, 5].map(
                  estrella => (

                    <button
                      key={estrella}
                      type="button"
                      onClick={() =>
                        setCalificacion(
                          estrella
                        )
                      }
                      onMouseEnter={() =>
                        setHoverEstrella(
                          estrella
                        )
                      }
                      onMouseLeave={() =>
                        setHoverEstrella(0)
                      }
                      className="
                        rounded-lg
                        p-0.5
                        transition-all
                        duration-150
                        hover:scale-110
                        focus:outline-none
                      "
                    >

                      <Star
                        size={23}
                        className={
                          (
                            hoverEstrella ||
                            calificacion
                          ) >= estrella

                            ?

                            "fill-amber-400 text-amber-400"

                            :

                            "text-slate-300"
                        }
                      />

                    </button>

                  )
                )
              }


              <span
                className="
                  ml-2
                  text-xs
                  font-black
                  text-slate-500
                "
              >

                {calificacion}/5

              </span>

            </div>

          </div>



          {/* ==================================================
              CAMPOS EN DOS COLUMNAS
          ================================================== */}

          <div
            className="
              mt-5
              grid
              gap-4
              md:grid-cols-2
            "
          >

            {/* ==================================================
                EXPERIENCIA
            ================================================== */}

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
                    text-slate-800
                  "
                >

                  Tu experiencia

                  <span className="text-red-500">
                    {" "}*
                  </span>

                </label>


                <span
                  className="
                    text-[9px]
                    font-bold
                    text-slate-400
                  "
                >

                  {cantidadExperiencia}/500

                </span>

              </div>


              <textarea
                value={experiencia}
                onChange={e =>
                  setExperiencia(
                    e.target.value.slice(
                      0,
                      500
                    )
                  )
                }
                rows={6}
                placeholder="Cuéntanos qué te pareció utilizar VG Smart Review..."
                className="
                  h-[155px]
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-xs
                  leading-5
                  text-slate-800
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  hover:border-slate-300
                  focus:border-[#3156B3]
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />

            </div>



            {/* ==================================================
                AYUDA
            ================================================== */}

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
                    text-slate-800
                  "
                >

                  ¿Cómo te ayudó?

                  <span className="text-red-500">
                    {" "}*
                  </span>

                </label>


                <span
                  className="
                    text-[9px]
                    font-bold
                    text-slate-400
                  "
                >

                  {cantidadAyuda}/500

                </span>

              </div>


              <textarea
                value={ayuda}
                onChange={e =>
                  setAyuda(
                    e.target.value.slice(
                      0,
                      500
                    )
                  )
                }
                rows={6}
                placeholder="Por ejemplo: me ayudó a identificar errores y mejorar mis documentos..."
                className="
                  h-[155px]
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-xs
                  leading-5
                  text-slate-800
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  hover:border-slate-300
                  focus:border-[#3156B3]
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />

            </div>

          </div>



          {/* ==================================================
              MENSAJES
          ================================================== */}

          {
            error && (

              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-2.5
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-3.5
                  py-3
                "
              >

                <AlertCircle
                  size={16}
                  className="
                    mt-0.5
                    shrink-0
                    text-red-500
                  "
                />


                <p
                  className="
                    text-[11px]
                    font-semibold
                    leading-5
                    text-red-700
                  "
                >

                  {error}

                </p>

              </div>

            )
          }


          {
            exito && (

              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-2.5
                  rounded-xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-3.5
                  py-3
                "
              >

                <CheckCircle2
                  size={16}
                  className="
                    mt-0.5
                    shrink-0
                    text-emerald-600
                  "
                />


                <p
                  className="
                    text-[11px]
                    font-semibold
                    leading-5
                    text-emerald-700
                  "
                >

                  {exito}

                </p>

              </div>

            )
          }



          {/* ==================================================
              BOTÓN
          ================================================== */}

          <div
            className="
              mt-auto
              pt-5
            "
          >

            <button
              type="submit"
              disabled={
                enviando ||
                !correo ||
                experiencia.trim().length < 10 ||
                ayuda.trim().length < 10
              }
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-2xl
                bg-gradient-to-r
                from-[#1D3681]
                to-[#3156B3]
                px-5
                py-3.5
                text-sm
                font-black
                text-white
                shadow-lg
                shadow-blue-900/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:from-[#172B68]
                hover:to-[#294A9E]
                hover:shadow-xl
                active:translate-y-0
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {
                enviando

                  ?

                  <>

                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Enviando testimonio...

                  </>

                  :

                  <>

                    <Send size={17} />

                    Enviar testimonio

                  </>

              }

            </button>


            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-1.5
              "
            >

              <ShieldCheck
                size={12}
                className="text-slate-400"
              />


              <p
                className="
                  text-[9px]
                  text-slate-400
                "
              >

                Tu testimonio será revisado antes de publicarse.

              </p>

            </div>

          </div>

        </form>

      </div>

    </section>

  );

}
