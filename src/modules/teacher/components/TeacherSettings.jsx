import {
  User,
  Camera,
  Save,
  ShieldCheck,
  FolderSync,
  SlidersHorizontal,
  CheckCircle2,
  Mail,
  Building2,
  BriefcaseBusiness,
  LockKeyhole,
  Cloud,
  Bell,
  CircleCheck,
  Info,
  Sparkles,
  UserRoundCheck,
  Settings2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../../../auth/AuthContext";


export default function TeacherSettings() {

  const {
    user,
    updateUser,
  } = useAuth();


  // =====================================================
  // SECCIÓN
  // =====================================================

  const [
    seccion,
    setSeccion,
  ] = useState("perfil");


  // =====================================================
  // DATOS DEL PERFIL
  // =====================================================

  const [
    foto,
    setFoto,
  ] = useState(
    user?.foto || ""
  );


  const [
    nombre,
    setNombre,
  ] = useState(
    user?.usuario ||
    user?.nombre ||
    "Docente"
  );


  const [
    correo,
    setCorreo,
  ] = useState(
    user?.correo || ""
  );


  const [
    institucion,
    setInstitucion,
  ] = useState(
    user?.institucion ||
    "Valle Grande"
  );


  const [
    especialidad,
    setEspecialidad,
  ] = useState(
    user?.especialidad ||
    "Docente académico"
  );


  // =====================================================
  // CONFIGURACIÓN
  // =====================================================

  const [
    aprobacion,
    setAprobacion,
  ] = useState(
    user?.configuracion?.aprobacion ??
    70
  );


  const [
    critico,
    setCritico,
  ] = useState(
    user?.configuracion?.critico ??
    50
  );


  const [
    notificaciones,
    setNotificaciones,
  ] = useState(
    user?.configuracion?.notificaciones ??
    true
  );


  // =====================================================
  // ESTADO
  // =====================================================

  const [
    guardado,
    setGuardado,
  ] = useState(false);


  // =====================================================
  // SINCRONIZAR USER
  // =====================================================

  useEffect(() => {

    if (!user) {
      return;
    }


    setFoto(
      user.foto || ""
    );


    setNombre(
      user.usuario ||
      user.nombre ||
      "Docente"
    );


    setCorreo(
      user.correo || ""
    );


    setInstitucion(
      user.institucion ||
      "Valle Grande"
    );


    setEspecialidad(
      user.especialidad ||
      "Docente académico"
    );


    setAprobacion(
      user.configuracion?.aprobacion ??
      70
    );


    setCritico(
      user.configuracion?.critico ??
      50
    );


    setNotificaciones(
      user.configuracion?.notificaciones ??
      true
    );

  }, [user]);


  // =====================================================
  // CAMBIAR FOTO
  // =====================================================

  function cambiarFoto(e) {

    const archivo =
      e.target.files?.[0];


    if (!archivo) {
      return;
    }


    if (
      !archivo.type.startsWith("image/")
    ) {

      alert(
        "Selecciona una imagen válida."
      );

      return;

    }


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

      setFoto(
        reader.result
      );

    };


    reader.readAsDataURL(
      archivo
    );

  }


  // =====================================================
  // GUARDAR
  // =====================================================

  function guardar() {

    if (!user) {
      return;
    }


    const nuevoUsuario = {

      ...user,

      usuario:
        nombre.trim() ||
        "Docente",

      correo:
        correo.trim(),

      foto,

      institucion:
        institucion.trim() ||
        "Valle Grande",

      especialidad:
        especialidad.trim() ||
        "Docente académico",

      configuracion: {

        ...(user.configuracion || {}),

        aprobacion:
          Number(aprobacion),

        critico:
          Number(critico),

        notificaciones,

      },

    };


    /*
    =====================================================
    IMPORTANTE

    Usamos updateUser() y NO login().

    updateUser actualiza:
    - AuthContext
    - localStorage
    - lista de usuarios

    Por eso el Sidebar se actualiza inmediatamente.
    =====================================================
    */

    updateUser(
      nuevoUsuario
    );


    setGuardado(true);


    setTimeout(() => {

      setGuardado(false);

    }, 3000);

  }


  // =====================================================
  // SI NO HAY USUARIO
  // =====================================================

  if (!user) {

    return (

      <div
        className="
          min-h-[400px]
          flex
          items-center
          justify-center
          rounded-3xl
          bg-white
          border
          border-slate-200
        "
      >

        <div className="text-center">

          <div
            className="
              w-14
              h-14
              mx-auto
              rounded-2xl
              bg-blue-50
              text-[#1D3681]
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <User
              size={28}
            />

          </div>


          <p
            className="
              font-bold
              text-slate-700
            "
          >
            No hay una sesión activa
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div
      className="
        max-w-6xl
        mx-auto
        space-y-6
      "
    >

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          bg-gradient-to-br
          from-[#101F52]
          via-[#1D3681]
          to-[#3B67D1]
          text-white
          shadow-xl
          shadow-blue-900/10
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -right-24
            -top-28
            w-80
            h-80
            rounded-full
            bg-white/10
            blur-sm
          "
        />

        <div
          className="
            absolute
            right-24
            -bottom-36
            w-72
            h-72
            rounded-full
            bg-blue-300/10
          "
        />

        <div
          className="
            absolute
            left-1/3
            top-1/2
            w-40
            h-40
            rounded-full
            bg-indigo-300/10
            blur-2xl
          "
        />


        <div
          className="
            relative
            z-10
            p-6
            lg:p-8
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-7
            "
          >

            {/* PERFIL */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-6
              "
            >

              {/* AVATAR */}

              <div
                className="
                  relative
                  shrink-0
                  w-fit
                "
              >

                {foto ? (

                  <img
                    src={foto}
                    alt="Foto de perfil"
                    className="
                      w-28
                      h-28
                      lg:w-32
                      lg:h-32
                      rounded-[26px]
                      object-cover
                      border-4
                      border-white/90
                      shadow-2xl
                    "
                  />

                ) : (

                  <div
                    className="
                      w-28
                      h-28
                      lg:w-32
                      lg:h-32
                      rounded-[26px]
                      bg-white/10
                      border
                      border-white/20
                      flex
                      items-center
                      justify-center
                      shadow-xl
                    "
                  >

                    <User
                      size={55}
                      strokeWidth={1.6}
                    />

                  </div>

                )}


                <label
                  title="Cambiar foto"
                  className="
                    absolute
                    right-[-5px]
                    bottom-[-5px]
                    w-11
                    h-11
                    rounded-2xl
                    bg-white
                    text-[#1D3681]
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    shadow-xl
                    border-2
                    border-[#1D3681]
                    hover:scale-105
                    transition-transform
                  "
                >

                  <Camera
                    size={19}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      cambiarFoto
                    }
                  />

                </label>

              </div>


              {/* INFO */}

              <div className="min-w-0">

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    bg-white/10
                    border
                    border-white/10
                    text-xs
                    font-bold
                    mb-3
                  "
                >

                  <span
                    className="
                      w-2
                      h-2
                      rounded-full
                      bg-emerald-400
                      shadow
                      shadow-emerald-400
                    "
                  />

                  Cuenta activa

                </div>


                <h1
                  className="
                    text-2xl
                    lg:text-3xl
                    font-black
                    tracking-tight
                    break-words
                  "
                >
                  {nombre}
                </h1>


                <p
                  className="
                    mt-1.5
                    text-sm
                    text-blue-100
                  "
                >
                  {especialidad}
                </p>


                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                    mt-4
                  "
                >

                  <HeroInfo
                    icon={
                      <Building2 size={14} />
                    }
                    texto={
                      institucion
                    }
                  />

                  <HeroInfo
                    icon={
                      <Mail size={14} />
                    }
                    texto={
                      correo
                    }
                  />

                </div>

              </div>

            </div>


            {/* ROL */}

            <div
              className="
                shrink-0
                p-5
                rounded-2xl
                bg-white/10
                border
                border-white/10
                backdrop-blur-sm
                lg:min-w-[190px]
              "
            >

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-blue-200
                  font-bold
                "
              >
                Tipo de cuenta
              </p>


              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-2
                  font-black
                "
              >

                <UserRoundCheck
                  size={18}
                />

                Docente

              </div>


              <p
                className="
                  mt-1
                  text-xs
                  text-blue-200
                "
              >
                Acceso administrativo

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          RESUMEN
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        <ResumenCard
          icon={
            <UserRoundCheck
              size={19}
            />
          }
          titulo="Perfil"
          valor="Completo"
          color="blue"
        />


        <ResumenCard
          icon={
            <CircleCheck
              size={19}
            />
          }
          titulo="Cuenta"
          valor="Activa"
          color="emerald"
        />


        <ResumenCard
          icon={
            <Cloud
              size={19}
            />
          }
          titulo="Google Drive"
          valor="Conectado"
          color="violet"
        />


        <ResumenCard
          icon={
            <ShieldCheck
              size={19}
            />
          }
          titulo="Seguridad"
          valor="Protegida"
          color="amber"
        />

      </div>


      {/* =================================================
          NAVEGACIÓN
      ================================================= */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200/80
          dark:border-slate-800
          rounded-2xl
          p-1.5
          shadow-sm
          overflow-x-auto
        "
      >

        <div
          className="
            flex
            gap-1
            min-w-max
          "
        >

          <Tab
            activo={
              seccion === "perfil"
            }
            click={() =>
              setSeccion("perfil")
            }
            icon={
              <User size={17} />
            }
            texto="Perfil"
          />


          <Tab
            activo={
              seccion === "evaluacion"
            }
            click={() =>
              setSeccion("evaluacion")
            }
            icon={
              <SlidersHorizontal
                size={17}
              />
            }
            texto="Evaluación"
          />


          <Tab
            activo={
              seccion === "drive"
            }
            click={() =>
              setSeccion("drive")
            }
            icon={
              <FolderSync
                size={17}
              />
            }
            texto="Google Drive"
          />


          <Tab
            activo={
              seccion === "seguridad"
            }
            click={() =>
              setSeccion("seguridad")
            }
            icon={
              <ShieldCheck
                size={17}
              />
            }
            texto="Seguridad"
          />

        </div>

      </div>


      {/* =================================================
          PERFIL
      ================================================= */}

      {seccion === "perfil" && (

        <Panel
          icon={
            <User size={19} />
          }
          titulo="Información profesional"
          descripcion="
            Administra la información que identifica
            tu perfil dentro de la plataforma.
          "
        >

          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >

            <Input
              titulo="Nombre completo"
              descripcion="Nombre que aparecerá en el sistema"
              valor={nombre}
              cambiar={setNombre}
              icon={
                <User size={17} />
              }
            />


            <Input
              titulo="Correo institucional"
              descripcion="Correo asociado a tu cuenta"
              valor={correo}
              cambiar={setCorreo}
              type="email"
              icon={
                <Mail size={17} />
              }
            />


            <Input
              titulo="Institución"
              descripcion="Centro educativo"
              valor={institucion}
              cambiar={setInstitucion}
              icon={
                <Building2 size={17} />
              }
            />


            <Input
              titulo="Especialidad"
              descripcion="Área académica"
              valor={especialidad}
              cambiar={setEspecialidad}
              icon={
                <BriefcaseBusiness
                  size={17}
                />
              }
            />

          </div>


          <GuardarButton
            guardar={guardar}
            guardado={guardado}
          />

        </Panel>

      )}


      {/* =================================================
          EVALUACIÓN
      ================================================= */}

      {seccion === "evaluacion" && (

        <Panel
          icon={
            <Settings2 size={19} />
          }
          titulo="Configuración de evaluación"
          descripcion="
            Define cómo se interpretan los resultados
            académicos de tus estudiantes.
          "
        >

          <div
            className="
              grid
              lg:grid-cols-2
              gap-5
            "
          >

            <RangeCard
              titulo="Porcentaje mínimo aprobado"
              descripcion="
                Define el porcentaje mínimo considerado
                como aprobado.
              "
              valor={aprobacion}
              cambiar={setAprobacion}
              minimo={0}
              maximo={100}
              color="blue"
            />


            <RangeCard
              titulo="Nivel crítico"
              descripcion="
                Por debajo de este porcentaje se considera
                un rendimiento crítico.
              "
              valor={critico}
              cambiar={setCritico}
              minimo={0}
              maximo={100}
              color="red"
            />

          </div>


          {/* INFORMACIÓN */}

          <div
            className="
              mt-6
              grid
              md:grid-cols-3
              gap-3
            "
          >

            <EstadoEvaluacion
              color="red"
              titulo="Crítico"
              texto={`0% - ${critico}%`}
            />


            <EstadoEvaluacion
              color="amber"
              titulo="En proceso"
              texto={`${critico}% - ${aprobacion}%`}
            />


            <EstadoEvaluacion
              color="emerald"
              titulo="Aprobado"
              texto={`${aprobacion}% - 100%`}
            />

          </div>


          {/* NOTIFICACIONES */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              gap-4
              p-5
              rounded-2xl
              bg-slate-50
              dark:bg-slate-800/60
              border
              border-slate-200
              dark:border-slate-700
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-blue-100
                  dark:bg-blue-900/40
                  text-[#1D3681]
                  dark:text-blue-300
                  flex
                  items-center
                  justify-center
                "
              >

                <Bell
                  size={20}
                />

              </div>


              <div>

                <p
                  className="
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Notificaciones
                </p>


                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                    mt-0.5
                  "
                >
                  Recibir avisos sobre evaluaciones
                  y actividad académica.
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={() =>
                setNotificaciones(
                  !notificaciones
                )
              }
              className={`
                relative
                w-12
                h-7
                rounded-full
                transition-colors
                duration-200
                shrink-0

                ${
                  notificaciones
                    ? "bg-[#1D3681]"
                    : "bg-slate-300 dark:bg-slate-600"
                }
              `}
              aria-label="Activar notificaciones"
            >

              <span
                className={`
                  absolute
                  top-1
                  w-5
                  h-5
                  bg-white
                  rounded-full
                  shadow
                  transition-transform
                  duration-200

                  ${
                    notificaciones
                      ? "translate-x-6"
                      : "translate-x-1"
                  }
                `}
              />

            </button>

          </div>


          <GuardarButton
            guardar={guardar}
            guardado={guardado}
          />

        </Panel>

      )}


      {/* =================================================
          DRIVE
      ================================================= */}

      {seccion === "drive" && (

        <Panel
          icon={
            <FolderSync size={19} />
          }
          titulo="Integración con Google Drive"
          descripcion="
            Gestiona la conexión utilizada para trabajar
            con tus carpetas académicas.
          "
        >

          <div
            className="
              relative
              overflow-hidden
              p-6
              rounded-2xl
              bg-gradient-to-br
              from-emerald-50
              to-green-50
              dark:from-emerald-950/30
              dark:to-green-950/20
              border
              border-emerald-100
              dark:border-emerald-900/40
            "
          >

            <div
              className="
                absolute
                -right-8
                -top-8
                w-28
                h-28
                rounded-full
                bg-emerald-200/30
                dark:bg-emerald-500/10
              "
            />


            <div
              className="
                relative
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white
                    dark:bg-emerald-900/50
                    text-emerald-600
                    dark:text-emerald-300
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >

                  <FolderSync
                    size={27}
                  />

                </div>


                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <p
                      className="
                        font-black
                        text-emerald-800
                        dark:text-emerald-300
                      "
                    >
                      Google Drive conectado
                    </p>


                    <CheckCircle2
                      size={17}
                      className="
                        text-emerald-500
                      "
                    />

                  </div>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-emerald-700/70
                      dark:text-emerald-400/70
                    "
                  >
                    La integración está lista
                    para utilizarse.
                  </p>

                </div>

              </div>


              <span
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-emerald-500
                  text-white
                  text-xs
                  font-black
                "
              >

                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-white
                  "
                />

                Activo

              </span>

            </div>

          </div>


          <div
            className="
              grid
              md:grid-cols-2
              gap-4
              mt-5
            "
          >

            <MiniInfoCard
              icon={
                <Cloud size={18} />
              }
              titulo="Almacenamiento"
              texto="Disponible para análisis"
            />


            <MiniInfoCard
              icon={
                <FolderSync size={18} />
              }
              titulo="Sincronización"
              texto="Lista para trabajar"
            />

          </div>

        </Panel>

      )}


      {/* =================================================
          SEGURIDAD
      ================================================= */}

      {seccion === "seguridad" && (

        <Panel
          icon={
            <ShieldCheck size={19} />
          }
          titulo="Seguridad de la cuenta"
          descripcion="
            Administra las opciones relacionadas con
            la protección de tu cuenta docente.
          "
        >

          <div
            className="
              p-6
              rounded-2xl
              bg-gradient-to-br
              from-slate-50
              to-blue-50/50
              dark:from-slate-800
              dark:to-blue-950/20
              border
              border-slate-200
              dark:border-slate-700
            "
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-100
                    dark:bg-blue-900/40
                    text-[#1D3681]
                    dark:text-blue-300
                    flex
                    items-center
                    justify-center
                  "
                >

                  <LockKeyhole
                    size={22}
                  />

                </div>


                <div>

                  <p
                    className="
                      font-black
                      text-slate-800
                      dark:text-white
                    "
                  >
                    Contraseña de acceso
                  </p>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Protege tu cuenta utilizando
                    una contraseña segura.
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-700
                  text-slate-700
                  dark:text-slate-200
                  text-sm
                  font-bold
                  hover:border-[#1D3681]
                  hover:text-[#1D3681]
                  transition-all
                "
              >

                <ShieldCheck
                  size={17}
                />

                Cambiar contraseña

              </button>

            </div>

          </div>


          <div
            className="
              mt-5
              p-4
              rounded-xl
              bg-amber-50
              dark:bg-amber-950/20
              border
              border-amber-100
              dark:border-amber-900/40
              flex
              gap-3
            "
          >

            <Info
              size={18}
              className="
                shrink-0
                text-amber-600
                dark:text-amber-400
                mt-0.5
              "
            />


            <p
              className="
                text-xs
                leading-5
                text-amber-700
                dark:text-amber-300
              "
            >
              Nunca compartas tu contraseña.
              Si sospechas que alguien accedió
              a tu cuenta, cambia tu contraseña
              inmediatamente.
            </p>

          </div>

        </Panel>

      )}

    </div>

  );
}


// =====================================================
// HERO INFO
// =====================================================

function HeroInfo({
  icon,
  texto,
}) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
        max-w-full
        px-3
        py-1.5
        rounded-lg
        bg-white/10
        border
        border-white/10
        text-xs
        text-blue-100
      "
    >

      {icon}

      <span className="truncate">
        {texto}
      </span>

    </div>

  );

}


// =====================================================
// RESUMEN CARD
// =====================================================

function ResumenCard({
  icon,
  titulo,
  valor,
  color,
}) {

  const colores = {

    blue: `
      bg-blue-50
      text-blue-700
      dark:bg-blue-950/30
      dark:text-blue-300
    `,

    emerald: `
      bg-emerald-50
      text-emerald-700
      dark:bg-emerald-950/30
      dark:text-emerald-300
    `,

    violet: `
      bg-violet-50
      text-violet-700
      dark:bg-violet-950/30
      dark:text-violet-300
    `,

    amber: `
      bg-amber-50
      text-amber-700
      dark:bg-amber-950/30
      dark:text-amber-300
    `,

  };


  return (

    <div
      className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200/80
        dark:border-slate-800
        rounded-2xl
        p-4
        shadow-sm
        flex
        items-center
        gap-4
      "
    >

      <div
        className={`
          w-11
          h-11
          rounded-xl
          flex
          items-center
          justify-center
          shrink-0
          ${colores[color]}
        `}
      >

        {icon}

      </div>


      <div>

        <p
          className="
            text-xs
            text-slate-400
            font-semibold
          "
        >
          {titulo}
        </p>


        <p
          className="
            mt-0.5
            text-sm
            font-black
            text-slate-800
            dark:text-white
          "
        >
          {valor}
        </p>

      </div>

    </div>

  );

}


// =====================================================
// TAB
// =====================================================

function Tab({
  activo,
  click,
  icon,
  texto,
}) {

  return (

    <button
      type="button"
      onClick={click}
      className={`
        flex
        items-center
        justify-center
        gap-2
        px-5
        py-2.5
        rounded-xl
        text-sm
        font-bold
        transition-all
        duration-200
        whitespace-nowrap

        ${
          activo
            ? `
              bg-[#1D3681]
              text-white
              shadow-md
              shadow-blue-900/10
            `
            : `
              text-slate-500
              hover:bg-slate-50
              hover:text-[#1D3681]
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-blue-300
            `
        }
      `}
    >

      {icon}

      {texto}

    </button>

  );

}


// =====================================================
// PANEL
// =====================================================

function Panel({
  icon,
  titulo,
  descripcion,
  children,
}) {

  return (

    <section
      className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        border
        border-slate-200/80
        dark:border-slate-800
        p-5
        lg:p-7
        shadow-sm
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
          mb-7
        "
      >

        <div
          className="
            w-10
            h-10
            shrink-0
            rounded-xl
            bg-[#EEF3FF]
            dark:bg-blue-950/40
            text-[#1D3681]
            dark:text-blue-300
            flex
            items-center
            justify-center
          "
        >

          {icon}

        </div>


        <div>

          <h2
            className="
              text-xl
              font-black
              text-slate-800
              dark:text-white
            "
          >
            {titulo}
          </h2>


          {descripcion && (

            <p
              className="
                mt-1.5
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
                max-w-2xl
              "
            >
              {descripcion}
            </p>

          )}

        </div>

      </div>


      {children}

    </section>

  );

}


// =====================================================
// INPUT
// =====================================================

function Input({
  titulo,
  descripcion,
  valor,
  cambiar,
  type = "text",
  icon,
}) {

  return (

    <div>

      <label
        className="
          flex
          items-center
          gap-2
          text-sm
          font-bold
          text-slate-700
          dark:text-slate-300
          mb-2
        "
      >

        <span
          className="
            text-[#1D3681]
            dark:text-blue-300
          "
        >
          {icon}
        </span>

        {titulo}

      </label>


      <input
        type={type}
        value={valor}
        onChange={(e) =>
          cambiar(
            e.target.value
          )
        }
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          text-slate-800
          dark:text-white
          text-sm
          outline-none
          transition-all
          placeholder:text-slate-400
          focus:border-[#1D3681]
          focus:ring-4
          focus:ring-[#1D3681]/10
        "
      />


      {descripcion && (

        <p
          className="
            mt-1.5
            text-[11px]
            text-slate-400
            dark:text-slate-500
          "
        >
          {descripcion}
        </p>

      )}

    </div>

  );

}


// =====================================================
// RANGE CARD
// =====================================================

function RangeCard({
  titulo,
  descripcion,
  valor,
  cambiar,
  minimo,
  maximo,
  color,
}) {

  const colorPrincipal =
    color === "red"
      ? "#DC2626"
      : "#1D3681";


  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        p-5
        bg-slate-50/70
        dark:bg-slate-800/40
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              font-bold
              text-slate-800
              dark:text-white
            "
          >
            {titulo}
          </p>


          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            {descripcion}
          </p>

        </div>


        <div
          className="
            shrink-0
            min-w-[62px]
            text-center
            px-3
            py-2
            rounded-xl
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-700
          "
        >

          <span
            className="
              text-xl
              font-black
            "
            style={{
              color:
                colorPrincipal,
            }}
          >
            {valor}%
          </span>

        </div>

      </div>


      <div className="mt-5">

        <input
          type="range"
          min={minimo}
          max={maximo}
          value={valor}
          onChange={(e) =>
            cambiar(
              Number(
                e.target.value
              )
            )
          }
          className="
            w-full
            h-2
            rounded-full
            appearance-none
            cursor-pointer
          "
          style={{
            accentColor:
              colorPrincipal,
          }}
        />


        <div
          className="
            flex
            justify-between
            mt-2
            text-[10px]
            font-bold
            text-slate-400
          "
        >

          <span>
            {minimo}%
          </span>

          <span>
            {maximo}%
          </span>

        </div>

      </div>

    </div>

  );

}


// =====================================================
// ESTADO EVALUACIÓN
// =====================================================

function EstadoEvaluacion({
  color,
  titulo,
  texto,
}) {

  const colores = {

    red: `
      bg-red-50
      border-red-100
      text-red-700
      dark:bg-red-950/20
      dark:border-red-900/40
      dark:text-red-300
    `,

    amber: `
      bg-amber-50
      border-amber-100
      text-amber-700
      dark:bg-amber-950/20
      dark:border-amber-900/40
      dark:text-amber-300
    `,

    emerald: `
      bg-emerald-50
      border-emerald-100
      text-emerald-700
      dark:bg-emerald-950/20
      dark:border-emerald-900/40
      dark:text-emerald-300
    `,

  };


  return (

    <div
      className={`
        rounded-xl
        border
        px-4
        py-3
        ${colores[color]}
      `}
    >

      <p
        className="
          text-xs
          font-black
        "
      >
        {titulo}
      </p>


      <p
        className="
          mt-0.5
          text-xs
          opacity-75
        "
      >
        {texto}
      </p>

    </div>

  );

}


// =====================================================
// MINI INFO
// =====================================================

function MiniInfoCard({
  icon,
  titulo,
  texto,
}) {

  return (

    <div
      className="
        p-4
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        bg-slate-50
        dark:bg-slate-800/50
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
          bg-white
          dark:bg-slate-900
          text-[#1D3681]
          dark:text-blue-300
          flex
          items-center
          justify-center
        "
      >

        {icon}

      </div>


      <div>

        <p
          className="
            text-sm
            font-bold
            text-slate-700
            dark:text-slate-200
          "
        >
          {titulo}
        </p>


        <p
          className="
            text-xs
            text-slate-400
            mt-0.5
          "
        >
          {texto}
        </p>

      </div>

    </div>

  );

}


// =====================================================
// BOTÓN GUARDAR
// =====================================================

function GuardarButton({
  guardar,
  guardado,
}) {

  return (

    <div
      className="
        mt-7
        pt-6
        border-t
        border-slate-100
        dark:border-slate-800
        flex
        flex-col
        sm:flex-row
        sm:items-center
        gap-3
      "
    >

      <button
        type="button"
        onClick={guardar}
        className={`
          inline-flex
          items-center
          justify-center
          gap-2
          px-6
          py-3
          rounded-xl
          text-sm
          font-bold
          shadow-sm
          transition-all
          duration-200

          ${
            guardado
              ? `
                bg-emerald-500
                hover:bg-emerald-600
                text-white
              `
              : `
                bg-[#1D3681]
                hover:bg-[#172D6D]
                active:bg-[#12255A]
                text-white
                hover:-translate-y-0.5
                hover:shadow-lg
              `
          }
        `}
      >

        {guardado ? (

          <>
            <CheckCircle2
              size={18}
            />

            Cambios guardados

          </>

        ) : (

          <>
            <Save
              size={18}
            />

            Guardar cambios

          </>

        )}

      </button>


      {guardado && (

        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-emerald-600
            dark:text-emerald-400
          "
        >

          <Sparkles
            size={15}
          />

          El perfil se actualizó correctamente.

        </div>

      )}

    </div>

  );

}
