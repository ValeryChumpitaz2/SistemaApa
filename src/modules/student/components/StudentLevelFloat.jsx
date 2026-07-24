import {
  useState
} from "react";

import {
  Trophy,
  X,
  Star
} from "lucide-react";


export default function StudentLevelFloat({

documentos=[]

}){


const [open,setOpen]=useState(false);



/*
 SISTEMA DE PUNTOS

 Perfil completo = 10
 Documento enviado = 20 cada uno
 Documento revisado = 30
 */

const puntosPerfil = 10;


const puntosDocumentos =
documentos.length * 50;



const puntos =
puntosPerfil + puntosDocumentos;



let nivel="Aprendiz";

let meta=100;


if(puntos>=100){

nivel="Estudiante destacado";
meta=200;

}


if(puntos>=200){

nivel="Excelente académico";
meta=300;

}




const progreso =
Math.min(
(puntos/meta)*100,
100
);




return (

<>


{
open && (

<div className="
fixed
bottom-24
right-6
w-80
bg-white
dark:bg-slate-900
rounded-3xl
shadow-2xl
border
dark:border-slate-700
p-6
z-50
">


<div className="
flex
justify-between
items-center
">


<div className="
flex
gap-3
items-center
">


<div className="
bg-blue-100
text-[#1D3681]
p-3
rounded-xl
">


<Trophy/>


</div>



<div>


<h3 className="
font-bold
text-gray-800
dark:text-white
">

Progreso académico

</h3>


<p className="
text-sm
text-gray-500
">

{nivel}

</p>


</div>


</div>




<button

onClick={()=>setOpen(false)}

>

<X/>

</button>



</div>







<div className="
mt-6
text-center
">


<p className="
text-4xl
font-black
text-[#1D3681]
">

{puntos}

</p>


<p className="
text-gray-500
">

puntos acumulados

</p>


</div>







<div className="
mt-5
">


<div className="
flex
justify-between
text-sm
mb-2
">


<span>

Siguiente nivel

</span>


<span className="
font-bold
">

{meta} pts

</span>


</div>




<div className="
h-3
bg-gray-200
rounded-full
overflow-hidden
">


<div

className="
h-full
bg-gradient-to-r
from-[#1D3681]
to-blue-500
rounded-full
"

style={{

width:`${progreso}%`

}}


/>


</div>



</div>







<div className="
mt-6
space-y-2
">


<div className="
bg-blue-50
rounded-xl
p-3
flex
items-center
gap-3
">


<Star

size={20}

className="text-yellow-500"

/>


<span className="
text-sm
">

+50 puntos por cada evaluación

</span>


</div>



<div className="
bg-blue-50
rounded-xl
p-3
text-sm
">


📄 Documentos enviados:

<b>{documentos.length}</b>


</div>



</div>




</div>


)

}





<button

onClick={()=>setOpen(!open)}

className="
fixed
bottom-6
right-6
bg-[#1D3681]
text-white
p-4
rounded-full
shadow-xl
hover:scale-110
transition
z-50
"


>


<Trophy size={28}/>


</button>



</>


);


}