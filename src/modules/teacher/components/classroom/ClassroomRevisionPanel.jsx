
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  classroomObtenerCursos,
  classroomObtenerTemas,
  classroomObtenerActividades,
  classroomObtenerEntregas,
} from "../../services/classroomService.js";

import ClassroomSelector
  from "./ClassroomSelector.jsx";

import ClassroomTopics
  from "./ClassroomTopics.jsx";

import ClassroomDeliverables
  from "./ClassroomDeliverables.jsx";

import ClassroomStudents
  from "./ClassroomStudents.jsx";

import ClassroomStudentModal
  from "./ClassroomStudentModal.jsx";

import {
  reconocerEntregable,
  esRevisorInformes,
  obtenerCourseWorkId,
  obtenerTopicId,
  obtenerNombreTema,
  obtenerTitulo,
  obtenerInformacionEntrega,
} from "./classroomUtils.js";


// ============================================================
// CONFIGURACIÓN
// ============================================================

const ENTREGABLES_OBJETIVO = [
  "EN1",
  "EN2",
  "EN3",
];

const PUNTAJE_POR_ENTREGABLE = 2;


// ============================================================
// COLORES
// ============================================================

const COLORES = {
  fondo: "#f8fafc",
  tarjeta: "#ffffff",
  borde: "#e5e7eb",
  texto: "#111827",
  textoSecundario: "#6b7280",
  azul: "#2563eb",
  azulClaro: "#eff6ff",
  verde: "#16a34a",
  verdeClaro: "#f0fdf4",
  amarillo: "#d97706",
  amarilloClaro: "#fffbeb",
  rojo: "#dc2626",
  rojoClaro: "#fef2f2",
};



const REVISION_PANEL_STYLES = `
  .revision-panel {
    --rp-primary: #2563eb;
    --rp-primary-dark: #1d4ed8;
    --rp-text: #0f172a;
    --rp-muted: #64748b;
    --rp-border: #e2e8f0;
    --rp-surface: #ffffff;
    --rp-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    position: relative;
    width: 100%;
    color: var(--rp-text);
  }

  .revision-panel > * {
    animation: rpFadeUp .35s ease both;
  }

  .revision-panel > *:nth-child(2) { animation-delay: .03s; }
  .revision-panel > *:nth-child(3) { animation-delay: .06s; }
  .revision-panel > *:nth-child(4) { animation-delay: .09s; }
  .revision-panel > *:nth-child(5) { animation-delay: .12s; }

  .revision-panel [class*="rounded-2xl"] {
    transition:
      border-color .2s ease,
      box-shadow .2s ease,
      transform .2s ease,
      background-color .2s ease;
  }

  .revision-panel [class*="rounded-2xl"][class*="bg-white"] {
    box-shadow: var(--rp-shadow);
    border-color: rgba(226, 232, 240, .9);
  }

  .revision-panel [class*="rounded-2xl"][class*="bg-white"]:hover {
    border-color: #dbe5f1;
    box-shadow: 0 16px 36px rgba(15, 23, 42, .08);
  }

  .revision-panel button {
    -webkit-tap-highlight-color: transparent;
  }

  .revision-panel button:not(:disabled) {
    transition:
      transform .18s ease,
      box-shadow .18s ease,
      border-color .18s ease,
      background-color .18s ease,
      color .18s ease;
  }

  .revision-panel button:not(:disabled):hover {
    transform: translateY(-1px);
  }

  .revision-panel button:not(:disabled):active {
    transform: translateY(0);
  }

  .revision-panel button:focus-visible {
    outline: 3px solid rgba(37, 99, 235, .18);
    outline-offset: 2px;
  }

  .revision-panel .border-red-200 {
    box-shadow: 0 8px 24px rgba(220, 38, 38, .07);
  }

  .revision-panel .border-blue-100 {
    box-shadow: 0 8px 24px rgba(37, 99, 235, .06);
  }

  .revision-panel .border-dashed {
    background:
      linear-gradient(180deg, rgba(248,250,252,.7), #fff);
  }

  .revision-panel [class*="animate-spin"] {
    box-shadow: 0 0 0 5px rgba(37, 99, 235, .06);
  }

  .revision-panel .grid {
    width: 100%;
  }

  /* Tarjetas de estadísticas */
  .revision-panel .grid > div[class*="rounded-2xl"] {
    min-height: 112px;
    position: relative;
    overflow: hidden;
  }

  .revision-panel .grid > div[class*="rounded-2xl"]::after {
    content: "";
    position: absolute;
    width: 70px;
    height: 70px;
    right: -24px;
    bottom: -28px;
    border-radius: 999px;
    background: currentColor;
    opacity: .045;
    pointer-events: none;
  }

  /* Mejor lectura de títulos */
  .revision-panel h2,
  .revision-panel h3 {
    letter-spacing: -.02em;
  }

  .revision-panel p {
    line-height: 1.55;
  }

  /* Botón principal de cambio de experiencia */
  .revision-panel button[class*="border-slate-200"] {
    box-shadow: 0 3px 10px rgba(15, 23, 42, .04);
  }

  .revision-panel button[class*="border-slate-200"]:hover {
    border-color: #cbd5e1;
    box-shadow: 0 7px 18px rgba(15, 23, 42, .07);
  }

  /* Scrollbar elegante cuando algún componente hijo genera overflow */
  .revision-panel *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .revision-panel *::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 999px;
  }

  .revision-panel *::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
  }

  .revision-panel *::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .revision-panel {
      padding-bottom: 1rem;
    }

    .revision-panel [class*="rounded-2xl"] {
      border-radius: 1rem;
    }

    .revision-panel .grid > div[class*="rounded-2xl"] {
      min-height: 100px;
    }
  }

  @media (max-width: 640px) {
    .revision-panel {
      gap: 1rem;
    }

    .revision-panel .grid {
      gap: .65rem;
    }

    .revision-panel .grid > div[class*="rounded-2xl"] {
      min-height: 94px;
      padding: .85rem;
    }

    .revision-panel h2 {
      font-size: 1.05rem;
    }
  }

  @keyframes rpFadeUp {
    from {
      opacity: 0;
      transform: translateY(7px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .revision-panel > * {
      animation: none;
    }

    .revision-panel [class*="rounded-2xl"],
    .revision-panel button:not(:disabled) {
      transition: none;
    }
  }
`;


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function ClassroomRevisionPanel({
  resultados = [],
  user = null,
}) {

  // ==========================================================
  // CURSOS
  // ==========================================================

  const [
    cursos,
    setCursos,
  ] = useState([]);

  const [
    cursoSeleccionado,
    setCursoSeleccionado,
  ] = useState("");


  // ==========================================================
  // TEMAS
  // ==========================================================

  const [
    temas,
    setTemas,
  ] = useState([]);

  const [
    temaSeleccionado,
    setTemaSeleccionado,
  ] = useState(null);


  // ==========================================================
  // ACTIVIDADES
  // ==========================================================

  const [
    actividades,
    setActividades,
  ] = useState([]);


  // ==========================================================
  // ENTREGAS
  // ==========================================================

  const [
    entregas,
    setEntregas,
  ] = useState({
    EN1: [],
    EN2: [],
    EN3: [],
  });


  // ==========================================================
  // ESTUDIANTE SELECCIONADO
  // ==========================================================

  const [
    estudianteSeleccionado,
    setEstudianteSeleccionado,
  ] = useState(null);


  // ==========================================================
  // ENTREGABLE SELECCIONADO
  // ==========================================================

  const [
    tipoEntregableSeleccionado,
    setTipoEntregableSeleccionado,
  ] = useState("");


  // ==========================================================
  // ESTADOS DE CARGA
  // ==========================================================

  const [
    cargandoCursos,
    setCargandoCursos,
  ] = useState(false);

  const [
    cargandoTemas,
    setCargandoTemas,
  ] = useState(false);

  const [
    cargandoActividades,
    setCargandoActividades,
  ] = useState(false);

  const [
    cargandoEntregas,
    setCargandoEntregas,
  ] = useState(false);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [
    error,
    setError,
  ] = useState("");


  // ==========================================================
  // CARGAR CURSOS AL INICIAR
  // ==========================================================

  useEffect(() => {
    cargarCursos();
  }, []);


  // ==========================================================
  // CARGAR CURSOS
  // ==========================================================

  async function cargarCursos() {

    try {

      setCargandoCursos(true);
      setError("");

      const respuesta =
        await classroomObtenerCursos();

      const lista =
        Array.isArray(respuesta)
          ? respuesta
          : Array.isArray(respuesta?.courses)
            ? respuesta.courses
            : [];

      setCursos(lista);

    } catch (err) {

      console.error(
        "Error cargando cursos de Classroom:",
        err
      );

      setError(
        err?.message ||
        "No se pudieron cargar las experiencias formativas."
      );

      setCursos([]);

    } finally {

      setCargandoCursos(false);

    }

  }


  // ============================================================
  // SELECCIONAR ENTREGABLE
  // ============================================================

  async function manejarSeleccionEntregable(
    seleccion
  ) {

    console.log(
      "========== ENTREGABLE SELECCIONADO =========="
    );

    console.log(
      "Selección:",
      seleccion
    );

    if (!seleccion) {
      return;
    }

    const {
      actividad,
      tipo,
      courseWorkId,
    } = seleccion;

    console.log(
      "Tipo:",
      tipo
    );

    console.log(
      "CourseWork ID:",
      courseWorkId
    );

    console.log(
      "Actividad:",
      actividad
    );


    setTipoEntregableSeleccionado(
      tipo || ""
    );


    if (!courseWorkId) {

      setError(
        "No se pudo obtener el ID del entregable."
      );

      return;

    }


    try {

      setError("");
      setCargandoEntregas(true);

      const respuesta =
        await classroomObtenerEntregas(
          cursoSeleccionado,
          courseWorkId
        );

      console.log(
        "Entregas del entregable:",
        respuesta
      );

      const lista =
        Array.isArray(respuesta)
          ? respuesta
          : Array.isArray(
              respuesta?.entregas
            )
            ? respuesta.entregas
            : Array.isArray(
                respuesta?.data?.entregas
              )
              ? respuesta.data.entregas
              : Array.isArray(
                  respuesta?.studentSubmissions
                )
                ? respuesta.studentSubmissions
                : Array.isArray(
                    respuesta?.submissions
                  )
                  ? respuesta.submissions
                  : [];

      console.log(
        "Lista final de entregas:",
        lista
      );

      setEntregas(
        prev => ({
          ...prev,
          [tipo]: lista,
        })
      );

    } catch (err) {

      console.error(
        "Error cargando entregas:",
        err
      );

      setError(
        err?.message ||
        "No se pudieron cargar las entregas."
      );

    } finally {

      setCargandoEntregas(false);

    }

  }


  // ============================================================
  // CAMBIAR CURSO
  // ============================================================

  async function manejarCambioCurso(
    cursoId
  ) {

    const id =
      String(
        cursoId || ""
      ).trim();

    setCursoSeleccionado(id);

    setTemaSeleccionado(null);

    setTemas([]);

    setActividades([]);

    setEntregas({
      EN1: [],
      EN2: [],
      EN3: [],
    });

    setEstudianteSeleccionado(null);

    setTipoEntregableSeleccionado("");

    setError("");


    if (!id) {
      return;
    }

    await cargarTemas(id);

  }


  // ============================================================
  // CARGAR TEMAS
  // ============================================================

  async function cargarTemas(
    cursoId
  ) {

    try {

      setCargandoTemas(true);
      setError("");

      const respuesta =
        await classroomObtenerTemas(
          cursoId
        );


      console.log(
        "========== TEMAS CLASSROOM =========="
      );

      console.log(
        "Curso ID:",
        cursoId
      );

      console.log(
        "Respuesta completa:",
        respuesta
      );

      console.log(
        "Es array:",
        Array.isArray(respuesta)
      );

      console.log(
        "respuesta.topics:",
        respuesta?.topics
      );


      const lista =
        Array.isArray(respuesta)
          ? respuesta
          : Array.isArray(respuesta?.topics)
            ? respuesta.topics
            : [];


      console.log(
        "Lista final de temas:",
        lista
      );


      setTemas(lista);

    } catch (err) {

      console.error(
        "Error cargando temas de Classroom:",
        err
      );

      setError(
        err?.message ||
        "No se pudieron cargar los temas."
      );

      setTemas([]);

    } finally {

      setCargandoTemas(false);

    }

  }
  // ============================================================
  // SELECCIONAR TEMA
  // ============================================================

  async function manejarSeleccionTema(
    tema
  ) {

    console.log(
      "================================="
    );

    console.log(
      "📌 TEMA SELECCIONADO"
    );

    console.log(
      "================================="
    );

    console.log(
      "Tema recibido:",
      tema
    );


    if (!tema) {

      setTemaSeleccionado(null);

      setActividades([]);

      setEntregas({
        EN1: [],
        EN2: [],
        EN3: [],
      });

      setEstudianteSeleccionado(null);

      setTipoEntregableSeleccionado("");

      return;

    }


    try {

      setTemaSeleccionado(tema);

      setActividades([]);

      setEntregas({
        EN1: [],
        EN2: [],
        EN3: [],
      });

      setEstudianteSeleccionado(null);

      setTipoEntregableSeleccionado("");

      setError("");


      const topicId =
        obtenerTopicId(tema);


      console.log(
        "📌 Topic ID:",
        topicId
      );

      console.log(
        "📌 Curso:",
        cursoSeleccionado
      );


      if (!topicId) {

        console.error(
          "❌ No se pudo obtener el Topic ID"
        );

        setError(
          "No se pudo obtener el ID del tema seleccionado."
        );

        return;

      }


      console.log(
        "📡 Iniciando carga de actividades..."
      );


      await cargarActividades(
        cursoSeleccionado,
        topicId
      );


      console.log(
        "✅ cargarActividades terminó"
      );

    } catch (err) {

      console.error(
        "❌ ERROR EN manejarSeleccionTema:",
        err
      );

      setError(
        err?.message ||
        "Ocurrió un error al seleccionar el tema."
      );

    }

  }


  // ============================================================
  // CARGAR ACTIVIDADES
  // ============================================================

  async function cargarActividades(
    cursoId,
    topicId
  ) {

    try {

      console.log(
        "================================="
      );

      console.log(
        "📚 CARGANDO ACTIVIDADES"
      );

      console.log(
        "================================="
      );

      console.log(
        "Curso ID:",
        cursoId
      );

      console.log(
        "Topic ID:",
        topicId
      );


      setCargandoActividades(true);

      setError("");


      const respuesta =
        await classroomObtenerActividades(
          cursoId
        );


      console.log(
        "📦 Respuesta actividades:",
        respuesta
      );


      // ======================================================
      // NORMALIZAR RESPUESTA
      // ======================================================

      let lista = [];


      if (
        Array.isArray(respuesta)
      ) {

        lista = respuesta;

      } else if (
        Array.isArray(
          respuesta?.courseWork
        )
      ) {

        lista =
          respuesta.courseWork;

      } else if (
        Array.isArray(
          respuesta?.activities
        )
      ) {

        lista =
          respuesta.activities;

      } else if (
        Array.isArray(
          respuesta?.data
        )
      ) {

        lista =
          respuesta.data;

      } else if (
        Array.isArray(
          respuesta?.data?.courseWork
        )
      ) {

        lista =
          respuesta.data.courseWork;

      } else if (
        Array.isArray(
          respuesta?.data?.activities
        )
      ) {

        lista =
          respuesta.data.activities;

      }


      console.log(
        "📋 Total actividades:",
        lista.length
      );

      console.log(
        "📋 Actividades:",
        lista
      );


      // ======================================================
      // FILTRAR POR TEMA
      // ======================================================

      const topicIdNormalizado =
        String(
          topicId || ""
        ).trim();


      const actividadesDelTema =
        lista.filter(
          actividad => {

            const actividadTopicId =
              String(
                actividad?.topicId ||
                actividad?.topicID ||
                actividad?.topicid ||
                actividad?.topic?.topicId ||
                actividad?.topic?.topicID ||
                actividad?.topic?.id ||
                ""
              ).trim();


            console.log(
              "Actividad:",
              actividad
            );

            console.log(
              "Topic actividad:",
              actividadTopicId
            );


            /*
             * Si la actividad no tiene topicId,
             * la dejamos pasar.
             */
            if (!actividadTopicId) {
              return true;
            }


            return (
              actividadTopicId ===
              topicIdNormalizado
            );

          }
        );


      console.log(
        "================================="
      );

      console.log(
        "📚 ACTIVIDADES DEL TEMA:",
        actividadesDelTema
      );

      console.log(
        "📚 TOTAL:",
        actividadesDelTema.length
      );


      setActividades(
        actividadesDelTema
      );


      // ======================================================
      // RECONOCER EN1 / EN2 / EN3
      // ======================================================

      const entregablesEncontrados = {
        EN1: null,
        EN2: null,
        EN3: null,
      };


      actividadesDelTema.forEach(
        actividad => {

          try {

            const entregable =
              reconocerEntregable(
                actividad
              );


            console.log(
              "🔎 Actividad:",
              obtenerTitulo(
                actividad
              )
            );

            console.log(
              "🔎 Entregable detectado:",
              entregable
            );


            if (
              entregable &&
              ENTREGABLES_OBJETIVO.includes(
                entregable
              )
            ) {

              entregablesEncontrados[
                entregable
              ] = actividad;

            }

          } catch (errorReconocimiento) {

            console.error(
              "❌ Error reconociendo actividad:",
              actividad,
              errorReconocimiento
            );

          }

        }
      );


      console.log(
        "================================="
      );

      console.log(
        "📦 ENTREGABLES ENCONTRADOS:"
      );

      console.log(
        entregablesEncontrados
      );


      // ======================================================
      // CARGAR ENTREGAS
      // ======================================================

      console.log(
        "📡 Iniciando carga de entregas..."
      );


      await cargarEntregasEntregables(
        cursoId,
        entregablesEncontrados
      );


      console.log(
        "✅ Carga de actividades terminada"
      );

    } catch (err) {

      console.error(
        "❌ ERROR CARGANDO ACTIVIDADES:",
        err
      );

      console.error(
        "Mensaje:",
        err?.message
      );

      console.error(
        "Stack:",
        err?.stack
      );


      setError(
        err?.message ||
        "No se pudieron cargar las actividades."
      );


      setActividades([]);

      setEntregas({
        EN1: [],
        EN2: [],
        EN3: [],
      });

    } finally {

      setCargandoActividades(false);

    }

  }
  // ============================================================
  // CARGAR ENTREGAS EN1 / EN2 / EN3
  // ============================================================

  async function cargarEntregasEntregables(
    cursoId,
    entregables
  ) {

    try {

      setCargandoEntregas(true);

      setError("");


      const resultado = {
        EN1: [],
        EN2: [],
        EN3: [],
      };


      // ------------------------------------------------------
      // EN1
      // ------------------------------------------------------

      if (entregables.EN1) {

        const courseWorkId =
          obtenerCourseWorkId(
            entregables.EN1
          );


        if (courseWorkId) {

          resultado.EN1 =
            await obtenerEntregasActividad(
              cursoId,
              courseWorkId
            );

        }

      }


      // ------------------------------------------------------
      // EN2
      // ------------------------------------------------------

      if (entregables.EN2) {

        const courseWorkId =
          obtenerCourseWorkId(
            entregables.EN2
          );


        if (courseWorkId) {

          resultado.EN2 =
            await obtenerEntregasActividad(
              cursoId,
              courseWorkId
            );

        }

      }


      // ------------------------------------------------------
      // EN3
      // ------------------------------------------------------

      if (entregables.EN3) {

        const courseWorkId =
          obtenerCourseWorkId(
            entregables.EN3
          );


        if (courseWorkId) {

          resultado.EN3 =
            await obtenerEntregasActividad(
              cursoId,
              courseWorkId
            );

        }

      }


      setEntregas(
        resultado
      );

    } catch (err) {

      console.error(
        "Error cargando entregas:",
        err
      );

      setError(
        err?.message ||
        "No se pudieron cargar las entregas de los estudiantes."
      );

      setEntregas({
        EN1: [],
        EN2: [],
        EN3: [],
      });

    } finally {

      setCargandoEntregas(false);

    }

  }


  // ============================================================
  // OBTENER ENTREGAS DE UNA ACTIVIDAD
  // ============================================================

  async function obtenerEntregasActividad(
    cursoId,
    courseWorkId
  ) {

    try {

      const respuesta =
        await classroomObtenerEntregas(
          cursoId,
          courseWorkId
        );


      const lista =
        Array.isArray(respuesta)
          ? respuesta
          : Array.isArray(
              respuesta?.studentSubmissions
            )
            ? respuesta.studentSubmissions
            : Array.isArray(
                respuesta?.submissions
              )
              ? respuesta.submissions
              : Array.isArray(
                  respuesta?.entregas
                )
                ? respuesta.entregas
                : Array.isArray(
                    respuesta?.data?.entregas
                  )
                  ? respuesta.data.entregas
                  : [];


      return lista.map(
        entrega =>
          obtenerInformacionEntrega(
            entrega
          )
      );

    } catch (err) {

      console.error(
        `Error obteniendo entregas de ${courseWorkId}:`,
        err
      );

      return [];

    }

  }


  // ============================================================
  // ESTUDIANTES CONSOLIDADOS
  // ============================================================

  const estudiantes = useMemo(() => {

    const mapa =
      new Map();


    ENTREGABLES_OBJETIVO.forEach(
      entregable => {

        const lista =
          Array.isArray(
            entregas?.[entregable]
          )
            ? entregas[entregable]
            : [];


        lista.forEach(
          entrega => {

            const informacion =
              obtenerInformacionEntrega(
                entrega
              );


            const userId =
              String(
                informacion?.userId || ""
              ).trim();


            if (!userId) {
              return;
            }


            // ------------------------------------------------
            // CREAR ESTUDIANTE
            // ------------------------------------------------

            if (
              !mapa.has(userId)
            ) {

              mapa.set(
                userId,
                {
                  userId,

                  nombre:
                    informacion?.nombre ||
                    "Alumno",

                  email:
                    informacion?.email ||
                    "",

                  entregas: {
                    EN1: null,
                    EN2: null,
                    EN3: null,
                  },

                  puntajes: {
                    EN1: null,
                    EN2: null,
                    EN3: null,
                  },

                  descuentos: {
                    EN1: null,
                    EN2: null,
                    EN3: null,
                  },

                  notaFinal: null,
                }
              );

            }


            // ------------------------------------------------
            // ACTUALIZAR ESTUDIANTE
            // ------------------------------------------------

            const estudiante =
              mapa.get(userId);


            if (
              informacion?.nombre &&
              (
                !estudiante.nombre ||
                estudiante.nombre === "Alumno"
              )
            ) {

              estudiante.nombre =
                informacion.nombre;

            }


            if (
              informacion?.email &&
              !estudiante.email
            ) {

              estudiante.email =
                informacion.email;

            }


            // ------------------------------------------------
            // GUARDAR ENTREGA
            // ------------------------------------------------

            estudiante.entregas[
              entregable
            ] = informacion;

          }
        );

      }
    );


    // --------------------------------------------------------
    // ORDENAR POR NOMBRE
    // --------------------------------------------------------

    return Array.from(
      mapa.values()
    ).sort(
      (a, b) =>
        String(
          a.nombre || ""
        ).localeCompare(
          String(
            b.nombre || ""
          ),
          "es",
          {
            sensitivity: "base",
          }
        )
    );

  }, [
    entregas,
  ]);
  // ============================================================
  // CANTIDAD DE ESTUDIANTES
  // ============================================================

  const totalEstudiantes =
    estudiantes.length;


  // ============================================================
  // ENTREGABLES DETECTADOS
  // ============================================================

  const entregablesDetectados =
    useMemo(() => {

      const resultado = {
        EN1: null,
        EN2: null,
        EN3: null,
      };


      actividades.forEach(
        actividad => {

          const entregable =
            reconocerEntregable(
              actividad
            );


          if (
            entregable &&
            ENTREGABLES_OBJETIVO.includes(
              entregable
            )
          ) {

            resultado[
              entregable
            ] = actividad;

          }

        }
      );


      return resultado;

    }, [
      actividades,
    ]);


  // ============================================================
  // ACTIVIDAD REVISOR DE INFORMES
  // ============================================================

  const actividadRevisor =
    useMemo(() => {

      return (
        actividades.find(
          actividad =>
            esRevisorInformes(
              actividad
            )
        ) ||
        null
      );

    }, [
      actividades,
    ]);


  // ============================================================
  // ESTADÍSTICAS
  // ============================================================

  const estadisticas =
    useMemo(() => {

      const resultado = {
        estudiantes: estudiantes.length,
        EN1: 0,
        EN2: 0,
        EN3: 0,
        completos: 0,
      };


      estudiantes.forEach(
        estudiante => {

          if (
            estudiante.entregas.EN1
          ) {
            resultado.EN1++;
          }


          if (
            estudiante.entregas.EN2
          ) {
            resultado.EN2++;
          }


          if (
            estudiante.entregas.EN3
          ) {
            resultado.EN3++;
          }


          if (
            estudiante.entregas.EN1 &&
            estudiante.entregas.EN2 &&
            estudiante.entregas.EN3
          ) {

            resultado.completos++;

          }

        }
      );


      return resultado;

    }, [
      estudiantes,
    ]);


  // ============================================================
  // SELECCIONAR ESTUDIANTE
  // ============================================================

  function manejarSeleccionEstudiante(
    estudiante
  ) {

    console.log(
      "ESTUDIANTE SELECCIONADO:",
      estudiante
    );


    if (!estudiante) {

      setEstudianteSeleccionado(
        null
      );

      return;

    }


    setEstudianteSeleccionado(
      estudiante
    );

  }


  // ============================================================
  // CERRAR MODAL
  // ============================================================

  function cerrarEstudiante() {

    setEstudianteSeleccionado(
      null
    );

  }


  // ============================================================
  // OBTENER CURSO ACTUAL
  // ============================================================

  const cursoActual =
    useMemo(() => {

      return (
        cursos.find(
          curso =>
            String(
              curso?.id || ""
            ) ===
            String(
              cursoSeleccionado
            )
        ) ||
        null
      );

    }, [
      cursos,
      cursoSeleccionado,
    ]);


  // ============================================================
  // OBTENER NOMBRE DEL TEMA
  // ============================================================

  const nombreTemaActual =
    temaSeleccionado
      ? obtenerNombreTema(
          temaSeleccionado
        )
      : "";


  // ============================================================
  // REINICIAR TODO
  // ============================================================

  function reiniciarRevision() {

    setCursoSeleccionado("");

    setTemaSeleccionado(null);

    setTemas([]);

    setActividades([]);

    setEntregas({
      EN1: [],
      EN2: [],
      EN3: [],
    });

    setEstudianteSeleccionado(null);

    setTipoEntregableSeleccionado("");

    setError("");

  }
  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="revision-panel space-y-6">
      <style>{REVISION_PANEL_STYLES}</style>

      {/* ====================================================
          ERROR GENERAL
      ==================================================== */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-700
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

              <p className="font-bold">
                Ocurrió un problema
              </p>

              <p className="mt-1">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="
                shrink-0
                font-bold
                text-red-500
                hover:text-red-700
              "
            >
              ×
            </button>

          </div>
        </div>
      )}


      {/* ====================================================
          SELECTOR DE EXPERIENCIA FORMATIVA
      ==================================================== */}

      <ClassroomSelector
        cursos={cursos}
        cursoSeleccionado={
          cursoSeleccionado
        }
        onChange={
          manejarCambioCurso
        }
        cargando={
          cargandoCursos
        }
      />


      {/* ====================================================
          INFORMACIÓN DEL CURSO
      ==================================================== */}

      {cursoActual && (
        <div
          className="
            rounded-2xl
            border
            border-blue-100
            bg-blue-50
            px-5
            py-4
          "
        >

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-blue-500
            "
          >
            Experiencia formativa
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-black
              text-blue-950
            "
          >
            {
              cursoActual?.name ||
              cursoActual?.nombre ||
              cursoActual?.title ||
              "Curso seleccionado"
            }
          </h2>

        </div>
      )}


      {/* ====================================================
          TEMAS
      ==================================================== */}

      {cursoSeleccionado && (
        <ClassroomTopics
          cursoSeleccionado={
            cursoSeleccionado
          }
          temaSeleccionado={
            temaSeleccionado
              ? obtenerTopicId(
                  temaSeleccionado
                )
              : ""
          }
          onTemaSeleccionado={
            manejarSeleccionTema
          }
        />
      )}


      {/* ====================================================
          INFORMACIÓN DEL TEMA
      ==================================================== */}

      {temaSeleccionado && (
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

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
                Tema seleccionado
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-black
                  text-slate-900
                "
              >
                {nombreTemaActual}
              </h2>

            </div>


            <button
              type="button"
              onClick={
                reiniciarRevision
              }
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2
                text-sm
                font-bold
                text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              Cambiar experiencia
            </button>

          </div>

        </div>
      )}


      {/* ====================================================
          CARGANDO ACTIVIDADES
      ==================================================== */}

      {cargandoActividades && (
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
          "
        >

          <div
            className="
              mx-auto
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-blue-600
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-slate-500
            "
          >
            Cargando actividades de Classroom...
          </p>

        </div>
      )}


      {/* ====================================================
          ENTREGABLES
      ==================================================== */}

      {temaSeleccionado &&
        !cargandoActividades && (
          <ClassroomDeliverables
            actividades={actividades}
            onSelectDeliverable={
              manejarSeleccionEntregable
            }
          />
        )}


      {/* ====================================================
          ESTUDIANTES DEL ENTREGABLE SELECCIONADO
      ==================================================== */}

      {tipoEntregableSeleccionado &&
        !cargandoEntregas && (
          <ClassroomStudents
            entregas={
              entregas[
                tipoEntregableSeleccionado
              ] || []
            }
            tipo={
              tipoEntregableSeleccionado
            }
            onSelectStudent={
              manejarSeleccionEstudiante
            }
          />
        )}


      {/* ====================================================
          CARGANDO ENTREGAS
      ==================================================== */}

      {cargandoEntregas && (
        <div
          className="
            rounded-2xl
            border
            border-blue-100
            bg-blue-50
            p-6
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
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-blue-200
                border-t-blue-600
              "
            />

            <p
              className="
                text-sm
                font-semibold
                text-blue-700
              "
            >
              Cargando entregas de los estudiantes...
            </p>

          </div>

        </div>
      )}
      {/* ====================================================
          ESTADÍSTICAS
      ==================================================== */}

      {temaSeleccionado &&
        !cargandoEntregas &&
        totalEstudiantes > 0 && (

          <div
            className="
              grid
              grid-cols-2
              gap-3
              lg:grid-cols-5
            "
          >

            {/* ESTUDIANTES */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  text-slate-400
                "
              >
                Estudiantes
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-black
                  text-slate-900
                "
              >
                {estadisticas.estudiantes}
              </p>

            </div>


            {/* EN1 */}

            <div
              className="
                rounded-2xl
                border
                border-blue-100
                bg-blue-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  text-blue-500
                "
              >
                EN1
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-black
                  text-blue-700
                "
              >
                {estadisticas.EN1}
              </p>

            </div>


            {/* EN2 */}

            <div
              className="
                rounded-2xl
                border
                border-violet-100
                bg-violet-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  text-violet-500
                "
              >
                EN2
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-black
                  text-violet-700
                "
              >
                {estadisticas.EN2}
              </p>

            </div>


            {/* EN3 */}

            <div
              className="
                rounded-2xl
                border
                border-emerald-100
                bg-emerald-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  text-emerald-500
                "
              >
                EN3
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-black
                  text-emerald-700
                "
              >
                {estadisticas.EN3}
              </p>

            </div>


            {/* COMPLETOS */}

            <div
              className="
                rounded-2xl
                border
                border-amber-100
                bg-amber-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  text-amber-600
                "
              >
                Completos
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-black
                  text-amber-700
                "
              >
                {estadisticas.completos}
              </p>

            </div>

          </div>

        )}


      {/* ====================================================
          ESTUDIANTES CONSOLIDADOS
      ==================================================== */}

      {temaSeleccionado &&
        !cargandoEntregas && (

          <ClassroomStudents
            estudiantes={
              estudiantes
            }

            entregas={
              entregas
            }

            onSelect={
              manejarSeleccionEstudiante
            }

            puntajePorEntregable={
              PUNTAJE_POR_ENTREGABLE
            }

          />

        )}


      {/* ====================================================
          SIN ESTUDIANTES
      ==================================================== */}

      {temaSeleccionado &&
        !cargandoEntregas &&
        estudiantes.length === 0 &&
        !error && (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-white
              px-6
              py-12
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-400
              "
            >

              <span className="text-2xl">
                👥
              </span>

            </div>


            <h3
              className="
                mt-4
                text-lg
                font-black
                text-slate-800
              "
            >
              No se encontraron estudiantes
            </h3>


            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                text-slate-500
              "
            >
              No se encontraron entregas para
              EN1, EN2 o EN3 dentro del tema
              seleccionado.
            </p>

          </div>

        )}


      {/* ====================================================
          MODAL DEL ESTUDIANTE
      ==================================================== */}

      {estudianteSeleccionado && (

        <ClassroomStudentModal
          estudiante={
            estudianteSeleccionado
          }

          entregas={
            estudianteSeleccionado.entregas
          }

          onClose={
            cerrarEstudiante
          }

          puntajePorEntregable={
            PUNTAJE_POR_ENTREGABLE
          }

          actividadRevisor={
            actividadRevisor
          }

          cursoId={
            cursoSeleccionado
          }

          tema={
            temaSeleccionado
          }

          onGuardarNota={(
            resultado
          ) => {

            console.log(
              "Resultado de evaluación:",
              resultado
            );

          }}

        />

      )}

    </div>
  );
}
