// ============================================================
// GOOGLE CLASSROOM SERVICE
// ARCHIVO: classroomService.js
// ============================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbz28-RqRVCmyyRtkm9u4-e4S7Arlz8WiEPXwQ0cKxhiGZ8nMZZr4d8T2TMXuQ-ny3wFdA/exec";

// ============================================================
// LLAMAR API
// ============================================================

async function llamarAPI(
  accion,
  datos = {}
) {

  console.log(
    "===================================="
  );

  console.log(
    "API REQUEST:",
    {
      accion,
      datos
    }
  );


  // ==========================================================
  // IMPORTANTE
  //
  // El backend API.gs espera:
  //
  // {
  //   accion: "...",
  //   courseId: "...",
  //   courseWorkId: "..."
  // }
  //
  // NO:
  //
  // {
  //   accion: "...",
  //   datos: {
  //      courseId: "..."
  //   }
  // }
  //
  // Por eso expandimos datos con ...datos.
  // ==========================================================

  const body = {
    accion,
    ...datos
  };


  console.log(
    "API BODY:",
    body
  );


  const response =
    await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },

        body:
          JSON.stringify(body),
      }
    );


  if (!response.ok) {

    throw new Error(
      `Error HTTP ${response.status}`
    );

  }


  const resultado =
    await response.json();


  console.log(
    "API RESPONSE:",
    resultado
  );


  if (
    resultado &&
    resultado.ok === false
  ) {

    throw new Error(
      resultado.mensaje ||
      resultado.error ||
      "La API devolvió un error."
    );

  }


  return resultado;

}


// ============================================================
// SERVICE
// ============================================================

const classroomService = {


  // ==========================================================
  // CURSOS
  // ==========================================================

  async obtenerCursos() {

    return await llamarAPI(
      "classroomObtenerCursos"
    );

  },


  // ==========================================================
  // CURSO
  // ==========================================================

  async obtenerCurso(
    courseId
  ) {

    if (!courseId) {

      throw new Error(
        "Debe especificarse courseId."
      );

    }


    return await llamarAPI(
      "classroomObtenerCurso",
      {
        courseId
      }
    );

  },


  // ==========================================================
  // TEMAS
  // ==========================================================

  async obtenerTemas(
    courseId
  ) {

    if (!courseId) {

      throw new Error(
        "Debe especificarse courseId."
      );

    }


    return await llamarAPI(
      "classroomObtenerTemas",
      {
        courseId
      }
    );

  },


  // ==========================================================
  // ACTIVIDADES
  // ==========================================================

  async obtenerActividades(
    courseId
  ) {

    if (!courseId) {

      throw new Error(
        "Debe especificarse courseId."
      );

    }


    console.log(
      "CLASSROOM SERVICE: obteniendo actividades",
      {
        courseId
      }
    );


    return await llamarAPI(
      "classroomObtenerActividades",
      {
        courseId
      }
    );

  },


  // ==========================================================
  // ESTRUCTURA
  // ==========================================================

  async obtenerEstructura(
    courseId
  ) {

    if (!courseId) {

      throw new Error(
        "Debe especificarse courseId."
      );

    }


    return await llamarAPI(
      "classroomObtenerEstructura",
      {
        courseId
      }
    );

  },


  // ==========================================================
  // ACTIVIDAD
  // ==========================================================

  async obtenerActividad(
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


    return await llamarAPI(
      "classroomObtenerActividad",
      {
        courseId,
        courseWorkId
      }
    );

  },


  // ==========================================================
  // ENTREGAS
  // ==========================================================

  async obtenerEntregas(
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


    console.log(
      "CLASSROOM SERVICE: obteniendo entregas",
      {
        courseId,
        courseWorkId
      }
    );


    return await llamarAPI(
      "classroomObtenerEntregas",
      {
        courseId,
        courseWorkId
      }
    );

  },


  // ==========================================================
  // ENTREGABLES CLASSROOM
  // ==========================================================

  async obtenerEntregablesClassroom(
    courseId
  ) {

    if (!courseId) {

      throw new Error(
        "Debe especificarse courseId."
      );

    }


    return await llamarAPI(
      "obtenerEntregablesClassroom",
      {
        courseId
      }
    );

  },


  // ==========================================================
  // ASIGNAR CALIFICACIÓN
  // ==========================================================

  async asignarCalificacion({
    courseId,
    courseWorkId,
    studentSubmissionId,
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


    if (!studentSubmissionId) {

      throw new Error(
        "Debe especificarse studentSubmissionId."
      );

    }


    return await llamarAPI(
      "guardarCalificacionClassroom",
      {
        courseId,
        courseWorkId,
        studentSubmissionId,
        puntaje
      }
    );

  },


  // ==========================================================
  // CALIFICAR ALUMNO POR USER ID
  // ==========================================================

  async calificarAlumnoClassroom({
    courseId,
    courseWorkId,
    userId,
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


    return await llamarAPI(
      "calificarAlumnoClassroom",
      {
        courseId,
        courseWorkId,
        userId,
        puntaje
      }
    );

  },


  // ==========================================================
  // CALIFICAR ENTREGABLES
  // ==========================================================

  async calificarEntregables({
    entregable,
    resultados
  }) {

    return await llamarAPI(
      "calificarEntregables",
      {
        entregable,
        resultados
      }
    );

  },


  // ==========================================================
  // EN1
  // ==========================================================

  async calificarEN1(
    resultados
  ) {

    return await this.calificarEntregables({
      entregable: "EN1",
      resultados
    });

  },


  // ==========================================================
  // EN2
  // ==========================================================

  async calificarEN2(
    resultados
  ) {

    return await this.calificarEntregables({
      entregable: "EN2",
      resultados
    });

  },


  // ==========================================================
  // EN3
  // ==========================================================

  async calificarEN3(
    resultados
  ) {

    return await this.calificarEntregables({
      entregable: "EN3",
      resultados
    });

  }

};


export default classroomService;
