import {
  CheckCircle2,
  XCircle,
  FileText
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
space-y-6
">


{

criterios.map((item,index)=>(


<div

key={item.id ?? index}

className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>


{/* TITULO */}

<div className="
flex
justify-between
items-start
"
>


<div className="
flex
gap-3
items-center
">


<div className="
bg-blue-100
p-3
rounded-xl
">

<FileText

size={25}

className="
text-blue-700
"

/>

</div>



<div>


<h3 className="
text-xl
font-bold
text-gray-800
">

{item.criterio}

</h3>



<p className="
text-gray-500
mt-1
">

Puntuación:

{" "}

<span className="
font-bold
text-gray-900
">

{item.puntaje}

</span>


/

{item.maximo}

puntos

</p>


</div>


</div>




{
item.cumple

?

<CheckCircle2

size={32}

className="
text-green-600
"

/>

:

<XCircle

size={32}

className="
text-red-600
"

/>

}



</div>







{/* DETALLES */}

{

item.detalles && (

<div className="
mt-6
space-y-3
">


<h4 className="
font-bold
text-gray-700
">

Detalle del criterio

</h4>



{

item.detalles.map((detalle,i)=>(


<div

key={i}

className={`
rounded-xl
p-4
flex
gap-3
${
detalle.cumple

?

"bg-green-50"

:

"bg-red-50"

}
`}

>


{

detalle.cumple

?

<CheckCircle2

size={22}

className="
text-green-600
mt-1
"

/>

:

<XCircle

size={22}

className="
text-red-600
mt-1
"

/>

}



<div>


<p className="
font-semibold
text-gray-800
">

{detalle.titulo}

</p>


<p className="
text-gray-600
mt-1
">

{detalle.descripcion}

</p>


</div>


</div>


))

}



</div>

)

}





{/* RECOMENDACION */}

{

item.recomendacion && (

<div className="
mt-5
bg-blue-50
rounded-xl
p-4
">


<p className="
font-bold
text-blue-800
">

Recomendación

</p>


<p className="
text-blue-700
mt-2
">

{item.recomendacion}

</p>


</div>

)

}





</div>


))

}



</div>


</div>

);


}
