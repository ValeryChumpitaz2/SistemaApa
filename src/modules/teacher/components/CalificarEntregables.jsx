// ============================================================
// CALIFICAR ENTREGABLES
// ARCHIVO: CalificarEntregables.jsx
// ============================================================

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Cloud,
  GraduationCap,
  Loader2,
  RefreshCw,
  Search,
  Send,
  Users,
} from "lucide-react";

import { useAuth } from "../../../auth/AuthContext";

// IMPORTANTE:
// Toda la comunicación con Google Classroom pasa por este service.
// NO colocar API_URL ni fetch directamente en este JSX.
import classroomService from "../services/classroomService";


// ============================================================
// UNIDADES DIDÁCTICAS
// ============================================================

const UNIDADES_DIDACTICAS = [
  {
    codigo: "ASE262M1",
    nombre: "Experiencias Formativas 1",
    numero: 1,
  },

  {
    codigo: "ASE261M1",
    nombre: "Experiencias Formativas 2",
    numero: 2,
  },

  {
    codigo: "ASE252M2",
    nombre: "Experiencias Formativas 3",
    numero: 3,
  },

  {
    codigo: "ASE251M2",
    nombre: "Experiencias Formativas 4",
    numero: 4,
  },

  {
    codigo: "ASE242M3",
    nombre: "Experiencias Formativas 5",
    numero: 5,
  },

  {
    codigo: "AS241M3",
    nombre: "Experiencias Formativas 6",
    numero: 6,
  },
];


// ============================================================
// HELPERS
// ============================================================

function normalizarTexto(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}


function formatearNota(valor) {
  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    return "0";
  }

  return numero
    .toFixed(2)
    .replace(/\.00$/, "");
}


function obtenerListaRespuesta(respuesta, claves = []) {
  if (Array.isArray(respuesta)) {
    return respuesta;
  }

  for (const clave of claves) {
    if (Array.isArray(respuesta?.[clave])) {
      return respuesta[clave];
    }

    if (Array.isArray(respuesta?.data?.[clave])) {
      return respuesta.data[clave];
    }
  }

  if (Array.isArray(respuesta?.data)) {
    return respuesta.data;
  }

  return [];
}


function obtenerIdCurso(curso) {
  return (
    curso?.id ||
    curso?.courseId ||
    curso?.course_id ||
    ""
  );
}


function obtenerNombreCurso(curso) {
  return (
    curso?.name ||
    curso?.nombre ||
    curso?.courseName ||
    curso?.title ||
    curso?.section ||
    ""
  );
}

function obtenerIdActividad(actividad) {
  return (
    actividad?.id ||
    actividad?.courseWorkId ||
    actividad?.courseworkId ||
    actividad?.course_work_id ||
    ""
  );
}


function obtenerNombreActividad(actividad) {
  return (
    actividad?.title ||
    actividad?.titulo ||
    actividad?.nombre ||
    actividad?.name ||
    "Actividad sin nombre"
  );
}



// ============================================================
// BUSCAR CURSO PARA UNA UNIDAD
// ============================================================

function encontrarCursoParaUnidad(
  cursos,
  unidad
) {
  if (!unidad || !Array.isArray(cursos)) {
    return null;
  }

  const codigoUnidad =
    normalizarTexto(unidad.codigo);

  const nombreUnidad =
    normalizarTexto(unidad.nombre);

  // ----------------------------------------------------------
  // 1. Buscar coincidencia exacta por código
  // ----------------------------------------------------------

  let encontrado = cursos.find((curso) => {
    const texto = normalizarTexto(
      [
        curso?.name,
        curso?.nombre,
        curso?.courseName,
        curso?.section,
        curso?.description,
        curso?.codigo,
        curso?.codigoCurso,
      ]
        .filter(Boolean)
        .join(" ")
    );

    return (
      texto.includes(codigoUnidad) &&
      Boolean(obtenerIdCurso(curso))
    );
  });

  if (encontrado) {
    return encontrado;
  }

  // ----------------------------------------------------------
  // 2. Buscar por nombre completo
  // ----------------------------------------------------------

  encontrado = cursos.find((curso) => {
    const texto = normalizarTexto(
      [
        curso?.name,
        curso?.nombre,
        curso?.courseName,
        curso?.section,
        curso?.description,
      ]
        .filter(Boolean)
        .join(" ")
    );

    return (
      texto.includes(nombreUnidad) &&
      Boolean(obtenerIdCurso(curso))
    );
  });

  if (encontrado) {
    return encontrado;
  }

  // ----------------------------------------------------------
  // 3. Buscar por "Experiencias Formativas X"
  // ----------------------------------------------------------

  const numero =
    String(unidad.numero || "");

  encontrado = cursos.find((curso) => {
    const texto = normalizarTexto(
      [
        curso?.name,
        curso?.nombre,
        curso?.courseName,
        curso?.section,
        curso?.description,
      ]
        .filter(Boolean)
        .join(" ")
    );

    return (
      texto.includes(
        `experiencias formativas ${numero}`
      ) &&
      Boolean(obtenerIdCurso(curso))
    );
  });

  return encontrado || null;
}


// ============================================================
// COMPONENTE
// ============================================================

export default function CalificarEntregables() {

  const { user } = useAuth();


  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [unidad, setUnidad] =
    useState(null);

  const [cursos, setCursos] =
    useState([]);

  const [curso, setCurso] =
    useState(null);

  const [actividades, setActividades] =
    useState([]);

  const [actividad, setActividad] =
    useState(null);

  const [alumnos, setAlumnos] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [cargandoCursos, setCargandoCursos] =
    useState(false);

  const [cargandoActividades, setCargandoActividades] =
    useState(false);

  const [cargandoResultados, setCargandoResultados] =
    useState(false);

  const [enviando, setEnviando] =
    useState(false);

  const [mensaje, setMensaje] =
    useState("");

  const [error, setError] =
    useState("");

  const [estado, setEstado] =
    useState("inicial");


  // ==========================================================
  // CARGAR CURSOS
  // ==========================================================

  const cargarCursos = async () => {

    setCargandoCursos(true);

    setError("");

    try {

      console.log(
        "CLASSROOM: obteniendo cursos..."
      );

      const respuesta =
        await classroomService.obtenerCursos();

      console.log(
        "CLASSROOM CURSOS:",
        respuesta
      );

      const lista =
        obtenerListaRespuesta(
          respuesta,
          [
            "cursos",
            "courses",
          ]
        );

      setCursos(lista);

      return lista;

    }
    catch (err) {

      console.error(
        "ERROR OBTENIENDO CURSOS:",
        err
      );

      throw err;

    }
    finally {

      setCargandoCursos(false);

    }
  };


  // ==========================================================
  // CARGAR ACTIVIDADES
  // ==========================================================

  const cargarActividades = async (
    unidadSeleccionada,
    cursosDisponibles = null
  ) => {

    if (!unidadSeleccionada) {
      return;
    }

    setCargandoActividades(true);

    setError("");

    setMensaje("");

    setActividad(null);

    setActividades([]);

    setAlumnos([]);

    setCurso(null);

    setEstado("cargando");


    try {

      // ------------------------------------------------------
      // OBTENER CURSOS
      // ------------------------------------------------------

      let listaCursos =
        Array.isArray(cursosDisponibles)
          ? cursosDisponibles
          : cursos;

      if (!listaCursos.length) {

        listaCursos =
          await cargarCursos();

      }


      // ------------------------------------------------------
      // ENCONTRAR CURSO DE LA UNIDAD
      // ------------------------------------------------------

      const cursoEncontrado =
        encontrarCursoParaUnidad(
          listaCursos,
          unidadSeleccionada
        );


      if (!cursoEncontrado) {

        throw new Error(
          `No se encontró un curso de Google Classroom para "${unidadSeleccionada.nombre}" (${unidadSeleccionada.codigo}).`
        );

      }


      const courseId =
        obtenerIdCurso(
          cursoEncontrado
        );


      if (!courseId) {

        throw new Error(
          "El curso encontrado no tiene courseId."
        );

      }


      console.log(
        "CLASSROOM CURSO ENCONTRADO:",
        cursoEncontrado
      );

      console.log(
        "CLASSROOM courseId:",
        courseId
      );


      setCurso({
        ...cursoEncontrado,
        id: courseId,
      });


      // ------------------------------------------------------
      // OBTENER ACTIVIDADES
      // ------------------------------------------------------

      const respuesta =
        await classroomService.obtenerActividades(
          courseId
        );


      console.log(
        "CLASSROOM ACTIVIDADES:",
        respuesta
      );


      const lista =
        obtenerListaRespuesta(
          respuesta,
          [
            "actividades",
            "activities",
            "courseWork",
          ]
        );


      const actividadesValidas =
        lista.filter(
          (item) =>
            Boolean(
              obtenerIdActividad(item)
            )
        );


      setActividades(
        actividadesValidas
      );


      if (!actividadesValidas.length) {

        setMensaje(
          "No se encontraron actividades de Classroom para este curso."
        );

        setEstado(
          "sin-actividades"
        );

      }
      else {

        setEstado(
          "actividades"
        );

      }

    }
    catch (err) {

      console.error(
        "ERROR ACTIVIDADES CLASSROOM:",
        err
      );

      setError(
        err?.message ||
        "No se pudieron obtener las actividades de Google Classroom."
      );

      setEstado("error");

    }
    finally {

      setCargandoActividades(false);

    }

  };


  // ==========================================================
  // CAMBIAR UNIDAD
  // ==========================================================

  const cambiarUnidad = async (
    codigo
  ) => {

    const encontrada =
      UNIDADES_DIDACTICAS.find(
        (item) =>
          item.codigo === codigo
      );


    setUnidad(
      encontrada || null
    );

    setCurso(null);

    setActividad(null);

    setActividades([]);

    setAlumnos([]);

    setBusqueda("");

    setMensaje("");

    setError("");


    if (!encontrada) {

      setEstado("inicial");

      return;

    }


    await cargarActividades(
      encontrada
    );

  };
  // ==========================================================
  // CARGAR CONSOLIDACIÓN / ENTREGAS
  // ==========================================================

  const cargarConsolidacion = async () => {

    if (!unidad) {

      setError(
        "Selecciona primero una unidad didáctica."
      );

      return;

    }


    if (!curso?.id) {

      setError(
        "No se encontró el courseId de Google Classroom para esta unidad."
      );

      return;

    }


    if (!actividad) {

      setError(
        "Selecciona primero una actividad de Classroom."
      );

      return;

    }


    const courseId =
      curso.id;

    const courseWorkId =
      obtenerIdActividad(
        actividad
      );


    if (!courseId) {

      setError(
        "Debe especificarse courseId."
      );

      return;

    }


    if (!courseWorkId) {

      setError(
        "Debe especificarse courseWorkId."
      );

      return;

    }


    setCargandoResultados(true);

    setError("");

    setMensaje("");

    setAlumnos([]);

    setEstado(
      "cargando-resultados"
    );


    try {

      console.log(
        "CLASSROOM: obteniendo entregas",
        {
          courseId,
          courseWorkId,
        }
      );


      // ------------------------------------------------------
      // OBTENER ENTREGAS DE LA ACTIVIDAD
      // ------------------------------------------------------

      const respuesta =
        await classroomService.obtenerEntregas(
          courseId,
          courseWorkId
        );


      console.log(
        "CLASSROOM ENTREGAS:",
        respuesta
      );


      let entregas =
        obtenerListaRespuesta(
          respuesta,
          [
            "entregas",
            "submissions",
            "studentSubmissions",
            "resultados",
          ]
        );


      // ------------------------------------------------------
      // SI LA RESPUESTA VIENE ENVUELTA EN data
      // ------------------------------------------------------

      if (
        !entregas.length &&
        respuesta?.data
      ) {

        entregas =
          obtenerListaRespuesta(
            respuesta.data,
            [
              "entregas",
              "submissions",
              "studentSubmissions",
              "resultados",
            ]
          );

      }


      // ------------------------------------------------------
      // CONVERTIR ENTREGAS A FILAS
      // ------------------------------------------------------

      const listaAlumnos =
        entregas.map(
          (entrega, index) => {

            const profile =
              entrega?.userProfile ||
              entrega?.student ||
              entrega?.alumno ||
              {};


            const nombre =
              entrega?.alumno ||
              entrega?.nombre ||
              entrega?.studentName ||
              entrega?.studentNombre ||
              profile?.name?.fullName ||
              profile?.name ||
              "Alumno sin nombre";


            const email =
              entrega?.email ||
              entrega?.correo ||
              entrega?.studentEmail ||
              profile?.emailAddress ||
              "";


            const studentId =
              entrega?.userId ||
              entrega?.studentId ||
              entrega?.student?.id ||
              "";


            const submissionId =
              entrega?.id ||
              entrega?.studentSubmissionId ||
              entrega?.submissionId ||
              "";


            const puntaje =
              entrega?.assignedGrade ??
              entrega?.puntaje ??
              entrega?.score ??
              entrega?.grade ??
              entrega?.total ??
              0;


            return {

              id:
                submissionId ||
                studentId ||
                `${nombre}-${index}`,

              alumno:
                nombre,

              nombre:
                nombre,

              email:
                email,

              correo:
                email,

              studentId:
                studentId,

              studentSubmissionId:
                submissionId,

              courseId:
                courseId,

              courseWorkId:
                courseWorkId,

              EN1:
                Number(
                  entrega?.EN1 ?? 0
                ),

              EN2:
                Number(
                  entrega?.EN2 ?? 0
                ),

              EN3:
                Number(
                  entrega?.EN3 ?? 0
                ),

              total:
                Number(
                  puntaje || 0
                ),

              puntaje:
                Number(
                  puntaje || 0
                ),

              informe:
                entrega?.informe ||
                entrega?.title ||
                "",

              estado:
                entrega?.state ||
                entrega?.estado ||
                "",

              entregaOriginal:
                entrega,

            };

          }
        );


      setAlumnos(
        listaAlumnos
      );


      setEstado(
        "resultados"
      );


      if (!listaAlumnos.length) {

        setMensaje(
          "No se encontraron entregas de alumnos para esta actividad."
        );

      }

    }
    catch (err) {

      console.error(
        "ERROR OBTENIENDO ENTREGAS:",
        err
      );


      setError(
        err?.message ||
        "No se pudieron obtener las entregas de Classroom."
      );


      setEstado("error");

    }
    finally {

      setCargandoResultados(false);

    }

  };


  // ==========================================================
  // CARGAR ENTREGABLES CONSOLIDADOS
  //
  // Esta función intenta utilizar la operación existente:
  //
  // obtenerEntregablesClassroom(courseId)
  //
  // si el backend devuelve una estructura consolidada.
  // ==========================================================

  const cargarEntregablesConsolidados =
    async () => {

      if (!unidad) {

        setError(
          "Selecciona primero una unidad didáctica."
        );

        return;

      }


      if (!curso?.id) {

        setError(
          "No se encontró el courseId de Google Classroom."
        );

        return;

      }


      setCargandoResultados(true);

      setError("");

      setMensaje("");

      setAlumnos([]);

      setEstado(
        "cargando-resultados"
      );


      try {

        const respuesta =
          await classroomService.obtenerEntregablesClassroom(
            curso.id
          );


        console.log(
          "CLASSROOM ENTREGABLES CONSOLIDADOS:",
          respuesta
        );


        let lista =
          obtenerListaRespuesta(
            respuesta,
            [
              "alumnos",
              "entregables",
              "resultados",
              "data",
            ]
          );


        if (
          !lista.length &&
          Array.isArray(
            respuesta?.data
          )
        ) {

          lista =
            respuesta.data;

        }


        const normalizados =
          lista.map(
            (alumno, index) => {

              const nombre =
                alumno?.alumno ||
                alumno?.nombre ||
                alumno?.studentName ||
                "Alumno sin nombre";


              return {

                ...alumno,

                id:
                  alumno?.id ||
                  alumno?.studentId ||
                  `${nombre}-${index}`,

                alumno:
                  nombre,

                nombre:
                  nombre,

                email:
                  alumno?.email ||
                  alumno?.correo ||
                  "",

                correo:
                  alumno?.correo ||
                  alumno?.email ||
                  "",

                EN1:
                  Number(
                    alumno?.EN1 || 0
                  ),

                EN2:
                  Number(
                    alumno?.EN2 || 0
                  ),

                EN3:
                  Number(
                    alumno?.EN3 || 0
                  ),

                total:
                  Number(
                    alumno?.total ||
                    0
                  ),

                informe:
                  alumno?.informe ||
                  "",

              };

            }
          );


        setAlumnos(
          normalizados
        );


        setEstado(
          "resultados"
        );


        if (!normalizados.length) {

          setMensaje(
            "No se encontraron entregables consolidados para esta unidad."
          );

        }

      }
      catch (err) {

        console.error(
          "ERROR ENTREGABLES CONSOLIDADOS:",
          err
        );


        setError(
          err?.message ||
          "No se pudieron obtener los entregables consolidados."
        );


        setEstado("error");

      }
      finally {

        setCargandoResultados(false);

      }

    };


  // ==========================================================
  // FILTRAR ALUMNOS
  // ==========================================================

  const alumnosFiltrados =
    useMemo(() => {

      const texto =
        normalizarTexto(
          busqueda
        );


      if (!texto) {
        return alumnos;
      }


      return alumnos.filter(
        (alumno) => {

          const nombre =
            normalizarTexto(
              alumno?.alumno ||
              alumno?.nombre
            );


          const codigo =
            normalizarTexto(
              alumno?.codigo ||
              alumno?.semestre
            );


          const informe =
            normalizarTexto(
              alumno?.informe
            );


          const email =
            normalizarTexto(
              alumno?.email ||
              alumno?.correo
            );


          return (
            nombre.includes(texto) ||
            codigo.includes(texto) ||
            informe.includes(texto) ||
            email.includes(texto)
          );

        }
      );

    }, [
      alumnos,
      busqueda,
    ]);


  // ==========================================================
  // TOTAL ALUMNOS
  // ==========================================================

  const totalAlumnos =
    alumnos.length;


  // ==========================================================
  // ENVIAR CALIFICACIÓN DE UNA ENTREGA
  // ==========================================================

  const enviarCalificacionIndividual =
    async (alumno) => {

      if (!curso?.id) {

        throw new Error(
          "Debe especificarse courseId."
        );

      }


      const courseId =
        curso.id;


      const courseWorkId =
        alumno?.courseWorkId ||
        obtenerIdActividad(
          actividad
        );


      const studentSubmissionId =
        alumno?.studentSubmissionId ||
        alumno?.submissionId ||
        alumno?.id;


      if (!courseWorkId) {

        throw new Error(
          "Debe especificarse courseWorkId."
        );

      }


      if (!studentSubmissionId) {

        throw new Error(
          `No se encontró studentSubmissionId para ${alumno?.alumno || "el alumno"}.`
        );

      }


      const puntaje =
        Number(
          alumno?.total ??
          alumno?.puntaje ??
          0
        );


      return classroomService.asignarCalificacion({
        courseId,
        courseWorkId,
        studentSubmissionId,
        puntaje,
      });

    };


  // ==========================================================
  // ENVIAR CALIFICACIONES
  // ==========================================================

  const enviarCalificaciones =
    async () => {

      if (!unidad) {

        setError(
          "Selecciona una unidad didáctica."
        );

        return;

      }


      if (!curso?.id) {

        setError(
          "No existe un courseId de Classroom asociado a la unidad."
        );

        return;

      }


      if (!actividad) {

        setError(
          "Selecciona una actividad de Classroom."
        );

        return;

      }


      if (!alumnos.length) {

        setError(
          "No existen alumnos para enviar."
        );

        return;

      }


      const courseId =
        curso.id;


      const courseWorkId =
        obtenerIdActividad(
          actividad
        );


      if (!courseWorkId) {

        setError(
          "La actividad seleccionada no tiene courseWorkId."
        );

        return;

      }


      const confirmar =
        window.confirm(
          [
            `Se procesarán ${alumnos.length} calificaciones.`,
            "",
            `Unidad: ${unidad.nombre}`,
            `Curso: ${obtenerNombreCurso(curso)}`,
            `Actividad: ${obtenerNombreActividad(actividad)}`,
            "",
            "¿Deseas continuar?",
          ].join("\n")
        );


      if (!confirmar) {
        return;
      }


      setEnviando(true);

      setError("");

      setMensaje("");


      let enviados = 0;

      let errores = 0;

      const detallesErrores = [];


      try {

        // ----------------------------------------------------
        // ENVIAR UNA POR UNA
        // ----------------------------------------------------

        for (
          const alumno
          of alumnos
        ) {

          try {

            await enviarCalificacionIndividual(
              alumno
            );

            enviados++;

          }
          catch (err) {

            errores++;

            detallesErrores.push({
              alumno:
                alumno?.alumno ||
                alumno?.nombre ||
                "Alumno sin nombre",

              error:
                err?.message ||
                "Error desconocido",

            });

            console.error(
              "ERROR CALIFICANDO ALUMNO:",
              alumno,
              err
            );

          }

        }


        // ----------------------------------------------------
        // MENSAJE FINAL
        // ----------------------------------------------------

        if (errores === 0) {

          setMensaje(
            `Proceso terminado correctamente. ${enviados} calificaciones enviadas a Google Classroom.`
          );

          setEstado(
            "enviados"
          );

        }
        else {

          setMensaje(
            `Proceso terminado. ${enviados} calificaciones enviadas y ${errores} con observaciones.`
          );

          setEstado(
            "enviados-con-observaciones"
          );

          console.warn(
            "DETALLES DE ERRORES:",
            detallesErrores
          );

        }

      }
      catch (err) {

        console.error(
          "ERROR ENVIANDO CALIFICACIONES:",
          err
        );


        setError(
          err?.message ||
          "No se pudieron enviar las calificaciones."
        );

      }
      finally {

        setEnviando(false);

      }

    };


  // ==========================================================
  // REFRESCAR ACTIVIDADES
  // ==========================================================

  const refrescarActividades =
    async () => {

      if (!unidad) {
        return;
      }

      await cargarActividades(
        unidad
      );

    };


  // ==========================================================
  // EFECTO INICIAL
  // ==========================================================

  useEffect(() => {

    // No cargamos Classroom automáticamente.
    //
    // Los cursos se solicitan cuando el docente selecciona
    // una unidad didáctica.

  }, []);


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        dark:bg-slate-950
        px-6
        py-6
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div
          className="
            mb-6
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-[#EEF3FF]
                  text-[#1D3681]
                  flex
                  items-center
                  justify-center
                "
              >

                <ClipboardCheck
                  size={23}
                />

              </div>


              <div>

                <h1
                  className="
                    text-2xl
                    font-extrabold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Calificar entregables
                </h1>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Selecciona la unidad didáctica y la actividad
                  de Google Classroom.
                </p>

              </div>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
            "
          >

            <Cloud
              size={17}
              className="text-emerald-500"
            />

            <span
              className="
                text-xs
                font-bold
                text-slate-600
                dark:text-slate-300
              "
            >
              Google Classroom
            </span>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div
            className="
              mb-5
              flex
              items-start
              gap-3
              p-4
              rounded-2xl
              bg-red-50
              dark:bg-red-950/30
              border
              border-red-200
              dark:border-red-900/50
              text-red-700
              dark:text-red-300
            "
          >

            <AlertCircle
              size={20}
              className="
                shrink-0
                mt-0.5
              "
            />

            <div>

              <p
                className="
                  text-sm
                  font-bold
                "
              >
                No se pudo completar la operación
              </p>


              <p
                className="
                  mt-1
                  text-xs
                "
              >
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ==================================================
            MENSAJE
        ================================================== */}

        {mensaje && (

          <div
            className="
              mb-5
              flex
              items-start
              gap-3
              p-4
              rounded-2xl
              bg-emerald-50
              dark:bg-emerald-950/30
              border
              border-emerald-200
              dark:border-emerald-900/50
              text-emerald-700
              dark:text-emerald-300
            "
          >

            <CheckCircle2
              size={20}
              className="shrink-0"
            />

            <p
              className="
                text-sm
                font-semibold
              "
            >
              {mensaje}
            </p>

          </div>

        )}


        {/* ==================================================
            CONFIGURACIÓN
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-5
            mb-6
          "
        >

          {/* =================================================
              UNIDAD
          ================================================= */}

          <div
            className="
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-2xl
              p-5
              shadow-sm
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-4
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-blue-50
                  dark:bg-blue-950/40
                  text-[#1D3681]
                  flex
                  items-center
                  justify-center
                "
              >

                <BookOpen
                  size={19}
                />

              </div>


              <div>

                <h2
                  className="
                    text-sm
                    font-extrabold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Unidad didáctica
                </h2>


                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Selecciona Experiencias Formativas.
                </p>

              </div>

            </div>


            <div
              className="
                relative
              "
            >

              <select
                value={
                  unidad?.codigo || ""
                }
                onChange={(e) =>
                  cambiarUnidad(
                    e.target.value
                  )
                }
                disabled={
                  cargandoCursos ||
                  cargandoActividades
                }
                className="
                  w-full
                  appearance-none
                  px-4
                  py-3
                  pr-10
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-[#1D3681]/20
                  disabled:opacity-50
                "
              >

                <option value="">
                  Seleccionar unidad didáctica
                </option>


                {UNIDADES_DIDACTICAS.map(
                  (item) => (

                    <option
                      key={item.codigo}
                      value={item.codigo}
                    >
                      {item.nombre} — {item.codigo}
                    </option>

                  )
                )}

              </select>


              <ChevronDown
                size={17}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

            </div>


            {cargandoCursos && (

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                "
              >

                <Loader2
                  size={14}
                  className="animate-spin"
                />

                Consultando cursos de Google Classroom...

              </div>

            )}


            {unidad && (

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >

                <GraduationCap
                  size={15}
                />

                Código:

                <strong
                  className="
                    text-[#1D3681]
                    dark:text-blue-300
                  "
                >
                  {unidad.codigo}
                </strong>

              </div>

            )}


            {curso && (

              <div
                className="
                  mt-2
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >

                Curso Classroom:

                <strong
                  className="
                    ml-1
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {obtenerNombreCurso(curso)}
                </strong>

              </div>

            )}

          </div>


          {/* =================================================
              ACTIVIDAD
          ================================================= */}

          <div
            className="
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-2xl
              p-5
              shadow-sm
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-emerald-50
                    dark:bg-emerald-950/40
                    text-emerald-600
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Cloud
                    size={19}
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-sm
                      font-extrabold
                      text-slate-800
                      dark:text-white
                    "
                  >
                    Actividad de Classroom
                  </h2>


                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Actividades disponibles para el curso.
                  </p>

                </div>

              </div>


              {unidad && (

                <button
                  type="button"
                  onClick={
                    refrescarActividades
                  }
                  disabled={
                    cargandoActividades ||
                    cargandoCursos
                  }
                  className="
                    p-2
                    rounded-lg
                    text-slate-500
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    disabled:opacity-50
                  "
                  title="Actualizar actividades"
                >

                  <RefreshCw
                    size={16}
                    className={
                      cargandoActividades
                        ? "animate-spin"
                        : ""
                    }
                  />

                </button>

              )}

            </div>


            <div
              className="
                relative
              "
            >

              <select
                value={
                  actividad
                    ? obtenerIdActividad(
                        actividad
                      )
                    : ""
                }
                onChange={(e) => {

                  const encontrada =
                    actividades.find(
                      (item) =>
                        String(
                          obtenerIdActividad(item)
                        ) ===
                        String(
                          e.target.value
                        )
                    );


                  setActividad(
                    encontrada || null
                  );

                  setAlumnos([]);

                  setError("");

                  setMensaje("");

                }}
                disabled={
                  !unidad ||
                  !curso ||
                  cargandoActividades ||
                  !actividades.length
                }
                className="
                  w-full
                  appearance-none
                  px-4
                  py-3
                  pr-10
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                  outline-none
                  focus:ring-2
                  focus:ring-[#1D3681]/20
                  disabled:opacity-50
                "
              >

                {!unidad && (

                  <option value="">
                    Primero selecciona una unidad
                  </option>

                )}


                {unidad &&
                  cargandoActividades && (

                    <option value="">
                      Cargando actividades...
                    </option>

                  )}


                {unidad &&
                  !cargandoActividades &&
                  !actividades.length && (

                    <option value="">
                      No hay actividades disponibles
                    </option>

                  )}


                {actividades.map(
                  (item) => {

                    const id =
                      obtenerIdActividad(
                        item
                      );

                    return (

                      <option
                        key={id}
                        value={id}
                      >
                        {obtenerNombreActividad(
                          item
                        )}
                      </option>

                    );

                  }
                )}

              </select>


              <ChevronDown
                size={17}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

            </div>


            {actividad && (

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-x-4
                  gap-y-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >

                <span>

                  Actividad:

                  <strong
                    className="ml-1"
                  >
                    {obtenerNombreActividad(
                      actividad
                    )}
                  </strong>

                </span>


                <span>

                  courseWorkId:

                  <strong
                    className="ml-1"
                  >
                    {obtenerIdActividad(
                      actividad
                    )}
                  </strong>

                </span>


                {actividad?.maxPoints !==
                  undefined && (

                    <span>

                      Máximo:

                      <strong
                        className="ml-1"
                      >
                        {actividad.maxPoints}
                      </strong>

                    </span>

                  )}

              </div>

            )}

          </div>

        </div>


        {/* ==================================================
            ACCIONES
        ================================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-end
            gap-3
            mb-6
          "
        >

          <button
            type="button"
            onClick={
              cargarEntregablesConsolidados
            }
            disabled={
              !curso ||
              cargandoResultados ||
              cargandoActividades
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              text-slate-700
              dark:text-slate-200
              text-sm
              font-bold
              shadow-sm
              transition
              hover:bg-slate-50
              dark:hover:bg-slate-800
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {cargandoResultados ? (

              <Loader2
                size={18}
                className="animate-spin"
              />

            ) : (

              <RefreshCw
                size={18}
              />

            )}

            Cargar consolidación

          </button>


          <button
            type="button"
            onClick={
              cargarConsolidacion
            }
            disabled={
              !unidad ||
              !curso ||
              !actividad ||
              cargandoResultados
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-[#1D3681]
              hover:bg-[#172d6c]
              text-white
              text-sm
              font-bold
              shadow-sm
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {cargandoResultados ? (

              <Loader2
                size={18}
                className="animate-spin"
              />

            ) : (

              <ClipboardCheck
                size={18}
              />

            )}

            {cargandoResultados
              ? "Cargando resultados..."
              : "Cargar entregas"}

          </button>

        </div>


        {/* ==================================================
            TABLA
        ================================================== */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          <div
            className="
              p-5
              border-b
              border-slate-200
              dark:border-slate-800
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-4
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Users
                  size={18}
                  className="text-[#1D3681]"
                />

                <h2
                  className="
                    text-base
                    font-extrabold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Resultados consolidados
                </h2>

              </div>


              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {totalAlumnos} alumnos encontrados.
              </p>

            </div>


            <div
              className="
                relative
                w-full
                lg:w-80
              "
            >

              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                type="text"
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
                placeholder="Buscar alumno..."
                className="
                  w-full
                  pl-9
                  pr-3
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-[#1D3681]/20
                "
              />

            </div>

          </div>


          {/* =================================================
              TABLA
          ================================================= */}

          {alumnosFiltrados.length > 0 ? (

            <div
              className="
                overflow-x-auto
              "
            >

              <table
                className="
                  w-full
                  text-sm
                "
              >

                <thead>

                  <tr
                    className="
                      bg-slate-50
                      dark:bg-slate-800/60
                      text-slate-500
                      dark:text-slate-400
                    "
                  >

                    <th
                      className="
                        text-left
                        px-5
                        py-3
                        font-bold
                      "
                    >
                      Alumno
                    </th>


                    <th
                      className="
                        text-center
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      EN1
                    </th>


                    <th
                      className="
                        text-center
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      EN2
                    </th>


                    <th
                      className="
                        text-center
                        px-4
                        py-3
                        font-bold
                      "
                    >
                      EN3
                    </th>


                    <th
                      className="
                        text-center
                        px-5
                        py-3
                        font-bold
                      "
                    >
                      Total
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {alumnosFiltrados.map(
                    (alumno, index) => (

                      <tr
                        key={
                          alumno?.id ||
                          `${alumno?.alumno}-${index}`
                        }
                        className="
                          border-t
                          border-slate-100
                          dark:border-slate-800
                          hover:bg-slate-50
                          dark:hover:bg-slate-800/40
                        "
                      >

                        <td
                          className="
                            px-5
                            py-4
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >

                            <div
                              className="
                                w-9
                                h-9
                                rounded-xl
                                bg-[#EEF3FF]
                                text-[#1D3681]
                                flex
                                items-center
                                justify-center
                                font-extrabold
                                text-xs
                              "
                            >

                              {String(
                                alumno?.alumno ||
                                alumno?.nombre ||
                                "A"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>


                            <div>

                              <p
                                className="
                                  font-bold
                                  text-slate-700
                                  dark:text-slate-200
                                "
                              >
                                {alumno?.alumno ||
                                  alumno?.nombre ||
                                  "Sin nombre"}
                              </p>


                              <p
                                className="
                                  text-[11px]
                                  text-slate-400
                                "
                              >
                                {alumno?.email ||
                                  alumno?.correo ||
                                  alumno?.informe ||
                                  ""}
                              </p>

                            </div>

                          </div>

                        </td>


                        <td
                          className="
                            text-center
                            px-4
                            py-4
                            font-semibold
                          "
                        >
                          {formatearNota(
                            alumno?.EN1
                          )}
                        </td>


                        <td
                          className="
                            text-center
                            px-4
                            py-4
                            font-semibold
                          "
                        >
                          {formatearNota(
                            alumno?.EN2
                          )}
                        </td>


                        <td
                          className="
                            text-center
                            px-4
                            py-4
                            font-semibold
                          "
                        >
                          {formatearNota(
                            alumno?.EN3
                          )}
                        </td>


                        <td
                          className="
                            text-center
                            px-5
                            py-4
                          "
                        >

                          <span
                            className="
                              inline-flex
                              min-w-14
                              justify-center
                              px-3
                              py-1.5
                              rounded-lg
                              bg-[#EEF3FF]
                              text-[#1D3681]
                              font-extrabold
                            "
                          >
                            {formatearNota(
                              alumno?.total
                            )}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div
              className="
                py-16
                px-6
                text-center
              "
            >

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-2xl
                  bg-slate-100
                  dark:bg-slate-800
                  flex
                  items-center
                  justify-center
                  text-slate-400
                "
              >

                <Users
                  size={25}
                />

              </div>


              <h3
                className="
                  mt-4
                  text-sm
                  font-bold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                No hay resultados para mostrar
              </h3>


              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Selecciona una unidad y una actividad,
                luego carga las entregas.
              </p>

            </div>

          )}


          {/* =================================================
              FOOTER
          ================================================= */}

          {alumnos.length > 0 && (

            <div
              className="
                p-5
                border-t
                border-slate-200
                dark:border-slate-800
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >

                <CheckCircle2
                  size={16}
                  className="text-emerald-500"
                />

                {alumnos.length} alumnos
                preparados para calificación.

              </div>


              <button
                type="button"
                onClick={
                  enviarCalificaciones
                }
                disabled={
                  enviando ||
                  !actividad ||
                  !curso?.id ||
                  !alumnos.length
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  text-sm
                  font-extrabold
                  shadow-sm
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                {enviando ? (

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                ) : (

                  <Send
                    size={18}
                  />

                )}

                {enviando
                  ? "Enviando..."
                  : "Enviar calificaciones a Classroom"}

              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
