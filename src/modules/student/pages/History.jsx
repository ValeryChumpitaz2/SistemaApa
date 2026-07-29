import {
  History as HistoryIcon,
  FileText,
  TrendingUp
} from "lucide-react";


import HistoryTable from "../components/HistoryTable";



export default function History({
  documentos = []
}) {



const total =
documentos.length;



const promedio =
total
?
Math.round(
documentos.reduce(
(total,item)=>
total + (item.puntaje?.porcentaje || 0),
0
)
/ total
)
:
0;




return (

<div

className="
space-y-8
"

>





{/* TITULO */}

<section>


<div

className="
flex
items-center
gap-3
"

>

<div

className="
bg-purple-100
text-purple-700
p-3
rounded-xl
"

>

<HistoryIcon/>

</div>



<div>


<h1

className="
text-3xl
font-black
text-gray-800
dark:text-white
"

>

Historial de evaluaciones

</h1>



<p

className="
text-gray-500
mt-1
"

>

Consulta todos tus documentos analizados.

</p>


</div>


</div>


</section>









{/* ESTADISTICAS */}

<div

className="
grid
md:grid-cols-3
gap-5
"

>


<Card

icon={<FileText/>}

titulo="Documentos analizados"

valor={total}

/>



<Card

icon={<TrendingUp/>}

titulo="Promedio general"

valor={`${promedio}%`}

/>



<Card

icon={<HistoryIcon/>}

titulo="Última actividad"

valor={
total
?
"Reciente"
:
"Sin datos"
}

/>



</div>









{/* TABLA */}


<section

className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
shadow
p-6
"

>


<h2

className="
text-xl
font-black
text-gray-800
dark:text-white
mb-5
"

>

Mis documentos

</h2>



<HistoryTable

documentos={documentos}

/>



</section>






</div>

);

}








function Card({
icon,
titulo,
valor
}){


return (

<div

className="
bg-white
dark:bg-slate-900
border
dark:border-slate-800
rounded-3xl
p-6
shadow
flex
items-center
gap-4
"

>


<div

className="
bg-blue-100
text-blue-700
p-4
rounded-2xl
"

>

{icon}

</div>



<div>


<p

className="
text-sm
text-gray-500
"

>

{titulo}

</p>


<h3

className="
text-2xl
font-black
text-gray-800
dark:text-white
"

>

{valor}

</h3>


</div>


</div>

);

}