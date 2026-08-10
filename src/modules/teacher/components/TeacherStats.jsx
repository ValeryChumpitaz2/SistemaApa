import {
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Award
} from "lucide-react";


export default function TeacherStats({
  resultados=[]
}){


function porcentaje(item){

return Number(
item?.puntaje?.porcentaje ??
item?.puntaje?.porcentajeFinal ??
0
);

}



const total = resultados.length;



const aprobados =
resultados.filter(
x=>porcentaje(x)>=70
).length;



const criticos =
resultados.filter(
x=>porcentaje(x)<50
).length;



const excelentes =
resultados.filter(
x=>porcentaje(x)>=90
).length;



const promedio =
total
?
(
resultados.reduce(
(a,b)=>a+porcentaje(b),
0
)/total
).toFixed(1)
:
0;



const rendimiento =
total
?
Math.round(
(aprobados/total)*100
)
:
0;



return (

<section
className="
space-y-6
"
>


{/* RESUMEN PRINCIPAL */}

<div

className="
bg-gradient-to-r
from-blue-950
via-indigo-900
to-blue-700
rounded-3xl
p-8
text-white
shadow-xl
"

>


<div
className="
flex
justify-between
items-center
flex-wrap
gap-6
"
>


<div>

<p
className="
text-blue-200
font-semibold
"
>

Resumen del aula

</p>


<h2
className="
text-4xl
font-black
mt-2
"
>

{total}

<span className="
text-2xl
ml-2
"
>
evaluaciones
</span>

</h2>


<p
className="
mt-2
text-blue-100
"
>

Seguimiento automático del rendimiento APA

</p>


</div>




<div
className="
bg-white/10
rounded-3xl
p-6
min-w-[250px]
"
>


<div
className="
flex
items-center
gap-3
"
>

<TrendingUp/>

<div>

<p
className="
text-sm
text-blue-200
"
>
Promedio general
</p>


<h3
className="
text-3xl
font-black
"
>

{promedio}%

</h3>


</div>


</div>


</div>


</div>


</div>






{/* TARJETAS */}

<div

className="
grid
md:grid-cols-3
gap-6
"

>


<Card

icon={<CheckCircle/>}

titulo="Aprobados"

valor={aprobados}

color="green"

/>



<Card

icon={<AlertTriangle/>}

titulo="Críticos"

valor={criticos}

color="red"

/>



<Card

icon={<Award/>}

titulo="Excelentes"

valor={excelentes}

color="yellow"

/>


</div>






{/* BARRA */}

<div

className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>


<div
className="
flex
justify-between
mb-3
"

>

<span
className="
font-bold
"
>
Nivel de aprobación
</span>


<span
className="
font-black
text-blue-700
"
>

{rendimiento}%

</span>


</div>



<div
className="
h-4
bg-gray-100
rounded-full
overflow-hidden
"

>


<div

style={{
width:`${rendimiento}%`
}}

className="
h-full
bg-gradient-to-r
from-blue-600
to-cyan-400
rounded-full
"

/>


</div>


</div>





</section>


);

}







function Card({
icon,
titulo,
valor,
color
}){


const colores={

green:"from-green-500 to-emerald-700",

red:"from-red-500 to-rose-700",

yellow:"from-yellow-500 to-orange-600"

};



return (

<div

className={`
bg-gradient-to-br
${colores[color]}
rounded-3xl
p-6
text-white
shadow-lg
`}

>


<div
className="
flex
justify-between
"
>


<div>

<p
className="
text-white/80
"
>
{titulo}
</p>


<h3
className="
text-4xl
font-black
mt-3
"
>
{valor}
</h3>


</div>



<div
className="
bg-white/20
p-3
rounded-xl
"
>

{icon}

</div>


</div>


</div>

);

}