import {
  Lightbulb,
  CheckCircle2,
  AlertCircle
} from "lucide-react";



export default function Recommendations({
  criterios = []
}){


if(!Array.isArray(criterios) || criterios.length === 0){

return null;

}



const pendientes = criterios.filter(
(item)=> !item.cumple
);





return (

<div className="
bg-yellow-50
border
border-yellow-200
rounded-3xl
p-6
">






<div className="
flex
items-center
gap-3
mb-6
">


<div className="
bg-yellow-200
text-yellow-700
p-3
rounded-xl
">


<Lightbulb
size={26}
/>


</div>



<div>


<h3 className="
text-xl
font-bold
text-yellow-900
">

Recomendaciones para mejorar

</h3>


<p className="
text-yellow-700
text-sm
mt-1
">

Criterios que requieren atención

</p>


</div>



</div>







{

pendientes.length === 0

?


<div className="
bg-green-50
border
border-green-200
rounded-2xl
p-5
flex
items-center
gap-3
text-green-700
font-semibold
">


<CheckCircle2 size={25}/>


<div>

<p>

¡Excelente trabajo!

</p>


<span className="
text-sm
font-normal
">

El documento cumple todos los criterios evaluados.

</span>


</div>


</div>



:


<ul className="
space-y-4
">


{

pendientes.map((item,index)=>(


<li

key={
item.id ?? `${item.criterio}-${index}`
}


className="
bg-white
rounded-2xl
p-5
shadow-sm
border
border-yellow-100
"


>


<div className="
flex
gap-3
items-start
">


<AlertCircle

size={20}

className="
text-yellow-600
mt-1
"

/>



<div>


<p className="
font-bold
text-gray-800
">

{
item.criterio ??
"Revisar criterio APA"
}

</p>



<p className="
text-gray-600
text-sm
mt-2
">

Debe corregirse este aspecto para mejorar el puntaje del documento.

</p>


</div>



</div>


</li>



))


}



</ul>



}





</div>


);


}