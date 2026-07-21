import {
  createContext,
  useContext,
  useState
} from "react";


const AuthContext = createContext();



export function AuthProvider({children}){


const [user,setUser] = useState(null);



function login(rol){


const usuario = {

nombre:
rol === "teacher"
?
"Docente Demo"
:
"Estudiante Demo",

rol

};


setUser(usuario);

localStorage.setItem(
"user",
JSON.stringify(usuario)
);


}



function logout(){

setUser(null);

localStorage.removeItem("user");

}



return (

<AuthContext.Provider

value={{
user,
login,
logout
}}

>

{children}

</AuthContext.Provider>

);


}



export function useAuth(){

return useContext(AuthContext);

}