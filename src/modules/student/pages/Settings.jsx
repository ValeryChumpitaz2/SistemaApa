import {
  User,
  Camera,
  Save,
  Globe,
  Bell,
  Brain,
  Lock,
  ShieldCheck,
  Palette,
  Mail,
  GraduationCap,
  Building2,
  BookOpen,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../../../auth/AuthContext";

import {
  useTranslation,
} from "react-i18next";


// =====================================================
// SETTINGS
// =====================================================

export default function Settings() {

  const {
    user,
    login,
  } = useAuth();

  const {
    i18n,
  } = useTranslation();


  // ===================================================
  // SECCIÓN
  // ===================================================

  const [
    seccion,
    setSeccion,
  ] = useState("perfil");


  // ===================================================
  // DATOS DEL PERFIL
  // ===================================================

  const [
    foto,
    setFoto,
  ] = useState(
    user?.foto ||
    ""
  );


  const [
    nombre,
    setNombre,
  ] = useState(
    user?.nombre ||
    user?.usuario ||
    "Estudiante"
  );


  const [
    correo,
    setCorreo,
  ] = useState(
    user?.correo ||
    user?.email ||
    ""
  );


  const [
    carrera,
    setCarrera,
  ] = useState(
    user?.carrera ||
    "Análisis de Sistemas"
  );


  const [
    universidad,
    setUniversidad,
  ] = useState(
    user?.universidad ||
    "Valle Grande"
  );


  const [
    semestre,
    setSemestre,
  ] = useState(
    user?.semestre ||
    user?.sem ||
    "4"
  );


  // ===================================================
  // PREFERENCIAS
  // ===================================================

  const [
    ia,
    setIa,
  ] = useState(true);


  const [
    notificaciones,
    setNotificaciones,
  ] = useState(true);


  // ===================================================
  // SINCRONIZAR CUANDO CAMBIA EL USUARIO
  // ===================================================

  useEffect(() => {

    if (!user) {
      return;
    }


    setFoto(
      user?.foto ||
      ""
    );


    setNombre(
      user?.nombre ||
      user?.usuario ||
      "Estudiante"
    );


    setCorreo(
      user?.correo ||
      user?.email ||
      ""
    );


    setCarrera(
      user?.carrera ||
      "Análisis de Sistemas"
    );


    setUniversidad(
      user?.universidad ||
      "Valle Grande"
    );


    setSemestre(
      user?.semestre ||
      user?.sem ||
      "4"
    );

  }, [
    user,
  ]);


  // ===================================================
  // CAMBIAR FOTO
  // ===================================================

  function cambiarFoto(event) {

    const archivo =
      event?.target?.files?.[0];


    if (!archivo) {
      return;
    }


    // -----------------------------------------------
    // VALIDAR IMAGEN
    // -----------------------------------------------

    if (
      !archivo.type.startsWith(
        "image/"
      )
    ) {

      alert(
        "Selecciona una imagen válida."
      );

      return;

    }


    // -----------------------------------------------
    // VALIDAR TAMAÑO
    // -----------------------------------------------

    if (
      archivo.size >
      2 * 1024 * 1024
    ) {

      alert(
        "La imagen no debe superar los 2 MB."
      );

      return;

    }


    const reader =
      new FileReader();


    reader.onload = () => {

      const resultado =
        reader.result;


      if (
        typeof resultado ===
        "string"
      ) {

        setFoto(
          resultado
        );

      }

    };


    reader.onerror = () => {

      alert(
        "No se pudo cargar la imagen."
      );

    };


    reader.readAsDataURL(
      archivo
    );

  }


  // ===================================================
  // GUARDAR
  // ===================================================

  function guardar() {

    if (!user) {

      alert(
        "No hay un usuario autenticado."
      );

      return;

    }


    // =================================================
    // IMPORTANTE
    //
    // Guardamos AMBOS:
    //
    // usuario -> usado por tu autenticación actual
    // nombre  -> usado por EstudianteCard
    //
    // De esta forma ambos componentes reciben
    // el mismo nombre.
    // =================================================

    const nuevo = {

      ...user,

      // ---------------------------------------------
      // NOMBRE
      // ---------------------------------------------

      usuario:
        nombre,

      nombre:
        nombre,


      // ---------------------------------------------
      // CORREO
      // ---------------------------------------------

      correo:
        correo,


      // ---------------------------------------------
      // FOTO
      // ---------------------------------------------

      foto:
        foto,


      // ---------------------------------------------
      // DATOS ACADÉMICOS
      // ---------------------------------------------

      carrera:
        carrera,

      universidad:
        universidad,

      semestre:
        semestre,

      // También dejamos SEM para compatibilidad
      sem:
        semestre,

    };


    console.log(
      "===================================="
    );

    console.log(
      "GUARDANDO PERFIL:"
    );

    console.log(
      nuevo
    );


    // -----------------------------------------------
    // ACTUALIZAR CONTEXTO
    // -----------------------------------------------

    login(
      nuevo
    );


    // -----------------------------------------------
    // GUARDAR TAMBIÉN EN LOCALSTORAGE
    // por si tu AuthContext utiliza persistencia
    // -----------------------------------------------

    try {

      localStorage.setItem(
        "user",
        JSON.stringify(
          nuevo
        )
      );

    }
    catch (error) {

      console.warn(
        "No se pudo guardar usuario en localStorage:",
        error
      );

    }


    alert(
      "Perfil actualizado correctamente."
    );

  }


  // ===================================================
  // OPCIONES
  // ===================================================

  const opciones = [

    {
      id: "perfil",
      titulo: "Información personal",
      descripcion: "Datos académicos",
      icon: User,
    },

    {
      id: "preferencias",
      titulo: "Preferencias",
      descripcion: "Idioma y avisos",
      icon: Palette,
    },

    {
      id: "ia",
      titulo: "IA Académica",
      descripcion: "Asistente inteligente",
      icon: Brain,
    },

    {
      id: "seguridad",
      titulo: "Seguridad",
      descripcion: "Protección de cuenta",
      icon: ShieldCheck,
    },

  ];


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div
      className="
        mx-auto
        max-w-6xl
        space-y-6
      "
    >

      {/* ==================================================
          CABECERA
      ================================================== */}

      <header
        className="
          border-b
          border-slate-200
          pb-6
          dark:border-slate-800
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div>

            <p
              className="
                text-sm
                font-bold
                text-[#1D3681]
                dark:text-blue-400
              "
            >
              Cuenta
            </p>


            <h1
              className="
                mt-1
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Configuración
            </h1>


            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Administra tu información y preferencias.
            </p>

          </div>


          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-green-200
              bg-green-50
              px-4
              py-2
              text-sm
              font-bold
              text-green-700
              sm:flex
              dark:border-green-900
              dark:bg-green-950/30
              dark:text-green-400
            "
          >

            <CheckCircle2 size={16} />

            Cuenta activa

          </div>

        </div>

      </header>


      {/* ==================================================
          PERFIL COMPACTO
      ================================================== */}

      <section
        className="
          flex
          flex-col
          gap-5
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:flex-row
          sm:items-center
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* FOTO */}

        <div className="relative shrink-0">

          {foto ? (

            <img
              src={foto}
              alt="Perfil"
              className="
                h-20
                w-20
                rounded-2xl
                object-cover
              "
              onError={(event) => {

                event.currentTarget.style.display =
                  "none";

              }}
            />

          ) : (

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-[#1D3681]
                dark:bg-blue-950/40
                dark:text-blue-300
              "
            >

              <User size={38} />

            </div>

          )}


          <label
            className="
              absolute
              -bottom-2
              -right-2
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              border-2
              border-white
              bg-[#1D3681]
              text-white
              shadow
              transition
              hover:bg-blue-800
              dark:border-slate-900
            "
          >

            <Camera size={14} />


            <input
              type="file"
              accept="image/*"
              onChange={
                cambiarFoto
              }
              className="hidden"
            />

          </label>

        </div>


        {/* INFORMACIÓN */}

        <div className="min-w-0 flex-1">

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            Perfil académico
          </p>


          <h2
            className="
              mt-1
              truncate
              text-xl
              font-black
              text-slate-900
              dark:text-white
            "
          >
            {nombre}
          </h2>


          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-x-5
              gap-y-2
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >

            <span className="flex items-center gap-2">

              <Mail size={15} />

              {correo ||
                "Correo institucional"}

            </span>


            <span className="flex items-center gap-2">

              <GraduationCap size={15} />

              {carrera}

            </span>


            <span className="flex items-center gap-2">

              <BookOpen size={15} />

              Semestre {semestre}

            </span>

          </div>

        </div>

      </section>


      {/* ==================================================
          CONFIGURACIÓN
      ================================================== */}

      <div
        className="
          grid
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          lg:grid-cols-[230px_1fr]
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* ==================================================
            MENÚ
        ================================================== */}

        <aside
          className="
            border-b
            border-slate-200
            p-3
            lg:border-b-0
            lg:border-r
            dark:border-slate-800
          "
        >

          <p
            className="
              px-3
              py-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.15em]
              text-slate-400
            "
          >
            Configuración
          </p>


          <div className="space-y-1">

            {opciones.map(
              (item) => {

                const Icon =
                  item.icon;

                const activo =
                  seccion === item.id;


                return (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setSeccion(
                        item.id
                      )
                    }
                    className={`
                      group
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      transition

                      ${
                        activo
                          ? `
                            bg-blue-50
                            text-[#1D3681]
                            dark:bg-blue-950/40
                            dark:text-blue-300
                          `
                          : `
                            text-slate-600
                            hover:bg-slate-50
                            dark:text-slate-300
                            dark:hover:bg-slate-800
                          `
                      }
                    `}
                  >

                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg

                        ${
                          activo
                            ? "bg-[#1D3681] text-white"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                        }
                      `}
                    >

                      <Icon size={17} />

                    </div>


                    <div className="min-w-0 flex-1">

                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                        "
                      >
                        {item.titulo}
                      </p>


                      <p
                        className="
                          mt-0.5
                          truncate
                          text-[11px]
                          text-slate-400
                        "
                      >
                        {item.descripcion}
                      </p>

                    </div>


                    <ChevronRight
                      size={15}
                      className={`
                        transition
                        ${
                          activo
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                  </button>

                );

              }
            )}

          </div>

        </aside>


        {/* ==================================================
            CONTENIDO
        ================================================== */}

        <main className="min-w-0">


          {/* ==================================================
              PERFIL
          ================================================== */}

          {seccion === "perfil" && (

            <div>

              <ContentHeader
                titulo="Información personal"
                descripcion="Actualiza los datos asociados a tu perfil académico."
              />


              <div
                className="
                  grid
                  gap-6
                  p-6
                  md:grid-cols-2
                  md:p-8
                "
              >

                <Input
                  titulo="Nombre completo"
                  valor={nombre}
                  cambiar={setNombre}
                  icon={
                    <User size={17} />
                  }
                />


                <Input
                  titulo="Correo institucional"
                  valor={correo}
                  cambiar={setCorreo}
                  icon={
                    <Mail size={17} />
                  }
                />


                <Input
                  titulo="Carrera profesional"
                  valor={carrera}
                  cambiar={setCarrera}
                  icon={
                    <GraduationCap
                      size={17}
                    />
                  }
                />


                <Input
                  titulo="Universidad"
                  valor={universidad}
                  cambiar={setUniversidad}
                  icon={
                    <Building2
                      size={17}
                    />
                  }
                />


                <Input
                  titulo="Semestre académico"
                  valor={semestre}
                  cambiar={setSemestre}
                  icon={
                    <BookOpen
                      size={17}
                    />
                  }
                />

              </div>


              <FooterAction
                texto="Guardar cambios"
                onClick={guardar}
              />

            </div>

          )}


          {/* ==================================================
              PREFERENCIAS
          ================================================== */}

          {seccion === "preferencias" && (

            <div>

              <ContentHeader
                titulo="Preferencias"
                descripcion="Personaliza la experiencia dentro de la plataforma."
              />


              <div className="space-y-3 p-6 md:p-8">

                <Setting
                  icon={
                    <Globe size={19} />
                  }
                  titulo="Idioma"
                  descripcion="Selecciona el idioma de la interfaz."
                >

                  <select
                    value={
                      i18n.language
                    }
                    onChange={(event) => {

                      const idioma =
                        event.target.value;


                      i18n.changeLanguage(
                        idioma
                      );


                      localStorage.setItem(
                        "idioma",
                        idioma
                      );

                    }}
                    className="
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-white
                    "
                  >

                    <option value="es">
                      🇪🇸 Español
                    </option>

                    <option value="en">
                      🇺🇸 English
                    </option>

                  </select>

                </Setting>


                <Setting
                  icon={
                    <Bell size={19} />
                  }
                  titulo="Notificaciones"
                  descripcion="Recibe avisos sobre tus evaluaciones."
                >

                  <Switch
                    activo={
                      notificaciones
                    }
                    cambiar={() =>
                      setNotificaciones(
                        !notificaciones
                      )
                    }
                  />

                </Setting>

              </div>

            </div>

          )}


          {/* ==================================================
              IA
          ================================================== */}

          {seccion === "ia" && (

            <div>

              <ContentHeader
                titulo="IA Académica"
                descripcion="Controla las funciones de asistencia inteligente."
              />


              <div className="p-6 md:p-8">

                <Setting
                  icon={
                    <Brain size={19} />
                  }
                  titulo="Recomendaciones automáticas"
                  descripcion="Permite que la IA genere recomendaciones para mejorar tus documentos."
                >

                  <Switch
                    activo={ia}
                    cambiar={() =>
                      setIa(!ia)
                    }
                  />

                </Setting>

              </div>

            </div>

          )}


          {/* ==================================================
              SEGURIDAD
          ================================================== */}

          {seccion === "seguridad" && (

            <div>

              <ContentHeader
                titulo="Seguridad"
                descripcion="Administra las opciones de seguridad de tu cuenta."
              />


              <div className="p-6 md:p-8">

                <Setting
                  icon={
                    <Lock size={19} />
                  }
                  titulo="Contraseña"
                  descripcion="Actualiza periódicamente tu contraseña para proteger tu cuenta."
                >

                  <button
                    type="button"
                    className="
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-bold
                      text-slate-700
                      transition
                      hover:bg-slate-50
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-200
                      dark:hover:bg-slate-700
                    "
                  >
                    Cambiar contraseña
                  </button>

                </Setting>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>

  );

}


// =====================================================
// HEADER DE CONTENIDO
// =====================================================

function ContentHeader({
  titulo,
  descripcion,
}) {

  return (

    <div
      className="
        border-b
        border-slate-100
        px-6
        py-6
        dark:border-slate-800
        md:px-8
      "
    >

      <h2
        className="
          text-xl
          font-black
          text-slate-900
          dark:text-white
        "
      >
        {titulo}
      </h2>


      <p
        className="
          mt-1
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        {descripcion}
      </p>

    </div>

  );

}


// =====================================================
// INPUT
// =====================================================

function Input({
  titulo,
  valor,
  cambiar,
  icon,
}) {

  return (

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
        {titulo}
      </label>


      <div className="relative">

        <span
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          {icon}
        </span>


        <input
          value={valor}
          onChange={(event) =>
            cambiar(
              event.target.value
            )
          }
          className="
            h-11
            w-full
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            pl-10
            pr-4
            text-sm
            font-medium
            text-slate-800
            outline-none
            transition
            focus:border-[#1D3681]
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/10
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:focus:bg-slate-800
          "
        />

      </div>

    </div>

  );

}


// =====================================================
// SETTING
// =====================================================

function Setting({
  icon,
  titulo,
  descripcion,
  children,
}) {

  return (

    <div
      className="
        flex
        flex-col
        gap-5
        rounded-xl
        border
        border-slate-200
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        dark:border-slate-800
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
            rounded-lg
            bg-slate-100
            text-slate-600
            dark:bg-slate-800
            dark:text-slate-300
          "
        >

          {icon}

        </div>


        <div>

          <h3
            className="
              text-sm
              font-black
              text-slate-900
              dark:text-white
            "
          >
            {titulo}
          </h3>


          <p
            className="
              mt-1
              max-w-xl
              text-xs
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            {descripcion}
          </p>

        </div>

      </div>


      <div className="shrink-0">

        {children}

      </div>

    </div>

  );

}


// =====================================================
// SWITCH
// =====================================================

function Switch({
  activo,
  cambiar,
}) {

  return (

    <button
      type="button"
      onClick={cambiar}
      aria-pressed={activo}
      className={`
        relative
        h-6
        w-11
        rounded-full
        transition-colors
        duration-200

        ${
          activo
            ? "bg-[#1D3681]"
            : "bg-slate-300 dark:bg-slate-700"
        }
      `}
    >

      <span
        className={`
          absolute
          top-1
          h-4
          w-4
          rounded-full
          bg-white
          shadow-sm
          transition-transform
          duration-200

          ${
            activo
              ? "translate-x-6"
              : "translate-x-1"
          }
        `}
      />

    </button>

  );

}


// =====================================================
// FOOTER
// =====================================================

function FooterAction({
  texto,
  onClick,
}) {

  return (

    <div
      className="
        flex
        justify-end
        border-t
        border-slate-100
        px-6
        py-5
        dark:border-slate-800
        md:px-8
      "
    >

      <button
        type="button"
        onClick={onClick}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-[#1D3681]
          px-5
          py-2.5
          text-sm
          font-bold
          text-white
          transition
          hover:bg-blue-800
          active:scale-[0.98]
        "
      >

        <Save size={17} />

        {texto}

      </button>

    </div>

  );

}
