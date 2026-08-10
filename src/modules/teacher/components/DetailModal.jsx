import {
X,
Download,
AlertTriangle,
CheckCircle2
} from "lucide-react";


import ResultCard from "../../student/components/ResultCard.jsx";
import CriteriaList from "../../student/components/CriteriaList.jsx";
import Recommendations from "../../student/components/Recommendations.jsx";



export default function DetailModal({

analysis,

onClose

}){


if(!analysis){

return null;

}




const porcentaje =

Number(
analysis.puntaje?.porcentaje ?? 0
);




const estado =

porcentaje>=70

?

{
texto:"Aprobado",
color:"text-green-700 bg-green-100",
icon:<CheckCircle2/>
}

:

{
texto:"Requiere mejoras",
color:"text-red-700 bg-red-100",
icon:<AlertTriangle/>
};






return (


<div

className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
z-50
flex
items-center
justify-center
p-5
"

>



<div

className="
bg-white
rounded-3xl
w-full
max-w-5xl
max-h-[90vh]
overflow-hidden
shadow-2xl
"

>




{/* HEADER */}



<div

className="
sticky
top-0
bg-white
border-b
p-6
flex
justify-between
items-center
"

>



<div>


<h2

className="
text-2xl
font-black
text-gray-800
"

>

Detalle del análisis

</h2>



<p

className="
text-gray-500
mt-1
"

>

📄

{
analysis.nombre ||
"Documento académico"
}

</p>


</div>




<button

onClick={onClose}

className="
p-3
rounded-xl
hover:bg-gray-100
"

>

<X/>

</button>


</div>










<div

className="
p-8
space-y-8
overflow-y-auto
max-h-[75vh]
"

>




{/* RESUMEN */}



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


<p className="text-gray-500">

Puntaje

</p>


<h3 className="
text-3xl
font-black
text-blue-900
">

{
analysis.puntaje?.obtenido ?? 0
}

/

{
analysis.puntaje?.maximo ?? 0
}

</h3>


</div>






<div

className="
bg-indigo-50
rounded-2xl
p-5
"

>


<p className="text-gray-500">

Cumplimiento

</p>


<h3 className="
text-3xl
font-black
text-indigo-900
">

{porcentaje}%

</h3>


</div>








<div

className="
rounded-2xl
p-5
"

>


<p className="text-gray-500">

Estado

</p>


<div

className={`
inline-flex
items-center
gap-2
mt-2
px-4
py-2
rounded-full
font-bold
${estado.color}
`}

>


{estado.icon}

{estado.texto}


</div>


</div>





</div>










<ResultCard

analysis={analysis}

/>







<div>


<h3 className="
text-xl
font-black
mb-4
">

Criterios evaluados

</h3>


<CriteriaList

criterios={
analysis.criterios ?? []
}

/>


</div>










<div>





</div>





</div>










<div

className="
border-t
p-5
flex
justify-between
"

>


<button

onClick={onClose}

className="
px-5
py-3
rounded-xl
border
font-bold
"

>

Cerrar

</button>



<button

className="
bg-blue-900
text-white
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Download size={18}/>

Exportar detalle

</button>



</div>







</div>


</div>


);


}