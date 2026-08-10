import {
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";


export default function CriteriaList({

  criterios = []

}) {


return (

<div className="space-y-5">


<h2 className="
text-2xl
font-black
text-gray-800
dark:text-white
">

Detalle de evaluación

</h2>



{
criterios.map((criterio,index)=>{


const cumpleTotal =
criterio.puntaje >= criterio.maximo;



const noCumple =
criterio.puntaje === 0;



const estadoColor =

cumpleTotal

?

"bg-green-100 text-green-700"

:

noCumple

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700";



const EstadoIcono =

cumpleTotal

?

CheckCircle

:

noCumple

?

XCircle

:

AlertTriangle;



const estadoTexto =

cumpleTotal

?

"Cumple"

:

noCumple

?

"No cumple"

:

"Cumple parcialmente";




return (

<div

key={index}

className="
bg-white
dark:bg-slate-900
border
dark:border-slate-800
rounded-3xl
p-6
shadow-sm
"

>



{/* CABECERA */}

<div className="
flex
justify-between
items-start
gap-4
">


<div>


<h3 className="
font-black
text-lg
dark:text-white
">

{criterio.criterio}

</h3>



<p className="
text-gray-500
text-sm
mt-2
">

Puntuación:

<strong>
{" "}
{criterio.puntaje}
</strong>

/
{criterio.maximo}

</p>


</div>





{/* ESTADO */}

<div className={`

px-4
py-2
rounded-full
font-bold
text-sm
flex
items-center
gap-2

${estadoColor}

`}>

<EstadoIcono size={18}/>

{estadoTexto}

</div>



</div>






{/* DETALLES */}

<div className="
mt-5
space-y-3
">


{

criterio.detalles?.map((detalle,i)=>(


<div

key={i}

className={`

border
rounded-2xl
p-4


${
detalle.cumple

?

"border-green-200 bg-green-50 dark:bg-green-900/20"

:

"border-red-200 bg-red-50 dark:bg-red-900/20"

}

`}

>


<div className="
flex
items-center
gap-2
font-bold
dark:text-white
">


{

detalle.cumple

?

<CheckCircle

size={18}

className="text-green-500"

/>


:

<XCircle

size={18}

className="text-red-500"

/>

}



{detalle.titulo}


</div>




<p className="
text-sm
text-gray-600
dark:text-gray-300
mt-2
">

{detalle.descripcion}

</p>



</div>


))


}


</div>






{/* RECOMENDACION */}

{

!criterio.cumple &&


<div className="
mt-5
bg-yellow-50
dark:bg-yellow-900/20
border
border-yellow-200
rounded-2xl
p-4
flex
gap-3
items-start
">


<AlertTriangle

size={20}

className="text-yellow-600"

/>



<div>


<p className="
font-bold
text-yellow-700
">

Recomendación

</p>



<p className="
text-sm
text-yellow-700
mt-1
">

{

criterio.recomendacion ||

"Revisar los puntos pendientes."

}

</p>


</div>


</div>


}





</div>

)


})

}



</div>

);

}