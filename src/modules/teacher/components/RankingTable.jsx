import {
 Trophy,
 Medal,
 Award,
 TrendingUp
} from "lucide-react";


export default function RankingTable({

resultados=[]

}){


function obtenerPuntaje(item){


return Number(

item?.puntaje?.porcentaje ??
item?.puntaje?.porcentajeFinal ??
item?.porcentaje ??
0

);


}




function estado(p){

if(p>=90)
return {
texto:"Excelente",
color:"text-green-600",
bg:"bg-green-100"
};


if(p>=70)
return {
texto:"Bueno",
color:"text-blue-600",
bg:"bg-blue-100"
};


if(p>=60)
return {
texto:"Regular",
color:"text-yellow-600",
bg:"bg-yellow-100"
};


return {
texto:"Necesita mejorar",
color:"text-red-600",
bg:"bg-red-100"
};


}




const ranking=[...resultados]

.sort(
(a,b)=>
obtenerPuntaje(b)-obtenerPuntaje(a)
);






return(


<section

className="
bg-white
rounded-3xl
border
shadow-lg
p-8
"

>



<div

className="
flex
items-center
gap-4
mb-8
"

>


<div

className="
bg-yellow-100
text-yellow-600
p-4
rounded-2xl
"

>

<Trophy size={35}/>

</div>



<div>

<h2

className="
text-2xl
font-black
text-gray-800
"

>

Ranking académico

</h2>


<p

className="
text-gray-500
"

>

Clasificación automática según evaluación APA

</p>


</div>


</div>







{

ranking.length===0 ?


<div

className="
text-center
py-12
text-gray-400
"

>

No existen evaluaciones

</div>


:


<div className="space-y-5">



{

ranking.map((item,index)=>{


const puntaje=
obtenerPuntaje(item);


const info=
estado(puntaje);



return(


<div

key={index}

className="
relative
overflow-hidden
border
rounded-3xl
p-6
bg-gradient-to-r
from-slate-50
to-white
hover:shadow-xl
transition
"

>



<div

className="
flex
items-center
justify-between
"

>




<div

className="
flex
items-center
gap-5
"

>



<div

className={`

w-14
h-14
rounded-2xl
flex
items-center
justify-center
font-black
text-xl

${

index===0
?
"bg-yellow-400 text-white"

:

index===1
?
"bg-gray-300 text-white"

:

index===2
?
"bg-orange-400 text-white"

:

"bg-blue-900 text-white"

}

`}

>


{
index+1
}


</div>







<div>


<h3

className="
font-black
text-lg
text-gray-800
"

>

{
item.nombre
}


</h3>


<div

className="
flex
items-center
gap-2
mt-2
"

>


<span

className={`
px-3
py-1
rounded-full
text-xs
font-bold
${info.bg}
${info.color}
`}

>

{info.texto}

</span>



</div>


</div>



</div>









<div

className="
text-right
"

>


<p

className="
text-4xl
font-black
text-blue-900
"

>

{puntaje}%

</p>


<p

className="
text-xs
text-gray-400
"

>

Puntaje APA

</p>



</div>





</div>










<div

className="
mt-5
"

>


<div

className="
flex
justify-between
text-xs
font-bold
mb-2
"

>

<span>
Rendimiento
</span>

<span>
{puntaje}%
</span>


</div>



<div

className="
h-3
bg-gray-200
rounded-full
overflow-hidden
"

>


<div

className={`
h-full
rounded-full

${
puntaje>=90
?
"bg-green-500"

:

puntaje>=70
?
"bg-blue-600"

:

puntaje>=60
?
"bg-yellow-500"

:

"bg-red-500"

}

`}

style={{

width:`${puntaje}%`

}}

/>



</div>


</div>






{

index===0 &&

<Trophy

className="
absolute
right-5
top-5
text-yellow-400
opacity-20
"

size={80}

/>

}



</div>


)


})


}



</div>


}



</section>


);


}