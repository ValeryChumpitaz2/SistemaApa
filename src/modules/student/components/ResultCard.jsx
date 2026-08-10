import {
  CheckCircle,
  AlertTriangle
} from "lucide-react";


export default function ResultCard({

  analysis = {}

}) {



const obtenidoRaw =

  analysis?.puntaje?.obtenido ??

  analysis?.puntaje ??

  analysis?.resumen?.obtenido ??

  analysis?.resumen?.puntaje ??

  analysis?.resultado?.obtenido ??

  0;



const maximoRaw =

  analysis?.puntaje?.maximo ??

  analysis?.resumen?.maximo ??

  analysis?.resultado?.maximo ??

  2;



const porcentajeRaw =

  analysis?.puntaje?.porcentaje ??

  analysis?.resumen?.porcentaje ??

  analysis?.resultado?.porcentaje ??

  null;



const obtenido = Number(obtenidoRaw);

const maximo = Number(maximoRaw);



const puntajeFinal = isNaN(obtenido)
  ? 0
  : obtenido;



const maximoFinal = isNaN(maximo)
  ? 2
  : maximo;



const porcentaje = porcentajeRaw !== null

?
Number(porcentajeRaw)

:

Math.round(
  (puntajeFinal / maximoFinal) * 100
);



const descuento = Number(

  (
    maximoFinal -
    puntajeFinal

  ).toFixed(2)

);



const cumple =

puntajeFinal >= maximoFinal;






return (

<div className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-6
shadow-sm
">





{/* TITULO */}

<div className="
flex
justify-between
items-start
gap-4
">


<div>


<h2 className="
text-xl
font-black
text-gray-800
dark:text-white
">

Estado del documento

</h2>



<p className="
text-gray-500
text-sm
mt-1
">

{
analysis.nombre ||
"Documento analizado"
}

</p>


</div>





<div className={`

px-4
py-2
rounded-full
font-bold
text-sm
flex
items-center
gap-2

${
cumple

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}>



{

cumple

?

<CheckCircle size={18}/>

:

<AlertTriangle size={18}/>

}



{

cumple

?

"Listo para entrega"

:

"Pendiente"

}



</div>



</div>








{/* TARJETAS */}

<div className="
mt-6
grid
grid-cols-1
md:grid-cols-3
gap-4
">






{/* PUNTAJE */}

<div className="
bg-blue-50
dark:bg-blue-900/20
rounded-2xl
p-5
">


<p className="
text-sm
text-gray-500
">

Puntaje

</p>



<p className="
text-3xl
font-black
text-blue-700
dark:text-blue-300
">

{puntajeFinal}/{maximoFinal}

</p>



<p className="
text-sm
font-bold
mt-2
">


{

descuento <= 0

?

"✓ No se descontaron puntos"

:

"⚠ Se descontaron " +

descuento +

" puntos"

}


</p>


</div>









{/* PORCENTAJE */}

<div className="
bg-indigo-50
dark:bg-indigo-900/20
rounded-2xl
p-5
">


<p className="
text-sm
text-gray-500
">

Cumplimiento

</p>



<p className="
text-3xl
font-black
text-indigo-700
dark:text-indigo-300
">

{porcentaje}%

</p>



<p className="
text-sm
font-bold
mt-2
">

Meta

<br/>

95%

</p>


</div>









{/* RESULTADO */}

<div className="
bg-green-50
dark:bg-green-900/20
rounded-2xl
p-5
">


<p className="
text-sm
text-gray-500
">

Resultado

</p>



<div className="
flex
items-center
gap-2
mt-3
font-black
text-lg
text-green-700
">


{

cumple

?

<CheckCircle size={22}/>

:

<AlertTriangle size={22}/>

}



{

cumple

?

"Cumple"

:

"Con observaciones"

}



</div>


</div>





</div>








<div className="
mt-5
bg-slate-50
dark:bg-slate-800
rounded-2xl
p-4
text-sm
font-semibold
text-gray-700
dark:text-gray-200
">


{

cumple

?

"El documento cumple todos los criterios y conserva el puntaje completo."

:

"El documento tiene criterios pendientes que generan descuentos."

}



</div>





</div>

);

}