import {
CheckCircle,
XCircle
} from "lucide-react";



export default function CriteriaList({
criterios=[]
}){


return (

<div className="
space-y-5
">


<h2 className="
text-2xl
font-black
text-gray-800
dark:text-white
">

Detalle de evaluación

</h2>




{
criterios.map((criterio,index)=>(


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
mt-1
">

Puntuación:

<strong>

{" "}
{criterio.puntaje}

</strong>

/{criterio.maximo}

</p>



</div>





<div className={`
px-4
py-2
rounded-full
font-bold
text-sm
flex
items-center
gap-2

${criterio.cumple

?
"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}>



{
criterio.cumple

?

<CheckCircle size={18}/>

:

<XCircle size={18}/>

}



{
criterio.cumple
?
"Cumple"
:
"Pendiente"
}



</div>



</div>









<div className="
mt-5
space-y-3
">


{
criterio.detalles?.map((d,i)=>(


<div

key={i}

className="
border
dark:border-slate-700
rounded-2xl
p-4
"


>


<div className="
flex
items-center
gap-2
font-bold
dark:text-white
">


{
d.cumple

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


{d.titulo}


</div>



<p className="
text-sm
text-gray-500
mt-2
">

{d.descripcion}

</p>


</div>


))

}



</div>





</div>


))


}



</div>


);


}