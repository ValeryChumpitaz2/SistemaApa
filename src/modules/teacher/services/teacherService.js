const API_URL =
"https://script.google.com/macros/s/AKfycbwO9GLhJohwxCCp9PmdT-Gw2M1mw0wY-4T_R_tUIG7-zNh77sZCD8vyPGc7ed1C0V8ETA/exec";


export async function analyzeFolder(url){


  const response = await fetch(API_URL,{

    method:"POST",

    headers:{
      "Content-Type":"text/plain;charset=utf-8"
    },

    body:JSON.stringify({

      accion:"analizarCarpeta",

      url:url

    })

  });



  const texto = await response.text();


  console.log(
    "RESPUESTA BACK DOCENTE:",
    texto
  );



  let json;


  try{

    json = JSON.parse(texto);

  }
  catch(error){

    throw new Error(
      "El servidor no devolvió JSON válido"
    );

  }



  if(!json.ok){

    throw new Error(json.mensaje);

  }



  if(!Array.isArray(json.data)){

    console.error(
      "DATA RECIBIDA NO ES ARRAY:",
      json.data
    );


    return [];

  }



  return json.data;


}