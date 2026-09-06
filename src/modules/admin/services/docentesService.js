// ==================================================
// SERVICE ADMINISTRADOR
// DOCENTES + CAMBIO DE CONTRASEÑAS
// ==================================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbwY5nEJvp-fg04DxzgHKU3PkQMGgQBpEV9Y_XF2WzgTIYiNwnC1KC_gbGL5uT6Ze4ICLg/exec";


// ==================================================
// PETICIÓN GENERAL
// ==================================================

async function enviarPeticion(datos) {

  console.log(
    "========================================"
  );

  console.log(
    "PETICIÓN ADMIN:"
  );

  console.log(
    JSON.stringify(
      {
        ...datos,

        adminPassword:
          datos.adminPassword
            ? "********"
            : undefined,

        nuevaPassword:
          datos.nuevaPassword
            ? "********"
            : undefined,
      },
      null,
      2
    )
  );


  let response;


  try {

    response =
      await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body:
            JSON.stringify(datos),
        }
      );

  } catch (error) {

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
    "RESPUESTA ADMIN RAW:",
    texto
  );


  let respuesta;


  try {

    respuesta =
      JSON.parse(texto);

  } catch (error) {

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
// OBTENER SESIÓN ADMIN
// ==================================================

function obtenerAdministrador() {

  let administrador = null;


  try {

    administrador =
      JSON.parse(
        localStorage.getItem(
          "administrador"
        ) || "null"
      );

  } catch (error) {

    administrador = null;

  }


  // Compatibilidad
  if (!administrador) {

    try {

      administrador =
        JSON.parse(
          localStorage.getItem(
            "usuario"
          ) || "null"
        );

    } catch (error) {

      administrador = null;

    }

  }


  if (!administrador) {

    throw new Error(
      "No existe una sesión de administrador."
    );

  }


  if (
    administrador.rol !== "ADMIN"
  ) {

    throw new Error(
      "No tiene permisos de administrador."
    );

  }


  return administrador;

}


// ==================================================
// OBTENER PASSWORD ADMIN
// ==================================================

function obtenerPasswordAdministrador() {

  const password =
    sessionStorage.getItem(
      "adminPassword"
    );


  if (!password) {

    throw new Error(
      "La sesión administrativa no contiene las credenciales necesarias. Cierre sesión e ingrese nuevamente."
    );

  }


  return password;

}


// ==================================================
// OBTENER DOCENTES
// ==================================================

export async function obtenerDocentesAdmin() {

  const administrador =
    obtenerAdministrador();


  const adminPassword =
    obtenerPasswordAdministrador();


  return await enviarPeticion({

    accion:
      "obtenerDocentesAdmin",

    adminCorreo:
      administrador.correo,

    adminPassword:
      adminPassword,

  });

}


// ==================================================
// CAMBIAR PASSWORD DOCENTE
// ==================================================

export async function cambiarPasswordAdmin(
  correoDocente,
  nuevaPassword
) {

  const administrador =
    obtenerAdministrador();


  const adminPassword =
    obtenerPasswordAdministrador();


  const correo =
    String(
      correoDocente || ""
    )
      .trim()
      .toLowerCase();


  if (!correo) {

    throw new Error(
      "Ingrese el correo del docente."
    );

  }


  const password =
    String(
      nuevaPassword || ""
    );


  if (!password) {

    throw new Error(
      "Ingrese la nueva contraseña."
    );

  }


  if (
    password.length < 8
  ) {

    throw new Error(
      "La contraseña debe tener al menos 8 caracteres."
    );

  }


  return await enviarPeticion({

    accion:
      "cambiarPasswordAdmin",

    adminCorreo:
      administrador.correo,

    adminPassword:
      adminPassword,

    correoDocente:
      correo,

    nuevaPassword:
      password,

  });

}


// ==================================================
// CERRAR SESIÓN ADMIN
// ==================================================

export function cerrarSesionAdmin() {

  localStorage.removeItem(
    "administrador"
  );

  localStorage.removeItem(
    "usuario"
  );

  sessionStorage.removeItem(
    "adminPassword"
  );

}


// ==================================================
// EXPORTACIÓN
// ==================================================

export default {

  obtenerDocentesAdmin,

  cambiarPasswordAdmin,

  cerrarSesionAdmin,

};
