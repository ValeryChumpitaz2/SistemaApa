import {
  Wrench,
  X
} from "lucide-react";


export default function MaintenanceModal({
  open,
  onClose,
  titulo="Sección en mantenimiento",
  mensaje="Estamos trabajando para mejorar esta funcionalidad. Estará disponible próximamente."
}){


if(!open){
  return null;
}



return (

<div
className="
fixed
inset-0
z-[100]
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
p-5
"
>


<div

className="
bg-white
rounded-3xl
shadow-2xl
max-w-md
w-full
p-8
relative
text-center
animate-in
zoom-in
"

>


<button

onClick={onClose}

className="
absolute
right-5
top-5
p-2
rounded-xl
hover:bg-gray-100
"

>

<X size={20}/>

</button>





<div

className="
mx-auto
w-20
h-20
rounded-3xl
bg-blue-100
text-blue-700
flex
items-center
justify-center
mb-6
"

>


<Wrench
size={40}
/>


</div>





<h2

className="
text-2xl
font-black
text-gray-800
"

>

{titulo}

</h2>




<p

className="
text-gray-500
mt-3
leading-relaxed
"

>

{mensaje}

</p>







<div

className="
mt-6
bg-blue-50
text-blue-700
rounded-2xl
p-4
font-semibold
"

>

🚀 VG Smart Review

<br/>

Nueva versión próximamente


</div>





<button

onClick={onClose}

className="
mt-6
bg-blue-900
text-white
px-8
py-3
rounded-xl
font-bold
hover:bg-blue-800
transition
"

>

Entendido


</button>




</div>


</div>


);

}