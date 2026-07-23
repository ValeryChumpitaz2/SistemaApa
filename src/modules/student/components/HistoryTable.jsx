import {
  FileText,
  CheckCircle,
  Clock
} from "lucide-react";


export default function HistoryTable({
  documentos = []
}) {


  return (

    <div className="
      bg-white
      rounded-2xl
      shadow
      p-8
    ">


      {
        documentos.length === 0

        ?

        <div className="
          text-center
          py-8
        ">

          <FileText

            className="
              mx-auto
              text-gray-400
            "

            size={45}

          />


          <h3 className="
            text-xl
            font-bold
            mt-4
          ">

            Aún no tienes revisiones

          </h3>



          <p className="
            text-gray-500
            mt-2
          ">

            Cuando analices un documento aparecerá aquí.

          </p>


        </div>


        :


        <div className="
          space-y-4
        ">


          {
            documentos.map(

              (documento,index)=>(


                <div

                  key={index}

                  className="
                    border
                    rounded-2xl
                    p-5
                    flex
                    justify-between
                    items-center
                    hover:bg-gray-50
                    transition
                  "

                >


                  <div>


                    <h3 className="
                      font-bold
                      text-lg
                      text-gray-800
                    ">

                      {documento.nombre}

                    </h3>


                    <p className="
                      text-gray-500
                      text-sm
                      mt-1
                    ">

                      Fecha:
                      {" "}
                      {documento.fecha || "Hoy"}

                    </p>


                  </div>




                  <div className="
                    flex
                    items-center
                    gap-6
                  ">



                    <div className="
                      text-center
                    ">


                      <p className="
                        text-sm
                        text-gray-500
                      ">

                        Resultado

                      </p>



                      <p className="
                        text-xl
                        font-black
                        text-blue-900
                      ">

                        {
                          documento.puntaje?.porcentaje ?? 0
                        }%

                      </p>


                    </div>




                    {

                      Number(
                        documento.puntaje?.porcentaje ?? 0
                      ) >= 70

                      ?

                      <CheckCircle

                        size={30}

                        className="
                          text-green-600
                        "

                      />


                      :

                      <Clock

                        size={30}

                        className="
                          text-orange-500
                        "

                      />

                    }



                  </div>


                </div>


              )

            )

          }


        </div>


      }


    </div>

  );

}
