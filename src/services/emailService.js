export async function enviarCorreo(datos){


const URL =
"https://script.google.com/macros/s/AKfycbyqKsUzQsqw7nsevawgeQHWXlaqKeS_B8UtjNlsv0W5Jvle8FfnKj04uFz2LREz0iAr2g/exec";


const respuesta =
await fetch(
URL,
{

method:"POST",

body:JSON.stringify(datos)

}

);



return await respuesta.json();


}