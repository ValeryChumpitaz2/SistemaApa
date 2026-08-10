import {
  Bell,
  Moon,
  Sun,
  GraduationCap,
  Sparkles,
  ArrowLeft
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../../auth/AuthContext";


export default function TeacherHeader(){


const navigate = useNavigate();


const {
 user
}=useAuth();



const [
 dark,
 setDark
]=useState(
 localStorage.getItem("theme")==="dark"
);





useEffect(()=>{


if(dark){

document.documentElement.classList.add("dark");

localStorage.setItem(
"theme",
"dark"
);


}else{

document.documentElement.classList.remove("dark");

localStorage.setItem(
"theme",
"light"
);

}


},[dark]);







return (


<header

className="
h-20
bg-white
dark:bg-slate-900
border-b
dark:border-slate-800
shadow-sm
sticky
top-0
z-50
"

>


<div

className="
h-full
px-8
flex
items-center
justify-between
"

>






{/* MARCA */}



<div

className="
flex
items-center
gap-4
"

>


<div

className="
relative
bg-[#1D3681]
text-white
w-12
h-12
rounded-2xl
flex
items-center
justify-center
shadow
"

>


<GraduationCap
size={28}
/>



<div

className="
absolute
-top-1
-right-1
bg-cyan-400
text-blue-950
rounded-full
p-1
"

>

<Sparkles
size={11}
/>


</div>


</div>






<div>


<h1

className="
font-black
text-xl
text-gray-800
dark:text-white
"

>

VG Smart Review

</h1>



<div

className="
flex
items-center
gap-2
"

>


<span

className="
text-sm
text-gray-500
dark:text-gray-400
"

>

Panel Docente

</span>



<span

className="
bg-blue-100
text-blue-700
dark:bg-blue-900
dark:text-blue-200
px-3
py-1
rounded-full
text-xs
font-bold
"

>

Evaluación APA

</span>


</div>



</div>



</div>








{/* ACCIONES */}



<div

className="
flex
items-center
gap-3
"

>







{/* USUARIO */}


<div

className="
hidden
md:flex
items-center
gap-3
mr-3
"

>


<div

className="
bg-blue-100
text-blue-700
w-10
h-10
rounded-full
flex
items-center
justify-center
font-bold
"

>

{
user?.usuario?.charAt(0) || "D"
}


</div>



<div>


<p

className="
font-bold
text-sm
text-gray-800
dark:text-white
"

>

{
user?.usuario || "Docente"
}


</p>


<p

className="
text-xs
text-gray-500
"

>

Profesor

</p>


</div>


</div>








{/* DARK MODE */}



<button

onClick={()=>setDark(!dark)}

className="
p-3
rounded-xl
hover:bg-gray-100
dark:hover:bg-slate-800
transition
"

>

{

dark

?

<Sun size={20}/>

:

<Moon size={20}/>

}


</button>










{/* NOTIFICACIONES */}



<button

className="
relative
p-3
rounded-xl
hover:bg-gray-100
dark:hover:bg-slate-800
transition
"

>


<Bell size={20}/>



<span

className="
absolute
top-1
right-1
bg-red-500
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
font-bold
"

>

2

</span>


</button>







{/* VOLVER */}



<button

onClick={()=>navigate("/")}

className="
hidden
lg:flex
items-center
gap-2
bg-[#1D3681]
text-white
px-5
py-3
rounded-xl
font-bold
hover:bg-blue-900
transition
"

>


<ArrowLeft size={18}/>


Inicio


</button>






</div>






</div>


</header>


);


}