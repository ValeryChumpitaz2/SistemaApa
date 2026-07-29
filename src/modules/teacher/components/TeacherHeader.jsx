import {
  ArrowLeft,
  GraduationCap,
  Sparkles
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";



export default function TeacherHeader(){


const navigate = useNavigate();



return (

<header
className="
bg-gradient-to-r
from-blue-950
via-indigo-900
to-blue-700
text-white
shadow-lg
"
>


<div
className="
max-w-7xl
mx-auto
px-6
lg:px-8
py-5
flex
flex-col
md:flex-row
justify-between
items-center
gap-5
"
>



{/* Marca */}


<div
className="
flex
items-center
gap-4
"
>


<div
className="
relative
bg-white/10
backdrop-blur
p-4
rounded-2xl
"
>


<GraduationCap
size={38}
/>



<div
className="
absolute
-top-1
-right-1
bg-cyan-400
text-blue-950
rounded-full
p-1
"
>

<Sparkles
size={12}
/>

</div>



</div>




<div>


<h1
className="
text-2xl
md:text-3xl
font-bold
"
>

VG Smart Review

</h1>



<div
className="
flex
items-center
gap-2
mt-1
"
>


<span
className="
text-blue-200
text-sm
"
>

Panel del docente

</span>



<span
className="
bg-white/10
px-3
py-1
rounded-full
text-xs
"
>

Evaluación APA

</span>


</div>



</div>


</div>







{/* Botón regresar */}


<button

onClick={()=>navigate("/")}


className="
group
bg-white
text-blue-950
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
shadow
hover:bg-blue-50
transition
"


>


<ArrowLeft

size={18}

className="
group-hover:-translate-x-1
transition
"

/>


Inicio


</button>



</div>


</header>


);


}