import { X } from "lucide-react";

import ResultCard from "../../student/components/ResultCard";
import CriteriaList from "../../student/components/CriteriaList";
import Recommendations from "../../student/components/Recommendations";


export default function DetailModal({
  analysis,
  onClose
}) {


if(!analysis)
return null;



console.log(
"DATOS QUE LLEGAN AL MODAL:",
analysis
);



return (

<div
className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
z-50
flex
items-center
justify-center
p-6
"
>


<div
className="
bg-white
rounded-3xl
w-full
max-w-5xl
max-h-[90vh]
overflow-y-auto
shadow-2xl
"
>


<div
className="
sticky
top-0
bg-white
border-b
px-8
py-6
flex
justify-between
items-center
z-10
"
>


<div>

<h2
className="
text-2xl
font-bold
text-gray-800
"
>
Detalle del documento
</h2>


<p
className="
text-gray-500
mt-1
"
>
{analysis.nombre}
</p>


</div>



<button

onClick={onClose}

className="
p-3
rounded-xl
hover:bg-gray-100
"

>

<X size={24}/>

</button>


</div>




<div
className="
p-8
space-y-8
"
>


<ResultCard
analysis={analysis}
/>



<CriteriaList

criterios={
analysis.criterios || []
}

/>



<Recommendations

criterios={
analysis.criterios || []
}

/>



</div>


</div>


</div>

);

}
