import {
 Files,
 Users,
 BarChart3
} from "lucide-react";


export default function TeacherStats(){


return (

<div className="
grid
md:grid-cols-3
gap-6
">


<Card

icon={<Files/>}

title="Documentos analizados"

value="0"

/>



<Card

icon={<Users/>}

title="Estudiantes evaluados"

value="0"

/>



<Card

icon={<BarChart3/>}

title="Promedio del aula"

value="0%"

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
bg-indigo-100
text-indigo-900
p-4
rounded-xl
">

{icon}

</div>



<div>

<p className="
text-gray-500
">

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