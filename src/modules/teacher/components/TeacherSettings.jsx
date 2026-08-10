import {
User,
Camera,
Save,
Bell,
ShieldCheck,
FolderSync,
SlidersHorizontal,
BookOpenCheck
} from "lucide-react";


import {
useState
} from "react";


import {
useAuth
} from "../../../auth/AuthContext";



export default function TeacherSettings(){



const {
user,
login
}=useAuth();




const [seccion,setSeccion]=useState("perfil");




const [foto,setFoto]=useState(
user?.foto || ""
);


const [nombre,setNombre]=useState(
user?.usuario || "Docente"
);


const [correo,setCorreo]=useState(
user?.correo || ""
);


const [institucion,setInstitucion]=useState(
user?.institucion || "Valle Grande"
);


const [especialidad,setEspecialidad]=useState(
user?.especialidad || "Docente académico"
);



const [
aprobacion,
setAprobacion
]=useState(70);



const [
critico,
setCritico
]=useState(50);



const [
notificaciones,
setNotificaciones
]=useState(true);






function cambiarFoto(e){


const archivo=e.target.files[0];


if(!archivo)return;


const reader=new FileReader();


reader.onload=()=>{

setFoto(reader.result);

};


reader.readAsDataURL(archivo);


}







function guardar(){


const nuevo={


...user,


usuario:nombre,

correo,

foto,

institucion,

especialidad,


configuracion:{


aprobacion,

critico,

notificaciones


}


};



login(nuevo);



alert(
"Perfil docente actualizado correctamente"
);


}







return (


<div

className="
space-y-8
"

>






<section

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
flex-col
md:flex-row
items-center
gap-8
"

>




<div
className="
relative
"
>


{

foto

?

<img

src={foto}

className="
w-36
h-36
rounded-3xl
object-cover
border-4
border-white
"

/>


:

<div

className="
w-36
h-36
rounded-3xl
bg-white/20
flex
items-center
justify-center
"

>

<User size={60}/>

</div>

}




<label

className="
absolute
bottom-2
right-2
bg-white
text-blue-900
p-3
rounded-full
cursor-pointer
"

>


<Camera size={20}/>



<input

type="file"

accept="image/*"

className="hidden"

onChange={cambiarFoto}

/>


</label>



</div>








<div>


<p className="text-blue-200">

Perfil docente

</p>


<h1 className="
text-4xl
font-black
">

{nombre}

</h1>



<p className="
text-blue-100
mt-2
">

{especialidad}

</p>



<div className="
mt-5
bg-white/20
rounded-xl
px-5
py-3
inline-block
">


Docente administrador


</div>



</div>



</div>


</section>








<div

className="
bg-white
rounded-2xl
border
p-2
flex
gap-2
flex-wrap
"

>


<Tab

activo={seccion==="perfil"}

click={()=>setSeccion("perfil")}

icon={<User/>}

texto="Perfil"

/>



<Tab

activo={seccion==="evaluacion"}

click={()=>setSeccion("evaluacion")}

icon={<SlidersHorizontal/>}

texto="Evaluación"

/>



<Tab

activo={seccion==="drive"}

click={()=>setSeccion("drive")}

icon={<FolderSync/>}

texto="Google Drive"

/>



<Tab

activo={seccion==="seguridad"}

click={()=>setSeccion("seguridad")}

icon={<ShieldCheck/>}

texto="Seguridad"

/>



</div>









{
seccion==="perfil" &&

<Panel titulo="Información profesional">


<div className="
grid
md:grid-cols-2
gap-6
">


<Input

titulo="Nombre completo"

valor={nombre}

cambiar={setNombre}

/>


<Input

titulo="Correo institucional"

valor={correo}

cambiar={setCorreo}

/>



<Input

titulo="Institución"

valor={institucion}

cambiar={setInstitucion}

/>




<Input

titulo="Especialidad"

valor={especialidad}

cambiar={setEspecialidad}

/>



</div>





<button

onClick={guardar}

className="
mt-8
bg-blue-900
text-white
px-8
py-3
rounded-xl
font-black
flex
gap-2
items-center
"

>


<Save/>

Guardar cambios


</button>



</Panel>

}










{
seccion==="evaluacion" &&


<Panel titulo="Configuración de evaluación">


<div className="space-y-5">


<Input

titulo="Porcentaje mínimo aprobado"

valor={aprobacion}

cambiar={setAprobacion}

/>



<Input

titulo="Nivel crítico"

valor={critico}

cambiar={setCritico}

/>



</div>


</Panel>


}









{
seccion==="drive" &&


<Panel titulo="Integración Google Drive">


<div

className="
bg-green-50
text-green-700
rounded-xl
p-5
font-bold
flex
gap-3
"

>


<FolderSync/>

Google Drive conectado correctamente


</div>


</Panel>


}








{
seccion==="seguridad" &&


<Panel titulo="Seguridad">


<button

className="
bg-gray-100
px-5
py-3
rounded-xl
font-bold
"

>

Cambiar contraseña

</button>


</Panel>


}








</div>


);

}









function Tab({
activo,
click,
icon,
texto
}){


return (

<button

onClick={click}

className={`
flex
items-center
gap-2
px-5
py-3
rounded-xl
font-bold

${
activo

?

"bg-blue-900 text-white"

:

"hover:bg-blue-50"

}

`}

>


{icon}

{texto}


</button>


);


}







function Panel({
titulo,
children
}){


return (

<section

className="
bg-white
rounded-3xl
border
p-8
shadow-sm
"

>


<h2 className="
text-2xl
font-black
mb-6
">

{titulo}

</h2>


{children}


</section>


);


}








function Input({
titulo,
valor,
cambiar
}){


return (

<div>


<label className="
text-sm
text-gray-500
">

{titulo}

</label>


<input

value={valor}

onChange={
e=>cambiar(
e.target.value
)
}

className="
w-full
mt-2
p-3
rounded-xl
border
"

/>


</div>


);


}