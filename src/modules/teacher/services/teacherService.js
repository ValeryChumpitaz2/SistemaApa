// ==================================================
// API DOCENTE
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxLM6_I-5OZGVEoH13C0tIefU-h56GNXkoTPVqTLYHAGRG-UaMEwY1vtUvNJKYnZ-JmIg/exec";

// ==================================================
// PETICIÓN GENERAL
// ==================================================

async function enviarPeticion(datos) {

  console.log("========================================");
  console.log("ENVIANDO AL BACK:");
  console.log(JSON.stringify(datos, null, 2));

  const inicio = performance.now();

  let response;

  // ==================================================
  // REALIZAR PETICIÓN      
  // ==================================================

  try {

    response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify(datos)
      }
    );

  } catch (error) {

    console.error(
      "========================================"
    );

    console.error(
      "ERROR REAL DE CONEXIÓN:"
    );

    console.error(error);

    console.error(
      "Nombre:",
      error?.name
    );

    console.error(
      "Mensaje:",
      error?.message
    );

    console.error(
      "URL:",
      API_URL
    );

    throw new Error(
      `No se pudo conectar con el servidor: ${
        error?.message ||
        "error desconocido"
      }`
    );
  }


  // ==================================================
  // TIEMPO DE RESPUESTA
  // ==================================================

  const fin =
    performance.now();

  console.log(
    "TIEMPO DE RESPUESTA:",
    ((fin - inicio) / 1000).toFixed(2),
    "segundos"
  );


  // ==================================================
  // VALIDAR RESPUESTA HTTP
  // ==================================================

  console.log(
    "STATUS HTTP:",
    response.status
  );

  console.log(
    "STATUS TEXT:",
    response.statusText
  );


  // ==================================================
  // RESPUESTA RAW
  // ==================================================

  let texto;

  try {

    texto =
      await response.text();

  } catch (error) {

    console.error(
      "ERROR LEYENDO RESPUESTA DEL SERVIDOR:",
      error
    );

    throw new Error(
      "No se pudo leer la respuesta del servidor."
    );
  }


  console.log(
    "========================================"
  );

  console.log(
    "RESPUESTA RAW DEL BACK:"
  );

  console.log(texto);


  // ==================================================
  // VALIDAR RESPUESTA VACÍA
  // ==================================================

  if (!texto || !texto.trim()) {

    console.error(
      "El servidor devolvió una respuesta vacía."
    );

    throw new Error(
      "El servidor devolvió una respuesta vacía."
    );
  }


  // ==================================================
  // PARSEAR JSON
  // ==================================================

  let json;

  try {

    json =
      JSON.parse(texto);

  } catch (error) {

    console.error(
      "========================================"
    );

    console.error(
      "ERROR: RESPUESTA NO VÁLIDA"
    );

    console.error(
      "Texto recibido:"
    );

    console.error(texto);

    console.error(
      "Error JSON:",
      error
    );

    throw new Error(
      "El servidor devolvió una respuesta inválida."
    );
  }


  // ==================================================
  // VALIDAR ESTRUCTURA
  // ==================================================

  if (
    typeof json !== "object" ||
    json === null
  ) {

    console.error(
      "La respuesta del servidor no es un objeto."
    );

    throw new Error(
      "La respuesta del servidor tiene un formato incorrecto."
    );
  }


  // ==================================================
  // VALIDAR OK
  // ==================================================

  if (!json.ok) {

    console.error(
      "========================================"
    );

    console.error(
      "ERROR DEVUELTO POR EL BACK:"
    );

    console.error(json);

    throw new Error(
      json.mensaje ||
      json.message ||
      "Error en el servidor."
    );
  }


  // ==================================================
  // RESPUESTA CORRECTA
  // ==================================================

  console.log(
    "========================================"
  );

  console.log(
    "RESPUESTA CORRECTA DEL BACK:"
  );

  console.log(
    JSON.stringify(
      json.data,
      null,
      2
    )
  );

  console.log(
    "========================================"
  );


  return json.data;
}


// ==================================================
// ANALIZAR UNA CARPETA
// ==================================================

export async function analyzeFolder(url) {

  // ==================================================
  // VALIDAR URL
  // ==================================================

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
    urlLimpia
  );


  // ==================================================
  // ENVIAR AL BACKEND
  // ==================================================

  const data =
    await enviarPeticion({

      accion:
        "analizarCarpeta",

      url:
        urlLimpia

    });


  // ==================================================
  // MOSTRAR RESULTADO
  // ==================================================

  console.log(
    "========================================"
  );

  console.log(
    "RESULTADO ANALIZAR CARPETA:"
  );

  console.log(
    JSON.stringify(
      data,
      null,
      2
    )
  );


  return data;
}


// ==================================================
// CONSOLIDAR EN1 + EN2 + EN3
// ==================================================

export async function consolidarEntregables(
  entrada
) {

  console.log(
    "========================================"
  );

  console.log(
    "FUNCIÓN CONSOLIDAR ENTREGABLES"
  );

  console.log(
    "ENTRADA RECIBIDA:"
  );

  console.log(
    JSON.stringify(
      entrada,
      null,
      2
    )
  );


  // ==================================================
  // OBTENER CARPETAS
  // ==================================================

  let carpetas;


  // --------------------------------------------------
  // CASO 1
  //
  // consolidarEntregables({
  //   EN1: "...",
  //   EN2: "...",
  //   EN3: "..."
  // })
  // --------------------------------------------------

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


  // --------------------------------------------------
  // CASO 2
  //
  // consolidarEntregables({
  //   carpetas: {
  //     EN1: "...",
  //     EN2: "...",
  //     EN3: "..."
  //   }
  // })
  // --------------------------------------------------

  else if (
    entrada &&
    entrada.carpetas
  ) {

    carpetas =
      entrada.carpetas;

  }


  // ==================================================
  // VALIDAR CARPETAS
  // ==================================================

  if (!carpetas) {

    throw new Error(
      "No se recibieron las carpetas."
    );
  }


  // ==================================================
  // LIMPIAR URLs
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


  console.log(
    "========================================"
  );

  console.log(
    "CARPETAS PROCESADAS:"
  );

  console.log({
    EN1,
    EN2,
    EN3
  });


  // ==================================================
  // VALIDAR QUE EXISTA AL MENOS UNA
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
  // DATOS PARA APPS SCRIPT
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
    "========================================"
  );

  console.log(
    "DATOS QUE SE ENVIARÁN AL BACK:"
  );

  console.log(
    JSON.stringify(
      datos,
      null,
      2
    )
  );


  // ==================================================
  // LLAMAR BACKEND
  // ==================================================

  try {

    const resultado =
      await enviarPeticion(
        datos
      );


    // ==================================================
    // RESPUESTA COMPLETA
    // ==================================================

    console.log(
      "========================================"
    );

    console.log(
      "RESPUESTA COMPLETA DE CONSOLIDACIÓN:"
    );

    console.log(
      JSON.stringify(
        resultado,
        null,
        2
      )
    );


    // ==================================================
    // VERIFICAR CONSOLIDADO
    // ==================================================

    if (
      Array.isArray(
        resultado?.consolidado
      )
    ) {

      console.log(
        "========================================"
      );

      console.log(
        "VERIFICACIÓN DE PUNTAJES"
      );

      resultado.consolidado.forEach(
        function(alumno, index) {

          console.log(
            "----------------------------------------"
          );

          console.log(
            "ALUMNO #" +
            (index + 1)
          );

          console.log(
            "Alumno:",
            alumno.alumno
          );

          console.log(
            "Semestre:",
            alumno.semestre
          );

          console.log(
            "Informe:",
            alumno.informe
          );

          console.log(
            "EN1:",
            alumno.EN1
          );

          console.log(
            "EN2:",
            alumno.EN2
          );

          console.log(
            "EN3:",
            alumno.EN3
          );

          console.log(
            "TOTAL:",
            alumno.total
          );

        }
      );

    }


    // ==================================================
    // VERIFICAR DOCUMENTOS NO VÁLIDOS
    // ==================================================

    if (
      Array.isArray(
        resultado?.noValidos
      )
    ) {

      console.log(
        "========================================"
      );

      console.log(
        "DOCUMENTOS NO VÁLIDOS:"
      );

      console.log(
        "TOTAL:",
        resultado.noValidos.length
      );


      resultado.noValidos.forEach(
        function(item, index) {

          console.log(
            "----------------------------------------"
          );

          console.log(
            "NO VÁLIDO #" +
            (index + 1)
          );

          console.log(
            "Nombre:",
            item.nombre
          );

          console.log(
            "Entregable:",
            item.entregable
          );

          console.log(
            "Entregable detectado:",
            item.entregableDetectado
          );

          console.log(
            "Fecha y hora:",
            item.fechaHoraAnalisis
          );

          console.log(
            "Motivo:",
            item.motivo
          );

        }
      );

    }


    // ==================================================
    // NORMALIZAR RESPUESTA
    // ==================================================

    const respuestaFinal = {

      // ----------------------------------------------
      // FECHA/HORA
      // ----------------------------------------------

      fechaHoraConsolidacion:
        resultado?.fechaHoraConsolidacion ||
        null,


      // ----------------------------------------------
      // ALUMNOS
      // ----------------------------------------------

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


      // ----------------------------------------------
      // DOCUMENTOS NO VÁLIDOS
      // ----------------------------------------------

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


    // ==================================================
    // LOG FINAL
    // ==================================================

    console.log(
      "========================================"
    );

    console.log(
      "RESPUESTA FINAL QUE SE ENTREGA AL FRONT:"
    );

    console.log(
      JSON.stringify(
        respuestaFinal,
        null,
        2
      )
    );

    console.log(
      "========================================"
    );


    return respuestaFinal;

  } catch (error) {

    console.error(
      "========================================"
    );

    console.error(
      "ERROR EN CONSOLIDACIÓN"
    );

    console.error(error);

    console.error(
      "Nombre:",
      error?.name
    );

    console.error(
      "Mensaje:",
      error?.message
    );

    throw error;
  }

}


// ==================================================
// EXPORTAR CSV DE CONSOLIDACIÓN
// ==================================================

export function exportarConsolidacionCSV(
  consolidado
) {

  // ==================================================
  // VALIDAR DATOS
  // ==================================================

  if (
    !Array.isArray(consolidado) ||
    consolidado.length === 0
  ) {

    throw new Error(
      "No existen datos para exportar."
    );
  }


  // ==================================================
  // ENCABEZADOS
  // ==================================================

  const encabezados = [

    "Alumno",
    "Semestre",
    "Informe",
    "EN1",
    "EN2",
    "EN3",
    "Total"

  ];


  // ==================================================
  // FILAS
  // ==================================================

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


  // ==================================================
  // GENERAR CSV
  // ==================================================

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


  // ==================================================
  // CREAR ARCHIVO
  // ==================================================

  const blob =
    new Blob(
      ["\ufeff" + csv],
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
// EXPORTAR CSV DE DOCUMENTOS NO VÁLIDOS
// ==================================================

export function exportarNoValidosCSV(
  noValidos
) {

  // ==================================================
  // VALIDAR DATOS
  // ==================================================

  if (
    !Array.isArray(noValidos) ||
    noValidos.length === 0
  ) {

    throw new Error(
      "No existen documentos no válidos para exportar."
    );
  }


  // ==================================================
  // ENCABEZADOS
  // ==================================================

  const encabezados = [

    "Nombre",
    "Entregable",
    "Entregable detectado",
    "Fecha y hora",
    "Motivo"

  ];


  // ==================================================
  // FILAS
  // ==================================================

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


  // ==================================================
  // GENERAR CSV
  // ==================================================

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


  // ==================================================
  // CREAR ARCHIVO
  // ==================================================

  const blob =
    new Blob(
      ["\ufeff" + csv],
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


  URL.revokeObjectURL(
    url
  );

}
