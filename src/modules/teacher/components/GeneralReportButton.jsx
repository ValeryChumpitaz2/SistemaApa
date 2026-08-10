import {
  FileDown,
  BarChart3
} from "lucide-react";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



export default function GeneralReportButton({

resultados=[]

}) {



function obtenerPorcentaje(item){


return Number(

item?.puntaje?.porcentaje ??

item?.puntaje?.porcentajeFinal ??

item?.porcentaje ??

0

);


}





function obtenerEstado(p){


if(p>=90)
return "Excelente";


if(p>=70)
return "Bueno";


if(p>=60)
return "Regular";


return "Riesgo";


}






const generarReporte=()=>{


if(!resultados.length){

alert(
"No hay datos para generar reporte"
);

return;

}





const doc=new jsPDF();



const azul=[
29,
54,
129
];



const fecha=
new Date()
.toLocaleDateString(
"es-PE"
);






// ================================
// ESTADISTICAS
// ================================


const porcentajes=

resultados.map(
obtenerPorcentaje
);



const promedio=

porcentajes.reduce(
(a,b)=>a+b,
0
)
/
resultados.length;



const aprobados=

porcentajes.filter(
p=>p>=70
)
.length;



const riesgo=

porcentajes.filter(
p=>p<60
)
.length;



const excelentes=

porcentajes.filter(
p=>p>=90
)
.length;



const buenos=

porcentajes.filter(
p=>p>=70 && p<90
)
.length;



const regulares=

porcentajes.filter(
p=>p>=60 && p<70
)
.length;



// ================================
// PORTADA
// ================================


doc.setFillColor(
...azul
);


doc.rect(
0,
0,
210,
55,
"F"
);



doc.setTextColor(
255,
255,
255
);



doc.setFontSize(26);


doc.text(

"VG SMART REVIEW",

105,
25,
{
align:"center"
}

);



doc.setFontSize(15);


doc.text(

"Reporte General de Evaluación APA",

105,
40,
{
align:"center"
}

);





doc.setTextColor(
40,
40,
40
);



doc.setFontSize(12);



doc.text(

`Fecha de generación: ${fecha}`,

20,

75

);



doc.text(

"Panel Docente",

20,

85

);





// ================================
// RESUMEN
// ================================



doc.setFontSize(18);


doc.setTextColor(
...azul
);



doc.text(

"Resumen académico",

20,

110

);





autoTable(doc,{


startY:120,


head:[

[
"Indicador",
"Resultado"

]

],



body:[

[
"Evaluaciones analizadas",
resultados.length
],


[
"Promedio general",
`${promedio.toFixed(1)}%`
],


[
"Aprobados",
aprobados
],


[
"Estudiantes en riesgo",
riesgo
],


[
"Excelente desempeño",
excelentes
]


],



theme:"grid",



headStyles:{

fillColor:azul,

textColor:255

}



});









// ================================
// DISTRIBUCION
// ================================


doc.addPage();



doc.setFontSize(18);


doc.setTextColor(
...azul
);



doc.text(

"Distribución académica",

20,

25

);





autoTable(doc,{

startY:35,


head:[

[
"Nivel",
"Cantidad"
]

],



body:[

[
"Excelente",
excelentes
],

[
"Bueno",
buenos
],

[
"Regular",
regulares
],

[
"Riesgo",
riesgo
]

],


theme:"grid",


headStyles:{

fillColor:azul,

textColor:255

}



});







// ================================
// RANKING
// ================================



const ranking=[

...resultados

]

.sort(

(a,b)=>

obtenerPorcentaje(b)

-

obtenerPorcentaje(a)

);





doc.setFontSize(18);



doc.text(

"Ranking académico",

20,

130

);







autoTable(doc,{


startY:140,


head:[

[
"#",
"Documento",
"Puntaje",
"Estado"

]

],



body:

ranking.map(

(item,index)=>[


index+1,


item.nombre ??

"Sin nombre",


`${obtenerPorcentaje(item)}%`,


obtenerEstado(
obtenerPorcentaje(item)
)


]

),



theme:"striped",



headStyles:{

fillColor:azul,

textColor:255

},



styles:{

fontSize:9

}



});









// ================================
// PIE
// ================================


const paginas=

doc.internal.getNumberOfPages();



for(
let i=1;
i<=paginas;
i++
){


doc.setPage(i);



doc.setFontSize(9);


doc.setTextColor(
120
);



doc.text(

`VG Smart Review • Reporte académico • Página ${i}/${paginas}`,

105,

290,

{
align:"center"
}

);


}








doc.save(

"Reporte_General_VG_Smart_Review.pdf"

);



};








return (


<button


onClick={generarReporte}


className="

group

flex

items-center

gap-3

px-6

py-4

rounded-2xl

bg-gradient-to-r

from-blue-900

via-blue-700

to-indigo-600

text-white

font-black

shadow-xl

hover:scale-105

transition

"


>


<BarChart3

size={24}

className="

group-hover:rotate-12

transition

"

/>


Generar informe académico



</button>



);


}