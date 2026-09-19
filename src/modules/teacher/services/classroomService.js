// ============================================================
// classroomService.js
// Servicio único para Google Classroom
//
// VG SMART REVIEW
//
// FRONT
//   ↓
// classroomService.js
//   ↓
// Apps Script Web App
//   ↓
// Classroom API
//
// IMPORTANTE:
// Este archivo NO envía calificaciones automáticamente.
// Las funciones de envío solo se ejecutan si son llamadas
// explícitamente.
// ============================================================


// ============================================================
// API
// ============================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbwjambvwR9HHpOiTvS97uLCIrOYh8l8dyt6H_VvndFQt4q3ri-6nqWCViKrfNljgY__AQ/exec";

// ============================================================
// VERSION
// ============================================================

export const CLASSROOM_FRONT_VERSION = "6.0.0";


// ============================================================
// CONFIGURACIÓN
// ============================================================

const CLASSROOM_DEBUG = true;

const CLASSROOM_ENTREGABLES = [
  "EN1",
  "EN2",
  "EN3"
];


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
    "🌐 CLASSROOM REQUEST"
  );

  classroomLog(
    "ACCION:",
    accion
  );

  classroomLog(
    "PARAMS:",
    params
  );

  classroomLog(
    "URL:",
    url
  );


  try {

    const response =
      await fetch(
        url,
        {
          method: "GET",

          headers: {
            Accept: "application/json"
          },

          cache: "no-store"
        }
      );


    classroomLog(
      "📡 HTTP STATUS:",
      response.status
    );


    const rawText =
      await response.text();


    classroomLog(
      "📦 RAW RESPONSE:",
      rawText
    );


    let raw;


    try {

      raw =
        JSON.parse(
          rawText
        );

    }
    catch (error) {

      classroomError(
        "❌ JSON INVÁLIDO:",
        rawText
      );

      throw new Error(
        "La API no devolvió JSON válido."
      );

    }


    classroomLog(
      "📥 JSON RESPONSE:",
      raw
    );


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


    classroomLog(
      "✅ REQUEST CORRECTO:",
      accion
    );


    return raw;

  }
  catch (error) {

    classroomError(
      "💥 ERROR CLASSROOM REQUEST:",
      error
    );

    throw error;

  }

}


// ============================================================
// EXTRAER DATA
// ============================================================

function classroomExtraerData(
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
// DETECTAR SI ES ESTUDIANTE
// ============================================================

function classroomPareceEstudiante(
  objeto
) {

  if (
    !objeto ||
    typeof objeto !== "object" ||
    Array.isArray(objeto)
  ) {

    return false;

  }


  const keys =
    Object.keys(objeto)
      .map(
        key =>
          String(key).toLowerCase()
      );


  const indicadores = [

    "userid",
    "studentid",

    "email",
    "emailaddress",
    "correo",
    "correoelectronico",

    "profile",
    "perfil",

    "studentname",
    "nombre",
    "nombrecompleto",
    "fullname",
    "displayname"

  ];


  return indicadores.some(
    indicador =>
      keys.includes(indicador)
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
    objeto === undefined
  ) {

    return resultados;

  }


  if (
    typeof objeto !== "object"
  ) {

    return resultados;

  }


  if (
    visitados.has(objeto)
  ) {

    return resultados;

  }


  visitados.add(objeto);


  // ----------------------------------------------------------
  // ARRAY
  // ----------------------------------------------------------

  if (
    Array.isArray(objeto)
  ) {

    const elementos =
      objeto.filter(
        item =>
          item !== null &&
          item !== undefined
      );


    if (
      elementos.length > 0
    ) {

      resultados.push({
        ruta,
        array: elementos
      });

    }


    return resultados;

  }


  // ----------------------------------------------------------
  // OBJETO
  // ----------------------------------------------------------

  for (
    const [key, value]
    of Object.entries(objeto)
  ) {

    const keyLower =
      String(key).toLowerCase();


    const nuevaRuta =
      `${ruta}.${key}`;


    // --------------------------------------------------------
    // ARRAY
    // --------------------------------------------------------

    if (
      Array.isArray(value)
    ) {

      if (
        nombres.length === 0 ||
        nombres.some(
          nombre =>
            keyLower ===
            String(nombre).toLowerCase()
        )
      ) {

        resultados.push({

          ruta:
            nuevaRuta,

          array:
            value

        });

      }
      else if (
        value.length > 0 &&
        value.some(
          item =>
            classroomPareceEstudiante(
              item
            )
        )
      ) {

        resultados.push({

          ruta:
            nuevaRuta,

          array:
            value

        });

      }


      continue;

    }


    // --------------------------------------------------------
    // OBJETO ANIDADO
    // --------------------------------------------------------

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


  return resultados;

}


// ============================================================
// EXTRAER ARRAY
// ============================================================

function classroomExtraerArray(
  response,
  nombres = []
) {

  classroomLog(
    "------------------------------------------------------------"
  );

  classroomLog(
    "🔎 [EXTRAER ARRAY]"
  );

  classroomLog(
    "NOMBRES BUSCADOS:",
    nombres
  );

  classroomLog(
    "RESPONSE:",
    response
  );


  if (
    Array.isArray(response)
  ) {

    classroomLog(
      "✅ ARRAY DIRECTO:",
      response.length
    );

    return response;

  }


  const resultados =
    classroomBuscarArrays(
      response,
      nombres
    );


  classroomLog(
    "🔍 ARRAYS ENCONTRADOS:",
    resultados
  );


  if (
    resultados.length === 0
  ) {

    classroomWarn(
      "⚠️ NO SE ENCONTRÓ NINGÚN ARRAY."
    );

    return [];

  }


  // ----------------------------------------------------------
  // PRIMERO: NOMBRE EXACTO
  // ----------------------------------------------------------

  const nombresLower =
    nombres.map(
      nombre =>
        String(nombre).toLowerCase()
    );


  const encontradoPorNombre =
    resultados.find(
      resultado => {

        const ultimaParte =
          resultado.ruta
            .split(".")
            .pop()
            .toLowerCase();


        return nombresLower.includes(
          ultimaParte
        );

      }
    );


  if (
    encontradoPorNombre
  ) {

    classroomLog(
      "🎯 ARRAY ENCONTRADO POR NOMBRE:",
      encontradoPorNombre.ruta
    );

    classroomLog(
      "TOTAL:",
      encontradoPorNombre.array.length
    );


    return encontradoPorNombre.array;

  }


  // ----------------------------------------------------------
  // SEGUNDO: ARRAY DE ESTUDIANTES
  // ----------------------------------------------------------

  const arrayEstudiantes =
    resultados.find(
      resultado =>
        resultado.array.some(
          item =>
            classroomPareceEstudiante(
              item
            )
        )
    );


  if (
    arrayEstudiantes
  ) {

    classroomLog(
      "🎓 ARRAY DE ESTUDIANTES DETECTADO:",
      arrayEstudiantes.ruta
    );

    classroomLog(
      "TOTAL:",
      arrayEstudiantes.array.length
    );


    return arrayEstudiantes.array;

  }


  // ----------------------------------------------------------
  // TERCERO: PRIMER ARRAY
  // ----------------------------------------------------------

  classroomWarn(
    "⚠️ NO SE IDENTIFICÓ EL ARRAY POR NOMBRE."
  );

  classroomWarn(
    "Usando primer array encontrado:",
    resultados[0].ruta
  );


  return resultados[0].array;

}


// ============================================================
// NORMALIZAR ESTUDIANTE
// ============================================================

function classroomNormalizarEstudiante(
  estudiante,
  courseId = ""
) {

  estudiante =
    estudiante || {};


  const profile =
    estudiante.profile ||
    estudiante.perfil ||
    estudiante.userProfile ||
    estudiante.user ||
    {};


  const profileName =
    profile.name ||
    profile.nombre ||
    {};


  // ----------------------------------------------------------
  // NOMBRE
  // ----------------------------------------------------------

  const nombrePerfil =

    profileName.fullName ||

    profileName.fullname ||

    (
      String(
        profileName.givenName ||
        profileName.firstName ||
        ""
      ) +
      " " +
      String(
        profileName.familyName ||
        profileName.lastName ||
        ""
      )
    ).trim();


  let nombre =

    estudiante.nombre ||

    estudiante.nombreCompleto ||

    estudiante.fullName ||

    estudiante.fullname ||

    estudiante.displayName ||

    estudiante.displayname ||

    estudiante.studentName ||

    estudiante.studentname ||

    estudiante.name ||

    nombrePerfil ||

    "Alumno";


  nombre =
    String(
      nombre
    ).trim();


  // ----------------------------------------------------------
  // USER ID
  // ----------------------------------------------------------

  const userId =
    String(

      estudiante.userId ||

      estudiante.userID ||

      estudiante.userid ||

      estudiante.id ||

      estudiante.studentId ||

      estudiante.studentID ||

      estudiante.studentid ||

      estudiante.user?.userId ||

      estudiante.user?.userID ||

      estudiante.user?.id ||

      estudiante.user?.userid ||

      profile.userId ||

      profile.userID ||

      profile.userid ||

      profile.id ||

      ""

    ).trim();


  // ----------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------

  const email =
    String(

      estudiante.email ||

      estudiante.emailAddress ||

      estudiante.emailaddress ||

      estudiante.correo ||

      estudiante.correoElectronico ||

      estudiante.correoelectronico ||

      estudiante.studentEmail ||

      estudiante.studentemail ||

      estudiante.user?.emailAddress ||

      estudiante.user?.email ||

      profile.emailAddress ||

      profile.emailaddress ||

      profile.email ||

      ""

    ).trim();


  // ----------------------------------------------------------
  // FOTO
  // ----------------------------------------------------------

  const photoUrl =
    String(

      estudiante.photoUrl ||

      estudiante.photoURL ||

      estudiante.photourl ||

      estudiante.photo ||

      estudiante.avatar ||

      estudiante.imagen ||

      profile.photoUrl ||

      profile.photo ||

      ""

    ).trim();


  // ----------------------------------------------------------
  // COURSE ID
  // ----------------------------------------------------------

  const normalizedCourseId =
    String(

      estudiante.courseId ||

      estudiante.courseID ||

      estudiante.courseid ||

      courseId ||

      ""

    ).trim();


  // ----------------------------------------------------------
  // RESULTADO
  // ----------------------------------------------------------

  return {

    id:
      userId,

    userId:
      userId,

    courseId:
      normalizedCourseId,

    nombre:
      nombre,

    nombreCompleto:
      nombre,

    email:
      email,

    photoUrl:
      photoUrl,

    permiso:
      estudiante.permiso === true,

    raw:
      estudiante

  };

}


// ============================================================
// NORMALIZAR LISTA
// ============================================================

function classroomNormalizarEstudiantes(
  estudiantes,
  courseId = ""
) {

  if (
    !Array.isArray(estudiantes)
  ) {

    return [];

  }


  return estudiantes

    .filter(
      estudiante =>
        estudiante !== null &&
        estudiante !== undefined
    )

    .map(
      estudiante =>
        classroomNormalizarEstudiante(
          estudiante,
          courseId
        )
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
// CURSO
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
// ACTIVIDADES
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
      "courseWork"
    ]
  );

}


// ============================================================
// ACTIVIDAD
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
// ESTRUCTURA
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
// ENTREGAS
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
// ESTUDIANTES
// ============================================================

export async function classroomObtenerEstudiantes(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🎓 CLASSROOM - OBTENER ESTUDIANTES"
  );


  console.log(
    "COURSE ID:",
    courseId
  );


  try {

    const response =
      await classroomRequest(
        "classroomObtenerEstudiantes",
        {
          courseId
        }
      );


    console.log(
      "🔥 RESPUESTA REAL DEL BACKEND:",
      response
    );


    console.log(
      "🔥 OK:",
      response?.ok
    );


    console.log(
      "🔥 DATA:",
      response?.data
    );


    console.log(
      "🔥 TOTAL BACKEND:",
      response?.total
    );


    console.log(
      "🔥 ESTUDIANTES:",
      response?.estudiantes
    );


    console.log(
      "🔥 ALUMNOS:",
      response?.alumnos
    );


    console.log(
      "🔥 STUDENTS:",
      response?.students
    );


    const estudiantesRaw =
      classroomExtraerArray(
        response,
        [
          "estudiantes",
          "alumnos",
          "students",
          "usuarios",
          "usuariosEstudiantes",
          "studentList",
          "studentUsers"
        ]
      );


    console.log(
      "🔥 ESTUDIANTES RAW EXTRAÍDOS:",
      estudiantesRaw
    );


    console.log(
      "🔥 TOTAL RAW:",
      estudiantesRaw.length
    );


    const estudiantes =
      classroomNormalizarEstudiantes(
        estudiantesRaw,
        courseId
      );


    console.log(
      "🔥 ESTUDIANTES NORMALIZADOS:",
      estudiantes
    );


    console.log(
      "🔥 TOTAL FINAL:",
      estudiantes.length
    );


    if (
      estudiantes.length === 0
    ) {

      classroomWarn(
        "⚠️ NO SE ENCONTRARON ESTUDIANTES."
      );

      classroomWarn(
        "Revisa el RAW RESPONSE."
      );

    }


    console.groupEnd();


    return estudiantes;

  }
  catch (error) {

    classroomError(
      "💥 ERROR OBTENIENDO ESTUDIANTES:",
      error
    );


    console.groupEnd();


    throw error;

  }

}


// ============================================================
// ALIAS ALUMNOS
// ============================================================

export async function classroomObtenerAlumnos(
  courseId
) {

  return classroomObtenerEstudiantes(
    courseId
  );

}


// ============================================================
// CARGAR ALUMNOS
// ============================================================

export async function classroomCargarAlumnos(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.log(
    "🎓 CARGANDO ALUMNOS:",
    courseId
  );


  const estudiantes =
    await classroomObtenerEstudiantes(
      courseId
    );


  console.log(
    "🎓 ALUMNOS CARGADOS:",
    estudiantes.length
  );


  return estudiantes;

}


// ============================================================
// ESTUDIANTE POR USER ID
// ============================================================

export async function classroomObtenerEstudiantePorUserId(
  courseId,
  userId
) {

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


  const response =
    await classroomRequest(
      "classroomObtenerEstudiantePorUserId",
      {
        courseId,
        userId
      }
    );


  const data =
    classroomExtraerData(
      response,
      null
    );


  if (!data) {

    return null;

  }


  return classroomNormalizarEstudiante(
    data,
    courseId
  );

}


// ============================================================
// ENTREGABLES CONSOLIDADOS
// ============================================================

export async function obtenerEntregablesClassroom(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "obtenerEntregablesClassroom",
      {
        courseId
      }
    );


  return classroomExtraerArray(
    response,
    [
      "entregables"
    ]
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


  if (!entregable) {

    throw new Error(
      "Debe especificarse entregable."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerActividadesPorEntregable",
      {
        courseId,
        entregable
      }
    );


  return classroomExtraerArray(
    response,
    [
      "entregables",
      "actividades",
      "activities"
    ]
  );

}


// ============================================================
// MAPA DE ENTREGABLES
// ============================================================

export async function classroomObtenerMapaEntregables(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerMapaEntregables",
      {
        courseId
      }
    );


  const data =
    classroomExtraerData(
      response,
      {}
    );


  return (
    data?.mapa ||
    response?.mapa ||
    {
      EN1: null,
      EN2: null,
      EN3: null
    }
  );

}


// ============================================================
// MAPA COMPLETO
// ============================================================

export async function classroomObtenerMapaEntregablesCompleto(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerMapaEntregablesCompleto",
      {
        courseId
      }
    );


  const data =
    classroomExtraerData(
      response,
      {}
    );


  return (
    data?.mapa ||
    response?.mapa ||
    {
      EN1: [],
      EN2: [],
      EN3: []
    }
  );

}


// ============================================================
// ALUMNO + ENTREGABLES
// ============================================================

export async function classroomObtenerAlumnoEntregables(
  courseId,
  userId
) {

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


  const response =
    await classroomRequest(
      "classroomObtenerAlumnoEntregables",
      {
        courseId,
        userId
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// BUSCAR SUBMISSION
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


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// ASIGNAR CALIFICACIÓN
//
// NO SE EJECUTA AUTOMÁTICAMENTE.
// ============================================================

export async function classroomAsignarCalificacion(
  courseId,
  courseWorkId,
  studentSubmissionId,
  puntaje
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


  if (
    puntaje === undefined ||
    puntaje === null ||
    puntaje === ""
  ) {

    throw new Error(
      "Debe especificarse puntaje."
    );

  }


  const numero =
    Number(puntaje);


  if (
    Number.isNaN(numero)
  ) {

    throw new Error(
      "El puntaje no es válido."
    );

  }


  if (
    numero < 0
  ) {

    throw new Error(
      "El puntaje no puede ser negativo."
    );

  }


  const response =
    await classroomRequest(
      "classroomAsignarCalificacion",
      {
        courseId,
        courseWorkId,
        studentSubmissionId,
        puntaje: numero
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// ENVIAR CALIFICACIÓN
//
// NO SE EJECUTA AUTOMÁTICAMENTE.
// ============================================================

export async function classroomEnviarCalificacion({
  courseId,
  courseWorkId,
  userId,
  entregable,
  puntaje
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


  if (!entregable) {

    throw new Error(
      "Debe especificarse entregable."
    );

  }


  if (
    CLASSROOM_ENTREGABLES.indexOf(
      String(entregable).toUpperCase()
    ) === -1
  ) {

    throw new Error(
      "Entregable inválido. Debe ser EN1, EN2 o EN3."
    );

  }


  if (
    puntaje === undefined ||
    puntaje === null ||
    puntaje === ""
  ) {

    throw new Error(
      "Debe especificarse puntaje."
    );

  }


  const numero =
    Number(puntaje);


  if (
    Number.isNaN(numero)
  ) {

    throw new Error(
      "El puntaje final no es válido."
    );

  }


  if (
    numero < 0
  ) {

    throw new Error(
      "El puntaje final no puede ser negativo."
    );

  }


  const response =
    await classroomRequest(
      "classroomEnviarCalificacion",
      {
        courseId,
        courseWorkId,
        userId,
        entregable:
          String(
            entregable
          ).toUpperCase(),
        puntaje:
          numero
      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// ENVIAR 3 CALIFICACIONES
//
// NO SE EJECUTA AUTOMÁTICAMENTE.
// ============================================================

export async function classroomEnviarCalificacionesAlumno({
  courseId,
  userId,
  calificaciones,
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


  if (!calificaciones) {

    throw new Error(
      "Debe especificarse calificaciones."
    );

  }


  if (!courseWorkIds) {

    throw new Error(
      "Debe especificarse courseWorkIds."
    );

  }


  const response =
    await classroomRequest(
      "classroomEnviarCalificacionesAlumno",
      {

        courseId,

        userId,

        calificaciones:
          JSON.stringify(
            calificaciones
          ),

        courseWorkIds:
          JSON.stringify(
            courseWorkIds
          )

      }
    );


  return classroomExtraerData(
    response,
    null
  );

}


// ============================================================
// PANEL COMPLETO
// ============================================================

export async function classroomObtenerPanelCalificacion(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  const response =
    await classroomRequest(
      "classroomObtenerPanelCalificacion",
      {
        courseId
      }
    );


  const data =
    classroomExtraerData(
      response,
      null
    );


  if (!data) {

    throw new Error(
      "La API no devolvió información del panel."
    );

  }


  const estudiantesRaw =
    classroomExtraerArray(
      data,
      [
        "estudiantes",
        "alumnos",
        "students",
        "usuarios"
      ]
    );


  const estudiantes =
    classroomNormalizarEstudiantes(
      estudiantesRaw,
      courseId
    );


  return {

    ...(Array.isArray(data) ? {} : data),

    estudiantes,

    totalEstudiantes:
      estudiantes.length,

    temas:
      Array.isArray(data?.temas)
        ? data.temas
        : [],

    actividadesSinTema:
      Array.isArray(data?.actividadesSinTema)
        ? data.actividadesSinTema
        : [],

    entregables:
      Array.isArray(data?.entregables)
        ? data.entregables
        : []

  };

}


// ============================================================
// CARGAR PANEL COMPLETO
// ============================================================

export async function classroomCargarPanelCompleto(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.log(
    "🚀 CARGANDO PANEL COMPLETO:",
    courseId
  );


  let panel;


  try {

    panel =
      await classroomObtenerPanelCalificacion(
        courseId
      );

  }
  catch (error) {

    console.warn(
      "⚠️ PANEL FALLÓ:",
      error
    );


    panel = {

      estudiantes: [],

      totalEstudiantes: 0,

      temas: [],

      actividadesSinTema: [],

      entregables: []

    };

  }


  if (
    Array.isArray(panel.estudiantes) &&
    panel.estudiantes.length > 0
  ) {

    console.log(
      "🎓 ALUMNOS DEL PANEL:",
      panel.estudiantes.length
    );


    return panel;

  }


  console.log(
    "⚠️ EL PANEL NO TRAJO ALUMNOS."
  );


  console.log(
    "🔄 CARGANDO ALUMNOS DIRECTAMENTE..."
  );


  const estudiantes =
    await classroomObtenerEstudiantes(
      courseId
    );


  console.log(
    "🎓 ALUMNOS DIRECTOS:",
    estudiantes.length
  );


  return {

    ...panel,

    estudiantes,

    totalEstudiantes:
      estudiantes.length

  };

}


// ============================================================
// TEST 1 — CONEXIÓN
//
// SOLO LECTURA.
// NO ENVÍA NADA.
// ============================================================

export async function classroomTestConexion(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 TEST 1 — CLASSROOM"
  );


  try {

    const estudiantes =
      await classroomObtenerEstudiantes(
        courseId
      );


    const resultado = {

      ok:
        true,

      courseId:
        courseId,

      total:
        estudiantes.length,

      estudiantes:
        estudiantes

    };


    console.log(
      "🧪 RESULTADO FINAL:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 TEST FALLIDO:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      total:
        0,

      estudiantes:
        [],

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST 2 — CURSOS
//
// SOLO LECTURA.
// ============================================================

export async function classroomTestCursos() {

  console.group(
    "🧪 TEST 2 — CURSOS"
  );


  try {

    const cursos =
      await classroomObtenerCursos();


    const resultado = {

      ok:
        true,

      total:
        cursos.length,

      cursos:
        cursos

    };


    console.log(
      "🧪 CURSOS:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 ERROR CURSOS:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      total:
        0,

      cursos:
        [],

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST 3 — ACTIVIDADES
//
// SOLO LECTURA.
// ============================================================

export async function classroomTestActividades(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 TEST 3 — ACTIVIDADES"
  );


  try {

    const actividades =
      await classroomObtenerActividades(
        courseId
      );


    const resultado = {

      ok:
        true,

      courseId:
        courseId,

      total:
        actividades.length,

      actividades:
        actividades

    };


    console.log(
      "🧪 ACTIVIDADES:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 ERROR ACTIVIDADES:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      total:
        0,

      actividades:
        [],

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST 4 — TEMAS
//
// SOLO LECTURA.
// ============================================================

export async function classroomTestTemas(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 TEST 4 — TEMAS"
  );


  try {

    const temas =
      await classroomObtenerTemas(
        courseId
      );


    const resultado = {

      ok:
        true,

      courseId:
        courseId,

      total:
        temas.length,

      temas:
        temas

    };


    console.log(
      "🧪 TEMAS:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 ERROR TEMAS:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      total:
        0,

      temas:
        [],

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST 5 — ENTREGABLES
//
// SOLO LECTURA.
// ============================================================

export async function classroomTestEntregables(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 TEST 5 — ENTREGABLES"
  );


  try {

    const entregables =
      await obtenerEntregablesClassroom(
        courseId
      );


    const resultado = {

      ok:
        true,

      courseId:
        courseId,

      total:
        entregables.length,

      entregables:
        entregables

    };


    console.log(
      "🧪 ENTREGABLES:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 ERROR ENTREGABLES:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      total:
        0,

      entregables:
        [],

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST 6 — MAPA EN1 / EN2 / EN3
//
// SOLO LECTURA.
// ============================================================

export async function classroomTestMapaEntregables(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 TEST 6 — MAPA ENTREGABLES"
  );


  try {

    const mapa =
      await classroomObtenerMapaEntregables(
        courseId
      );


    const resultado = {

      ok:
        true,

      courseId:
        courseId,

      mapa:
        mapa

    };


    console.log(
      "🧪 MAPA:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 ERROR MAPA:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      mapa:
        null,

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST 7 — PANEL COMPLETO
//
// SOLO LECTURA.
// ============================================================

export async function classroomTestPanel(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 TEST 7 — PANEL COMPLETO"
  );


  try {

    const panel =
      await classroomCargarPanelCompleto(
        courseId
      );


    const resultado = {

      ok:
        true,

      courseId:
        courseId,

      totalEstudiantes:
        panel.totalEstudiantes,

      totalTemas:
        Array.isArray(panel.temas)
          ? panel.temas.length
          : 0,

      totalEntregables:
        Array.isArray(panel.entregables)
          ? panel.entregables.length
          : 0,

      panel:
        panel

    };


    console.log(
      "🧪 PANEL:",
      resultado
    );


    console.groupEnd();


    return resultado;

  }
  catch (error) {

    console.error(
      "🧪 ERROR PANEL:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      totalEstudiantes:
        0,

      totalTemas:
        0,

      totalEntregables:
        0,

      panel:
        null,

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// DIAGNÓSTICO RAW
//
// NO NORMALIZA.
// NO ENVÍA.
// ============================================================

export async function classroomDiagnosticoEstudiantes(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🔬 DIAGNÓSTICO RAW ESTUDIANTES"
  );


  try {

    const response =
      await classroomRequest(
        "classroomObtenerEstudiantes",
        {
          courseId
        }
      );


    console.log(
      "COURSE ID:",
      courseId
    );


    console.log(
      "RESPONSE COMPLETA:",
      response
    );


    console.log(
      "response.ok:",
      response?.ok
    );


    console.log(
      "response.data:",
      response?.data
    );


    console.log(
      "response.estudiantes:",
      response?.estudiantes
    );


    console.log(
      "response.alumnos:",
      response?.alumnos
    );


    console.log(
      "response.students:",
      response?.students
    );


    console.log(
      "response.total:",
      response?.total
    );


    const encontrados =
      classroomBuscarArrays(
        response,
        [
          "estudiantes",
          "alumnos",
          "students",
          "usuarios"
        ]
      );


    console.log(
      "🔎 TODOS LOS ARRAYS ENCONTRADOS:",
      encontrados
    );


    console.groupEnd();


    return {

      ok:
        true,

      courseId:
        courseId,

      response:
        response,

      arrays:
        encontrados

    };

  }
  catch (error) {

    console.error(
      "💥 DIAGNÓSTICO FALLIDO:",
      error
    );


    console.groupEnd();


    return {

      ok:
        false,

      courseId:
        courseId,

      error:
        error?.message ||
        String(error)

    };

  }

}


// ============================================================
// TEST GENERAL DE LECTURA
//
// ESTE ES EL TEST QUE VAMOS A USAR AHORA.
//
// NO ENVÍA CALIFICACIONES.
// NO MODIFICA CLASSROOM.
// SOLO LEE.
// ============================================================

export async function classroomTestLecturaCompleta(
  courseId
) {

  if (!courseId) {

    throw new Error(
      "Debe especificarse courseId."
    );

  }


  console.group(
    "🧪 CLASSROOM — TEST COMPLETO DE LECTURA"
  );


  const resultado = {

    ok:
      true,

    courseId:
      courseId,

    cursos:
      null,

    curso:
      null,

    estudiantes:
      null,

    actividades:
      null,

    temas:
      null,

    entregables:
      null,

    mapa:
      null,

    panel:
      null,

    errores:
      []

  };


  // ----------------------------------------------------------
  // CURSOS
  // ----------------------------------------------------------

  try {

    resultado.cursos =
      await classroomObtenerCursos();

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "cursos",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // CURSO
  // ----------------------------------------------------------

  try {

    resultado.curso =
      await classroomObtenerCurso(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "curso",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // ESTUDIANTES
  // ----------------------------------------------------------

  try {

    resultado.estudiantes =
      await classroomObtenerEstudiantes(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "estudiantes",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // ACTIVIDADES
  // ----------------------------------------------------------

  try {

    resultado.actividades =
      await classroomObtenerActividades(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "actividades",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // TEMAS
  // ----------------------------------------------------------

  try {

    resultado.temas =
      await classroomObtenerTemas(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "temas",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // ENTREGABLES
  // ----------------------------------------------------------

  try {

    resultado.entregables =
      await obtenerEntregablesClassroom(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "entregables",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // MAPA
  // ----------------------------------------------------------

  try {

    resultado.mapa =
      await classroomObtenerMapaEntregables(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "mapa",

      error:
        error?.message ||
        String(error)

    });

  }


  // ----------------------------------------------------------
  // PANEL
  // ----------------------------------------------------------

  try {

    resultado.panel =
      await classroomCargarPanelCompleto(
        courseId
      );

  }
  catch (error) {

    resultado.errores.push({

      prueba:
        "panel",

      error:
        error?.message ||
        String(error)

    });

  }


  resultado.ok =
    resultado.errores.length === 0;


  console.log(
    "=============================================="
  );


  console.log(
    "🧪 RESULTADO TEST COMPLETO"
  );


  console.log(
    resultado
  );


  console.log(
    "CURSOS:",
    resultado.cursos?.length ?? 0
  );


  console.log(
    "ESTUDIANTES:",
    resultado.estudiantes?.length ?? 0
  );


  console.log(
    "ACTIVIDADES:",
    resultado.actividades?.length ?? 0
  );


  console.log(
    "TEMAS:",
    resultado.temas?.length ?? 0
  );


  console.log(
    "ENTREGABLES:",
    resultado.entregables?.length ?? 0
  );


  console.log(
    "ERRORES:",
    resultado.errores
  );


  console.log(
    "=============================================="
  );


  console.groupEnd();


  return resultado;

}


// ============================================================
// EXPONER FUNCIONES EN WINDOW
// ============================================================

if (
  typeof window !== "undefined"
) {

  // ----------------------------------------------------------
  // TESTS
  // ----------------------------------------------------------

  window.classroomTestConexion =
    classroomTestConexion;


  window.classroomTestCursos =
    classroomTestCursos;


  window.classroomTestActividades =
    classroomTestActividades;


  window.classroomTestTemas =
    classroomTestTemas;


  window.classroomTestEntregables =
    classroomTestEntregables;


  window.classroomTestMapaEntregables =
    classroomTestMapaEntregables;


  window.classroomTestPanel =
    classroomTestPanel;


  window.classroomTestLecturaCompleta =
    classroomTestLecturaCompleta;


  // ----------------------------------------------------------
  // DIAGNÓSTICO
  // ----------------------------------------------------------

  window.classroomDiagnosticoEstudiantes =
    classroomDiagnosticoEstudiantes;


  // ----------------------------------------------------------
  // ALUMNOS
  // ----------------------------------------------------------

  window.classroomObtenerEstudiantes =
    classroomObtenerEstudiantes;


  window.classroomObtenerAlumnos =
    classroomObtenerAlumnos;


  window.classroomCargarAlumnos =
    classroomCargarAlumnos;

}


// ============================================================
// FIN classroomService.js
// ============================================================