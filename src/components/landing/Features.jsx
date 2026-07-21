import {
 FileText,
 BookOpen,
 BarChart3,
 Layers
} from "lucide-react";


const data=[

{
icon:<FileText/>,
title:"Análisis documental",
text:"Procesa archivos Word, PDF y enlaces institucionales."
},

{
icon:<BookOpen/>,
title:"Validación APA",
text:"Comprueba criterios definidos por el instituto."
},

{
icon:<BarChart3/>,
title:"Reportes claros",
text:"Resultados fáciles de interpretar."
},

{
icon:<Layers/>,
title:"Revisión masiva",
text:"Evalúa grupos completos de estudiantes."
}

];


export default function Features(){

return(

<section
id="features"
className="
py-24
bg-gray-50
"
>


<h2 className="
text-4xl
font-bold
text-center
text-blue-950
">
Todo lo que necesitas
</h2>


<p className="
text-center
text-gray-500
mt-3
">
Una herramienta diseñada para estudiantes y docentes
</p>



<div className="
max-w-6xl
mx-auto
mt-12
grid
md:grid-cols-4
gap-6
px-8
">


{
data.map((item,index)=>(

<div
key={index}
className="
bg-white
p-7
rounded-2xl
shadow-sm
hover:shadow-xl
transition
"
>


<div className="
bg-blue-100
text-blue-900
w-fit
p-3
rounded-xl
">

{item.icon}

</div>


<h3 className="
mt-5
font-bold
text-xl
">
{item.title}
</h3>


<p className="
mt-3
text-gray-600
">
{item.text}
</p>


</div>

))
}


</div>


</section>

)

}