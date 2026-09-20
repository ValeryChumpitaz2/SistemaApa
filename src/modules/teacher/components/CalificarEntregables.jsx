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
        padding: "24px",
        fontFamily: "Arial, sans-serif"
      }}
    >

      <h2>
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

        <h3>
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
            marginTop: "30px"
          }}
        >

          <h3>
            2. Temas
          </h3>


          {cargandoTemas && (

            <p>
              Cargando temas...
            </p>

          )}


          {!cargandoTemas &&
            temas.length === 0 && (

              <p>
                No se encontraron temas para esta
                experiencia formativa.
              </p>

            )}


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",
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
                      padding: "16px",
                      textAlign: "left",
                      borderRadius: "10px",
                      border:
                        activo
                          ? "2px solid #2563eb"
                          : "1px solid #d1d5db",
                      background:
                        activo
                          ? "#eff6ff"
                          : "#fff",
                      cursor: "pointer"
                    }}
                  >

                    <strong>
                      {nombre}
                    </strong>

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

          <h3>
            4. Entregables
          </h3>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px"
            }}
          >

            {resumenEntregables.map(
              item => {

                const actividad =
                  entregables[
                    item.codigo
                  ];


                return (

                  <div
                    key={item.codigo}
                    style={{
                      padding: "18px",
                      borderRadius: "10px",
                      border:
                        item.encontrado
                          ? "2px solid #16a34a"
                          : "1px solid #d1d5db",
                      background:
                        item.encontrado
                          ? "#f0fdf4"
                          : "#f9fafb"
                    }}
                  >

                    <h4>
                      {item.codigo}
                    </h4>


                    {actividad ? (

                      <>

                        <p>
                          <strong>
                            {item.titulo}
                          </strong>
                        </p>


                        <p>
                          Valor:
                          {" "}
                          {PUNTAJE_POR_ENTREGABLE}
                          {" "}
                          puntos
                        </p>


                        <p>
                          CourseWork ID:
                          {" "}
                          {item.courseWorkId}
                        </p>


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
                            padding:
                              "8px 14px",
                            borderRadius:
                              "8px",
                            border:
                              "none",
                            background:
                              "#2563eb",
                            color:
                              "#fff",
                            cursor:
                              "pointer"
                          }}
                        >

                          Ver entregas

                        </button>

                      </>

                    ) : (

                      <p>
                        No se encontró este entregable
                        dentro del tema.
                      </p>

                    )}

                  </div>

                );

              }
            )}

          </div>


          {/* =================================================
              CARGAR TODAS
          ================================================= */}

          <button
            onClick={
              cargarTodasLasEntregas
            }
            disabled={
              cargandoEntregas
            }
            style={{
              marginTop: "20px",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#111827",
              color: "#fff",
              cursor: "pointer"
            }}
          >

            {cargandoEntregas
              ? "Cargando entregas..."
              : "Cargar entregas EN1 + EN2 + EN3"}

          </button>

        </section>

      )}
      {/* ====================================================
          PASO 5 — ENTREGAS DE ESTUDIANTES
      ==================================================== */}

      {temaSeleccionado && (

        <section
          style={{
            marginTop: "30px"
          }}
        >

          <h3>
            5. Entregas de estudiantes
          </h3>


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
                    marginBottom: "25px",
                    padding: "20px",
                    border:
                      "1px solid #ddd",
                    borderRadius: "12px"
                  }}
                >

                  <h4>
                    {codigo}
                  </h4>


                  <p>
                    <strong>
                      Actividad:
                    </strong>
                    {" "}
                    {obtenerTitulo(
                      entregables[codigo]
                    )}
                  </p>


                  <p>
                    <strong>
                      Entregas encontradas:
                    </strong>
                    {" "}
                    {lista.length}
                  </p>


                  {lista.length === 0 ? (

                    <p>
                      No hay entregas cargadas.
                    </p>

                  ) : (

                    <div
                      style={{
                        display: "grid",
                        gap: "10px"
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
                                padding: "14px",
                                background:
                                  "#f9fafb",
                                borderRadius:
                                  "8px"
                              }}
                            >

                              <strong>
                                {info.nombre}
                              </strong>


                              {info.email && (

                                <div>
                                  {info.email}
                                </div>

                              )}


                              {info.userId && (

                                <div
                                  style={{
                                    fontSize:
                                      "12px",
                                    color:
                                      "#666"
                                  }}
                                >

                                  User ID:
                                  {" "}
                                  {info.userId}

                                </div>

                              )}


                              {info.estado && (

                                <div>
                                  Estado:
                                  {" "}
                                  {info.estado}
                                </div>

                              )}


                              <div
                                style={{
                                  marginTop:
                                    "8px"
                                }}
                              >

                                Documentos/
                                archivos:
                                {" "}
                                {info.documentos.length}

                              </div>


                              {info.documentos.length >
                                0 && (

                                <ul>

                                  {info.documentos.map(
                                    (
                                      documento,
                                      documentoIndex
                                    ) => (

                                      <li
                                        key={
                                          documento?.id ||
                                          documentoIndex
                                        }
                                      >

                                        {documento?.title ||
                                          documento?.name ||
                                          documento?.driveFile?.title ||
                                          "Documento sin nombre"}

                                      </li>

                                    )
                                  )}

                                </ul>

                              )}

                            </div>

                          );

                        }
                      )}

                    </div>

                  )}

                </div>

              );

            }
          )}

        </section>

      )}
      {/* ====================================================
          PASO 6 — ACTIVIDAD DESTINO
      ==================================================== */}

      {temaSeleccionado && (

        <section
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f5f3ff",
            borderRadius: "12px"
          }}
        >

          <h3>
            6. Actividad destino de calificación
          </h3>


          {actividadRevisor ? (

            <>

              <p>
                <strong>
                  {obtenerTitulo(
                    actividadRevisor
                  )}
                </strong>
              </p>


              <p>
                CourseWork ID:
                {" "}
                {obtenerCourseWorkId(
                  actividadRevisor
                )}
              </p>


              <p>
                Esta actividad recibirá posteriormente
                la suma de EN1 + EN2 + EN3.
              </p>


              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  background: "#fff",
                  borderRadius: "8px"
                }}
              >

                <strong>
                  Fórmula final
                </strong>


                <div
                  style={{
                    marginTop: "8px"
                  }}
                >

                  EN1 + EN2 + EN3

                </div>


                <div
                  style={{
                    marginTop: "8px",
                    color: "#666"
                  }}
                >

                  Cada entregable vale{" "}
                  {PUNTAJE_POR_ENTREGABLE}{" "}
                  puntos.

                </div>


                <div
                  style={{
                    marginTop: "8px",
                    color: "#666"
                  }}
                >

                  Máximo total:{" "}
                  {PUNTAJE_POR_ENTREGABLE *
                    ENTREGABLES_OBJETIVO.length}{" "}
                  puntos.

                </div>

              </div>

            </>

          ) : (

            <p>
              No se encontró la actividad
              "REVISOR DE INFORMES" dentro
              de este tema.
            </p>

          )}

        </section>

      )}

    </div>

  );

}
