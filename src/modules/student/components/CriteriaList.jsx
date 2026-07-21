import {
  CheckCircle2,
  XCircle
} from "lucide-react";


export default function CriteriaList({
  criterios = []
}){


if(!Array.isArray(criterios) || criterios.length === 0){

return null;

}




return (

<div className="
bg-gray-50
rounded-3xl
p-6
">





<h2 className="
text-2xl
font-bold
mb-6
text-gray-800
">

Detalle de evaluación

</h2>






<div className="
space-y-4
">


{

criterios.map((item,index)=>(


<div

key={
item.id ?? `${item.criterio}-${index}`
}


className="
bg-white
border
border-gray-100
rounded-2xl
p-6
flex
justify-between
items-center
shadow-sm
hover:shadow-md
transition
"


>


<div>


<h3 className="
font-bold
text-lg
text-gray-800
">

{
item.criterio ??
"Sin criterio"
}

</h3>




<p className="
text-gray-500
mt-2
">


Puntaje:

{" "}


<span className="
font-bold
text-gray-800
">

{
item.puntaje ?? 0
}

</span>


/


{
item.maximo ?? 0
}



</p>



</div>






{

item.cumple

?


<div className="
bg-green-100
p-2
rounded-full
">

<CheckCircle2

size={30}

className="
text-green-600
"

/>

</div>



:


<div className="
bg-red-100
p-2
rounded-full
">

<XCircle

size={30}

className="
text-red-600
"

/>

</div>



}



</div>



))


}



</div>



</div>


);

} 