import {
  CheckCircle2,
  AlertTriangle,
  FileText
} from "lucide-react";


export default function ResultsTable({
  resultados = []
}){


if(!resultados.length){

return (

<div className="
bg-white
rounded-3xl
border
p-10
text-center
text-gray-500
">


<FileText
size={40}
className="
mx-auto
text-gray-400
"
/>


<p className="
mt-4
">

No hay resultados para mostrar.

</p>


</div>

);

}




return (


<div className="
rounded-3xl
border
bg-white
overflow-hidden
shadow-sm
">


<div className="
overflow-x-auto
">


<table className="
w-full
min-w-[700px]
">



<thead className="
bg-gradient-to-r
from-blue-950
to-indigo-700
text-white
">


<tr>


<th className="
p-5
text-left
">

Documento

</th>



<th className="
p-5
text-center
">

Puntaje

</th>



<th className="
p-5
text-center
">

Cumplimiento

</th>



<th className="
p-5
text-center
">

Estado

</th>



</tr>


</thead>






<tbody>


{
resultados.map((item,index)=>{


const porcentaje =
item.puntaje?.porcentaje ?? 0;



return (

<tr

key={
item.nombre || index
}

className="
border-t
hover:bg-slate-50
transition
"


>



<td className="
p-5
">


<div className="
flex
items-center
gap-3
">


<div className="
bg-blue-100
text-blue-900
p-2
rounded-xl
">


<FileText size={18}/>


</div>




<span className="
max-w-sm
truncate
font-semibold
text-gray-700
">


{item.nombre || "Documento sin nombre"}


</span>


</div>


</td>








<td className="
p-5
text-center
font-bold
text-gray-800
">


{
item.puntaje?.obtenido ?? 0
}


/


{
item.puntaje?.maximo ?? 0
}



</td>








<td className="
p-5
text-center
">


<span className="
inline-block
bg-blue-100
text-blue-900
px-4
py-2
rounded-full
font-bold
">


{porcentaje}%


</span>


</td>








<td className="
p-5
">


{

porcentaje >= 70

?

<div className="
flex
justify-center
items-center
gap-2
text-green-600
font-bold
">


<CheckCircle2 size={20}/>


Aprobado


</div>


:


<div className="
flex
justify-center
items-center
gap-2
text-red-600
font-bold
">


<AlertTriangle size={20}/>


Revisar


</div>


}


</td>




</tr>


);


})


}



</tbody>



</table>


</div>


</div>


);


}