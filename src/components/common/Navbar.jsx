import { FileCheck, Sparkles } from "lucide-react";


export default function Navbar(){

  return (

    <nav
      className="
        fixed
        top-0
        w-full
        z-50
        border-b
        border-slate-200/50
        bg-white/80
        backdrop-blur-xl
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          py-4
          flex
          justify-between
          items-center
        "
      >


        {/* Logo */}

        <div className="
          flex
          items-center
          gap-3
        ">


          <div
            className="
              relative
              bg-gradient-to-br
              from-blue-700
              to-indigo-600
              text-white
              p-3
              rounded-2xl
              shadow-lg
            "
          >

            <FileCheck size={26}/>


            <div className="
              absolute
              -top-1
              -right-1
              bg-cyan-400
              rounded-full
              p-1
            ">

              <Sparkles size={10}/>

            </div>


          </div>




          <div>

            <h1
              className="
                font-bold
                text-xl
                text-slate-900
                leading-none
              "
            >

              APA Reviewer

            </h1>


            <span
              className="
                text-xs
                text-slate-500
              "
            >

              Sistema institucional

            </span>


          </div>


        </div>





        {/* Botón */}

        <a
          href="/login"
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            shadow-md
            hover:bg-blue-700
            hover:shadow-lg
            transition-all
          "
        >

          Ingresar

        </a>


      </div>


    </nav>

  );

}