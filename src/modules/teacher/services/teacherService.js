// ==================================================
// API DOCENTE
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbwjlLll1GYcg1i4mesnFVcKzNA5UcDA_yGgApyQUN9Tg_9LBUD2lk-tjmwHm9svN5l--Q/exec";

// ==================================================
// PETICIÓN GENERAL
// ==================================================

async function enviarPeticion(datos) {

  console.log("========================================");
  console.log("ENVIANDO AL BACK:");
  console.log(JSON.stringify(datos, null, 2));

  const inicio = performance.now();

  let response;

  try {

    response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(datos)
      }
    );

  }
  catch (error) {

    console.error(
      "ERROR DE CONEXIÓN:",
      error
    );

    throw new Error(
      "No se pudo conectar con el servidor: " +
      (
        error?.message ||
        "error desconocido"
      )
    );

  }


  const fin =
    performance.now();


  console.log(
    "TIEMPO:",
    ((fin - inicio) / 1000).toFixed(2),
    "segundos"
  );


  console.log(
    "STATUS HTTP:",
    response.status
  );


  let texto;


  try {

    texto =
      await response.text();

  }
  catch (error) {

    throw new Error(
      "No se pudo leer la respuesta del servidor."
    );

  }


  console.log(
    "RESPUESTA RAW:",
    texto
  );


  if (
    !texto ||
    !texto.trim()
  ) {

    throw new Error(
      "El servidor devolvió una respuesta vacía."
    );

  }


  let json;


  try {

    json =
      JSON.parse(texto);

  }
  catch (error) {

    console.error(
      "RESPUESTA NO ES JSON:",
      texto
    );

    throw new Error(
      "El servidor devolvió una respuesta inválida."
    );

  }


  if (
    typeof json !== "object" ||
    json === null
  ) {

    throw new Error(
      "La respuesta del servidor tiene un formato incorrecto."
    );

  }


  if (!json.ok) {

    console.error(
      "ERROR DEL BACK:",
      json
    );

    throw new Error(
      json.mensaje ||
      json.message ||
      "Error en el servidor."
    );

  }


  console.log(
    "RESPUESTA CORRECTA:",
    JSON.stringify(
      json.data,
      null,
      2
    )
  );


  return json.data;

}


// ==================================================
// ANALIZAR CARPETA
// ==================================================

export async function analyzeFolder(url) {

  if (
    !url ||
    !String(url).trim()
  ) {

    throw new Error(
      "No se proporcionó una URL de carpeta."
    );

  }


  const urlLimpia =
    String(url).trim();


  console.log(
    "========================================"
  );

  console.log(
    "ANALIZANDO CARPETA"
  );

  console.log(
    "URL:",
    urlLimpia
  );


  const resultado =
    await enviarPeticion({

      accion:
        "analizarCarpeta",

      url:
        urlLimpia

    });


  console.log(
    "========================================"
  );

  console.log(
    "RESULTADO DE ANALIZAR CARPETA:"
  );

  console.log(
    JSON.stringify(
      resultado,
      null,
      2
    )
  );


  return resultado;

}


// ==================================================
// CONSOLIDAR ENTREGABLES
// ==================================================

export async function consolidarEntregables(
  entrada
) {

  console.log(
    "========================================"
  );

  console.log(
    "CONSOLIDAR ENTREGABLES"
  );

  console.log(
    "ENTRADA:",
    JSON.stringify(
      entrada,
      null,
      2
    )
  );


  let carpetas = null;


  // ==================================================
  // CASO:
  //
  // {
  //   EN1: "...",
  //   EN2: "...",
  //   EN3: "..."
  // }
  // ==================================================

  if (
    entrada &&
    (
      entrada.EN1 !== undefined ||
      entrada.EN2 !== undefined ||
      entrada.EN3 !== undefined
    )
  ) {

    carpetas =
      entrada;

  }


  // ==================================================
  // CASO:
  //
  // {
  //   carpetas: {
  //     EN1: "...",
  //     EN2: "...",
  //     EN3: "..."
  //   }
  // }
  // ==================================================

  else if (
    entrada &&
    entrada.carpetas
  ) {

    carpetas =
      entrada.carpetas;

  }


  if (!carpetas) {

    throw new Error(
      "No se recibieron las carpetas."
    );

  }


  // ==================================================
  // LIMPIAR URLS
  // ==================================================

  const EN1 =
    String(
      carpetas.EN1 || ""
    ).trim();


  const EN2 =
    String(
      carpetas.EN2 || ""
    ).trim();


  const EN3 =
    String(
      carpetas.EN3 || ""
    ).trim();


  // ==================================================
  // VALIDAR
  // ==================================================

  if (
    !EN1 &&
    !EN2 &&
    !EN3
  ) {

    throw new Error(
      "Debes ingresar al menos una carpeta."
    );

  }


  // ==================================================
  // DATOS
  // ==================================================

  const datos = {

    accion:
      "consolidarEntregables",

    carpetas: {

      EN1:
        EN1,

      EN2:
        EN2,

      EN3:
        EN3

    }

  };


  console.log(
    "DATOS PARA BACK:",
    JSON.stringify(
      datos,
      null,
      2
    )
  );


  // ==================================================
  // CONSUMIR BACKEND
  // ==================================================

  const resultado =
    await enviarPeticion(
      datos
    );


  // ==================================================
  // NORMALIZAR RESPUESTA
  // ==================================================

  const respuestaFinal = {

    fechaHoraConsolidacion:
      resultado?.fechaHoraConsolidacion ||
      null,

    totalAlumnos:
      Number(
        resultado?.totalAlumnos || 0
      ),

    consolidado:
      Array.isArray(
        resultado?.consolidado
      )
        ? resultado.consolidado
        : [],

    totalNoValidos:
      Number(
        resultado?.totalNoValidos || 0
      ),

    noValidos:
      Array.isArray(
        resultado?.noValidos
      )
        ? resultado.noValidos
        : []

  };


  console.log(
    "========================================"
  );

  console.log(
    "CONSOLIDACIÓN RECIBIDA:"
  );

  console.log(
    JSON.stringify(
      respuestaFinal,
      null,
      2
    )
  );


  return respuestaFinal;

}


// ==================================================
// OBTENER NOMBRE DE DOCUMENTO
// ==================================================

export async function obtenerNombreDocumento(
  url
) {

  if (
    !url ||
    !String(url).trim()
  ) {

    throw new Error(
      "No se proporcionó la URL del documento."
    );

  }


  const resultado =
    await enviarPeticion({

      accion:
        "obtenerNombre",

      url:
        String(url).trim()

    });


  return resultado;

}


// ==================================================
// ANALIZAR DOCUMENTO
// ==================================================

export async function analizarDocumento(
  url
) {

  if (
    !url ||
    !String(url).trim()
  ) {

    throw new Error(
      "No se proporcionó la URL del documento."
    );

  }


  const resultado =
    await enviarPeticion({

      accion:
        "analizar",

      url:
        String(url).trim()

    });


  return resultado;

}


// ==================================================
// GUARDAR ANÁLISIS
// ==================================================

export async function guardarAnalisis(
  datos
) {

  if (!datos) {

    throw new Error(
      "No se recibieron los datos del análisis."
    );

  }


  return await enviarPeticion({

    accion:
      "guardarAnalisis",

    ...datos

  });

}


// ==================================================
// OBTENER HISTORIAL
// ==================================================

export async function obtenerHistorial(
  datos = {}
) {

  return await enviarPeticion({

    accion:
      "obtenerHistorial",

    ...datos

  });

}


// ==================================================
// EXPORTAR CSV DE CONSOLIDACIÓN
// ==================================================

export function exportarConsolidacionCSV(
  consolidado
) {

  if (
    !Array.isArray(consolidado) ||
    consolidado.length === 0
  ) {

    throw new Error(
      "No existen datos para exportar."
    );

  }


  const encabezados = [

    "Alumno",
    "Semestre",
    "Informe",
    "EN1",
    "EN2",
    "EN3",
    "Total"

  ];


  const filas =
    consolidado.map(
      alumno => [

        alumno.alumno ?? "",

        alumno.semestre ?? "",

        alumno.informe ?? "",

        alumno.EN1 ?? 0,

        alumno.EN2 ?? 0,

        alumno.EN3 ?? 0,

        alumno.total ?? 0

      ]
    );


  const csv = [

    encabezados,

    ...filas

  ]
    .map(
      fila =>
        fila
          .map(
            valor =>
              `"${String(valor)
                .replace(/"/g, '""')}"`
          )
          .join(",")
    )
    .join("\n");


  const blob =
    new Blob(
      [
        "\ufeff" + csv
      ],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const enlace =
    document.createElement("a");


  enlace.href =
    url;


  enlace.download =
    "consolidacion_entregables.csv";


  document.body.appendChild(
    enlace
  );


  enlace.click();


  document.body.removeChild(
    enlace
  );


  URL.revokeObjectURL(
    url
  );

}


// ==================================================
// EXPORTAR CSV NO VÁLIDOS
// ==================================================

export function exportarNoValidosCSV(
  noValidos
) {

  if (
    !Array.isArray(noValidos) ||
    noValidos.length === 0
  ) {

    throw new Error(
      "No existen documentos no válidos para exportar."
    );

  }


  const encabezados = [

    "Nombre",
    "Entregable",
    "Entregable detectado",
    "Fecha y hora",
    "Motivo"

  ];


  const filas =
    noValidos.map(
      item => [

        item.nombre ?? "",

        item.entregable ?? "",

        item.entregableDetectado ?? "",

        item.fechaHoraAnalisis ?? "",

        item.motivo ?? ""

      ]
    );


  const csv = [

    encabezados,

    ...filas

  ]
    .map(
      fila =>
        fila
          .map(
            valor =>
              `"${String(valor)
                .replace(/"/g, '""')}"`
          )
          .join(",")
    )
    .join("\n");


  const blob =
    new Blob(
      [
        "\ufeff" + csv
      ],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const enlace =
    document.createElement("a");


  enlace.href =
    url;


  enlace.download =
    "documentos_no_validos.csv";


  document.body.appendChild(
    enlace
  );


  enlace.click();


  document.body.removeChild(
    enlace
  );


  URL.revokeObjectURL(url);

}
