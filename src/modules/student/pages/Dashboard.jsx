import DashboardHeader from "../components/DashboardHeader";
import StudentStats from "../components/StudentStats";
import SubmitDocument from "../components/SubmitDocument";
import HistoryTable from "../components/HistoryTable";


export default function Dashboard(){


return (

<div className="min-h-screen bg-gray-100">


<DashboardHeader />


<main className="
max-w-6xl
mx-auto
p-8
">


<h2 className="
text-3xl
font-bold
mb-2
">

Bienvenido 👋

</h2>


<p className="
text-gray-500
mb-8
">

Revisa tus documentos académicos.

</p>



<StudentStats />



<div className="mt-10">

<SubmitDocument />

</div>




<section className="mt-10">


<h2 className="
text-2xl
font-bold
mb-5
">

Historial

</h2>



<HistoryTable />


</section>



</main>


</div>

);


}