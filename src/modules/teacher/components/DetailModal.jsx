import { X } from "lucide-react";


import ResultCard from "../../student/components/ResultCard.jsx";
import CriteriaList from "../../student/components/CriteriaList.jsx";
import Recommendations from "../../student/components/Recommendations.jsx";



export default function DetailModal({
    analysis,
    onClose
}){


if(!analysis){
    return null;
}



return (

<div
className="
fixed
inset-0
bg-black/50
z-50
flex
items-center
justify-center
p-5
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
p-6
flex
justify-between
items-center
"
>


<div>

<h2
className="
text-2xl
font-black
text-gray-800
"
>

Detalle de evaluación

</h2>



<p
className="
text-gray-500
mt-1
"
>

{
analysis.nombre ||
analysis.resumen?.nombre ||
"Documento académico"
}

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

<X/>

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
analysis.criterios ?? []
}

/>





<Recommendations

criterios={
analysis.criterios ?? []
}

/>



</div>


</div>


</div>


);


}