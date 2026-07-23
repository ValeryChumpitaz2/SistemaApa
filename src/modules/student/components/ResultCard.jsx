import {
  Award,
  TrendingUp
} from "lucide-react";


export default function ResultCard({
  analysis = {}
}){


const puntaje = analysis.puntaje ?? {};


const porcentaje =
puntaje.porcentaje ?? 0;


const obtenido =
puntaje.obtenido ?? 0;


const maximo =
puntaje.maximo ?? 0;




let estado = "Necesita mejorar";

let color = "text-red-300";

let mensaje =
"Revisa los criterios pendientes para mejorar tu resultado.";




if(porcentaje >= 90){

  estado = "Excelente";

  color = "text-green-300";

  mensaje =
  "Tu documento cumple correctamente los criterios evaluados.";

}

else if(porcentaje >= 70){

  estado = "Buen avance";

  color = "text-blue-200";

  mensaje =
  "El documento cumple la mayoría de criterios.";

}




return (

<div className="
bg-gradient-to-r
from-blue-950
via-indigo-900
to-blue-700
rounded-3xl
p-8
text-white
shadow-xl
">



<div className="
flex
items-center
gap-4
">


<div className="
bg-white/10
p-3
rounded-2xl
">

<Award size={35}/>

</div>



<div>


<h2 className="
text-2xl
font-bold
">

Resultado de revisión

</h2>



<p className="
text-blue-200
text-sm
">

{
analysis.resumen?.nombre ??
"Documento académico"
}

</p>


</div>


</div>





<div className="
mt-8
flex
items-end
gap-3
">


<h1 className="
text-7xl
font-bold
">

{porcentaje}%

</h1>


<TrendingUp
size={40}
className="
mb-3
text-blue-200
"
/>


</div>







<div className="
mt-6
h-3
bg-white/20
rounded-full
overflow-hidden
">


<div

className="
h-full
bg-white
rounded-full
transition-all
duration-700
"

style={{
width:`${porcentaje}%`
}}

>

</div>


</div>








<p className="
text-blue-200
mt-5
">


Puntaje obtenido:

{" "}

<span className="
font-bold
text-white
">

{obtenido}

</span>


/

{maximo}

puntos


</p>







<p className={`
mt-5
text-xl
font-bold
${color}
`}>

{estado}

</p>



<p className="
mt-2
text-blue-100
">

{mensaje}

</p>






</div>

);


}
