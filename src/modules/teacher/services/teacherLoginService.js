// ==================================================
// SERVICE DE LOGIN Y SEGURIDAD
// DOCENTE + ADMINISTRADOR
// ==================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzPR0QILVJoX-aYyyoK7X-O3kDlmScqsJ9bKU1NpbPPp9f_USwrUqMMlCLuxHH-_EdFZA/exec";
// ==================================================
// PETICIÓN GENERAL
// ==================================================

async function enviarPeticion(datos) {

  console.log("========================================");
  console.log("PETICIÓN AUTH");
  console.log(JSON.stringify(datos, null, 2));

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
      "No se pudo conectar con el servidor."
    );

  }


  const texto =
    await response.text();


  console.log(
    "RESPUESTA AUTH RAW:",
    texto
  );


  let respuesta;

  try {

    respuesta =
      JSON.parse(texto);

  }
  catch (error) {

    console.error(
      "RESPUESTA INVÁLIDA:",
      texto
    );

    throw new Error(
      "El servidor devolvió una respuesta inválida."
    );

  }


  if (!respuesta.ok) {

    throw new Error(
      respuesta.mensaje ||
      "Error en el servidor."
    );

  }


  return respuesta.data;

}


// ==================================================
// LOGIN DOCENTE
// ==================================================

export async function loginDocente(
  correo,
  password
) {

  const correoLimpio =
    String(
      correo || ""
    )
      .trim()
      .toLowerCase();


  if (!correoLimpio) {

    throw new Error(
      "Ingrese su correo institucional."
    );

  }


  if (!password) {

    throw new Error(
      "Ingrese su contraseña."
    );

  }


  return await enviarPeticion({

    accion:
      "loginDocente",

    correo:
      correoLimpio,

    password:
      password

  });

}


// ==================================================
// CAMBIAR PASSWORD DOCENTE
// ==================================================

export async function cambiarPasswordDocente(
  correo,
  passwordActual,
  nuevaPassword
) {

  const correoLimpio =
    String(
      correo || ""
    )
      .trim()
      .toLowerCase();


  if (!correoLimpio) {

    throw new Error(
      "No se encontró el correo del docente."
    );

  }


  if (!passwordActual) {

    throw new Error(
      "Ingrese su contraseña actual."
    );

  }


  if (!nuevaPassword) {

    throw new Error(
      "Ingrese una nueva contraseña."
    );

  }


  if (
    nuevaPassword.length < 8
  ) {

    throw new Error(
      "La nueva contraseña debe tener al menos 8 caracteres."
    );

  }


  return await enviarPeticion({

    accion:
      "cambiarPasswordDocente",

    correo:
      correoLimpio,

    passwordActual:
      passwordActual,

    nuevaPassword:
      nuevaPassword

  });

}


// ==================================================
// LOGIN ADMINISTRADOR
// ==================================================

export async function loginAdministrador(
  correo,
  password
) {

  const correoLimpio =
    String(
      correo || ""
    )
      .trim()
      .toLowerCase();


  if (!correoLimpio) {

    throw new Error(
      "Ingrese el correo del administrador."
    );

  }


  if (!password) {

    throw new Error(
      "Ingrese la contraseña del administrador."
    );

  }


  return await enviarPeticion({

    accion:
      "loginAdministrador",

    correo:
      correoLimpio,

    password:
      password

  });

}


// ==================================================
// OBTENER DOCENTES PARA EL ADMINISTRADOR
// ==================================================

export async function obtenerDocentesAdmin(
  adminCorreo,
  adminPassword
) {

  const correoLimpio =
    String(
      adminCorreo || ""
    )
      .trim()
      .toLowerCase();


  if (!correoLimpio) {

    throw new Error(
      "No se encontró el correo del administrador."
    );

  }


  if (!adminPassword) {

    throw new Error(
      "No se encontró la contraseña del administrador."
    );

  }


  return await enviarPeticion({

    accion:
      "obtenerDocentesAdmin",

    adminCorreo:
      correoLimpio,

    adminPassword:
      adminPassword

  });

}


// ==================================================
// CAMBIAR PASSWORD DE DOCENTE DESDE ADMIN
// ==================================================

export async function cambiarPasswordAdmin(
  adminCorreo,
  adminPassword,
  correoDocente,
  nuevaPassword
) {

  const adminCorreoLimpio =
    String(
      adminCorreo || ""
    )
      .trim()
      .toLowerCase();


  const correoDocenteLimpio =
    String(
      correoDocente || ""
    )
      .trim()
      .toLowerCase();


  if (!adminCorreoLimpio) {

    throw new Error(
      "No se encontró el correo del administrador."
    );

  }


  if (!adminPassword) {

    throw new Error(
      "No se encontró la contraseña del administrador."
    );

  }


  if (!correoDocenteLimpio) {

    throw new Error(
      "Ingrese el correo del docente."
    );

  }


  if (!nuevaPassword) {

    throw new Error(
      "Ingrese la nueva contraseña."
    );

  }


  if (
    nuevaPassword.length < 8
  ) {

    throw new Error(
      "La contraseña debe tener al menos 8 caracteres."
    );

  }


  return await enviarPeticion({

    accion:
      "cambiarPasswordAdmin",

    adminCorreo:
      adminCorreoLimpio,

    adminPassword:
      adminPassword,

    correoDocente:
      correoDocenteLimpio,

    nuevaPassword:
      nuevaPassword

  });

}


// ==================================================
// RESTABLECER PASSWORD DESDE ADMINISTRADOR
// ==================================================
//
// Esta función la puedes mantener si tu AdminDashboard
// todavía la utiliza.
//
// ==================================================

export async function restablecerPasswordAdministrador(
  adminCorreo,
  adminPassword,
  correoDocente,
  nuevaPassword
) {

  const adminCorreoLimpio =
    String(
      adminCorreo || ""
    )
      .trim()
      .toLowerCase();


  const correoDocenteLimpio =
    String(
      correoDocente || ""
    )
      .trim()
      .toLowerCase();


  if (!adminCorreoLimpio) {

    throw new Error(
      "No se encontró el correo del administrador."
    );

  }


  if (!adminPassword) {

    throw new Error(
      "No se encontró la contraseña del administrador."
    );

  }


  if (!correoDocenteLimpio) {

    throw new Error(
      "Ingrese el correo del docente."
    );

  }


  if (!nuevaPassword) {

    throw new Error(
      "Ingrese la nueva contraseña."
    );

  }


  if (
    nuevaPassword.length < 8
  ) {

    throw new Error(
      "La contraseña debe tener al menos 8 caracteres."
    );

  }


  return await enviarPeticion({

    accion:
      "restablecerPasswordAdministrador",

    adminCorreo:
      adminCorreoLimpio,

    adminPassword:
      adminPassword,

    correoDocente:
      correoDocenteLimpio,

    nuevaPassword:
      nuevaPassword

  });

}


// ==================================================
// EXPORTAR API
// ==================================================

export default {

  loginDocente,

  cambiarPasswordDocente,

  loginAdministrador,

  obtenerDocentesAdmin,

  cambiarPasswordAdmin,

  restablecerPasswordAdministrador

};
