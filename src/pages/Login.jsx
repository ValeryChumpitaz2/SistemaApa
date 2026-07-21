import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import {
  GraduationCap,
  Presentation,
  ArrowRight,
  ShieldCheck
} from "lucide-react";


export default function Login(){


const navigate = useNavigate();

const {login}=useAuth();



function entrar(rol){

login(rol);


if(rol==="student"){

navigate("/student/dashboard");

}else{

navigate("/teacher/dashboard");

}

}




return (

<div className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-blue-950
to-indigo-900
flex
items-center
justify-center
p-6
">


<div className="
w-full
max-w-5xl
grid
md:grid-cols-2
bg-white
rounded-[2rem]
overflow-hidden
shadow-2xl
">


{/* lado izquierdo */}

<div className="
hidden
md:flex
bg-gradient-to-br
from-blue-900
to-indigo-700
text-white
p-12
flex-col
justify-between
">


<div>


<div className="
bg-white/20
w-fit
p-4
rounded-2xl
mb-6
">

<ShieldCheck
size={45}
/>

</div>



<h1 className="
text-5xl
font-bold
leading-tight
">

VG Smart
Review

</h1>



<p className="
mt-6
text-blue-100
text-lg
">

Sistema inteligente para la revisión
y evaluación automática de documentos
académicos.

</p>


</div>



<p className="
text-blue-200
">

Análisis • Seguimiento • Evaluación

</p>


</div>






{/* lado derecho */}


<div className="
p-10
md:p-14
">


<h2 className="
text-3xl
font-bold
text-gray-800
">

Bienvenido

</h2>


<p className="
text-gray-500
mt-2
mb-10
">

Selecciona cómo deseas ingresar

</p>





<div className="space-y-6">



<button

onClick={()=>entrar("student")}

className="
group
w-full
border-2
border-blue-100
hover:border-blue-900
rounded-3xl
p-6
flex
items-center
gap-5
transition
hover:shadow-xl
"


>


<div className="
bg-blue-100
text-blue-900
p-5
rounded-2xl
group-hover:bg-blue-900
group-hover:text-white
transition
">

<GraduationCap
size={40}
/>


</div>



<div className="flex-1 text-left">


<h3 className="
text-xl
font-bold
text-gray-800
">

Estudiante

</h3>


<p className="
text-gray-500
text-sm
">

Sube documentos y recibe evaluación automática.

</p>


</div>



<ArrowRight
className="
text-gray-400
group-hover:text-blue-900
"
/>


</button>







<button

onClick={()=>entrar("teacher")}

className="
group
w-full
border-2
border-green-100
hover:border-green-700
rounded-3xl
p-6
flex
items-center
gap-5
transition
hover:shadow-xl
"


>


<div className="
bg-green-100
text-green-700
p-5
rounded-2xl
group-hover:bg-green-700
group-hover:text-white
transition
">


<Presentation
size={40}
/>


</div>




<div className="flex-1 text-left">


<h3 className="
text-xl
font-bold
text-gray-800
">

Docente

</h3>


<p className="
text-gray-500
text-sm
">

Analiza carpetas y supervisa entregas.

</p>


</div>




<ArrowRight
className="
text-gray-400
group-hover:text-green-700
"
/>


</button>




</div>




<p className="
text-center
text-gray-400
text-sm
mt-10
">

© 2026 VG Smart Review

</p>



</div>



</div>



</div>


);


}