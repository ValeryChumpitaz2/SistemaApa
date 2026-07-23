const API_URL =
"https://script.google.com/macros/s/AKfycbxDfati_c9ErXHXfZLDFG14BTrr_PyhCotzenPFpouol7bdheLs--flyZFdC4sR8IyX-A/exec";


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