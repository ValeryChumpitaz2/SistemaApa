// ==================================================
// API DOCENTE
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxttCz6WDsug6ouYlNSjrfuxMUOGbLDMBvuqFC4ceM0hgei5ovLXrR4W7eMzu8csdDDIA/exec";

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
          "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify(datos)
      }
    );

  } catch (error) {

    console.error(
      "ERROR DE CONEXIÓN CON EL BACK:",
      error
    );

    throw new Error(
      "No se pudo conectar con el servidor."
    );
  }

  const fin = performance.now();

  console.log(
    "TIEMPO DE RESPUESTA:",
    ((fin - inicio) / 1000).toFixed(2),
    "segundos"
  );


  // ==================================================
  // RESPUESTA RAW
  // ==================================================

  const texto =
    await response.text();

  console.log(
    "========================================"
  );

  console.log(
    "RESPUESTA RAW DEL BACK:"
  );

  console.log(texto);


  // ==================================================
  // PARSEAR JSON
  // ==================================================

  let json;

  try {

    json =
      JSON.parse(texto);

  } catch (error) {

    console.error(
      "ERROR: respuesta no válida"
    );

    console.error(texto);

    throw new Error(
      "El servidor devolvió una respuesta inválida."
    );
  }


  // ==================================================
  // VALIDAR OK
  // ==================================================

  if (!json.ok) {

    console.error(
      "ERROR DEL BACK:"
    );

    console.error(json);

    throw new Error(
      json.mensaje ||
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


  return json.data;
}


// ==================================================
// ANALIZAR UNA CARPETA
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
    urlLimpia
  );


  const data =
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
    // ANALIZAR CONSOLIDADO
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
    // NORMALIZAR RESPUESTA
    // ==================================================

    const respuestaFinal = {

      totalAlumnos:
        Number(
          resultado?.totalAlumnos || 0
        ),

      consolidado:
        Array.isArray(
          resultado?.consolidado
        )
          ? resultado.consolidado
          : []

    };


    // ==================================================
    // MOSTRAR RESPUESTA FINAL
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

    throw error;
  }
}


// ==================================================
// EXPORTAR CSV
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