import {
  UserCircle,
  ArrowLeft,
  Moon,
  Sun
} from "lucide-react";


import {
  useNavigate
} from "react-router-dom";


import {
  useTheme
} from "../../../context/ThemeContext.jsx";


import NotificationsDropdown from "./NotificationsDropdown";




export default function DashboardHeader({

notificaciones=[]

}){


const navigate = useNavigate();



const {
 dark,
 setDark
}=useTheme();





return (

<header

className="
bg-gradient-to-r
from-blue-950
to-blue-800
text-white
shadow-lg
"

>


<div

className="
max-w-6xl
mx-auto
px-8
py-5
flex
justify-between
items-center
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
bg-white/20
p-3
rounded-xl
"

>

<UserCircle size={35}/>

</div>




<div>

<h1

className="
text-3xl
font-black
"

>

VG Smart Review

</h1>



<p className="
text-blue-200
">

Panel del estudiante

</p>


</div>


</div>







<div

className="
flex
items-center
gap-4
"

>



<button

onClick={()=>setDark(!dark)}

className="
bg-white/20
hover:bg-white/30
px-4
py-3
rounded-xl
flex
items-center
gap-2
transition
"

>


{

dark

?

<>

<Sun size={22}/>

<span>
Claro
</span>

</>


:

<>

<Moon size={22}/>

<span>
Oscuro
</span>

</>


}


</button>







<NotificationsDropdown

notificaciones={notificaciones}

/>








<button

onClick={()=>navigate("/")}

className="
bg-white
text-blue-900
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
hover:bg-blue-100
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