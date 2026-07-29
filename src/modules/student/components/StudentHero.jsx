import {
  Sparkles,
  FileCheck
} from "lucide-react";


export default function StudentHero(){


return (

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


<div
className="
flex
items-center
gap-5
"
>


<div
className="
bg-white/20
p-4
rounded-2xl
"
>

<Sparkles size={40}/>

</div>



<div>


<h1
className="
text-3xl
md:text-4xl
font-black
"
>

Mejora tus informes académicos

</h1>



<p
className="
mt-3
text-blue-100
text-lg
max-w-2xl
"
>

Analiza tus documentos automáticamente,
recibe observaciones y prepara tus entregas
con mayor confianza.

</p>



<div
className="
mt-5
inline-flex
items-center
gap-2
bg-white/10
px-4
py-2
rounded-full
"
>

<FileCheck size={18}/>

Evaluador institucional inteligente

</div>



</div>


</div>


</section>


);


}