import {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  RefreshCw,
  BarChart3,
  Users,
  XCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  Filter,
  FolderOpen,
} from "lucide-react";


// =====================================================
// VALIDACIÓN DEL NOMBRE
// =====================================================
//
// FORMATO:
//
// ASE###S#_IS#_EN#_ApellidoNombre
//
// Ejemplos:
//
// ASE242S5_IS2_EN2_NegronFabrizio
// ASE001S1_IS10_EN25_GarciaMaria
// ASE999S20_IS3_EN100_PerezJuan
//
// =====================================================

const PATRON_NOMBRE =
  /^ASE\d+S\d+_IS\d+_EN\d+_[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/;


// =====================================================
// OBTENER NOMBRE REAL
// =====================================================

function obtenerNombre(item) {
  return String(
    item?.nombre ??
    item?.name ??
    item?.archivo ??
    item?.filename ??
    item?.titulo ??
    ""
  ).trim();
}


// =====================================================
// OBTENER ESTADO DEL BACKEND
// =====================================================

function obtenerEstadoBackend(item) {

  if (
    item?.valido === false ||
    item?.valido === "false" ||
    item?.valido === 0 ||
    item?.esValido === false ||
    item?.estado === "invalido" ||
    item?.estado === "inválido" ||
    item?.estado === "NO_VALIDO"
  ) {
    return false;
  }


  if (
    item?.valido === true ||
    item?.valido === "true" ||
    item?.valido === 1 ||
    item?.esValido === true ||
    item?.estado === "valido" ||
    item?.estado === "válido" ||
    item?.estado === "VALIDO"
  ) {
    return true;
  }


  return null;
}


// =====================================================
// SABER SI ES VÁLIDO
// =====================================================

function esResultadoValido(item) {

  const estadoBackend =
    obtenerEstadoBackend(item);


  if (estadoBackend !== null) {
    return estadoBackend;
  }


  return PATRON_NOMBRE.test(
    obtenerNombre(item)
  );
}


// =====================================================
// OBTENER APELLIDO
// =====================================================

function obtenerApellido(nombre) {

  const texto =
    String(nombre ?? "").trim();


  const partes =
    texto.split("_");


  if (partes.length >= 4) {

    const ultimo =
      partes.slice(3).join("_");


    const coincidencia =
      ultimo.match(
        /^([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)([A-ZÁÉÍÓÚÜÑ].*)$/
      );


    if (coincidencia) {
      return coincidencia[1];
    }


    return ultimo;
  }


  const palabras =
    texto
      .replace(/\.[^.]+$/, "")
      .split(/\s+/)
      .filter(Boolean);


  return palabras.length
    ? palabras[palabras.length - 1]
    : texto;
}


// =====================================================
// COMPARAR ALFABÉTICAMENTE
// =====================================================

function compararAlfabeticamente(a, b) {

  return String(a ?? "").localeCompare(
    String(b ?? ""),
    "es",
    {
      sensitivity: "base",
      numeric: true,
    }
  );
}


// =====================================================
// NORMALIZAR PUNTAJE
// =====================================================

function obtenerPuntaje(item) {

  const puntaje =
    item?.puntaje;


  if (
    puntaje &&
    typeof puntaje === "object"
  ) {

    const obtenido =
      Number(
        puntaje.obtenido ?? 0
      );


    const maximo =
      Number(
        puntaje.maximo ?? 2
      );


    let porcentaje =
      Number(
        puntaje.porcentaje
      );


    if (
      !Number.isFinite(porcentaje)
    ) {

      porcentaje =
        maximo > 0
          ? (obtenido / maximo) * 100
          : 0;

    }


    return {

      obtenido:
        Number.isFinite(obtenido)
          ? Number(
              obtenido.toFixed(2)
            )
          : 0,

      maximo:
        Number.isFinite(maximo) &&
        maximo > 0
          ? maximo
          : 2,

      porcentaje:
        Math.round(
          Math.max(
            0,
            Math.min(
              100,
              Number.isFinite(porcentaje)
                ? porcentaje
                : 0
            )
          )
        ),

    };

  }


  const obtenido =
    Number(
      puntaje ?? 0
    );


  const maximo = 2;


  const porcentaje =
    maximo > 0
      ? (obtenido / maximo) * 100
      : 0;


  return {

    obtenido:
      Number.isFinite(obtenido)
        ? Number(
            Math.max(
              0,
              obtenido
            ).toFixed(2)
          )
        : 0,

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
// NORMALIZAR RESULTADO
// =====================================================

function normalizarResultado(item) {

  const nombre =
    obtenerNombre(item);


  const valido =
    esResultadoValido(item);


  const puntaje =
    obtenerPuntaje(item);


  return {

    ...item,

    __nombre:
      nombre || "Documento sin nombre",

    __valido:
      valido,

    __puntaje:
      puntaje,

  };

}


// =====================================================
// OBTENER CÓDIGO DEL ENTREGABLE
// =====================================================
//
// Busca:
//
// ASE242S5_IS2_EN2
//
// dentro de nombres como:
//
// ASE242S5_IS2_EN2_NegronFabrizio
//
// =====================================================

function obtenerCodigoEntregable(resultados) {

  if (!Array.isArray(resultados)) {
    return "";
  }


  for (const item of resultados) {

    const nombre =
      obtenerNombre(item);


    const coincidencia =
      nombre.match(
        /^(ASE\d+S\d+_IS\d+_EN\d+)_/
      );


    if (coincidencia) {
      return coincidencia[1];
    }

  }


  return "";
}


// =====================================================
// COMPONENTE
// =====================================================

export default function ResultsTable({
  resultados = [],
  onSelect,
  onRefresh,

  // ===================================================
  // NOMBRE DE LA CARPETA ANALIZADA
  // ===================================================
  //
  // El componente padre debe enviar:
  //
  // <ResultsTable
  //   resultados={resultados}
  //   nombreCarpeta={nombreCarpeta}
  // />
  //
  // ===================================================

  nombreCarpeta = "",
}) {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [busqueda, setBusqueda] =
    useState("");

  const [elementosPorPagina, setElementosPorPagina] =
    useState(10);

  const [paginaActual, setPaginaActual] =
    useState(1);

  const [vista, setVista] =
    useState("validos");

  const [refrescando, setRefrescando] =
    useState(false);


  // =====================================================
  // NORMALIZAR
  // =====================================================

  const resultadosClasificados =
    useMemo(() => {

      if (!Array.isArray(resultados)) {
        return [];
      }


      return resultados.map(
        normalizarResultado
      );

    }, [resultados]);


  // =====================================================
  // VÁLIDOS
  // =====================================================

  const validos =
    useMemo(() => {

      return [
        ...resultadosClasificados
          .filter(
            (item) =>
              item.__valido
          ),
      ].sort((a, b) => {

        const apellidoA =
          obtenerApellido(
            a.__nombre
          );


        const apellidoB =
          obtenerApellido(
            b.__nombre
          );


        const resultadoApellido =
          compararAlfabeticamente(
            apellidoA,
            apellidoB
          );


        if (
          resultadoApellido !== 0
        ) {
          return resultadoApellido;
        }


        return compararAlfabeticamente(
          a.__nombre,
          b.__nombre
        );

      });

    }, [
      resultadosClasificados,
    ]);


  // =====================================================
  // INVÁLIDOS
  // =====================================================

  const invalidos =
    useMemo(() => {

      return [
        ...resultadosClasificados
          .filter(
            (item) =>
              !item.__valido
          ),
      ].sort((a, b) =>
        compararAlfabeticamente(
          a.__nombre,
          b.__nombre
        )
      );

    }, [
      resultadosClasificados,
    ]);


  // =====================================================
  // CÓDIGO DEL ENTREGABLE
  // =====================================================

  const codigoEntregable =
    useMemo(() => {

      return obtenerCodigoEntregable(
        resultadosClasificados
      );

    }, [
      resultadosClasificados,
    ]);


  // =====================================================
  // VISTA ACTUAL
  // =====================================================

  const resultadosVista =
    vista === "validos"
      ? validos
      : invalidos;


  // =====================================================
  // BÚSQUEDA
  // =====================================================

  const resultadosFiltrados =
    useMemo(() => {

      const texto =
        busqueda
          .toLowerCase()
          .trim();


      if (!texto) {
        return resultadosVista;
      }


      return resultadosVista.filter(
        (item) => {

          const nombre =
            String(
              item.__nombre ?? ""
            ).toLowerCase();


          const entregable =
            String(
              item?.entregable ?? ""
            ).toLowerCase();


          const motivo =
            String(
              item?.motivo ?? ""
            ).toLowerCase();


          return (
            nombre.includes(texto) ||
            entregable.includes(texto) ||
            motivo.includes(texto)
          );

        }
      );

    }, [
      resultadosVista,
      busqueda,
    ]);


  // =====================================================
  // REINICIAR PÁGINA
  // =====================================================

  useEffect(() => {

    setPaginaActual(1);

  }, [
    busqueda,
    elementosPorPagina,
    vista,
    resultados,
  ]);


  // =====================================================
  // ESTADÍSTICAS
  // =====================================================

  const totalDocumentos =
    resultadosClasificados.length;


  const promedio =
    totalDocumentos
      ? Math.round(
          resultadosClasificados.reduce(
            (total, item) =>
              total +
              item.__puntaje.porcentaje,
            0
          ) /
            totalDocumentos
        )
      : 0;


  const aprobados =
    resultadosClasificados.filter(
      (item) =>
        item.__puntaje.porcentaje >= 70
    ).length;


  const criticos =
    resultadosClasificados.filter(
      (item) =>
        item.__puntaje.porcentaje < 50
    ).length;


  const porcentajeValidos =
    totalDocumentos
      ? Math.round(
          (validos.length /
            totalDocumentos) *
            100
        )
      : 0;


  // =====================================================
  // PAGINACIÓN
  // =====================================================

  const totalPaginas =
    Math.max(
      1,
      Math.ceil(
        resultadosFiltrados.length /
          elementosPorPagina
      )
    );


  const indiceInicio =
    (paginaActual - 1) *
    elementosPorPagina;


  const indiceFin =
    indiceInicio +
    elementosPorPagina;


  const resultadosPagina =
    useMemo(() => {

      return resultadosFiltrados.slice(
        indiceInicio,
        indiceFin
      );

    }, [
      resultadosFiltrados,
      indiceInicio,
      indiceFin,
    ]);


  // =====================================================
  // CORREGIR PÁGINA
  // =====================================================

  useEffect(() => {

    if (
      paginaActual >
      totalPaginas
    ) {

      setPaginaActual(
        totalPaginas
      );

    }

  }, [
    paginaActual,
    totalPaginas,
  ]);


  // =====================================================
  // REFRESCAR
  // =====================================================

  const handleRefresh =
    async () => {

      if (refrescando) {
        return;
      }


      try {

        setRefrescando(true);

        await onRefresh?.();

      } catch (error) {

        console.error(
          "Error al refrescar los resultados:",
          error
        );

      } finally {

        setRefrescando(false);

      }

    };


  // =====================================================
  // SIN RESULTADOS
  // =====================================================

  if (
    !resultadosClasificados.length
  ) {

    return (

      <div
        className="
          relative
          overflow-hidden
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
        "
      >

        <div
          className="
            absolute
            -top-24
            -right-24
            w-64
            h-64
            rounded-full
            bg-blue-100/50
            blur-3xl
          "
        />


        <div
          className="
            absolute
            -bottom-24
            -left-24
            w-64
            h-64
            rounded-full
            bg-indigo-100/40
            blur-3xl
          "
        />


        <div
          className="
            relative
            p-14
            text-center
          "
        >

          <div
            className="
              w-24
              h-24
              mx-auto
              rounded-[28px]
              bg-gradient-to-br
              from-blue-600
              to-indigo-700
              text-white
              flex
              items-center
              justify-center
              shadow-xl
              shadow-blue-200
              mb-6
            "
          >

            <FileText
              size={42}
            />

          </div>


          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-blue-50
              text-blue-700
              text-xs
              font-black
              mb-4
            "
          >

            <Sparkles size={14} />

            PANEL ACADÉMICO

          </div>


          <h3
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Aún no existen evaluaciones
          </h3>


          <p
            className="
              mt-2
              text-sm
              text-slate-500
              max-w-md
              mx-auto
            "
          >
            Analiza una carpeta de Google Drive
            para comenzar a visualizar los
            resultados académicos.
          </p>


          {onRefresh && (

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refrescando}
              className="
                mt-7
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-2xl
                bg-[#1D3681]
                hover:bg-blue-900
                text-white
                text-sm
                font-black
                transition
                shadow-lg
                shadow-blue-200
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >

              <RefreshCw
                size={17}
                className={
                  refrescando
                    ? "animate-spin"
                    : ""
                }
              />

              {refrescando
                ? "Refrescando..."
                : "Refrescar resultados"}

            </button>

          )}

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
        space-y-6
      "
    >

      {/* =================================================
          CABECERA DEL ENTREGABLE
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-[#0B1F55]
          via-[#173A8F]
          to-[#344CC4]
          text-white
          shadow-xl
          shadow-blue-200/50
        "
      >

        <div
          className="
            absolute
            -top-24
            -right-20
            w-72
            h-72
            rounded-full
            bg-white/10
            blur-3xl
          "
        />


        <div
          className="
            absolute
            -bottom-28
            left-1/3
            w-80
            h-80
            rounded-full
            bg-indigo-400/20
            blur-3xl
          "
        />


        <div
          className="
            relative
            p-7
            md:p-9
          "
        >

          {/* =================================================
              IDENTIFICACIÓN
          ================================================= */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >

            <div
              className="
                min-w-0
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3.5
                  py-1.5
                  rounded-full
                  bg-white/10
                  border
                  border-white/15
                  text-blue-100
                  text-xs
                  font-black
                  mb-4
                "
              >

                <Sparkles
                  size={14}
                />

                RESULTADOS DEL ENTREGABLE

              </div>


              <h1
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                  tracking-tight
                "
              >

                Resultados de{" "}

                <span
                  className="
                    text-blue-200
                  "
                >
                  {codigoEntregable ||
                    "ASE###S#_IS#_EN#"}
                </span>

              </h1>


              {/* CARPETA ANALIZADA */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  max-w-2xl
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/10
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <FolderOpen
                    size={21}
                  />

                </div>


                <div
                  className="
                    min-w-0
                  "
                >

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-blue-200
                      font-black
                    "
                  >
                    Carpeta analizada
                  </p>


                  <p
                    className="
                      text-sm
                      md:text-base
                      text-white
                      font-bold
                      truncate
                    "
                    title={
                      nombreCarpeta ||
                      "Carpeta no especificada"
                    }
                  >

                    {nombreCarpeta ||
                      "Carpeta no especificada"}

                  </p>

                </div>

              </div>

            </div>


            {/* PORCENTAJE VÁLIDOS */}

            <div
              className="
                shrink-0
                flex
                items-center
                gap-4
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                rounded-3xl
                px-5
                py-4
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/15
                  flex
                  items-center
                  justify-center
                "
              >

                <ShieldCheck
                  size={25}
                />

              </div>


              <div>

                <p
                  className="
                    text-2xl
                    font-black
                  "
                >
                  {porcentajeValidos}%
                </p>


                <p
                  className="
                    text-xs
                    text-blue-100
                    font-semibold
                  "
                >
                  documentos válidos
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          RESUMEN PRINCIPAL
      ================================================= */}

      <div
        className="
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        {/* TOTAL */}

        <div
          className="
            group
            relative
            overflow-hidden
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-5
            shadow-sm
            hover:shadow-md
            hover:-translate-y-0.5
            transition-all
          "
        >

          <div
            className="
              absolute
              -right-5
              -top-5
              w-20
              h-20
              rounded-full
              bg-blue-50
              opacity-70
            "
          />


          <div
            className="
              relative
              flex
              items-center
              justify-between
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-blue-50
                flex
                items-center
                justify-center
                text-blue-600
              "
            >

              <Users
                size={22}
              />

            </div>


            <span
              className="
                px-2.5
                py-1
                rounded-lg
                bg-slate-50
                text-[10px]
                font-black
                text-slate-400
              "
            >
              TOTAL
            </span>

          </div>


          <p
            className="
              text-3xl
              font-black
              text-slate-900
              mt-5
            "
          >
            {totalDocumentos}
          </p>


          <p
            className="
              text-sm
              font-semibold
              text-slate-500
              mt-1
            "
          >
            Documentos evaluados
          </p>

        </div>


        {/* PROMEDIO PUNTAJE */}

        <div
          className="
            group
            relative
            overflow-hidden
            bg-white
            border
            border-indigo-200
            rounded-3xl
            p-5
            shadow-sm
            hover:shadow-md
            hover:-translate-y-0.5
            transition-all
          "
        >

          <div
            className="
              absolute
              -right-5
              -top-5
              w-20
              h-20
              rounded-full
              bg-indigo-50
              opacity-70
            "
          />


          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-indigo-50
              flex
              items-center
              justify-center
              text-indigo-600
            "
          >

            <BarChart3
              size={22}
            />

          </div>


          <p
            className="
              text-3xl
              font-black
              text-slate-900
              mt-5
            "
          >
            {promedio}%
          </p>


          <p
            className="
              text-sm
              font-semibold
              text-slate-500
              mt-1
            "
          >
            Promedio Puntaje
          </p>

        </div>


        {/* VÁLIDOS */}

        <div
          className="
            group
            relative
            overflow-hidden
            bg-white
            border
            border-emerald-200
            rounded-3xl
            p-5
            shadow-sm
            hover:shadow-md
            hover:-translate-y-0.5
            transition-all
          "
        >

          <div
            className="
              absolute
              -right-5
              -top-5
              w-20
              h-20
              rounded-full
              bg-emerald-50
              opacity-70
            "
          />


          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-emerald-50
              flex
              items-center
              justify-center
              text-emerald-600
            "
          >

            <CheckCircle2
              size={22}
            />

          </div>


          <p
            className="
              text-3xl
              font-black
              text-slate-900
              mt-5
            "
          >
            {validos.length}
          </p>


          <p
            className="
              text-sm
              font-semibold
              text-emerald-600
              mt-1
            "
          >
            Documentos Entregables Válidos
          </p>

        </div>


        {/* NO VÁLIDOS */}

        <div
          className="
            group
            relative
            overflow-hidden
            bg-white
            border
            border-red-200
            rounded-3xl
            p-5
            shadow-sm
            hover:shadow-md
            hover:-translate-y-0.5
            transition-all
          "
        >

          <div
            className="
              absolute
              -right-5
              -top-5
              w-20
              h-20
              rounded-full
              bg-red-50
              opacity-70
            "
          />


          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-red-50
              flex
              items-center
              justify-center
              text-red-600
            "
          >

            <XCircle
              size={22}
            />

          </div>


          <p
            className="
              text-3xl
              font-black
              text-slate-900
              mt-5
            "
          >
            {invalidos.length}
          </p>


          <p
            className="
              text-sm
              font-semibold
              text-red-600
              mt-1
            "
          >
            Documentos Entregables No Válidos
          </p>

        </div>

      </div>


      {/* =================================================
          CONTROL DE DOCUMENTOS
      ================================================= */}

      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
          overflow-hidden
        "
      >

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div
          className="
            p-6
            md:p-7
            border-b
            border-slate-200
          "
        >

          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-center
              xl:justify-between
              gap-5
            "
          >

            {/* TÍTULO */}

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#1D3681]
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-md
                    shadow-blue-100
                  "
                >

                  <ShieldCheck
                    size={24}
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

                    <h2
                      className="
                        text-xl
                        md:text-2xl
                        font-black
                        text-slate-900
                      "
                    >
                      Documentos evaluados
                    </h2>


                    <span
                      className="
                        hidden
                        sm:inline-flex
                        items-center
                        gap-1
                        px-2
                        py-1
                        rounded-lg
                        bg-blue-50
                        text-blue-700
                        text-[10px]
                        font-black
                      "
                    >

                      <TrendingUp
                        size={11}
                      />

                      ACTIVO

                    </span>

                  </div>


                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-1
                    "
                  >
                    Revisa nombres, estados y
                    resultados académicos.
                  </p>

                </div>

              </div>

            </div>


            {/* ACCIONES */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-stretch
                sm:items-center
                gap-3
                w-full
                xl:w-auto
              "
            >

              {/* BUSCADOR */}

              <div
                className="
                  relative
                  w-full
                  xl:w-80
                "
              >

                <Search
                  size={18}
                  className="
                    absolute
                    left-3.5
                    top-3
                    text-slate-400
                  "
                />


                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) =>
                    setBusqueda(
                      e.target.value
                    )
                  }
                  placeholder="Buscar documento..."
                  className="
                    w-full
                    pl-10
                    pr-10
                    py-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    text-sm
                    font-medium
                    text-slate-800
                    outline-none
                    transition
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-500/20
                    focus:border-blue-500
                  "
                />


                {busqueda && (

                  <button
                    type="button"
                    onClick={() =>
                      setBusqueda("")
                    }
                    className="
                      absolute
                      right-3
                      top-2.5
                      w-7
                      h-7
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      text-slate-400
                      hover:bg-slate-200
                      hover:text-slate-700
                    "
                  >
                    ×
                  </button>

                )}

              </div>


              {/* REFRESCAR */}

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refrescando}
                title="Refrescar resultados"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  bg-[#1D3681]
                  hover:bg-blue-900
                  text-white
                  text-sm
                  font-black
                  transition
                  shadow-md
                  shadow-blue-100
                  whitespace-nowrap
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                <RefreshCw
                  size={17}
                  className={
                    refrescando
                      ? "animate-spin"
                      : ""
                  }
                />

                {refrescando
                  ? "Refrescando..."
                  : "Refrescar"}

              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            FILTROS
        ================================================= */}

        <div
          className="
            p-5
            md:p-6
            bg-gradient-to-b
            from-slate-50
            to-white
            border-b
            border-slate-200
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              mb-4
            "
          >

            <Filter
              size={16}
              className="text-slate-400"
            />


            <span
              className="
                text-xs
                font-black
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Filtrar resultados
            </span>

          </div>


          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >

            {/* VÁLIDOS */}

            <button
              type="button"
              onClick={() => {
                setVista("validos");
                setPaginaActual(1);
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                p-5
                text-left
                border-2
                transition-all
                duration-200

                ${
                  vista === "validos"
                    ? `
                      bg-emerald-600
                      border-emerald-600
                      text-white
                      shadow-lg
                      shadow-emerald-200
                    `
                    : `
                      bg-white
                      border-slate-200
                      text-slate-700
                      hover:border-emerald-300
                      hover:bg-emerald-50/50
                    `
                }
              `}
            >

              {vista === "validos" && (

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    w-32
                    h-32
                    rounded-full
                    bg-white/10
                    -translate-y-1/2
                    translate-x-1/2
                  "
                />

              )}


              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
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
                    className={`
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center

                      ${
                        vista === "validos"
                          ? "bg-white/20"
                          : "bg-emerald-100 text-emerald-600"
                      }
                    `}
                  >

                    <CheckCircle2
                      size={23}
                    />

                  </div>


                  <div>

                    <p
                      className="
                        text-lg
                        font-black
                      "
                    >
                      Documentos válidos
                    </p>


                    <p
                      className={`
                        text-xs
                        font-semibold
                        mt-0.5

                        ${
                          vista === "validos"
                            ? "text-emerald-100"
                            : "text-slate-400"
                        }
                      `}
                    >
                      Formato correcto
                    </p>

                  </div>

                </div>


                <span
                  className={`
                    text-2xl
                    font-black

                    ${
                      vista === "validos"
                        ? "text-white"
                        : "text-emerald-600"
                    }
                  `}
                >
                  {validos.length}
                </span>

              </div>

            </button>


            {/* INVÁLIDOS */}

            <button
              type="button"
              onClick={() => {
                setVista("invalidos");
                setPaginaActual(1);
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                p-5
                text-left
                border-2
                transition-all
                duration-200

                ${
                  vista === "invalidos"
                    ? `
                      bg-red-600
                      border-red-600
                      text-white
                      shadow-lg
                      shadow-red-200
                    `
                    : `
                      bg-white
                      border-slate-200
                      text-slate-700
                      hover:border-red-300
                      hover:bg-red-50/50
                    `
                }
              `}
            >

              {vista === "invalidos" && (

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    w-32
                    h-32
                    rounded-full
                    bg-white/10
                    -translate-y-1/2
                    translate-x-1/2
                  "
                />

              )}


              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
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
                    className={`
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center

                      ${
                        vista === "invalidos"
                          ? "bg-white/20"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >

                    <XCircle
                      size={23}
                    />

                  </div>


                  <div>

                    <p
                      className="
                        text-lg
                        font-black
                      "
                    >
                      Documentos no válidos
                    </p>


                    <p
                      className={`
                        text-xs
                        font-semibold
                        mt-0.5

                        ${
                          vista === "invalidos"
                            ? "text-red-100"
                            : "text-slate-400"
                        }
                      `}
                    >
                      Requieren corrección
                    </p>

                  </div>

                </div>


                <span
                  className={`
                    text-2xl
                    font-black

                    ${
                      vista === "invalidos"
                        ? "text-white"
                        : "text-red-600"
                    }
                  `}
                >
                  {invalidos.length}
                </span>

              </div>

            </button>

          </div>

        </div>


        {/* =================================================
            INFORMACIÓN
        ================================================= */}

        <div
          className="
            px-6
            py-5
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            border-b
            border-slate-100
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

              <div
                className={`
                  w-2
                  h-2
                  rounded-full

                  ${
                    vista === "validos"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }
                `}
              />


              <p
                className="
                  text-sm
                  font-black
                  text-slate-800
                "
              >

                {vista === "validos"
                  ? "Documentos Entregables Válidos"
                  : "Documentos Entregables No Válidos"}

              </p>

            </div>


            <p
              className="
                text-xs
                text-slate-400
                mt-1.5
              "
            >

              {vista === "validos"
                ? "Ordenados alfabéticamente por apellido."
                : "Estos documentos no cumplen el formato establecido."}

            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                text-xs
                font-bold
                text-slate-500
              "
            >
              Mostrar
            </span>


            <select
              value={elementosPorPagina}
              onChange={(e) =>
                setElementosPorPagina(
                  Number(e.target.value)
                )
              }
              className="
                px-3
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                font-bold
                text-slate-700
                outline-none
                focus:ring-2
                focus:ring-blue-500/20
                focus:border-blue-500
              "
            >

              <option value={10}>
                10
              </option>

              <option value={25}>
                25
              </option>

              <option value={50}>
                50
              </option>

              <option value={100}>
                100
              </option>

            </select>

          </div>

        </div>


        {/* =================================================
            INFORMACIÓN PAGINACIÓN
        ================================================= */}

        <div
          className="
            px-6
            py-3.5
            bg-slate-50/70
            border-b
            border-slate-100
          "
        >

          <p
            className="
              text-xs
              text-slate-500
            "
          >

            Mostrando{" "}

            <span
              className="
                font-black
                text-slate-700
              "
            >
              {resultadosFiltrados.length === 0
                ? 0
                : indiceInicio + 1}
            </span>

            {" "}–{" "}

            <span
              className="
                font-black
                text-slate-700
              "
            >
              {Math.min(
                indiceFin,
                resultadosFiltrados.length
              )}
            </span>

            {" "}de{" "}

            <span
              className="
                font-black
                text-slate-700
              "
            >
              {resultadosFiltrados.length}
            </span>

            {" "}documentos

          </p>

        </div>


        {/* =================================================
            TABLA
        ================================================= */}

        {resultadosPagina.length > 0 ? (

          <div
            className="
              overflow-x-auto
            "
          >

            <table
              className="
                w-full
                text-sm
                min-w-[900px]
              "
            >

              <thead
                className="
                  bg-slate-50/80
                  border-b
                  border-slate-200
                "
              >

                <tr>

                  <th
                    className="
                      text-left
                      px-6
                      py-4
                      text-[11px]
                      uppercase
                      tracking-wider
                      font-black
                      text-slate-400
                    "
                  >
                    Documento
                  </th>


                  <th
                    className="
                      px-4
                      py-4
                      text-center
                      text-[11px]
                      uppercase
                      tracking-wider
                      font-black
                      text-slate-400
                    "
                  >
                    Estado
                  </th>


                  <th
                    className="
                      px-4
                      py-4
                      text-center
                      text-[11px]
                      uppercase
                      tracking-wider
                      font-black
                      text-slate-400
                    "
                  >
                    Puntaje
                  </th>


                  <th
                    className="
                      px-4
                      py-4
                      text-center
                      text-[11px]
                      uppercase
                      tracking-wider
                      font-black
                      text-slate-400
                    "
                  >
                    Cumplimiento
                  </th>


                  <th
                    className="
                      px-6
                      py-4
                      text-center
                      text-[11px]
                      uppercase
                      tracking-wider
                      font-black
                      text-slate-400
                    "
                  >
                    Acción
                  </th>

                </tr>

              </thead>


              <tbody>

                {resultadosPagina.map(
                  (item, index) => {

                    const porcentaje =
                      item.__puntaje.porcentaje;


                    const valido =
                      item.__valido;


                    let nivel;


                    if (
                      porcentaje >= 90
                    ) {

                      nivel = {
                        texto: "Excelente",
                        color:
                          "bg-emerald-100 text-emerald-700",
                        barra:
                          "bg-emerald-500",
                      };

                    } else if (
                      porcentaje >= 70
                    ) {

                      nivel = {
                        texto: "Bueno",
                        color:
                          "bg-blue-100 text-blue-700",
                        barra:
                          "bg-blue-500",
                      };

                    } else if (
                      porcentaje >= 50
                    ) {

                      nivel = {
                        texto: "Regular",
                        color:
                          "bg-yellow-100 text-yellow-700",
                        barra:
                          "bg-yellow-500",
                      };

                    } else {

                      nivel = {
                        texto: "Crítico",
                        color:
                          "bg-red-100 text-red-700",
                        barra:
                          "bg-red-500",
                      };

                    }


                    return (

                      <tr
                        key={`
                          ${item.__nombre}-
                          ${indiceInicio + index}
                        `}
                        className="
                          group
                          border-b
                          border-slate-100
                          hover:bg-blue-50/30
                          transition-colors
                        "
                      >

                        {/* DOCUMENTO */}

                        <td
                          className="
                            px-6
                            py-4.5
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
                              className={`
                                relative
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                shrink-0
                                transition-transform
                                group-hover:scale-105

                                ${
                                  valido
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-red-50 text-red-600"
                                }
                              `}
                            >

                              <FileText
                                size={19}
                              />

                            </div>


                            <div
                              className="
                                min-w-0
                              "
                            >

                              <p
                                className="
                                  font-bold
                                  text-slate-800
                                  break-all
                                  leading-5
                                "
                              >
                                {item.__nombre}
                              </p>


                              {valido ? (

                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-1.5
                                    mt-1
                                  "
                                >

                                  <CheckCircle2
                                    size={12}
                                    className="
                                      text-emerald-500
                                    "
                                  />

                                  <p
                                    className="
                                      text-[11px]
                                      text-emerald-600
                                      font-bold
                                    "
                                  >
                                    Formato correcto
                                  </p>

                                </div>

                              ) : (

                                <p
                                  className="
                                    text-[11px]
                                    text-red-500
                                    font-semibold
                                    mt-1
                                    line-clamp-2
                                  "
                                >
                                  {item?.motivo ??
                                    "El nombre no cumple el formato requerido."}
                                </p>

                              )}

                            </div>

                          </div>

                        </td>


                        {/* ESTADO */}

                        <td
                          className="
                            px-4
                            py-4
                            text-center
                          "
                        >

                          {valido ? (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-emerald-50
                                border
                                border-emerald-100
                                text-emerald-700
                                font-black
                                text-xs
                              "
                            >

                              <CheckCircle2
                                size={14}
                              />

                              Válido

                            </span>

                          ) : (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-red-50
                                border
                                border-red-100
                                text-red-700
                                font-black
                                text-xs
                              "
                            >

                              <XCircle
                                size={14}
                              />

                              No válido

                            </span>

                          )}

                        </td>


                        {/* PUNTAJE */}

                        <td
                          className="
                            px-4
                            py-4
                            text-center
                          "
                        >

                          <div
                            className="
                              inline-flex
                              items-center
                              gap-1
                            "
                          >

                            <span
                              className="
                                font-black
                                text-slate-800
                              "
                            >
                              {item.__puntaje.obtenido}
                            </span>


                            <span
                              className="
                                text-slate-300
                                font-bold
                              "
                            >
                              /
                            </span>


                            <span
                              className="
                                font-bold
                                text-slate-500
                              "
                            >
                              {item.__puntaje.maximo}
                            </span>

                          </div>

                        </td>


                        {/* CUMPLIMIENTO */}

                        <td
                          className="
                            px-4
                            py-4
                          "
                        >

                          <div
                            className="
                              w-36
                              mx-auto
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                mb-2
                              "
                            >

                              <span
                                className="
                                  text-xs
                                  font-black
                                  text-slate-700
                                "
                              >
                                {porcentaje}%
                              </span>


                              <span
                                className={`
                                  text-[9px]
                                  font-black
                                  uppercase
                                  px-2
                                  py-1
                                  rounded-md
                                  ${nivel.color}
                                `}
                              >
                                {nivel.texto}
                              </span>

                            </div>


                            <div
                              className="
                                h-2
                                bg-slate-100
                                rounded-full
                                overflow-hidden
                              "
                            >

                              <div
                                className={`
                                  h-full
                                  rounded-full
                                  transition-all
                                  duration-500
                                  ${nivel.barra}
                                `}
                                style={{
                                  width:
                                    `${Math.min(
                                      100,
                                      Math.max(
                                        0,
                                        porcentaje
                                      )
                                    )}%`,
                                }}
                              />

                            </div>

                          </div>

                        </td>


                        {/* ACCIÓN */}

                        <td
                          className="
                            px-6
                            py-4
                            text-center
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              onSelect?.(item)
                            }
                            className="
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              px-4
                              py-2.5
                              rounded-xl
                              bg-[#1D3681]
                              hover:bg-blue-900
                              text-white
                              font-black
                              text-xs
                              transition
                              shadow-sm
                              hover:shadow-md
                              hover:-translate-y-0.5
                            "
                          >

                            <Eye
                              size={16}
                            />

                            Ver detalle

                          </button>

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div
            className="
              px-6
              py-16
              text-center
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
                mb-4
              "
            >

              {vista === "validos" ? (

                <CheckCircle2
                  size={30}
                  className="text-slate-400"
                />

              ) : (

                <XCircle
                  size={30}
                  className="text-slate-400"
                />

              )}

            </div>


            <p
              className="
                font-black
                text-slate-700
              "
            >

              {busqueda
                ? "No se encontraron coincidencias."
                : vista === "validos"
                  ? "No hay documentos válidos."
                  : "No hay documentos no válidos."}

            </p>


            <p
              className="
                text-sm
                text-slate-400
                mt-1
              "
            >

              {busqueda
                ? "Prueba con otro nombre o término de búsqueda."
                : "Esta categoría no contiene documentos."}

            </p>


            {busqueda && (

              <button
                type="button"
                onClick={() =>
                  setBusqueda("")
                }
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-blue-50
                  text-blue-700
                  hover:bg-blue-100
                  text-sm
                  font-black
                  transition
                "
              >

                <RotateCcw
                  size={15}
                />

                Limpiar búsqueda

              </button>

            )}

          </div>

        )}


        {/* =================================================
            PAGINACIÓN
        ================================================= */}

        {resultadosFiltrados.length > 0 && (

          <div
            className="
              px-6
              py-5
              border-t
              border-slate-200
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              bg-slate-50/40
            "
          >

            <button
              type="button"
              disabled={
                paginaActual === 1
              }
              onClick={() =>
                setPaginaActual(
                  (actual) =>
                    Math.max(
                      1,
                      actual - 1
                    )
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-700
                font-bold
                text-sm
                hover:bg-slate-50
                hover:border-slate-300
                transition
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >

              <ChevronLeft
                size={17}
              />

              Anterior

            </button>


            <div
              className="
                flex
                items-center
                justify-center
                gap-1.5
                flex-wrap
              "
            >

              {Array.from(
                {
                  length: totalPaginas,
                },
                (_, index) =>
                  index + 1
              )
                .filter((numero) => {

                  if (
                    totalPaginas <= 7
                  ) {
                    return true;
                  }


                  return (
                    numero === 1 ||
                    numero === totalPaginas ||
                    Math.abs(
                      numero -
                        paginaActual
                    ) <= 1
                  );

                })
                .map(
                  (
                    numero,
                    index,
                    array
                  ) => {

                    const anteriorNumero =
                      array[index - 1];


                    const mostrarPuntos =
                      anteriorNumero &&
                      numero -
                        anteriorNumero >
                        1;


                    return (

                      <div
                        key={numero}
                        className="
                          flex
                          items-center
                          gap-1.5
                        "
                      >

                        {mostrarPuntos && (

                          <span
                            className="
                              px-1
                              text-slate-400
                              font-bold
                            "
                          >
                            ...
                          </span>

                        )}


                        <button
                          type="button"
                          onClick={() =>
                            setPaginaActual(
                              numero
                            )
                          }
                          className={`
                            w-10
                            h-10
                            rounded-xl
                            font-bold
                            text-sm
                            transition

                            ${
                              paginaActual ===
                              numero
                                ? "bg-[#1D3681] text-white shadow-md shadow-blue-100"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }
                          `}
                        >
                          {numero}
                        </button>

                      </div>

                    );

                  }
                )}

            </div>


            <button
              type="button"
              disabled={
                paginaActual ===
                totalPaginas
              }
              onClick={() =>
                setPaginaActual(
                  (actual) =>
                    Math.min(
                      totalPaginas,
                      actual + 1
                    )
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-700
                font-bold
                text-sm
                hover:bg-slate-50
                hover:border-slate-300
                transition
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >

              Siguiente

              <ChevronRight
                size={17}
              />

            </button>

          </div>

        )}


        {/* =================================================
            PIE
        ================================================= */}

        <div
          className="
            px-6
            pb-6
            pt-2
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
              gap-2
            "
          >

            <div
              className="
                w-7
                h-7
                rounded-lg
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              "
            >

              <ShieldCheck
                size={14}
              />

            </div>


            <p
              className="
                text-xs
                text-slate-400
              "
            >

              Página{" "}

              <span
                className="
                  font-black
                  text-slate-600
                "
              >
                {paginaActual}
              </span>

              {" "}de{" "}

              <span
                className="
                  font-black
                  text-slate-600
                "
              >
                {totalPaginas}
              </span>

            </p>

          </div>


          {busqueda && (

            <button
              type="button"
              onClick={() =>
                setBusqueda("")
              }
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                font-bold
                text-blue-600
                hover:text-blue-800
              "
            >

              <RotateCcw
                size={14}
              />

              Limpiar búsqueda

            </button>

          )}

        </div>

      </div>

    </div>

  );

}
