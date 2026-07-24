import {
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle
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

let icono = (
  <AlertCircle size={20}/>
);


let mensaje =
"Revisa los criterios pendientes para mejorar tu resultado.";





if(porcentaje >= 90){


estado="Excelente";


color="text-yellow-300";


icono=(
<CheckCircle size={20}/>
);



mensaje=
"Tu documento cumple correctamente los criterios evaluados.";

}



else if(porcentaje >= 70){



estado="Buen avance";


color="text-blue-200";


icono=(
<TrendingUp size={20}/>
);



mensaje=
"El documento cumple la mayoría de criterios evaluados.";

}







return (



<div className="

bg-gradient-to-br

from-[#0F1F4D]

via-[#1D3681]

to-blue-700

rounded-3xl

p-8

text-white

shadow-xl

">








{/* CABECERA */}



<div className="

flex

items-center

gap-4

">





<div className="

bg-white/10

p-4

rounded-2xl

">


<Award size={38}/>


</div>







<div>


<h2 className="

text-2xl

font-black

">


Resultado de revisión


</h2>




<p className="

text-blue-200

text-sm

mt-1

">


{

analysis.resumen?.nombre ??

"Documento académico"

}


</p>



</div>





</div>









{/* PORCENTAJE */}



<div className="

mt-8

flex

items-end

gap-4

">





<h1 className="

text-7xl

font-black

tracking-tight

">


{porcentaje}%


</h1>






<TrendingUp

size={42}

className="

mb-4

text-blue-200

"

/>





</div>









{/* BARRA */}



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


/>


</div>









{/* PUNTAJE */}



<div className="

mt-6

bg-white/10

rounded-2xl

p-5

">


<p className="

text-blue-100

">


Puntaje obtenido


</p>




<p className="

text-3xl

font-black

mt-1

">


{obtenido}


<span className="

text-blue-200

text-xl

">


/

{maximo}


</span>


</p>



</div>









{/* ESTADO */}



<div className="

mt-6

inline-flex

items-center

gap-2

bg-white/10

px-5

py-3

rounded-full

">


{icono}



<span className={`

font-black

text-lg

${color}

`}>



{estado}



</span>


</div>









{/* MENSAJE */}



<p className="

mt-5

text-blue-100

text-lg

leading-relaxed

">


{mensaje}


</p>









{/* INFORMACION EXTRA */}



<div className="

mt-8

grid

grid-cols-3

gap-3

">





<div className="

bg-white/10

rounded-2xl

p-4

text-center

">


<p className="

text-2xl

font-black

">


{maximo}

</p>



<p className="

text-xs

text-blue-200

">


Criterios


</p>



</div>







<div className="

bg-white/10

rounded-2xl

p-4

text-center

">


<p className="

text-2xl

font-black

">


{obtenido}

</p>



<p className="

text-xs

text-blue-200

">


Puntos


</p>



</div>







<div className="

bg-white/10

rounded-2xl

p-4

text-center

">


<p className="

text-2xl

font-black

">


{porcentaje >= 70 ? "✓" : "!"}


</p>



<p className="

text-xs

text-blue-200

">


Estado


</p>



</div>







</div>







</div>



);


}