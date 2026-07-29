import {
  FileText,
  Award,
  TrendingUp,
  Download,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";





export default function Reports({

documentos=[]

}){





const evaluados =
documentos.filter(
doc=>doc.puntaje
);





const promedio =

evaluados.length

?

Math.round(

evaluados.reduce(

(a,b)=>

a+(b.puntaje?.porcentaje || 0)

,0)

/

evaluados.length

)

:

0;








const grafica = evaluados.map(

(doc,index)=>(

{

nombre:`Evaluación ${index+1}`,

puntaje:
doc.puntaje?.porcentaje || 0

}

)

);







function descargarPDF(){



const pdf =
new jsPDF();




pdf.setFontSize(20);

pdf.text(
"Reporte Académico APA",
20,
20
);




pdf.setFontSize(12);


pdf.text(

`Promedio general: ${promedio}%`,

20,

35

);




pdf.text(

"Evaluaciones realizadas",

20,

50

);





const filas = evaluados.map(

(doc,index)=>(

[

index+1,

doc.nombre ||
"Documento académico",

`${doc.puntaje?.porcentaje || 0}%`

]

)

);






autoTable(

pdf,

{

startY:60,

head:[

[
"#",
"Documento",
"Puntaje"
]

],

body:filas

}

);





pdf.save(
"reporte-academico.pdf"
);



}









return (

<div

className="
space-y-8
"

>






<div

className="
flex
items-center
gap-3
"

>


<div

className="
bg-blue-100
text-blue-700
p-3
rounded-xl
"

>

<BarChart3/>

</div>




<div>

<h1

className="
text-3xl
font-black
text-gray-800
dark:text-white
"

>

Reportes académicos

</h1>



<p

className="
text-gray-500
"

>

Analiza tu evolución y rendimiento APA.

</p>


</div>



</div>









<section

className="
grid
md:grid-cols-3
gap-6
"

>


<Card

icon={<FileText/>}

titulo="Evaluaciones"

valor={evaluados.length}

/>



<Card

icon={<Award/>}

titulo="Promedio APA"

valor={`${promedio}%`}

/>



<Card

icon={<TrendingUp/>}

titulo="Estado"

valor={
promedio>=90
?
"Excelente"
:
promedio>=70
?
"Buen avance"
:
"En mejora"
}

/>



</section>









<section

className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-8
"

>


<h2

className="
text-2xl
font-black
dark:text-white
"

>

Evolución de rendimiento

</h2>






<div

className="
h-80
mt-6
"

>



{

evaluados.length

?

<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={grafica}

>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis

dataKey="nombre"

/>


<YAxis

domain={[0,100]}

/>


<Tooltip/>




<Bar

dataKey="puntaje"

fill="#1D3681"

radius={[10,10,0,0]}

/>



</BarChart>


</ResponsiveContainer>


:

<div

className="
h-full
flex
items-center
justify-center
text-gray-400
"

>

Aún no hay evaluaciones


</div>


}



</div>



</section>









<section

className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-8
"

>


<div

className="
flex
justify-between
items-center
"

>


<h2

className="
text-2xl
font-black
dark:text-white
"

>

Comparación de documentos

</h2>



<button

onClick={descargarPDF}

className="
bg-[#1D3681]
text-white
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>

<Download/>

Descargar PDF


</button>


</div>









<div

className="
mt-6
space-y-4
"

>


{

evaluados.map(

(doc,index)=>(


<div

key={index}

className="
flex
justify-between
items-center
bg-gray-50
dark:bg-slate-800
p-4
rounded-xl
"

>


<div>


<p className="
font-bold
dark:text-white
">

{

doc.nombre ||
"Documento académico"

}


</p>


<p className="
text-sm
text-gray-500
">

Evaluación {index+1}

</p>


</div>





<strong

className="
text-blue-700
text-xl
"

>

{

doc.puntaje?.porcentaje || 0

}%

</strong>




</div>


)

)


}



</div>




</section>









<section

className="
grid
md:grid-cols-2
gap-6
"

>






<div

className="
bg-green-50
dark:bg-green-900/20
rounded-3xl
p-6
"

>


<h3

className="
font-black
text-green-700
flex
gap-2
"

>

<CheckCircle/>

Fortalezas

</h3>


<ul

className="
mt-4
space-y-2
"

>

<li>
✓ Formato institucional
</li>

<li>
✓ Estructura académica
</li>

<li>
✓ Interlineado correcto
</li>

</ul>


</div>









<div

className="
bg-red-50
dark:bg-red-900/20
rounded-3xl
p-6
"

>


<h3

className="
font-black
text-red-700
flex
gap-2
"

>

<AlertTriangle/>

Mejoras

</h3>



<ul

className="
mt-4
space-y-2
"

>

<li>
⚠ Referencias bibliográficas
</li>

<li>
⚠ Glosario
</li>

<li>
⚠ Conclusiones
</li>


</ul>



</div>






</section>









</div>


);


}









function Card({
icon,
titulo,
valor
}){


return (

<div

className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-6
"

>


<div className="
text-blue-700
">

{icon}

</div>



<p className="
mt-4
text-gray-500
">

{titulo}

</p>



<h3 className="
text-3xl
font-black
dark:text-white
">

{valor}

</h3>


</div>


);


}