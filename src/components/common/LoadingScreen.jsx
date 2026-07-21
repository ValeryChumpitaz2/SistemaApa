import { FileCheck, Sparkles } from "lucide-react";


export default function LoadingScreen(){

  return (

    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        flex-col
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-950
        via-blue-900
        to-indigo-700
        text-white
      "
    >


      {/* Logo */}

      <div
        className="
          relative
          flex
          items-center
          justify-center
          w-24
          h-24
          rounded-3xl
          bg-white/10
          backdrop-blur
          animate-pulse
        "
      >

        <FileCheck size={50}/>


        <div
          className="
            absolute
            -top-2
            -right-2
            bg-cyan-400
            text-blue-950
            p-2
            rounded-full
          "
        >

          <Sparkles size={18}/>

        </div>


      </div>




      {/* Nombre */}

      <h1
        className="
          mt-8
          text-4xl
          font-bold
        "
      >
        APA Reviewer
      </h1>


      <p
        className="
          mt-2
          text-blue-200
        "
      >
        Sistema institucional de revisión académica
      </p>




      {/* Barra */}

      <div
        className="
          mt-10
          w-64
          h-2
          bg-white/20
          rounded-full
          overflow-hidden
        "
      >

        <div
          className="
            h-full
            bg-cyan-400
            rounded-full
            animate-loading
          "
        />

      </div>



      <p
        className="
          mt-4
          text-sm
          text-blue-200
        "
      >
        Analizando plataforma...
      </p>


    </div>

  );

}