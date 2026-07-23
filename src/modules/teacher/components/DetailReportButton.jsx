import {
  FileDown,
  SearchCheck
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function DetailReportButton({
  resultados=[]
}) {


const generarDetalle =()=>{


if(!resultados.length){
 alert("No hay datos");
 return;
}


const doc =
new jsPDF();



const morado=[
109,
40,
217
];



resultados.forEach(
(item,index)=>{


if(index>0)
doc.addPage();



doc.setFillColor(
...morado
);


doc.rect(
0,
0,
210,
35,
"F"
);



doc.setTextColor(
255,
255,
255
);


doc.setFontSize(18);


doc.text(
"Detalle de Evaluación",
105,
20,
{
align:"center"
}
);



doc.setTextColor(
0
);



doc.setFontSize(12);



doc.text(
`Documento: ${item.nombre}`,
15,
55
);



doc.text(
`Puntaje: ${
item.puntaje?.obtenido ?? 0
}/${
item.puntaje?.maximo ?? 0
}`,
15,
65
);



doc.text(
`Cumplimiento: ${
item.puntaje?.porcentaje ?? 0
}%`,
15,
75
);



const criterios =
item.criterios?.map(
c=>[

c.nombre ??
c.criterio ??
"Criterio",


c.puntaje ??
c.resultado ??
"-",


c.observacion ??
c.descripcion ??
"Sin observación"

]
) || [];



autoTable(doc,{

startY:90,


head:[

[
"Criterio",
"Resultado",
"Observación"
]

],


body:criterios,


theme:"grid",


headStyles:{
fillColor:morado,
textColor:255
},


styles:{
fontSize:9
}


});



});


doc.save(
"Reporte_Detallado.pdf"
);


};



return(

<button
onClick={generarDetalle}
className="
group
flex
items-center
gap-3
px-6
py-3
rounded-2xl
bg-gradient-to-r
from-purple-700
via-purple-600
to-fuchsia-500
text-white
font-bold
shadow-xl
hover:scale-105
transition
"
>

<SearchCheck
size={22}
/>


Reporte Detallado PDF


</button>

);


}