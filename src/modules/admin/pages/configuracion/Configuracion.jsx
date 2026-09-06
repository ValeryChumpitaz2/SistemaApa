import {
  Camera,
  Check,
  Globe,
  ImagePlus,
  Moon,
  Palette,
  Save,
  Settings,
  Sun,
  UserRound,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";


// =====================================================
// CONFIGURACIÓN DEL ADMINISTRADOR
// =====================================================

const PERFIL_POR_DEFECTO = {
  nombre: "Administrador",
  correo: "admin@vallegrande.edu.pe",
  foto: "",
  rol: "Administrador",
};


// =====================================================
// COMPONENTE
// =====================================================

export default function Configuracion() {

  // ===================================================
  // PERFIL
  // ===================================================

  const [nombre, setNombre] =
    useState(
      PERFIL_POR_DEFECTO.nombre
    );

  const [correo, setCorreo] =
    useState(
      PERFIL_POR_DEFECTO.correo
    );

  const [foto, setFoto] =
    useState(
      PERFIL_POR_DEFECTO.foto
    );


  // ===================================================
  // APARIENCIA
  // ===================================================

  const [tema, setTema] =
    useState(
      localStorage.getItem(
        "adminTema"
      ) || "claro"
    );


  // ===================================================
  // IDIOMA
  // ===================================================

  const [idioma, setIdioma] =
    useState(
      localStorage.getItem(
        "adminIdioma"
      ) || "es"
    );


  // ===================================================
  // ESTADO GUARDADO
  // ===================================================

  const [guardado, setGuardado] =
    useState(false);


  const [mensaje, setMensaje] =
    useState("");


  const inputFoto =
    useRef(null);


  // ===================================================
  // CARGAR PERFIL
  // ===================================================

  useEffect(() => {

    try {

      const perfilGuardado =
        localStorage.getItem(
          "adminPerfil"
        );


      if (perfilGuardado) {

        const perfil =
          JSON.parse(
            perfilGuardado
          );


        setNombre(
          perfil?.nombre ||
          PERFIL_POR_DEFECTO.nombre
        );


        setCorreo(
          perfil?.correo ||
          PERFIL_POR_DEFECTO.correo
        );


        setFoto(
          perfil?.foto ||
          ""
        );

      }

    }
    catch (error) {

      console.error(
        "Error cargando perfil:",
        error
      );

    }

  }, []);


  // ===================================================
  // CAMBIAR TEMA
  // ===================================================

  useEffect(() => {

    const root =
      document.documentElement;


    if (tema === "oscuro") {

      root.classList.add(
        "dark"
      );

    }
    else {

      root.classList.remove(
        "dark"
      );

    }


    localStorage.setItem(
      "adminTema",
      tema
    );

  }, [tema]);


  // ===================================================
  // CAMBIAR FOTO
  // ===================================================

  function seleccionarFoto(
    event
  ) {

    const archivo =
      event.target.files?.[0];


    if (!archivo) {
      return;
    }


    // -----------------------------------------------
    // Validar imagen
    // -----------------------------------------------

    if (
      !archivo.type.startsWith(
        "image/"
      )
    ) {

      setMensaje(
        "Selecciona una imagen válida."
      );

      return;

    }


    // -----------------------------------------------
    // Tamaño máximo
    // -----------------------------------------------

    if (
      archivo.size >
      2 * 1024 * 1024
    ) {

      setMensaje(
        "La imagen no debe superar los 2 MB."
      );

      return;

    }


    const lector =
      new FileReader();


    lector.onload = () => {

      setFoto(
        lector.result
      );

      setMensaje("");

    };


    lector.onerror = () => {

      setMensaje(
        "No se pudo cargar la imagen."
      );

    };


    lector.readAsDataURL(
      archivo
    );

  }


  // ===================================================
  // ELIMINAR FOTO
  // ===================================================

  function eliminarFoto() {

    setFoto("");

    if (inputFoto.current) {

      inputFoto.current.value =
        "";

    }

  }


  // ===================================================
  // GUARDAR
  // ===================================================

  function guardarConfiguracion() {

    try {

      // ===============================================
      // PERFIL
      // ===============================================

      const nuevoPerfil = {

        nombre:
          nombre.trim() ||
          "Administrador",

        correo:
          correo.trim() ||
          "admin@vallegrande.edu.pe",

        foto:
          foto || "",

        rol:
          "Administrador",

      };


      // ===============================================
      // GUARDAR PERFIL
      // ===============================================

      localStorage.setItem(
        "adminPerfil",
        JSON.stringify(
          nuevoPerfil
        )
      );


      // ===============================================
      // GUARDAR IDIOMA
      // ===============================================

      localStorage.setItem(
        "adminIdioma",
        idioma
      );


      // ===============================================
      // GUARDAR TEMA
      // ===============================================

      localStorage.setItem(
        "adminTema",
        tema
      );


      // ===============================================
      // AVISAR AL SIDEBAR
      // ===============================================

      window.dispatchEvent(
        new Event(
          "adminPerfilActualizado"
        )
      );


      // ===============================================
      // CONFIRMACIÓN
      // ===============================================

      setGuardado(
        true
      );

      setMensaje(
        "Los cambios se guardaron correctamente."
      );


      setTimeout(() => {

        setGuardado(
          false
        );

        setMensaje("");

      }, 3000);

    }
    catch (error) {

      console.error(
        "ERROR GUARDANDO CONFIGURACIÓN:",
        error
      );


      setMensaje(
        "No se pudieron guardar los cambios."
      );

    }

  }


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section
      className="
        min-h-[calc(100vh-5rem)]
        w-full
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          mb-8
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >

        <div>

          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-indigo-100
              bg-indigo-50
              px-3
              py-1.5
              text-[11px]
              font-black
              uppercase
              tracking-[0.12em]
              text-indigo-600
              dark:border-indigo-900/50
              dark:bg-indigo-950/30
              dark:text-indigo-400
            "
          >

            <Settings
              size={13}
            />

            Sistema

          </div>


          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              sm:text-4xl
              dark:text-white
            "
          >
            Configuración
          </h1>


          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            Personaliza tu perfil y las
            preferencias del panel administrativo.
          </p>

        </div>


        {/* BOTÓN GUARDAR */}

        <button
          type="button"
          onClick={
            guardarConfiguracion
          }
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1D3681]
            px-6
            text-sm
            font-black
            text-white
            shadow-lg
            shadow-blue-900/20
            transition
            hover:bg-[#172d6d]
            active:scale-[0.98]
          "
        >

          {guardado ? (

            <Check
              size={18}
            />

          ) : (

            <Save
              size={18}
            />

          )}

          {guardado
            ? "Guardado"
            : "Guardar cambios"}

        </button>

      </header>


      {/* =================================================
          MENSAJE
      ================================================= */}

      {mensaje && (

        <div
          className={`
            mb-6
            flex
            items-center
            gap-3
            rounded-xl
            border
            px-4
            py-3
            text-sm
            font-bold

            ${
              mensaje.includes(
                "correctamente"
              )

                ? `
                  border-emerald-200
                  bg-emerald-50
                  text-emerald-700
                  dark:border-emerald-900/50
                  dark:bg-emerald-950/30
                  dark:text-emerald-400
                `

                : `
                  border-red-200
                  bg-red-50
                  text-red-700
                  dark:border-red-900/50
                  dark:bg-red-950/30
                  dark:text-red-400
                `
            }
          `}
        >

          {mensaje.includes(
            "correctamente"
          ) ? (

            <Check size={18} />

          ) : (

            <X size={18} />

          )}

          {mensaje}

        </div>

      )}


      {/* =================================================
          GRID
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[1.3fr_0.7fr]
        "
      >

        {/* =================================================
            PERFIL
        ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-[0_4px_20px_rgba(15,23,42,0.04)]
            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div
            className="
              mb-6
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
                bg-blue-50
                text-blue-600
                dark:bg-blue-950/40
                dark:text-blue-400
              "
            >

              <UserRound
                size={20}
              />

            </div>


            <div>

              <h2
                className="
                  text-base
                  font-black
                  text-slate-900
                  dark:text-white
                "
              >
                Perfil del administrador
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Información visible en el panel.
              </p>

            </div>

          </div>


          {/* FOTO */}

          <div
            className="
              mb-7
              flex
              flex-col
              items-center
              gap-4
              sm:flex-row
            "
          >

            <div
              className="
                relative
                h-28
                w-28
                shrink-0
              "
            >

              {foto ? (

                <img
                  src={foto}
                  alt="Foto del administrador"
                  className="
                    h-28
                    w-28
                    rounded-3xl
                    object-cover
                    shadow-lg
                    ring-4
                    ring-slate-100
                    dark:ring-slate-800
                  "
                />

              ) : (

                <div
                  className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    from-[#1D3681]
                    to-indigo-500
                    text-white
                    shadow-lg
                    ring-4
                    ring-slate-100
                    dark:ring-slate-800
                  "
                >

                  <UserRound
                    size={46}
                  />

                </div>

              )}


              <button
                type="button"
                onClick={() =>
                  inputFoto.current?.click()
                }
                className="
                  absolute
                  -bottom-2
                  -right-2
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border-4
                  border-white
                  bg-[#1D3681]
                  text-white
                  shadow-md
                  transition
                  hover:bg-indigo-700
                  dark:border-slate-900
                "
                title="Cambiar foto"
              >

                <Camera
                  size={17}
                />

              </button>

            </div>


            <div>

              <p
                className="
                  text-sm
                  font-black
                  text-slate-800
                  dark:text-white
                "
              >
                Foto de perfil
              </p>


              <p
                className="
                  mt-1
                  max-w-sm
                  text-xs
                  leading-5
                  text-slate-400
                "
              >
                Sube una imagen JPG, PNG o WEBP.
                Máximo 2 MB.
              </p>


              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    inputFoto.current?.click()
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-slate-100
                    px-3
                    py-2
                    text-xs
                    font-black
                    text-slate-700
                    transition
                    hover:bg-slate-200
                    dark:bg-slate-800
                    dark:text-slate-200
                    dark:hover:bg-slate-700
                  "
                >

                  <ImagePlus
                    size={15}
                  />

                  Cambiar foto

                </button>


                {foto && (

                  <button
                    type="button"
                    onClick={
                      eliminarFoto
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      px-3
                      py-2
                      text-xs
                      font-black
                      text-red-600
                      transition
                      hover:bg-red-50
                      dark:text-red-400
                      dark:hover:bg-red-950/30
                    "
                  >

                    <X
                      size={15}
                    />

                    Quitar

                  </button>

                )}

              </div>


              <input
                ref={inputFoto}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={
                  seleccionarFoto
                }
                className="hidden"
              />

            </div>

          </div>


          {/* CAMPOS */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >

            {/* NOMBRE */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-xs
                  font-black
                  uppercase
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(event) =>
                  setNombre(
                    event.target.value
                  )
                }
                placeholder="Nombre del administrador"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  text-sm
                  font-semibold
                  text-slate-800
                  outline-none
                  transition
                  focus:border-indigo-300
                  focus:bg-white
                  focus:ring-4
                  focus:ring-indigo-500/10
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:border-indigo-500
                "
              />

            </div>


            {/* CORREO */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-xs
                  font-black
                  uppercase
                  tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Correo
              </label>

              <input
                type="email"
                value={correo}
                disabled
                className="
                  h-12
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-100
                  px-4
                  text-sm
                  font-semibold
                  text-slate-500
                  outline-none
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-400
                "
              />

              <p
                className="
                  mt-1.5
                  text-[11px]
                  text-slate-400
                "
              >
                El correo no se puede modificar.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            PREFERENCIAS
        ================================================= */}

        <div
          className="
            space-y-6
          "
        >

          {/* APARIENCIA */}

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_4px_20px_rgba(15,23,42,0.04)]
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

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
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-50
                  text-violet-600
                  dark:bg-violet-950/40
                  dark:text-violet-400
                "
              >

                <Palette
                  size={20}
                />

              </div>


              <div>

                <h2
                  className="
                    text-base
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  Apariencia
                </h2>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Elige cómo quieres ver el sistema.
                </p>

              </div>

            </div>


            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >

              {/* CLARO */}

              <button
                type="button"
                onClick={() =>
                  setTema("claro")
                }
                className={`
                  relative
                  flex
                  flex-col
                  items-center
                  gap-2
                  rounded-xl
                  border
                  p-4
                  transition

                  ${
                    tema === "claro"

                      ? `
                        border-indigo-500
                        bg-indigo-50
                        text-indigo-700
                        ring-2
                        ring-indigo-500/20
                        dark:border-indigo-500
                        dark:bg-indigo-950/30
                        dark:text-indigo-300
                      `

                      : `
                        border-slate-200
                        text-slate-500
                        hover:border-slate-300
                        dark:border-slate-700
                        dark:text-slate-400
                      `
                  }
                `}
              >

                <Sun
                  size={22}
                />

                <span
                  className="
                    text-xs
                    font-black
                  "
                >
                  Claro
                </span>


                {tema === "claro" && (

                  <span
                    className="
                      absolute
                      right-2
                      top-2
                    "
                  >

                    <Check
                      size={15}
                    />

                  </span>

                )}

              </button>


              {/* OSCURO */}

              <button
                type="button"
                onClick={() =>
                  setTema("oscuro")
                }
                className={`
                  relative
                  flex
                  flex-col
                  items-center
                  gap-2
                  rounded-xl
                  border
                  p-4
                  transition

                  ${
                    tema === "oscuro"

                      ? `
                        border-indigo-500
                        bg-indigo-50
                        text-indigo-700
                        ring-2
                        ring-indigo-500/20
                        dark:bg-indigo-950/30
                        dark:text-indigo-300
                      `

                      : `
                        border-slate-200
                        text-slate-500
                        hover:border-slate-300
                        dark:border-slate-700
                        dark:text-slate-400
                      `
                  }
                `}
              >

                <Moon
                  size={22}
                />

                <span
                  className="
                    text-xs
                    font-black
                  "
                >
                  Oscuro
                </span>


                {tema === "oscuro" && (

                  <span
                    className="
                      absolute
                      right-2
                      top-2
                    "
                  >

                    <Check
                      size={15}
                    />

                  </span>

                )}

              </button>

            </div>

          </div>


          {/* IDIOMA */}

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_4px_20px_rgba(15,23,42,0.04)]
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

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
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-600
                  dark:bg-emerald-950/40
                  dark:text-emerald-400
                "
              >

                <Globe
                  size={20}
                />

              </div>


              <div>

                <h2
                  className="
                    text-base
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  Idioma
                </h2>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Idioma preferido del administrador.
                </p>

              </div>

            </div>


            <select
              value={idioma}
              onChange={(event) =>
                setIdioma(
                  event.target.value
                )
              }
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                text-sm
                font-bold
                text-slate-700
                outline-none
                focus:border-indigo-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
              "
            >

              <option value="es">
                🇵🇪 Español
              </option>

              <option value="en">
                🇺🇸 English
              </option>

            </select>

          </div>


          {/* INFORMACIÓN */}

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              p-5
              dark:border-blue-900/40
              dark:bg-blue-950/20
            "
          >

            <div
              className="
                flex
                gap-3
              "
            >

              <div
                className="
                  mt-0.5
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-100
                  text-blue-600
                  dark:bg-blue-900/50
                  dark:text-blue-300
                "
              >

                <Settings
                  size={16}
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-black
                    text-blue-800
                    dark:text-blue-300
                  "
                >
                  Preferencias locales
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-blue-700/80
                    dark:text-blue-300/70
                  "
                >
                  Los cambios de perfil,
                  apariencia e idioma se
                  almacenan localmente en
                  este navegador.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}
