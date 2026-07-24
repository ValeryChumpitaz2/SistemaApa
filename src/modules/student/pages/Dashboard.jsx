import {
  useState
} from "react";


import {
  FileText,
  UploadCloud,
  History,
  Sparkles
} from "lucide-react";


import DashboardHeader from "../components/DashboardHeader";
import StudentStats from "../components/StudentStats";
import SubmitDocument from "../components/SubmitDocument";
import HistoryTable from "../components/HistoryTable";
import StudentProfile from "../components/StudentProfile";
import StudentLevelFloat from "../components/StudentLevelFloat";



export default function Dashboard(){


const [
 documentos,
 setDocumentos
]=useState([]);



const [
 notificaciones
]=useState([

{
tipo:"pendiente",
titulo:"Bienvenido",
mensaje:
"Sube tu primer documento para iniciar una evaluación.",
fecha:"Hoy"
}

]);





return (

<div className="

min-h-screen

bg-slate-100

dark:bg-slate-950

transition-colors

">





<DashboardHeader

notificaciones={notificaciones}

/>







<main className="

max-w-7xl

mx-auto

p-6

md:p-10

">







{/* PERFIL */}

<section className="mb-10">

<StudentProfile/>

</section>









{/* BANNER */}

<section className="

bg-gradient-to-r

from-[#1D3681]

to-blue-700

rounded-3xl

p-8

text-white

shadow-xl

mb-10

">


<div className="

flex

items-center

gap-5

">


<div className="

bg-white/20

p-4

rounded-2xl

">


<Sparkles size={40}/>


</div>




<div>


<h1 className="

text-4xl

font-black

">

Tu espacio académico inteligente

</h1>



<p className="

mt-3

text-blue-100

text-lg

">

Analiza tus documentos y recibe retroalimentación para mejorar tus entregas.

</p>



</div>



</div>


</section>










{/* ESTADISTICAS */}


<section>


<div className="

flex

items-center

gap-3

mb-5

">


<div className="

bg-blue-100

text-[#1D3681]

p-3

rounded-xl

">


<FileText size={24}/>


</div>



<h2 className="

text-xl

font-bold

text-gray-800

dark:text-white

">

Resumen académico

</h2>


</div>



<StudentStats

documentos={documentos}

/>


</section>









{/* SUBIR DOCUMENTO */}



<section className="mt-10">


<div className="

flex

items-center

gap-3

mb-5

">


<div className="

bg-blue-100

text-[#1D3681]

p-3

rounded-xl

">


<UploadCloud size={24}/>


</div>



<h2 className="

text-xl

font-bold

text-gray-800

dark:text-white

">

Nueva evaluación

</h2>


</div>





<div className="

bg-white

dark:bg-slate-900

rounded-3xl

border

dark:border-slate-800

shadow-sm

p-8

">


<SubmitDocument

setDocumentos={setDocumentos}

/>


</div>



</section>









{/* HISTORIAL */}



<section className="mt-10">


<div className="

flex

items-center

gap-3

mb-5

">


<div className="

bg-blue-100

text-[#1D3681]

p-3

rounded-xl

">


<History size={24}/>


</div>



<h2 className="

text-xl

font-bold

text-gray-800

dark:text-white

">

Mis evaluaciones

</h2>


</div>







<div className="

bg-white

dark:bg-slate-900

rounded-3xl

border

dark:border-slate-800

shadow-sm

p-8

">





<div className="

flex

justify-between

items-center

mb-6

">


<h3 className="

text-2xl

font-bold

text-gray-800

dark:text-white

">

Documentos enviados

</h3>



<span className="

bg-blue-100

text-[#1D3681]

px-4

py-2

rounded-full

font-bold

">

{documentos.length}

</span>



</div>







{
documentos.length > 0 ?


<HistoryTable

documentos={documentos}

/>


:


<div className="

text-center

py-12

text-gray-400

">


<FileText

size={55}

className="mx-auto mb-4 opacity-40"

/>


<p className="font-semibold">

Aún no tienes evaluaciones.

</p>


<p className="text-sm mt-2">

Cuando envíes un documento aparecerá aquí.

</p>


</div>

}



</div>



</section>







</main>






{/* GAMIFICACION FLOTANTE */}

<StudentLevelFloat

documentos={documentos}

/>





</div>

);

}