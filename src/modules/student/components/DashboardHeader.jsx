import {
  ArrowLeft,
  UserCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function DashboardHeader(){


const navigate = useNavigate();



return (

<header className="
bg-gradient-to-r
from-blue-950
to-blue-800
text-white
shadow-lg
">


<div className="
max-w-6xl
mx-auto
px-8
py-6
flex
justify-between
items-center
">


{/* INFORMACIÓN DEL SISTEMA */}

<div>


<div className="
flex
items-center
gap-3
">


<div className="
bg-white/20
p-3
rounded-xl
">


<UserCircle size={32}/>


</div>



<div>


<h1 className="
text-3xl
font-bold
">

VG Smart Review

</h1>


<p className="
text-blue-200
">

Panel del estudiante

</p>


</div>


</div>


</div>





{/* BOTÓN INICIO */}


<button

onClick={()=>navigate("/")}

className="
bg-white
text-blue-950
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
hover:bg-blue-100
transition
"


>


<ArrowLeft size={18}/>


Inicio


</button>



</div>


</header>


);


}