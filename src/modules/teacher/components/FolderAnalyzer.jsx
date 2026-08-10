import {
useEffect,
useState
} from "react";


import {
FolderSearch,
CheckCircle2,
Loader2,
FileText,
Sparkles
} from "lucide-react";


import {
analyzeFolder
} from "../services/teacherService";





export default function FolderAnalyzer({

setResultados

}){


const [url,setUrl]=useState("");

const [loading,setLoading]=useState(false);


const [mensaje,setMensaje]=useState(
"Preparando análisis..."
);


const [progreso,setProgreso]=useState(0);


const [archivoActual,setArchivoActual]=useState("");



const mensajes=[

"Conectando con Google Drive...",

"Buscando documentos académicos...",

"Detectando archivos disponibles...",

"Extrayendo contenido del documento...",

"Analizando estructura APA...",

"Evaluando referencias bibliográficas...",

"Calculando puntajes académicos...",

"Generando ranking del aula..."

];






useEffect(()=>{


if(!loading){

return;

}



let i=0;

let porcentaje=5;



const intervalo=setInterval(()=>{



setMensaje(
mensajes[i]
);



porcentaje +=
Math.floor(
Math.random()*7
)+3;



if(porcentaje>95){

porcentaje=95;

}



setProgreso(
porcentaje
);



i++;



if(i>=mensajes.length){

i=0;

}



},1800);




return ()=>clearInterval(intervalo);



},[loading]);









async function analizar(){



if(!url.trim()){


alert(
"Ingresa la URL de la carpeta Google Drive"
);


return;

}




try{


setLoading(true);

setProgreso(5);

setResultados([]);

setArchivoActual(
"Conectando con la carpeta..."
);






const respuesta =
await analyzeFolder(url);





console.log(
"RESPUESTA ANALISIS:",
respuesta
);






let documentos=[];



if(Array.isArray(respuesta)){


documentos=respuesta;


}

else if(

Array.isArray(
respuesta.resultados
)

){


documentos=
respuesta.resultados;


}

else{


throw new Error(
"No se encontraron documentos"
);


}







/*
SIMULACION VISUAL
DE PROCESAMIENTO
*/

documentos.forEach(

(item,index)=>{


setTimeout(()=>{


setArchivoActual(

`Analizando ${index+1}/${documentos.length}: ${item.nombre}`

);


setProgreso(

Math.round(

((index+1)
/documentos.length)
*
100

)

);



},index*600);



}

);










const resultadosFinales =

documentos.map(

item=>(

{


nombre:

item.nombre ??

"Documento sin nombre",





resumen:

item.resumen ??

{

palabras:0,

titulos:0,

parrafos:0

},






puntaje:

{

obtenido:

item?.puntaje?.obtenido ??

0,



maximo:

item?.puntaje?.maximo ??

100,



porcentaje:

Number(

item?.puntaje?.porcentaje ??

item?.puntaje?.porcentajeFinal ??

item?.porcentaje ??

0

)


},






criterios:

item.criterios ??

[]



}


)

);







console.log(

"RESULTADOS FINALES",

resultadosFinales

);





setProgreso(100);


setMensaje(
"Análisis completado correctamente"
);



setArchivoActual(
`${documentos.length} documentos evaluados`
);





setResultados(
resultadosFinales
);



localStorage.setItem(

"resultadosDocente",

JSON.stringify(
resultadosFinales
)

);





}


catch(error){



console.error(error);



alert(

error.message ||

"Error analizando carpeta"

);



}


finally{


setTimeout(()=>{


setLoading(false);


},1200);


}



}









return (


<section className="space-y-8">






<div

className="
bg-gradient-to-r
from-blue-950
via-blue-800
to-indigo-700
rounded-3xl
p-10
text-white
shadow-xl
"

>


<div className="
flex
items-center
gap-5
">


<div

className="
bg-white/20
p-5
rounded-3xl
"

>


<Sparkles

size={45}

/>


</div>





<div>


<h2

className="
text-3xl
font-black
"

>

Analizador académico IA

</h2>



<p

className="
text-blue-100
mt-2
"

>

Evaluación automática de documentos APA desde Google Drive.

</p>


</div>



</div>


</div>









<div

className="
bg-white
rounded-3xl
border
shadow-lg
p-8
"

>



<label

className="
font-black
text-gray-700
"

>

Carpeta Google Drive

</label>






<div

className="
flex
flex-col
md:flex-row
gap-4
mt-4
"

>


<input


value={url}


disabled={loading}


onChange={

e=>

setUrl(
e.target.value
)

}



placeholder="https://drive.google.com/drive/folders/..."


className="
flex-1
border
rounded-2xl
p-4
focus:ring-2
focus:ring-blue-600
outline-none
"


/>







<button


disabled={loading}


onClick={analizar}


className="
bg-blue-950
hover:bg-blue-900
disabled:opacity-50
text-white
px-8
py-4
rounded-2xl
font-black
flex
items-center
justify-center
gap-3
"

>



{

loading ?


<>

<Loader2

className="
animate-spin
"

/>


Analizando

</>



:


<>

<FolderSearch/>


Analizar carpeta


</>


}



</button>




</div>









{

loading &&


<div

className="
mt-8
bg-blue-50
border
border-blue-200
rounded-3xl
p-6
"

>


<div

className="
flex
justify-between
mb-3
"

>


<h3

className="
font-black
text-blue-950
"

>

Examinando documentos

</h3>



<span

className="
font-black
text-blue-700
"

>

{progreso}%

</span>



</div>








<div

className="
h-4
bg-blue-100
rounded-full
overflow-hidden
"

>


<div

className="
h-full
bg-gradient-to-r
from-blue-700
to-indigo-600
transition-all
duration-700
"

style={{

width:`${progreso}%`

}}


/>


</div>







<div

className="
mt-5
flex
items-center
gap-3
"

>


<Loader2

className="
text-blue-700
animate-spin
"

/>


<p

className="
text-gray-700
font-semibold
"

>

{mensaje}

</p>


</div>







{

archivoActual &&


<div

className="
mt-4
bg-white
rounded-xl
p-4
flex
items-center
gap-3
border
"

>


<FileText

className="
text-blue-700
"

/>


<p

className="
text-sm
text-gray-600
truncate
"

>

{archivoActual}

</p>


</div>


}



</div>



}






</div>









<div

className="
grid
md:grid-cols-3
gap-5
"

>


<div

className="
bg-blue-50
rounded-2xl
p-5
"

>


<CheckCircle2

className="
text-blue-700
mb-3
"

/>


<h3

className="
font-black
"

>

Evaluación APA

</h3>


<p

className="
text-gray-500
text-sm
"

>

Analiza formato, contenido y referencias.

</p>


</div>







<div

className="
bg-green-50
rounded-2xl
p-5
"

>


<CheckCircle2

className="
text-green-700
mb-3
"

/>


<h3

className="
font-black
"

>

Ranking automático

</h3>


<p

className="
text-gray-500
text-sm
"

>

Ordena resultados por rendimiento.

</p>


</div>







<div

className="
bg-purple-50
rounded-2xl
p-5
"

>


<CheckCircle2

className="
text-purple-700
mb-3
"

/>


<h3

className="
font-black
"

>

Reportes inteligentes

</h3>


<p

className="
text-gray-500
text-sm
"

>

Genera informes académicos.

</p>


</div>



</div>





</section>


);


}