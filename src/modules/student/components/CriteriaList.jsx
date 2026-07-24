import {
  CheckCircle2,
  XCircle,
  FileText,
  Lightbulb
} from "lucide-react";



export default function CriteriaList({

criterios = []

}){



if(!Array.isArray(criterios) || criterios.length===0){

return null;

}







return (



<div className="

bg-slate-100

dark:bg-slate-950

rounded-3xl

p-6

">







<h2 className="

text-2xl

font-black

text-gray-800

dark:text-white

mb-8

">

Detalle de evaluación

</h2>









<div className="space-y-6">





{

criterios.map((item,index)=>(



<div

key={item.id ?? index}

className="

bg-white

dark:bg-slate-900

rounded-3xl

border

dark:border-slate-800

p-6

shadow-sm

"

>









{/* CABECERA */}



<div className="

flex

justify-between

items-start

gap-4

">






<div className="

flex

gap-4

items-center

">






<div className="

bg-blue-100

text-[#1D3681]

p-3

rounded-xl

">


<FileText size={26}/>


</div>








<div>



<h3 className="

text-xl

font-black

text-gray-800

dark:text-white

">


{item.criterio}


</h3>






<p className="

text-gray-500

mt-2

">


Puntuación:

{" "}


<span className="

font-black

text-[#1D3681]

">


{item.puntaje}


</span>



/


{item.maximo}

puntos


</p>





</div>







</div>









{

item.cumple ?



<div className="

flex

items-center

gap-2

bg-blue-100

text-[#1D3681]

px-4

py-2

rounded-full

font-bold

">


<CheckCircle2 size={22}/>


Cumple


</div>





:



<div className="

flex

items-center

gap-2

bg-red-100

text-red-700

px-4

py-2

rounded-full

font-bold

">


<XCircle size={22}/>


Pendiente


</div>



}






</div>













{/* DETALLES */}



{

item.detalles && (



<div className="

mt-8

space-y-3

">



<h4 className="

font-black

text-gray-700

dark:text-gray-200

">


Análisis del criterio


</h4>







{

item.detalles.map((detalle,i)=>(



<div

key={i}

className={`

rounded-2xl

p-4

flex

gap-3

border

${

detalle.cumple

?

"bg-blue-50 border-blue-100"

:

"bg-red-50 border-red-100"

}

`}

>






{

detalle.cumple ?



<CheckCircle2

size={22}

className="

text-[#1D3681]

mt-1

"

/>



:



<XCircle

size={22}

className="

text-red-600

mt-1

"

/>



}







<div>



<p className="

font-bold

text-gray-800

">


{detalle.titulo}


</p>




<p className="

text-gray-600

mt-1

">


{detalle.descripcion}


</p>





</div>






</div>






))

}







</div>



)

}









{/* RECOMENDACION */}





{

item.recomendacion && (



<div className="

mt-6

bg-blue-50

dark:bg-blue-950/40

rounded-2xl

p-5

border

border-blue-100

">





<div className="

flex

items-center

gap-2

text-[#1D3681]

font-black

">


<Lightbulb size={22}/>


Recomendación


</div>







<p className="

text-blue-900

dark:text-blue-200

mt-3

">


{item.recomendacion}


</p>






</div>



)

}









</div>



))

}








</div>





</div>





);


}