import {
  Trophy,
  FileCheck,
  Star,
  Target,
  Award,
  Lock,
  TrendingUp,
  CheckCircle2,
  Zap,
  Medal
} from "lucide-react";


export default function Achievements({
  documentos = []
}) {

  // ==================================================
  // DOCUMENTOS EVALUADOS
  // ==================================================

  const evaluados = documentos.filter(
    doc => doc?.puntaje
  );


  // ==================================================
  // PROMEDIO
  // ==================================================

  const promedio = evaluados.length
    ? Math.round(
        evaluados.reduce(
          (total, item) =>
            total +
            (Number(item?.puntaje?.porcentaje) || 0),
          0
        ) / evaluados.length
      )
    : 0;


  // ==================================================
  // XP
  // ==================================================

  const xp =
    evaluados.length * 100 +
    promedio * 5;


  // ==================================================
  // NIVEL
  // ==================================================

  const nivel = Math.max(
    1,
    Math.floor(xp / 500) + 1
  );


  const xpNivelActual =
    (nivel - 1) * 500;


  const xpSiguienteNivel =
    nivel * 500;


  const progresoNivel =
    Math.min(
      100,
      Math.max(
        0,
        ((xp - xpNivelActual) /
          (xpSiguienteNivel - xpNivelActual)) *
          100
      )
    );


  const xpFaltante =
    Math.max(
      0,
      xpSiguienteNivel - xp
    );


  // ==================================================
  // LOGROS
  // ==================================================

  const logros = [

    {
      titulo: "Primer análisis",
      descripcion:
        "Realizaste tu primera evaluación.",
      icon: FileCheck,
      desbloqueado:
        evaluados.length >= 1,
      xp: 100,
      meta: "1 documento",
      progreso:
        Math.min(
          evaluados.length,
          1
        ),
      objetivo: 1
    },

    {
      titulo: "Estudiante constante",
      descripcion:
        "Evaluaste 5 documentos académicos.",
      icon: Target,
      desbloqueado:
        evaluados.length >= 5,
      xp: 250,
      meta: "5 documentos",
      progreso:
        Math.min(
          evaluados.length,
          5
        ),
      objetivo: 5
    },

    {
      titulo: "Buen dominio APA",
      descripcion:
        "Alcanzaste un promedio superior al 80%.",
      icon: Star,
      desbloqueado:
        promedio >= 80,
      xp: 300,
      meta: "80% de promedio",
      progreso:
        Math.min(
          promedio,
          80
        ),
      objetivo: 80
    },

    {
      titulo: "Experto APA",
      descripcion:
        "Alcanzaste un promedio superior al 95%.",
      icon: Trophy,
      desbloqueado:
        promedio >= 95,
      xp: 500,
      meta: "95% de promedio",
      progreso:
        Math.min(
          promedio,
          95
        ),
      objetivo: 95
    }

  ];


  // ==================================================
  // ESTADÍSTICAS
  // ==================================================

  const logrosDesbloqueados =
    logros.filter(
      logro => logro.desbloqueado
    ).length;


  const porcentajeLogros =
    Math.round(
      (logrosDesbloqueados /
        logros.length) *
        100
    );


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="space-y-8">


      {/* ==================================================
          ENCABEZADO
      ================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          shadow-sm
        "
      >

        {/* DECORACIÓN */}

        <div
          className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-blue-100
            dark:bg-blue-900/20
          "
        />

        <div
          className="
            absolute
            -bottom-24
            right-32
            h-48
            w-48
            rounded-full
            bg-indigo-100
            dark:bg-indigo-900/20
          "
        />


        <div
          className="
            relative
            p-8
            md:p-10
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
            "
          >

            {/* TITULO */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  dark:bg-blue-900/30
                  px-3
                  py-1.5
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-[#1D3681]
                  dark:text-blue-300
                "
              >

                <Trophy size={14} />

                Sistema de logros

              </div>


              <h1
                className="
                  mt-4
                  text-3xl
                  md:text-4xl
                  font-black
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >

                Mis logros

              </h1>


              <p
                className="
                  mt-3
                  max-w-xl
                  text-slate-500
                  dark:text-slate-400
                  leading-7
                "
              >

                Completa evaluaciones, mejora tu desempeño
                académico y desbloquea nuevos logros.

              </p>

            </div>


            {/* NIVEL */}

            <div
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                bg-slate-50
                dark:bg-slate-800
                px-5
                py-4
                border
                border-slate-200
                dark:border-slate-700
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#1D3681]
                  text-white
                  shadow-lg
                "
              >

                <Medal size={28} />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Nivel actual
                </p>

                <p
                  className="
                    text-2xl
                    font-black
                    text-slate-900
                    dark:text-white
                  "
                >
                  Nivel {nivel}
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              PROGRESO XP
          ================================================== */}

          <div
            className="
              mt-8
              rounded-2xl
              bg-[#1D3681]
              p-6
              text-white
              shadow-lg
            "
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
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
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >

                  <Zap size={20} />

                </div>


                <div>

                  <p className="text-sm text-blue-100">
                    Experiencia académica
                  </p>

                  <p className="text-xl font-black">
                    {xp} XP
                  </p>

                </div>

              </div>


              <div className="text-left sm:text-right">

                <p
                  className="
                    text-xs
                    text-blue-200
                  "
                >
                  Próximo nivel
                </p>

                <p className="font-bold">

                  {xpFaltante > 0
                    ? `${xpFaltante} XP restantes`
                    : "Nivel completado"
                  }

                </p>

              </div>

            </div>


            {/* BARRA */}

            <div
              className="
                mt-5
                h-3
                overflow-hidden
                rounded-full
                bg-white/20
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-white
                  transition-all
                  duration-700
                "
                style={{
                  width: `${progresoNivel}%`
                }}
              />

            </div>


            <div
              className="
                mt-2
                flex
                justify-between
                text-xs
                text-blue-200
              "
            >

              <span>
                {xpNivelActual} XP
              </span>

              <span>
                {xpSiguienteNivel} XP
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          ESTADÍSTICAS
      ================================================== */}

      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >

        <StatCard
          icon={<FileCheck size={21} />}
          titulo="Documentos evaluados"
          valor={evaluados.length}
          color="blue"
        />


        <StatCard
          icon={<TrendingUp size={21} />}
          titulo="Promedio APA"
          valor={`${promedio}%`}
          color="green"
        />


        <StatCard
          icon={<Award size={21} />}
          titulo="Logros desbloqueados"
          valor={`${logrosDesbloqueados}/${logros.length}`}
          color="purple"
        />

      </section>


      {/* ==================================================
          CABECERA LOGROS
      ================================================== */}

      <section>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
            mb-5
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
              Tus objetivos
            </p>

            <h2
              className="
                mt-1
                text-2xl
                font-black
                text-slate-900
                dark:text-white
              "
            >
              Logros disponibles
            </h2>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              font-bold
              text-slate-500
              dark:text-slate-400
            "
          >

            <CheckCircle2
              size={18}
              className="text-green-500"
            />

            {porcentajeLogros}% completado

          </div>

        </div>


        {/* ==================================================
            GRID LOGROS
        ================================================== */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          {logros.map(
            (logro, index) => {

              const Icon =
                logro.icon;


              const progreso =
                logro.objetivo
                  ? Math.min(
                      100,
                      (logro.progreso /
                        logro.objetivo) *
                        100
                    )
                  : 0;


              return (

                <div
                  key={index}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    p-6
                    transition-all
                    duration-300

                    ${
                      logro.desbloqueado

                        ?

                        `
                          border-blue-200
                          bg-white
                          dark:border-blue-900
                          dark:bg-slate-900
                          shadow-sm
                          hover:-translate-y-1
                          hover:shadow-xl
                        `

                        :

                        `
                          border-slate-200
                          bg-slate-50
                          dark:border-slate-800
                          dark:bg-slate-900/60
                        `
                    }
                  `}
                >

                  {/* BRILLO */}

                  {logro.desbloqueado && (

                    <div
                      className="
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-blue-100
                        dark:bg-blue-900/20
                      "
                    />

                  )}


                  {/* ICONOS */}

                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl

                        ${
                          logro.desbloqueado

                            ?

                            `
                              bg-blue-100
                              text-[#1D3681]
                              dark:bg-blue-900/40
                              dark:text-blue-300
                            `

                            :

                            `
                              bg-slate-200
                              text-slate-400
                              dark:bg-slate-800
                              dark:text-slate-500
                            `
                        }
                      `}
                    >

                      <Icon size={27} />

                    </div>


                    <div>

                      {logro.desbloqueado ? (

                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            bg-green-100
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-green-700
                            dark:bg-green-900/30
                            dark:text-green-400
                          "
                        >

                          <CheckCircle2 size={13} />

                          Desbloqueado

                        </span>

                      ) : (

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-200
                            text-slate-400
                            dark:bg-slate-800
                          "
                        >

                          <Lock size={17} />

                        </div>

                      )}

                    </div>

                  </div>


                  {/* INFORMACIÓN */}

                  <div className="mt-6">

                    <h3
                      className={`
                        text-lg
                        font-black

                        ${
                          logro.desbloqueado

                            ?

                            `
                              text-slate-900
                              dark:text-white
                            `

                            :

                            `
                              text-slate-500
                              dark:text-slate-400
                            `
                        }
                      `}
                    >

                      {logro.titulo}

                    </h3>


                    <p
                      className="
                        mt-2
                        min-h-[48px]
                        text-sm
                        leading-6
                        text-slate-500
                        dark:text-slate-400
                      "
                    >

                      {logro.descripcion}

                    </p>

                  </div>


                  {/* XP */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-sm
                        font-bold
                        text-[#1D3681]
                        dark:text-blue-400
                      "
                    >

                      +{logro.xp} XP

                    </span>


                    <span
                      className="
                        text-xs
                        font-semibold
                        text-slate-400
                      "
                    >

                      {logro.meta}

                    </span>

                  </div>


                  {/* PROGRESO */}

                  {!logro.desbloqueado && (

                    <div className="mt-4">

                      <div
                        className="
                          h-2
                          overflow-hidden
                          rounded-full
                          bg-slate-200
                          dark:bg-slate-800
                        "
                      >

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-blue-500
                            transition-all
                          "
                          style={{
                            width: `${progreso}%`
                          }}
                        />

                      </div>


                      <p
                        className="
                          mt-2
                          text-xs
                          font-medium
                          text-slate-400
                        "
                      >

                        {logro.progreso} de{" "}
                        {logro.objetivo}

                      </p>

                    </div>

                  )}

                </div>

              );

            }
          )}

        </div>

      </section>


      {/* ==================================================
          MENSAJE INFERIOR
      ================================================== */}

      <section
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          gap-4
          rounded-2xl
          border
          border-blue-100
          bg-blue-50
          p-5
          dark:border-blue-900/40
          dark:bg-blue-900/10
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-100
            text-[#1D3681]
            dark:bg-blue-900/40
            dark:text-blue-300
          "
        >

          <Trophy size={21} />

        </div>


        <div>

          <p
            className="
              font-bold
              text-slate-800
              dark:text-white
            "
          >

            Sigue mejorando tu desempeño académico.

          </p>


          <p
            className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >

            Cada evaluación te acerca a nuevos niveles
            y logros dentro de VG Smart Review.

          </p>

        </div>

      </section>

    </div>

  );
}


/* ==================================================
   COMPONENTE ESTADÍSTICA
================================================== */

function StatCard({
  icon,
  titulo,
  valor,
  color
}) {

  const colores = {

    blue: `
      bg-blue-50
      text-blue-700
      dark:bg-blue-900/30
      dark:text-blue-300
    `,

    green: `
      bg-green-50
      text-green-700
      dark:bg-green-900/30
      dark:text-green-300
    `,

    purple: `
      bg-purple-50
      text-purple-700
      dark:bg-purple-900/30
      dark:text-purple-300
    `

  };


  return (

    <div
      className="
        rounded-2xl
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
          flex
          items-center
          justify-between
        "
      >

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${colores[color]}
          `}
        >

          {icon}

        </div>

      </div>


      <p
        className="
          mt-4
          text-sm
          font-medium
          text-slate-500
          dark:text-slate-400
        "
      >

        {titulo}

      </p>


      <p
        className="
          mt-1
          text-2xl
          font-black
          text-slate-900
          dark:text-white
        "
      >

        {valor}

      </p>

    </div>

  );

}