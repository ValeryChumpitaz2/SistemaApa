import {
  ArrowLeft,
  Search,
  Users,
  RefreshCw,
  UserRound,
  AlertCircle,
  GraduationCap,
  Sparkles,
  SlidersHorizontal,
  LogIn,
  Phone,
  VenusAndMars,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  obtenerEstudiantes,
} from "../../services/estudiantesService";

import EstudianteCard
  from "./EstudianteCard";

import VerEstudianteModal
  from "./VerEstudianteModal";


// =====================================================
// PÁGINA ESTUDIANTES
// =====================================================

export default function Estudiantes() {

  const navigate =
    useNavigate();


  // ===================================================
  // ESTADOS
  // ===================================================

  const [
    estudiantes,
    setEstudiantes,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    semestreFiltro,
    setSemestreFiltro,
  ] = useState("TODOS");

  const [
    sexoFiltro,
    setSexoFiltro,
  ] = useState("TODOS");

  const [
    orden,
    setOrden,
  ] = useState("ULTIMO_ACCESO");

  const [
    estudianteSeleccionado,
    setEstudianteSeleccionado,
  ] = useState(null);

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);


  // ===================================================
  // CARGAR ESTUDIANTES
  // ===================================================

  async function cargarEstudiantes(
    mostrarLoading = true
  ) {

    try {

      setError("");


      if (mostrarLoading) {
        setLoading(true);
      }
      else {
        setRefreshing(true);
      }


      const data =
        await obtenerEstudiantes();


      console.log(
        "===================================="
      );

      console.log(
        "ESTUDIANTES RECIBIDOS:"
      );

      console.table(
        data
      );


      setEstudiantes(
        Array.isArray(data)
          ? data
          : []
      );

    }
    catch (err) {

      console.error(
        "ERROR CARGANDO ESTUDIANTES:",
        err
      );


      setError(
        err?.message ||
        "No se pudieron cargar los estudiantes."
      );


      setEstudiantes([]);

    }
    finally {

      setLoading(false);
      setRefreshing(false);

    }

  }


  // ===================================================
  // CARGAR AL MONTAR
  // ===================================================

  useEffect(() => {

    cargarEstudiantes();

  }, []);


  // ===================================================
  // SEMESTRES
  // ===================================================

  const semestres =
    useMemo(() => {

      const valores =
        estudiantes
          .map(
            (estudiante) =>
              estudiante?.semestre
          )
          .filter(
            (valor) =>
              valor !== null &&
              valor !== undefined &&
              String(valor).trim() !== ""
          )
          .map(
            (valor) =>
              String(valor).trim()
          );


      return [
        ...new Set(valores),
      ].sort(
        (a, b) =>
          a.localeCompare(
            b,
            "es",
            {
              numeric: true,
            }
          )
      );

    }, [
      estudiantes,
    ]);


  // ===================================================
  // SEXOS
  // ===================================================

  const sexos =
    useMemo(() => {

      const valores =
        estudiantes
          .map(
            (estudiante) =>
              estudiante?.sexo
          )
          .filter(
            (valor) =>
              valor !== null &&
              valor !== undefined &&
              String(valor).trim() !== ""
          )
          .map(
            (valor) =>
              String(valor).trim()
          );


      return [
        ...new Set(valores),
      ].sort(
        (a, b) =>
          a.localeCompare(
            b,
            "es"
          )
      );

    }, [
      estudiantes,
    ]);


  // ===================================================
  // FILTRAR Y ORDENAR
  // ===================================================

  const estudiantesFiltrados =
    useMemo(() => {

      const termino =
        search
          .trim()
          .toLowerCase();


      let resultado =
        estudiantes.filter(
          (estudiante) => {

            // -----------------------------------------
            // BUSCADOR
            // -----------------------------------------

            if (termino) {

              const campos = [

                estudiante?.nombre,

                estudiante?.correo,

                estudiante?.dni,

                estudiante?.celular,

                estudiante?.tutor,

                estudiante?.sexo,

                estudiante?.semestre,

                estudiante?.numero,

                estudiante?.apto,

              ];


              const coincide =
                campos.some(
                  (campo) =>
                    String(
                      campo ?? ""
                    )
                      .toLowerCase()
                      .includes(
                        termino
                      )
                );


              if (!coincide) {
                return false;
              }

            }


            // -----------------------------------------
            // SEMESTRE
            // -----------------------------------------

            if (
              semestreFiltro !==
              "TODOS"
            ) {

              if (
                String(
                  estudiante?.semestre ??
                  ""
                ).trim() !==
                String(
                  semestreFiltro
                ).trim()
              ) {

                return false;

              }

            }


            // -----------------------------------------
            // SEXO
            // -----------------------------------------

            if (
              sexoFiltro !==
              "TODOS"
            ) {

              if (
                String(
                  estudiante?.sexo ??
                  ""
                ).trim() !==
                String(
                  sexoFiltro
                ).trim()
              ) {

                return false;

              }

            }


            return true;

          }
        );


      // =================================================
      // ORDEN
      // =================================================

      resultado.sort(
        (a, b) => {

          // -------------------------------------------
          // NOMBRE
          // -------------------------------------------

          if (
            orden ===
            "NOMBRE"
          ) {

            return String(
              a?.nombre ?? ""
            ).localeCompare(
              String(
                b?.nombre ?? ""
              ),
              "es",
              {
                sensitivity:
                  "base",
              }
            );

          }


          // -------------------------------------------
          // ACCESOS
          // -------------------------------------------

          if (
            orden ===
            "ACCESOS"
          ) {

            return (
              Number(
                b?.cantidadAccesos
              ) || 0
            ) -
            (
              Number(
                a?.cantidadAccesos
              ) || 0
            );

          }


          // -------------------------------------------
          // ÚLTIMO ACCESO
          // -------------------------------------------

          const fechaA =
            convertirFecha(
              a?.ultimoAcceso
            );

          const fechaB =
            convertirFecha(
              b?.ultimoAcceso
            );


          return (
            fechaB -
            fechaA
          );

        }
      );


      return resultado;

    }, [
      estudiantes,
      search,
      semestreFiltro,
      sexoFiltro,
      orden,
    ]);


  // ===================================================
  // TOTALES
  // ===================================================

  const totalEstudiantes =
    estudiantes.length;


  const totalAccesos =
    estudiantes.reduce(
      (
        total,
        estudiante
      ) => {

        return (
          total +
          (
            Number(
              estudiante?.cantidadAccesos
            ) || 0
          )
        );

      },
      0
    );


  // ===================================================
  // ACTIVIDAD RECIENTE
  // ===================================================

  const estudiantesRecientes =
    estudiantes.filter(
      (estudiante) => {

        const fecha =
          convertirFecha(
            estudiante?.ultimoAcceso
          );


        if (!fecha) {
          return false;
        }


        const diferencia =
          Date.now() -
          fecha;


        return (
          diferencia >= 0 &&
          diferencia <=
            24 *
            60 *
            60 *
            1000
        );

      }
    ).length;


  // ===================================================
  // MODAL
  // ===================================================

  function abrirModal(
    estudiante
  ) {

    setEstudianteSeleccionado(
      estudiante
    );

    setModalOpen(true);

  }


  function cerrarModal() {

    setModalOpen(false);

    setEstudianteSeleccionado(
      null
    );

  }


  // ===================================================
  // LIMPIAR FILTROS
  // ===================================================

  function limpiarFiltros() {

    setSearch("");

    setSemestreFiltro(
      "TODOS"
    );

    setSexoFiltro(
      "TODOS"
    );

  }


  const hayFiltros =
    Boolean(
      search.trim()
    ) ||
    semestreFiltro !==
      "TODOS" ||
    sexoFiltro !==
      "TODOS";


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

      <header className="mb-8">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/admin/dashboard"
            )
          }
          className="
            group
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-lg
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:text-white
          "
        >

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              transition
              group-hover:-translate-x-0.5
              group-hover:border-slate-300
              dark:border-slate-700
              dark:bg-slate-900
            "
          >

            <ArrowLeft size={16} />

          </span>

          Volver al dashboard

        </button>


        <div
          className="
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

              <Sparkles size={13} />

              Administración académica

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
              Estudiantes
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
              Consulta estudiantes, revisa sus
              datos académicos y controla su
              actividad de acceso al sistema.
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              cargarEstudiantes(false)
            }
            disabled={refreshing}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition
              hover:border-slate-300
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >

            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Actualizando..."
              : "Actualizar"}

          </button>

        </div>

      </header>


      {/* =================================================
          ESTADÍSTICAS
      ================================================= */}

      <div
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >

        <StatCard
          label="Total estudiantes"
          value={totalEstudiantes}
          description="Registrados en el sistema"
          icon={
            <Users size={21} />
          }
          color="indigo"
        />


        <StatCard
          label="Accesos registrados"
          value={totalAccesos}
          description="Total acumulado"
          icon={
            <LogIn size={21} />
          }
          color="emerald"
        />


        <StatCard
          label="Actividad reciente"
          value={estudiantesRecientes}
          description="Accedieron en las últimas 24 h"
          icon={
            <UserRound size={21} />
          }
          color="indigo"
        />

      </div>


      {/* =================================================
          FILTROS
      ================================================= */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-3
            lg:grid-cols-[1fr_auto_auto_auto]
          "
        >

          {/* BUSCAR */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Buscar por nombre, DNI, correo, celular..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                font-medium
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
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


          {/* SEMESTRE */}

          <select
            value={semestreFiltro}
            onChange={(event) =>
              setSemestreFiltro(
                event.target.value
              )
            }
            className="
              h-12
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

            <option value="TODOS">
              Todos los semestres
            </option>

            {semestres.map(
              (semestre) => (

                <option
                  key={semestre}
                  value={semestre}
                >
                  Semestre {semestre}
                </option>

              )
            )}

          </select>


          {/* SEXO */}

          <select
            value={sexoFiltro}
            onChange={(event) =>
              setSexoFiltro(
                event.target.value
              )
            }
            className="
              h-12
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

            <option value="TODOS">
              Todos los sexos
            </option>

            {sexos.map(
              (sexo) => (

                <option
                  key={sexo}
                  value={sexo}
                >
                  {sexo}
                </option>

              )
            )}

          </select>


          {/* ORDEN */}

          <select
            value={orden}
            onChange={(event) =>
              setOrden(
                event.target.value
              )
            }
            className="
              h-12
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

            <option value="ULTIMO_ACCESO">
              Último acceso
            </option>

            <option value="NOMBRE">
              Nombre
            </option>

            <option value="ACCESOS">
              Cantidad de accesos
            </option>

          </select>

        </div>


        {/* CONTADOR */}

        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-400
          "
        >

          <SlidersHorizontal size={14} />

          Mostrando

          <span
            className="
              text-slate-700
              dark:text-slate-200
            "
          >
            {estudiantesFiltrados.length}
          </span>

          de

          <span
            className="
              text-slate-700
              dark:text-slate-200
            "
          >
            {totalEstudiantes}
          </span>

          estudiantes


          {hayFiltros && (

            <button
              type="button"
              onClick={
                limpiarFiltros
              }
              className="
                ml-2
                rounded-lg
                px-2
                py-1
                text-indigo-600
                transition
                hover:bg-indigo-50
                dark:text-indigo-400
                dark:hover:bg-indigo-950/30
              "
            >
              Limpiar filtros
            </button>

          )}

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-red-900/50
            dark:bg-red-950/30
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <AlertCircle
              size={20}
              className="
                shrink-0
                text-red-600
              "
            />

            <div>

              <p
                className="
                  text-sm
                  font-black
                  text-red-700
                  dark:text-red-300
                "
              >
                No se pudieron cargar los estudiantes
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-red-600
                  dark:text-red-400
                "
              >
                {error}
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={() =>
              cargarEstudiantes()
            }
            className="
              shrink-0
              rounded-xl
              bg-red-600
              px-4
              py-2.5
              text-xs
              font-black
              text-white
              transition
              hover:bg-red-700
            "
          >
            Reintentar
          </button>

        </div>

      )}


      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {Array.from({
            length: 6,
          }).map(
            (_, index) => (

              <div
                key={index}
                className="
                  h-72
                  animate-pulse
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              />

            )
          )}

        </div>

      )}


      {/* =================================================
          ESTUDIANTES
      ================================================= */}

      {!loading &&
        !error &&
        estudiantesFiltrados.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {estudiantesFiltrados.map(
              (
                estudiante,
                index
              ) => (

                <EstudianteCard
                  key={
                    estudiante?.id ||
                    estudiante?.dni ||
                    estudiante?.correo ||
                    index
                  }
                  estudiante={
                    estudiante
                  }
                  onView={
                    abrirModal
                  }
                />

              )
            )}

          </div>

        )}


      {/* =================================================
          SIN RESULTADOS
      ================================================= */}

      {!loading &&
        !error &&
        estudiantesFiltrados.length === 0 && (

          <div
            className="
              flex
              min-h-80
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-white
              px-6
              text-center
              dark:border-slate-700
              dark:bg-slate-900
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-500
                dark:bg-slate-800
                dark:text-slate-400
              "
            >

              <GraduationCap size={27} />

            </div>


            <h2
              className="
                mt-5
                text-lg
                font-black
                text-slate-800
                dark:text-white
              "
            >
              {hayFiltros
                ? "No encontramos estudiantes"
                : "No hay estudiantes registrados"}
            </h2>


            <p
              className="
                mt-2
                max-w-md
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              {hayFiltros
                ? "Prueba con otro nombre, DNI, correo, celular, semestre o sexo."
                : "Cuando los estudiantes ingresen al sistema aparecerán aquí."}
            </p>


            {hayFiltros && (

              <button
                type="button"
                onClick={
                  limpiarFiltros
                }
                className="
                  mt-5
                  rounded-xl
                  bg-slate-900
                  px-5
                  py-2.5
                  text-xs
                  font-black
                  text-white
                  transition
                  hover:bg-slate-800
                  dark:bg-white
                  dark:text-slate-900
                "
              >
                Limpiar filtros
              </button>

            )}

          </div>

        )}


      {/* =================================================
          MODAL
      ================================================= */}

      {modalOpen && (

        <VerEstudianteModal
          estudiante={
            estudianteSeleccionado
          }
          onClose={
            cerrarModal
          }
        />

      )}

    </section>

  );

}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  label,
  value,
  description,
  icon,
  color,
}) {

  const emerald =
    color === "emerald";


  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
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

        <div>

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            {label}
          </p>

          <p
            className={`
              mt-2
              text-3xl
              font-black
              tracking-tight
              ${
                emerald
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-indigo-600 dark:text-indigo-400"
              }
            `}
          >
            {value}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            ${
              emerald
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
            }
          `}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}


// =====================================================
// CONVERTIR FECHA
// =====================================================

function convertirFecha(
  fecha
) {

  if (
    fecha === null ||
    fecha === undefined ||
    fecha === ""
  ) {

    return 0;

  }


  if (
    fecha instanceof Date
  ) {

    const tiempo =
      fecha.getTime();

    return Number.isNaN(tiempo)
      ? 0
      : tiempo;

  }


  if (
    typeof fecha === "object" &&
    fecha?.seconds
  ) {

    return (
      Number(
        fecha.seconds
      ) * 1000
    );

  }


  const resultado =
    new Date(
      fecha
    ).getTime();


  return Number.isNaN(
    resultado
  )
    ? 0
    : resultado;

}
