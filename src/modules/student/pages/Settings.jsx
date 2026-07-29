import {
  User,
  Camera,
  Save,
  Globe,
  Bell,
  Brain,
  Lock,
  ShieldCheck,
  Palette
} from "lucide-react";


import {
  useState
} from "react";


import {
  useAuth
} from "../../../auth/AuthContext";


import {
  useTranslation
} from "react-i18next";





export default function Settings(){


const {
 user,
 login
}=useAuth();



const {
 i18n
}=useTranslation();




const [seccion,setSeccion]=useState("perfil");



const [foto,setFoto]=useState(
user?.foto || ""
);


const [nombre,setNombre]=useState(
user?.usuario || "Estudiante"
);


const [correo,setCorreo]=useState(
user?.correo || ""
);


const [carrera,setCarrera]=useState(
user?.carrera || "Análisis de Sistemas"
);


const [universidad,setUniversidad]=useState(
user?.universidad || "Valle Grande"
);


const [semestre,setSemestre]=useState(
user?.semestre || "4"
);



const [ia,setIa]=useState(true);


const [notificaciones,setNotificaciones]=useState(true);








function cambiarFoto(e){


const archivo=e.target.files[0];


if(!archivo)
return;



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

carrera,

universidad,

semestre

};



login(nuevo);



alert(
"Perfil actualizado correctamente"
);


}








return (

<div
className="
space-y-8
"
>






{/* PERFIL PRINCIPAL */}


<section

className="
bg-gradient-to-r
from-[#1D3681]
via-blue-700
to-blue-500
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





{/* FOTO */}


<div
className="
relative
"
>


{

foto ?


<img

src={foto}

className="
w-36
h-36
rounded-3xl
object-cover
border-4
border-white
shadow-xl
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

<User size={55}/>

</div>


}




<label

className="
absolute
bottom-2
right-2
bg-white
text-blue-700
p-3
rounded-full
cursor-pointer
shadow-lg
"

>


<Camera size={20}/>



<input

type="file"

accept="image/*"

onChange={cambiarFoto}

className="hidden"

/>


</label>



</div>









{/* INFORMACION */}


<div
className="
flex-1
"
>


<p
className="
text-blue-100
font-semibold
"
>

Perfil académico

</p>



<h1

className="
text-4xl
font-black
mt-1
"

>

{nombre}

</h1>




<p

className="
text-blue-100
text-lg
mt-2
"

>

{carrera}

</p>







<div

className="
grid
grid-cols-2
md:grid-cols-4
gap-4
mt-6
"

>


<MiniCard
titulo="Nivel"
valor="78%"
/>


<MiniCard
titulo="Semestre"
valor={semestre}
/>


<MiniCard
titulo="Estado"
valor="Activo"
/>


<MiniCard
titulo="APA"
valor="56%"
/>



</div>



</div>



</div>


</section>









{/* MENU */}



<div

className="
bg-white
dark:bg-slate-900
border
dark:border-slate-800
rounded-2xl
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

activo={seccion==="preferencias"}

click={()=>setSeccion("preferencias")}

icon={<Palette/>}

texto="Preferencias"

/>



<Tab

activo={seccion==="ia"}

click={()=>setSeccion("ia")}

icon={<Brain/>}

texto="IA Académica"

/>



<Tab

activo={seccion==="seguridad"}

click={()=>setSeccion("seguridad")}

icon={<ShieldCheck/>}

texto="Seguridad"

/>


</div>









{/* PERFIL */}



{

seccion==="perfil"

&&


<section

className="
bg-white
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-8
shadow-sm
"

>


<div>

<h2

className="
text-2xl
font-black
dark:text-white
"

>

Información personal

</h2>


<p

className="
text-gray-500
mt-1
"

>

Actualiza tus datos académicos

</p>


</div>







<div

className="
grid
md:grid-cols-2
gap-6
mt-8
"

>


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

titulo="Carrera profesional"

valor={carrera}

cambiar={setCarrera}

/>



<Input

titulo="Universidad"

valor={universidad}

cambiar={setUniversidad}

/>



<Input

titulo="Semestre académico"

valor={semestre}

cambiar={setSemestre}

/>


</div>






<div

className="
flex
justify-end
mt-8
"

>


<button

onClick={guardar}

className="
bg-[#1D3681]
hover:bg-blue-800
text-white
px-8
py-3
rounded-xl
font-black
flex
items-center
gap-2
shadow-lg
"

>

<Save/>

Guardar cambios


</button>


</div>




</section>


}









{/* PREFERENCIAS */}



{

seccion==="preferencias"

&&


<Panel titulo="Preferencias">


<div

className="
space-y-6
"

>


<div

className="
flex
justify-between
items-center
"

>


<div
className="
flex
gap-3
items-center
dark:text-white
"

>

<Globe/>

Idioma

</div>



<select

value={i18n.language}

onChange={(e)=>{

i18n.changeLanguage(
e.target.value
);


localStorage.setItem(
"idioma",
e.target.value
);


}}

className="
p-3
rounded-xl
border
dark:bg-slate-800
dark:text-white
"

>

<option value="es">

🇪🇸 Español

</option>


<option value="en">

🇺🇸 English

</option>


</select>


</div>







<div

className="
flex
justify-between
items-center
dark:text-white
"

>


<div
className="
flex
gap-3
items-center
"

>

<Bell/>

Notificaciones

</div>



<input

type="checkbox"

checked={notificaciones}

onChange={
e=>setNotificaciones(
e.target.checked
)
}

/>


</div>



</div>


</Panel>


}









{/* IA */}



{

seccion==="ia"

&&


<Panel titulo="🤖 Asistente académico IA">


<p className="
text-gray-500
dark:text-gray-300
"

>

Configura cómo la inteligencia artificial
te ayuda a mejorar tus documentos.

</p>



<div

className="
mt-6
bg-blue-50
dark:bg-slate-800
rounded-2xl
p-5
flex
justify-between
"

>


<span className="font-bold">

Recomendaciones automáticas

</span>



<input

type="checkbox"

checked={ia}

onChange={
e=>setIa(e.target.checked)
}

/>


</div>


</Panel>


}










{/* SEGURIDAD */}



{

seccion==="seguridad"

&&


<Panel titulo="🔐 Seguridad">


<button

className="
bg-gray-100
dark:bg-slate-800
px-5
py-3
rounded-xl
font-bold
flex
gap-2
items-center
"

>

<Lock/>

Cambiar contraseña

</button>


</Panel>


}



</div>


);

}









function MiniCard({
titulo,
valor
}){


return (

<div

className="
bg-white/20
rounded-2xl
p-4
"

>

<p
className="
text-blue-100
text-sm
"
>

{titulo}

</p>


<strong
className="
text-xl
"
>

{valor}

</strong>


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

"bg-[#1D3681] text-white"

:

"dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800"

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
dark:bg-slate-900
rounded-3xl
border
dark:border-slate-800
p-8
shadow-sm
"

>


<h2

className="
text-2xl
font-black
dark:text-white
mb-6
"

>

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


<label

className="
text-sm
text-gray-500
"

>

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
dark:bg-slate-800
dark:text-white
"

/>


</div>


);


}