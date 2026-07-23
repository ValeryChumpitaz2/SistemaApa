import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock
} from "lucide-react";

import {
  useState
} from "react";


export default function NotificationsDropdown({

notificaciones=[]

}){


const [
 abierto,
 setAbierto
]=useState(false);



return (

<div
className="
relative
"
>


<button

onClick={()=>setAbierto(!abierto)}

className="
relative
bg-white/20
hover:bg-white/30
p-3
rounded-xl
transition
"

>

<Bell size={24}/>


{
notificaciones.length>0 &&

<span

className="
absolute
-top-1
-right-1
bg-red-500
text-white
text-xs
font-bold
w-5
h-5
rounded-full
flex
items-center
justify-center
"

>

{notificaciones.length}

</span>

}


</button>





{
abierto &&


<div

className="
absolute
right-0
mt-3
w-80
bg-white
rounded-2xl
shadow-2xl
border
overflow-hidden
z-50
"

>


<div

className="
p-4
border-b
font-bold
text-gray-800
"

>

🔔 Notificaciones

</div>



<div

className="
max-h-96
overflow-y-auto
"

>


{
notificaciones.length===0

?

<p
className="
p-5
text-gray-500
text-sm
"
>
No tienes notificaciones
</p>


:


notificaciones.map((item,index)=>(


<div

key={index}

className="
p-4
border-b
hover:bg-gray-50
"

>


<div
className="
flex
gap-3
"

>


{
item.tipo==="aprobado"

?

<CheckCircle2
className="text-green-600"
/>


:

item.tipo==="alerta"

?

<AlertTriangle
className="text-red-600"
/>


:

<Clock
className="text-yellow-600"
/>

}



<div>


<h4

className="
font-bold
text-gray-800
"

>

{item.titulo}

</h4>


<p

className="
text-sm
text-gray-500
"

>

{item.mensaje}

</p>


<span

className="
text-xs
text-gray-400
"

>

{item.fecha}

</span>


</div>



</div>


</div>


))


}


</div>


</div>


}



</div>


)

}