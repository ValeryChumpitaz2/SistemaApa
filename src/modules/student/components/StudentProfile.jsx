import {
  useState
} from "react";


import {
  UserCircle,
  Save,
  Camera,
  Pencil
} from "lucide-react";


import {
  useAuth
} from "../../../auth/AuthContext";



export default function StudentProfile(){


const {
  user,
  login
}=useAuth();



const [editando,setEditando]=useState(
!user?.usuario
);



const [nombre,setNombre]=useState(
user?.usuario || ""
);



const [foto,setFoto]=useState(
user?.foto || ""
);





function guardarPerfil(){


const actualizado={

...user,

usuario:nombre,

foto:foto

};



login(actualizado);


setEditando(false);


}






return (



<div className="

bg-white

dark:bg-[#111827]

rounded-3xl

border

dark:border-gray-800

shadow-xl

p-8

">





{

editando ?



(


<div>



<div className="

flex

items-center

gap-4

mb-8

">


<div className="

bg-blue-100

text-[#1D3681]

p-4

rounded-2xl

">


<Camera size={32}/>


</div>



<div>


<h2 className="

text-2xl

font-black

text-gray-800

dark:text-white

">


Configurar perfil


</h2>


<p className="

text-gray-500

">


Personaliza tu información


</p>


</div>



</div>







<label className="

font-bold

text-gray-700

dark:text-white

">


Nombre de usuario


</label>



<input


value={nombre}


onChange={

e=>setNombre(e.target.value)

}


placeholder="Ejemplo: Valery"


className="

mt-2

w-full

p-4

rounded-xl

border

focus:outline-none

focus:ring-2

focus:ring-[#1D3681]

dark:bg-gray-900

dark:text-white

"


/>









<label className="

block

mt-6

font-bold

text-gray-700

dark:text-white

">


Foto de perfil


</label>



<input


value={foto}


onChange={

e=>setFoto(e.target.value)

}


placeholder="Pega aquí una URL de imagen"


className="

mt-2

w-full

p-4

rounded-xl

border

focus:outline-none

focus:ring-2

focus:ring-[#1D3681]

dark:bg-gray-900

dark:text-white

"


/>







{

foto && (


<div className="

flex

justify-center

mt-6

">


<img


src={foto}


alt="perfil"


className="

w-28

h-28

rounded-full

object-cover

border-4

border-[#1D3681]

shadow-lg

"


/>


</div>


)


}







<button


onClick={guardarPerfil}


className="

mt-8

w-full

bg-[#1D3681]

hover:bg-[#162A66]

text-white

py-4

rounded-xl

font-bold

flex

items-center

justify-center

gap-3

transition

"


>


<Save size={20}/>


Guardar perfil


</button>



</div>


)







:





(


<div className="

flex

flex-col

md:flex-row

items-center

justify-between

gap-6

">







<div className="

flex

items-center

gap-5

">






{

user?.foto ?



<img


src={user.foto}


alt="perfil"


className="

w-24

h-24

rounded-full

object-cover

border-4

border-[#1D3681]

shadow-lg

"


/>



:


<div className="

bg-blue-100

text-[#1D3681]

p-5

rounded-full

">


<UserCircle size={45}/>


</div>


}








<div>


<h2 className="

text-3xl

font-black

text-gray-800

dark:text-white

">


{user?.usuario}


</h2>





<p className="

text-gray-500

dark:text-gray-400

">


{user?.correo}


</p>







<span className="

inline-block

mt-3

bg-blue-100

text-[#1D3681]

px-4

py-1

rounded-full

text-sm

font-bold

">


Estudiante


</span>



</div>





</div>









<button


onClick={()=>{


setNombre(user?.usuario || "");


setFoto(user?.foto || "");


setEditando(true);


}}



className="

bg-[#1D3681]

hover:bg-[#162A66]

text-white

px-6

py-3

rounded-xl

font-bold

flex

items-center

gap-2

transition

"


>


<Pencil size={18}/>


Editar perfil


</button>






</div>


)


}






</div>


);


}