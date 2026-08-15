import {
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  useAuth
} from "../../auth/AuthContext";


import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2
} from "lucide-react";


const API =
  "https://script.google.com/macros/s/AKfycbxwziMsLeGmXj5EJ_8CfjVMGH4Jm5c-U2X5JB41ixfhfm88wEUS9ZZ4cfUaBBXevrAWzg/exec";


export default function TeacherLogin(){

  const navigate = useNavigate();

  const { login } = useAuth();


  const [correo,setCorreo] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [mostrarPassword,setMostrarPassword] =
    useState(false);

  const [error,setError] =
    useState("");

  const [cargando,setCargando] =
    useState(false);



  async function ingresar(){

    setError("");


    if(!correo.trim()){

      setError(
        "Ingrese su correo institucional."
      );

      return;

    }


    if(!password){

      setError(
        "Ingrese su contraseña."
      );

      return;

    }


    setCargando(true);


    try{

      const response =
        await fetch(API,{

          method:"POST",

          body:new URLSearchParams({

            accion:"loginDocente",

            correo:
              correo.trim().toLowerCase(),

            password

          })

        });


      const respuesta =
        await response.json();


      console.log(
        "RESPUESTA LOGIN DOCENTE:",
        respuesta
      );


      if(!respuesta.ok){

        setError(
          respuesta.mensaje ||
          "Correo o contraseña incorrectos."
        );

        return;

      }


      const docente = {

        nombre:
          respuesta.data.nombre,

        correo:
          respuesta.data.correo ||
          correo.trim().toLowerCase(),

        codigo:
          respuesta.data.codigo || "",

        rol:
          respuesta.data.rol

      };


      login(docente);


      localStorage.setItem(
        "usuario",
        JSON.stringify(docente)
      );


      navigate(
        "/teacher/dashboard"
      );


    }
    catch(error){

      console.error(
        error
      );

      setError(
        "No se pudo conectar con el servidor."
      );

    }
    finally{

      setCargando(false);

    }

  }



  return (

    <div className="w-full">


      {/* TITULO */}

      <div className="mb-8">

        <p className="
          text-sm
          font-semibold
          text-blue-600
          mb-2
        ">

          Acceso docente

        </p>


        <h1 className="
          text-3xl
          font-black
          text-slate-900
          tracking-tight
        ">

          Portal Docente

        </h1>


        <p className="
          text-sm
          text-slate-500
          mt-2
        ">

          Ingresa con tu cuenta institucional
          de Valle Grande.

        </p>

      </div>



      {/* FORMULARIO */}

      <div className="space-y-5">


        {/* CORREO */}

        <div>

          <label className="
            block
            text-sm
            font-semibold
            text-slate-700
            mb-2
          ">

            Correo institucional

          </label>


          <div className="relative">

            <Mail
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              "
            />


            <input

              type="email"

              value={correo}

              onChange={e =>
                setCorreo(e.target.value)
              }

              onKeyDown={e => {

                if(e.key === "Enter"){
                  ingresar();
                }

              }}

              placeholder="correo@vallegrande.edu.pe"

              autoComplete="email"

              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                text-slate-800
                placeholder:text-slate-400
                outline-none
                transition
                focus:bg-white
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-600/10
              "

            />

          </div>

        </div>



        {/* PASSWORD */}

        <div>

          <div className="
            flex
            items-center
            justify-between
            mb-2
          ">

            <label className="
              text-sm
              font-semibold
              text-slate-700
            ">

              Contraseña

            </label>

          </div>


          <div className="relative">

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              "
            />


            <input

              type={
                mostrarPassword
                  ? "text"
                  : "password"
              }

              value={password}

              onChange={e =>
                setPassword(e.target.value)
              }

              onKeyDown={e => {

                if(e.key === "Enter"){
                  ingresar();
                }

              }}

              placeholder="Ingresa tu contraseña"

              autoComplete="current-password"

              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-12
                text-sm
                text-slate-800
                placeholder:text-slate-400
                outline-none
                transition
                focus:bg-white
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-600/10
              "

            />


            <button

              type="button"

              onClick={() =>
                setMostrarPassword(
                  !mostrarPassword
                )
              }

              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-slate-400
                hover:text-blue-600
                hover:bg-blue-50
                transition
              "

              aria-label={
                mostrarPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }

            >

              {mostrarPassword
                ?
                <EyeOff size={18}/>
                :
                <Eye size={18}/>
              }

            </button>

          </div>

        </div>



        {/* ERROR */}

        {error && (

          <div className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-3
          ">

            <AlertCircle
              size={18}
              className="
                text-red-500
                shrink-0
                mt-0.5
              "
            />

            <p className="
              text-sm
              text-red-700
              font-medium
            ">

              {error}

            </p>

          </div>

        )}



        {/* BOTON */}

        <button

          type="button"

          onClick={ingresar}

          disabled={cargando}

          className="
            w-full
            h-12
            rounded-xl
            bg-blue-700
            hover:bg-blue-800
            disabled:bg-blue-400
            text-white
            font-bold
            flex
            items-center
            justify-center
            gap-2
            transition
            shadow-lg
            shadow-blue-700/20
            hover:-translate-y-0.5
            active:translate-y-0
          "

        >

          {cargando ? (

            <>

              <Loader2
                size={18}
                className="animate-spin"
              />

              Verificando...

            </>

          ) : (

            <>

              <LogIn size={18}/>

              Ingresar

            </>

          )}

        </button>


      </div>



      {/* INFORMACION */}

      <div className="
        mt-7
        pt-5
        border-t
        border-slate-100
        text-center
      ">

        <p className="
          text-xs
          text-slate-400
        ">

          Acceso exclusivo para docentes

        </p>


        <p className="
          text-xs
          text-slate-400
          mt-1
        ">

          Valle Grande · VG Smart Review

        </p>

      </div>


    </div>

  );

}