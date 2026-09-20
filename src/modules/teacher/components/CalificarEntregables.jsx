import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  classroomObtenerCursos,
  classroomObtenerTemas,
  classroomObtenerActividades,
  classroomObtenerEntregas
} from "../services/classroomService.js";


// ============================================================
// CONFIGURACIÓN
// ============================================================

const ENTREGABLES_OBJETIVO = [
  "EN1",
  "EN2",
  "EN3"
];

const PUNTAJE_POR_ENTREGABLE = 2;


// ============================================================
// NORMALIZAR TEXTO
// ============================================================

function normalizarTexto(texto = "") {

  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();

}

// ============================================================
// OBTENER TÍTULO DE ACTIVIDAD
// ============================================================

function obtenerTitulo(actividad) {

  return (

    actividad?.title ||

    actividad?.name ||

    actividad?.nombre ||

    actividad?.courseWorkTitle ||

    actividad?.courseworkTitle ||

    actividad?.titulo ||

    ""

  );

}




// ============================================================
// OBTENER COURSE WORK ID
// ============================================================

function obtenerCourseWorkId(actividad) {

  return String(

    actividad?.courseWorkId ||

    actividad?.courseworkId ||

    actividad?.course_work_id ||

    actividad?.id ||

    ""

  ).trim();

}


// ============================================================
// OBTENER TOPIC ID
// ============================================================

function obtenerTopicId(actividad) {

  return String(

    actividad?.topicId ||

    actividad?.topicID ||

    actividad?.topic?.topicId ||

    actividad?.topic?.topicID ||

    actividad?.topic?.id ||

    ""

  ).trim();

}
// ============================================================
// RECONOCER ENTREGABLE
//
// Classroom real:
//
// S02 | SP1 | ENTREGABLE 1
// S03 | SP1 | ENTREGABLE 2
// S04 | SP1 | ENTREGABLE 3
//
// También acepta:
//
// ENTREGABLE1
// ENTREGABLE 1
// EN1
//
// ============================================================

function reconocerEntregable(actividad) {

  const titulo =
    obtenerTitulo(
      actividad
    );


  const texto =
    normalizarTexto(
      titulo
    );


  console.log(
    "🔎 RECONOCIENDO ENTREGABLE:",
    {
      titulo,
      texto
    }
  );


  // ----------------------------------------------------------
  // EN1
  // ----------------------------------------------------------

  if (

    texto.includes("ENTREGABLE 1") ||

    texto.includes("ENTREGABLE1") ||

    /\bEN1\b/.test(texto)

  ) {

    return "EN1";

  }


  // ----------------------------------------------------------
  // EN2
  // ----------------------------------------------------------

  if (

    texto.includes("ENTREGABLE 2") ||

    texto.includes("ENTREGABLE2") ||

    /\bEN2\b/.test(texto)

  ) {

    return "EN2";

  }


  // ----------------------------------------------------------
  // EN3
  // ----------------------------------------------------------

  if (

    texto.includes("ENTREGABLE 3") ||

    texto.includes("ENTREGABLE3") ||

    /\bEN3\b/.test(texto)

  ) {

    return "EN3";

  }


  return null;

}


// ============================================================
// RECONOCER REVISOR DE INFORMES
//
// Classroom real:
//
// S05 | SP1 | REVISOR DE INFORMES
//
// ============================================================

function esRevisorInformes(actividad) {

  const titulo =
    obtenerTitulo(
      actividad
    );


  const texto =
    normalizarTexto(
      titulo
    );


  const esRevisor =

    (
      texto.includes("REVISOR") &&
      texto.includes("INFORME")
    ) ||

    texto.includes("REVISOR DE INFORMES");


  console.log(
    "🔎 REVISOR:",
    {
      titulo,
      esRevisor
    }
  );


  return esRevisor;

}


// ============================================================
// RECONOCER SI ES UNA ACTIVIDAD DE ENTREGABLE
// ============================================================

function esActividadEntregable(actividad) {

  return Boolean(
    reconocerEntregable(
      actividad
    )
  );

}


// ============================================================
// OBTENER NOMBRE DE TEMA
// ============================================================

function obtenerNombreTema(tema) {

  return String(

    tema?.name ||

    tema?.nombre ||

    tema?.topicName ||

    "Tema sin nombre"

  ).trim();

}


// ============================================================
// OBTENER ID DE TEMA
// ============================================================

function obtenerIdTema(tema) {

  return String(

    tema?.topicId ||

    tema?.topicID ||

    tema?.id ||

    ""

  ).trim();

}
// ============================================================
// COMPONENTE
// ============================================================

export default function ClassroomRevisionPanel() {

  // ==========================================================
  // EXPERIENCIAS FORMATIVAS / CURSOS
  // ==========================================================

  const [
    cursos,
    setCursos
  ] = useState([]);


  const [
    courseId,
    setCourseId
  ] = useState("");


  // ==========================================================
  // TEMAS
  // ==========================================================

  const [
    temas,
    setTemas
  ] = useState([]);


  const [
    temaSeleccionado,
    setTemaSeleccionado
  ] = useState(null);


  // ==========================================================
  // ACTIVIDADES DEL TEMA
  // ==========================================================

  const [
    actividades,
    setActividades
  ] = useState([]);


  // ==========================================================
  // ENTREGAS POR ENTREGABLE
  //
  // {
  //   EN1: [],
  //   EN2: [],
  //   EN3: []
  // }
  //
  // ==========================================================

  const [
    entregas,
    setEntregas
  ] = useState({});


  // ==========================================================
  // ESTADOS DE CARGA
  // ==========================================================

  const [
    cargandoCursos,
    setCargandoCursos
  ] = useState(false);


  const [
    cargandoTemas,
    setCargandoTemas
  ] = useState(false);


  const [
    cargandoActividades,
    setCargandoActividades
  ] = useState(false);


  const [
    cargandoEntregas,
    setCargandoEntregas
  ] = useState(false);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [
    error,
    setError
  ] = useState("");


  // ==========================================================
  // CARGAR EXPERIENCIAS FORMATIVAS
  // ==========================================================

  useEffect(() => {

    cargarCursos();

  }, []);


  async function cargarCursos() {

    try {

      setError("");

      setCargandoCursos(true);


      const resultado =
        await classroomObtenerCursos();


      console.log(
        "📚 EXPERIENCIAS FORMATIVAS:",
        resultado
      );


      setCursos(

        Array.isArray(resultado)

          ? resultado

          : []

      );

    }
    catch (err) {

      console.error(
        "❌ ERROR CARGANDO EXPERIENCIAS FORMATIVAS:",
        err
      );


      setError(
        err?.message ||

        "No se pudieron cargar las experiencias formativas."

      );

    }
    finally {

      setCargandoCursos(false);

    }

  }


  // ==========================================================
  // SELECCIONAR EXPERIENCIA FORMATIVA
  //
  // FLUJO:
  //
  // curso seleccionado
  //       ↓
  // limpiar selección anterior
  //       ↓
  // cargar temas del curso
  //
  // ==========================================================

  async function seleccionarCurso(
    nuevoCourseId
  ) {

    const nuevoId =
      String(
        nuevoCourseId || ""
      ).trim();


    console.log(
      "🎓 EXPERIENCIA FORMATIVA SELECCIONADA:",
      nuevoId
    );


    // --------------------------------------------------------
    // LIMPIAR TODO LO DEPENDIENTE DEL CURSO ANTERIOR
    // --------------------------------------------------------

    setCourseId(
      nuevoId
    );


    setTemaSeleccionado(
      null
    );


    setTemas(
      []
    );


    setActividades(
      []
    );


    setEntregas(
      {}
    );


    setError("");


    if (!nuevoId) {

      return;

    }


    try {

      setCargandoTemas(true);


      console.log(
        "📚 CARGANDO TEMAS DEL CURSO:",
        nuevoId
      );


      const resultado =
        await classroomObtenerTemas(
          nuevoId
        );


      console.log(
        "📚 TEMAS RECIBIDOS:",
        resultado
      );


      const temasNormalizados =

        Array.isArray(resultado)

          ? resultado.filter(
            tema =>
              Boolean(
                obtenerIdTema(
                  tema
                )
              )
          )

          : [];


      setTemas(
        temasNormalizados
      );


      console.log(
        "📚 TEMAS VÁLIDOS:",
        temasNormalizados
      );

    }
    catch (err) {

      console.error(
        "❌ ERROR CARGANDO TEMAS:",
        err
      );


      setError(
        err?.message ||

        "No se pudieron cargar los temas."

      );

    }
    finally {

      setCargandoTemas(false);

    }

  }
  // ==========================================================
  // SELECCIONAR TEMA
  //
  // FLUJO:
  //
  // experiencia formativa
  //       ↓
  // tema
  //       ↓
  // actividades de ese tema
  //
  // ==========================================================

  async function seleccionarTema(
    tema
  ) {

    if (!tema) {

      return;

    }


    const topicId =
      obtenerIdTema(
        tema
      );


    if (!topicId) {

      setError(
        "El tema seleccionado no tiene topicId."
      );

      return;

    }


    console.log(
      "📌 TEMA SELECCIONADO:",
      {
        topicId,
        nombre:
          obtenerNombreTema(
            tema
          )
      }
    );


    // --------------------------------------------------------
    // ACTUALIZAR SELECCIÓN
    // --------------------------------------------------------

    setTemaSeleccionado(
      tema
    );


    // --------------------------------------------------------
    // LIMPIAR ACTIVIDADES Y ENTREGAS ANTERIORES
    // --------------------------------------------------------

    setActividades(
      []
    );


    setEntregas(
      {}
    );


    setError("");


    if (!courseId) {

      setError(
        "Primero debe seleccionarse una experiencia formativa."
      );

      return;

    }


    try {

      setCargandoActividades(true);


      // ------------------------------------------------------
      // OBTENER TODAS LAS ACTIVIDADES DEL CURSO
      // ------------------------------------------------------

      const resultado =
        await classroomObtenerActividades(
          courseId
        );


      console.log(
        "📝 TODAS LAS ACTIVIDADES:",
        resultado
      );


      const todasLasActividades =

        Array.isArray(resultado)

          ? resultado

          : [];


      // ------------------------------------------------------
      // FILTRAR POR TOPIC ID
      // ------------------------------------------------------

      const actividadesDelTema =

        todasLasActividades.filter(
          actividad => {

            const actividadTopicId =
              obtenerTopicId(
                actividad
              );


            const pertenece =
              actividadTopicId ===
              topicId;


            console.log(
              "🔎 ACTIVIDAD → TEMA:",
              {
                titulo:
                  obtenerTitulo(
                    actividad
                  ),

                actividadTopicId,

                topicId,

                pertenece
              }
            );


            return pertenece;

          }
        );


      console.log(
        "📌 ACTIVIDADES DEL TEMA:",
        actividadesDelTema
      );


      setActividades(
        actividadesDelTema
      );


      if (
        actividadesDelTema.length === 0
      ) {

        console.warn(
          "⚠️ El tema no tiene actividades."
        );

      }

    }
    catch (err) {

      console.error(
        "❌ ERROR CARGANDO ACTIVIDADES DEL TEMA:",
        err
      );


      setError(
        err?.message ||

        "No se pudieron cargar las actividades del tema."

      );

    }
    finally {

      setCargandoActividades(false);

    }

  }
  // ==========================================================
  // ENTREGABLES RECONOCIDOS
  // ==========================================================

  const entregables =
    useMemo(() => {

      const resultado = {

        EN1: null,

        EN2: null,

        EN3: null

      };


      actividades.forEach(
        actividad => {

          const codigo =
            reconocerEntregable(
              actividad
            );


          if (!codigo) {

            return;

          }


          // --------------------------------------------------
          // Si existen duplicados, conservamos el primero.
          // --------------------------------------------------

          if (
            !resultado[codigo]
          ) {

            resultado[codigo] =
              actividad;

          }

        }
      );


      console.log(
        "🎯 ENTREGABLES RECONOCIDOS:",
        resultado
      );


      return resultado;

    }, [
      actividades
    ]);


  // ==========================================================
  // ACTIVIDAD REVISOR
  // ==========================================================

  const actividadRevisor =
    useMemo(() => {

      const revisor =
        actividades.find(
          actividad =>
            esRevisorInformes(
              actividad
            )
        ) || null;


      console.log(
        "🟣 REVISOR DE INFORMES:",
        revisor
      );


      return revisor;

    }, [
      actividades
    ]);


  // ==========================================================
  // INFORMACIÓN DE ENTREGABLES
  // ==========================================================

  const resumenEntregables =
    useMemo(() => {

      return ENTREGABLES_OBJETIVO.map(
        codigo => {

          const actividad =
            entregables[codigo];


          return {

            codigo,

            encontrado:
              Boolean(
                actividad
              ),

            titulo:
              actividad
                ? obtenerTitulo(
                  actividad
                )
                : "",

            courseWorkId:
              actividad
                ? obtenerCourseWorkId(
                  actividad
                )
                : "",

            puntajeMaximo:
              PUNTAJE_POR_ENTREGABLE

          };

        }
      );

    }, [
      entregables
    ]);
  // ==========================================================
  // CARGAR ENTREGAS DE EN1 / EN2 / EN3
  // ==========================================================

  async function cargarEntregas(
    codigo
  ) {

    if (
      !ENTREGABLES_OBJETIVO.includes(
        codigo
      )
    ) {

      setError(
        `Código de entregable inválido: ${codigo}`
      );

      return;

    }


    const actividad =
      entregables[codigo];


    if (!actividad) {

      setError(
        `${codigo} no fue encontrado dentro del tema seleccionado.`
      );

      return;

    }


    const actividadId =
      obtenerCourseWorkId(
        actividad
      );


    if (!actividadId) {

      setError(
        `No se encontró courseWorkId para ${codigo}.`
      );

      console.error(
        "❌ ACTIVIDAD SIN COURSEWORK ID:",
        actividad
      );

      return;

    }


    try {

      setError("");

      setCargandoEntregas(true);


      console.log(
        "📥 CARGANDO ENTREGAS:",
        {

          codigo,

          courseId,

          courseWorkId:
            actividadId,

          titulo:
            obtenerTitulo(
              actividad
            )

        }
      );


      const resultado =
        await classroomObtenerEntregas(
          courseId,
          actividadId
        );


      const lista =

        Array.isArray(resultado)

          ? resultado

          : [];


      console.log(
        `📦 ENTREGAS ${codigo}:`,
        lista
      );


      setEntregas(
        anterior => ({

          ...anterior,

          [codigo]:
            lista

        })
      );


    }
    catch (err) {

      console.error(
        `❌ ERROR CARGANDO ENTREGAS ${codigo}:`,
        err
      );


      setError(
        err?.message ||

        `No se pudieron cargar las entregas de ${codigo}.`

      );

    }
    finally {

      setCargandoEntregas(false);

    }

  }


  // ==========================================================
  // CARGAR LAS 3 ENTREGAS
  //
  // Esto NO califica.
  // Solo obtiene los documentos/submissions.
  //
  // ==========================================================

  async function cargarTodasLasEntregas() {

    for (
      const codigo
      of ENTREGABLES_OBJETIVO
    ) {

      if (
        entregables[codigo]
      ) {

        await cargarEntregas(
          codigo
        );

      }

    }

  }
  // ==========================================================
  // RESUMEN DE ENTREGAS POR ENTREGABLE
  // ==========================================================

  const resumenEntregas =
    useMemo(() => {

      const resultado = {};


      ENTREGABLES_OBJETIVO.forEach(
        codigo => {

          const lista =
            Array.isArray(
              entregas[codigo]
            )
              ? entregas[codigo]
              : [];


          resultado[codigo] = {

            entregable:
              codigo,

            puntosMaximos:
              PUNTAJE_POR_ENTREGABLE,

            totalEntregas:
              lista.length,

            entregas:
              lista

          };

        }
      );


      return resultado;

    }, [
      entregas
    ]);


  // ==========================================================
  // OBTENER INFORMACIÓN DE UNA ENTREGA
  // ==========================================================

  function obtenerInformacionEntrega(
    entrega
  ) {

    if (!entrega) {

      return {

        id: "",

        userId: "",

        nombre: "",

        email: "",

        estado: "",

        puntos: null,

        documentos: [],

        raw: null

      };

    }


    const profile =
      entrega?.userProfile ||
      entrega?.profile ||
      entrega?.student ||
      entrega?.estudiante ||
      {};


    const name =
      profile?.name ||
      profile?.nombre ||
      {};


    const nombre =

      name?.fullName ||

      name?.fullName ||

      entrega?.studentName ||

      entrega?.nombre ||

      entrega?.nombreCompleto ||

      entrega?.userName ||

      "Alumno";


    const userId =

      entrega?.userId ||

      entrega?.userID ||

      entrega?.userid ||

      entrega?.studentId ||

      entrega?.studentID ||

      entrega?.student?.userId ||

      "";


    const email =

      profile?.emailAddress ||

      profile?.email ||

      entrega?.emailAddress ||

      entrega?.email ||

      entrega?.correo ||

      "";


    const estado =

      entrega?.state ||

      entrega?.status ||

      entrega?.estado ||

      "";


    const puntos =

      entrega?.assignedGrade ??

      entrega?.assignedPoints ??

      entrega?.grade ??

      entrega?.puntaje ??

      null;


    const documentos =

      entrega?.assignmentSubmission?.attachments ||

      entrega?.attachments ||

      entrega?.documentos ||

      [];


    return {

      id:

        String(

          entrega?.id ||

          entrega?.studentSubmissionId ||

          ""

        ).trim(),


      userId:

        String(
          userId
        ).trim(),


      nombre:

        String(
          nombre
        ).trim(),


      email:

        String(
          email
        ).trim(),


      estado:

        String(
          estado
        ).trim(),


      puntos,

      documentos:

        Array.isArray(
          documentos
        )
          ? documentos
          : [],


      raw:
        entrega

    };

  }
  // ==========================================================
  // CALCULAR PUNTAJE DE UN ENTREGABLE
  //
  // puntos = 2 - descuento
  //
  // El descuento será producido posteriormente por el
  // analizador de documentos según los lineamientos.
  //
  // ==========================================================

  function calcularPuntajeEntregable(
    descuento
  ) {

    const numero =
      Number(
        descuento
      );


    if (
      Number.isNaN(
        numero
      )
    ) {

      return null;

    }


    const puntos =
      PUNTAJE_POR_ENTREGABLE -
      numero;


    return Math.max(
      0,
      puntos
    );

  }


  // ==========================================================
  // CALCULAR NOTA FINAL
  //
  // EN1 + EN2 + EN3
  //
  // Cada EN tiene máximo 2 puntos.
  //
  // Máximo total = 6 puntos.
  //
  // ==========================================================

  function calcularNotaFinal({
    EN1,
    EN2,
    EN3
  }) {

    const valores = [

      EN1,

      EN2,

      EN3

    ];


    const suma =
      valores.reduce(
        (
          total,
          valor
        ) => {

          const numero =
            Number(
              valor
            );


          if (
            Number.isNaN(
              numero
            )
          ) {

            return total;

          }


          return (
            total +
            numero
          );

        },
        0
      );


    return Math.max(
      0,
      suma
    );

  }
  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
        maxWidth: "1400px",
        margin: "0 auto",


      }}
    >

      <h2
        style={{
          margin: "0 0 8px 0",
          fontSize: "28px",
          fontWeight: "700",
          color: "#111827"
        }}
      >
        Revisión de Informes — Google Classroom
      </h2>


      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && (

        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px"
          }}
        >

          {error}

        </div>

      )}


      {/* ====================================================
          PASO 1 — EXPERIENCIA FORMATIVA
      ==================================================== */}

      <section>
        <h3
          style={{
            margin: "24px 0 12px 0",
            padding: "14px 18px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            fontSize: "17px",
            fontWeight: "700",
            color: "#1f2937",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)"
          }}
        >
          1. Experiencia Formativa
        </h3>




        <select
          value={courseId}
          onChange={event =>
            seleccionarCurso(
              event.target.value
            )
          }
          disabled={
            cargandoCursos
          }
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        >

          <option value="">
            Seleccionar experiencia formativa
          </option>


          {cursos.map(
            curso => {

              const id =
                String(

                  curso?.id ||

                  curso?.courseId ||

                  ""

                );


              const nombre =

                curso?.name ||

                curso?.nombre ||

                curso?.courseName ||

                "Experiencia formativa sin nombre";


              return (

                <option
                  key={id}
                  value={id}
                >

                  {nombre}

                </option>

              );

            }
          )}

        </select>

      </section>


      {/* ====================================================
          PASO 2 — TEMAS
      ==================================================== */}
      {courseId && (

        <section
          style={{
            marginTop: "24px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "22px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px"
            }}
          >

            <div>

              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#111827"
                }}
              >
                2. Temas
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#6b7280"
                }}
              >
                Selecciona el tema que deseas revisar.
              </p>

            </div>

            {!cargandoTemas && temas.length > 0 && (

              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "999px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  fontSize: "12px",
                  fontWeight: "600"
                }}
              >
                {temas.length} temas
              </span>

            )}

          </div>


          {cargandoTemas && (

            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#6b7280"
              }}
            >
              Cargando temas...
            </div>

          )}


          {!cargandoTemas &&
            temas.length === 0 && (

              <div
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  background: "#f9fafb",
                  color: "#6b7280",
                  fontSize: "14px"
                }}
              >
                No se encontraron temas para esta
                experiencia formativa.
              </div>

            )}


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "12px"
            }}
          >

            {temas.map(
              tema => {

                const id =
                  obtenerIdTema(
                    tema
                  );


                const nombre =
                  obtenerNombreTema(
                    tema
                  );


                const activo =
                  obtenerIdTema(
                    temaSeleccionado
                  ) ===
                  id;


                return (

                  <button
                    key={id}
                    onClick={() =>
                      seleccionarTema(
                        tema
                      )
                    }
                    style={{
                      padding: "16px 18px",
                      textAlign: "left",
                      borderRadius: "12px",
                      border:
                        activo
                          ? "2px solid #2563eb"
                          : "1px solid #e5e7eb",
                      background:
                        activo
                          ? "#eff6ff"
                          : "#ffffff",
                      color:
                        activo
                          ? "#1d4ed8"
                          : "#374151",
                      cursor: "pointer",
                      transition:
                        "all 0.2s ease",
                      boxShadow:
                        activo
                          ? "0 3px 8px rgba(37, 99, 235, 0.12)"
                          : "0 1px 3px rgba(0, 0, 0, 0.03)"
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >

                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background:
                            activo
                              ? "#2563eb"
                              : "#d1d5db",
                          flexShrink: 0
                        }}
                      />

                      <strong
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.4"
                        }}
                      >
                        {nombre}
                      </strong>

                    </div>

                  </button>

                );

              }
            )}

          </div>

        </section>

      )}



      {/* ====================================================
          PASO 3 — ACTIVIDADES DEL TEMA
      ==================================================== */}

      {temaSeleccionado && (

        <section
          style={{
            marginTop: "30px"
          }}
        >

          <h3>
            3. Actividades del tema
          </h3>


          {cargandoActividades && (

            <p>
              Cargando actividades...
            </p>

          )}


          {!cargandoActividades &&
            actividades.length === 0 && (

              <p>
                Este tema no tiene actividades.
              </p>

            )}


          {!cargandoActividades &&
            actividades.length > 0 && (

              <div
                style={{
                  display: "grid",
                  gap: "12px"
                }}
              >

                {actividades.map(
                  actividad => {

                    const codigo =
                      reconocerEntregable(
                        actividad
                      );


                    const esRevisor =
                      esRevisorInformes(
                        actividad
                      );


                    return (

                      <div
                        key={
                          obtenerCourseWorkId(
                            actividad
                          ) ||
                          obtenerTitulo(
                            actividad
                          )
                        }
                        style={{
                          padding: "16px",
                          border:
                            "1px solid #ddd",
                          borderRadius: "10px",
                          background: "#fff"
                        }}
                      >

                        <strong>
                          {obtenerTitulo(
                            actividad
                          )}
                        </strong>


                        {codigo && (

                          <div
                            style={{
                              marginTop: "8px",
                              color: "#2563eb",
                              fontWeight: "bold"
                            }}
                          >

                            {codigo}

                          </div>

                        )}


                        {esRevisor && (

                          <div
                            style={{
                              marginTop: "8px",
                              color: "#7c3aed",
                              fontWeight: "bold"
                            }}
                          >

                            REVISOR DE INFORMES

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
      {/* ====================================================
    PASO 4 — ENTREGABLES RECONOCIDOS
==================================================== */}

      {temaSeleccionado && (

        <section
          style={{
            marginTop: "30px"
          }}
        >

          <h3
            style={{
              marginBottom: "16px",
              color: "#111827",
              fontSize: "20px",
              fontWeight: "700"
            }}
          >
            4. Entregables
          </h3>


          {/* =================================================
        TARJETAS EN1 / EN2 / EN3
    ================================================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              alignItems: "stretch"
            }}
          >

            {resumenEntregables.map(
              item => {

                const actividad =
                  entregables[item.codigo];


                return (

                  <div
                    key={item.codigo}
                    style={{
                      padding: "20px",
                      borderRadius: "16px",

                      border:
                        item.encontrado
                          ? "1px solid #bbf7d0"
                          : "1px solid #e5e7eb",

                      background:
                        item.encontrado
                          ? "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)"
                          : "#f9fafb",

                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.06)"
                    }}
                  >

                    {/* CABECERA */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >

                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",

                            background:
                              item.encontrado
                                ? "#16a34a"
                                : "#e5e7eb",

                            color:
                              item.encontrado
                                ? "#ffffff"
                                : "#6b7280",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            fontWeight: "700",
                            fontSize: "15px"
                          }}
                        >
                          {item.codigo}
                        </div>


                        <div>

                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "700",
                              color: "#111827"
                            }}
                          >
                            {item.encontrado
                              ? "Entregable encontrado"
                              : "Entregable no encontrado"}
                          </div>


                          <div
                            style={{
                              fontSize: "13px",
                              color: "#6b7280",
                              marginTop: "3px"
                            }}
                          >
                            {item.encontrado
                              ? "Disponible para revisión"
                              : "Aún no existe en este tema"}
                          </div>

                        </div>

                      </div>


                      {/* ESTADO */}

                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "999px",
                          fontSize: "11px",
                          fontWeight: "700",

                          background:
                            item.encontrado
                              ? "#dcfce7"
                              : "#f3f4f6",

                          color:
                            item.encontrado
                              ? "#166534"
                              : "#6b7280"
                        }}
                      >
                        {item.encontrado
                          ? "DISPONIBLE"
                          : "PENDIENTE"}
                      </span>

                    </div>


                    {/* CONTENIDO */}

                    {actividad ? (

                      <>

                        {/* TÍTULO */}

                        <div
                          style={{
                            padding: "14px",
                            background: "#ffffff",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                            marginBottom: "14px"
                          }}
                        >

                          <div
                            style={{
                              fontSize: "11px",
                              color: "#6b7280",
                              fontWeight: "700",
                              marginBottom: "5px"
                            }}
                          >
                            ACTIVIDAD
                          </div>


                          <div
                            style={{
                              fontWeight: "600",
                              color: "#1f2937",
                              lineHeight: "1.4"
                            }}
                          >
                            {item.titulo}
                          </div>

                        </div>


                        {/* INFORMACIÓN */}

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "1fr 1fr",
                            gap: "10px",
                            marginBottom: "16px"
                          }}
                        >

                          {/* VALOR */}

                          <div
                            style={{
                              padding: "12px",
                              borderRadius: "10px",
                              background: "#eff6ff"
                            }}
                          >

                            <div
                              style={{
                                fontSize: "11px",
                                color: "#6b7280",
                                fontWeight: "600"
                              }}
                            >
                              VALOR
                            </div>


                            <div
                              style={{
                                marginTop: "4px",
                                fontSize: "18px",
                                fontWeight: "700",
                                color: "#2563eb"
                              }}
                            >
                              {PUNTAJE_POR_ENTREGABLE} pts
                            </div>

                          </div>


                          {/* COURSEWORK ID */}

                          <div
                            style={{
                              padding: "12px",
                              borderRadius: "10px",
                              background: "#f9fafb"
                            }}
                          >

                            <div
                              style={{
                                fontSize: "11px",
                                color: "#6b7280",
                                fontWeight: "600"
                              }}
                            >
                              COURSEWORK ID
                            </div>


                            <div
                              style={{
                                marginTop: "4px",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#374151",
                                wordBreak: "break-all"
                              }}
                            >
                              {item.courseWorkId}
                            </div>

                          </div>

                        </div>


                        {/* BOTÓN */}

                        <button
                          onClick={() =>
                            cargarEntregas(
                              item.codigo
                            )
                          }
                          disabled={
                            cargandoEntregas
                          }
                          style={{
                            width: "100%",
                            padding: "11px 16px",
                            borderRadius: "10px",
                            border: "none",

                            background:
                              cargandoEntregas
                                ? "#93c5fd"
                                : "#2563eb",

                            color: "#ffffff",

                            fontWeight: "600",
                            fontSize: "14px",

                            cursor:
                              cargandoEntregas
                                ? "not-allowed"
                                : "pointer",

                            boxShadow:
                              "0 3px 8px rgba(37,99,235,0.25)"
                          }}
                        >
                          {cargandoEntregas
                            ? "Cargando entregas..."
                            : "📂 Ver entregas"}
                        </button>

                      </>

                    ) : (

                      <div
                        style={{
                          padding: "14px",
                          borderRadius: "10px",
                          background: "#ffffff",
                          border: "1px dashed #d1d5db",
                          color: "#6b7280",
                          fontSize: "14px",
                          lineHeight: "1.5"
                        }}
                      >
                        ⚠️ No se encontró este entregable
                        dentro del tema.
                      </div>

                    )}

                  </div>

                );

              }
            )}

          </div>


          {/* =================================================
        CARGAR TODAS LAS ENTREGAS
    ================================================= */}

          <div
            style={{
              marginTop: "24px",
              padding: "18px",
              borderRadius: "14px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              gap: "16px",
              flexWrap: "wrap"
            }}
          >

            <div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "4px"
                }}
              >
                📚 Cargar todas las entregas
              </div>


              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280"
                }}
              >
                Obtiene las entregas disponibles de EN1, EN2 y EN3.
              </div>

            </div>


            <button
              onClick={
                cargarTodasLasEntregas
              }
              disabled={
                cargandoEntregas
              }
              style={{
                padding: "11px 20px",
                borderRadius: "10px",
                border: "none",

                background:
                  cargandoEntregas
                    ? "#9ca3af"
                    : "#111827",

                color: "#ffffff",

                fontSize: "14px",
                fontWeight: "600",

                cursor:
                  cargandoEntregas
                    ? "not-allowed"
                    : "pointer",

                boxShadow:
                  "0 3px 8px rgba(17,24,39,0.18)",

                transition:
                  "all 0.2s ease"
              }}
            >

              {cargandoEntregas
                ? "⏳ Cargando entregas..."
                : "📥 Cargar EN1 + EN2 + EN3"}

            </button>

          </div>

        </section>

      )}

      {/* ====================================================
    PASO 5 — ENTREGAS DE ESTUDIANTES
==================================================== */}

      {
        temaSeleccionado && (

          <section
            style={{
              marginTop: "36px"
            }}
          >

            {/* ==================================================
          CABECERA
      ================================================== */}

            <div
              style={{
                marginBottom: "20px"
              }}
            >

              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827"
                }}
              >
                5. Entregas de estudiantes
              </h3>

              <p
                style={{
                  marginTop: "6px",
                  marginBottom: 0,
                  fontSize: "14px",
                  color: "#6b7280"
                }}
              >
                Revisa las entregas recibidas de cada estudiante.
              </p>

            </div>


            {/* ==================================================
          ENTREGABLES
      ================================================== */}

            {ENTREGABLES_OBJETIVO.map(
              codigo => {

                const lista =
                  Array.isArray(
                    entregas[codigo]
                  )
                    ? entregas[codigo]
                    : [];


                if (
                  !entregables[codigo]
                ) {

                  return null;

                }


                return (

                  <div
                    key={codigo}
                    style={{
                      marginBottom: "24px",
                      borderRadius: "16px",
                      border: "1px solid #e5e7eb",
                      background: "#ffffff",
                      boxShadow:
                        "0 4px 14px rgba(0,0,0,0.05)",
                      overflow: "hidden"
                    }}
                  >

                    {/* ==========================================
                  CABECERA DEL ENTREGABLE
              ========================================== */}

                    <div
                      style={{
                        padding: "18px 20px",
                        background:
                          "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
                        borderBottom:
                          "1px solid #e5e7eb"
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap"
                        }}
                      >

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                          }}
                        >

                          <div
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "12px",
                              background: "#2563eb",
                              color: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "700",
                              fontSize: "14px",
                              flexShrink: 0
                            }}
                          >
                            {codigo}
                          </div>


                          <div>

                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: "700",
                                color: "#111827"
                              }}
                            >
                              {codigo}
                            </div>


                            <div
                              style={{
                                marginTop: "3px",
                                fontSize: "13px",
                                color: "#6b7280"
                              }}
                            >
                              {obtenerTitulo(
                                entregables[codigo]
                              )}
                            </div>

                          </div>

                        </div>


                        {/* CONTADOR */}

                        <div
                          style={{
                            padding: "7px 12px",
                            borderRadius: "999px",
                            background: "#dbeafe",
                            color: "#1d4ed8",
                            fontSize: "12px",
                            fontWeight: "700"
                          }}
                        >
                          {lista.length}{" "}
                          {lista.length === 1
                            ? "entrega"
                            : "entregas"}
                        </div>

                      </div>

                    </div>


                    {/* ==========================================
                  CONTENIDO
              ========================================== */}

                    <div
                      style={{
                        padding: "20px"
                      }}
                    >

                      {lista.length === 0 ? (

                        <div
                          style={{
                            padding: "24px",
                            borderRadius: "12px",
                            background: "#f9fafb",
                            border: "1px dashed #d1d5db",
                            textAlign: "center",
                            color: "#6b7280"
                          }}
                        >

                          <div
                            style={{
                              fontSize: "28px",
                              marginBottom: "8px"
                            }}
                          >
                            📭
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600"
                            }}
                          >
                            No hay entregas cargadas.
                          </div>

                        </div>

                      ) : (

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "14px"
                          }}
                        >

                          {lista.map(
                            (
                              entrega,
                              index
                            ) => {

                              const info =
                                obtenerInformacionEntrega(
                                  entrega
                                );


                              return (

                                <div
                                  key={
                                    info.id ||
                                    `${codigo}-${index}`
                                  }
                                  style={{
                                    padding: "16px",
                                    borderRadius: "14px",
                                    border:
                                      "1px solid #e5e7eb",
                                    background: "#ffffff",
                                    boxShadow:
                                      "0 2px 8px rgba(0,0,0,0.04)"
                                  }}
                                >

                                  {/* ==================================
                                ALUMNO
                            ================================== */}

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "12px",
                                      marginBottom: "14px"
                                    }}
                                  >

                                    <div
                                      style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        background: "#e0e7ff",
                                        color: "#4338ca",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        flexShrink: 0
                                      }}
                                    >
                                      {(info.nombre || "A")
                                        .charAt(0)
                                        .toUpperCase()}
                                    </div>


                                    <div
                                      style={{
                                        minWidth: 0
                                      }}
                                    >

                                      <div
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "700",
                                          color: "#111827",
                                          wordBreak: "break-word"
                                        }}
                                      >
                                        {info.nombre}
                                      </div>


                                      {info.email && (

                                        <div
                                          style={{
                                            marginTop: "3px",
                                            fontSize: "12px",
                                            color: "#6b7280",
                                            wordBreak: "break-word"
                                          }}
                                        >
                                          {info.email}
                                        </div>

                                      )}

                                    </div>

                                  </div>


                                  {/* ==================================
                                ESTADO
                            ================================== */}

                                  {info.estado && (

                                    <div
                                      style={{
                                        marginBottom: "12px"
                                      }}
                                    >

                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          padding: "5px 10px",
                                          borderRadius: "999px",
                                          background:
                                            info.estado ===
                                              "TURNED_IN"
                                              ? "#dcfce7"
                                              : "#f3f4f6",
                                          color:
                                            info.estado ===
                                              "TURNED_IN"
                                              ? "#166534"
                                              : "#6b7280",
                                          fontSize: "11px",
                                          fontWeight: "700"
                                        }}
                                      >

                                        {info.estado ===
                                          "TURNED_IN"
                                          ? "✓ ENTREGADO"
                                          : info.estado}

                                      </span>

                                    </div>

                                  )}


                                  {/* ==================================
                                USER ID
                            ================================== */}

                                  {info.userId && (

                                    <div
                                      style={{
                                        padding: "10px",
                                        borderRadius: "9px",
                                        background: "#f9fafb",
                                        marginBottom: "12px"
                                      }}
                                    >

                                      <div
                                        style={{
                                          fontSize: "10px",
                                          color: "#9ca3af",
                                          fontWeight: "700",
                                          marginBottom: "3px"
                                        }}
                                      >
                                        USER ID
                                      </div>


                                      <div
                                        style={{
                                          fontSize: "11px",
                                          color: "#4b5563",
                                          wordBreak: "break-all"
                                        }}
                                      >
                                        {info.userId}
                                      </div>

                                    </div>

                                  )}


                                  {/* ==================================
                                DOCUMENTOS
                            ================================== */}

                                  <div
                                    style={{
                                      marginTop: "12px"
                                    }}
                                  >

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent:
                                          "space-between",
                                        alignItems: "center",
                                        marginBottom: "8px"
                                      }}
                                    >

                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "700",
                                          color: "#374151"
                                        }}
                                      >
                                        📎 Documentos
                                      </span>


                                      <span
                                        style={{
                                          fontSize: "11px",
                                          fontWeight: "700",
                                          color: "#2563eb"
                                        }}
                                      >
                                        {info.documentos.length}
                                      </span>

                                    </div>


                                    {info.documentos.length >
                                      0 ? (

                                      <div
                                        style={{
                                          display: "grid",
                                          gap: "6px"
                                        }}
                                      >

                                        {info.documentos.map(
                                          (
                                            documento,
                                            documentoIndex
                                          ) => (

                                            <div
                                              key={
                                                documento?.id ||
                                                documentoIndex
                                              }
                                              style={{
                                                padding:
                                                  "9px 10px",
                                                borderRadius:
                                                  "8px",
                                                background:
                                                  "#f8fafc",
                                                border:
                                                  "1px solid #e5e7eb",
                                                fontSize:
                                                  "12px",
                                                color:
                                                  "#374151",
                                                wordBreak:
                                                  "break-word"
                                              }}
                                            >

                                              📄{" "}
                                              {documento?.title ||
                                                documento?.name ||
                                                documento?.driveFile?.title ||
                                                "Documento sin nombre"}

                                            </div>

                                          )
                                        )}

                                      </div>

                                    ) : (

                                      <div
                                        style={{
                                          padding: "10px",
                                          borderRadius: "8px",
                                          background: "#f9fafb",
                                          color: "#9ca3af",
                                          fontSize: "12px"
                                        }}
                                      >
                                        No hay archivos adjuntos.
                                      </div>

                                    )}

                                  </div>


                                  {/* ==================================
                                ZONA PARA CALIFICACIÓN
                            ================================== */}

                                  <div
                                    style={{
                                      marginTop: "16px",
                                      paddingTop: "14px",
                                      borderTop:
                                        "1px solid #e5e7eb"
                                    }}
                                  >

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent:
                                          "space-between",
                                        alignItems: "center"
                                      }}
                                    >

                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#6b7280",
                                          fontWeight: "600"
                                        }}
                                      >
                                        Calificación
                                      </span>


                                      <span
                                        style={{
                                          fontSize: "13px",
                                          color: "#9ca3af"
                                        }}
                                      >
                                        Pendiente
                                      </span>

                                    </div>

                                  </div>

                                </div>

                              );

                            }
                          )}

                        </div>

                      )}

                    </div>

                  </div>

                );

              }
            )}

          </section>

        )
      }

      {/* ====================================================
    PASO 6 — ACTIVIDAD DESTINO
==================================================== */}

      {
        temaSeleccionado && (

          <section
            style={{
              marginTop: "30px",
              padding: "22px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)",
              border: "1px solid #ddd6fe",
              boxShadow:
                "0 4px 14px rgba(0,0,0,0.05)"
            }}
          >

            {/* ================================================
          CABECERA
      ================================================ */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px"
              }}
            >

              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#7c3aed",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "700"
                }}
              >
                6
              </div>


              <div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111827"
                  }}
                >
                  Actividad destino de calificación
                </h3>


                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "13px",
                    color: "#6b7280"
                  }}
                >
                  Aquí se enviará posteriormente la calificación
                  final del estudiante.
                </p>

              </div>

            </div>


            {actividadRevisor ? (

              <>

                {/* ==============================================
              ACTIVIDAD ENCONTRADA
          ============================================== */}

                <div
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "#ffffff",
                    border: "1px solid #ddd6fe",
                    marginBottom: "16px"
                  }}
                >

                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#7c3aed",
                      marginBottom: "6px"
                    }}
                  >
                    ACTIVIDAD DESTINO
                  </div>


                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#111827",
                      lineHeight: "1.4"
                    }}
                  >
                    {obtenerTitulo(
                      actividadRevisor
                    )}
                  </div>


                  <div
                    style={{
                      marginTop: "12px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "#f9fafb",
                      color: "#4b5563",
                      fontSize: "12px",
                      wordBreak: "break-all"
                    }}
                  >

                    <strong>
                      CourseWork ID:
                    </strong>

                    {" "}

                    {obtenerCourseWorkId(
                      actividadRevisor
                    )}

                  </div>

                </div>


                {/* ==============================================
              INFORMACIÓN
          ============================================== */}

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#faf5ff",
                    border: "1px solid #e9d5ff",
                    marginBottom: "16px"
                  }}
                >

                  <div
                    style={{
                      fontSize: "14px",
                      color: "#581c87",
                      fontWeight: "600",
                      lineHeight: "1.5"
                    }}
                  >
                    Esta actividad recibirá posteriormente
                    la suma de EN1 + EN2 + EN3.
                  </div>

                </div>


                {/* ==============================================
              FÓRMULA
          ============================================== */}

                <div
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "#ffffff",
                    border: "1px solid #e5e7eb"
                  }}
                >

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#6b7280",
                      marginBottom: "12px"
                    }}
                  >
                    FÓRMULA FINAL
                  </div>


                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "10px",
                      background: "#f5f3ff",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#6d28d9",
                      letterSpacing: "1px"
                    }}
                  >
                    EN1 + EN2 + EN3
                  </div>


                  {/* ==========================================
                INFORMACIÓN DE PUNTAJE
            ========================================== */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "10px",
                      marginTop: "14px"
                    }}
                  >

                    <div
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "#eff6ff"
                      }}
                    >

                      <div
                        style={{
                          fontSize: "11px",
                          color: "#6b7280",
                          fontWeight: "700"
                        }}
                      >
                        VALOR POR ENTREGABLE
                      </div>


                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#2563eb"
                        }}
                      >
                        {PUNTAJE_POR_ENTREGABLE} pts
                      </div>

                    </div>


                    <div
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "#f0fdf4"
                      }}
                    >

                      <div
                        style={{
                          fontSize: "11px",
                          color: "#6b7280",
                          fontWeight: "700"
                        }}
                      >
                        MÁXIMO TOTAL
                      </div>


                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#16a34a"
                        }}
                      >
                        {PUNTAJE_POR_ENTREGABLE *
                          ENTREGABLES_OBJETIVO.length}{" "}
                        pts
                      </div>

                    </div>

                  </div>

                </div>

              </>

            ) : (

              /* ================================================
                 ACTIVIDAD NO ENCONTRADA
              ================================================ */

              <div
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#fff7ed",
                  border: "1px dashed #fdba74",
                  color: "#9a3412"
                }}
              >

                <div
                  style={{
                    fontSize: "24px",
                    marginBottom: "8px"
                  }}
                >
                  ⚠️
                </div>


                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    marginBottom: "4px"
                  }}
                >
                  Actividad destino no encontrada
                </div>


                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.5"
                  }}
                >
                  No se encontró la actividad
                  {" "}
                  <strong>
                    "REVISOR DE INFORMES"
                  </strong>
                  {" "}
                  dentro de este tema.
                </div>

              </div>

            )}

          </section>

        )
      }

    </div>

  );

}
