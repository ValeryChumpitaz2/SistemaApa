import {
 FileText,
 Clock,
 CheckCircle
} from "lucide-react";


export default function StudentStats({
 documentos = []
}){


const enviados =
documentos.length;


const pendientes =
documentos.filter(
item =>
item.estado === "pendiente"
).length;


const revisados =
documentos.filter(
item =>
item.estado === "revisado" ||
item.puntaje
).length;



return (

<div className="
grid
md:grid-cols-3
gap-6
">


<Card

icon={<FileText/>}

title="Documentos enviados"

value={enviados}

/>



<Card

icon={<Clock/>}

title="Pendientes"

value={pendientes}

/>



<Card

icon={<CheckCircle/>}

title="Revisados"

value={revisados}

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
rounded-2xl
shadow
p-6
flex
items-center
gap-4
">


<div className="
bg-blue-100
text-blue-900
p-4
rounded-xl
">

{icon}

</div>



<div>

<p className="text-gray-500">

{title}

</p>


<h3 className="
text-3xl
font-bold
">

{value}

</h3>


</div>



</div>

);


}
