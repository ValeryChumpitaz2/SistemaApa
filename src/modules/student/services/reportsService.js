const API_URL =
  "https://script.google.com/macros/s/AKfycbyApy8CSKLc4iO_iO-7USgszRQY7nDNvaGlZ97O1Ua9YbcZIAQ3rHjNJ2BKhX5zcrZyPw/exec";


export async function enviarIncidencia(datos) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded;charset=UTF-8"
      },

      body:

        new URLSearchParams({

          accion: "registrarIncidencia",

          tipo:
            datos.tipo || "",

          email:
            datos.email || "",

          fecha:
            datos.fecha || "",

          asunto:
            datos.asunto || "",

          nombre:
            datos.nombre || "",

          descripcion:
            datos.descripcion || ""

        })

    });


  const texto =
    await response.text();


  console.log(
    "RESPUESTA INCIDENCIA:",
    texto
  );


  let json;

  try {

    json =
      JSON.parse(texto);

  } catch (error) {

    throw new Error(
      "El servidor no devolvió una respuesta válida."
    );

  }


  if (!json.ok) {

    throw new Error(
      json.mensaje ||
      "No se pudo registrar la incidencia."
    );

  }


  return json.data;

}