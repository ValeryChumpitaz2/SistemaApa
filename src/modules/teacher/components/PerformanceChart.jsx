import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";


export default function PerformanceChart({
  resultados=[]
}){



function porcentaje(item){

return Number(
item?.puntaje?.porcentaje ??
item?.porcentaje ??
0
);

}





const datos = {


excelente: resultados.filter(
r=>porcentaje(r)>=90
).length,


bueno: resultados.filter(
r=>porcentaje(r)>=70 &&
porcentaje(r)<90
).length,


regular: resultados.filter(
r=>porcentaje(r)>=50 &&
porcentaje(r)<70
).length,


bajo: resultados.filter(
r=>porcentaje(r)<50
).length

};





const pieData=[

{
name:"Excelente",
value:datos.excelente
},

{
name:"Bueno",
value:datos.bueno
},

{
name:"Regular",
value:datos.regular
},

{
name:"Bajo",
value:datos.bajo
}

];





const colores=[

"#22c55e",
"#3b82f6",
"#facc15",
"#ef4444"

];





const barras=[

{
nombre:"Excelente",
cantidad:datos.excelente
},

{
nombre:"Bueno",
cantidad:datos.bueno
},

{
nombre:"Regular",
cantidad:datos.regular
},

{
nombre:"Bajo",
cantidad:datos.bajo
}

];







return(


<div className="
grid
xl:grid-cols-2
gap-8
">


{/* DONA */}


<div className="
bg-white
rounded-3xl
border
shadow-sm
p-8
">


<h2 className="
text-xl
font-black
text-gray-800
mb-6
">

Nivel académico

</h2>



<div
className="
h-72
"
>


<ResponsiveContainer>


<PieChart>


<Pie

data={pieData}

cx="50%"

cy="50%"

innerRadius={70}

outerRadius={100}

paddingAngle={5}

dataKey="value"

>


{

pieData.map(
(_,index)=>(

<Cell

key={index}

fill={colores[index]}

/>

)

)

}



</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>





<div className="
grid
grid-cols-2
gap-3
mt-5
">


{

pieData.map(
(item,index)=>(


<div

key={item.name}

className="
flex
items-center
gap-2
text-sm
font-bold
"

>


<span

className="
w-3
h-3
rounded-full
"

style={{
background:
colores[index]
}}

/>


{item.name}: {item.value}


</div>


)

)


}



</div>


</div>









{/* BARRAS */}


<div

className="
bg-white
rounded-3xl
border
shadow-sm
p-8
"

>


<h2

className="
text-xl
font-black
text-gray-800
mb-6
"

>

Distribución de estudiantes

</h2>



<div
className="
h-72
"
>


<ResponsiveContainer>


<BarChart

data={barras}

>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis

dataKey="nombre"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="cantidad"

fill="#1D3681"

radius={[
10,
10,
0,
0
]}

/>


</BarChart>


</ResponsiveContainer>


</div>


</div>






</div>


);


}