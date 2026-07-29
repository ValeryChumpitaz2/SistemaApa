import {
  useState
} from "react";


import {
  Search,
  CheckCircle,
  LoaderCircle
} from "lucide-react";


import {
  analyzeDocument
} from "../services/studentService";



export default function SubmitDocument({
  setDocumentos
}) {


  const [
    url,
    setUrl
  ] = useState("");



  const [
    loading,
    setLoading
  ] = useState(false);




  const [
    mensaje,
    setMensaje
  ] = useState("");






  async function enviar(e){


    e.preventDefault();



    if(!url.trim()){

      alert(
        "Ingresa el enlace del documento"
      );

      return;

    }




    try{


      setLoading(true);

      setMensaje("");



      const data =
      await analyzeDocument(url);






      const documento = {


        nombre:
        data.resumen?.nombre ||
        "Documento académico",



        resumen:
        data.resumen,



        puntaje:
        data.puntaje,



        criterios:
        data.criterios || [],



        fecha:
        new Date()
        .toLocaleDateString()

      };








      setDocumentos(

        prev => [

          ...prev,

          documento

        ]

      );





      setMensaje(
        "Documento analizado correctamente"
      );



      setUrl("");



    }


    catch(error){


      console.error(error);



      alert(
        "No se pudo analizar el documento"
      );


    }


    finally{


      setLoading(false);


    }



  }








  return (


    <div

      className="
      space-y-6
      "

    >






      <div

        className="
        bg-white
        dark:bg-slate-900
        border
        dark:border-slate-800
        rounded-3xl
        p-8
        shadow
        "

      >




        <h3

          className="
          text-xl
          font-black
          text-gray-800
          dark:text-white
          "

        >

          Evaluador institucional

        </h3>




        <p

          className="
          text-gray-500
          mt-2
          "

        >

          Ingresa el enlace de tu Google Docs
          para analizar estructura y normas APA.

        </p>








        <form

          onSubmit={enviar}

          className="
          mt-6
          flex
          flex-col
          md:flex-row
          gap-4
          "

        >





          <input


            type="url"


            value={url}


            onChange={
              e=>setUrl(e.target.value)
            }


            placeholder="
            https://docs.google.com/document/...
            "


            className="
            flex-1
            p-4
            rounded-xl
            border
            dark:bg-slate-800
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-blue-600
            "


          />







          <button


            disabled={loading}


            className="
            bg-[#1D3681]
            text-white
            px-8
            py-3
            rounded-xl
            font-bold
            flex
            items-center
            justify-center
            gap-2
            disabled:opacity-50
            "


          >


            {
              loading

              ?

              <>

              <LoaderCircle
                className="
                animate-spin
                "
              />

              Analizando...

              </>


              :

              <>

              <Search size={20}/>

              Analizar documento

              </>

            }


          </button>






        </form>







        {
          mensaje &&


          <div

            className="
            mt-6
            bg-green-100
            text-green-700
            rounded-xl
            p-4
            flex
            items-center
            gap-3
            font-semibold
            "

          >

            <CheckCircle/>

            {mensaje}


          </div>


        }





      </div>





    </div>


  );


}