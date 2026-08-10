import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const AuthContext = createContext();



export function AuthProvider({children}){


const [user,setUser]=useState(null);



/*
===========================
CARGAR SESION
===========================
*/


useEffect(()=>{


const guardado =
localStorage.getItem("usuario");


if(guardado){

setUser(
JSON.parse(guardado)
);

}


},[]);






/*
===========================
REGISTRAR USUARIO
===========================
*/


function registrarUsuario(usuario){



const usuarios =
JSON.parse(
localStorage.getItem("usuarios")
)
||
[];




const existe =
usuarios.find(
u=>u.correo===usuario.correo
);




if(!existe){


usuarios.push({

...usuario,

fechaRegistro:
new Date().toISOString()

});



localStorage.setItem(
"usuarios",
JSON.stringify(usuarios)
);


}



}









/*
===========================
LOGIN
===========================
*/


function login(usuario){



const nuevoUsuario={


...usuario,


rol:
usuario.rol?.toUpperCase()
||
"ESTUDIANTE"


};



setUser(
nuevoUsuario
);



localStorage.setItem(

"usuario",

JSON.stringify(
nuevoUsuario
)

);



registrarUsuario(
nuevoUsuario
);



}









/*
===========================
ACTUALIZAR PERFIL
===========================
*/


function updateUser(datos){



const actualizado={

...user,

...datos

};



setUser(
actualizado
);



localStorage.setItem(
"usuario",
JSON.stringify(actualizado)
);





const usuarios =
obtenerUsuarios();




const listaNueva =

usuarios.map(u=>

u.correo===actualizado.correo

?

actualizado

:

u

);



localStorage.setItem(

"usuarios",

JSON.stringify(listaNueva)

);



}









/*
===========================
OBTENER USUARIOS
===========================
*/


function obtenerUsuarios(){


return (

JSON.parse(

localStorage.getItem("usuarios")

)

||

[]


);


}










/*
===========================
OBTENER ESTUDIANTES
===========================
*/


function obtenerEstudiantes(){


return obtenerUsuarios()

.filter(

u=>

u.rol==="ESTUDIANTE"

);


}










/*
===========================
GUARDAR COMUNICACION
===========================
*/


function guardarComunicacion(data){



const historial =

JSON.parse(

localStorage.getItem(
"comunicaciones"
)

)

||

[];





historial.push({


id:
Date.now(),


docente:
user?.correo,


fecha:
new Date().toISOString(),


...data


});






localStorage.setItem(

"comunicaciones",

JSON.stringify(historial)

);



}









/*
===========================
OBTENER COMUNICACIONES
===========================
*/


function obtenerComunicaciones(){



return (

JSON.parse(

localStorage.getItem(
"comunicaciones"
)

)

||

[]


);



}









/*
===========================
LOGOUT
===========================
*/


function logout(){


setUser(null);


localStorage.removeItem(
"usuario"
);


}









return(


<AuthContext.Provider


value={{


user,


login,


logout,


updateUser,


obtenerUsuarios,


obtenerEstudiantes,


guardarComunicacion,


obtenerComunicaciones


}}


>


{children}


</AuthContext.Provider>


);



}








export function useAuth(){


const context =
useContext(AuthContext);



if(!context){


throw new Error(

"useAuth debe usarse dentro de AuthProvider"

);


}



return context;


}