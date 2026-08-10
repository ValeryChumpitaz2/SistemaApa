import {
  useState,
  useMemo,
  useEffect
} from "react";


import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  BarChart3,
  TrendingUp
} from "lucide-react";



export default function ResultsTable({

  resultados = [],

  onSelect

}) {



const ITEMS_POR_PAGINA = 10;



const [
paginaActual,
setPaginaActual
]=useState(1);



const [
busqueda,
setBusqueda
]=useState("");



const [
estadoFiltro,
setEstadoFiltro
]=useState("todos");



const [
nivelFiltro,
setNivelFiltro
]=useState("todos");





useEffect(()=>{

setPaginaActual(1);

},[
busqueda,
estadoFiltro,
nivelFiltro,
resultados
]);







// ==========================
// FILTROS
// ==========================


const resultadosFiltrados = useMemo(()=>{


return resultados.filter(item=>{


const nombre =

(
item.nombre || ""
)

.toLowerCase();



const texto =

busqueda.toLowerCase();



const porcentaje =

Number(
item.puntaje?.porcentaje ?? 0
);



const coincideBusqueda =

nombre.includes(texto);






let coincideEstado=true;



if(
estadoFiltro==="aprobado"
){

coincideEstado =
porcentaje>=70;

}



if(
estadoFiltro==="critico"
){

coincideEstado =
porcentaje<50;

}







let coincideNivel=true;



if(
nivelFiltro==="excelente"
){

coincideNivel =
porcentaje>=90;

}


if(
nivelFiltro==="bueno"
){

coincideNivel =
porcentaje>=70 &&
porcentaje<90;

}



if(
nivelFiltro==="regular"
){

coincideNivel =
porcentaje>=50 &&
porcentaje<70;

}



if(
nivelFiltro==="critico"
){

coincideNivel =
porcentaje<50;

}





return (

coincideBusqueda &&

coincideEstado &&

coincideNivel

);



});


},[
resultados,
busqueda,
estadoFiltro,
nivelFiltro
]);









// ==========================
// PAGINACION
// ==========================


const totalPaginas =

Math.max(

1,

Math.ceil(

resultadosFiltrados.length /

ITEMS_POR_PAGINA

)

);



const resultadosPaginados = useMemo(()=>{


const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;


return resultadosFiltrados.slice(

inicio,

inicio + ITEMS_POR_PAGINA

);



},[
resultadosFiltrados,
paginaActual
]);










if(!resultados.length){


return (

<div

className="
bg-white
rounded-3xl
border
p-12
text-center
text-gray-400
"

>


<FileText

size={50}

className="
mx-auto
mb-4
"

/>



<h3

className="
text-xl
font-bold
"

>

Aún no existen evaluaciones

</h3>



<p className="mt-2">

Analiza una carpeta para comenzar.

</p>


</div>


);


}







// ==========================
// ESTADISTICAS
// ==========================



const promedio = Math.round(


resultados.reduce(

(total,item)=>

total +

Number(
item.puntaje?.porcentaje || 0
),


0

)

/

resultados.length


);



const aprobados = resultados.filter(

item =>

Number(
item.puntaje?.porcentaje || 0
)>=70

).length;




const criticos = resultados.filter(

item =>

Number(
item.puntaje?.porcentaje || 0
)<50

).length;









return (

<>





{/* RESUMEN */}



<div

className="
grid
md:grid-cols-4
gap-5
mb-8
"

>


<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>

<div className="
flex
items-center
gap-2
text-blue-700
font-bold
"

>

<BarChart3 size={22}/>

Evaluados

</div>


<p className="
text-3xl
font-black
mt-3
">

{resultados.length}

</p>


</div>






<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>

<div className="
flex
items-center
gap-2
text-green-700
font-bold
"

>

<TrendingUp size={22}/>

Promedio

</div>


<p className="
text-3xl
font-black
mt-3
">

{promedio}%

</p>


</div>







<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>


<p className="
font-bold
text-green-700
"

>

Aprobados

</p>


<p className="
text-3xl
font-black
mt-3
"

>

{aprobados}

</p>


</div>







<div className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>


<p className="
font-bold
text-red-700
"

>

Críticos

</p>


<p className="
text-3xl
font-black
mt-3
"

>

{criticos}

</p>


</div>





</div>









{/* FILTROS */}



<div

className="
bg-white
rounded-3xl
border
shadow-sm
p-6
mb-8
"

>


<div

className="
flex
items-center
gap-2
font-black
text-blue-900
mb-5
"

>

<Filter/>

Filtros de búsqueda

</div>




<div

className="
grid
md:grid-cols-3
gap-4
"

>



<div className="
relative
"

>


<Search

size={20}

className="
absolute
left-4
top-3.5
text-gray-400
"

/>



<input


value={busqueda}


onChange={

e=>

setBusqueda(
e.target.value
)

}


placeholder="Buscar documento..."


className="
w-full
pl-12
py-3
rounded-xl
border
focus:ring-2
focus:ring-blue-500
outline-none
"

/>


</div>






<select

value={estadoFiltro}

onChange={

e=>

setEstadoFiltro(
e.target.value
)

}


className="
rounded-xl
border
px-4
py-3
font-semibold
"

>


<option value="todos">

Todos los estados

</option>


<option value="aprobado">

🟢 Aprobados

</option>


<option value="critico">

🔴 Críticos

</option>



</select>








<select

value={nivelFiltro}

onChange={

e=>

setNivelFiltro(
e.target.value
)

}


className="
rounded-xl
border
px-4
py-3
font-semibold
"

>


<option value="todos">

Todos los niveles

</option>


<option value="excelente">

Excelente 90+

</option>


<option value="bueno">

Bueno 70-89

</option>


<option value="regular">

Regular 50-69

</option>


<option value="critico">

Crítico 0-49

</option>



</select>




</div>


</div>









{/* TABLA */}




<div

className="
bg-white
rounded-3xl
border
shadow-sm
overflow-hidden
"

>


<div className="overflow-x-auto">


<table className="
w-full
min-w-[900px]
">


<thead

className="
bg-gradient-to-r
from-blue-950
to-indigo-700
text-white
"

>


<tr>


<th className="p-5 text-left">

Documento

</th>


<th className="p-5 text-center">

Puntaje

</th>


<th className="p-5 text-center">

Cumplimiento

</th>


<th className="p-5 text-center">

Nivel

</th>


<th className="p-5 text-center">

Acción

</th>


</tr>


</thead>





<tbody>


{

resultadosPaginados.map(

(item,index)=>{


const porcentaje =

Number(
item.puntaje?.porcentaje ?? 0
);



let nivel;


if(porcentaje>=90)

nivel={
texto:"Excelente",
color:"bg-green-100 text-green-700"
};


else if(porcentaje>=70)

nivel={
texto:"Bueno",
color:"bg-blue-100 text-blue-700"
};


else if(porcentaje>=50)

nivel={
texto:"Regular",
color:"bg-yellow-100 text-yellow-700"
};


else

nivel={
texto:"Crítico",
color:"bg-red-100 text-red-700"
};





return (

<tr

key={`${item.nombre}-${index}`}

className="
border-t
hover:bg-slate-50
transition
"

>


<td className="p-5">


<div className="
flex
items-center
gap-3
">


<div className="
bg-blue-100
text-blue-700
p-2
rounded-xl
">

<FileText size={18}/>

</div>



<span className="
font-bold
">

{item.nombre}

</span>



</div>


</td>






<td className="
p-5
text-center
font-black
">


{
item.puntaje?.obtenido ?? 0
}

/

{
item.puntaje?.maximo ?? 0
}


</td>








<td className="p-5">


<div className="
w-32
mx-auto
">


<div className="
flex
justify-between
text-xs
font-bold
mb-1
">


{porcentaje}%


</div>



<div className="
h-2
bg-gray-200
rounded-full
overflow-hidden
">


<div

className={`
h-full
rounded-full

${
porcentaje>=70
?
"bg-green-500"
:
porcentaje>=50
?
"bg-yellow-500"
:
"bg-red-500"
}

`}

style={{
width:`${porcentaje}%`
}}


/>


</div>


</div>


</td>









<td className="p-5 text-center">


<span

className={`
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
font-bold
${nivel.color}
`}

>


{

porcentaje>=70

?

<CheckCircle2 size={17}/>

:

<AlertTriangle size={17}/>

}


{nivel.texto}


</span>


</td>








<td className="
p-5
text-center
">


<button

onClick={()=>onSelect(item)}

className="
bg-[#1D3681]
hover:bg-blue-900
text-white
px-4
py-2
rounded-xl
flex
items-center
gap-2
mx-auto
font-bold
"

>


<Eye size={18}/>


Detalle


</button>



</td>






</tr>


);


}

)


}



</tbody>



</table>


</div>









{/* PAGINACION */}



<div

className="
flex
justify-between
items-center
p-5
bg-gray-50
border-t
"

>


<span className="
text-sm
text-gray-500
"

>

{

resultadosFiltrados.length

}

resultados encontrados

</span>





<div className="
flex
items-center
gap-3
">


<button

disabled={paginaActual===1}

onClick={

()=>setPaginaActual(
p=>p-1
)

}

className="
p-2
border
rounded-lg
"

>

<ChevronLeft/>

</button>




<span className="
font-bold
"

>

{paginaActual}/{totalPaginas}

</span>





<button

disabled={
paginaActual===totalPaginas
}

onClick={

()=>setPaginaActual(
p=>p+1
)

}

className="
p-2
border
rounded-lg
"

>

<ChevronRight/>

</button>



</div>


</div>



</div>





</>

);


}