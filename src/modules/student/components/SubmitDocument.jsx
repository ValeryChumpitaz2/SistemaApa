import {
  useState
} from "react";


import {
  Search
} from "lucide-react";


import {
  analyzeDocument
} from "../services/studentService";


import ResultCard from "../components/ResultCard";
import CriteriaList from "../components/CriteriaList";
import Recommendations from "../components/Recommendations";



export default function SubmitDocument({
  setDocumentos
}){


const [url,setUrl] = useState("");

const [loading,setLoading] = useState(false);

const [analysis,setAnalysis] = useState(null);





async function handleSubmit(e){


e.preventDefault();



if(!url.trim()){

alert(
"Ingrese el enlace del documento"
);

return;

}



try{


setLoading(true);



const data =
await analyzeDocument(url);





console.log(
"RESPUESTA COMPLETA BACKEND:",
data
);






/*
==============================
GUARDAR RESULTADO DASHBOARD
==============================
*/


const resultado = {


nombre:
data.resumen?.nombre ||
"Documento sin nombre",



resumen:
data.resumen ||
{},

puntaje:
data.puntaje ||
{
obtenido:0,
maximo:2,
porcentaje:0
},



criterios:
data.criterios || [],



fecha:
new Date()
.toLocaleDateString()



};






setAnalysis(
resultado
);






/*
==============================
ACTUALIZAR STATS + HISTORIAL
==============================
*/


setDocumentos(
(prev)=>[

...prev,

resultado

]

);





console.log(
"DOCUMENTO GUARDADO:",
resultado
);




}

catch(error){


console.error(
"ERROR ANALIZANDO DOCUMENTO:",
error
);



alert(
"Error analizando documento"
);



}

finally{


setLoading(false);


}



}








return (

<section

className="
max-w-6xl
mx-auto
px-8
mt-10
"

>



<div

className="
bg-white
rounded-3xl
shadow-lg
border
p-8
"

>



<h2

className="
text-2xl
font-bold
"

>

Nueva revisión

</h2>





<p

className="
text-gray-500
mt-2
"

>

Ingresa el enlace del documento de Google Docs

</p>









<form

onSubmit={handleSubmit}

className="
mt-6
flex
flex-col
gap-4
"

>





<input


type="url"


value={url}


disabled={loading}



onChange={
(e)=>
setUrl(
e.target.value
)
}



placeholder="
https://docs.google.com/document/...
"



className="
border
rounded-xl
p-4
outline-none
focus:ring-2
focus:ring-blue-800
disabled:bg-gray-100
"



/>








<button


type="submit"


disabled={loading}



className="
bg-blue-950
text-white
rounded-xl
py-4
font-bold
flex
justify-center
items-center
gap-2
disabled:opacity-50
"

>



<Search size={20}/>



{

loading

?

"Analizando documento..."

:

"Analizar documento"

}



</button>





</form>









{

analysis && (


<div

className="
mt-10
space-y-6
"

>





<ResultCard

analysis={analysis}

/>







<CriteriaList

criterios={
analysis.criterios ?? []
}

/>







<Recommendations

criterios={
analysis.criterios ?? []
}

/>







</div>


)



}





</div>



</section>


);


}


