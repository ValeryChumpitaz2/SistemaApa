import {
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Award
} from "lucide-react";


import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";




export default function AcademicAnalytics({

resultados=[]

}){



function porcentaje(item){

return Number(

item?.puntaje?.porcentaje
??
item?.porcentaje
??
0

);

}





const promedio = resultados.length

?

(
resultados.reduce(

(a,b)=>

a + porcentaje(b)

,0)

/

resultados.length

).toFixed(1)

:

0;





const niveles=[


{
name:"Excelente",
value:resultados.filter(
x=>porcentaje(x)>=90
).length
},


{
name:"Bueno",
value:resultados.filter(
x=>porcentaje(x)>=70 &&
porcentaje(x)<90
).length
},


{
name:"Regular",
value:resultados.filter(
x=>porcentaje(x)>=60 &&
porcentaje(x)<70
).length
},


{
name:"Bajo",
value:resultados.filter(
x=>porcentaje(x)<60
).length
}


];






const criterios=[


{
criterio:"Contenido",
valor:80
},


{
criterio:"Redacción",
valor:75
},


{
criterio:"Originalidad",
valor:85
},


{
criterio:"Referencias",
valor:70
},


{
criterio:"Formato",
valor:90
}



];





const colores=[

"#22c55e",
"#3b82f6",
"#eab308",
"#ef4444"

];








return (

<div className="
space-y-8
">






{/* HEADER */}

<div className="
bg-gradient-to-r
from-[#1D3681]
to-blue-600
rounded-3xl
p-8
text-white
">


<h1 className="
text-3xl
font-black
flex
items-center
gap-3
">

<BarChart3/>

Analítica académica

</h1>



<p className="
mt-3
text-blue-100
">

Análisis profundo del rendimiento APA del aula.

</p>


</div>









{/* TARJETAS */}


<div className="
grid
md:grid-cols-3
gap-6
">





<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
">

<Target
className="
text-blue-700
"
/>


<p className="
text-gray-500
mt-3
">

Promedio APA

</p>


<h2 className="
text-4xl
font-black
">

{promedio}%

</h2>


</div>








<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
">

<Users
className="
text-purple-700
"
/>


<p className="
text-gray-500
mt-3
">

Estudiantes evaluados

</p>


<h2 className="
text-4xl
font-black
">

{resultados.length}

</h2>


</div>








<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
">

<Award
className="
text-yellow-600
"
/>


<p className="
text-gray-500
mt-3
">

Mejor desempeño

</p>


<h2 className="
text-4xl
font-black
">

{
Math.max(
...resultados.map(porcentaje),
0
)
}%

</h2>


</div>



</div>









{/* GRAFICOS */}



<div className="
grid
xl:grid-cols-2
gap-8
">







{/* RADAR */}


<div className="
bg-white
rounded-3xl
border
p-8
shadow-sm
">


<h2 className="
font-black
text-xl
mb-6
flex
gap-2
items-center
">

<TrendingUp/>

Perfil APA

</h2>



<ResponsiveContainer
width="100%"
height={350}
>


<RadarChart data={criterios}>


<PolarGrid/>


<PolarAngleAxis
dataKey="criterio"
/>


<Radar

dataKey="valor"

stroke="#1D3681"

fill="#2563eb"

fillOpacity={0.5}

/>


</RadarChart>


</ResponsiveContainer>


</div>









{/* DONA */}


<div className="
bg-white
rounded-3xl
border
p-8
shadow-sm
">


<h2 className="
font-black
text-xl
mb-6
">

Distribución académica

</h2>



<ResponsiveContainer
width="100%"
height={350}
>


<PieChart>


<Pie

data={niveles}

dataKey="value"

nameKey="name"

outerRadius={120}

label

>


{

niveles.map(
(_,index)=>(

<Cell

key={index}

fill={
colores[index]
}

/>

)

)

}



</Pie>


</PieChart>



</ResponsiveContainer>



</div>







</div>









{/* BARRAS */}



<div className="
bg-white
rounded-3xl
border
p-8
shadow-sm
">



<h2 className="
text-xl
font-black
mb-6
">

Rendimiento por criterios

</h2>




<ResponsiveContainer
width="100%"
height={350}
>


<BarChart
data={criterios}
>


<XAxis
dataKey="criterio"
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="valor"

fill="#1D3681"

radius={[10,10,0,0]}

/>


</BarChart>



</ResponsiveContainer>



</div>








</div>

);

}