export default function DocumentStats({resumen}){


const datos=[


{
titulo:"Palabras",
valor:resumen?.palabras ?? 0
},


{
titulo:"Títulos",
valor:resumen?.titulos ?? 0
},


{
titulo:"Párrafos",
valor:resumen?.parrafos ?? 0
}


];



return (

<div className="
grid
md:grid-cols-3
gap-5
">


{

datos.map(item=>(


<div

key={item.titulo}

className="
bg-white
rounded-2xl
shadow-md
border
p-6
hover:shadow-lg
transition
"

>


<p className="text-gray-500">

{item.titulo}

</p>



<h3 className="
text-4xl
font-bold
text-blue-950
mt-3
">

{item.valor}

</h3>


</div>


))


}


</div>

)

}