import {
  FileDown
} from "lucide-react";

import jsPDF from "jspdf";



export default function DownloadReport({

analysis

}){



function descargarPDF(){


const doc = new jsPDF();



const azul = [29,54,129];

const gris = [90,90,90];



const porcentaje =
analysis?.puntaje?.porcentaje || 0;


const obtenido =
analysis?.puntaje?.obtenido || 0;


const maximo =
analysis?.puntaje?.maximo || 0;



const nombre =
analysis?.resumen?.nombre ||
"Documento académico";





/*
=========================
PORTADA
=========================
*/


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

20,

25

);



doc.setFontSize(14);


doc.text(

"Reporte de evaluación académica",

20,

40

);





doc.setTextColor(
0,
0,
0
);


doc.setFontSize(16);



doc.text(

nombre,

20,

85

);



doc.setFontSize(12);


doc.setTextColor(
gris[0],
gris[1],
gris[2]
);


doc.text(

"Análisis automático del documento académico",

20,

100

);






/*
=========================
RESULTADO
=========================
*/


doc.setFillColor(
245,
247,
250
);


doc.roundedRect(

20,

120,

170,

60,

5,

5,

"F"

);



doc.setTextColor(
0,
0,
0
);



doc.setFontSize(12);


doc.text(

"Resultado general",

35,

140

);




doc.setFontSize(38);


doc.setTextColor(
...azul
);


doc.text(

`${porcentaje}%`,

35,

165

);




doc.setFontSize(12);


doc.setTextColor(
0,
0,
0
);


doc.text(

`Puntaje obtenido: ${obtenido}/${maximo}`,

100,

145

);



let estado =
"Necesita mejorar";


if(porcentaje>=90)

estado="Excelente";


else if(porcentaje>=70)

estado="Buen avance";




doc.text(

`Estado: ${estado}`,

100,

160

);





/*
=========================
CRITERIOS
=========================
*/


doc.addPage();



doc.setFillColor(
...azul
);


doc.rect(
0,
0,
210,
25,
"F"
);



doc.setTextColor(
255,
255,
255
);



doc.setFontSize(16);



doc.text(

"Detalle de evaluación",

20,

17

);





let y = 40;



analysis?.criterios?.forEach(
(item,index)=>{



if(y>260){

doc.addPage();

y=30;

}



doc.setFillColor(
235,
240,
250
);



doc.roundedRect(

20,

y-8,

170,

22,

3,

3,

"F"

);





doc.setTextColor(
0,
0,
0
);


doc.setFontSize(12);


doc.text(

`${index+1}. ${item.criterio}`,

25,

y+5

);



y += 30;



doc.setFontSize(11);



doc.text(

`Puntaje: ${item.puntaje}/${item.maximo}`,

25,

y

);



y+=8;




if(item.detalles){



item.detalles.forEach(
(detalle)=>{


const texto =
detalle.cumple
? 
"✓ "
:
"✗ "
+
detalle.descripcion;



const lineas =
doc.splitTextToSize(

texto,

150

);



doc.text(

lineas,

30,

y

);



y +=
lineas.length*6;



});

}



y+=12;



}

);






/*
=========================
PIE
=========================
*/


const paginas =
doc.internal.getNumberOfPages();



for(
let i=1;
i<=paginas;
i++
){


doc.setPage(i);


doc.setFontSize(9);


doc.setTextColor(
120,
120,
120
);



doc.text(

`VG Smart Review | Página ${i}/${paginas}`,

20,

290

);



}




doc.save(

"Reporte_VG_Smart_Review.pdf"

);



}




return (

<button

onClick={descargarPDF}

className="
bg-[#1D3681]
text-white
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
hover:bg-blue-900
transition
shadow
"

>

<FileDown size={20}/>

Descargar reporte

</button>


);


}