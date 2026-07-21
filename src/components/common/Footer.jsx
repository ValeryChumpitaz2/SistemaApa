import { FileCheck } from "lucide-react";


export default function Footer(){

  return(

    <footer className="
      bg-slate-950
      text-white
      py-10
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-6
      ">


        {/* Marca */}

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            bg-blue-600
            p-2
            rounded-xl
          ">

            <FileCheck size={22}/>

          </div>


          <div>

            <h3 className="
              font-bold
              text-lg
            ">
              APA Reviewer
            </h3>


            <p className="
              text-sm
              text-slate-400
            ">
              Sistema institucional de revisión académica
            </p>

          </div>


        </div>




        {/* Copyright */}

        <p className="
          text-sm
          text-slate-400
          text-center
        ">

          © 2026 APA Reviewer.
          Todos los derechos reservados.
          <br className="md:hidden"/>
          {" "}Valery Chumpitaz

        </p>


      </div>


    </footer>

  );

}