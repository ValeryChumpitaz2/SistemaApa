import {
  useState
} from "react";

import {
  ShieldCheck,
  GraduationCap,
  UserRound,
  ArrowLeft,
  Sparkles
} from "lucide-react";

import TeacherLogin from "../components/auth/TeacherLogin";
import GoogleLogin from "../components/auth/GoogleLogin";


export default function Login(){

  const [tipo,setTipo] = useState(null);


  return (

    <div className="
      min-h-screen
      bg-slate-100
      flex
      items-center
      justify-center
      px-4
      py-8
    ">


      {/* FONDO DECORATIVO */}

      <div className="
        fixed
        inset-0
        pointer-events-none
        overflow-hidden
      ">

        <div className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          rounded-full
          bg-blue-200/40
          blur-3xl
        "/>

        <div className="
          absolute
          -bottom-32
          -left-32
          w-96
          h-96
          rounded-full
          bg-indigo-200/30
          blur-3xl
        "/>

      </div>



      {/* CONTENEDOR */}

      <div className="
        relative
        w-full
        max-w-5xl
        min-h-[620px]
        bg-white
        rounded-[2rem]
        shadow-xl
        shadow-slate-300/40
        overflow-hidden
        grid
        lg:grid-cols-[0.9fr_1.1fr]
      ">


        {/* ============================= */}
        {/* PANEL IZQUIERDO */}
        {/* ============================= */}

        <div className="
          hidden
          lg:flex
          flex-col
          justify-between
          bg-gradient-to-br
          from-blue-800
          to-blue-950
          p-12
          text-white
          relative
          overflow-hidden
        ">


          {/* DECORACIÓN */}

          <div className="
            absolute
            -right-24
            -top-24
            w-72
            h-72
            rounded-full
            border
            border-white/10
          "/>

          <div className="
            absolute
            -right-10
            -top-10
            w-44
            h-44
            rounded-full
            border
            border-white/10
          "/>


          {/* MARCA */}

          <div className="
            relative
            flex
            items-center
            gap-3
          ">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-white/10
              border
              border-white/10
              flex
              items-center
              justify-center
            ">

              <ShieldCheck
                size={25}
              />

            </div>


            <div>

              <p className="
                font-black
                text-lg
                tracking-tight
              ">

                VG Smart Review

              </p>

              <p className="
                text-xs
                text-blue-200
              ">

                Plataforma académica

              </p>

            </div>

          </div>



          {/* TEXTO CENTRAL */}

          <div className="
            relative
            max-w-sm
          ">

            <div className="
              w-14
              h-1
              bg-blue-400
              rounded-full
              mb-7
            "/>


            <h2 className="
              text-4xl
              font-black
              leading-tight
            ">

              Evaluación académica
              <span className="
                block
                text-blue-300
              ">
                inteligente.
              </span>

            </h2>


            <p className="
              text-blue-100
              mt-5
              leading-relaxed
              text-sm
            ">

              Analiza tus documentos,
              revisa tus criterios y mejora
              tus entregables académicos
              de manera rápida y organizada.

            </p>


            <div className="
              mt-8
              flex
              items-center
              gap-3
              text-sm
              text-blue-100
            ">

              <div className="
                w-8
                h-8
                rounded-lg
                bg-white/10
                flex
                items-center
                justify-center
              ">

                <Sparkles size={16}/>

              </div>

              Sistema de revisión automatizada

            </div>

          </div>



          {/* PIE */}

          <div className="
            relative
            text-xs
            text-blue-300
          ">

            © 2026 Valle Grande

          </div>

        </div>



        {/* ============================= */}
        {/* PANEL DERECHO */}
        {/* ============================= */}

        <div className="
          flex
          flex-col
          justify-center
          px-6
          py-10
          sm:px-10
          lg:px-14
        ">


          {/* MARCA MOBILE */}

          <div className="
            lg:hidden
            flex
            items-center
            justify-center
            gap-2
            mb-8
          ">

            <div className="
              w-9
              h-9
              rounded-lg
              bg-blue-700
              text-white
              flex
              items-center
              justify-center
            ">

              <ShieldCheck size={21}/>

            </div>


            <span className="
              font-black
              text-slate-800
            ">

              VG Smart Review

            </span>

          </div>



          {/* SELECCIÓN DE TIPO */}

          {!tipo && (

            <div className="
              w-full
              max-w-md
              mx-auto
            ">


              <div className="
                mb-8
              ">

                <p className="
                  text-sm
                  font-semibold
                  text-blue-600
                  mb-2
                ">

                  Bienvenido

                </p>


                <h1 className="
                  text-3xl
                  font-black
                  text-slate-900
                  tracking-tight
                ">

                  ¿Cómo deseas ingresar?

                </h1>


                <p className="
                  text-sm
                  text-slate-500
                  mt-2
                ">

                  Selecciona el tipo de cuenta
                  para continuar.

                </p>

              </div>



              <div className="
                space-y-4
              ">


                {/* DOCENTE */}

                <button

                  onClick={() =>
                    setTipo("DOCENTE")
                  }

                  className="
                    w-full
                    group
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-left
                    transition-all
                    duration-200
                    hover:border-blue-400
                    hover:bg-blue-50/40
                    hover:shadow-md
                  "

                >

                  <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition
                  ">

                    <UserRound size={24}/>

                  </div>


                  <div className="flex-1">

                    <p className="
                      font-bold
                      text-slate-800
                    ">

                      Soy docente

                    </p>


                    <p className="
                      text-sm
                      text-slate-500
                      mt-1
                    ">

                      Acceso con correo institucional

                    </p>

                  </div>


                  <span className="
                    text-slate-300
                    group-hover:text-blue-600
                    text-xl
                    transition
                  ">

                    →

                  </span>

                </button>



                {/* ESTUDIANTE */}

                <button

                  onClick={() =>
                    setTipo("ESTUDIANTE")
                  }

                  className="
                    w-full
                    group
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-left
                    transition-all
                    duration-200
                    hover:border-emerald-400
                    hover:bg-emerald-50/40
                    hover:shadow-md
                  "

                >

                  <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-emerald-100
                    text-emerald-700
                    flex
                    items-center
                    justify-center
                    shrink-0
                    group-hover:bg-emerald-600
                    group-hover:text-white
                    transition
                  ">

                    <GraduationCap
                      size={24}
                    />

                  </div>


                  <div className="flex-1">

                    <p className="
                      font-bold
                      text-slate-800
                    ">

                      Soy estudiante

                    </p>


                    <p className="
                      text-sm
                      text-slate-500
                      mt-1
                    ">

                      Ingreso con Google institucional

                    </p>

                  </div>


                  <span className="
                    text-slate-300
                    group-hover:text-emerald-600
                    text-xl
                    transition
                  ">

                    →

                  </span>

                </button>


              </div>


              <p className="
                text-center
                text-xs
                text-slate-400
                mt-8
              ">

                Acceso seguro para la comunidad
                académica de Valle Grande.

              </p>

            </div>

          )}



          {/* ============================= */}
          {/* LOGIN */}
          {/* ============================= */}

          {tipo && (

            <div className="
              w-full
              max-w-md
              mx-auto
            ">


              {/* VOLVER */}

              <button

                onClick={() =>
                  setTipo(null)
                }

                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-slate-500
                  hover:text-blue-600
                  transition
                  mb-7
                "

              >

                <ArrowLeft size={16}/>

                Cambiar tipo de acceso

              </button>



              {tipo === "DOCENTE" && (

                <TeacherLogin/>

              )}



              {tipo === "ESTUDIANTE" && (

                <GoogleLogin/>

              )}

            </div>

          )}


        </div>


      </div>

    </div>

  );

}