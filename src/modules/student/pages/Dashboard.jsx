import {
  useState
} from "react";


import DashboardHeader from "../components/DashboardHeader";
import StudentStats from "../components/StudentStats";
import SubmitDocument from "../components/SubmitDocument";
import HistoryTable from "../components/HistoryTable";



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
  "Sube tu primer documento para iniciar la evaluación.",
  fecha:"Hoy"
}

]);



return (


<div

className="
min-h-screen
bg-gray-100
dark:bg-gray-950
"

>


<DashboardHeader

notificaciones={notificaciones}

/>



<main

className="
max-w-6xl
mx-auto
p-8
"

>



<h1

className="
text-4xl
font-black
text-gray-800
dark:text-white
"

>

Hola 👋

</h1>



<p

className="
text-gray-500
mt-2
"

>

Gestiona tus documentos académicos.

</p>





{/* ESTADISTICAS */}

<section className="mt-8">

<StudentStats

documentos={documentos}

/>

</section>







{/* ANALIZAR DOCUMENTO */}

<section

className="
mt-10
"

>


<SubmitDocument

setDocumentos={setDocumentos}

/>


</section>







{/* HISTORIAL */}


<section

className="
mt-10
bg-white
rounded-3xl
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

Historial

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

{documentos.length}

</span>



</div>




<HistoryTable

documentos={documentos}

/>



</section>






</main>



</div>


);


}
