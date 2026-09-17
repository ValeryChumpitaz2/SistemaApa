// ==================================================
// VG SMART REVIEW
// SERVICE TESTIMONIOS
// ARCHIVO: testimoniosService.js
// ==================================================


// ==================================================
// URL DEL BACKEND
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbz5ciCIdcTDo1FjhAzhbFPg_8NTPuLr6DuaaWH2JJ5p854Llm-XR0Lsz8iBkAzGsoa0kg/exec";
// ==================================================
// OBTENER TESTIMONIOS
// ==================================================

export async function obtenerTestimonios() {

  try {

    console.log(
      "===================================="
    );

    console.log(
      "SERVICE - OBTENER TESTIMONIOS"
    );


    // ==================================================
    // URL
    // ==================================================

    const url =
      `${API_URL}?accion=obtenerTestimonios`;


    console.log(
      "URL:",
      url
    );


    // ==================================================
    // REQUEST
    // ==================================================

    const response =
      await fetch(
        url,
        {
          method: "GET"
        }
      );


    console.log(
      "STATUS:",
      response.status
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
        "RESPUESTA NO ES JSON:",
        texto
      );

      throw new Error(
        "El backend devolvió una respuesta no válida."
      );

    }


    // ==================================================
    // VALIDAR ERROR
    // ==================================================

    if (
      resultado.ok === false ||
      resultado.error
    ) {

      throw new Error(
        resultado.error ||
        resultado.message ||
        resultado.mensaje ||
        "No se pudieron obtener los testimonios."
      );

    }


    // ==================================================
    // NORMALIZAR
    // ==================================================

    if (
      Array.isArray(resultado)
    ) {

      return resultado;

    }


    if (
      Array.isArray(
        resultado.testimonios
      )
    ) {

      return resultado.testimonios;

    }


    if (
      Array.isArray(
        resultado.data
      )
    ) {

      return resultado.data;

    }


    // ==================================================
    // SI NO HAY TESTIMONIOS
    // ==================================================

    return [];

  }
  catch (error) {

    console.error(
      "===================================="
    );

    console.error(
      "ERROR OBTENIENDO TESTIMONIOS:"
    );

    console.error(
      error
    );

    throw error;

  }

}


// ==================================================
// REGISTRAR TESTIMONIO
// ==================================================

export async function registrarTestimonio({

  nombre,
  correo,
  calificacion,
  experiencia,
  ayuda

}) {

  try {

    console.log(
      "===================================="
    );

    console.log(
      "SERVICE - REGISTRAR TESTIMONIO"
    );


    // ==================================================
    // VALIDAR
    // ==================================================

    if (!nombre) {

      throw new Error(
        "Ingresa tu nombre."
      );

    }


    if (!correo) {

      throw new Error(
        "No se encontró el correo."
      );

    }


    if (!calificacion) {

      throw new Error(
        "Selecciona una calificación."
      );

    }


    if (!experiencia) {

      throw new Error(
        "Escribe tu experiencia."
      );

    }


    // ==================================================
    // DATOS
    // ==================================================

    const datos = {

      accion:
        "registrarTestimonio",

      nombre:
        String(nombre).trim(),

      correo:
        String(correo).trim().toLowerCase(),

      calificacion:
        Number(calificacion),

      experiencia:
        String(experiencia).trim(),

      ayuda:
        String(ayuda || "").trim()

    };


    console.log(
      "DATOS ENVIADOS:",
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
    // RESPUESTA
    // ==================================================

    const texto =
      await response.text();


    console.log(
      "RESPUESTA:",
      texto
    );


    let resultado;

    try {

      resultado =
        JSON.parse(
          texto
        );

    }
    catch {

      throw new Error(
        "El backend devolvió una respuesta no válida."
      );

    }


    // ==================================================
    // ERROR
    // ==================================================

    if (
      resultado.ok === false ||
      resultado.error
    ) {

      throw new Error(
        resultado.error ||
        resultado.message ||
        resultado.mensaje ||
        "No se pudo registrar el testimonio."
      );

    }


    // ==================================================
    // FINAL
    // ==================================================

    console.log(
      "TESTIMONIO REGISTRADO:",
      resultado
    );


    return resultado;

  }
  catch (error) {

    console.error(
      "ERROR REGISTRANDO TESTIMONIO:",
      error
    );

    throw error;

  }

}
