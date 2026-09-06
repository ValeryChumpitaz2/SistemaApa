import {
  ArrowLeft,
  Search,
  Users,
  RefreshCw,
  UserRound,
  AlertCircle,
  UserCheck,
  Sparkles,
  SlidersHorizontal,
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
  obtenerDocentesAdmin,
} from "../../services/docentesService";

import DocenteCard from "./DocenteCard";

import CambiarPasswordModal
  from "./CambiarPasswordModal";


// =====================================================
// PÁGINA DOCENTES
// =====================================================

export default function Docentes() {

  const navigate = useNavigate();

  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [docenteSeleccionado, setDocenteSeleccionado] =
    useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  // =====================================================
  // CARGAR DOCENTES
  // =====================================================

  async function cargarDocentes(
    mostrarLoading = true
  ) {

    try {

      setError("");

      if (mostrarLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const data = await obtenerDocentesAdmin();

      console.log(
        "DOCENTES RECIBIDOS:",
        data
      );

      let lista = [];

      if (Array.isArray(data)) {

        lista = data;

      } else if (
        Array.isArray(data?.docentes)
      ) {

        lista = data.docentes;

      } else if (
        Array.isArray(data?.data)
      ) {

        lista = data.data;

      }

      setDocentes(lista);

    } catch (err) {

      console.error(
        "ERROR CARGANDO DOCENTES:",
        err
      );

      setError(
        err?.message ||
        "No se pudieron cargar los docentes."
      );

      setDocentes([]);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  }


  // =====================================================
  // EFFECT
  // =====================================================

  useEffect(() => {

    cargarDocentes();

  }, []);


  // =====================================================
  // FILTRAR
  // =====================================================

  const docentesFiltrados = useMemo(() => {

    const termino =
      search
        .trim()
        .toLowerCase();

    if (!termino) {
      return docentes;
    }

    return docentes.filter((docente) => {

      const texto = [

        docente?.nombre,
        docente?.nombres,
        docente?.apellido,
        docente?.apellidos,
        docente?.usuario,
        docente?.correo,
        docente?.email,
        docente?.correoElectronico,

      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return texto.includes(termino);

    });

  }, [
    docentes,
    search,
  ]);


  // =====================================================
  // MODAL
  // =====================================================

  function abrirCambioPassword(docente) {

    setDocenteSeleccionado(docente);
    setModalOpen(true);

  }


  function cerrarModal() {

    setModalOpen(false);
    setDocenteSeleccionado(null);

  }


  // =====================================================
  // ESTADÍSTICAS
  // =====================================================

  const totalDocentes =
    docentes.length;


  const docentesActivos =
    docentes.filter((docente) => {

      const estado =
        String(
          docente?.estado || "ACTIVO"
        )
          .trim()
          .toUpperCase();

      return (
        estado === "ACTIVO" ||
        estado === "HABILITADO" ||
        estado === "TRUE" ||
        estado === "VERDADERO"
      );

    }).length;


  const porcentajeActivos =
    totalDocentes > 0
      ? Math.round(
          (docentesActivos /
            totalDocentes) *
          100
        )
      : 0;


  // =====================================================
  // RENDER
  // =====================================================

  return (

<section className="min-h-[calc(100vh-5rem)] w-full">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="mb-8">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/dashboard")
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
              Docentes
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
              Gestiona los docentes registrados y
              administra sus credenciales de acceso
              al Sistema APA.
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              cargarDocentes(false)
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
          STATS
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

        {/* TOTAL */}

        <div
          className="
            relative
            overflow-hidden
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
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-indigo-50
              dark:bg-indigo-950/30
            "
          />

          <div className="relative flex items-center justify-between">

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
                Total docentes
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-black
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {totalDocentes}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Registrados en el sistema
              </p>

            </div>


            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                text-indigo-600
                dark:bg-indigo-950/40
                dark:text-indigo-400
              "
            >
              <Users size={21} />
            </div>

          </div>

        </div>


        {/* ACTIVOS */}

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

          <div className="flex items-center justify-between">

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
                Docentes activos
              </p>

              <div className="mt-2 flex items-baseline gap-2">

                <p
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  {docentesActivos}
                </p>

                <span
                  className="
                    text-xs
                    font-bold
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  {porcentajeActivos}%
                </span>

              </div>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Cuentas habilitadas
              </p>

            </div>


            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-950/40
                dark:text-emerald-400
              "
            >
              <UserCheck size={21} />
            </div>

          </div>

        </div>


        {/* MOSTRANDO */}

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

          <div className="flex items-center justify-between">

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
                Resultados
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-black
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                {docentesFiltrados.length}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Docentes visibles
              </p>

            </div>


            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              <UserRound size={21} />
            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          BUSCADOR
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
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >

          <div className="relative flex-1">

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
                setSearch(event.target.value)
              }
              placeholder="Buscar docente por nombre, usuario o correo..."
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
                dark:focus:bg-slate-800
              "
            />

          </div>


          <div
            className="
              hidden
              h-12
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              px-4
              text-xs
              font-bold
              text-slate-500
              sm:flex
              dark:border-slate-700
              dark:text-slate-400
            "
          >

            <SlidersHorizontal size={15} />

            {search
              ? `Filtrando: "${search}"`
              : "Todos los docentes"}

          </div>

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

          <div className="flex items-start gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-100
                text-red-600
                dark:bg-red-900/40
                dark:text-red-400
              "
            >
              <AlertCircle size={18} />
            </div>


            <div>

              <p
                className="
                  text-sm
                  font-black
                  text-red-700
                  dark:text-red-300
                "
              >
                No se pudieron cargar los docentes
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
            onClick={() => cargarDocentes()}
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

          {Array.from({ length: 6 }).map(
            (_, index) => (

              <div
                key={index}
                className="
                  h-64
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
          CARDS
      ================================================= */}

      {!loading &&
        !error &&
        docentesFiltrados.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {docentesFiltrados.map(
              (docente, index) => (

                <DocenteCard
                  key={
                    docente?.id ||
                    docente?.correo ||
                    docente?.email ||
                    index
                  }
                  docente={docente}
                  onChangePassword={
                    () =>
                      abrirCambioPassword(
                        docente
                      )
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
        docentesFiltrados.length === 0 && (

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
              <Users size={27} />
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
              {search
                ? "No encontramos docentes"
                : "No hay docentes registrados"}
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
              {search
                ? "Prueba con otro nombre, usuario o correo electrónico."
                : "Cuando existan docentes registrados aparecerán aquí."}
            </p>


            {search && (

              <button
                type="button"
                onClick={() => setSearch("")}
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
                Limpiar búsqueda
              </button>

            )}

          </div>

        )}


      {/* =================================================
          MODAL
      ================================================= */}

      <CambiarPasswordModal
        docente={docenteSeleccionado}
        onClose={cerrarModal}
        onSuccess={() => {

          cerrarModal();

          console.log(
            "Contraseña actualizada correctamente."
          );

        }}
      />

    </section>

  );

}
