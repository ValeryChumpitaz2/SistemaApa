import {
 Award,
 CheckCircle,
 AlertTriangle,
 TrendingUp
} from "lucide-react";



export default function ResultCard({
 analysis={}
}){


const porcentaje =
analysis.puntaje?.porcentaje || 0;


const obtenido =
analysis.puntaje?.obtenido || 0;


const maximo =
analysis.puntaje?.maximo || 0;



let estado =
"Necesita revisión";


let descripcion =
"El documento requiere algunas mejoras antes de la entrega.";



if(porcentaje>=95){

estado="Listo para entrega";

descripcion=
"El documento cumple los criterios recomendados.";

}

else if(porcentaje>=70){

estado="Buen avance";

descripcion=
"El documento cumple la mayoría de criterios.";

}





return (

<div className="
bg-gradient-to-br
from-[#1D3681]
to-blue-600
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
bg-white/20
p-4
rounded-2xl
">

<Award size={35}/>

</div>



<div>


<h2 className="
text-2xl
font-black
">

Estado del documento

</h2>


<p className="
text-blue-100
text-sm
">

{analysis.resumen?.nombre}

</p>


</div>


</div>







<div className="
mt-8
flex
items-end
gap-4
">


<h1 className="
text-7xl
font-black
">

{porcentaje}%

</h1>



<div className="
mb-4
">

{
porcentaje>=95

?

<CheckCircle size={40}/>

:

<TrendingUp size={40}/>

}

</div>


</div>







<div className="
h-3
bg-white/20
rounded-full
overflow-hidden
mt-5
">


<div

className="
bg-white
h-full
rounded-full
transition-all
"

style={{
width:`${porcentaje}%`
}}

/>


</div>






<div className="
grid
md:grid-cols-3
gap-4
mt-8
">


<div className="
bg-white/10
rounded-2xl
p-4
">

<p className="
text-blue-100
text-sm
">

Puntaje

</p>


<strong className="
text-2xl
">

{obtenido}/{maximo}

</strong>


</div>






<div className="
bg-white/10
rounded-2xl
p-4
">


<p className="
text-blue-100
text-sm
">

Estado

</p>


<strong>

{estado}

</strong>


</div>







<div className="
bg-white/10
rounded-2xl
p-4
">


<p className="
text-blue-100
text-sm
">

Meta

</p>


<strong>

95%

</strong>


</div>



</div>






<div className="
mt-6
bg-white/10
rounded-2xl
p-5
flex
gap-3
items-center
">


{
porcentaje>=95

?

<CheckCircle/>

:

<AlertTriangle/>

}



<p>

{descripcion}

</p>


</div>



</div>


);


}