import { useState } from "react";

import TeacherHeader from "../components/TeacherHeader";
import FolderAnalyzer from "../components/FolderAnalyzer";
import TeacherStats from "../components/TeacherStats";
import ResultsTable from "../components/ResultsTable";
import DetailModal from "../components/DetailModal";


export default function TeacherDashboard() {


const [resultados, setResultados] = useState([]);


const [selected, setSelected] = useState(null);



return (


<div className="
min-h-screen
bg-gray-100
">



<TeacherHeader />



<main

className="
max-w-7xl
mx-auto
p-8
"

>



<h1

className="
text-3xl
font-bold
text-gray-800
"

>

Panel del docente 👨‍🏫

</h1>



<p

className="
text-gray-500
mt-2
"

>

Analiza automáticamente las entregas de tus estudiantes.

</p>





{/* ESTADISTICAS */}


<div className="mt-8">


<TeacherStats

resultados={resultados}

/>


</div>







{/* ANALIZADOR DE CARPETA */}


<div className="mt-10">


<FolderAnalyzer

setResultados={setResultados}

/>


</div>







{/* TABLA RESULTADOS */}



{

resultados.length > 0 && (


<section

className="
mt-10
"

>


<div

className="
bg-white
rounded-3xl
shadow
border
p-8
"

>



<div

className="
flex
justify-between
items-center
mb-6
"

>



<h2

className="
text-2xl
font-bold
"

>

Resultados de evaluación

</h2>




<span

className="
bg-blue-100
text-blue-900
px-4
py-2
rounded-full
font-bold
"

>

{resultados.length} documentos

</span>




</div>







<ResultsTable


resultados={resultados}


onSelect={

(item)=>

setSelected(item)

}


/>




</div>


</section>


)


}








{/* MODAL DETALLE */}



{

selected && (


<DetailModal


analysis={selected}


onClose={

()=>setSelected(null)

}


/>


)


}




</main>


</div>


);


}
