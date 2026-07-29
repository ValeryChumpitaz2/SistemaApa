import {
  Home,
  FileSearch,
  BarChart3,
  History,
  Settings,
  LogOut,
  UserCircle,
  FileBarChart
} from "lucide-react";

import {
  useAuth
} from "../../../auth/AuthContext";



import {
 Trophy
} from "lucide-react";

export default function StudentSidebar({

pagina,

setPagina


}){


const {
 user,
 logout
}=useAuth();





const opciones=[


{
id:"dashboard",
nombre:"Inicio",
icon:<Home size={20}/>
},


{
id:"evaluation",
nombre:"Evaluación",
icon:<FileSearch size={20}/>
},


{
id:"results",
nombre:"Resultados",
icon:<BarChart3 size={20}/>
},


{
id:"history",
nombre:"Historial",
icon:<History size={20}/>
},


{
id:"achievements",
nombre:"Logros",
icon:<Trophy size={20}/>
},
{
id:"reports",
nombre:"Reportes",
icon:<FileBarChart size={20}/>
},


{
id:"settings",
nombre:"Configuración",
icon:<Settings size={20}/>
}



];







return (

<aside

className="
fixed
left-0
top-0
h-screen
w-72
bg-white
dark:bg-slate-900
border-r
dark:border-slate-800
shadow-lg
z-40
hidden
xl:flex
flex-col
"

>



{/* PERFIL */}


<div

className="
p-6
border-b
dark:border-slate-800
"

>


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
rounded-full
w-14
h-14
flex
items-center
justify-center
overflow-hidden
"

>


{
user?.foto ?


<img

src={user.foto}

alt="Perfil"

className="
w-full
h-full
object-cover
"

/>


:


<UserCircle size={40}/>


}



</div>






<div>


<h2

className="
font-black
text-gray-800
dark:text-white
"

>

{
user?.usuario ||
"Estudiante"
}

</h2>



<p

className="
text-sm
text-gray-500
"

>

Estudiante

</p>



</div>


</div>


</div>








{/* MENU */}


<nav

className="
flex-1
p-5
space-y-2
"

>


{

opciones.map(item=>(


<button

key={item.id}

onClick={()=>setPagina(item.id)}


className={`

w-full

flex

items-center

gap-3

px-4

py-3

rounded-xl

font-bold

transition


${

pagina===item.id

?

"bg-[#1D3681] text-white"

:

"text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800"

}

`}

>


{item.icon}


{item.nombre}


</button>


))


}


</nav>









{/* LOGOUT */}


<div

className="
p-5
border-t
dark:border-slate-800
"

>


<button

onClick={logout}

className="
w-full
flex
items-center
justify-center
gap-2
bg-red-500
hover:bg-red-600
text-white
py-3
rounded-xl
font-bold
"

>


<LogOut size={20}/>


Cerrar sesión


</button>


</div>





</aside>

);


}