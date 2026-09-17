// ==================================================
// VG SMART REVIEW
// SERVICE INCIDENCIAS
// ARCHIVO: incidenciasService.js
// ==================================================


// ==================================================
// URL DEL BACKEND
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbz5ciCIdcTDo1FjhAzhbFPg_8NTPuLr6DuaaWH2JJ5p854Llm-XR0Lsz8iBkAzGsoa0kg/exec";

// ==================================================
// REGISTRAR INCIDENCIA
// ==================================================

export async function registrarIncidencia({
  user,
  correo,
  tipo,
  asunto,
  descripcion,
  evidencia
}) {

  try {

    console.log("====================================");
    console.log("SERVICE - REGISTRAR INCIDENCIA");
    console.log("USER:", user);
    console.log("CORREO RECIBIDO:", correo);
    console.log("EVIDENCIA RECIBIDA:", evidencia);


    // ==================================================
    // OBTENER CORREO
    // ==================================================

    const correoUsuario =
      String(
        user?.correo ||
        user?.email ||
        correo ||
        localStorage.getItem("correo") ||
        ""
      )
        .trim()
        .toLowerCase();


    console.log(
      "CORREO FINAL:",
      correoUsuario
    );


    if (!correoUsuario) {

      throw new Error(
        "No se pudo obtener el correo del usuario."
      );

    }


    // ==================================================
    // VALIDAR TIPO
    // ==================================================

    if (!tipo) {

      throw new Error(
        "Selecciona el tipo de incidencia."
      );

    }


    // ==================================================
    // VALIDAR ASUNTO
    // ==================================================

    if (
      !String(asunto || "").trim()
    ) {

      throw new Error(
        "Ingresa el asunto de la incidencia."
      );

    }


    // ==================================================
    // VALIDAR DESCRIPCIÓN
    // ==================================================

    if (
      !String(descripcion || "").trim()
    ) {

      throw new Error(
        "Ingresa la descripción de la incidencia."
      );

    }


    // ==================================================
    // PREPARAR DATOS
    // ==================================================

    const datos = {

      accion:
        "registrarIncidencia",

      correo:
        correoUsuario,

      tipo:
        String(tipo).trim(),

      asunto:
        String(asunto).trim(),

      descripcion:
        String(descripcion).trim()

    };


    // ==================================================
    // PROCESAR EVIDENCIA
    // ==================================================

    if (evidencia) {

      console.log(
        "PROCESANDO ARCHIVO:",
        evidencia.name
      );

      console.log(
        "TIPO:",
        evidencia.type
      );

      console.log(
        "TAMAÑO:",
        evidencia.size
      );


      // ==================================================
      // VALIDAR ARCHIVO
      // ==================================================

      if (
        !(evidencia instanceof Blob)
      ) {

        throw new Error(
          "La evidencia seleccionada no es un archivo válido."
        );

      }


      // ==================================================
      // LÍMITE DE ARCHIVO
      // ==================================================

      const MAX_SIZE =
        5 * 1024 * 1024;


      if (
        evidencia.size > MAX_SIZE
      ) {

        throw new Error(
          "La evidencia no puede superar los 5 MB."
        );

      }


      // ==================================================
      // CONVERTIR A BASE64
      // ==================================================

      const base64 =
        await convertirArchivoABase64(
          evidencia
        );


      datos.evidencia = {

        nombre:
          evidencia.name,

        mimeType:
          evidencia.type ||
          "application/octet-stream",

        base64:
          base64

      };

    }


    // ==================================================
    // LOG DATOS
    // ==================================================

    console.log(
      "DATOS ENVIADOS AL BACKEND:",
      datos
    );


    // ==================================================
    // REQUEST
    // ==================================================

    const response =
      await fetch(
        API_URL,
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8"

          },

          body:
            JSON.stringify(
              datos
            )

        }
      );


    // ==================================================
    // LEER RESPUESTA
    // ==================================================

    const texto =
      await response.text();


    console.log(
      "RESPUESTA BACKEND:",
      texto
    );


    // ==================================================
    // CONVERTIR JSON
    // ==================================================

    let resultado;

    try {

      resultado =
        JSON.parse(
          texto
        );

    }
    catch (error) {

      console.error(
        "RESPUESTA NO JSON:",
        texto
      );

      throw new Error(
        "El servidor devolvió una respuesta no válida."
      );

    }


    // ==================================================
    // VALIDAR RESPUESTA
    // ==================================================

    if (
      resultado.ok === false ||
      resultado.error
    ) {

      throw new Error(
        resultado.error ||
        resultado.message ||
        resultado.mensaje ||
        "No se pudo registrar la incidencia."
      );

    }


    // ==================================================
    // FINAL
    // ==================================================

    console.log(
      "INCIDENCIA REGISTRADA:",
      resultado
    );


    return resultado;

  }
  catch (error) {

    console.error(
      "===================================="
    );

    console.error(
      "ERROR REGISTRANDO INCIDENCIA:"
    );

    console.error(
      error
    );

    throw error;

  }

}


// ==================================================
// CONVERTIR ARCHIVO A BASE64
// ==================================================

function convertirArchivoABase64(
  archivo
) {

  return new Promise(
    (resolve, reject) => {

      // ==================================================
      // VALIDAR
      // ==================================================

      if (
        !(archivo instanceof Blob)
      ) {

        reject(
          new Error(
            "El archivo de evidencia no es válido."
          )
        );

        return;

      }


      // ==================================================
      // FILEREADER
      // ==================================================

      const reader =
        new FileReader();


      reader.onload =
        () => {

          try {

            const resultado =
              String(
                reader.result || ""
              );


            const base64 =
              resultado.includes(",")
                ? resultado.split(",")[1]
                : resultado;


            resolve(
              base64
            );

          }
          catch (error) {

            reject(
              error
            );

          }

        };


      reader.onerror =
        () => {

          reject(
            new Error(
              "No se pudo leer la evidencia."
            )
          );

        };


      reader.readAsDataURL(
        archivo
      );

    }
  );

}
