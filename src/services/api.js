const API_URL =
"https://script.google.com/a/macros/vallegrande.edu.pe/s/AKfycbwpaB5Mscc5pfMtcu-fE23VHXB8JfBjZTF1yPOXs2yxYS_RxD_ultJVKzlj3rMzy_Toeg/exec";



export async function analyzeDocument(url){


  const response = await fetch(API_URL,{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      accion:"analizar",

      url:url

    })

  });



  const json = await response.json();


  if(!json.ok){

    throw new Error(json.mensaje);

  }


  return json.data;


}