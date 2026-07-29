import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";


export default function HistoryTable({
  documentos = []
}){


function obtenerEstado(item){


  const porcentaje =
  item.puntaje?.porcentaje ?? 0;



  if(porcentaje >= 95){

    return {
      texto:"Listo",
      clase:"bg-green-100 text-green-700",
      icono:<CheckCircle size={16}/>
    };

  }



  if(porcentaje >= 70){

    return {
      texto:"En mejora",
      clase:"bg-yellow-100 text-yellow-700",
      icono:<Clock size={16}/>
    };

  }



  return {

    texto:"Necesita revisión",
    clase:"bg-red-100 text-red-700",
    icono:<AlertTriangle size={16}/>

  };


}





return (


<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr className="
text-left
text-sm
text-gray-500
border-b
">


<th className="p-4">
Documento
</th>


<th className="p-4">
Fecha
</th>


<th className="p-4">
Resultado
</th>


<th className="p-4">
Estado
</th>


</tr>


</thead>



<tbody>



{

documentos.map((doc,index)=>{


const estado =
obtenerEstado(doc);



return (


<tr

key={index}

className="
border-b
hover:bg-gray-50
transition
"

>



<td className="p-4">


<div className="
flex
items-center
gap-3
">


<div className="
bg-blue-100
text-blue-700
p-2
rounded-xl
">


<FileText size={20}/>


</div>



<div>


<p className="
font-semibold
text-gray-800
">


{
doc.nombre ||
doc.resumen?.nombre ||
"Documento académico"
}


</p>



<p className="
text-xs
text-gray-400
">


Evaluación automática


</p>


</div>



</div>


</td>






<td className="p-4 text-gray-600">


{
doc.fecha ||
"Hoy"
}


</td>







<td className="p-4">


<span className="
font-bold
text-blue-700
">


{
doc.puntaje?.porcentaje ?? 0
}%

</span>


</td>







<td className="p-4">


<span className={`

inline-flex

items-center

gap-2

px-3

py-1

rounded-full

text-sm

font-semibold

${estado.clase}

`}>



{
estado.icono
}



{
estado.texto
}



</span>


</td>






</tr>


);


})


}




{
documentos.length===0 && (


<tr>


<td

colSpan="4"

className="
text-center
py-10
text-gray-400
"


>


No existen evaluaciones todavía.


</td>


</tr>


)


}



</tbody>



</table>


</div>


);


}