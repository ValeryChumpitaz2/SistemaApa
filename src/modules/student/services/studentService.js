const API_URL =
"https://script.google.com/macros/s/AKfycbz5AyPjpVSICOsE958wCaPwqEiYksotNtiES8A8naglXL9EKu5PTNbdu0Ss-VDTtcqQkA/exec";

export async function analyzeDocument(url){


const response =
await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":
"application/x-www-form-urlencoded;charset=UTF-8"
},


body:

new URLSearchParams({

accion:"analizar",

url:url

})


});



const texto =
await response.text();


console.log(
"RESPUESTA:",
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