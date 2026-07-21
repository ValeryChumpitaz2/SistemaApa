import {
  BrowserRouter
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";


import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/common/LoadingScreen";


export default function App() {


  const [loading,setLoading] = useState(true);



  useEffect(()=>{


    const timer = setTimeout(()=>{

      setLoading(false);

    },2000);



    return ()=>clearTimeout(timer);


  },[]);



  return (

    <BrowserRouter>


      {
        loading
        ?
        <LoadingScreen/>
        :
        <AppRoutes/>
      }


    </BrowserRouter>

  );


}