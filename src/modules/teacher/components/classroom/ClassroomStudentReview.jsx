import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    classroomObtenerActividadesPorTema,
    classroomObtenerCourseWorkId,
    classroomAnalizarEntregableAlumno,
    classroomCalcularNotaFinal,
    classroomReconocerEntregable,
} from "../../services/classroomService.js";


// ============================================================
// CONFIGURACIÓN
// ============================================================

const PUNTAJE_MAXIMO = 2;

const ENTREGABLES = [
    "EN1",
    "EN2",
    "EN3",
];


// ============================================================
// COMPONENTE
// ============================================================

export default function ClassroomStudentReview({

    courseId,

    topicId,

    userId,

    nombreEstudiante = "Estudiante",

}) {

    // ----------------------------------------------------------
    // ACTIVIDADES DEL TEMA
    // ----------------------------------------------------------

    const [
        actividades,
        setActividades,
    ] = useState([]);


    // ----------------------------------------------------------
    // RESULTADOS
    // ----------------------------------------------------------

    const [
        resultados,
        setResultados,
    ] = useState({

        EN1: null,
        EN2: null,
        EN3: null,

    });


    // ----------------------------------------------------------
    // ESTADOS
    // ----------------------------------------------------------

    const [
        cargando,
        setCargando,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");


    const [
        entregableAnalizando,
        setEntregableAnalizando,
    ] = useState(null);


    // ==========================================================
    // CARGAR ACTIVIDADES
    // ==========================================================

    useEffect(() => {

        if (
            !courseId ||
            !topicId
        ) {

            setActividades([]);

            return;

        }


        cargarActividades();

    }, [
        courseId,
        topicId,
    ]);


    async function cargarActividades() {

        try {

            setCargando(true);

            setError("");


            const lista =
                await classroomObtenerActividadesPorTema(
                    courseId,
                    topicId
                );


            setActividades(
                Array.isArray(lista)
                    ? lista
                    : []
            );

        }
        catch (err) {

            console.error(
                "Error cargando actividades:",
                err
            );


            setError(
                err?.message ||
                "No se pudieron cargar las actividades."
            );

        }
        finally {

            setCargando(false);

        }

    }


    // ==========================================================
    // MAPEAR ACTIVIDADES
    // ==========================================================

    const actividadesPorCodigo =
        useMemo(() => {

            const mapa = {
                EN1: null,
                EN2: null,
                EN3: null,
            };


            actividades.forEach(
                actividad => {

                    const codigo =
                        classroomReconocerEntregable(
                            actividad
                        );


                    if (
                        ENTREGABLES.includes(
                            codigo
                        )
                    ) {

                        mapa[codigo] =
                            actividad;

                    }

                }
            );


            return mapa;

        }, [
            actividades,
        ]);


    // ==========================================================
    // ANALIZAR ENTREGABLE
    // ==========================================================

    async function analizarEntregable(
        codigo
    ) {

        try {

            setError("");

            setEntregableAnalizando(
                codigo
            );


            const actividad =
                actividadesPorCodigo[
                    codigo
                ];


            if (!actividad) {

                throw new Error(
                    `No se encontró la actividad ${codigo}.`
                );

            }


            const courseWorkId =
                classroomObtenerCourseWorkId(
                    actividad
                );


            if (!courseWorkId) {

                throw new Error(
                    `No se encontró courseWorkId para ${codigo}.`
                );

            }


            const resultado =
                await classroomAnalizarEntregableAlumno({

                    courseId,

                    courseWorkId,

                    userId,

                    codigo,

                });


            console.log(
                `Resultado ${codigo}:`,
                resultado
            );


            setResultados(
                anterior => ({

                    ...anterior,

                    [codigo]:
                        resultado,

                })
            );

        }
        catch (err) {

            console.error(
                `Error analizando ${codigo}:`,
                err
            );


            setError(
                err?.message ||
                `No se pudo analizar ${codigo}.`
            );

        }
        finally {

            setEntregableAnalizando(
                null
            );

        }

    }


    // ==========================================================
    // ANALIZAR LOS 3
    // ==========================================================

    async function analizarTodos() {

        for (
            const codigo
            of ENTREGABLES
        ) {

            await analizarEntregable(
                codigo
            );

        }

    }


    // ==========================================================
    // CALCULAR NOTA FINAL
    // ==========================================================

    const notaFinal =
        useMemo(() => {

            return classroomCalcularNotaFinal({

                EN1:
                    resultados.EN1 || {
                        puntaje: 0,
                        descuento: 0,
                    },

                EN2:
                    resultados.EN2 || {
                        puntaje: 0,
                        descuento: 0,
                    },

                EN3:
                    resultados.EN3 || {
                        puntaje: 0,
                        descuento: 0,
                    },

            });

        }, [
            resultados.EN1,
            resultados.EN2,
            resultados.EN3,
        ]);


    // ==========================================================
    // PORCENTAJE VISUAL
    // ==========================================================

    const porcentaje =
        Math.min(
            100,
            Math.max(
                0,
                (
                    Number(
                        notaFinal.puntajeFinal
                    ) /
                    6
                ) * 100
            )
        );


    // ==========================================================
    // SIN DATOS
    // ==========================================================

    if (
        !courseId ||
        !topicId ||
        !userId
    ) {

        return (

            <div
                className="
                    rounded-2xl
                    border
                    border-amber-200
                    bg-amber-50
                    px-5
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
                    Faltan datos para revisar al estudiante.
                </p>

            </div>

        );

    }


    // ==========================================================
    // RENDER
    // ==========================================================

    return (

        <div
            className="
                mt-6
                space-y-5
            "
        >

            {/* ==================================================
                CABECERA DEL ESTUDIANTE
            ================================================== */}

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.14em]
                                text-[#1D3681]
                            "
                        >
                            Revisión del estudiante
                        </p>


                        <h2
                            className="
                                mt-1
                                text-xl
                                font-black
                                text-slate-900
                                dark:text-white
                            "
                        >
                            {nombreEstudiante}
                        </h2>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-400
                            "
                        >
                            ID: {userId}
                        </p>

                    </div>


                    {/* NOTA FINAL */}

                    <div
                        className="
                            min-w-[180px]
                            rounded-2xl
                            bg-[#1D3681]
                            px-5
                            py-4
                            text-white
                        "
                    >

                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-blue-200
                            "
                        >
                            Nota acumulada
                        </p>


                        <div
                            className="
                                mt-1
                                flex
                                items-baseline
                                gap-1
                            "
                        >

                            <span
                                className="
                                    text-3xl
                                    font-black
                                "
                            >
                                {Number(
                                    notaFinal.puntajeFinal
                                ).toFixed(2)}
                            </span>


                            <span
                                className="
                                    text-sm
                                    font-bold
                                    text-blue-200
                                "
                            >
                                / 6.00
                            </span>

                        </div>


                        <div
                            className="
                                mt-3
                                h-1.5
                                overflow-hidden
                                rounded-full
                                bg-white/20
                            "
                        >

                            <div
                                className="
                                    h-full
                                    rounded-full
                                    bg-emerald-400
                                    transition-all
                                    duration-500
                                "
                                style={{
                                    width:
                                        `${porcentaje}%`,
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div
                    className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
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
                        No se pudo completar la revisión.
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

                </div>

            )}


            {/* ==================================================
                LOADING ACTIVIDADES
            ================================================== */}

            {cargando && (

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


            {/* ==================================================
                ENTREGABLES
            ================================================== */}

            {!cargando && (

                <div
                    className="
                        grid
                        gap-4
                        lg:grid-cols-3
                    "
                >

                    {ENTREGABLES.map(
                        codigo => {

                            const resultado =
                                resultados[codigo];


                            const actividad =
                                actividadesPorCodigo[
                                    codigo
                                ];


                            const analizando =
                                entregableAnalizando ===
                                codigo;


                            const tieneEntrega =
                                resultado?.tieneEntrega ===
                                true;


                            const puntaje =
                                resultado?.puntaje;


                            const descuento =
                                resultado?.descuento;


                            const tieneDocumento =
                                resultado?.tieneDocumento ===
                                true;


                            return (

                                <div
                                    key={codigo}
                                    className="
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        shadow-sm
                                        dark:border-slate-800
                                        dark:bg-slate-900
                                    "
                                >

                                    {/* --------------------------------
                                        HEADER
                                    -------------------------------- */}

                                    <div
                                        className="
                                            border-b
                                            border-slate-100
                                            px-5
                                            py-4
                                            dark:border-slate-800
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
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
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-[#EEF3FF]
                                                        text-xs
                                                        font-black
                                                        text-[#1D3681]
                                                        dark:bg-blue-900/30
                                                        dark:text-blue-300
                                                    "
                                                >
                                                    {codigo}
                                                </div>


                                                <div>

                                                    <p
                                                        className="
                                                            text-sm
                                                            font-black
                                                            text-slate-900
                                                            dark:text-white
                                                        "
                                                    >
                                                        Entregable
                                                        {" "}
                                                        {codigo.replace(
                                                            "EN",
                                                            ""
                                                        )}
                                                    </p>


                                                    <p
                                                        className="
                                                            text-[10px]
                                                            text-slate-400
                                                        "
                                                    >
                                                        Máximo 2.00
                                                    </p>

                                                </div>

                                            </div>


                                            {/* PUNTAJE */}

                                            <div
                                                className="
                                                    text-right
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xl
                                                        font-black
                                                        text-[#1D3681]
                                                        dark:text-blue-300
                                                    "
                                                >
                                                    {puntaje ===
                                                    null ||
                                                    puntaje ===
                                                    undefined

                                                        ? "--"

                                                        : Number(
                                                            puntaje
                                                        ).toFixed(2)
                                                    }

                                                    <span
                                                        className="
                                                            text-xs
                                                            text-slate-400
                                                        "
                                                    >
                                                        {" "}
                                                        / 2.00
                                                    </span>

                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* --------------------------------
                                        BODY
                                    -------------------------------- */}

                                    <div
                                        className="
                                            space-y-4
                                            p-5
                                        "
                                    >

                                        {/* ACTIVIDAD */}

                                        {actividad && (

                                            <div>

                                                <p
                                                    className="
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wider
                                                        text-slate-400
                                                    "
                                                >
                                                    Actividad
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-xs
                                                        font-semibold
                                                        leading-5
                                                        text-slate-700
                                                        dark:text-slate-300
                                                    "
                                                >
                                                    {actividad?.title ||
                                                        actividad?.name ||
                                                        "Actividad"}
                                                </p>

                                            </div>

                                        )}


                                        {/* SIN ANALIZAR */}

                                        {!resultado && (

                                            <div
                                                className="
                                                    rounded-xl
                                                    bg-slate-50
                                                    px-4
                                                    py-4
                                                    dark:bg-slate-800
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        font-bold
                                                        text-slate-600
                                                        dark:text-slate-300
                                                    "
                                                >
                                                    Aún no se ha revisado
                                                    este entregable.
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-[11px]
                                                        leading-4
                                                        text-slate-400
                                                    "
                                                >
                                                    Se buscará la entrega
                                                    del estudiante y su
                                                    documento.
                                                </p>

                                            </div>

                                        )}


                                        {/* SIN ENTREGA */}

                                        {resultado &&
                                            !tieneEntrega && (

                                            <div
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-amber-200
                                                    bg-amber-50
                                                    px-4
                                                    py-4
                                                    dark:border-amber-900
                                                    dark:bg-amber-900/20
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        font-bold
                                                        text-amber-700
                                                        dark:text-amber-300
                                                    "
                                                >
                                                    Sin entrega
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-[11px]
                                                        text-amber-600
                                                        dark:text-amber-400
                                                    "
                                                >
                                                    El estudiante no
                                                    registra una entrega
                                                    para este entregable.
                                                </p>

                                            </div>

                                        )}


                                        {/* ENTREGA SIN DOCUMENTO */}

                                        {resultado &&
                                            tieneEntrega &&
                                            !tieneDocumento && (

                                            <div
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-orange-200
                                                    bg-orange-50
                                                    px-4
                                                    py-4
                                                    dark:border-orange-900
                                                    dark:bg-orange-900/20
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        font-bold
                                                        text-orange-700
                                                        dark:text-orange-300
                                                    "
                                                >
                                                    Entrega sin documento
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-[11px]
                                                        text-orange-600
                                                        dark:text-orange-400
                                                    "
                                                >
                                                    La entrega existe,
                                                    pero no se encontró
                                                    un documento para
                                                    analizar.
                                                </p>

                                            </div>

                                        )}


                                        {/* DOCUMENTO */}

                                        {resultado &&
                                            tieneDocumento && (

                                            <div
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-emerald-200
                                                    bg-emerald-50
                                                    px-4
                                                    py-4
                                                    dark:border-emerald-900
                                                    dark:bg-emerald-900/20
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-start
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            bg-emerald-100
                                                            text-sm
                                                            dark:bg-emerald-900/40
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
                                                                text-[10px]
                                                                font-bold
                                                                uppercase
                                                                text-emerald-600
                                                                dark:text-emerald-400
                                                            "
                                                        >
                                                            Documento
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                truncate
                                                                text-xs
                                                                font-bold
                                                                text-emerald-800
                                                                dark:text-emerald-200
                                                            "
                                                        >
                                                            {
                                                                resultado
                                                                    ?.documentos?.[0]
                                                                    ?.title ||
                                                                "Documento enviado"
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        )}


                                        {/* RESULTADO DEL ANÁLISIS */}

                                        {resultado &&
                                            tieneDocumento &&
                                            resultado.analisis && (

                                            <div
                                                className="
                                                    rounded-xl
                                                    border
                                                    border-blue-200
                                                    bg-blue-50
                                                    px-4
                                                    py-4
                                                    dark:border-blue-900
                                                    dark:bg-blue-900/20
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wider
                                                        text-blue-600
                                                        dark:text-blue-400
                                                    "
                                                >
                                                    Análisis
                                                </p>


                                                <p
                                                    className="
                                                        mt-2
                                                        text-xs
                                                        leading-5
                                                        text-blue-800
                                                        dark:text-blue-200
                                                    "
                                                >
                                                    Documento analizado
                                                    correctamente.
                                                </p>

                                            </div>

                                        )}


                                        {/* DESCUENTO */}

                                        {resultado &&
                                            tieneDocumento &&
                                            resultado.descuento !==
                                            null &&
                                            resultado.descuento !==
                                            undefined && (

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    rounded-xl
                                                    bg-slate-50
                                                    px-4
                                                    py-3
                                                    dark:bg-slate-800
                                                "
                                            >

                                                <div>

                                                    <p
                                                        className="
                                                            text-[10px]
                                                            font-bold
                                                            uppercase
                                                            text-slate-400
                                                        "
                                                    >
                                                        Descuento
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            font-black
                                                            text-red-500
                                                        "
                                                    >
                                                        -
                                                        {Number(
                                                            resultado.descuento
                                                        ).toFixed(2)}
                                                    </p>

                                                </div>


                                                <div
                                                    className="
                                                        text-right
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-[10px]
                                                            font-bold
                                                            uppercase
                                                            text-slate-400
                                                        "
                                                    >
                                                        Puntaje
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            font-black
                                                            text-emerald-600
                                                        "
                                                    >
                                                        {Number(
                                                            puntaje
                                                        ).toFixed(2)}
                                                        {" "}
                                                        / 2.00
                                                    </p>

                                                </div>

                                            </div>

                                        )}


                                        {/* BOTÓN */}

                                        <button
                                            type="button"
                                            disabled={
                                                analizando ||
                                                !actividad
                                            }
                                            onClick={() =>
                                                analizarEntregable(
                                                    codigo
                                                )
                                            }
                                            className="
                                                w-full
                                                rounded-xl
                                                bg-[#1D3681]
                                                px-4
                                                py-3
                                                text-xs
                                                font-black
                                                text-white
                                                transition-all
                                                hover:bg-[#162b69]
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >

                                            {analizando

                                                ? "Analizando..."

                                                : resultado
                                                    ? "Volver a analizar"
                                                    : "Analizar entregable"

                                            }

                                        </button>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}


            {/* ==================================================
                RESUMEN FINAL
            ================================================== */}

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-wider
                                text-slate-400
                            "
                        >
                            Resultado de revisión
                        </p>


                        <h3
                            className="
                                mt-1
                                text-lg
                                font-black
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Nota final del estudiante
                        </h3>

                    </div>


                    <div
                        className="
                            text-right
                        "
                    >

                        <span
                            className="
                                text-3xl
                                font-black
                                text-[#1D3681]
                                dark:text-blue-300
                            "
                        >
                            {Number(
                                notaFinal.puntajeFinal
                            ).toFixed(2)}
                        </span>


                        <span
                            className="
                                ml-1
                                text-sm
                                font-bold
                                text-slate-400
                            "
                        >
                            / 6.00
                        </span>

                    </div>

                </div>


                <div
                    className="
                        mt-5
                        grid
                        gap-3
                        sm:grid-cols-3
                    "
                >

                    {ENTREGABLES.map(
                        codigo => {

                            const resultado =
                                resultados[codigo];


                            return (

                                <div
                                    key={codigo}
                                    className="
                                        rounded-xl
                                        bg-slate-50
                                        px-4
                                        py-3
                                        dark:bg-slate-800
                                    "
                                >

                                    <p
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            text-slate-400
                                        "
                                    >
                                        {codigo}
                                    </p>


                                    <p
                                        className="
                                            mt-1
                                            text-lg
                                            font-black
                                            text-slate-800
                                            dark:text-white
                                        "
                                    >
                                        {resultado?.puntaje !==
                                        null &&
                                        resultado?.puntaje !==
                                        undefined

                                            ? Number(
                                                resultado.puntaje
                                            ).toFixed(2)

                                            : "--"
                                        }

                                        <span
                                            className="
                                                text-xs
                                                text-slate-400
                                            "
                                        >
                                            {" "}
                                            / 2.00
                                        </span>

                                    </p>

                                </div>

                            );

                        }
                    )}

                </div>


                {/* ANALIZAR TODO */}

                <button
                    type="button"
                    disabled={
                        Boolean(
                            entregableAnalizando
                        )
                    }
                    onClick={
                        analizarTodos
                    }
                    className="
                        mt-5
                        w-full
                        rounded-xl
                        border
                        border-[#1D3681]
                        bg-[#EEF3FF]
                        px-4
                        py-3
                        text-sm
                        font-black
                        text-[#1D3681]
                        transition-colors
                        hover:bg-[#E2E9FF]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {entregableAnalizando
                        ? `Analizando ${entregableAnalizando}...`
                        : "Analizar los 3 entregables"
                    }
                </button>

            </div>

        </div>

    );

}
