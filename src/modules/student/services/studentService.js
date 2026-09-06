const API_URL =

"https://script.google.com/macros/s/AKfycbw3wonYhC38T1RuYr8rcX--nbBiQ6ezXmoK35mYJTUrd1-Hry_KIItMaW_DtPW-bMrKaw/exec";
// ==================================================

export async function getDocumentName(url) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded;charset=UTF-8"
      },

      body:
        new URLSearchParams({

          accion: "obtenerNombre",

          url: url

        })

    });



  const texto =
    await response.text();



  console.log(
    "RESPUESTA OBTENER NOMBRE:",
    texto
  );



  let json;

  try {

    json =
      JSON.parse(texto);

  } catch (error) {

    console.error(
      "Respuesta del servidor:",
      texto
    );

    throw new Error(
      "No fue posible verificar el nombre del documento."
    );

  }



  if (!json.ok) {

    throw new Error(
      json.mensaje ||
      "No fue posible verificar el nombre del documento."
    );

  }



  /*
   * Soporta:
   *
   * json.data.nombre
   *
   * y también:
   *
   * json.nombre
   */

  const nombre =
    json.data?.nombre ||
    json.nombre;



  if (!nombre) {

    throw new Error(
      "No fue posible obtener el nombre del documento."
    );

  }



  return nombre;

}



// ==================================================
// ANALIZAR DOCUMENTO
// ==================================================

export async function analyzeDocument(url) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded;charset=UTF-8"
      },

      body:
        new URLSearchParams({

          accion: "analizar",

          url: url

        })

    });



  const texto =
    await response.text();



  console.log(
    "RESPUESTA ANALISIS:",
    texto
  );



  let json;

  try {

    json =
      JSON.parse(texto);

  } catch (error) {

    throw new Error(
      "No fue posible procesar la respuesta del análisis."
    );

  }



  if (!json.ok) {

    throw new Error(
      json.mensaje ||
      "No se pudo analizar el documento."
    );

  }



  return json.data;

}
