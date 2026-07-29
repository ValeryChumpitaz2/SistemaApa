import {
  BarChart3,
  Award,
  CheckCircle,
  FileCheck
} from "lucide-react";


import ResultCard from "../components/ResultCard";
import CriteriaList from "../components/CriteriaList";
import Recommendations from "../components/Recommendations";



export default function Results({
  documentos=[]
}) {



const ultimoResultado =
documentos.length
?
documentos[documentos.length - 1]
:
null;





return (

<div

className="
space-y-8
"

>


{/* TITULO */}

<section>


<div
className="
flex
items-center
gap-3
"

>

<div

className="
bg-blue-100
text-blue-700
p-3
rounded-xl
"

>

<BarChart3/>

</div>


<div>

<h1

className="
text-3xl
font-black
text-gray-800
dark:text-white
"

>

Resultados del análisis

</h1>


<p

className="
text-gray-500
"

>

Consulta el resultado de tus evaluaciones.

</p>


</div>


</div>


</section>









{
ultimoResultado

?

<>


{/* RESULTADO */}

<ResultCard

analysis={ultimoResultado}

/>





{/* CRITERIOS */}

<section

className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-6
shadow
"

>


<div

className="
flex
items-center
gap-3
mb-5
"

>

<FileCheck

className="
text-blue-600
"

/>


<h2

className="
text-xl
font-black
text-gray-800
dark:text-white
"

>

Criterios evaluados

</h2>


</div>




<CriteriaList

criterios={
ultimoResultado.criterios
}

/>



</section>








<Recommendations

criterios={
ultimoResultado.criterios
}

/>



</>


:



<div

className="
bg-white
dark:bg-slate-900
rounded-3xl
p-10
text-center
shadow
"

>


<Award

size={60}

className="
mx-auto
text-blue-600
mb-5
"

/>



<h2

className="
text-2xl
font-black
text-gray-800
dark:text-white
"

>

Aún no tienes resultados

</h2>


<p

className="
text-gray-500
mt-2
"

>

Realiza una evaluación para ver el análisis.

</p>



</div>


}




</div>

);

}