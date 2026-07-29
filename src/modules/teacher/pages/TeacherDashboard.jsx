import { useState } from "react";

import {
  FileSearch,
  BarChart3,
  ClipboardList
} from "lucide-react";


import TeacherHeader from "../components/TeacherHeader";
import FolderAnalyzer from "../components/FolderAnalyzer";
import TeacherStats from "../components/TeacherStats";
import ResultsTable from "../components/ResultsTable";
import DetailModal from "../components/DetailModal";



export default function TeacherDashboard(){



const [resultados,setResultados]=useState([]);

const [selected,setSelected]=useState(null);




return (


<div className="min-h-screen bg-slate-100">



<TeacherHeader/>




<main className="max-w-7xl mx-auto p-6 md:p-10">





{/* CABECERA */}



<div className="

bg-gradient-to-r

from-blue-700

to-indigo-800

rounded-3xl

p-8

text-white

shadow-xl

mb-10

">


<div className="flex items-center gap-4">


<div className="

bg-white/20

p-4

rounded-2xl

">


<BarChart3 size={40}/>


</div>



<div>


<h1 className="text-3xl font-black">

Panel del docente 👨‍🏫

</h1>



<p className="

text-blue-100

mt-2

">

Gestiona evaluaciones y analiza entregas automáticamente.

</p>


</div>



</div>



</div>






{/* ESTADISTICAS */}



<section>


<div className="flex items-center gap-3 mb-4">


<div className="

bg-blue-100

text-blue-700

p-2

rounded-xl

">


<BarChart3 size={22}/>


</div>



<h2 className="text-xl font-bold text-gray-800">

Resumen académico

</h2>


</div>



<TeacherStats

resultados={resultados}

/>



</section>








{/* ANALIZADOR */}



<section className="mt-10">



<div className="flex items-center gap-3 mb-4">


<div className="

bg-indigo-100

text-indigo-700

p-2

rounded-xl

">


<FileSearch size={22}/>


</div>



<h2 className="text-xl font-bold text-gray-800">

Analizar entregas

</h2>



</div>





<div className="

bg-white

rounded-3xl

shadow-sm

border

p-6

">


<FolderAnalyzer

setResultados={setResultados}

/>


</div>



</section>









{/* RESULTADOS */}



<section className="mt-10">



<div className="flex items-center gap-3 mb-5">


<div className="

bg-green-100

text-green-700

p-2

rounded-xl

">


<ClipboardList size={22}/>


</div>


<h2 className="text-xl font-bold text-gray-800">

Resultados

</h2>


</div>





{

resultados.length > 0 ?


(



<div className="

bg-white

rounded-3xl

shadow-sm

border

p-6

animate-in

fade-in

">


<div className="

flex

justify-between

items-center

mb-6

">


<h3 className="text-2xl font-bold">


Evaluaciones realizadas


</h3>




<span className="

bg-blue-100

text-blue-700

px-4

py-2

rounded-full

font-bold

">


{resultados.length}

documentos


</span>



</div>





<ResultsTable


resultados={resultados}


onSelect={

item=>setSelected(item)

}


/>



</div>



)


:



(



<div className="

bg-white

rounded-3xl

border

border-dashed

p-10

text-center

text-gray-400

">


<FileSearch

size={45}

className="mx-auto mb-4 opacity-40"

/>



<p className="font-medium">

Aún no hay documentos analizados

</p>


<p className="text-sm mt-2">

Sube una carpeta para comenzar la evaluación automática.

</p>



</div>



)



}



</section>







</main>







{

selected && (


<DetailModal


analysis={selected}


onClose={()=>setSelected(null)}


/>


)


}



</div>


);


}