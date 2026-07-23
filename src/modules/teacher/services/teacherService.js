const API_URL =
"https://script.google.com/macros/s/AKfycbx35aw5KPtZ84nFqeh-FDnHq-7QA9Nb3FPsC8Tp5HZ29Mhmy_BfsPV9FjN6qEiZFclznA/exec";


export async function analyzeFolder(url){


const response =
await fetch(
API_URL,
{

method:"POST",


body:JSON.stringify({

accion:"analizarCarpeta",

url:url

})


}

);



const texto =
await response.text();



console.log(
"RESPUESTA BACK DOCENTE:",
texto
);



const json =
JSON.parse(texto);



if(!json.ok){

throw new Error(
json.mensaje
);

}



return json.data;


}
