import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const ThemeContext = createContext();



export function ThemeProvider({
  children
}){


const [dark,setDark] = useState(()=>{

const saved =
localStorage.getItem("theme");


return saved === "dark";

});





useEffect(()=>{


const html =
document.documentElement;



if(dark){


html.classList.add("dark");


localStorage.setItem(
"theme",
"dark"
);



}else{


html.classList.remove("dark");


localStorage.setItem(
"theme",
"light"
);



}



},[dark]);





return (

<ThemeContext.Provider

value={{
dark,
setDark
}}

>

{children}

</ThemeContext.Provider>


);


}





export function useTheme(){

const context =
useContext(ThemeContext);


if(!context){

throw new Error(
"useTheme debe usarse dentro de ThemeProvider"
);

}


return context;


}