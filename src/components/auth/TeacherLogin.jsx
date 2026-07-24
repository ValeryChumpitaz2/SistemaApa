import {
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import {
useAuth
} from "../../auth/AuthContext";



const API =

"https://script.google.com/macros/s/AKfycbxMRbtzWBNqDtmySn3XMtOY6bw9dotPi4hX4IcJ5wRvu_W2Jwl1h7IRyHQqcEzyC6NkjQ/exec"
export default function TeacherLogin(){


const navigate = useNavigate();


const {login} = useAuth();



const [usuario,setUsuario]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");





async function ingresar(){


try{

const response = await fetch(API,{

  method:"POST",

  body:new URLSearchParams({

    accion:"loginDocente",

    usuario,

    password

  })

});



const respuesta =
await response.json();




console.log(respuesta);




if(!respuesta.ok){


setError(
respuesta.mensaje
);


return;


}




const docente={


nombre:
respuesta.data.nombre,


rol:
respuesta.data.rol


};




login(docente);



localStorage.setItem(

"usuario",

JSON.stringify(docente)

);




navigate(
"/teacher/dashboard"
);




}

catch(error){


console.error(error);


setError(
"Error conectando con servidor"
);


}



}





return(


<div className="space-y-4">


<input


className="
w-full
border
rounded-xl
p-3
"


placeholder="Usuario docente"


value={usuario}


onChange={
e=>setUsuario(e.target.value)
}


/>



<input


className="
w-full
border
rounded-xl
p-3
"


type="password"


placeholder="Contraseña"


value={password}


onChange={
e=>setPassword(e.target.value)
}


/>




{

error &&

<p className="
text-red-600
text-sm
">

{error}

</p>


}




<button


onClick={ingresar}


className="

w-full

bg-blue-700

text-white

rounded-xl

p-3

hover:bg-blue-800

"


>


Ingresar como docente


</button>



</div>


);


}