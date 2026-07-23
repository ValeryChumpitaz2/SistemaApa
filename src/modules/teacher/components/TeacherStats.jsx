import {
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Award
} from "lucide-react";


export default function TeacherStats({
  resultados = []
}) {



console.log(
  "STATS RECIBE:",
  resultados
);



// TOTAL DOCUMENTOS

const total =
Array.isArray(resultados)
?
resultados.length
:
0;




// EXTRAER PORCENTAJE SEGURO

function obtenerPorcentaje(item){


return Number(

item?.puntaje?.porcentaje
??
item?.puntaje?.porcentajeFinal
??
item?.porcentaje
??
0

);


}




const aprobados =

resultados.filter(

item =>

obtenerPorcentaje(item) >= 70

).length;





const revisar =

total - aprobados;





const promedio =

total

?

(

resultados.reduce(

(suma,item)=>

suma +

obtenerPorcentaje(item),

0

)

/

total

).toFixed(1)

:

0;






const porcentajeAprobacion =

total

?

Math.round(

(aprobados / total) * 100

)

:

0;






const excelentes =

resultados.filter(

item =>

obtenerPorcentaje(item)>=90

).length;






const cards=[


{

titulo:"Documentos analizados",

valor:total,

descripcion:"Total enviados",

icon:<FileText size={30}/>,

color:"from-blue-600 to-indigo-700"

},



{

titulo:"Aprobados",

valor:aprobados,

descripcion:`${porcentajeAprobacion}% del grupo`,

icon:<CheckCircle size={30}/>,

color:"from-green-500 to-emerald-700"

},



{

titulo:"Pendientes revisión",

valor:revisar,

descripcion:"Requieren mejoras",

icon:<AlertTriangle size={30}/>,

color:"from-red-500 to-rose-700"

},



{

titulo:"Promedio general",

valor:`${promedio}%`,

descripcion:"Rendimiento del grupo",

icon:<TrendingUp size={30}/>,

color:"from-purple-500 to-fuchsia-700"

},



{

titulo:"Excelentes",

valor:excelentes,

descripcion:"90% o más",

icon:<Award size={30}/>,

color:"from-yellow-500 to-orange-600"

},



{

titulo:"Estudiantes evaluados",

valor:total,

descripcion:"Participantes",

icon:<Users size={30}/>,

color:"from-cyan-500 to-blue-700"

}


];






return (


<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"

>


{

cards.map(

(card,index)=>(


<div

key={index}

className={`

bg-gradient-to-br

${card.color}

rounded-3xl

p-6

text-white

shadow-xl

hover:scale-[1.02]

transition

duration-300

`}

>


<div

className="
flex
justify-between
items-start
"

>


<div>


<p

className="
text-white/80
text-sm
font-semibold
"

>

{card.titulo}

</p>



<h3

className="
text-5xl
font-black
mt-3
"

>

{card.valor}

</h3>



<p

className="
text-white/70
text-sm
mt-2
"

>

{card.descripcion}

</p>


</div>



<div

className="
bg-white/20
backdrop-blur
rounded-2xl
p-4
"

>

{card.icon}

</div>


</div>


</div>


)


)


}


</div>


);


}
