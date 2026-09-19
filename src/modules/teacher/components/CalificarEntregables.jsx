import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  classroomObtenerCursos,
  classroomObtenerTemas,
  classroomObtenerActividades,
  classroomObtenerAlumnos
} from "../services/classroomService";


// ============================================================
// DEBUG
// ============================================================

function debugLog(titulo, datos = null) {
  console.groupCollapsed(
    `%c[CLASSROOM DEBUG] ${titulo}`,
    "color:#2563eb;font-weight:bold"
  );

  if (datos !== null) {
    console.log(datos);
  }

  console.trace("Origen:");

  console.groupEnd();
}


function debugError(titulo, error) {
  console.group(
    `%c[CLASSROOM ERROR] ${titulo}`,
    "color:#dc2626;font-weight:bold"
  );

  console.error("Error completo:", error);
  console.error("Mensaje:", error?.message);
  console.error("Nombre:", error?.name);
  console.error("Stack:", error?.stack);

  if (error?.response) {
    console.error("Response:", error.response);
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  }

  if (error?.request) {
    console.error("Request:", error.request);
  }

  console.groupEnd();
}


// ============================================================
// EXTRAER LISTA
// ============================================================

function extraerLista(
  respuesta,
  posiblesClaves = []
) {
  console.log(
    "[EXTRAER LISTA] Respuesta:",
    respuesta
  );

  if (Array.isArray(respuesta)) {
    return respuesta;
  }

  for (const clave of posiblesClaves) {
    if (
      Array.isArray(
        respuesta?.[clave]
      )
    ) {
      return respuesta[clave];
    }
  }

  if (
    respuesta?.data !== undefined &&
    respuesta?.data !== null
  ) {
    if (Array.isArray(respuesta.data)) {
      return respuesta.data;
    }

    for (const clave of posiblesClaves) {
      if (
        Array.isArray(
          respuesta.data?.[clave]
        )
      ) {
        return respuesta.data[clave];
      }
    }
  }

  return [];
}


// ============================================================
// NORMALIZAR ALUMNO
// ============================================================

function normalizarAlumno(alumno) {
  const estudiante =
    alumno || {};

  const profile =
    estudiante.profile ||
    estudiante.perfil ||
    {};

  const profileName =
    profile.name ||
    {};

  const directName =
    estudiante.name;

  let nombre = "";

  if (
    typeof estudiante.nombre === "string" &&
    estudiante.nombre.trim()
  ) {
    nombre =
      estudiante.nombre.trim();
  }

  else if (
    typeof estudiante.nombreCompleto === "string" &&
    estudiante.nombreCompleto.trim()
  ) {
    nombre =
      estudiante.nombreCompleto.trim();
  }

  else if (
    typeof estudiante.fullName === "string" &&
    estudiante.fullName.trim()
  ) {
    nombre =
      estudiante.fullName.trim();
  }

  else if (
    typeof directName === "string" &&
    directName.trim()
  ) {
    nombre =
      directName.trim();
  }

  else {
    nombre =
      profileName.fullName ||
      (
        String(
          profileName.givenName || ""
        ) +
        " " +
        String(
          profileName.familyName || ""
        )
      ).trim();
  }

  if (!nombre) {
    nombre = "Alumno";
  }

  const userId =
    String(
      estudiante.userId ||
      estudiante.id ||
      estudiante.studentId ||
      estudiante.user?.userId ||
      estudiante.user?.id ||
      profile.userId ||
      profile.id ||
      ""
    ).trim();

  const email =
    String(
      estudiante.email ||
      estudiante.emailAddress ||
      estudiante.correo ||
      profile.emailAddress ||
      ""
    ).trim();

  const photoUrl =
    String(
      estudiante.photoUrl ||
      estudiante.photo ||
      profile.photoUrl ||
      profile.photo ||
      ""
    ).trim();

  return {
    ...estudiante,

    userId,

    id:
      estudiante.id ||
      userId,

    nombre,

    nombreCompleto:
      estudiante.nombreCompleto ||
      nombre,

    email,

    photoUrl
  };
}


// ============================================================
// OBTENER PUNTAJE
// ============================================================

function obtenerPuntaje(item) {
  if (!item) {
    return null;
  }

  const posibles = [
    item.assignedGrade,
    item.assignedPoints,

    item.puntosObtenidos,
    item.puntos,

    item.puntaje,
    item.score,

    item.nota,
    item.grade,

    item.calificacion,
    item.calificacionObtenida,

    item.obtenido,

    item.valor,

    item.resultado,

    item.submission?.assignedGrade,
    item.submission?.assignedPoints,

    item.studentSubmission?.assignedGrade,
    item.studentSubmission?.assignedPoints,

    item.studentSubmission?.grade,

    item.entrega?.assignedGrade,
    item.entrega?.grade,

    item.entrega?.puntaje,
    item.entrega?.puntos,

    item.calificacion?.puntos,
    item.calificacion?.puntaje,
    item.calificacion?.nota
  ];

  for (const valor of posibles) {
    if (
      valor !== undefined &&
      valor !== null &&
      valor !== "" &&
      !Number.isNaN(Number(valor))
    ) {
      return Number(valor);
    }
  }

  return null;
}


// ============================================================
// OBTENER PUNTAJE MÁXIMO
// ============================================================

function obtenerPuntajeMaximo(item) {
  if (!item) {
    return null;
  }

  const posibles = [
    item.maxPoints,
    item.maxScore,
    item.puntosMaximos,

    item.puntajeMaximo,
    item.notaMaxima,

    item.totalPoints,

    item.submission?.maxPoints,
    item.studentSubmission?.maxPoints,

    item.entrega?.maxPoints,

    item.calificacion?.maxPoints,
    item.calificacion?.puntosMaximos
  ];

  for (const valor of posibles) {
    if (
      valor !== undefined &&
      valor !== null &&
      valor !== "" &&
      !Number.isNaN(Number(valor))
    ) {
      return Number(valor);
    }
  }

  return null;
}


// ============================================================
// OBTENER ESTADO DE ENTREGA
// ============================================================

function obtenerEstadoEntrega(item) {
  if (!item) {
    return "";
  }

  return String(
    item.estado ||
    item.status ||
    item.estadoEntrega ||

    item.submission?.state ||
    item.submission?.status ||

    item.studentSubmission?.state ||
    item.studentSubmission?.status ||

    item.entrega?.estado ||
    item.entrega?.status ||

    ""
  ).trim();
}


// ============================================================
// FORMATEAR PUNTAJE
// ============================================================

function formatearPuntaje(valor) {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return "—";
  }

  const numero =
    Number(valor);

  if (Number.isNaN(numero)) {
    return String(valor);
  }

  if (
    Number.isInteger(numero)
  ) {
    return String(numero);
  }

  return numero.toFixed(2);
}


// ============================================================
// COLOR SEGÚN PUNTAJE
// ============================================================

function colorPuntaje(
  puntaje,
  maximo
) {
  if (
    puntaje === null ||
    puntaje === undefined
  ) {
    return {
      background: "#f1f5f9",
      color: "#64748b",
      border: "#e2e8f0"
    };
  }

  if (
    maximo === null ||
    maximo === undefined ||
    maximo === 0
  ) {
    return {
      background: "#dbeafe",
      color: "#1d4ed8",
      border: "#bfdbfe"
    };
  }

  const porcentaje =
    (Number(puntaje) /
      Number(maximo)) *
    100;

  if (porcentaje >= 70) {
    return {
      background: "#dcfce7",
      color: "#166534",
      border: "#bbf7d0"
    };
  }

  if (porcentaje >= 50) {
    return {
      background: "#fef3c7",
      color: "#92400e",
      border: "#fde68a"
    };
  }

  return {
    background: "#fee2e2",
    color: "#991b1b",
    border: "#fecaca"
  };
}


// ============================================================
// COMPONENTE
// ============================================================

export default function CalificarEntregables() {

  // ==========================================================
  // CURSOS
  // ==========================================================

  const [cursos, setCursos] =
    useState([]);

  const [cursoSeleccionado, setCursoSeleccionado] =
    useState("");

  const [cursoActual, setCursoActual] =
    useState(null);


  // ==========================================================
  // TOPICS
  // ==========================================================

  const [topics, setTopics] =
    useState([]);

  const [topicSeleccionado, setTopicSeleccionado] =
    useState("");

  const [topicActual, setTopicActual] =
    useState(null);


  // ==========================================================
  // ENTREGABLES
  // ==========================================================

  const [entregables, setEntregables] =
    useState([]);


  // ==========================================================
  // ALUMNOS
  // ==========================================================

  const [alumnos, setAlumnos] =
    useState([]);

  const [busquedaAlumno, setBusquedaAlumno] =
    useState("");


  // ==========================================================
  // LOADING
  // ==========================================================

  const [loadingCursos, setLoadingCursos] =
    useState(true);

  const [loadingTopics, setLoadingTopics] =
    useState(false);

  const [loadingEntregables, setLoadingEntregables] =
    useState(false);

  const [loadingAlumnos, setLoadingAlumnos] =
    useState(false);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] =
    useState("");


  // ==========================================================
  // DEBUG
  // ==========================================================

  const [debugInfo, setDebugInfo] =
    useState({

      cursos: null,

      topics: null,

      actividades: null,

      alumnos: null

    });


  // ==========================================================
  // INICIO
  // ==========================================================

  useEffect(() => {

    debugLog(
      "COMPONENTE CALIFICAR ENTREGABLES INICIADO"
    );

    cargarCursos();

  }, []);


  // ==========================================================
  // CARGAR CURSOS
  // ==========================================================

  async function cargarCursos() {

    console.group(
      "%c[1] CARGANDO CURSOS",
      "color:#7c3aed;font-weight:bold"
    );

    try {

      setLoadingCursos(true);
      setError("");

      const respuesta =
        await classroomObtenerCursos();

      console.log(
        "RESPUESTA CURSOS:",
        respuesta
      );

      setDebugInfo(prev => ({
        ...prev,
        cursos: respuesta
      }));

      const lista =
        extraerLista(
          respuesta,
          [
            "cursos",
            "courses"
          ]
        );

      const experiencias =
        lista.filter(
          curso => {

            const seccion =
              String(
                curso?.seccion ||
                curso?.section ||
                ""
              )
                .trim()
                .toUpperCase();

            return seccion.includes(
              "EXPERIENCIAS FORMAT"
            );

          }
        );

      setCursos(
        experiencias
      );

      if (lista.length === 0) {

        setError(
          "El servicio no devolvió cursos."
        );

      }

      else if (
        experiencias.length === 0
      ) {

        setError(
          `Se recibieron ${lista.length} cursos, pero ninguno coincide con EXPERIENCIAS FORMAT.`
        );

      }

    }

    catch (err) {

      debugError(
        "FALLÓ CARGAR CURSOS",
        err
      );

      setCursos([]);

      setError(
        `ERROR AL CARGAR CURSOS: ${
          err?.message ||
          "Error desconocido"
        }`
      );

    }

    finally {

      setLoadingCursos(false);

      console.groupEnd();

    }

  }


  // ==========================================================
  // CAMBIO DE CURSO
  // ==========================================================

  async function handleCursoChange(event) {

    const courseId =
      event.target.value;

    setCursoSeleccionado(
      courseId
    );

    setTopicSeleccionado("");
    setTopicActual(null);

    setTopics([]);

    setEntregables([]);

    setAlumnos([]);

    setBusquedaAlumno("");

    setError("");

    if (!courseId) {

      setCursoActual(null);

      return;

    }

    const curso =
      cursos.find(
        item =>
          String(item?.id) ===
          String(courseId)
      );

    setCursoActual(
      curso || null
    );

    await Promise.all([
      cargarTopics(courseId),
      cargarAlumnos(courseId)
    ]);

  }


  // ==========================================================
  // TOPICS
  // ==========================================================

  async function cargarTopics(courseId) {

    console.group(
      "%c[2] CARGANDO TOPICS",
      "color:#7c3aed;font-weight:bold"
    );

    try {

      setLoadingTopics(true);

      const respuesta =
        await classroomObtenerTemas(
          courseId
        );

      console.log(
        "RESPUESTA TOPICS:",
        respuesta
      );

      setDebugInfo(prev => ({
        ...prev,
        topics: respuesta
      }));

      const lista =
        extraerLista(
          respuesta,
          [
            "temas",
            "topics"
          ]
        );

      const normalizados =
        lista.map(
          topic => ({

            ...topic,

            id:
              topic?.id ||
              topic?.topicId ||
              "",

            nombre:
              topic?.nombre ||
              topic?.name ||
              topic?.title ||
              "Topic sin nombre"

          })
        );

      setTopics(
        normalizados
      );

    }

    catch (err) {

      debugError(
        "FALLÓ CARGAR TOPICS",
        err
      );

      setTopics([]);

      setError(
        `ERROR AL CARGAR TOPICS: ${
          err?.message ||
          "Error desconocido"
        }`
      );

    }

    finally {

      setLoadingTopics(false);

      console.groupEnd();

    }

  }


  // ==========================================================
  // ALUMNOS
  // ==========================================================

  async function cargarAlumnos(courseId) {

    console.group(
      "%c[3] CARGANDO ALUMNOS",
      "color:#0891b2;font-weight:bold"
    );

    try {

      setLoadingAlumnos(true);
      setError("");

      const respuesta =
        await classroomObtenerAlumnos(
          courseId
        );

      console.log(
        "RESPUESTA REAL ALUMNOS:",
        respuesta
      );

      setDebugInfo(prev => ({
        ...prev,
        alumnos: respuesta
      }));

      const lista =
        extraerLista(
          respuesta,
          [
            "estudiantes",
            "alumnos",
            "students"
          ]
        );

      const normalizados =
        lista.map(
          normalizarAlumno
        );

      console.table(
        normalizados
      );

      setAlumnos(
        normalizados
      );

      if (
        normalizados.length === 0
      ) {

        setError(
          "Classroom no devolvió alumnos para este curso."
        );

      }

    }

    catch (err) {

      debugError(
        "FALLÓ CARGAR ALUMNOS",
        err
      );

      setAlumnos([]);

      setError(
        `ERROR AL CARGAR ALUMNOS: ${
          err?.message ||
          "Error desconocido"
        }`
      );

    }

    finally {

      setLoadingAlumnos(false);

      console.groupEnd();

    }

  }


  // ==========================================================
  // RECARGAR ALUMNOS
  // ==========================================================

  async function recargarAlumnos() {

    if (!cursoSeleccionado) {
      return;
    }

    await cargarAlumnos(
      cursoSeleccionado
    );

  }


  // ==========================================================
  // CAMBIO TOPIC
  // ==========================================================

  async function handleTopicChange(event) {

    const topicId =
      event.target.value;

    setTopicSeleccionado(
      topicId
    );

    setEntregables([]);

    setError("");

    if (!topicId) {

      setTopicActual(null);

      return;

    }

    const topic =
      topics.find(
        item =>
          String(item?.id) ===
          String(topicId)
      );

    setTopicActual(
      topic || null
    );

    if (!cursoSeleccionado) {
      return;
    }

    await cargarEntregables(
      cursoSeleccionado,
      topic
    );

  }


  // ==========================================================
  // CARGAR ENTREGABLES
  // ==========================================================

  async function cargarEntregables(
    courseId,
    topic
  ) {

    console.group(
      "%c[4] CARGANDO EN1 EN2 EN3",
      "color:#ea580c;font-weight:bold"
    );

    try {

      setLoadingEntregables(true);

      const respuesta =
        await classroomObtenerActividades(
          courseId
        );

      console.log(
        "RESPUESTA COMPLETA ACTIVIDADES:",
        respuesta
      );

      setDebugInfo(prev => ({
        ...prev,
        actividades: respuesta
      }));

      const actividades =
        extraerLista(
          respuesta,
          [
            "actividades",
            "courseWork",
            "coursework"
          ]
        );

      console.log(
        "TOTAL ACTIVIDADES:",
        actividades.length
      );

      console.table(
        actividades
      );

      const topicId =
        String(
          topic?.id ||
          topic?.topicId ||
          ""
        );

      let actividadesTopic =
        actividades;

      if (topicId) {

        const filtradas =
          actividades.filter(
            actividad => {

              const idTema =
                String(
                  actividad?.topicId ||
                  actividad?.topic?.id ||
                  ""
                );

              return (
                idTema === topicId
              );

            }
          );

        if (
          filtradas.length > 0
        ) {

          actividadesTopic =
            filtradas;

        }

      }


      // ======================================================
      // DETECTAR EN1 EN2 EN3
      // ======================================================

      const encontrados =
        actividadesTopic
          .filter(
            actividad => {

              const titulo =
                String(
                  actividad?.titulo ||
                  actividad?.title ||
                  actividad?.nombre ||
                  ""
                );

              const descripcion =
                String(
                  actividad?.descripcion ||
                  actividad?.description ||
                  ""
                );

              const backend =
                String(
                  actividad?.entregable ||
                  actividad?.entregableIdentificado ||
                  actividad?.en ||
                  actividad?.codigo ||
                  ""
                )
                  .toUpperCase()
                  .trim();

              const texto =
                (
                  titulo +
                  " " +
                  descripcion +
                  " " +
                  backend
                )
                  .toUpperCase();

              return (

                backend === "EN1" ||
                backend === "EN2" ||
                backend === "EN3" ||

                texto.includes("EN1") ||
                texto.includes("EN01") ||

                texto.includes("EN2") ||
                texto.includes("EN02") ||

                texto.includes("EN3") ||
                texto.includes("EN03") ||

                texto.includes(
                  "ENTREGABLE 1"
                ) ||

                texto.includes(
                  "ENTREGABLE 2"
                ) ||

                texto.includes(
                  "ENTREGABLE 3"
                )

              );

            }
          )
          .map(
            actividad => {

              const titulo =
                String(
                  actividad?.titulo ||
                  actividad?.title ||
                  actividad?.nombre ||
                  "Sin título"
                );

              const backend =
                String(
                  actividad?.entregable ||
                  actividad?.entregableIdentificado ||
                  actividad?.en ||
                  actividad?.codigo ||
                  ""
                )
                  .toUpperCase()
                  .trim();

              let numero = "";

              if (
                backend === "EN1" ||
                /(?:^|[^A-Z0-9])EN0?1(?:$|[^A-Z0-9])/i
                  .test(titulo) ||
                /ENTREGABLE\s*0?1/i
                  .test(titulo) ||
                /EN01/i.test(titulo)
              ) {

                numero = "EN1";

              }

              else if (
                backend === "EN2" ||
                /(?:^|[^A-Z0-9])EN0?2(?:$|[^A-Z0-9])/i
                  .test(titulo) ||
                /ENTREGABLE\s*0?2/i
                  .test(titulo) ||
                /EN02/i.test(titulo)
              ) {

                numero = "EN2";

              }

              else if (
                backend === "EN3" ||
                /(?:^|[^A-Z0-9])EN0?3(?:$|[^A-Z0-9])/i
                  .test(titulo) ||
                /ENTREGABLE\s*0?3/i
                  .test(titulo) ||
                /EN03/i.test(titulo)
              ) {

                numero = "EN3";

              }

              const puntaje =
                obtenerPuntaje(
                  actividad
                );

              const maximo =
                obtenerPuntajeMaximo(
                  actividad
                );

              const estado =
                obtenerEstadoEntrega(
                  actividad
                );

              console.log(
                `[${numero}] ${titulo}`,
                {
                  actividad,
                  puntaje,
                  maximo,
                  estado
                }
              );

              return {

                ...actividad,

                numero,

                courseWorkId:
                  actividad?.courseWorkId ||
                  actividad?.id ||
                  "",

                titulo,

                topicId:
                  actividad?.topicId ||
                  "",

                puntaje,

                maximo,

                estado

              };

            }
          );


      encontrados.sort(
        (a, b) => {

          const orden = {
            EN1: 1,
            EN2: 2,
            EN3: 3
          };

          return (
            (orden[a.numero] || 99) -
            (orden[b.numero] || 99)
          );

        }
      );

      console.log(
        "========================================"
      );

      console.log(
        "EN1 EN2 EN3 DETECTADOS:"
      );

      console.table(
        encontrados.map(item => ({
          numero: item.numero,
          titulo: item.titulo,
          puntaje: item.puntaje,
          maximo: item.maximo,
          estado: item.estado,
          courseWorkId: item.courseWorkId
        }))
      );

      console.log(
        "========================================"
      );

      setEntregables(
        encontrados
      );

    }

    catch (err) {

      debugError(
        "FALLÓ CARGAR ACTIVIDADES",
        err
      );

      setEntregables([]);

      setError(
        `ERROR AL CARGAR ACTIVIDADES: ${
          err?.message ||
          "Error desconocido"
        }`
      );

    }

    finally {

      setLoadingEntregables(false);

      console.groupEnd();

    }

  }


  // ==========================================================
  // FILTRO ALUMNOS
  // ==========================================================

  const alumnosFiltrados =
    useMemo(
      () => {

        const texto =
          busquedaAlumno
            .trim()
            .toLowerCase();

        if (!texto) {
          return alumnos;
        }

        return alumnos.filter(
          alumno => {

            const nombre =
              String(
                alumno?.nombre ||
                alumno?.nombreCompleto ||
                ""
              )
                .toLowerCase();

            const email =
              String(
                alumno?.email ||
                ""
              )
                .toLowerCase();

            const id =
              String(
                alumno?.userId ||
                alumno?.id ||
                ""
              )
                .toLowerCase();

            return (
              nombre.includes(texto) ||
              email.includes(texto) ||
              id.includes(texto)
            );

          }
        );

      },
      [
        alumnos,
        busquedaAlumno
      ]
    );


  // ==========================================================
  // CURSOS ORDENADOS
  // ==========================================================

  const cursosOrdenados =
    useMemo(
      () => {

        return [...cursos].sort(
          (a, b) =>
            String(
              a?.nombre ||
              a?.name ||
              ""
            ).localeCompare(
              String(
                b?.nombre ||
                b?.name ||
                ""
              ),
              "es",
              {
                numeric: true
              }
            )
        );

      },
      [cursos]
    );


  // ==========================================================
  // RESUMEN
  // ==========================================================

  const resumenEntregables =
    useMemo(
      () => {

        const en1 =
          entregables.find(
            item =>
              item.numero === "EN1"
          );

        const en2 =
          entregables.find(
            item =>
              item.numero === "EN2"
          );

        const en3 =
          entregables.find(
            item =>
              item.numero === "EN3"
          );

        const puntajes = [
          en1?.puntaje,
          en2?.puntaje,
          en3?.puntaje
        ];

        const puntajesValidos =
          puntajes.filter(
            valor =>
              valor !== null &&
              valor !== undefined &&
              !Number.isNaN(Number(valor))
          );

        const total =
          puntajesValidos.reduce(
            (acumulado, valor) =>
              acumulado + Number(valor),
            0
          );

        const maximos = [
          en1?.maximo,
          en2?.maximo,
          en3?.maximo
        ];

        const maximosValidos =
          maximos.filter(
            valor =>
              valor !== null &&
              valor !== undefined &&
              !Number.isNaN(Number(valor))
          );

        const totalMaximo =
          maximosValidos.reduce(
            (acumulado, valor) =>
              acumulado + Number(valor),
            0
          );

        return {
          en1,
          en2,
          en3,
          total,
          totalMaximo,
          cantidadValidos:
            puntajesValidos.length
        };

      },
      [entregables]
    );


  // ==========================================================
  // LIMPIAR
  // ==========================================================

  function limpiar() {

    setCursoSeleccionado("");

    setCursoActual(null);

    setTopicSeleccionado("");

    setTopicActual(null);

    setTopics([]);

    setEntregables([]);

    setAlumnos([]);

    setBusquedaAlumno("");

    setError("");

  }


  // ==========================================================
  // INICIALES
  // ==========================================================

  function obtenerIniciales(nombre) {

    const partes =
      String(
        nombre || "Alumno"
      )
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (
      partes.length === 1
    ) {

      return partes[0]
        .substring(0, 2)
        .toUpperCase();

    }

    return (
      partes[0].charAt(0) +
      partes[1].charAt(0)
    ).toUpperCase();

  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,.14), transparent 28%), radial-gradient(circle at top right, rgba(99,102,241,.12), transparent 26%), linear-gradient(135deg,#f8fafc 0%,#eef2ff 48%,#f8fafc 100%)",
        padding: "28px 18px 50px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#172033"
      }}
    >

      <div
        style={{
          maxWidth: "1220px",
          margin: "0 auto"
        }}
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg,#0f172a 0%,#172554 42%,#2563eb 100%)",
            color: "#fff",
            borderRadius: "24px",
            padding: "28px 30px",
            marginBottom: "18px",
            boxShadow:
              "0 20px 50px rgba(37,99,235,.20)"
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,.07)",
              right: "-70px",
              top: "-100px"
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background:
                "rgba(96,165,250,.10)",
              right: "120px",
              bottom: "-100px"
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px"
              }}
            >

              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  background:
                    "rgba(255,255,255,.14)",
                  border:
                    "1px solid rgba(255,255,255,.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "27px",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,.12)"
                }}
              >
                📚
              </div>

              <div>

                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    letterSpacing: "-.03em"
                  }}
                >
                  Calificar entregables
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    color: "#dbeafe",
                    fontSize: "13px",
                    fontWeight: 500
                  }}
                >
                  Google Classroom · Experiencias Formativas
                </div>

              </div>

            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "20px"
              }}
            >

              <HeaderBadge>
                🎓 Experiencias
              </HeaderBadge>

              <HeaderBadge>
                📂 Topics
              </HeaderBadge>

              <HeaderBadge>
                📋 EN1 · EN2 · EN3
              </HeaderBadge>

              <HeaderBadge>
                👥 Estudiantes
              </HeaderBadge>

            </div>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div
            style={{
              background:
                "linear-gradient(135deg,#fff1f2,#fff7f7)",
              border:
                "1px solid #fecdd3",
              color: "#9f1239",
              padding: "15px 17px",
              borderRadius: "15px",
              marginBottom: "18px",
              fontSize: "13px",
              boxShadow:
                "0 8px 25px rgba(190,24,93,.06)"
            }}
          >

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start"
              }}
            >

              <span
                style={{
                  fontSize: "18px"
                }}
              >
                ⚠️
              </span>

              <div>

                <strong>
                  {error}
                </strong>

                <div
                  style={{
                    marginTop: "5px",
                    opacity: .8,
                    fontSize: "11px"
                  }}
                >
                  Revisa F12 → Console para ver la
                  respuesta real del servicio.
                </div>

              </div>

            </div>

          </div>

        )}


        {/* ==================================================
            DIAGNÓSTICO
        ================================================== */}

        <section
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#172554)",
            color: "#e2e8f0",
            borderRadius: "18px",
            padding: "17px",
            marginBottom: "18px",
            boxShadow:
              "0 12px 30px rgba(15,23,42,.13)",
            border:
              "1px solid rgba(255,255,255,.06)"
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px"
            }}
          >

            <div
              style={{
                fontSize: "14px",
                fontWeight: 900
              }}
            >
              🛠️ Diagnóstico de Classroom
            </div>

            <div
              style={{
                fontSize: "10px",
                color: "#94a3b8"
              }}
            >
              Estado del servicio
            </div>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4,minmax(0,1fr))",
              gap: "9px"
            }}
          >

            <DebugStatus
              nombre="Cursos"
              cargando={loadingCursos}
              cantidad={cursos.length}
            />

            <DebugStatus
              nombre="Topics"
              cargando={loadingTopics}
              cantidad={topics.length}
            />

            <DebugStatus
              nombre="Actividades"
              cargando={loadingEntregables}
              cantidad={entregables.length}
            />

            <DebugStatus
              nombre="Alumnos"
              cargando={loadingAlumnos}
              cantidad={alumnos.length}
            />

          </div>

        </section>


        {/* ==================================================
            SELECTORES
        ================================================== */}

        <section
          style={{
            ...cardStyle,
            padding: "21px"
          }}
        >

          <SectionHeading
            icon="🎯"
            title="Selección"
            subtitle="Selecciona la experiencia y el topic que deseas revisar."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0,1.4fr) minmax(0,1fr)",
              gap: "15px"
            }}
          >

            <div>

              <label
                style={labelStyle}
              >
                🎓 Experiencia Formativa
              </label>

              <select
                value={cursoSeleccionado}
                onChange={handleCursoChange}
                disabled={loadingCursos}
                style={selectStyle}
              >

                <option value="">
                  {loadingCursos
                    ? "⏳ Cargando experiencias..."
                    : "Seleccionar Experiencia Formativa"}
                </option>

                {cursosOrdenados.map(
                  curso => (

                    <option
                      key={curso.id}
                      value={curso.id}
                    >

                      {curso.nombre ||
                        curso.name ||
                        "Curso sin nombre"}

                      {(
                        curso.seccion ||
                        curso.section
                      ) &&
                        ` — ${
                          curso.seccion ||
                          curso.section
                        }`}

                    </option>

                  )
                )}

              </select>

            </div>


            <div>

              <label
                style={labelStyle}
              >
                📂 Topic
              </label>

              <select
                value={topicSeleccionado}
                onChange={handleTopicChange}
                disabled={
                  !cursoActual ||
                  loadingTopics
                }
                style={selectStyle}
              >

                <option value="">
                  {!cursoActual
                    ? "Primero selecciona una experiencia"
                    : loadingTopics
                      ? "⏳ Cargando Topics..."
                      : "Seleccionar Topic"}
                </option>

                {topics.map(
                  topic => (

                    <option
                      key={topic.id}
                      value={topic.id}
                    >
                      {topic.nombre}
                    </option>

                  )
                )}

              </select>

            </div>

          </div>


          {(cursoActual || topicActual) && (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "10px",
                marginTop: "14px"
              }}
            >

              {cursoActual && (

                <div
                  style={infoMiniStyle}
                >

                  <div
                    style={infoIconStyle}
                  >
                    🎓
                  </div>

                  <div
                    style={{
                      minWidth: 0
                    }}
                  >

                    <div
                      style={{
                        fontWeight: 850,
                        color: "#1e3a8a",
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {cursoActual.nombre ||
                        cursoActual.name}
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#64748b",
                        marginTop: "3px"
                      }}
                    >
                      Course ID:{" "}
                      {cursoActual.id}
                    </div>

                  </div>

                </div>

              )}


              {topicActual && (

                <div
                  style={infoMiniStyle}
                >

                  <div
                    style={infoIconStyle}
                  >
                    📂
                  </div>

                  <div
                    style={{
                      minWidth: 0
                    }}
                  >

                    <div
                      style={{
                        fontWeight: 850,
                        color: "#1e3a8a",
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {topicActual.nombre}
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#64748b",
                        marginTop: "3px"
                      }}
                    >
                      Topic ID:{" "}
                      {topicActual.id}
                    </div>

                  </div>

                </div>

              )}

            </div>

          )}

        </section>


        {/* ==================================================
            ENTREGABLES CON PUNTAJES
        ================================================== */}

        {topicActual && (

          <section
            style={cardStyle}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
                flexWrap: "wrap"
              }}
            >

              <div>

                <h2
                  style={titleStyle}
                >
                  📋 Entregables y puntajes
                </h2>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "11px",
                    marginTop: "4px"
                  }}
                >
                  Actividades detectadas dentro del Topic seleccionado
                </div>

              </div>

              {entregables.length > 0 && (

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    background:
                      "linear-gradient(135deg,#eff6ff,#dbeafe)",
                    color: "#1d4ed8",
                    padding: "7px 12px",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: 900,
                    border:
                      "1px solid #bfdbfe"
                  }}
                >
                  <span>
                    📋
                  </span>

                  {entregables.length} actividades
                </div>

              )}

            </div>


            {loadingEntregables && (

              <Loading>
                ⏳ Cargando actividades y puntajes...
              </Loading>

            )}


            {!loadingEntregables &&
              entregables.length === 0 && (

                <Empty>
                  <div
                    style={{
                      fontSize: "24px",
                      marginBottom: "6px"
                    }}
                  >
                    📭
                  </div>

                  No se encontraron EN1, EN2 o EN3.
                </Empty>

              )}


            {!loadingEntregables &&
              entregables.length > 0 && (

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(300px,1fr))",
                    gap: "13px"
                  }}
                >

                  {entregables.map(
                    (item, index) => {

                      const colores =
                        colorPuntaje(
                          item.puntaje,
                          item.maximo
                        );

                      return (

                        <div
                          key={
                            item.courseWorkId ||
                            item.id ||
                            index
                          }
                          style={{
                            border:
                              "1px solid #e2e8f0",
                            borderRadius: "17px",
                            padding: "16px",
                            background:
                              "linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)",
                            boxShadow:
                              "0 8px 24px rgba(15,23,42,.055)",
                            transition:
                              "transform .2s ease, box-shadow .2s ease"
                          }}
                        >

                          {/* CABECERA */}

                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              alignItems:
                                "flex-start",
                              gap: "12px"
                            }}
                          >

                            <div
                              style={{
                                display: "flex",
                                alignItems:
                                  "center",
                                gap: "10px",
                                minWidth: 0
                              }}
                            >

                              <div
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  minWidth: "50px",
                                  borderRadius:
                                    "14px",
                                  background:
                                    "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                                  color: "#1d4ed8",
                                  display: "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                  fontWeight: 950,
                                  fontSize: "16px",
                                  boxShadow:
                                    "0 6px 15px rgba(37,99,235,.12)"
                                }}
                              >
                                {item.numero}
                              </div>

                              <div
                                style={{
                                  minWidth: 0
                                }}
                              >

                                <div
                                  style={{
                                    fontSize: "9px",
                                    color: "#64748b",
                                    textTransform:
                                      "uppercase",
                                    letterSpacing:
                                      ".07em",
                                    fontWeight: 800
                                  }}
                                >
                                  Entregable
                                </div>

                                <div
                                  style={{
                                    marginTop: "2px",
                                    fontWeight: 850,
                                    color: "#0f172a",
                                    fontSize: "13px",
                                    lineHeight: 1.35,
                                    wordBreak:
                                      "break-word"
                                  }}
                                >
                                  {item.titulo}
                                </div>

                              </div>

                            </div>


                            {/* PUNTAJE */}

                            <div
                              style={{
                                background:
                                  colores.background,
                                color:
                                  colores.color,
                                border:
                                  `1px solid ${colores.border}`,
                                borderRadius:
                                  "13px",
                                padding:
                                  "8px 11px",
                                textAlign:
                                  "center",
                                minWidth:
                                  "70px",
                                boxShadow:
                                  "0 4px 10px rgba(15,23,42,.04)"
                              }}
                            >

                              <div
                                style={{
                                  fontSize: "8px",
                                  fontWeight: 800,
                                  letterSpacing:
                                    ".05em"
                                }}
                              >
                                PUNTAJE
                              </div>

                              <div
                                style={{
                                  fontSize: "21px",
                                  fontWeight: 950,
                                  lineHeight: 1.2,
                                  marginTop: "2px"
                                }}
                              >
                                {formatearPuntaje(
                                  item.puntaje
                                )}
                              </div>

                              {item.maximo !== null &&
                                item.maximo !== undefined && (

                                  <div
                                    style={{
                                      fontSize: "9px",
                                      fontWeight: 800
                                    }}
                                  >
                                    /{" "}
                                    {formatearPuntaje(
                                      item.maximo
                                    )}
                                  </div>

                                )}

                            </div>

                          </div>


                          {/* INFORMACIÓN */}

                          <div
                            style={{
                              marginTop: "14px",
                              display: "grid",
                              gridTemplateColumns:
                                "1fr 1fr",
                              gap: "8px"
                            }}
                          >

                            <InfoBox
                              label="Estado"
                              value={
                                item.estado ||
                                "Sin información"
                              }
                            />

                            <InfoBox
                              label="ID"
                              value={
                                item.courseWorkId ||
                                item.id ||
                                "—"
                              }
                            />

                          </div>


                          {/* AVISO SI NO HAY PUNTAJE */}

                          {(
                            item.puntaje === null ||
                            item.puntaje === undefined
                          ) && (

                            <div
                              style={{
                                marginTop: "10px",
                                padding: "9px 10px",
                                background:
                                  "#fff7ed",
                                border:
                                  "1px solid #fed7aa",
                                color:
                                  "#9a3412",
                                borderRadius:
                                  "10px",
                                fontSize: "10px",
                                lineHeight: 1.4
                              }}
                            >
                              ⚠️ La actividad fue encontrada,
                              pero la respuesta no contiene
                              un puntaje.
                            </div>

                          )}

                        </div>

                      );

                    }
                  )}

                </div>

              )}

          </section>

        )}


        {/* ==================================================
            RESUMEN EN1 EN2 EN3
        ================================================== */}

        {topicActual &&
          entregables.length > 0 && (

            <section
              style={{
                ...cardStyle,
                background:
                  "linear-gradient(135deg,#ffffff 0%,#f8fbff 100%)"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  flexWrap: "wrap"
                }}
              >

                <div>

                  <h2
                    style={titleStyle}
                  >
                    📊 Resumen de calificaciones
                  </h2>

                  <div
                    style={{
                      marginTop: "4px",
                      color: "#64748b",
                      fontSize: "11px"
                    }}
                  >
                    Resumen individual y total de EN1, EN2 y EN3
                  </div>

                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg,#eff6ff,#dbeafe)",
                    border:
                      "1px solid #bfdbfe",
                    color: "#1d4ed8",
                    borderRadius: "11px",
                    padding: "7px 11px",
                    fontSize: "11px",
                    fontWeight: 850
                  }}
                >
                  {resumenEntregables.cantidadValidos}/3 registrados
                </div>

              </div>


              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,minmax(0,1fr))",
                  gap: "10px",
                  marginTop: "15px"
                }}
              >

                {["EN1", "EN2", "EN3"].map(
                  numero => {

                    const item =
                      entregables.find(
                        x =>
                          x.numero === numero
                      );

                    const puntaje =
                      item?.puntaje ??
                      null;

                    const maximo =
                      item?.maximo ??
                      null;

                    const colores =
                      colorPuntaje(
                        puntaje,
                        maximo
                      );

                    return (

                      <div
                        key={numero}
                        style={{
                          border:
                            "1px solid #e2e8f0",
                          borderRadius: "14px",
                          padding: "14px",
                          background:
                            "#fff",
                          textAlign:
                            "center",
                          boxShadow:
                            "0 5px 16px rgba(15,23,42,.045)"
                        }}
                      >

                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent:
                              "center",
                            minWidth: "42px",
                            height: "28px",
                            padding:
                              "0 9px",
                            borderRadius:
                              "9px",
                            background:
                              "#eff6ff",
                            color:
                              "#2563eb",
                            fontWeight: 950,
                            fontSize: "14px"
                          }}
                        >
                          {numero}
                        </div>

                        <div
                          style={{
                            marginTop: "10px",
                            display:
                              "inline-flex",
                            alignItems:
                              "baseline",
                            gap: "3px",
                            background:
                              colores.background,
                            color:
                              colores.color,
                            border:
                              `1px solid ${colores.border}`,
                            padding:
                              "8px 14px",
                            borderRadius:
                              "11px"
                          }}
                        >

                          <span
                            style={{
                              fontSize: "22px",
                              fontWeight: 950
                            }}
                          >
                            {formatearPuntaje(
                              puntaje
                            )}
                          </span>

                          {maximo !== null && (

                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 800
                              }}
                            >
                              /{formatearPuntaje(
                                maximo
                              )}
                            </span>

                          )}

                        </div>

                        <div
                          style={{
                            marginTop: "7px",
                            color: "#64748b",
                            fontSize: "9px",
                            minHeight: "26px",
                            lineHeight: 1.35
                          }}
                        >
                          {item?.titulo ||
                            "No encontrado"}
                        </div>

                      </div>

                    );

                  }
                )}

              </div>


              {/* ==================================================
                  TOTAL EN1 + EN2 + EN3
              ================================================== */}

              <div
                style={{
                  marginTop: "13px",
                  padding: "17px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)",
                  color: "#fff",
                  boxShadow:
                    "0 12px 25px rgba(30,58,138,.16)"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    gap: "12px",
                    flexWrap: "wrap"
                  }}
                >

                  <div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#bfdbfe",
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          ".08em",
                        fontWeight: 800
                      }}
                    >
                      Total acumulado
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "12px",
                        color: "#e2e8f0"
                      }}
                    >
                      EN1 + EN2 + EN3
                    </div>

                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "baseline",
                      gap: "5px"
                    }}
                  >

                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 950,
                        letterSpacing:
                          "-.04em"
                      }}
                    >
                      {formatearPuntaje(
                        resumenEntregables.total
                      )}
                    </span>

                    {resumenEntregables.totalMaximo > 0 && (

                      <span
                        style={{
                          fontSize: "13px",
                          color: "#bfdbfe",
                          fontWeight: 800
                        }}
                      >
                        /
                        {formatearPuntaje(
                          resumenEntregables.totalMaximo
                        )}
                      </span>

                    )}

                  </div>

                </div>

              </div>

            </section>

          )}


        {/* ==================================================
            ALUMNOS
        ================================================== */}

        {cursoActual && (

          <section
            style={cardStyle}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >

              <div>

                <h2
                  style={{
                    ...titleStyle,
                    marginBottom: "3px"
                  }}
                >
                  👥 Estudiantes
                </h2>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "11px"
                  }}
                >
                  Alumnos matriculados en Classroom
                </div>

              </div>


              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center"
                }}
              >

                <div
                  style={{
                    background:
                      alumnos.length > 0
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      alumnos.length > 0
                        ? "#166534"
                        : "#991b1b",
                    padding: "8px 13px",
                    borderRadius: "10px",
                    fontWeight: 900,
                    fontSize: "13px",
                    border:
                      alumnos.length > 0
                        ? "1px solid #bbf7d0"
                        : "1px solid #fecaca"
                  }}
                >

                  {loadingAlumnos
                    ? "⏳"
                    : alumnos.length}

                </div>


                <button
                  type="button"
                  onClick={recargarAlumnos}
                  disabled={loadingAlumnos}
                  style={{
                    ...primaryButtonStyle,
                    opacity:
                      loadingAlumnos
                        ? .6
                        : 1,
                    cursor:
                      loadingAlumnos
                        ? "not-allowed"
                        : "pointer"
                  }}
                >

                  {loadingAlumnos
                    ? "Cargando..."
                    : "↻ Recargar"}

                </button>

              </div>

            </div>


            {/* BUSCADOR */}

            {!loadingAlumnos &&
              alumnos.length > 0 && (

                <div
                  style={{
                    position: "relative",
                    marginTop: "15px"
                  }}
                >

                  <span
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      fontSize: "14px",
                      pointerEvents:
                        "none"
                    }}
                  >
                    🔎
                  </span>

                  <input
                    value={busquedaAlumno}
                    onChange={e =>
                      setBusquedaAlumno(
                        e.target.value
                      )
                    }
                    placeholder="Buscar estudiante por nombre, correo o ID..."
                    style={{
                      ...selectStyle,
                      paddingLeft: "38px"
                    }}
                  />

                </div>

              )}


            {/* LOADING */}

            {loadingAlumnos && (

              <Loading>
                ⏳ Consultando estudiantes de Classroom...
              </Loading>

            )}


            {/* SIN ALUMNOS */}

            {!loadingAlumnos &&
              alumnos.length === 0 && (

                <Empty>

                  <div
                    style={{
                      fontSize: "24px"
                    }}
                  >
                    👥
                  </div>

                  <div
                    style={{
                      marginTop: "5px"
                    }}
                  >
                    No se encontraron estudiantes.
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "11px"
                    }}
                  >
                    Course ID consultado:
                    <br />

                    <b
                      style={{
                        color: "#334155"
                      }}
                    >
                      {cursoSeleccionado}
                    </b>
                  </div>

                  <button
                    type="button"
                    onClick={recargarAlumnos}
                    style={{
                      ...primaryButtonStyle,
                      marginTop: "13px"
                    }}
                  >
                    🔄 Intentar nuevamente
                  </button>

                </Empty>

              )}


            {/* CONTADOR */}

            {alumnos.length > 0 && (

              <div
                style={{
                  marginTop: "13px",
                  marginBottom: "8px",
                  color: "#64748b",
                  fontSize: "11px"
                }}
              >

                Mostrando{" "}

                <b
                  style={{
                    color: "#1e293b"
                  }}
                >
                  {alumnosFiltrados.length}
                </b>{" "}

                de{" "}

                <b
                  style={{
                    color: "#1e293b"
                  }}
                >
                  {alumnos.length}
                </b>{" "}

                estudiantes.

              </div>

            )}


            {/* LISTA */}

            <div
              style={{
                marginTop: "10px",
                display: "grid",
                gap: "8px"
              }}
            >

              {alumnosFiltrados.map(
                (alumno, index) => {

                  const nombre =
                    alumno?.nombre ||
                    alumno?.nombreCompleto ||
                    "Alumno";

                  return (

                    <div
                      key={
                        alumno.userId ||
                        alumno.id ||
                        index
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "11px",
                        padding: "10px 12px",
                        border:
                          "1px solid #e2e8f0",
                        borderRadius: "13px",
                        background:
                          "linear-gradient(135deg,#fff,#f8fafc)",
                        boxShadow:
                          "0 4px 12px rgba(15,23,42,.035)"
                      }}
                    >

                      {alumno.photoUrl ? (

                        <img
                          src={alumno.photoUrl}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border:
                              "2px solid #dbeafe"
                          }}
                        />

                      ) : (

                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                            color: "#1d4ed8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                              "center",
                            fontWeight: 900,
                            fontSize: "12px",
                            border:
                              "2px solid #eff6ff"
                          }}
                        >
                          {obtenerIniciales(
                            nombre
                          )}
                        </div>

                      )}


                      <div
                        style={{
                          minWidth: 0,
                          flex: 1
                        }}
                      >

                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: "12px",
                            overflow: "hidden",
                            textOverflow:
                              "ellipsis",
                            whiteSpace:
                              "nowrap",
                            color: "#1e293b"
                          }}
                        >
                          {nombre}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "9px",
                            flexWrap: "wrap",
                            marginTop: "3px"
                          }}
                        >

                          {alumno.email && (

                            <span
                              style={{
                                color: "#64748b",
                                fontSize: "9px"
                              }}
                            >
                              ✉️ {alumno.email}
                            </span>

                          )}

                          {alumno.userId && (

                            <span
                              style={{
                                color: "#94a3b8",
                                fontSize: "9px"
                              }}
                            >
                              ID: {alumno.userId}
                            </span>

                          )}

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>


            {!loadingAlumnos &&
              alumnos.length > 0 &&
              alumnosFiltrados.length === 0 && (

                <Empty>
                  No hay estudiantes que coincidan
                  con "{busquedaAlumno}".
                </Empty>

              )}

          </section>

        )}


        {/* ==================================================
            DEBUG ACTIVIDADES
        ================================================== */}

        {cursoActual && (

          <details
            style={{
              background:
                "linear-gradient(135deg,#0f172a,#111827)",
              color: "#e2e8f0",
              borderRadius: "15px",
              padding: "14px",
              marginBottom: "14px",
              border:
                "1px solid #1e293b"
            }}
          >

            <summary
              style={{
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "11px",
                color: "#cbd5e1"
              }}
            >
              🔍 Ver respuesta REAL de actividades
              y puntajes
            </summary>

            <pre
              style={{
                marginTop: "12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: "9px",
                lineHeight: 1.5,
                color: "#cbd5e1",
                maxHeight: "500px",
                overflow: "auto",
                background:
                  "#020617",
                padding: "12px",
                borderRadius: "10px"
              }}
            >
              {JSON.stringify(
                debugInfo.actividades,
                null,
                2
              )}
            </pre>

          </details>

        )}


        {/* ==================================================
            DEBUG ALUMNOS
        ================================================== */}

        {cursoActual && (

          <details
            style={{
              background:
                "linear-gradient(135deg,#0f172a,#111827)",
              color: "#e2e8f0",
              borderRadius: "15px",
              padding: "14px",
              marginBottom: "15px",
              border:
                "1px solid #1e293b"
            }}
          >

            <summary
              style={{
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "11px",
                color: "#cbd5e1"
              }}
            >
              🔍 Ver respuesta real de alumnos
            </summary>

            <pre
              style={{
                marginTop: "12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: "9px",
                lineHeight: 1.5,
                color: "#cbd5e1",
                maxHeight: "500px",
                overflow: "auto",
                background:
                  "#020617",
                padding: "12px",
                borderRadius: "10px"
              }}
            >
              {JSON.stringify(
                debugInfo.alumnos,
                null,
                2
              )}
            </pre>

          </details>

        )}


        {/* ==================================================
            LIMPIAR
        ================================================== */}

        {(cursoSeleccionado ||
          topicSeleccionado) && (

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px"
            }}
          >

            <button
              type="button"
              onClick={limpiar}
              style={{
                border:
                  "1px solid #cbd5e1",
                background:
                  "#fff",
                color: "#334155",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "11px",
                boxShadow:
                  "0 4px 12px rgba(15,23,42,.05)"
              }}
            >
              ↻ Limpiar selección
            </button>

          </div>

        )}

      </div>

    </div>

  );

}


// ============================================================
// HEADER BADGE
// ============================================================

function HeaderBadge({
  children
}) {

  return (

    <div
      style={{
        background:
          "rgba(255,255,255,.10)",
        border:
          "1px solid rgba(255,255,255,.15)",
        color: "#dbeafe",
        padding: "6px 9px",
        borderRadius: "9px",
        fontSize: "9px",
        fontWeight: 800
      }}
    >
      {children}
    </div>

  );

}


// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
  icon,
  title,
  subtitle
}) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        marginBottom: "16px"
      }}
    >

      <div
        style={{
          width: "34px",
          height: "34px",
          minWidth: "34px",
          borderRadius: "10px",
          background:
            "linear-gradient(135deg,#eff6ff,#dbeafe)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px"
        }}
      >
        {icon}
      </div>

      <div>

        <div
          style={{
            fontSize: "15px",
            fontWeight: 900,
            color: "#0f172a"
          }}
        >
          {title}
        </div>

        {subtitle && (

          <div
            style={{
              marginTop: "3px",
              fontSize: "10px",
              color: "#64748b"
            }}
          >
            {subtitle}
          </div>

        )}

      </div>

    </div>

  );

}


// ============================================================
// INFO BOX
// ============================================================

function InfoBox({
  label,
  value
}) {

  return (

    <div
      style={{
        background:
          "#f8fafc",
        border:
          "1px solid #f1f5f9",
        borderRadius:
          "10px",
        padding:
          "8px 9px",
        minWidth: 0
      }}
    >

      <div
        style={{
          fontSize: "8px",
          color: "#94a3b8",
          textTransform:
            "uppercase",
          letterSpacing:
            ".06em",
          fontWeight: 800
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "3px",
          fontSize: "10px",
          fontWeight: 700,
          color: "#334155",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
        title={String(value)}
      >
        {value}
      </div>

    </div>

  );

}


// ============================================================
// DEBUG STATUS
// ============================================================

function DebugStatus({
  nombre,
  cargando,
  cantidad
}) {

  return (

    <div
      style={{
        background:
          "rgba(30,41,59,.85)",
        border:
          "1px solid #334155",
        borderRadius: "11px",
        padding: "10px 11px"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px"
        }}
      >

        <div
          style={{
            fontSize: "8px",
            color: "#94a3b8",
            textTransform:
              "uppercase",
            letterSpacing: ".05em",
            fontWeight: 800
          }}
        >
          {nombre}
        </div>

        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background:
              cargando
                ? "#f59e0b"
                : "#22c55e",
            boxShadow:
              cargando
                ? "0 0 0 3px rgba(245,158,11,.10)"
                : "0 0 0 3px rgba(34,197,94,.10)"
          }}
        />

      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "17px",
          fontWeight: 900
        }}
      >

        {cargando
          ? "⏳"
          : cantidad}

      </div>

    </div>

  );

}


// ============================================================
// ESTILOS
// ============================================================

const cardStyle = {

  background:
    "rgba(255,255,255,.96)",

  border:
    "1px solid #e2e8f0",

  borderRadius:
    "18px",

  padding:
    "20px",

  marginBottom:
    "16px",

  boxShadow:
    "0 8px 28px rgba(15,23,42,.055)",

  backdropFilter:
    "blur(8px)"

};


const titleStyle = {

  margin:
    "0",

  fontSize:
    "17px",

  fontWeight:
    900,

  color:
    "#0f172a",

  letterSpacing:
    "-.02em"

};


const labelStyle = {

  display:
    "block",

  marginBottom:
    "7px",

  fontSize:
    "11px",

  fontWeight:
    850,

  color:
    "#334155"

};


const selectStyle = {

  width:
    "100%",

  boxSizing:
    "border-box",

  padding:
    "12px 13px",

  border:
    "1px solid #cbd5e1",

  borderRadius:
    "11px",

  background:
    "#fff",

  fontSize:
    "12px",

  outline:
    "none",

  color:
    "#1e293b",

  boxShadow:
    "0 3px 10px rgba(15,23,42,.025)"

};


const infoMiniStyle = {

  display:
    "flex",

  alignItems:
    "center",

  gap:
    "9px",

  padding:
    "10px 11px",

  background:
    "linear-gradient(135deg,#eff6ff,#f8fbff)",

  border:
    "1px solid #bfdbfe",

  borderRadius:
    "11px",

  fontSize:
    "11px",

  minWidth:
    0

};


const infoIconStyle = {

  width:
    "32px",

  height:
    "32px",

  minWidth:
    "32px",

  borderRadius:
    "9px",

  background:
    "#fff",

  display:
    "flex",

  alignItems:
    "center",

  justifyContent:
    "center",

  boxShadow:
    "0 3px 9px rgba(37,99,235,.08)"

};


const primaryButtonStyle = {

  border:
    "none",

  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",

  color:
    "#fff",

  padding:
    "9px 12px",

  borderRadius:
    "10px",

  cursor:
    "pointer",

  fontWeight:
    800,

  fontSize:
    "11px",

  boxShadow:
    "0 5px 12px rgba(37,99,235,.18)"

};


// ============================================================
// LOADING
// ============================================================

function Loading({
  children
}) {

  return (

    <div
      style={{
        padding: "22px",
        marginTop: "12px",
        background:
          "linear-gradient(135deg,#f8fafc,#eff6ff)",
        border:
          "1px solid #e2e8f0",
        borderRadius: "12px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "12px",
        fontWeight: 600
      }}
    >
      {children}
    </div>

  );

}


// ============================================================
// EMPTY
// ============================================================

function Empty({
  children
}) {

  return (

    <div
      style={{
        padding: "20px",
        marginTop: "12px",
        background:
          "linear-gradient(135deg,#f8fafc,#fff)",
        border:
          "1px dashed #cbd5e1",
        borderRadius: "12px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "12px",
        lineHeight: 1.45
      }}
    >
      {children}
    </div>

  );

}