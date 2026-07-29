import {
  AlertTriangle,
  CheckCircle
} from "lucide-react";


export default function Recommendations({
  criterios = []
}){


const pendientes =
criterios.filter(
(item)=>!item.cumple
);



return (

<div
className="
bg-white
rounded-3xl
border
shadow-sm
p-6
"
>


<div className="
flex
items-center
gap-3
mb-5
">

<div
className="
bg-yellow-100
text-yellow-700
p-3
rounded-xl
"
>

<AlertTriangle size={24}/>

</div>


<h3
className="
text-xl
font-black
text-gray-800
"
>

Recomendaciones para mejorar

</h3>


</div>





{
pendientes.length === 0 ?


<div
className="
flex
items-center
gap-3
bg-green-50
text-green-700
p-4
rounded-xl
"
>

<CheckCircle/>

<p>
Excelente. Todos los criterios cumplen.
</p>


</div>



:


<div className="space-y-3">


{
pendientes.map((item,index)=>(


<div

key={index}

className="
bg-gray-50
rounded-xl
p-4
border
"

>


<p
className="
font-bold
text-gray-800
"
>

{item.criterio}

</p>


<p
className="
text-gray-500
text-sm
mt-1
"
>

Debe corregirse este aspecto para mejorar el puntaje del documento.

</p>


</div>


))


}



</div>


}



</div>


);


}