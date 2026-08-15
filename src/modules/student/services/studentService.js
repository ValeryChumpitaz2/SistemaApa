const API_URL =
"https://script.google.com/macros/s/AKfycbyApy8CSKLc4iO_iO-7USgszRQY7nDNvaGlZ97O1Ua9YbcZIAQ3rHjNJ2BKhX5zcrZyPw/exec";
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