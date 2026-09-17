// ==================================================
// STUDENT SERVICE
// VG SMART REVIEW
// ==================================================

// ==================================================
// API GOOGLE APPS SCRIPT
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbz5ciCIdcTDo1FjhAzhbFPg_8NTPuLr6DuaaWH2JJ5p854Llm-XR0Lsz8iBkAzGsoa0kg/exec";
// ==================================================
// FUNCIÓN BASE
// ==================================================

async function requestAPI(datos) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded;charset=UTF-8"
      },

      body:
        new URLSearchParams(datos)

    });


  const texto =
    await response.text();


  console.log(
    "===================================="
  );

  console.log(
    "RESPUESTA API:"
  );

  console.log(
    texto
  );


  let json;


  try {

    json =
      JSON.parse(texto);

  }
  catch (error) {

    console.error(
      "Respuesta no válida:",
      texto
    );

    throw new Error(
      "El servidor devolvió una respuesta inválida."
    );

  }


  if (!json.ok) {

    throw new Error(
      json.mensaje ||
      json.message ||
      "La operación no pudo realizarse."
    );

  }


  return json.data;

}



// ==================================================
// OBTENER ESTUDIANTE DE PRUEBA
// ==================================================

export async function obtenerEstudiantePrueba(
  correo = "fernando.canales@vallegrande.edu.pe"
) {

  if (
    !correo ||
    !correo.trim()
  ) {

    throw new Error(
      "No se recibió el correo del estudiante de prueba."
    );

  }


  const correoNormalizado =
    correo.trim().toLowerCase();


  console.log(
    "===================================="
  );

  console.log(
    "BUSCANDO ESTUDIANTE DE PRUEBA:"
  );

  console.log(
    correoNormalizado
  );


  const data =
    await requestAPI({

      accion:
        "estudiantePrueba",

      correo:
        correoNormalizado

    });


  console.log(
    "===================================="
  );

  console.log(
    "ESTUDIANTE DE PRUEBA RECIBIDO:"
  );

  console.log(
    data
  );


  if (!data) {

    throw new Error(
      "El estudiante de prueba no fue encontrado."
    );

  }


  return data;

}



// ==================================================
// OBTENER NOMBRE DEL DOCUMENTO
// ==================================================

export async function getDocumentName(url) {

  if (
    !url ||
    !url.trim()
  ) {

    throw new Error(
      "No se recibió la URL del documento."
    );

  }


  const data =
    await requestAPI({

      accion:
        "obtenerNombre",

      url:
        url.trim()

    });


  const nombre =
    data?.nombre ||
    data;


  if (!nombre) {

    throw new Error(
      "No fue posible obtener el nombre del documento."
    );

  }


  return String(nombre).trim();

}



// ==================================================
// ANALIZAR UN SOLO DOCUMENTO
// ==================================================

export async function analyzeDocument(url) {

  if (
    !url ||
    !url.trim()
  ) {

    throw new Error(
      "No se recibió la URL del documento."
    );

  }


  console.log(
    "===================================="
  );

  console.log(
    "ANALIZANDO DOCUMENTO:"
  );

  console.log(
    url
  );


  const data =
    await requestAPI({

      accion:
        "analizar",

      url:
        url.trim()

    });


  console.log(
    "===================================="
  );

  console.log(
    "RESULTADO DEL ANÁLISIS:"
  );

  console.log(
    data
  );


  return data;

}



// ==================================================
// GUARDAR ANÁLISIS
// ==================================================

export async function guardarAnalisis({

  url = "",

  nombre = "",

  resumen = {},

  puntaje = {},

  criterios = [],

  correo = "",

  fechaRevision = ""

}) {


  /*
   * La fecha se genera una sola vez.
   */

  const fechaFinal =
    fechaRevision ||
    new Date().toISOString();


  console.log(
    "===================================="
  );

  console.log(
    "GUARDANDO ANÁLISIS..."
  );


  console.log({

    url,

    nombre,

    correo,

    fechaRevision:
      fechaFinal

  });


  const data =
    await requestAPI({

      accion:
        "guardarAnalisis",

      url:
        url,

      nombre:
        nombre,

      resumen:
        JSON.stringify(
          resumen || {}
        ),

      puntaje:
        JSON.stringify(
          puntaje || {}
        ),

      criterios:
        JSON.stringify(
          criterios || []
        ),

      correo:
        correo,

      fechaRevision:
        fechaFinal

    });


  console.log(
    "ANÁLISIS GUARDADO:"
  );

  console.log(
    data
  );


  return data;

}



// ==================================================
// OBTENER HISTORIAL DEL ESTUDIANTE
// ==================================================

export async function obtenerHistorial(
  correo = ""
) {

  const data =
    await requestAPI({

      accion:
        "obtenerHistorial",

      correo:
        correo || ""

    });


  /*
   * Apps Script puede devolver:
   *
   * []
   *
   * {
   *   historial: []
   * }
   *
   * {
   *   documentos: []
   * }
   */


  if (
    Array.isArray(data)
  ) {

    return data;

  }


  if (
    Array.isArray(
      data?.historial
    )
  ) {

    return data.historial;

  }


  if (
    Array.isArray(
      data?.documentos
    )
  ) {

    return data.documentos;

  }


  return [];

}



// ==================================================
// OBTENER CORREO DEL ESTUDIANTE
// ==================================================

export function obtenerCorreoEstudiante() {


  /*
   * Primero buscamos valores directos.
   */

  const posiblesValores = [

    localStorage.getItem(
      "correo"
    ),

    localStorage.getItem(
      "email"
    ),

    localStorage.getItem(
      "usuarioCorreo"
    ),

    localStorage.getItem(
      "studentEmail"
    )

  ];


  for (
    const valor
    of posiblesValores
  ) {

    if (
      typeof valor === "string" &&
      valor.trim()
    ) {

      return valor.trim();

    }

  }



  /*
   * Luego buscamos objetos.
   */

  const posiblesObjetos = [

    "usuario",

    "user",

    "estudiante",

    "student"

  ];


  for (
    const key
    of posiblesObjetos
  ) {

    try {

      const valor =
        localStorage.getItem(
          key
        );


      if (!valor) {

        continue;

      }


      const objeto =
        JSON.parse(
          valor
        );


      const correo =
        objeto?.correo ||
        objeto?.email ||
        objeto?.usuarioCorreo ||
        objeto?.studentEmail;


      if (
        typeof correo === "string" &&
        correo.trim()
      ) {

        return correo.trim();

      }

    }
    catch (error) {

      /*
       * No hacemos nada.
       * Puede ser un valor que no sea JSON.
       */

    }

  }


  return "";

}



// ==================================================
// EXPORTACIÓN
// ==================================================

export {
  API_URL
};
