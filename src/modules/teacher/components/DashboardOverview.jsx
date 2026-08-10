import {
  CalendarDays,
  Clock,
  GraduationCap,
  ShieldCheck,
  Sparkles
} from "lucide-react";


import {
  useEffect,
  useState
} from "react";



export default function DashboardOverview(){



const [hora,setHora] = useState("");




useEffect(()=>{


function actualizarHora(){


setHora(

new Date().toLocaleTimeString(
"es-ES",
{
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
}
)

);


}



actualizarHora();



const intervalo =
setInterval(
actualizarHora,
1000
);



return ()=>clearInterval(intervalo);



},[]);







const fecha =

new Date().toLocaleDateString(

"es-ES",

{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

}

);







return (


<div

className="
bg-gradient-to-br
from-[#172554]
via-[#1D3681]
to-blue-600
rounded-3xl
p-8
text-white
shadow-xl
relative
overflow-hidden
"

>


{/* DECORACION */}

<div

className="
absolute
right-0
top-0
opacity-10
"

>

<Sparkles size={180}/>


</div>






<div

className="
relative
flex
flex-col
xl:flex-row
justify-between
gap-10
"

>





<div>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
bg-white/20
p-3
rounded-2xl
"

>

<GraduationCap size={35}/>


</div>



<div>


<h1

className="
text-4xl
font-black
"

>

Hola, Docente VG 👨‍🏫

</h1>


<p

className="
text-blue-100
mt-1
"

>

Panel inteligente de evaluación APA

</p>


</div>



</div>







<p

className="
mt-6
text-blue-100
text-lg
max-w-xl
"

>

Bienvenido a VG Smart Review.
Gestiona evaluaciones académicas,
analiza documentos y genera reportes
automáticos.

</p>








<div

className="
mt-6
inline-flex
items-center
gap-3
bg-green-500/20
border
border-green-300/30
rounded-xl
px-5
py-3
"

>


<ShieldCheck/>


<div>


<p className="
font-bold
">

Sistema operativo

</p>


<p className="
text-sm
text-green-100
">

Todos los servicios activos

</p>


</div>


</div>





</div>









<div

className="
bg-white/15
backdrop-blur-xl
rounded-3xl
p-6
space-y-5
min-w-[300px]
border
border-white/20
"

>





<div

className="
flex
items-center
gap-4
"

>


<CalendarDays/>


<div>


<p className="
text-blue-100
text-sm
">

Fecha

</p>


<p className="
font-bold
capitalize
"

>

{fecha}

</p>


</div>


</div>








<div

className="
flex
items-center
gap-4
"

>


<Clock/>


<div>


<p className="
text-blue-100
text-sm
">

Hora actual

</p>


<p

className="
font-black
text-2xl
"

>

{hora}

</p>


</div>


</div>








<div

className="
flex
items-center
gap-4
"

>


<GraduationCap/>


<div>


<p className="
text-blue-100
text-sm
">

Perfil activo

</p>


<p className="
font-bold
">

Docente administrador

</p>


</div>


</div>








</div>





</div>






</div>


);


}