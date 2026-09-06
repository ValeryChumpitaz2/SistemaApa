import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const AuthContext =
  createContext();


/*
==================================================
API
==================================================
*/

const API =
  "https://script.google.com/macros/s/AKfycbxMRbtzWBNqDtmySn3XMtOY6bw9dotPi4hX4IcJ5wRvu_W2Jwl1h7IRyHQqcEzyC6NkjQ/exec";


/*
==================================================
AUTH PROVIDER
==================================================
*/

export function AuthProvider({
  children,
}) {

  const [
    user,
    setUser,
  ] = useState(null);


  /*
  ==================================================
  CARGAR SESIÓN
  ==================================================
  */

  useEffect(() => {

    const guardado =
      localStorage.getItem(
        "usuario"
      );


    if (!guardado) {
      return;
    }


    try {

      const usuario =
        JSON.parse(
          guardado
        );


      setUser(
        usuario
      );


    } catch (error) {

      console.error(
        "Error cargando sesión:",
        error
      );


      localStorage.removeItem(
        "usuario"
      );

    }

  }, []);


  /*
  ==================================================
  REGISTRAR USUARIO
  ==================================================
  */

  function registrarUsuario(
    usuario
  ) {

    const usuarios =
      JSON.parse(
        localStorage.getItem(
          "usuarios"
        )
      ) || [];


    const existe =
      usuarios.find(
        u =>
          u.correo ===
          usuario.correo
      );


    if (!existe) {

      usuarios.push({

        ...usuario,

        fechaRegistro:
          new Date().toISOString(),

      });


      localStorage.setItem(
        "usuarios",
        JSON.stringify(
          usuarios
        )
      );

    }

  }


  /*
  ==================================================
  LOGIN ESTUDIANTE
  ==================================================
  */

  function login(
    usuario
  ) {

    const nuevoUsuario = {

      ...usuario,

      rol:
        usuario.rol
          ?.toUpperCase()
        || "ESTUDIANTE",

    };


    setUser(
      nuevoUsuario
    );


    localStorage.setItem(
      "usuario",
      JSON.stringify(
        nuevoUsuario
      )
    );


    registrarUsuario(
      nuevoUsuario
    );


    return nuevoUsuario;

  }


  /*
  ==================================================
  LOGIN DOCENTE
  ==================================================
  */

  async function loginDocente(
    correo,
    password
  ) {

    const correoLimpio =
      String(correo || "")
        .trim()
        .toLowerCase();


    const passwordLimpia =
      String(password || "");


    if (!correoLimpio) {

      throw new Error(
        "Ingrese su correo institucional."
      );

    }


    if (!passwordLimpia) {

      throw new Error(
        "Ingrese su contraseña."
      );

    }


    /*
    ================================================
    PETICIÓN AL BACKEND
    ================================================
    */

    const response =
      await fetch(
        API,
        {

          method: "POST",

          body:
            new URLSearchParams({

              accion:
                "loginDocente",

              correo:
                correoLimpio,

              password:
                passwordLimpia,

            }),

        }
      );


    /*
    ================================================
    RESPUESTA
    ================================================
    */

    const respuesta =
      await response.json();


    console.log(
      "RESPUESTA LOGIN DOCENTE:",
      respuesta
    );


    /*
    ================================================
    VALIDAR
    ================================================
    */

    if (!respuesta.ok) {

      throw new Error(

        respuesta.mensaje
        ||
        "Correo o contraseña incorrectos."

      );

    }


    /*
    ================================================
    DATOS DEL BACKEND
    ================================================
    */

    const nombreBackend =
      respuesta.data?.nombre
      || "Docente";


    const correoBackend =
      respuesta.data?.correo
      || correoLimpio;


    /*
    ================================================
    CREAR USUARIO DOCENTE
    ================================================
    */

    const docente = {

      nombre:
        nombreBackend,

      usuario:
        nombreBackend,

      correo:
        correoBackend,

      codigo:
        respuesta.data?.codigo
        || "",

      rol:
        "DOCENTE",

      debeCambiarPassword:
        Boolean(
          respuesta.data
            ?.debeCambiarPassword
        ),

      foto:
        "",

      institucion:
        "Valle Grande",

      especialidad:
        "Docente académico",

      configuracion: {

        aprobacion:
          70,

        critico:
          50,

        notificaciones:
          true,

      },

    };


    /*
    ================================================
    GUARDAR SESIÓN
    ================================================
    */

    setUser(
      docente
    );


    localStorage.setItem(
      "usuario",
      JSON.stringify(
        docente
      )
    );


    /*
    ================================================
    RETORNAR
    ================================================
    */

    return docente;

  }


  /*
  ==================================================
  ACTUALIZAR PERFIL
  ==================================================
  */

  function updateUser(
    datos
  ) {

    setUser(
      usuarioActual => {

        /*
        ============================================
        SI NO EXISTE USUARIO
        ============================================
        */

        if (!usuarioActual) {

          return usuarioActual;

        }


        /*
        ============================================
        CREAR USUARIO ACTUALIZADO
        ============================================
        */

        const actualizado = {

          ...usuarioActual,

          ...datos,

        };


        /*
        ============================================
        GUARDAR SESIÓN ACTUAL
        ============================================
        */

        localStorage.setItem(
          "usuario",
          JSON.stringify(
            actualizado
          )
        );


        /*
        ============================================
        ACTUALIZAR LISTA DE USUARIOS
        ============================================
        */

        const usuarios =
          JSON.parse(
            localStorage.getItem(
              "usuarios"
            )
          ) || [];


        const listaNueva =
          usuarios.map(
            usuario => {

              if (
                usuario.correo ===
                actualizado.correo
              ) {

                return {
                  ...usuario,
                  ...actualizado,
                };

              }


              return usuario;

            }
          );


        /*
        ============================================
        SI NO EXISTÍA, AGREGARLO
        ============================================
        */

        const existe =
          usuarios.some(
            usuario =>
              usuario.correo ===
              actualizado.correo
          );


        if (!existe) {

          listaNueva.push(
            actualizado
          );

        }


        localStorage.setItem(
          "usuarios",
          JSON.stringify(
            listaNueva
          )
        );


        /*
        ============================================
        DEVOLVER NUEVO ESTADO
        ============================================
        */

        return actualizado;

      }
    );

  }


  /*
  ==================================================
  OBTENER USUARIOS
  ==================================================
  */

  function obtenerUsuarios() {

    return (

      JSON.parse(
        localStorage.getItem(
          "usuarios"
        )
      )

      || []

    );

  }


  /*
  ==================================================
  OBTENER ESTUDIANTES
  ==================================================
  */

  function obtenerEstudiantes() {

    return obtenerUsuarios()
      .filter(
        usuario =>
          usuario.rol ===
          "ESTUDIANTE"
      );

  }


  /*
  ==================================================
  GUARDAR COMUNICACIÓN
  ==================================================
  */

  function guardarComunicacion(
    data
  ) {

    const historial =
      JSON.parse(
        localStorage.getItem(
          "comunicaciones"
        )
      ) || [];


    historial.push({

      id:
        Date.now(),

      docente:
        user?.correo,

      fecha:
        new Date().toISOString(),

      ...data,

    });


    localStorage.setItem(
      "comunicaciones",
      JSON.stringify(
        historial
      )
    );

  }


  /*
  ==================================================
  OBTENER COMUNICACIONES
  ==================================================
  */

  function obtenerComunicaciones() {

    return (

      JSON.parse(
        localStorage.getItem(
          "comunicaciones"
        )
      )

      || []

    );

  }


  /*
  ==================================================
  LOGOUT
  ==================================================
  */

  function logout() {

    setUser(
      null
    );


    localStorage.removeItem(
      "usuario"
    );

  }


  /*
  ==================================================
  CONTEXTO
  ==================================================
  */

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        loginDocente,

        updateUser,

        logout,

        obtenerUsuarios,

        obtenerEstudiantes,

        guardarComunicacion,

        obtenerComunicaciones,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


/*
==================================================
HOOK useAuth
==================================================
*/

export function useAuth() {

  const context =
    useContext(
      AuthContext
    );


  if (!context) {

    throw new Error(
      "useAuth debe usarse dentro de AuthProvider"
    );

  }


  return context;

}
