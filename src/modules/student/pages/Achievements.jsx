import {
 Trophy,
 FileCheck,
 Star,
 Target,
 Award,
 Lock
} from "lucide-react";


export default function Achievements({

documentos=[]

}){



const evaluados =
documentos.filter(
doc=>doc.puntaje
);




const promedio =

evaluados.length

?

Math.round(

evaluados.reduce(

(total,item)=>

total + 
(item.puntaje?.porcentaje || 0)

,0)

/
evaluados.length

)

:

0;





const xp =

(evaluados.length * 100)

+

(promedio * 5);






const logros=[


{
titulo:"Primer análisis",
descripcion:"Realizaste tu primera evaluación",
icon:<FileCheck/>,
desbloqueado:evaluados.length>=1,
xp:100
},



{
titulo:"Estudiante constante",
descripcion:"Evaluaste 5 documentos",
icon:<Target/>,
desbloqueado:evaluados.length>=5,
xp:250
},



{
titulo:"Buen dominio APA",
descripcion:"Superaste el 80%",
icon:<Star/>,
desbloqueado:promedio>=80,
xp:300
},



{
titulo:"Experto APA",
descripcion:"Superaste el 95%",
icon:<Trophy/>,
desbloqueado:promedio>=95,
xp:500
}


];






return (

<div className="space-y-8">





<section

className="
bg-gradient-to-r
from-[#1D3681]
to-blue-600
rounded-3xl
p-8
text-white
shadow-xl
"

>


<div className="flex items-center gap-4">


<div

className="
bg-white/20
p-4
rounded-2xl
"

>

<Trophy size={45}/>

</div>



<div>

<p className="text-blue-100">

Sistema de logros

</p>


<h1 className="text-4xl font-black">

Mis logros

</h1>


</div>


</div>





<div

className="
mt-8
bg-white/10
rounded-2xl
p-5
"

>


<div className="flex justify-between">

<span>

Nivel APA

</span>


<strong>

{xp} XP

</strong>


</div>





<div

className="
mt-4
h-3
bg-white/30
rounded-full
overflow-hidden
"

>


<div

className="
h-full
bg-white
rounded-full
"

style={{

width:`${Math.min(xp/10,100)}%`

}}

/>


</div>




<p className="mt-3">

Promedio actual:

<b>
 {promedio}%
</b>

</p>



</div>



</section>









<section

className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-6
"

>


{

logros.map((logro,index)=>(


<div

key={index}

className={`

rounded-3xl
p-6
border

${

logro.desbloqueado

?

"bg-blue-50 border-blue-300"

:

"bg-white dark:bg-slate-900 dark:border-slate-800"

}

`}

>


<div className="flex justify-between">


<div

className="
bg-blue-100
text-blue-700
p-3
rounded-xl
"

>

{logro.icon}

</div>



{

logro.desbloqueado

?

<Award className="text-blue-700"/>

:

<Lock className="text-gray-400"/>

}


</div>





<h2

className="
mt-5
font-black
text-xl
dark:text-white
"

>

{logro.titulo}

</h2>



<p

className="
mt-2
text-gray-500
"

>

{logro.descripcion}

</p>




<p

className="
mt-4
font-bold
text-[#1D3681]
"

>

+{logro.xp} XP

</p>



</div>


))

}



</section>






</div>

);


}