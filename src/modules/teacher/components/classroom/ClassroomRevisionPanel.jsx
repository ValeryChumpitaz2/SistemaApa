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


  // ==========================================================
  // CAMBIAR CURSO
  // ==========================================================

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

    setError("");

    if (!id) {

      return;

    }

    await cargarTemas(id);

  }


  // ==========================================================
  // CARGAR TEMAS
  // ==========================================================

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
  // ==========================================================
  // SELECCIONAR TEMA
  // ==========================================================

  async function manejarSeleccionTema(tema) {

  console.log("=================================");
  console.log("📌 TEMA SELECCIONADO");
  console.log("=================================");
  console.log("Tema recibido:", tema);

  if (!tema) {
    console.log("⚠️ No se recibió tema");

    setTemaSeleccionado(null);
    setActividades([]);
    setEntregas({
      EN1: [],
      EN2: [],
      EN3: [],
    });
    setEstudianteSeleccionado(null);

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

    setError("");

    const topicId =
      obtenerTopicId(tema);

    console.log("📌 Topic ID:", topicId);
    console.log("📌 Curso:", cursoSeleccionado);

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


  // ==========================================================
  // CARGAR ACTIVIDADES
  // ==========================================================

 async function cargarActividades(
  cursoId,
  topicId
) {

  try {

    console.log("=================================");
    console.log("📚 CARGANDO ACTIVIDADES");
    console.log("=================================");
    console.log("Curso ID:", cursoId);
    console.log("Topic ID:", topicId);

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

    }

    else if (
      Array.isArray(
        respuesta?.courseWork
      )
    ) {

      lista =
        respuesta.courseWork;

    }

    else if (
      Array.isArray(
        respuesta?.activities
      )
    ) {

      lista =
        respuesta.activities;

    }

    else if (
      Array.isArray(
        respuesta?.data
      )
    ) {

      lista =
        respuesta.data;

    }

    else if (
      Array.isArray(
        respuesta?.data?.courseWork
      )
    ) {

      lista =
        respuesta.data.courseWork;

    }

    else if (
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


          // Si no tiene topicId,
          // la dejamos pasar.
          if (
            !actividadTopicId
          ) {

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

        } catch (error) {

          console.error(
            "❌ Error reconociendo actividad:",
            actividad,
            error
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


  // ==========================================================
  // CARGAR ENTREGAS DE EN1 / EN2 / EN3
  // ==========================================================

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

      if (
        entregables.EN1
      ) {

        const courseWorkId =
          obtenerCourseWorkId(
            entregables.EN1
          );


        if (
          courseWorkId
        ) {

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

      if (
        entregables.EN2
      ) {

        const courseWorkId =
          obtenerCourseWorkId(
            entregables.EN2
          );


        if (
          courseWorkId
        ) {

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

      if (
        entregables.EN3
      ) {

        const courseWorkId =
          obtenerCourseWorkId(
            entregables.EN3
          );


        if (
          courseWorkId
        ) {

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


  // ==========================================================
  // OBTENER ENTREGAS DE UNA ACTIVIDAD
  // ==========================================================

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
          : Array.isArray(respuesta?.studentSubmissions)
            ? respuesta.studentSubmissions
            : Array.isArray(respuesta?.submissions)
              ? respuesta.submissions
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
  // ==========================================================
  // ESTUDIANTES CONSOLIDADOS
  // ==========================================================

  const estudiantes = useMemo(() => {

    const mapa =
      new Map();


    // --------------------------------------------------------
    // RECORRER LAS ENTREGAS DE EN1, EN2 Y EN3
    // --------------------------------------------------------

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
                informacion.userId || ""
              ).trim();


            if (!userId) {

              return;

            }


            // ------------------------------------------------
            // CREAR ESTUDIANTE SI NO EXISTE
            // ------------------------------------------------

            if (
              !mapa.has(
                userId
              )
            ) {

              mapa.set(
                userId,
                {

                  userId,

                  nombre:
                    informacion.nombre ||
                    "Alumno",

                  email:
                    informacion.email ||
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
            // ACTUALIZAR INFORMACIÓN DEL ESTUDIANTE
            // ------------------------------------------------

            const estudiante =
              mapa.get(
                userId
              );


            if (
              informacion.nombre &&
              (
                !estudiante.nombre ||
                estudiante.nombre === "Alumno"
              )
            ) {

              estudiante.nombre =
                informacion.nombre;

            }


            if (
              informacion.email &&
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


  // ==========================================================
  // CANTIDAD DE ESTUDIANTES
  // ==========================================================

  const totalEstudiantes =
    estudiantes.length;


  // ==========================================================
  // ENTREGABLES DETECTADOS
  // ==========================================================

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


  // ==========================================================
  // ACTIVIDAD REVISOR DE INFORMES
  // ==========================================================

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


  // ==========================================================
  // ESTADÍSTICAS
  // ==========================================================

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


  // ==========================================================
  // SELECCIONAR ESTUDIANTE
  // ==========================================================

  function manejarSeleccionEstudiante(
    estudiante
  ) {

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


  // ==========================================================
  // CERRAR MODAL
  // ==========================================================

  function cerrarEstudiante() {

    setEstudianteSeleccionado(
      null
    );

  }


  // ==========================================================
  // OBTENER NOMBRE DEL CURSO
  // ==========================================================

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


  // ==========================================================
  // OBTENER NOMBRE DEL TEMA
  // ==========================================================

  const nombreTemaActual =
    temaSeleccionado
      ? obtenerNombreTema(
        temaSeleccionado
      )
      : "";


  // ==========================================================
  // REINICIAR TODO
  // ==========================================================

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

    setEstudianteSeleccionado(
      null
    );

    setError("");

  }
  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        space-y-6
      "
    >

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

              <p
                className="
                  font-bold
                "
              >
                Ocurrió un problema
              </p>

              <p
                className="
                  mt-1
                "
              >
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
                text-red-500
                hover:text-red-700
                font-bold
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
          INFORMACIÓN DEL CURSO SELECCIONADO
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
  cursoSeleccionado={cursoSeleccionado}
  temaSeleccionado={
    temaSeleccionado
      ? obtenerTopicId(temaSeleccionado)
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
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
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
            lg:grid-cols-5
            gap-3
          "
          >

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
          ESTUDIANTES
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

              <span
                className="
                text-2xl
              "
              >
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
