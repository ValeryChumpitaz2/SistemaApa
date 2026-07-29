import {
  FileText,
  Sparkles
} from "lucide-react";


import SubmitDocument from "../components/SubmitDocument";



export default function Evaluation({
  setDocumentos
}) {


  return (

    <div

      className="
      space-y-8
      "

    >



      {/* TITULO */}

      <section>

        <h1

          className="
          text-3xl
          font-black
          text-gray-800
          dark:text-white
          "

        >

          Nueva evaluación 📄

        </h1>


        <p

          className="
          text-gray-500
          mt-2
          "

        >

          Analiza tu documento académico y recibe
          recomendaciones para mejorar tus normas APA.

        </p>


      </section>








      {/* INFORMACION */}

      <div

        className="
        grid
        md:grid-cols-3
        gap-5
        "

      >


        <InfoCard

          icon={<FileText/>}

          titulo="Documento"

          texto="Google Docs académico"

        />



        <InfoCard

          icon={<Sparkles/>}

          titulo="Análisis IA"

          texto="Normas APA y estructura"

        />



        <InfoCard

          icon={<Sparkles/>}

          titulo="Resultado"

          texto="Reporte personalizado"

        />


      </div>









      {/* FORMULARIO REAL */}

      <SubmitDocument

        setDocumentos={setDocumentos}

      />





    </div>

  );

}







function InfoCard({
  icon,
  titulo,
  texto
}){


return (

<div

className="
bg-white
dark:bg-slate-900
border
dark:border-slate-800
rounded-3xl
p-6
shadow
"

>


<div

className="
text-blue-600
mb-3
"

>

{icon}

</div>



<h3

className="
font-black
text-gray-800
dark:text-white
"

>

{titulo}

</h3>



<p

className="
text-gray-500
text-sm
"

>

{texto}

</p>



</div>

);


}