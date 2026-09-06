// =====================================================
// SERVICIO DE ESTUDIANTES
// ARCHIVO:
// src/modules/admin/services/estudiantesService.js
// =====================================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbzAdBZ-hOKRW_Y25WDpVb3okv7Fr12Hx0h1V10-na432pWDKOTtTuhu1RKL9e45iC9AZQ/exec";


// =====================================================
// REGISTRAR ACCESO
// =====================================================

export async function registrarAcceso(datos) {

  if (!datos?.correo) {

    throw new Error(
      "El correo del estudiante es obligatorio."
    );

  }


  const params =
    new URLSearchParams({

      accion:
        "registrarAcceso",

      correo:
        datos.correo,

      nombre:
        datos.nombre || "",

      foto:
        datos.foto || ""

    });


  const response =
    await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );


  if (!response.ok) {

    throw new Error(
      "No se pudo conectar con el servidor de estudiantes."
    );

  }


  const resultado =
    await response.json();


  if (!resultado?.ok) {

    throw new Error(
      resultado?.mensaje ||
      "No se pudo registrar el acceso."
    );

  }


  return (
    resultado?.data ||
    null
  );

}


// =====================================================
// OBTENER TODOS LOS ESTUDIANTES
// =====================================================

export async function obtenerEstudiantes(
  datos = {}
) {

  const params =
    new URLSearchParams({

      accion:
        "obtenerEstudiantes",

      semestre:
        datos.semestre || ""

    });


  const response =
    await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );


  if (!response.ok) {

    throw new Error(
      "No se pudo conectar con el servidor."
    );

  }


  const resultado =
    await response.json();


  if (!resultado?.ok) {

    throw new Error(
      resultado?.mensaje ||
      "No se pudieron obtener los estudiantes."
    );

  }


  return Array.isArray(
    resultado?.data?.estudiantes
  )
    ? resultado.data.estudiantes
    : [];

}


// =====================================================
// OBTENER ESTUDIANTE POR CORREO
// =====================================================

export async function obtenerEstudiantePorCorreo(
  correo
) {

  if (!correo) {

    throw new Error(
      "El correo es obligatorio."
    );

  }


  const params =
    new URLSearchParams({

      accion:
        "obtenerEstudiantePorCorreo",

      correo:
        correo

    });


  const response =
    await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );


  if (!response.ok) {

    throw new Error(
      "No se pudo consultar el estudiante."
    );

  }


  const resultado =
    await response.json();


  if (!resultado?.ok) {

    throw new Error(
      resultado?.mensaje ||
      "No se pudo obtener el estudiante."
    );

  }


  return (
    resultado?.data ||
    null
  );

}


// =====================================================
// ACTUALIZAR PERFIL DEL ESTUDIANTE
// =====================================================

export async function actualizarPerfilEstudiante(
  datos
) {

  if (!datos?.correo) {

    throw new Error(
      "El correo del estudiante es obligatorio."
    );

  }


  const params =
    new URLSearchParams({

      accion:
        "actualizarPerfilEstudiante",

      correo:
        datos.correo || "",

      nombre:
        datos.nombre || "",

      foto:
        datos.foto || "",

      carrera:
        datos.carrera || "",

      universidad:
        datos.universidad || "",

      semestre:
        datos.semestre || ""

    });


  console.log(
    "===================================="
  );

  console.log(
    "ACTUALIZANDO PERFIL ESTUDIANTE"
  );

  console.log({

    correo:
      datos.correo,

    nombre:
      datos.nombre,

    foto:
      datos.foto
        ? "FOTO RECIBIDA"
        : "SIN FOTO",

    carrera:
      datos.carrera,

    universidad:
      datos.universidad,

    semestre:
      datos.semestre

  });


  const response =
    await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );


  if (!response.ok) {

    throw new Error(
      "No se pudo actualizar el perfil del estudiante."
    );

  }


  const resultado =
    await response.json();


  console.log(
    "RESPUESTA ACTUALIZAR PERFIL:",
    resultado
  );


  if (!resultado?.ok) {

    throw new Error(
      resultado?.mensaje ||
      "No se pudo actualizar el perfil."
    );

  }


  return (
    resultado?.data ||
    null
  );

}


// =====================================================
// ESTADÍSTICAS
// =====================================================

export async function obtenerEstadisticasEstudiantes() {

  const params =
    new URLSearchParams({

      accion:
        "obtenerEstadisticasEstudiantes"

    });


  const response =
    await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );


  if (!response.ok) {

    throw new Error(
      "No se pudieron obtener las estadísticas."
    );

  }


  const resultado =
    await response.json();


  if (!resultado?.ok) {

    throw new Error(
      resultado?.mensaje ||
      "No se pudieron obtener las estadísticas."
    );

  }


  return (
    resultado?.data ||
    {
      total: 0,
      porSemestre: {}
    }
  );

}
