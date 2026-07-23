import {
  FileText,
  Clock,
  CheckCircle,
  TrendingUp
} from "lucide-react";


export default function StudentStats({
  documentos = []
}){


const total =
documentos.length;



const revisados =
documentos.filter(
(item)=>
item.puntaje
).length;



const pendientes =
total - revisados;



const promedio =
revisados
?
(
documentos.reduce(
(total,item)=>
total +
Number(
item.puntaje?.porcentaje ?? 0
),
0
)
/
revisados
).toFixed(1)

:
0;



const cards=[


{
titulo:"Documentos enviados",

valor:total,

descripcion:"Total subidos",

icon:<FileText size={30}/>,

color:"from-blue-600 to-indigo-700"

},



{
titulo:"Pendientes",

valor:pendientes,

descripcion:"Esperando revisión",

icon:<Clock size={30}/>,

color:"from-orange-500 to-red-600"

},



{
titulo:"Revisados",

valor:revisados,

descripcion:"Documentos evaluados",

icon:<CheckCircle size={30}/>,

color:"from-green-500 to-emerald-700"

},



{
titulo:"Promedio",

valor:`${promedio}%`,

descripcion:"Resultado general",

icon:<TrendingUp size={30}/>,

color:"from-purple-500 to-fuchsia-700"

}


];





return (

<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
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
