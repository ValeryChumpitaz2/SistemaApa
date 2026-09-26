import React, {
    useEffect,
    useState,
} from "react";

import {
    classroomObtenerTemas,
    classroomObtenerActividadesPorTema,
} from "../../services/classroomService.js";

import {
    obtenerTopicId,
    obtenerNombreTema,
    obtenerTitulo,
    reconocerEntregable,
} from "./classroomUtils.js";


// ============================================================
// COMPONENTE
// ============================================================

export default function ClassroomTopics({

    cursoSeleccionado,

    temaSeleccionado,

    onTemaSeleccionado,

    onEntregableSeleccionado,

}) {

    // ========================================================
    // ESTADOS
    // ========================================================

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


    // ========================================================
    // CARGAR TEMAS
    // ========================================================

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


    // ========================================================
    // CARGAR TEMAS
    // ========================================================

    async function cargarTemas(
        cursoId
    ) {

        try {

            setCargando(true);

            setError("");

            setTemas([]);

            setActividadesTema([]);

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

                lista = respuesta;

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


    // ========================================================
    // CARGAR ACTIVIDADES DEL TEMA
    // ========================================================

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

            setCargandoActividades(
                true
            );

            setErrorActividades("");

            setActividadesTema([]);

            console.log(
                "================================"
            );

            console.log(
                "CARGANDO ACTIVIDADES"
            );

            console.log(
                "Topic ID:",
                topicId
            );

            console.log(
                "================================"
            );

            const actividades =
                await classroomObtenerActividadesPorTema(
                    cursoSeleccionado,
                    topicId
                );

            console.log(
                "Actividades del tema:",
                actividades
            );

            const lista =
                Array.isArray(
                    actividades
                )
                    ? actividades
                    : [];

            setActividadesTema(
                lista
            );

        }

        catch (err) {

            console.error(
                "Error cargando actividades:",
                err
            );

            setErrorActividades(
                err?.message ||
                "No se pudieron cargar las actividades."
            );

        }

        finally {

            setCargandoActividades(
                false
            );

        }

    }


    // ========================================================
    // SELECCIONAR TEMA
    // ========================================================

    async function seleccionarTema(
        tema
    ) {

        console.log(
            "Tema seleccionado:",
            tema
        );

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

    }


    // ========================================================
    // SELECCIONAR ENTREGABLE
    // ========================================================

    function seleccionarEntregable(
        actividad
    ) {

        const codigo =
            reconocerEntregable(
                actividad
            );

        const entregable = {

            ...actividad,

            codigo:

                codigo ||

                actividad?.codigo ||

                null,

        };

        console.log(
            "================================"
        );

        console.log(
            "ENTREGABLE SELECCIONADO"
        );

        console.log(
            entregable
        );

        console.log(
            "Código:",
            codigo
        );

        console.log(
            "================================"
        );

        if (
            typeof onEntregableSeleccionado ===
            "function"
        ) {

            onEntregableSeleccionado(
                entregable
            );

        }

    }


    // ========================================================
    // SI NO HAY CURSO
    // ========================================================

    if (!cursoSeleccionado) {

        return null;

    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div
            className="
                mt-6
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-5
                shadow-sm
                dark:border-slate-800
                dark:bg-slate-900
                lg:p-6
            "
        >

            {/* ================================================= */}
            {/* CABECERA */}
            {/* ================================================= */}

            <div className="mb-5">

                <p
                    className="
                        mb-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-[#1D3681]
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


            {/* ================================================= */}
            {/* CARGANDO TEMAS */}
            {/* ================================================= */}

            {cargando && (

                <div
                    className="
                        rounded-xl
                        border
                        border-blue-200
                        bg-blue-50
                        px-4
                        py-4
                    "
                >

                    <p
                        className="
                            text-sm
                            font-bold
                            text-blue-700
                        "
                    >
                        Cargando temas...
                    </p>

                </div>

            )}


            {/* ================================================= */}
            {/* ERROR TEMAS */}
            {/* ================================================= */}

            {!cargando &&
                error && (

                    <div
                        className="
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-4
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-bold
                                text-red-700
                            "
                        >
                            No se pudieron cargar los temas.
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-red-600
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
                            "
                        >
                            Intentar nuevamente
                        </button>

                    </div>

                )}


            {/* ================================================= */}
            {/* TEMAS */}
            {/* ================================================= */}

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
                                        temaSeleccionado ||
                                        ""
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
                                        onClick={() =>
                                            seleccionarTema(
                                                tema
                                            )
                                        }
                                        className={`
                                            rounded-xl
                                            border
                                            p-4
                                            text-left
                                            transition-all

                                            ${
                                                seleccionado
                                                    ? `
                                                        border-[#1D3681]
                                                        bg-[#EEF3FF]
                                                        shadow-sm
                                                    `
                                                    : `
                                                        border-slate-200
                                                        bg-white
                                                        hover:border-blue-300
                                                        hover:bg-slate-50
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

                                                    ${
                                                        seleccionado
                                                            ? `
                                                                bg-[#1D3681]
                                                                text-white
                                                            `
                                                            : `
                                                                bg-slate-100
                                                                text-slate-500
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

                                                        ${
                                                            seleccionado
                                                                ? "text-[#1D3681]"
                                                                : "text-slate-800"
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


            {/* ================================================= */}
            {/* SIN TEMAS */}
            {/* ================================================= */}

            {!cargando &&
                !error &&
                temas.length === 0 && (

                    <div
                        className="
                            rounded-xl
                            border
                            border-amber-200
                            bg-amber-50
                            px-4
                            py-4
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-bold
                                text-amber-700
                            "
                        >
                            No se encontraron temas.
                        </p>

                    </div>

                )}


            {/* ================================================= */}
            {/* ACTIVIDADES DEL TEMA */}
            {/* ================================================= */}

            {temaSeleccionado && (

                <div className="mt-6">

                    {/* ----------------------------------------- */}
                    {/* CABECERA */}
                    {/* ----------------------------------------- */}

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-slate-400
                                "
                            >
                                Actividades
                            </p>

                            <h3
                                className="
                                    mt-1
                                    text-base
                                    font-black
                                    text-slate-800
                                "
                            >
                                Entregables del tema
                            </h3>

                        </div>

                        {!cargandoActividades &&
                            actividadesTema.length > 0 && (

                                <span
                                    className="
                                        rounded-full
                                        bg-blue-50
                                        px-3
                                        py-1
                                        text-xs
                                        font-bold
                                        text-blue-700
                                    "
                                >
                                    {actividadesTema.length}
                                </span>

                            )}

                    </div>


                    {/* ----------------------------------------- */}
                    {/* CARGANDO */}
                    {/* ----------------------------------------- */}

                    {cargandoActividades && (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-blue-200
                                bg-blue-50
                                px-5
                                py-5
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
                                    "
                                >
                                    Cargando entregables...
                                </p>

                            </div>

                        </div>

                    )}


                    {/* ----------------------------------------- */}
                    {/* ERROR */}
                    {/* ----------------------------------------- */}

                    {!cargandoActividades &&
                        errorActividades && (

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-5
                                    py-4
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-red-700
                                    "
                                >
                                    No se pudieron cargar
                                    los entregables.
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-red-600
                                    "
                                >
                                    {errorActividades}
                                </p>

                            </div>

                        )}


                    {/* ----------------------------------------- */}
                    {/* ACTIVIDADES */}
                    {/* ----------------------------------------- */}

                    {!cargandoActividades &&
                        !errorActividades &&
                        actividadesTema.length > 0 && (

                            <div
                                className="
                                    space-y-3
                                "
                            >

                                {actividadesTema.map(
                                    (
                                        actividad,
                                        index
                                    ) => {

                                        const titulo =
                                            obtenerTitulo(
                                                actividad
                                            ) ||
                                            `Actividad ${index + 1}`;

                                        const codigo =
                                            reconocerEntregable(
                                                actividad
                                            );

                                        return (

                                            <button
                                                key={
                                                    actividad?.id ||
                                                    actividad?.courseWorkId ||
                                                    `actividad-${index}`
                                                }
                                                type="button"
                                                onClick={() =>
                                                    seleccionarEntregable(
                                                        actividad
                                                    )
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                    rounded-2xl
                                                    border
                                                    border-slate-200
                                                    bg-white
                                                    p-4
                                                    text-left
                                                    transition
                                                    hover:border-blue-300
                                                    hover:bg-blue-50
                                                    hover:shadow-sm
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        min-w-0
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-blue-50
                                                            text-lg
                                                        "
                                                    >
                                                        📄
                                                    </div>

                                                    <div
                                                        className="
                                                            min-w-0
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                truncate
                                                                text-sm
                                                                font-black
                                                                text-slate-800
                                                            "
                                                        >
                                                            {titulo}
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-1
                                                                text-xs
                                                                text-slate-400
                                                            "
                                                        >
                                                            {codigo
                                                                ? `Código: ${codigo}`
                                                                : "Actividad de Classroom"}
                                                        </p>

                                                    </div>

                                                </div>

                                                <span
                                                    className="
                                                        shrink-0
                                                        rounded-xl
                                                        bg-[#1D3681]
                                                        px-3
                                                        py-2
                                                        text-xs
                                                        font-bold
                                                        text-white
                                                    "
                                                >
                                                    Revisar
                                                </span>

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        )}


                    {/* ----------------------------------------- */}
                    {/* SIN ACTIVIDADES */}
                    {/* ----------------------------------------- */}

                    {!cargandoActividades &&
                        !errorActividades &&
                        actividadesTema.length === 0 && (

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-slate-300
                                    bg-slate-50
                                    px-5
                                    py-8
                                    text-center
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-600
                                    "
                                >
                                    Este tema no tiene actividades.
                                </p>

                            </div>

                        )}

                </div>

            )}

        </div>

    );

}
