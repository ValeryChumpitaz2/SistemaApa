const API_URL =
"https://script.google.com/macros/s/AKfycbzQJr7ozOEjQo7XUFlz7m0zp6W0XtVsVzBmd_h85tkL-B-3A3puWO96Sz7N4V639yrS8g/exec";


export async function analyzeDocument(url){


const response = await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":
"application/x-www-form-urlencoded;charset=UTF-8"

},


body:
"accion=analizar&url="+
encodeURIComponent(url)


});



const texto =
await response.text();


console.log(
"Respuesta cruda:",
texto
);



const json =
JSON.parse(texto);



if(!json.ok){

throw new Error(json.mensaje);

}


return json.data;


}