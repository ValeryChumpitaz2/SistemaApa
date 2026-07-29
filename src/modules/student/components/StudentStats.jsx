import {
 FileText,
 Clock,
 CheckCircle,
 TrendingUp
} from "lucide-react";


export default function StudentStats({
 documentos=[]
}){


const enviados =
documentos.length;


const pendientes =
documentos.filter(
x=>!x.puntaje
).length;


const evaluados =
documentos.filter(
x=>x.puntaje
).length;



const promedio =
evaluados
?
Math.round(
documentos.reduce(
(a,b)=>a+(b.puntaje?.porcentaje || 0),
0
)/evaluados
)
:
0;




return (

<div className="
grid
md:grid-cols-4
gap-5
">


<Card

icon={<FileText/>}

title="Enviados"

value={enviados}

/>



<Card

icon={<Clock/>}

title="Pendientes"

value={pendientes}

/>



<Card

icon={<CheckCircle/>}

title="Evaluados"

value={evaluados}

/>



<Card

icon={<TrendingUp/>}

title="Promedio"

value={`${promedio}%`}

/>



</div>


);


}





function Card({
icon,
title,
value
}){


return (

<div className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
shadow-sm
p-6
flex
items-center
gap-4
">


<div className="
bg-blue-100
text-blue-700
p-4
rounded-2xl
">

{icon}

</div>



<div>


<p className="
text-gray-500
text-sm
">

{title}

</p>



<h3 className="
text-3xl
font-black
text-gray-900
dark:text-white
">

{value}

</h3>



</div>



</div>

);


}