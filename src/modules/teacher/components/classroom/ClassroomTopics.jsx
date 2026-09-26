import React, {
    useEffect,
    useState,
} from "react";

import {
    classroomObtenerTemas,
} from "../../services/classroomService.js";

import {
    obtenerTopicId,
    obtenerNombreTema,
} from "./classroomUtils.js";

import {
    classroomObtenerActividadesPorTema,
} from "../../services/classroomService.js";

import ClassroomEntregables from "./ClassroomEntregables.jsx";


// ============================================================
// COMPONENTE
// ============================================================

export default function ClassroomTopics({

    cursoSeleccionado,

    temaSeleccionado,

    onTemaSeleccionado,

}) {

    // ----------------------------------------------------------
    // ESTADOS
    // ----------------------------------------------------------

    const [
        temas,
        setTemas,
    ] = useState([]);


    const [
        cargando,
        setCargando,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");

    const [
        actividadesTema,
        setActividadesTema,
    ] = useState([]);

    const [
        cargandoActividades,
        setCargandoActividades,
    ] = useState(false);

    const [
        errorActividades,
        setErrorActividades,
    ] = useState("");

    // ----------------------------------------------------------
    // CARGAR TEMAS CUANDO CAMBIA EL CURSO
    // ----------------------------------------------------------

    useEffect(() => {

        if (!cursoSeleccionado) {

            setTemas([]);

            setError("");

            return;

        }


        cargarTemas(
            cursoSeleccionado
        );

    }, [
        cursoSeleccionado
    ]);


    // ==========================================================
    // OBTENER TEMAS
    // ==========================================================
    async function cargarActividadesTema(
        tema
    ) {

        try {

            const topicId =
                obtenerTopicId(
                    tema
                );


            if (!topicId) {

                throw new Error(
                    "El tema seleccionado no tiene topicId."
                );

            }


            setCargandoActividades(true);

            setErrorActividades("");

            setActividadesTema([]);


            const actividades =
                await classroomObtenerActividadesPorTema(
                    cursoSeleccionado,
                    topicId
                );


            console.log(
                "Actividades del tema:",
                actividades
            );


            setActividadesTema(
                Array.isArray(actividades)
                    ? actividades
                    : []
            );

        }
        catch (error) {

            console.error(
                "Error cargando actividades del tema:",
                error
            );


            setErrorActividades(
                error?.message ||
                "No se pudieron cargar las actividades."
            );

        }
        finally {

            setCargandoActividades(false);

        }

    }

    async function cargarTemas(
        cursoId
    ) {

        try {

            setCargando(true);

            setError("");

            setTemas([]);


            const respuesta =
                await classroomObtenerTemas(
                    cursoId
                );


            console.log(
                "Classroom temas:",
                respuesta
            );


            let lista = [];


            if (
                Array.isArray(
                    respuesta
                )
            ) {

                lista =
                    respuesta;

            }

            else if (
                Array.isArray(
                    respuesta?.topics
                )
            ) {

                lista =
                    respuesta.topics;

            }

            else if (
                Array.isArray(
                    respuesta?.data
                )
            ) {

                lista =
                    respuesta.data;

            }

            else if (
                Array.isArray(
                    respuesta?.data?.topics
                )
            ) {

                lista =
                    respuesta.data.topics;

            }


            setTemas(
                lista
            );

        }

        catch (err) {

            console.error(
                "Error cargando temas de Classroom:",
                err
            );


            setError(

                err?.message ||

                "No se pudieron cargar los temas."

            );

        }

        finally {

            setCargando(false);

        }

    }


    // ==========================================================
    // SI NO HAY CURSO
    // ==========================================================

    if (!cursoSeleccionado) {

        return null;

    }


    // ==========================================================
    // RENDER
    // ==========================================================

    return (

        <div
            className="
        mt-6
        bg-white
        dark:bg-slate-900
        border
        border-slate-200/80
        dark:border-slate-800
        rounded-2xl
        p-5
        lg:p-6
        shadow-sm
      "
        >

            {/* =====================================================
          CABECERA
      ===================================================== */}

            <div
                className="
          mb-5
        "
            >

                <p
                    className="
            text-xs
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#1D3681]
            mb-1
          "
                >
                    Paso 2
                </p>


                <h2
                    className="
            text-lg
            font-black
            text-slate-900
            dark:text-white
          "
                >
                    Seleccionar tema
                </h2>


                <p
                    className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
                >
                    Selecciona el tema o experiencia
                    específica que deseas revisar.
                </p>

            </div>


            {/* =====================================================
          CARGANDO
      ===================================================== */}

            {!cargando &&
                !error &&
                temas.length > 0 && (

                    <div className="space-y-3">

                        <div className="
      rounded-xl
      bg-green-50
      border
      border-green-200
      px-4
      py-3
    ">

                            <p className="
        text-sm
        font-bold
        text-green-700
      ">
                                ✅ Se encontraron {temas.length} temas
                            </p>

                        </div>


                        {temas.map((tema, index) => (

                            <div
                                key={
                                    tema?.id ||
                                    `tema-${index}`
                                }
                                className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
        "
                            >

                                <p className="
          text-sm
          font-bold
          text-slate-900
        ">
                                    {index + 1}. {tema?.nombre}
                                </p>

                                <p className="
          mt-1
          text-xs
          text-slate-400
        ">
                                    ID: {tema?.id}
                                </p>

                            </div>

                        ))}

                    </div>

                )}


            {/* =====================================================
          ERROR
      ===================================================== */}

            {!cargando && error && (

                <div
                    className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            dark:bg-red-900/20
            dark:border-red-900
            px-4
            py-4
          "
                >

                    <p
                        className="
              text-sm
              font-bold
              text-red-700
              dark:text-red-300
            "
                    >
                        No se pudieron cargar los temas.
                    </p>


                    <p
                        className="
              mt-1
              text-xs
              text-red-600
              dark:text-red-400
            "
                    >
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            cargarTemas(
                                cursoSeleccionado
                            )
                        }
                        className="
              mt-3
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-xs
              font-bold
              text-white
              hover:bg-red-700
              transition-colors
            "
                    >
                        Intentar nuevamente
                    </button>

                </div>

            )}


            {/* =====================================================
          SIN TEMAS
      ===================================================== */}

            {!cargando &&
                !error &&
                temas.length === 0 && (

                    <div
                        className="
              rounded-xl
              border
              border-amber-200
              bg-amber-50
              dark:bg-amber-900/20
              dark:border-amber-900
              px-4
              py-4
            "
                    >

                        <p
                            className="
                text-sm
                font-bold
                text-amber-700
                dark:text-amber-300
              "
                        >
                            No se encontraron temas.
                        </p>


                        <p
                            className="
                mt-1
                text-xs
                text-amber-600
                dark:text-amber-400
              "
                        >
                            Esta experiencia formativa no tiene
                            temas disponibles en Classroom.
                        </p>

                    </div>

                )}


            {/* =====================================================
          LISTA DE TEMAS
      ===================================================== */}

            {!cargando &&
                !error &&
                temas.length > 0 && (

                    <div
                        className="
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
                    >

                        {temas.map(
                            (
                                tema,
                                index
                            ) => {

                                const id =
                                    obtenerTopicId(
                                        tema
                                    );


                                const nombre =
                                    obtenerNombreTema(
                                        tema
                                    );


                                const seleccionado =

                                    String(
                                        temaSeleccionado || ""
                                    ) ===
                                    String(
                                        id
                                    );


                                return (

                                    <button
                                        key={
                                            id ||
                                            `tema-${index}`
                                        }
                                        type="button"
                                        onClick={async () => {

                                            if (
                                                typeof onTemaSeleccionado ===
                                                "function"
                                            ) {

                                                onTemaSeleccionado(
                                                    tema
                                                );

                                            }


                                            await cargarActividadesTema(
                                                tema
                                            );

                                        }}

                                        className={`
                      text-left
                      rounded-xl
                      border
                      p-4
                      transition-all
                      duration-200

                      ${seleccionado

                                                ? `
                            border-[#1D3681]
                            bg-[#EEF3FF]
                            dark:bg-blue-900/20
                            shadow-sm
                          `

                                                : `
                            border-slate-200
                            dark:border-slate-700
                            bg-white
                            dark:bg-slate-800
                            hover:border-blue-300
                            hover:bg-slate-50
                            dark:hover:bg-slate-800/80
                          `
                                            }
                    `}
                                    >

                                        <div
                                            className="
                        flex
                        items-start
                        gap-3
                      "
                                        >

                                            <div
                                                className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-sm
                          font-black

                          ${seleccionado

                                                        ? `
                                bg-[#1D3681]
                                text-white
                              `

                                                        : `
                                bg-slate-100
                                text-slate-500
                                dark:bg-slate-700
                                dark:text-slate-300
                              `
                                                    }
                        `}
                                            >

                                                {index + 1}

                                            </div>


                                            <div
                                                className="
                          min-w-0
                          flex-1
                        "
                                            >

                                                <p
                                                    className={`
                            text-sm
                            font-bold
                            leading-5

                            ${seleccionado

                                                            ? `
                                  text-[#1D3681]
                                  dark:text-blue-300
                                `

                                                            : `
                                  text-slate-800
                                  dark:text-white
                                `
                                                        }
                          `}
                                                >
                                                    {nombre}
                                                </p>


                                                {id && (

                                                    <p
                                                        className="
                              mt-1
                              text-[10px]
                              text-slate-400
                              dark:text-slate-500
                            "
                                                    >
                                                        ID: {id}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    </button>

                                );

                            }
                        )}

                    </div>

                )}


            {/* =====================================================
          TEMA SELECCIONADO
      ===================================================== */}
            {temaSeleccionado && (

                <>

                    {cargandoActividades && (

                        <div
                            className="
                    mt-6
                    rounded-2xl
                    border
                    border-blue-200
                    bg-blue-50
                    px-5
                    py-5
                    dark:border-blue-900
                    dark:bg-blue-900/20
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
                            h-5
                            w-5
                            animate-spin
                            rounded-full
                            border-2
                            border-blue-200
                            border-t-[#1D3681]
                        "
                                />

                                <p
                                    className="
                            text-sm
                            font-bold
                            text-blue-700
                            dark:text-blue-300
                        "
                                >
                                    Cargando entregables...
                                </p>

                            </div>

                        </div>

                    )}


                    {!cargandoActividades &&
                        errorActividades && (

                            <div
                                className="
                    mt-6
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    dark:border-red-900
                    dark:bg-red-900/20
                "
                            >

                                <p
                                    className="
                        text-sm
                        font-bold
                        text-red-700
                        dark:text-red-300
                    "
                                >
                                    No se pudieron cargar los entregables.
                                </p>


                                <p
                                    className="
                        mt-1
                        text-xs
                        text-red-600
                        dark:text-red-400
                    "
                                >
                                    {errorActividades}
                                </p>

                            </div>

                        )}


                    {!cargandoActividades &&
                        !errorActividades &&
                        actividadesTema.length > 0 && (

                            <ClassroomEntregables
                                actividades={
                                    actividadesTema
                                }

                                puntajes={{
                                    EN1: 0,
                                    EN2: 0,
                                    EN3: 0,
                                }}

                                onEntregableSeleccionado={(
                                    entregable
                                ) => {

                                    console.log(
                                        "Entregable seleccionado:",
                                        entregable
                                    );

                                }}
                            />

                        )}

                </>

            )}


        </div>

    );

}
