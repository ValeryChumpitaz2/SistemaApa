import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const AuthContext = createContext();


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

export function AuthProvider({ children }) {


  const [user, setUser] =
    useState(null);


  /*
  ==================================================
  CARGAR SESIÓN
  ==================================================
  */

  useEffect(() => {

    const guardado =
      localStorage.getItem("usuario");


    if (guardado) {

      try {

        const usuario =
          JSON.parse(guardado);


        setUser(usuario);


      } catch (error) {

        console.error(
          "Error cargando sesión:",
          error
        );


        localStorage.removeItem(
          "usuario"
        );

      }

    }

  }, []);


  /*
  ==================================================
  REGISTRAR USUARIO
  ==================================================
  */

  function registrarUsuario(usuario) {


    const usuarios =
      JSON.parse(
        localStorage.getItem("usuarios")
      ) || [];


    const existe =
      usuarios.find(
        u =>
          u.correo === usuario.correo
      );


    if (!existe) {

      usuarios.push({

        ...usuario,

        fechaRegistro:
          new Date().toISOString()

      });


      localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
      );

    }

  }


  /*
  ==================================================
  LOGIN ESTUDIANTE
  ==================================================
  
  Este login lo utiliza Google.
  
  El rol de estudiante se asigna
  porque este método está destinado
  al acceso de estudiantes.
  
  ==================================================
  */

  function login(usuario) {


    const nuevoUsuario = {

      ...usuario,

      rol:
        usuario.rol?.toUpperCase()
        || "ESTUDIANTE"

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
  
  El frontend NO decide que el usuario
  es docente.
  
  Se consulta al backend.
  
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
    ENVIAR AL BACKEND
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
                passwordLimpia

            })

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
    VALIDAR RESPUESTA
    ================================================
    */

    if (
      !respuesta.ok
    ) {

      throw new Error(

        respuesta.mensaje
        ||
        "Correo o contraseña incorrectos."

      );

    }


    /*
    ================================================
    CREAR USUARIO DOCENTE
    ================================================
    */

    const docente = {

      nombre:
        respuesta.data?.nombre
        || "Docente",

      correo:
        respuesta.data?.correo
        || correoLimpio,

      rol:
        "DOCENTE"

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
    RETORNAR DOCENTE
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


    const actualizado = {

      ...user,

      ...datos

    };


    setUser(
      actualizado
    );


    localStorage.setItem(
      "usuario",
      JSON.stringify(
        actualizado
      )
    );


    /*
    Actualizar también
    lista local de usuarios
    */

    const usuarios =
      obtenerUsuarios();


    const listaNueva =
      usuarios.map(
        usuario =>

          usuario.correo ===
          actualizado.correo

            ? actualizado

            : usuario
      );


    localStorage.setItem(
      "usuarios",
      JSON.stringify(
        listaNueva
      )
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

      ||

      []

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

      ...data

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

      ||

      []

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

        /*
        Usuario actual
        */

        user,


        /*
        Autenticación estudiante
        */

        login,


        /*
        Autenticación docente
        */

        loginDocente,


        /*
        Cerrar sesión
        */

        logout,


        /*
        Perfil
        */

        updateUser,


        /*
        Usuarios
        */

        obtenerUsuarios,

        obtenerEstudiantes,


        /*
        Comunicaciones
        */

        guardarComunicacion,

        obtenerComunicaciones

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