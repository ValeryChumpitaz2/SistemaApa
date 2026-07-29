import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";



const AuthContext = createContext();




export function AuthProvider({children}){


const [user,setUser]=useState(null);





useEffect(()=>{


const guardado =
localStorage.getItem("usuario");


if(guardado){

setUser(
JSON.parse(guardado)
);

}


},[]);








function login(usuario){


setUser(usuario);


localStorage.setItem(

"usuario",

JSON.stringify(usuario)

);


}








// NUEVO: actualizar perfil

function updateUser(datos){


const nuevoUsuario = {


...user,

...datos


};


setUser(nuevoUsuario);



localStorage.setItem(

"usuario",

JSON.stringify(nuevoUsuario)

);


}









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

updateUser,

logout

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