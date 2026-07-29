const API_URL =
"https://script.google.com/macros/s/AKfycbz5AyPjpVSICOsE958wCaPwqEiYksotNtiES8A8naglXL9EKu5PTNbdu0Ss-VDTtcqQkA/exec";


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
