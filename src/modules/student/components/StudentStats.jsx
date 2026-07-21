import {
 FileText,
 Clock,
 CheckCircle
} from "lucide-react";


export default function StudentStats(){


return (

<div className="
grid
md:grid-cols-3
gap-6
">


<Card

icon={<FileText/>}

title="Documentos enviados"

value="0"

/>


<Card

icon={<Clock/>}

title="Pendientes"

value="0"

/>



<Card

icon={<CheckCircle/>}

title="Revisados"

value="0"

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