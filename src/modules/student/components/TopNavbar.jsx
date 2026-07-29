import {
  Bell,
  Moon,
  Sun
} from "lucide-react";


import {
  useEffect,
  useState
} from "react";




export default function TopNavbar(){



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


<nav

className="
h-16
bg-white
dark:bg-slate-900
border-b
dark:border-slate-800
flex
items-center
justify-between
px-6
sticky
top-0
z-50
"

>






{/* LOGO */}


<div

className="
flex
items-center
gap-3
"

>


<div

className="
bg-[#1D3681]
text-white
w-10
h-10
rounded-xl
flex
items-center
justify-center
font-black
"

>

A

</div>





<div>


<h1

className="
font-black
text-gray-800
dark:text-white
"

>

APA Reviewer

</h1>



<p

className="
text-xs
text-gray-500
"

>

Sistema académico

</p>



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

<Sun/>

:

<Moon/>

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


<Bell/>


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






</div>





</nav>


);


}