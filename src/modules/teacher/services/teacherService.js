// ==================================================
// API DOCENTE
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxAKW0d1mqNRXCw0hX4C8Y9hf1Al4DaJyAnPGGOuDso33pgSjS58ropX-TmtQO7U551CA/exec";
// ==================================================
// PETICIÓN GENERAL
// ==================================================

async function enviarPeticion(datos) {

  console.log("========================================");
  console.log("ENVIANDO AL BACK:");
  console.log(datos);

  const inicio = performance.now();

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify(datos)
    }
  );

  const fin = performance.now();

  console.log(
    "TIEMPO DE RESPUESTA:",
    ((fin - inicio) / 1000).toFixed(2),
    "segundos"
  );

  const texto =
    await response.text();

  console.log(
    "RESPUESTA RAW DEL BACK:"
  );

  console.log(texto);

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


  console.log(
    "RESPUESTA CORRECTA:"
  );

  console.log(json.data);

  return json.data;
}


// ==================================================
// ANALIZAR UNA CARPETA
// ==================================================
//
// ESTA FUNCIÓN ES NECESARIA PARA:
// FolderAnalyzer.jsx
// ==================================================

export async function analyzeFolder(url) {

  if (!url) {

    throw new Error(
      "No se proporcionó una URL de carpeta."
    );
  }


  console.log(
    "========================================"
  );

  console.log(
    "ANALIZANDO CARPETA"
  );

  console.log(url);


  const data =
    await enviarPeticion({

      accion:
        "analizarCarpeta",

      url:
        url

    });


  console.log(
    "RESULTADO ANALIZAR CARPETA:"
  );

  console.log(data);


  return data;
}


// ==================================================
// CONSOLIDAR EN1 + EN2 + EN3
// ==================================================
//
// Acepta estas DOS formas:
//
// consolidarEntregables(carpetas)
//
// o
//
// consolidarEntregables({ carpetas })
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

  console.log(entrada);


  // ------------------------------------------------
  // COMPATIBILIDAD CON AMBAS FORMAS
  // ------------------------------------------------

  let carpetas;


  // Caso 1:
  //
  // consolidarEntregables({
  //   EN1: "...",
  //   EN2: "...",
  //   EN3: "..."
  // })

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


  // Caso 2:
  //
  // consolidarEntregables({
  //   carpetas: {
  //      EN1: "...",
  //      EN2: "...",
  //      EN3: "..."
  //   }
  // })

  else if (
    entrada &&
    entrada.carpetas
  ) {

    carpetas =
      entrada.carpetas;

  }


  // ------------------------------------------------
  // SI NO HAY CARPETAS
  // ------------------------------------------------

  if (!carpetas) {

    throw new Error(
      "No se recibieron las carpetas."
    );
  }


  // ------------------------------------------------
  // LIMPIAR URLs
  // ------------------------------------------------

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
    "CARPETAS PROCESADAS:"
  );

  console.log({

    EN1,
    EN2,
    EN3

  });


  // ------------------------------------------------
  // VALIDAR
  // ------------------------------------------------

  if (
    !EN1 &&
    !EN2 &&
    !EN3
  ) {

    throw new Error(
      "Debes ingresar al menos una carpeta."
    );
  }


  // ------------------------------------------------
  // DATOS PARA APPS SCRIPT
  // ------------------------------------------------

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
    "INICIANDO CONSOLIDACIÓN"
  );

  console.log(
    "DATOS QUE SE ENVIARÁN:"
  );

  console.log(datos);


  try {

    const resultado =
      await enviarPeticion(
        datos
      );


    console.log(
      "========================================"
    );

    console.log(
      "CONSOLIDACIÓN FINALIZADA"
    );

    console.log(
      "RESULTADO:"
    );

    console.log(resultado);


    // ------------------------------------------------
    // NORMALIZAR RESPUESTA
    // ------------------------------------------------

    return {

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
