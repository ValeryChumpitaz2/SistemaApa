import { useState, useEffect } from "react";

import {
  FolderSearch
} from "lucide-react";

import { analyzeFolder } from "../services/teacherService";



export default function FolderAnalyzer({
  setResultados
}){


const [url,setUrl] = useState("");

const [loading,setLoading] = useState(false);

const [mensajeCarga,setMensajeCarga] = useState(
  "Preparando análisis..."
);





useEffect(()=>{


if(!loading) return;



const mensajes = [

"Conectando con Google Drive...",

"Buscando documentos de estudiantes...",

"Revisando archivos disponibles...",

"Analizando estructura académica...",

"Evaluando formato APA...",

"Verificando citas y referencias...",

"Generando resultados..."

];



let index = 0;



const intervalo = setInterval(()=>{


setMensajeCarga(
  mensajes[index]
);


index++;


if(index >= mensajes.length){

index = 0;

}


},2000);



return ()=>clearInterval(intervalo);



},[loading]);






async function handleAnalyze(){


if(!url.trim()){

alert(
"Ingrese la carpeta de Drive"
);

return;

}



try{


setResultados([]);


setLoading(true);



const data = await analyzeFolder(url);



console.log(
"Resultado docente:",
data
);



if(Array.isArray(data)){


setResultados(
[...data]
);


}
else{


setResultados([]);


alert(
"Respuesta inválida del servidor"
);


}



}
catch(error){


console.error(error);


alert(
"Error analizando carpeta"
);


}
finally{


setLoading(false);


}



}






return (

<section>


<div className="
bg-white
rounded-3xl
shadow-lg
border
p-8
">





<div className="
flex
items-center
gap-4
">


<div className="
bg-blue-100
p-4
rounded-2xl
">


<FolderSearch

size={35}

className="
text-blue-950
"

/>


</div>





<div>


<h2 className="
text-2xl
font-bold
">

Analizar carpeta de Drive

</h2>



<p className="
text-gray-500
">

Revisa automáticamente las entregas.

</p>



</div>


</div>







<div className="
mt-8
flex
flex-col
md:flex-row
gap-4
">





<input


type="url"


value={url}


disabled={loading}


onChange={
(e)=>setUrl(e.target.value)
}


placeholder="
https://drive.google.com/drive/folders/...
"


className="
flex-1
border
rounded-xl
p-4
outline-none
focus:ring-2
focus:ring-blue-900
disabled:bg-gray-100
"

/>







<button


type="button"


disabled={loading}


onClick={handleAnalyze}


className="
bg-blue-950
hover:bg-blue-900
disabled:opacity-50
text-white
rounded-xl
px-8
py-4
font-bold
flex
items-center
justify-center
gap-3
transition
"

>



{
loading
?

<>

<div

className="
w-5
h-5
border-4
border-white
border-t-transparent
rounded-full
animate-spin
"

/>


<span>

Analizando...

</span>


</>


:

<>

<FolderSearch size={22}/>


<span>

Analizar carpeta

</span>


</>


}



</button>



</div>









{/* Estado de carga fijo */}

<div

className={`
mt-8
bg-blue-50
border
border-blue-100
rounded-2xl
p-6
flex
items-center
gap-5
transition-all
duration-300

${
loading

?

"opacity-100"

:

"opacity-0 h-0 overflow-hidden p-0 mt-0"

}

`}

>



<div className="
w-12
h-12
rounded-full
border-4
border-blue-200
border-t-blue-900
animate-spin
">

</div>




<div>


<h3 className="
font-bold
text-blue-950
text-lg
">

Analizando documentos


</h3>



<p className="
text-gray-600
mt-1
">

{mensajeCarga}


</p>



</div>


</div>







</div>


</section>

);


}