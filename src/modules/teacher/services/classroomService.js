// ============================================================
// classroomService.js
// SERVICIO ÚNICO DE GOOGLE CLASSROOM
//
// FLUJO VG SMART REVIEW
//
// DOCENTE
//   ↓
// EXPERIENCIA FORMATIVA = COURSE
//   ↓
// TEMA = TOPIC
//   ↓
// ACTIVIDADES DEL TEMA
//   ↓
// EN1 / EN2 / EN3
//   ↓
// ENTREGAS DE ESTUDIANTES
//   ↓
// DOCUMENTO ENVIADO
//   ↓
// ANÁLISIS DEL DOCUMENTO
//   ↓
// DESCUENTO
//   ↓
// 2.00 - DESCUENTO
//   ↓
// PUNTAJE DEL ENTREGABLE
//   ↓
// EN1 + EN2 + EN3
//   ↓
// REVISOR DE INFORMES
//   ↓
// CALIFICACIÓN EN CLASSROOM
//
// IMPORTANTE:
// Este servicio NO califica automáticamente.
// Las funciones de escritura solamente se ejecutan cuando
// otra parte de la aplicación las llama explícitamente.
// ============================================================


// ============================================================
// API
// ============================================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbwAI4TnbB-roLNDcN5Do71dUC3ql7g6SMSkUhrDEiGa5ZkD3eA1JzU-XpqhvKpC4ufI/exec";


// ============================================================
// VERSION
// ============================================================

export const CLASSROOM_FRONT_VERSION = "7.1.0";


// ============================================================
// CONFIGURACIÓN
// ============================================================

const CLASSROOM_DEBUG = true;

export const PUNTAJE_POR_ENTREGABLE = 2;

export const CLASSROOM_ENTREGABLES = [
  "EN1",
  "EN2",
  "EN3"
];

// Alias interno para compatibilidad
const ENTREGABLES_OBJETIVO =
  CLASSROOM_ENTREGABLES;


// ============================================================
// LOG
// ============================================================

function classroomLog(...args) {

  if (CLASSROOM_DEBUG) {
    console.log(...args);
  }

}


function classroomWarn(...args) {

  console.warn(...args);

}


function classroomError(...args) {

  console.error(...args);

}


// ============================================================
// NORMALIZAR TEXTO
// ============================================================

export function classroomNormalizarTexto(
  texto = ""
) {

  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

}


// Alias de compatibilidad
export const normalizarTexto =
  classroomNormalizarTexto;


// ============================================================
// RECONOCER ENTREGABLE
// ============================================================

export function classroomReconocerEntregable(
  actividad
) {

  const titulo =
    actividad?.title ||
    actividad?.name ||
    actividad?.nombre ||
    actividad?.courseWorkTitle ||
    actividad?.courseworkTitle ||
    "";

  const texto =
    classroomNormalizarTexto(
      titulo
    );


  if (
    texto.includes("ENTREGABLE 1") ||
    texto.includes("ENTREGABLE1")
  ) {

    return "EN1";

  }


  if (
    texto.includes("ENTREGABLE 2") ||
    texto.includes("ENTREGABLE2")
  ) {

    return "EN2";

  }


  if (
    texto.includes("ENTREGABLE 3") ||
    texto.includes("ENTREGABLE3")
  ) {

    return "EN3";

  }


  return null;

}


// ============================================================
// RECONOCER REVISOR DE INFORMES
// ============================================================

export function classroomEsRevisorInformes(
  actividad
) {

  const titulo =
    actividad?.title ||
    actividad?.name ||
    actividad?.nombre ||
    actividad?.courseWorkTitle ||
    "";


  const texto =
    classroomNormalizarTexto(
      titulo
    );


  return (
    texto.includes("REVISOR") &&
    texto.includes("INFORME")
  );

}


// ============================================================
// OBTENER COURSE ID
// ============================================================

export function classroomObtenerCourseId(
  curso
) {

  return String(

    curso?.courseId ||
    curso?.courseID ||
    curso?.courseid ||
    curso?.id ||
    ""

  ).trim();

}


// ============================================================
// OBTENER TOPIC ID
// ============================================================

export function classroomObtenerTopicId(
  tema
) {

  return String(

    tema?.topicId ||
    tema?.topicID ||
    tema?.topicid ||
    tema?.id ||
    ""

  ).trim();

}


// ============================================================
// OBTENER COURSEWORK ID
// ============================================================

export function classroomObtenerCourseWorkId(
  actividad
) {

  return String(

    actividad?.courseWorkId ||
    actividad?.courseworkId ||
    actividad?.courseworkID ||
    actividad?.id ||
    ""

  ).trim();

}


// ============================================================
// OBTENER TÍTULO
// ============================================================

export function classroomObtenerTituloActividad(
  actividad
) {

  return String(

    actividad?.title ||
    actividad?.name ||
    actividad?.nombre ||
    actividad?.courseWorkTitle ||
    actividad?.courseworkTitle ||
    "Actividad sin título"

  ).trim();

}


// ============================================================
// OBTENER NOMBRE DEL TEMA
// ============================================================

export function classroomObtenerNombreTema(
  tema
) {

  return String(

    tema?.name ||
    tema?.nombre ||
    tema?.title ||
    "Tema sin nombre"

  ).trim();

}


// ============================================================
// OBTENER NOMBRE DEL CURSO
// ============================================================

export function classroomObtenerNombreCurso(
  curso
) {

  return String(

    curso?.name ||
    curso?.nombre ||
    curso?.courseName ||
    curso?.title ||
    "Curso sin nombre"

  ).trim();

}


// ============================================================
// REQUEST GENERAL
// ============================================================

async function classroomRequest(
  accion,
  params = {}
) {

  if (!accion) {

    throw new Error(
      "Debe especificarse una acción para Classroom."
    );

  }


  const query =
    new URLSearchParams();


  query.append(
    "accion",
    accion
  );


  Object.entries(params)
    .forEach(
      ([key, value]) => {

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {

          query.append(
            key,
            String(value)
          );

        }

      }
    );


  const url =
    `${API_URL}?${query.toString()}`;


  classroomLog(
    "============================================================"
  );

  classroomLog(
    "🌐 CLASSROOM REQUEST:",
    accion
  );

  classroomLog(
    "PARAMS:",
    params
  );


  try {

    const response =
      await fetch(
        url,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json"
          },

          cache:
            "no-store"
        }
      );


    const rawText =
      await response.text();


    classroomLog(
      "📡 HTTP:",
      response.status
    );

    classroomLog(
      "📦 RAW:",
      rawText
    );


    let raw;


    try {

      raw =
        JSON.parse(
          rawText
        );

    }
    catch {

      throw new Error(
        "La API no devolvió JSON válido."
      );

    }


    if (!response.ok) {

      throw new Error(
        raw?.error ||
        raw?.message ||
        raw?.data?.error ||
        `Error HTTP ${response.status}`
      );

    }


    if (raw?.ok === false) {

      throw new Error(
        raw?.error ||
        raw?.message ||
        raw?.data?.error ||
        "La API devolvió un error."
      );

    }


    return raw;

  }
  catch (error) {

    classroomError(
      "💥 ERROR CLASSROOM:",
      error
    );

    throw error;

  }

}


// ============================================================
// EXTRAER DATA
// ============================================================

export function classroomExtraerData(
  response,
  fallback = null
) {

  if (
    response &&
    response.data !== undefined &&
    response.data !== null
  ) {

    return response.data;

  }


  return (
    response ??
    fallback
  );

}


// ============================================================
// BUSCAR ARRAYS RECURSIVAMENTE
// ============================================================

function classroomBuscarArrays(
  objeto,
  nombres = [],
  ruta = "response",
  resultados = [],
  visitados = new WeakSet()
) {

  if (
    objeto === null ||
    objeto === undefined ||
    typeof objeto !== "object"
  ) {

    return resultados;

  }


  if (
    visitados.has(objeto)
  ) {

    return resultados;

  }


  visitados.add(
    objeto
  );


  if (
    Array.isArray(objeto)
  ) {

    resultados.push({
      ruta,
      array: objeto,
      nombreCoincide: false
    });

    return resultados;

  }


  const nombresLower =
    nombres.map(
      nombre =>
        String(nombre)
          .toLowerCase()
    );


  Object.entries(objeto)
    .forEach(
      ([key, value]) => {

        const keyLower =
          String(key)
            .toLowerCase();


        const nuevaRuta =
          `${ruta}.${key}`;


        if (
          Array.isArray(value)
        ) {

          resultados.push({

            ruta:
              nuevaRuta,

            array:
              value,

            nombreCoincide:
              nombresLower.includes(
                keyLower
              )

          });

          return;

        }


        if (
          value &&
          typeof value === "object"
        ) {

          classroomBuscarArrays(
            value,
            nombres,
            nuevaRuta,
            resultados,
            visitados
          );

        }

      }
    );


  return resultados;

}


// ============================================================
// EXTRAER ARRAY
// ============================================================

export function classroomExtraerArray(
  response,
  nombres = []
) {

  if (
    Array.isArray(response)
  ) {

    return response;

  }


  const resultados =
    classroomBuscarArrays(
      response,
      nombres
    );


  if (
    resultados.length === 0
  ) {

    return [];

  }


  const encontrado =
    resultados.find(
      resultado =>
        resultado.nombreCoincide
    );


  return (
    encontrado?.array ||
    resultados[0].array ||
    []
  );

}


// ============================================================
// CURSOS
// ============================================================

export async function classroomObtenerCursos() {

  const response =
    await classroomRequest(
      "classroomObtenerCursos"
    );


  return classroomExtraerArray(
    response,
    [
      "cursos",
      "courses"
    ]
  );

}


// ============================================================
// OBTENER CURSO
// ============================================================

export async function classroomObtenerCurso(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerCurso",
      {
        courseId
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// TEMAS
// ============================================================

export async function classroomObtenerTemas(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerTemas",
      {
        courseId
      }
    );


  return classroomExtraerArray(
    response,
    [
      "temas",
      "topics"
    ]
  );

}


// ============================================================
// OBTENER TEMA
// ============================================================

export async function classroomObtenerTema(
  courseId,
  topicId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!topicId) {

    throw new Error(
      "Debe especificarse topicId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerTema",
      {
        courseId,
        topicId
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// ACTIVIDADES DEL CURSO
// ============================================================

export async function classroomObtenerActividades(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerActividades",
      {
        courseId
      }
    );


  return classroomExtraerArray(
    response,
    [
      "actividades",
      "activities",
      "courseWork",
      "coursework"
    ]
  );

}


// ============================================================
// OBTENER ACTIVIDAD
// ============================================================

export async function classroomObtenerActividad(
  courseId,
  courseWorkId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!courseWorkId) {

    throw new Error(
      "Debe especificarse courseWorkId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerActividad",
      {
        courseId,
        courseWorkId
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// ACTIVIDADES POR TEMA
// ============================================================

export async function classroomObtenerActividadesPorTema(
  courseId,
  topicId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!topicId) {

    throw new Error(
      "Debe especificarse topicId."
    );

  }


  const actividades =
    await classroomObtenerActividades(
      courseId
    );


  const topicNormalizado =
    String(topicId).trim();


  return actividades.filter(
    actividad => {

      const actividadTopicId =
        String(

          actividad?.topicId ||

          actividad?.topic?.topicId ||

          actividad?.topic?.id ||

          actividad?.topicID ||

          actividad?.topicid ||

          ""

        ).trim();


      return (
        actividadTopicId ===
        topicNormalizado
      );

    }
  );

}


// ============================================================
// ALIAS TOPIC
// ============================================================

export async function classroomObtenerActividadesPorTopic(
  courseId,
  topicId
) {

  return classroomObtenerActividadesPorTema(
    courseId,
    topicId
  );

}


// ============================================================
// ACTIVIDADES POR ENTREGABLE
// ============================================================

export async function classroomObtenerActividadesPorEntregable(
  courseId,
  entregable
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const codigo =
    String(
      entregable || ""
    )
      .trim()
      .toUpperCase();


  if (
    !CLASSROOM_ENTREGABLES.includes(
      codigo
    )
  ) {

    throw new Error(
      "Entregable inválido. Debe ser EN1, EN2 o EN3."
    );

  }


  const actividades =
    await classroomObtenerActividades(
      courseId
    );


  return actividades.filter(
    actividad =>
      classroomReconocerEntregable(
        actividad
      ) === codigo
  );

}


// ============================================================
// ESTRUCTURA COMPLETA
// ============================================================

export async function classroomObtenerEstructura(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerEstructura",
      {
        courseId
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// CONSTRUIR ESTRUCTURA LOCAL
// ============================================================

export async function classroomConstruirEstructuraLocal(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const [
    curso,
    temas,
    actividades
  ] =
    await Promise.all([

      classroomObtenerCurso(
        courseId
      ),

      classroomObtenerTemas(
        courseId
      ),

      classroomObtenerActividades(
        courseId
      )

    ]);


  const temasConActividades =
    temas.map(
      tema => {

        const topicId =
          classroomObtenerTopicId(
            tema
          );


        const actividadesTema =
          actividades.filter(
            actividad => {

              const actividadTopicId =
                String(

                  actividad?.topicId ||

                  actividad?.topic?.topicId ||

                  actividad?.topic?.id ||

                  ""

                ).trim();


              return (
                actividadTopicId ===
                String(topicId)
              );

            }
          );


        return {

          ...tema,

          topicId,

          actividades:
            actividadesTema

        };

      }
    );


  return {

    curso,

    courseId,

    temas:
      temasConActividades,

    actividades

  };

}


// ============================================================
// PREPARAR ENTREGABLE
// ============================================================

export function classroomPrepararEntregable(
  actividad,
  codigo
) {

  if (!actividad) {

    return null;

  }


  const codigoNormalizado =
    String(
      codigo || ""
    )
      .trim()
      .toUpperCase();


  if (
    !CLASSROOM_ENTREGABLES.includes(
      codigoNormalizado
    )
  ) {

    return null;

  }


  const courseWorkId =
    classroomObtenerCourseWorkId(
      actividad
    );


  const titulo =
    classroomObtenerTituloActividad(
      actividad
    );


  const maxPoints =
    Number(
      actividad?.maxPoints ??
      actividad?.maxpoints ??
      PUNTAJE_POR_ENTREGABLE
    );


  return {

    codigo:
      codigoNormalizado,

    courseWorkId,

    titulo,

    maxPoints:
      Number.isFinite(maxPoints)
        ? maxPoints
        : PUNTAJE_POR_ENTREGABLE,

    actividad

  };

}


// ============================================================
// EXTRAER DOCUMENTOS DE UNA ENTREGA
// ============================================================

export function classroomExtraerDocumentosEntrega(
  entrega
) {

  if (!entrega) {

    return [];

  }


  const documentos = [];


  const attachments =
    Array.isArray(
      entrega.attachments
    )
      ? entrega.attachments
      : [];


  attachments.forEach(
    attachment => {

      if (!attachment) {
        return;
      }


      documentos.push({

        tipo:
          "attachment",

        id:
          attachment.id ||
          "",

        title:
          attachment.title ||
          attachment.name ||
          "",

        url:
          attachment.url ||
          attachment.alternateLink ||
          attachment.webViewLink ||
          "",

        driveFileId:
          attachment.driveFileId ||
          attachment.driveFile?.id ||
          "",

        raw:
          attachment

      });

    }
  );


  const driveFiles =
    Array.isArray(
      entrega.driveFiles
    )
      ? entrega.driveFiles
      : [];


  driveFiles.forEach(
    archivo => {

      if (!archivo) {
        return;
      }


      const driveFile =
        archivo.driveFile ||
        archivo;


      documentos.push({

        tipo:
          "driveFile",

        id:
          driveFile.id ||
          "",

        title:
          driveFile.title ||
          driveFile.name ||
          "",

        url:
          driveFile.alternateLink ||
          driveFile.webViewLink ||
          driveFile.url ||
          "",

        driveFileId:
          driveFile.id ||
          "",

        raw:
          archivo

      });

    }
  );


  if (
    entrega.link &&
    typeof entrega.link === "object"
  ) {

    documentos.push({

      tipo:
        "link",

      id:
        entrega.link.id ||
        "",

      title:
        entrega.link.title ||
        "",

      url:
        entrega.link.url ||
        "",

      driveFileId:
        "",

      raw:
        entrega.link

    });

  }


  const mapa =
    new Map();


  documentos.forEach(
    documento => {

      const clave =
        documento.driveFileId ||
        documento.id ||
        documento.url ||
        `${documento.tipo}-${documento.title}`;


      if (
        !mapa.has(
          clave
        )
      ) {

        mapa.set(
          clave,
          documento
        );

      }

    }
  );


  return Array.from(
    mapa.values()
  );

}


// ============================================================
// NORMALIZAR ENTREGA
// ============================================================

export function classroomNormalizarEntrega(
  entrega,
  courseId = "",
  courseWorkId = ""
) {

  if (!entrega) {

    return null;

  }


  const studentSubmissionId =
    String(

      entrega.studentSubmissionId ||
      entrega.studentSubmissionID ||
      entrega.submissionId ||
      entrega.id ||
      ""

    ).trim();


  const userId =
    String(

      entrega.userId ||
      entrega.userID ||
      entrega.userid ||
      entrega.studentId ||
      entrega.studentID ||
      entrega.studentid ||
      entrega.user?.userId ||
      entrega.user?.id ||
      ""

    ).trim();


  const estado =
    String(

      entrega.state ||
      entrega.status ||
      ""

    )
      .trim()
      .toUpperCase();


  const documentos =
    classroomExtraerDocumentosEntrega(
      entrega
    );


  const assignedGrade =
    entrega.assignedGrade !== undefined
      ? Number(
          entrega.assignedGrade
        )
      : null;


  const draftGrade =
    entrega.draftGrade !== undefined
      ? Number(
          entrega.draftGrade
        )
      : null;


  return {

    courseId:
      String(
        entrega.courseId ||
        courseId ||
        ""
      ).trim(),

    courseWorkId:
      String(
        entrega.courseWorkId ||
        courseWorkId ||
        ""
      ).trim(),

    studentSubmissionId,

    userId,

    estado,

    submitted:
      estado === "TURNED_IN" ||
      estado === "RETURNED" ||
      entrega.submitted === true,

    assignedGrade:
      Number.isFinite(
        assignedGrade
      )
        ? assignedGrade
        : null,

    draftGrade:
      Number.isFinite(
        draftGrade
      )
        ? draftGrade
        : null,

    documentos,

    raw:
      entrega

  };

}


// ============================================================
// NORMALIZAR TODAS LAS ENTREGAS
// ============================================================

export function classroomNormalizarEntregas(
  entregas,
  courseId = "",
  courseWorkId = ""
) {

  if (
    !Array.isArray(
      entregas
    )
  ) {

    return [];

  }


  return entregas
    .filter(Boolean)
    .map(
      entrega =>
        classroomNormalizarEntrega(
          entrega,
          courseId,
          courseWorkId
        )
    )
    .filter(Boolean);

}


// ============================================================
// BUSCAR ENTREGA DE ALUMNO
// ============================================================

export function classroomBuscarEntregaAlumno(
  entregas,
  userId
) {

  if (
    !Array.isArray(
      entregas
    )
  ) {

    return null;

  }


  const buscado =
    String(
      userId || ""
    ).trim();


  if (!buscado) {

    return null;

  }


  return (

    entregas.find(
      entrega => {

        const id =
          String(

            entrega?.userId ||
            entrega?.userID ||
            entrega?.userid ||
            entrega?.studentId ||
            entrega?.studentID ||
            entrega?.studentid ||
            entrega?.user?.userId ||
            entrega?.user?.id ||
            ""

          ).trim();


        return (
          id ===
          buscado
        );

      }
    ) ||

    null

  );

}


// ============================================================
// BUSCAR SUBMISSION
// ============================================================
//
// Esta función consulta la entrega específica de un estudiante.
// ============================================================

export async function classroomBuscarSubmission(
  courseId,
  courseWorkId,
  userId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!courseWorkId) {

    throw new Error(
      "Debe especificarse courseWorkId."
    );

  }


  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  const response =
    await classroomRequest(
      "classroomBuscarSubmission",
      {
        courseId,
        courseWorkId,
        userId
      }
    );


  const data =
    classroomExtraerData(
      response,
      null
    );


  if (
    Array.isArray(data)
  ) {

    return (
      data[0] ||
      null
    );

  }


  if (
    data?.submission
  ) {

    return data.submission;

  }


  if (
    data?.studentSubmission
  ) {

    return data.studentSubmission;

  }


  return data;

}


// ============================================================
// OBTENER TODAS LAS ENTREGAS
// ============================================================

export async function classroomObtenerEntregas(
  courseId,
  courseWorkId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!courseWorkId) {

    throw new Error(
      "Debe especificarse courseWorkId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerEntregas",
      {
        courseId,
        courseWorkId
      }
    );


  return classroomExtraerArray(
    response,
    [
      "entregas",
      "submissions",
      "studentSubmissions"
    ]
  );

}


// ============================================================
// PREPARAR REVISION DE ENTREGABLE
// ============================================================

export function classroomPrepararRevisionEntregable({
  courseId,
  userId,
  codigo,
  actividad,
  entregas
}) {

  const entregable =
    classroomPrepararEntregable(
      actividad,
      codigo
    );


  if (!entregable) {

    return {

      ok:
        false,

      codigo,

      error:
        "No se pudo preparar el entregable."

    };

  }


  const entregasNormalizadas =
    classroomNormalizarEntregas(
      entregas,
      courseId,
      entregable.courseWorkId
    );


  const entregaAlumno =
    classroomBuscarEntregaAlumno(
      entregasNormalizadas,
      userId
    );


  if (!entregaAlumno) {

    return {

      ok:
        true,

      tieneEntrega:
        false,

      codigo:
        entregable.codigo,

      courseId,

      userId,

      courseWorkId:
        entregable.courseWorkId,

      titulo:
        entregable.titulo,

      maxPoints:
        entregable.maxPoints,

      entrega:
        null,

      documentos:
        [],

      entregas:
        entregasNormalizadas

    };

  }


  return {

    ok:
      true,

    tieneEntrega:
      true,

    codigo:
      entregable.codigo,

    courseId,

    userId,

    courseWorkId:
      entregable.courseWorkId,

    titulo:
      entregable.titulo,

    maxPoints:
      entregable.maxPoints,

    entrega:
      entregaAlumno,

    documentos:
      entregaAlumno.documentos,

    entregas:
      entregasNormalizadas

  };

}


// ============================================================
// PREPARAR REVISION DEL ALUMNO
// ============================================================

export function classroomPrepararRevisionAlumno({
  courseId,
  userId,
  actividades,
  entregasPorEntregable
}) {

  const actividadesLista =
    Array.isArray(
      actividades
    )
      ? actividades
      : [];


  const entregasMapa =
    entregasPorEntregable &&
    typeof entregasPorEntregable === "object"
      ? entregasPorEntregable
      : {};


  const resultado = {

    courseId,

    userId,

    EN1:
      null,

    EN2:
      null,

    EN3:
      null

  };


  ENTREGABLES_OBJETIVO.forEach(
    codigo => {

      const actividad =
        actividadesLista.find(
          item =>
            classroomReconocerEntregable(
              item
            ) === codigo
        ) ||
        null;


      resultado[codigo] =
        classroomPrepararRevisionEntregable({

          courseId,

          userId,

          codigo,

          actividad,

          entregas:
            entregasMapa[codigo] || []

        });

    }
  );


  return resultado;

}


// ============================================================
// RESUMEN DE REVISION
// ============================================================

export function classroomResumenRevisionAlumno(
  revision
) {

  if (
    !revision ||
    typeof revision !== "object"
  ) {

    return {

      total:
        3,

      conEntrega:
        0,

      sinEntrega:
        3,

      documentos:
        0

    };

  }


  let conEntrega = 0;

  let documentos = 0;


  ENTREGABLES_OBJETIVO.forEach(
    codigo => {

      const item =
        revision[codigo];


      if (
        item?.tieneEntrega
      ) {

        conEntrega++;

      }


      if (
        Array.isArray(
          item?.documentos
        )
      ) {

        documentos +=
          item.documentos.length;

      }

    }
  );


  return {

    total:
      3,

    conEntrega,

    sinEntrega:
      3 - conEntrega,

    documentos

  };

}


// ============================================================
// TEST — ESTRUCTURA DE UN TEMA
// ============================================================

export async function classroomTestEstructuraTema(
  courseId,
  topicId
) {

  try {

    const temas =
      await classroomObtenerTemas(
        courseId
      );


    const tema =
      temas.find(
        item =>
          classroomObtenerTopicId(
            item
          ) ===
          String(topicId)
      );


    if (!tema) {

      throw new Error(
        "No se encontró el tema solicitado."
      );

    }


    const actividadesTema =
      await classroomObtenerActividadesPorTema(
        courseId,
        topicId
      );


    const entregables = {

      EN1:
        null,

      EN2:
        null,

      EN3:
        null

    };


    actividadesTema.forEach(
      actividad => {

        const codigo =
          classroomReconocerEntregable(
            actividad
          );


        if (
          codigo
        ) {

          entregables[codigo] =
            actividad;

        }

      }
    );


    return {

      ok:
        true,

      courseId,

      topicId,

      tema,

      totalActividades:
        actividadesTema.length,

      actividades:
        actividadesTema,

      entregables

    };

  }
  catch (error) {

    classroomError(
      "❌ ERROR TEST ESTRUCTURA:",
      error
    );


    return {

      ok:
        false,

      courseId,

      topicId,

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// ANALIZAR ENTREGABLE DE ALUMNO
// ============================================================
//
// Esta función todavía NO aplica lineamientos de IA/documento.
// Prepara toda la información necesaria.
// ============================================================

export async function classroomAnalizarEntregableAlumno({
  courseId,
  courseWorkId,
  userId,
  codigo
}) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!courseWorkId) {

    throw new Error(
      "Debe especificarse courseWorkId."
    );

  }


  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  const codigoNormalizado =
    String(
      codigo || ""
    )
      .trim()
      .toUpperCase();


  if (
    !ENTREGABLES_OBJETIVO.includes(
      codigoNormalizado
    )
  ) {

    throw new Error(
      "El entregable debe ser EN1, EN2 o EN3."
    );

  }


  const submission =
    await classroomBuscarSubmission(
      courseId,
      courseWorkId,
      userId
    );


  if (!submission) {

    return {

      ok:
        true,

      tieneEntrega:
        false,

      codigo:
        codigoNormalizado,

      courseId,

      courseWorkId,

      userId,

      submission:
        null,

      documentos:
        [],

      analisis:
        null,

      descuento:
        null,

      puntaje:
        0

    };

  }


  const entrega =
    classroomNormalizarEntrega(
      submission,
      courseId,
      courseWorkId
    );


  const documentos =
    entrega?.documentos || [];


  return {

    ok:
      true,

    tieneEntrega:
      true,

    codigo:
      codigoNormalizado,

    courseId,

    courseWorkId,

    userId,

    submission:
      entrega,

    estado:
      entrega?.estado || "",

    documentos,

    tieneDocumento:
      documentos.length > 0,

    analisis:
      null,

    descuento:
      null,

    puntaje:
      null

  };

}


// ============================================================
// ANALIZAR LOS 3 ENTREGABLES
// ============================================================

export async function classroomAnalizarEntregablesAlumno({
  courseId,
  userId,
  courseWorkIds
}) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  if (
    !courseWorkIds ||
    typeof courseWorkIds !== "object"
  ) {

    throw new Error(
      "Debe especificarse courseWorkIds."
    );

  }


  const resultado = {

    ok:
      true,

    courseId,

    userId,

    EN1:
      null,

    EN2:
      null,

    EN3:
      null,

    total:
      0,

    puntajeFinal:
      null,

    errores:
      []

  };


  for (
    const codigo
    of ENTREGABLES_OBJETIVO
  ) {

    try {

      const courseWorkId =
        courseWorkIds[codigo] ||
        courseWorkIds[
          codigo.toLowerCase()
        ] ||
        "";


      if (!courseWorkId) {

        resultado[codigo] = {

          ok:
            false,

          codigo,

          tieneEntrega:
            false,

          error:
            `No se encontró courseWorkId para ${codigo}.`

        };

        continue;

      }


      resultado[codigo] =
        await classroomAnalizarEntregableAlumno({

          courseId,

          courseWorkId,

          userId,

          codigo

        });

    }
    catch (error) {

      resultado.errores.push({

        codigo,

        error:
          error?.message ||
          String(error)

      });

    }

  }


  resultado.total =
    ENTREGABLES_OBJETIVO
      .filter(
        codigo =>
          resultado[codigo]?.tieneEntrega === true
      )
      .length;


  resultado.ok =
    resultado.errores.length === 0;


  return resultado;

}


// ============================================================
// CONSTRUIR REVISION
// ============================================================

export function classroomConstruirRevision({
  codigo,
  documento,
  lineamientos = []
}) {

  const codigoNormalizado =
    String(
      codigo || ""
    )
      .trim()
      .toUpperCase();


  if (
    !ENTREGABLES_OBJETIVO.includes(
      codigoNormalizado
    )
  ) {

    throw new Error(
      "Código de entregable inválido."
    );

  }


  return {

    codigo:
      codigoNormalizado,

    valorMaximo:
      PUNTAJE_POR_ENTREGABLE,

    documento:
      documento || null,

    tieneDocumento:
      Boolean(documento),

    criterios:
      Array.isArray(lineamientos)
        ? lineamientos
        : [],

    resultados:
      [],

    errores:
      [],

    descuento:
      0,

    puntaje:
      PUNTAJE_POR_ENTREGABLE,

    estado:
      documento
        ? "PENDIENTE_ANALISIS"
        : "SIN_DOCUMENTO"

  };

}


// ============================================================
// APLICAR DESCUENTO
// ============================================================

export function classroomAplicarDescuentoEntregable({
  codigo,
  descuento
}) {

  const codigoNormalizado =
    String(
      codigo || ""
    )
      .trim()
      .toUpperCase();


  if (
    !ENTREGABLES_OBJETIVO.includes(
      codigoNormalizado
    )
  ) {

    throw new Error(
      "Código de entregable inválido."
    );

  }


  const numeroDescuento =
    Number(
      descuento
    );


  if (
    !Number.isFinite(
      numeroDescuento
    )
  ) {

    throw new Error(
      "El descuento debe ser numérico."
    );

  }


  if (
    numeroDescuento < 0
  ) {

    throw new Error(
      "El descuento no puede ser negativo."
    );

  }


  const descuentoSeguro =
    Math.min(
      numeroDescuento,
      PUNTAJE_POR_ENTREGABLE
    );


  const puntaje =
    Math.max(
      0,
      PUNTAJE_POR_ENTREGABLE -
      descuentoSeguro
    );


  return {

    codigo:
      codigoNormalizado,

    valorMaximo:
      PUNTAJE_POR_ENTREGABLE,

    descuento:
      descuentoSeguro,

    puntaje

  };

}


// ============================================================
// CALCULAR PUNTAJE DE UN ENTREGABLE
// ============================================================
//
// ÚNICA declaración de esta función.
// ============================================================

export function classroomCalcularPuntajeEntregable({
  codigo,
  descuento = 0
}) {

  return classroomAplicarDescuentoEntregable({

    codigo,

    descuento

  });

}


// ============================================================
// CALCULAR NOTA FINAL
// ============================================================
//
// ÚNICA declaración de esta función.
// ============================================================

export function classroomCalcularNotaFinal({
  EN1 = {},
  EN2 = {},
  EN3 = {}
}) {

  const puntajeEN1 =
    Number(
      EN1?.puntaje
    ) || 0;


  const puntajeEN2 =
    Number(
      EN2?.puntaje
    ) || 0;


  const puntajeEN3 =
    Number(
      EN3?.puntaje
    ) || 0;


  const descuentoEN1 =
    Number(
      EN1?.descuento
    ) || 0;


  const descuentoEN2 =
    Number(
      EN2?.descuento
    ) || 0;


  const descuentoEN3 =
    Number(
      EN3?.descuento
    ) || 0;


  const puntajeFinal =
    puntajeEN1 +
    puntajeEN2 +
    puntajeEN3;


  const descuentoTotal =
    descuentoEN1 +
    descuentoEN2 +
    descuentoEN3;


  return {

    EN1: {

      puntaje:
        puntajeEN1,

      descuento:
        descuentoEN1

    },

    EN2: {

      puntaje:
        puntajeEN2,

      descuento:
        descuentoEN2

    },

    EN3: {

      puntaje:
        puntajeEN3,

      descuento:
        descuentoEN3

    },

    descuentoTotal,

    puntajeFinal,

    puntajeMaximo:
      PUNTAJE_POR_ENTREGABLE * 3,

    estado:
      "PENDIENTE_ENVIO"

  };

}


// ============================================================
// CONSTRUIR RESULTADO FINAL
// ============================================================
//
// Alias de alto nivel que utiliza classroomCalcularNotaFinal.
// ============================================================

export function classroomConstruirResultadoFinal({
  EN1,
  EN2,
  EN3
}) {

  return classroomCalcularNotaFinal({

    EN1,

    EN2,

    EN3

  });

}


// ============================================================
// PREPARAR CALIFICACIÓN DEL REVISOR
// ============================================================

export function classroomPrepararCalificacionRevisor({
  courseId,
  userId,
  revisorCourseWorkId,
  resultadoFinal
}) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  if (!revisorCourseWorkId) {

    throw new Error(
      "Debe especificarse revisorCourseWorkId."
    );

  }


  if (!resultadoFinal) {

    throw new Error(
      "Debe especificarse resultadoFinal."
    );

  }


  const puntaje =
    Number(
      resultadoFinal.puntajeFinal
    );


  if (
    !Number.isFinite(puntaje)
  ) {

    throw new Error(
      "El puntaje final no es válido."
    );

  }


  return {

    courseId,

    userId,

    courseWorkId:
      revisorCourseWorkId,

    puntaje,

    puntajeMaximo:
      PUNTAJE_POR_ENTREGABLE * 3,

    EN1:
      resultadoFinal.EN1,

    EN2:
      resultadoFinal.EN2,

    EN3:
      resultadoFinal.EN3,

    descuentoTotal:
      resultadoFinal.descuentoTotal,

    listoParaEnviar:
      true,

    enviado:
      false

  };

}


// ============================================================
// ASIGNAR CALIFICACIÓN
// ============================================================
//
// Esta función sí realiza una escritura en Classroom a través
// del Apps Script.
//
// IMPORTANTE:
// El backend debe tener la acción:
// classroomAsignarCalificacion
// ============================================================

export async function classroomAsignarCalificacion(
  courseId,
  courseWorkId,
  studentSubmissionId,
  grade
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!courseWorkId) {

    throw new Error(
      "Debe especificarse courseWorkId."
    );

  }


  if (!studentSubmissionId) {

    throw new Error(
      "Debe especificarse studentSubmissionId."
    );

  }


  const puntaje =
    Number(
      grade
    );


  if (
    !Number.isFinite(puntaje)
  ) {

    throw new Error(
      "La calificación debe ser numérica."
    );

  }


  const response =
    await classroomRequest(
      "classroomAsignarCalificacion",
      {

        courseId,

        courseWorkId,

        studentSubmissionId,

        grade:
          puntaje

      }
    );


  return classroomExtraerData(
    response,
    response
  );

}
// ============================================================
// ENVÍO FINAL AL REVISOR
//
// IMPORTANTE:
//
// Esta función NO se ejecuta automáticamente.
//
// El flujo esperado es:
//
// EN1 → puntaje EN1
// EN2 → puntaje EN2
// EN3 → puntaje EN3
//
// NOTA FINAL:
//
// EN1 + EN2 + EN3
//
// Después:
//
// NOTA FINAL
//      ↓
// REVISOR DE INFORMES
//      ↓
// Google Classroom
//
// Esta función solamente envía cuando es llamada
// explícitamente desde el FRONT.
// ============================================================

export async function classroomEnviarNotaFinalRevisor({

  courseId,

  userId,

  courseWorkIdRevisor,

  notaFinal

}) {

  // ----------------------------------------------------------
  // VALIDAR COURSE ID
  // ----------------------------------------------------------

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  // ----------------------------------------------------------
  // VALIDAR USER ID
  // ----------------------------------------------------------

  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  // ----------------------------------------------------------
  // VALIDAR ACTIVIDAD REVISOR
  // ----------------------------------------------------------

  if (!courseWorkIdRevisor) {

    throw new Error(
      "Debe especificarse courseWorkIdRevisor."
    );

  }


  // ----------------------------------------------------------
  // VALIDAR NOTA
  // ----------------------------------------------------------

  if (
    notaFinal === undefined ||
    notaFinal === null ||
    notaFinal === ""
  ) {

    throw new Error(
      "Debe especificarse notaFinal."
    );

  }


  const numero =
    Number(notaFinal);


  if (
    Number.isNaN(numero)
  ) {

    throw new Error(
      "La nota final no es válida."
    );

  }


  if (
    numero < 0
  ) {

    throw new Error(
      "La nota final no puede ser negativa."
    );

  }


  // ----------------------------------------------------------
  // ENVIAR AL BACKEND
  // ----------------------------------------------------------

  const response =
    await classroomRequest(
      "classroomEnviarNotaFinalRevisor",
      {

        courseId,

        userId,

        courseWorkId:
          courseWorkIdRevisor,

        puntaje:
          numero

      }
    );


  // ----------------------------------------------------------
  // RESPUESTA
  // ----------------------------------------------------------

  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// ENVIAR NOTA FINAL DE UN ESTUDIANTE
//
// ESTA FUNCIÓN ES EL PUNTO PRINCIPAL DEL FLUJO.
//
// Recibe:
//
// EN1
// EN2
// EN3
//
// y envía:
//
// EN1 + EN2 + EN3
//
// a:
//
// REVISOR DE INFORMES
//
// NO BUSCA ACTIVIDADES.
// NO ANALIZA DOCUMENTOS.
// NO MODIFICA EN1/EN2/EN3.
//
// Solamente recibe la nota final y la envía.
// ============================================================

export async function classroomEnviarNotaFinalAlumno({

  courseId,

  userId,

  courseWorkIdRevisor,

  en1,

  en2,

  en3

}) {

  // ----------------------------------------------------------
  // VALIDACIONES
  // ----------------------------------------------------------

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  if (!courseWorkIdRevisor) {

    throw new Error(
      "Debe especificarse courseWorkIdRevisor."
    );

  }


  if (
    en1 === undefined ||
    en1 === null ||
    en1 === ""
  ) {

    throw new Error(
      "Debe especificarse el puntaje de EN1."
    );

  }


  if (
    en2 === undefined ||
    en2 === null ||
    en2 === ""
  ) {

    throw new Error(
      "Debe especificarse el puntaje de EN2."
    );

  }


  if (
    en3 === undefined ||
    en3 === null ||
    en3 === ""
  ) {

    throw new Error(
      "Debe especificarse el puntaje de EN3."
    );

  }


  const puntajeEN1 =
    Number(en1);


  const puntajeEN2 =
    Number(en2);


  const puntajeEN3 =
    Number(en3);


  // ----------------------------------------------------------
  // VALIDAR PUNTAJES
  // ----------------------------------------------------------

  if (
    Number.isNaN(puntajeEN1)
  ) {

    throw new Error(
      "El puntaje de EN1 no es válido."
    );

  }


  if (
    Number.isNaN(puntajeEN2)
  ) {

    throw new Error(
      "El puntaje de EN2 no es válido."
    );

  }


  if (
    Number.isNaN(puntajeEN3)
  ) {

    throw new Error(
      "El puntaje de EN3 no es válido."
    );

  }


  if (
    puntajeEN1 < 0 ||
    puntajeEN2 < 0 ||
    puntajeEN3 < 0
  ) {

    throw new Error(
      "Los puntajes de EN1, EN2 y EN3 no pueden ser negativos."
    );

  }


  // ----------------------------------------------------------
  // CALCULAR NOTA FINAL
  //
  // IMPORTANTE:
  //
  // NO usamos classroomCalcularNotaFinal()
  // aquí para evitar duplicar lógica.
  //
  // La suma es:
  //
  // EN1 + EN2 + EN3
  // ----------------------------------------------------------

  const notaFinal =
    puntajeEN1 +
    puntajeEN2 +
    puntajeEN3;


  // ----------------------------------------------------------
  // REDONDEO
  //
  // Mantiene dos decimales.
  // ----------------------------------------------------------

  const notaFinalRedondeada =
    Math.round(
      notaFinal * 100
    ) / 100;


  console.log(
    "============================================================"
  );


  console.log(
    "📤 ENVÍO NOTA FINAL AL REVISOR"
  );


  console.log(
    "COURSE ID:",
    courseId
  );


  console.log(
    "USER ID:",
    userId
  );


  console.log(
    "COURSEWORK REVISOR:",
    courseWorkIdRevisor
  );


  console.log(
    "EN1:",
    puntajeEN1
  );


  console.log(
    "EN2:",
    puntajeEN2
  );


  console.log(
    "EN3:",
    puntajeEN3
  );


  console.log(
    "NOTA FINAL:",
    notaFinalRedondeada
  );


  // ----------------------------------------------------------
  // ENVIAR
  // ----------------------------------------------------------

  const resultado =
    await classroomEnviarNotaFinalRevisor({

      courseId,

      userId,

      courseWorkIdRevisor,

      notaFinal:
        notaFinalRedondeada

    });


  // ----------------------------------------------------------
  // RESPUESTA
  // ----------------------------------------------------------

  return {

    ok:
      true,

    courseId,

    userId,

    courseWorkIdRevisor,

    en1:
      puntajeEN1,

    en2:
      puntajeEN2,

    en3:
      puntajeEN3,

    notaFinal:
      notaFinalRedondeada,

    resultado

  };

}


// ============================================================
// ENVIAR NOTAS FINALES DE VARIOS ESTUDIANTES
//
// Permite enviar el resultado final del grupo completo.
//
// IMPORTANTE:
//
// NO se ejecuta automáticamente.
//
// El FRONT debe llamarla explícitamente.
//
// Cada elemento debe tener:
//
// {
//   userId,
//   en1,
//   en2,
//   en3
// }
// ============================================================

export async function classroomEnviarNotasFinalesGrupo({

  courseId,

  courseWorkIdRevisor,

  estudiantes

}) {

  // ----------------------------------------------------------
  // VALIDACIONES
  // ----------------------------------------------------------

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!courseWorkIdRevisor) {

    throw new Error(
      "Debe especificarse courseWorkIdRevisor."
    );

  }


  if (
    !Array.isArray(estudiantes)
  ) {

    throw new Error(
      "estudiantes debe ser un array."
    );

  }


  // ----------------------------------------------------------
  // RESULTADOS
  // ----------------------------------------------------------

  const resultados = [];

  const errores = [];


  // ----------------------------------------------------------
  // PROCESAR UNO POR UNO
  // ----------------------------------------------------------

  for (
    const estudiante
    of estudiantes
  ) {

    try {

      const resultado =
        await classroomEnviarNotaFinalAlumno({

          courseId,

          userId:
            estudiante?.userId,

          courseWorkIdRevisor,

          en1:
            estudiante?.en1,

          en2:
            estudiante?.en2,

          en3:
            estudiante?.en3

        });


      resultados.push(
        resultado
      );

    }
    catch (error) {

      errores.push({

        userId:
          estudiante?.userId ||
          null,

        error:
          error?.message ||
          String(error)

      });

    }

  }


  // ----------------------------------------------------------
  // RESULTADO FINAL
  // ----------------------------------------------------------

  return {

    ok:
      errores.length === 0,

    total:
      estudiantes.length,

    enviados:
      resultados.length,

    errores:
      errores.length,

    resultados,

    detalleErrores:
      errores

  };

}


// ============================================================
// TEST — ENVÍO FINAL AL REVISOR
//
// SOLO DEBE USARSE CUANDO QUIERAS PROBAR EL ENVÍO.
//
// IMPORTANTE:
//
// ESTE TEST SÍ MODIFICA GOOGLE CLASSROOM.
//
// NO LLAMAR AUTOMÁTICAMENTE.
//
// Se deja separado de los tests de lectura.
// ============================================================

export async function classroomTestEnvioFinalRevisor({

  courseId,

  userId,

  courseWorkIdRevisor,

  en1,

  en2,

  en3

}) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  if (!userId) {

    throw new Error(
      "Debe especificarse userId."
    );

  }


  if (!courseWorkIdRevisor) {

    throw new Error(
      "Debe especificarse courseWorkIdRevisor."
    );

  }


  console.group(
    "🧪 TEST — ENVÍO FINAL REVISOR"
  );


  try {

    const resultado =
      await classroomEnviarNotaFinalAlumno({

        courseId,

        userId,

        courseWorkIdRevisor,

        en1,

        en2,

        en3

      });


    console.log(
      "📤 RESULTADO ENVÍO:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "❌ ERROR ENVÍO FINAL:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId,

      userId,

      courseWorkIdRevisor,

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// EXPONER FUNCIONES DE ENVÍO EN WINDOW
//
// IMPORTANTE:
//
// Exponerlas en window NO significa que se ejecuten.
//
// Solamente quedan disponibles para que el FRONT pueda
// llamarlas explícitamente.
// ============================================================

if (
  typeof window !== "undefined"
) {

  window.classroomEnviarNotaFinalRevisor =
    classroomEnviarNotaFinalRevisor;


  window.classroomEnviarNotaFinalAlumno =
    classroomEnviarNotaFinalAlumno;


  window.classroomEnviarNotasFinalesGrupo =
    classroomEnviarNotasFinalesGrupo;


  window.classroomTestEnvioFinalRevisor =
    classroomTestEnvioFinalRevisor;

}


// ============================================================
// FIN PARTE — ENVÍO FINAL AL REVISOR
// ============================================================
