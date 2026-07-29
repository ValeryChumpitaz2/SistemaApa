import { useState } from "react";

import {
  ShieldCheck,
  GraduationCap,
  UserRound,
  ArrowLeft,
  Sparkles
} from "lucide-react";


import TeacherLogin from "../components/auth/TeacherLogin";
import GoogleLogin from "../components/auth/GoogleLogin";



export default function Login(){


const [tipo,setTipo]=useState(null);



return (


<div className="

min-h-screen

flex

items-center

justify-center

relative

overflow-hidden

bg-gradient-to-br

from-slate-950

via-blue-950

to-indigo-950

p-6

">


{/* luces decorativas */}

<div className="

absolute

w-96

h-96

bg-blue-500

opacity-20

rounded-full

blur-3xl

top-10

left-10

"/>


<div className="

absolute

w-96

h-96

bg-indigo-500

opacity-20

rounded-full

blur-3xl

bottom-10

right-10

"/>




<div className="

relative

w-full

max-w-md

bg-white/95

backdrop-blur-xl

rounded-[2rem]

shadow-2xl

p-10

border

border-white/20

text-center

">



<div className="

mx-auto

w-24

h-24

rounded-3xl

bg-gradient-to-br

from-blue-600

to-indigo-700

flex

items-center

justify-center

shadow-lg

shadow-blue-500/30

">


<ShieldCheck

size={48}

className="text-white"

/>


</div>



<h1 className="

text-4xl

font-black

mt-6

text-slate-800

tracking-tight

">

VG Smart Review

</h1>



<div className="

flex

items-center

justify-center

gap-2

mt-3

text-blue-600

font-medium

">


<Sparkles size={16}/>


Plataforma académica inteligente


</div>




<p className="

text-gray-500

mt-5

mb-8

">

Selecciona tu tipo de acceso para continuar

</p>





{
!tipo && (



<div className="space-y-5">



<button

onClick={()=>setTipo("DOCENTE")}

className="

group

w-full

p-5

rounded-2xl

border-2

border-blue-100

bg-gradient-to-r

from-blue-600

to-indigo-600

text-white

flex

items-center

gap-4

transition-all

duration-300

hover:scale-[1.03]

hover:shadow-xl

hover:shadow-blue-500/30

"


>


<div className="

bg-white/20

p-3

rounded-xl

group-hover:rotate-6

transition

">


<UserRound size={28}/>


</div>



<div className="text-left">


<p className="font-bold text-lg">

Soy Docente

</p>


<p className="text-sm opacity-80">

Acceso administrativo

</p>


</div>


</button>





<button

onClick={()=>setTipo("ESTUDIANTE")}


className="

group

w-full

p-5

rounded-2xl

border-2

border-green-100

bg-gradient-to-r

from-emerald-500

to-green-600

text-white

flex

items-center

gap-4

transition-all

duration-300

hover:scale-[1.03]

hover:shadow-xl

hover:shadow-green-500/30

"

>


<div className="

bg-white/20

p-3

rounded-xl

group-hover:rotate-6

transition

">


<GraduationCap size={28}/>


</div>




<div className="text-left">


<p className="font-bold text-lg">

Soy Estudiante

</p>


<p className="text-sm opacity-80">

Ingreso con Google institucional

</p>


</div>



</button>



</div>


)

}




{
tipo && (


<>


<button

onClick={()=>setTipo(null)}

className="

flex

items-center

gap-2

text-sm

text-gray-500

hover:text-blue-600

mb-6

transition

"


>


<ArrowLeft size={16}/>

Cambiar tipo de acceso


</button>



{

tipo==="DOCENTE" &&

<TeacherLogin/>

}



{

tipo==="ESTUDIANTE" &&

<GoogleLogin/>

}



</>


)

}



<div className="

mt-8

text-xs

text-gray-400

">


© 2026 VG Smart Review

</div>



</div>



</div>


);


}