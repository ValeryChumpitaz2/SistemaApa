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
    ShieldCheck,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    AlertCircle,
    Loader2
} from "lucide-react";

import {
    loginAdministrador
} from "../../modules/teacher/services/teacherLoginService";


// ==================================================
// COMPONENTE
// ==================================================

export default function AdminLogin() {

    const navigate =
        useNavigate();


    const {
        login
    } = useAuth();


    // ==================================================
    // ESTADOS
    // ==================================================

    const [
        correo,
        setCorreo
    ] = useState("");


    const [
        password,
        setPassword
    ] = useState("");


    const [
        mostrarPassword,
        setMostrarPassword
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        cargando,
        setCargando
    ] = useState(false);


    // ==================================================
    // INGRESAR
    // ==================================================

    async function ingresar() {

        setError("");


        // ==================================================
        // VALIDAR CORREO
        // ==================================================

        if (!correo.trim()) {

            setError(
                "Ingrese el correo del administrador."
            );

            return;

        }


        // ==================================================
        // VALIDAR PASSWORD
        // ==================================================

        if (!password) {

            setError(
                "Ingrese la contraseña del administrador."
            );

            return;

        }


        setCargando(true);


        try {

            // ==================================================
            // LOGIN
            // ==================================================

            const datos =
                await loginAdministrador(
                    correo,
                    password
                );


            console.log(
                "ADMINISTRADOR LOGUEADO:",
                datos
            );


            // ==================================================
            // CREAR SESIÓN
            // ==================================================

            const administrador = {

                nombre:
                    datos?.nombre ||
                    "Administrador",

                correo:
                    datos?.correo ||
                    correo
                        .trim()
                        .toLowerCase(),

                rol:
                    datos?.rol ||
                    "ADMIN"

            };


            // ==================================================
            // AUTH CONTEXT
            // ==================================================

            login(
                administrador
            );


            // ==================================================
            // LOCAL STORAGE
            // ==================================================

            localStorage.setItem(
                "usuario",
                JSON.stringify(
                    administrador
                )
            );


            localStorage.setItem(
                "administrador",
                JSON.stringify(administrador)
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(administrador)
            );

            sessionStorage.setItem(
                "adminPassword",
                password
            );


            // ==================================================
            // IR AL DASHBOARD
            // ==================================================

            navigate(
                "/admin/dashboard"
            );

        }
        catch (error) {

            console.error(
                "ERROR LOGIN ADMIN:",
                error
            );


            setError(
                error.message ||
                "Credenciales de administrador incorrectas."
            );

        }
        finally {

            setCargando(false);

        }

    }


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <div className="w-full">


            {/* ==================================================
          TITULO
      ================================================== */}

            <div className="mb-8">

                <div className="
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-violet-100
          text-violet-700
        ">

                    <ShieldCheck
                        size={25}
                    />

                </div>


                <p className="
          mb-2
          text-sm
          font-semibold
          text-violet-600
        ">

                    Acceso administrativo

                </p>


                <h1 className="
          text-3xl
          font-black
          tracking-tight
          text-slate-900
        ">

                    Portal Administrador

                </h1>


                <p className="
          mt-2
          text-sm
          text-slate-500
        ">

                    Ingresa para administrar las
                    cuentas docentes.

                </p>

            </div>



            {/* ==================================================
          FORMULARIO
      ================================================== */}

            <div className="space-y-5">


                {/* ==================================================
            CORREO
        ================================================== */}

                <div>

                    <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-700
          ">

                        Correo del administrador

                    </label>


                    <div className="relative">

                        <Mail
                            size={18}
                            className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
                        />


                        <input

                            type="email"

                            value={
                                correo
                            }

                            onChange={
                                e =>
                                    setCorreo(
                                        e.target.value
                                    )
                            }

                            onKeyDown={
                                e => {

                                    if (
                                        e.key === "Enter"
                                    ) {

                                        ingresar();

                                    }

                                }
                            }

                            placeholder="admin@vallegrande.edu.pe"

                            autoComplete="username"

                            disabled={
                                cargando
                            }

                            className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-violet-600
                focus:bg-white
                focus:ring-4
                focus:ring-violet-600/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "

                        />

                    </div>

                </div>



                {/* ==================================================
            PASSWORD
        ================================================== */}

                <div>

                    <label className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-700
          ">

                        Contraseña

                    </label>


                    <div className="relative">

                        <Lock
                            size={18}
                            className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
                        />


                        <input

                            type={
                                mostrarPassword
                                    ? "text"
                                    : "password"
                            }

                            value={
                                password
                            }

                            onChange={
                                e =>
                                    setPassword(
                                        e.target.value
                                    )
                            }

                            onKeyDown={
                                e => {

                                    if (
                                        e.key === "Enter"
                                    ) {

                                        ingresar();

                                    }

                                }
                            }

                            placeholder="Ingresa tu contraseña"

                            autoComplete="current-password"

                            disabled={
                                cargando
                            }

                            className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-12
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-violet-600
                focus:bg-white
                focus:ring-4
                focus:ring-violet-600/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "

                        />


                        <button

                            type="button"

                            onClick={() =>
                                setMostrarPassword(
                                    !mostrarPassword
                                )
                            }

                            disabled={
                                cargando
                            }

                            className="
                absolute
                right-2
                top-1/2
                flex
                h-9
                w-9
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-violet-50
                hover:text-violet-600
                disabled:cursor-not-allowed
              "

                            aria-label={
                                mostrarPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }

                        >

                            {mostrarPassword ? (

                                <EyeOff
                                    size={18}
                                />

                            ) : (

                                <Eye
                                    size={18}
                                />

                            )}

                        </button>

                    </div>

                </div>



                {/* ==================================================
            ERROR
        ================================================== */}

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
                mt-0.5
                shrink-0
                text-red-500
              "
                        />


                        <p className="
              text-sm
              font-medium
              text-red-700
            ">

                            {error}

                        </p>

                    </div>

                )}



                {/* ==================================================
            BOTON
        ================================================== */}

                <button

                    type="button"

                    onClick={
                        ingresar
                    }

                    disabled={
                        cargando
                    }

                    className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-700
            font-bold
            text-white
            shadow-lg
            shadow-violet-700/20
            transition
            hover:-translate-y-0.5
            hover:bg-violet-800
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:bg-violet-400
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

                            <LogIn
                                size={18}
                            />

                            Ingresar como administrador

                        </>

                    )}

                </button>

            </div>



            {/* ==================================================
          INFORMACION
      ================================================== */}

            <div className="
        mt-7
        border-t
        border-slate-100
        pt-5
        text-center
      ">

                <p className="
          text-xs
          text-slate-400
        ">

                    Acceso restringido al administrador

                </p>


                <p className="
          mt-1
          text-xs
          text-slate-400
        ">

                    VG Smart Review · Valle Grande

                </p>

            </div>

        </div>

    );

}
