import {
  Mail,
  Search,
  Users,
  User,
  Send,
  CheckCircle2,
  FileText,
  Award,
  AlertTriangle,
  Eye
} from "lucide-react";


import {
  useState
} from "react";




export default function TeacherCommunication({

  resultados=[]

}){



const [
busqueda,
setBusqueda
]=useState("");



const [
seleccionados,
setSeleccionados
]=useState([]);




const [
mensaje,
setMensaje
]=useState(
`Estimado estudiante,

Adjunto encontrará su reporte de evaluación académica.

Saludos cordiales.`
);









/*
==========================
DATOS PARA MOSTRAR
==========================
*/


const estudiantes = resultados.map(item=>({


correo:
item.correo ||
"correo-no-disponible",



nombre:
item.estudiante ||
item.nombre ||
"Estudiante",



documento:
item.documento ||
item.nombre ||
"Documento",



porcentaje:
item.puntaje?.porcentaje || 0,



resultado:item


}));










const filtrados =
estudiantes.filter(e=>{


const texto =
busqueda.toLowerCase();



return (

e.nombre
.toLowerCase()
.includes(texto)

||

e.correo
.toLowerCase()
.includes(texto)

);


});










function seleccionar(correo){


if(
seleccionados.includes(correo)
){


setSeleccionados(

seleccionados.filter(
item=>item!==correo
)

);



}else{


setSeleccionados([

...seleccionados,

correo

]);


}


}









function seleccionarTodos(){


if(
seleccionados.length===estudiantes.length
){


setSeleccionados([]);



}else{


setSeleccionados(

estudiantes.map(
e=>e.correo
)

);


}


}









function enviarMasivo(){



const destinatarios =
estudiantes.filter(

e=>

seleccionados.includes(
e.correo
)

);




console.log({

destinatarios,

mensaje

});



alert(
`Preparando envío a ${destinatarios.length} estudiantes`
);



}









function enviarIndividual(estudiante){


console.log({

destinatario:
estudiante.correo,

mensaje

});



alert(
`Reporte preparado para ${estudiante.correo}`
);


}









function obtenerEstado(porcentaje){



if(porcentaje>=90){


return {

texto:"Excelente",

color:
"bg-green-100 text-green-700",

icon:
<CheckCircle2 size={18}/>


};


}



if(porcentaje>=70){


return {


texto:"Bueno",

color:
"bg-blue-100 text-blue-700",

icon:
<Award size={18}/>


};


}





return {


texto:"Crítico",

color:
"bg-red-100 text-red-700",

icon:
<AlertTriangle size={18}/>


};



}









return (


<section

className="
space-y-8
"

>





{/* HEADER */}


<div

className="
bg-gradient-to-r
from-blue-950
via-indigo-800
to-blue-600
rounded-3xl
p-8
text-white
shadow-xl
"

>


<div

className="
flex
justify-between
items-center
flex-wrap
gap-5
"

>


<div>


<div

className="
flex
items-center
gap-3
"

>

<Mail size={35}/>


<h1

className="
text-3xl
font-black
"

>

Centro de comunicaciones

</h1>


</div>



<p

className="
text-blue-200
mt-3
"

>

Envía reportes académicos individuales
o masivos.

</p>



</div>





<div

className="
bg-white/20
rounded-2xl
px-6
py-4
"

>


<p>

Seleccionados

</p>


<h2

className="
text-3xl
font-black
"

>

{
seleccionados.length
}

</h2>


</div>



</div>



</div>









{/* MENSAJE */}


<div

className="
bg-white
rounded-3xl
border
shadow-sm
p-8
"

>


<h2

className="
text-xl
font-black
mb-4
"

>

Mensaje personalizado

</h2>



<textarea

value={mensaje}

onChange={
e=>setMensaje(
e.target.value
)
}

className="
w-full
h-36
border
rounded-2xl
p-5
outline-none
focus:ring-2
focus:ring-blue-500
"

/>






<div

className="
flex
justify-between
mt-5
flex-wrap
gap-3
"

>



<button

onClick={seleccionarTodos}

className="
bg-blue-100
text-blue-700
px-5
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Users/>

Seleccionar todos


</button>





<button

onClick={enviarMasivo}

disabled={
seleccionados.length===0
}

className="
bg-green-600
disabled:bg-gray-300
text-white
px-6
py-3
rounded-xl
font-bold
flex
items-center
gap-2
"

>


<Send/>

Enviar masivo


</button>



</div>



</div>









{/* BUSCADOR */}


<div

className="
relative
"

>


<Search

className="
absolute
left-4
top-4
text-gray-400
"

/>



<input

placeholder="
Buscar estudiante o correo...
"

value={busqueda}

onChange={
e=>setBusqueda(
e.target.value
)
}

className="
w-full
rounded-2xl
border
py-4
pl-12
shadow-sm
"

/>


</div>









{/* LISTA */}



<div

className="
grid
xl:grid-cols-2
gap-6
"

>


{


filtrados.map(est=>{



const estadoActual =
obtenerEstado(
est.porcentaje
);



return (


<div

key={est.correo}

className={`

bg-white
rounded-3xl
border
p-6
shadow-sm
transition

${
seleccionados.includes(
est.correo
)

?

"border-blue-600 bg-blue-50"

:

"hover:shadow-lg"

}

`}

>





<div

className="
flex
items-center
gap-4
"

>


<div

className="
bg-blue-100
text-blue-700
p-4
rounded-full
"

>

<User/>

</div>



<div>


<h2

className="
font-black
text-lg
"

>

{est.nombre}

</h2>


<p

className="
text-sm
text-gray-500
"

>

✉ {est.correo}

</p>


</div>




<input

type="checkbox"

checked={
seleccionados.includes(
est.correo
)
}

onChange={()=>
seleccionar(
est.correo
)
}

className="
ml-auto
w-5
h-5
"

/>


</div>










<div

className="
mt-5
bg-slate-50
rounded-2xl
p-5
space-y-3
"

>


<div

className="
flex
items-center
gap-2
font-bold
"

>

<FileText size={18}/>

{est.documento}

</div>





<div

className="
flex
justify-between
"

>


<span>
Resultado
</span>


<strong

className="
text-2xl
"

>

{est.porcentaje}%

</strong>


</div>





<span

className={`

inline-flex
items-center
gap-2
px-4
py-2
rounded-full
font-bold

${estadoActual.color}

`}

>


{estadoActual.icon}

{estadoActual.texto}


</span>



</div>









<div

className="
flex
gap-3
mt-5
"

>


<button

onClick={()=>
enviarIndividual(est)
}

className="
flex-1
bg-blue-900
text-white
py-3
rounded-xl
font-bold
flex
justify-center
items-center
gap-2
"

>


<Send size={18}/>

Enviar


</button>





<button

className="
border
rounded-xl
px-4
hover:bg-gray-100
"

>

<Eye/>

</button>



</div>





</div>


);


})


}



</div>





</section>


);


}