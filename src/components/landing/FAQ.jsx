import { useState } from "react";
import { ChevronDown } from "lucide-react";


const preguntas=[


{
q:"¿Qué es VG Smart Review?",
a:"Es una plataforma que analiza documentos académicos y genera resultados según criterios definidos."
},


{
q:"¿Quién puede utilizar la plataforma?",
a:"Estudiantes para revisar sus trabajos y docentes para analizar múltiples entregas."
},


{
q:"¿El docente debe revisar documento por documento?",
a:"No. Puede cargar una carpeta de Drive y obtener resultados de varios estudiantes."
},


{
q:"¿Qué criterios evalúa?",
a:"Formato, estructura, conclusiones, referencias bibliográficas y glosario."
}


];



export default function FAQ(){


const [open,setOpen]=useState(null);



return (

<section className="
py-20
px-6
bg-gray-50
">


<div className="
max-w-4xl
mx-auto
">


<h2 className="
text-4xl
font-bold
text-center
mb-12
">

Preguntas frecuentes

</h2>




<div className="space-y-4">


{

preguntas.map((item,index)=>(


<div

key={index}

className="
bg-white
rounded-2xl
shadow-sm
border
overflow-hidden
"


>


<button

onClick={()=>setOpen(
open===index ? null : index
)}

className="
w-full
p-6
flex
justify-between
items-center
text-left
font-bold
"


>


{item.q}


<ChevronDown

className={`
transition
${open===index ? "rotate-180":""}
`}

/>


</button>





{

open===index && (

<p className="
px-6
pb-6
text-gray-600
">

{item.a}

</p>

)


}



</div>


))


}


</div>


</div>


</section>


);


}