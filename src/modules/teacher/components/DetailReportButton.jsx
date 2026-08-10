import {
  SearchCheck,
  FileDown,
  Loader2
} from "lucide-react";

import {
  useState
} from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function DetailReportButton({
  resultados=[]
}) {


const [
generando,
setGenerando
]=useState(false);







function generarDetalle(){



if(!resultados.length){

alert(
"No hay evaluaciones para exportar"
);

return;

}




try{


setGenerando(true);



const doc =
new jsPDF();




const colorPrincipal=[

109,
40,
217

];




const fecha =
new Date().toLocaleDateString(
"es-PE"
);





resultados.forEach(

(item,index)=>{



if(index>0){

doc.addPage();

}





// ENCABEZADO


doc.setFillColor(
...colorPrincipal
);


doc.rect(
0,
0,
210,
45,
"F"
);




doc.setTextColor(
255,
255,
255
);



doc.setFontSize(
22
);



doc.text(

"VG Smart Review",

105,

18,

{
align:"center"
}

);



doc.setFontSize(
14
);



doc.text(

"Reporte Detallado APA",

105,

32,

{
align:"center"
}

);







doc.setTextColor(
40,
40,
40
);



doc.setFontSize(
12
);




doc.text(

`Documento: ${item.nombre ?? "Sin nombre"}`,

15,

65

);




doc.text(

`Fecha evaluación: ${fecha}`,

15,

75

);




doc.text(

`Puntaje obtenido: ${
item.puntaje?.obtenido ?? 0
}/${
item.puntaje?.maximo ?? 0
}`,

15,

85

);




doc.text(

`Cumplimiento APA: ${
item.puntaje?.porcentaje ?? 0
}%`,

15,

95

);







// CRITERIOS


const criterios =

item.criterios?.map(

criterio=>[

criterio.nombre ??

criterio.criterio ??

"Criterio",



criterio.puntaje ??

criterio.resultado ??

"-",



criterio.observacion ??

criterio.descripcion ??

"Sin observación"

]


)

??

[];






autoTable(doc,{

startY:110,


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

fillColor:colorPrincipal,

textColor:255

},



alternateRowStyles:{

fillColor:[

245,
240,
255

]

},



styles:{

fontSize:9

}


});






// RESUMEN FINAL


let posicion =

doc.lastAutoTable?.finalY

??

150;




doc.setFillColor(

240,
230,
255

);



doc.roundedRect(

15,

posicion + 15,

180,

35,

5,

5,

"F"

);




doc.setTextColor(

80,
30,
120

);



doc.text(

"Evaluación generada automáticamente por VG Smart Review",

25,

posicion + 37

);




}



);






doc.save(

"Reporte_Detallado_APA.pdf"

);



}

catch(error){


console.error(
error
);


alert(
"Error generando reporte"
);


}

finally{


setGenerando(false);


}


}







return (

<button
onClick={generarDetalle}
>
<SearchCheck size={22}/>
Reporte Detallado PDF
</button>

);

}