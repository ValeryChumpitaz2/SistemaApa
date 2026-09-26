import React from "react";

// ============================================================
// SERVICIO DE ANÁLISIS
// ============================================================

import { analizarDocumento } from "../../services/teacherService.js";

// ============================================================
// ESTILOS
// ============================================================

const COLORES = {
    borde: "#e5e7eb",
    texto: "#111827",
    textoSecundario: "#6b7280",
    azul: "#2563eb",
    azulClaro: "#eff6ff",
    verde: "#16a34a",
    verdeClaro: "#f0fdf4",
    amarillo: "#d97706",
    amarilloClaro: "#fffbeb",
    rojo: "#dc2626",
    rojoClaro: "#fef2f2",
};

// ============================================================
// OBTENER NOMBRE DE ARCHIVO
// ============================================================

function obtenerNombreArchivo(documento) {

    if (!documento) {
        return "Documento";
    }

    const driveFile =
        documento?.driveFile ||
        documento?.driveFileAttachment ||
        documento?.file ||
        {};

    const nombre =
        documento?.title ||
        documento?.name ||
        documento?.fileName ||
        documento?.filename ||
        driveFile?.title ||
        driveFile?.name ||
        driveFile?.fileName ||
        "Documento";

    return String(nombre).trim();
}

// ============================================================
// OBTENER URL
// ============================================================

function obtenerUrlDocumento(documento) {

    if (!documento) {
        return "";
    }

    const driveFile =
        documento?.driveFile ||
        documento?.driveFileAttachment ||
        documento?.file ||
        {};

    return String(
        documento?.alternateLink ||
        documento?.webViewLink ||
        documento?.url ||
        documento?.link ||
        driveFile?.alternateLink ||
        driveFile?.webViewLink ||
        driveFile?.url ||
        driveFile?.link ||
        ""
    ).trim();
}

// ============================================================
// OBTENER DOCUMENTOS
// ============================================================

function obtenerDocumentos(entrega) {

    if (!entrega) {
        return [];
    }

    const documentos =
        entrega?.documentos ||
        entrega?.attachments ||
        entrega?.assignmentSubmission?.attachments ||
        entrega?.assignmentSubmission?.driveFileAttachments ||
        [];

    return Array.isArray(documentos)
        ? documentos
        : [];
}

// ============================================================
// OBTENER PUNTOS
// ============================================================

function obtenerPuntos(entrega) {

    if (!entrega) {
        return null;
    }

    const puntos =
        entrega?.puntos ??
        entrega?.assignedGrade ??
        entrega?.assignedPoints ??
        entrega?.grade ??
        entrega?.puntaje ??
        null;

    if (
        puntos === null ||
        puntos === undefined ||
        puntos === ""
    ) {
        return null;
    }

    const numero = Number(puntos);

    return Number.isFinite(numero)
        ? numero
        : null;
}

// ============================================================
// OBTENER ESTADO
// ============================================================

function obtenerEstado(entrega) {

    if (!entrega) {
        return "SIN ENTREGA";
    }

    return String(
        entrega?.estado ||
        entrega?.state ||
        entrega?.status ||
        "ENTREGADO"
    )
        .trim()
        .toUpperCase();
}

// ============================================================
// ESTILO ESTADO
// ============================================================

function obtenerEstiloEstado(estado) {

    const texto =
        String(estado || "").toUpperCase();

    if (
        texto.includes("TURNED_IN") ||
        texto.includes("ENTREG") ||
        texto.includes("DEVOLV")
    ) {
        return {
            fondo: COLORES.verdeClaro,
            texto: COLORES.verde,
        };
    }

    if (
        texto.includes("MISSING") ||
        texto.includes("FALTA") ||
        texto.includes("SIN ENTREGA")
    ) {
        return {
            fondo: COLORES.rojoClaro,
            texto: COLORES.rojo,
        };
    }

    return {
        fondo: COLORES.amarilloClaro,
        texto: COLORES.amarillo,
    };
}

// ============================================================
// OBTENER URL DE UN DOCUMENTO
// ============================================================

function obtenerUrlParaAnalisis(documento) {

    if (!documento) {
        return "";
    }

    const driveFile =
        documento?.driveFile ||
        documento?.driveFileAttachment ||
        documento?.file ||
        {};

    const url =
        documento?.alternateLink ||
        documento?.webViewLink ||
        documento?.url ||
        documento?.link ||
        driveFile?.alternateLink ||
        driveFile?.webViewLink ||
        driveFile?.url ||
        driveFile?.link ||
        "";

    return String(url).trim();
}

// ============================================================
// EXTRAER PUNTAJE DEL BACKEND
// ============================================================

function obtenerPuntajeAnalisis(resultado) {

    if (!resultado) {
        return null;
    }

    // --------------------------------------------------------
    // CASO NORMAL
    // --------------------------------------------------------

    const puntajeDirecto =
        resultado?.puntaje?.obtenido ??
        resultado?.data?.puntaje?.obtenido ??
        null;

    if (
        puntajeDirecto !== null &&
        puntajeDirecto !== undefined &&
        Number.isFinite(
            Number(puntajeDirecto)
        )
    ) {
        return Number(puntajeDirecto);
    }

    // --------------------------------------------------------
    // POR SI EL BACKEND DEVUELVE OTRA ESTRUCTURA
    // --------------------------------------------------------

    const alternativas = [
        resultado?.obtenido,
        resultado?.data?.obtenido,
        resultado?.puntaje,
        resultado?.data?.puntaje,
    ];

    for (const valor of alternativas) {

        if (
            valor !== null &&
            valor !== undefined &&
            Number.isFinite(Number(valor))
        ) {
            return Number(valor);
        }

    }

    return null;
}

// ============================================================
// COMPONENTE
// ============================================================

export default function ClassroomStudentModal({

    open = true,

    estudiante = null,

    entregas = {},

    onClose,

    onOpenDocument,

    onSaveGrades,

}) {

    // ========================================================
    // CALIFICACIONES
    // ========================================================

    const [
        calificaciones,
        setCalificaciones
    ] = React.useState({

        EN1: null,
        EN2: null,
        EN3: null,

    });

    // ========================================================
    // RESULTADOS DEL ANÁLISIS
    // ========================================================

    const [
        resultadosAnalisis,
        setResultadosAnalisis
    ] = React.useState({

        EN1: null,
        EN2: null,
        EN3: null,

    });

    // ========================================================
    // ESTADOS DE ANÁLISIS
    // ========================================================

    const [
        analizando,
        setAnalizando
    ] = React.useState({

        EN1: false,
        EN2: false,
        EN3: false,

    });

    // ========================================================
    // ANALIZADOS
    // ========================================================

    const [
        analizados,
        setAnalizados
    ] = React.useState({

        EN1: false,
        EN2: false,
        EN3: false,

    });

    // ========================================================
    // GUARDAR
    // ========================================================

    const [
        guardando,
        setGuardando
    ] = React.useState(false);

    const [
        guardado,
        setGuardado
    ] = React.useState(false);

    // ========================================================
    // INFORMACIÓN ESTUDIANTE
    // ========================================================

    const nombre =
        estudiante?.nombre ||
        estudiante?.name ||
        estudiante?.nombreCompleto ||
        "Alumno";

    const email =
        estudiante?.email ||
        estudiante?.correo ||
        estudiante?.emailAddress ||
        "";

    const userId =
        estudiante?.userId ||
        estudiante?.id ||
        "";

    // ========================================================
    // ENTREGABLES
    // ========================================================

    const entregables = React.useMemo(() => [

        {
            codigo: "EN1",
            titulo: "Entregable 1",
            entrega:
                entregas?.EN1 ||
                estudiante?.entregas?.EN1 ||
                null,
        },

        {
            codigo: "EN2",
            titulo: "Entregable 2",
            entrega:
                entregas?.EN2 ||
                estudiante?.entregas?.EN2 ||
                null,
        },

        {
            codigo: "EN3",
            titulo: "Entregable 3",
            entrega:
                entregas?.EN3 ||
                estudiante?.entregas?.EN3 ||
                null,
        },

    ], [
        entregas,
        estudiante,
    ]);

    // ========================================================
    // ANALIZAR UN ENTREGABLE
    // ========================================================

    async function analizarEntregable(
        codigo,
        entrega
    ) {

        console.log(
            "=============================================="
        );

        console.log(
            `🧪 ANALIZANDO ${codigo}`
        );

        // ----------------------------------------------------
        // BUSCAR DOCUMENTOS
        // ----------------------------------------------------

        const documentos =
            obtenerDocumentos(
                entrega
            );

        if (
            documentos.length === 0
        ) {

            console.warn(
                `⚠️ ${codigo} no tiene documentos`
            );

            return;

        }

        // ----------------------------------------------------
        // TOMAR EL PRIMER DOCUMENTO
        // ----------------------------------------------------

        const documento =
            documentos[0];

        const url =
            obtenerUrlParaAnalisis(
                documento
            );

        console.log(
            "URL:",
            url
        );

        if (!url) {

            console.warn(
                `⚠️ ${codigo} no tiene URL`
            );

            return;

        }

        // ----------------------------------------------------
        // ACTIVAR LOADING
        // ----------------------------------------------------

        setAnalizando(
            prev => ({
                ...prev,
                [codigo]: true,
            })
        );

        try {

            // ------------------------------------------------
            // LLAMAR BACKEND
            // ------------------------------------------------

            const resultado =
                await analizarDocumento(
                    url
                );

            console.log(
                `✅ RESULTADO DEL ANÁLISIS ${codigo}:`,
                resultado
            );

            // ------------------------------------------------
            // OBTENER PUNTAJE
            // ------------------------------------------------

            const puntaje =
                obtenerPuntajeAnalisis(
                    resultado
                );

            console.log(
                `📊 ${codigo}:`,
                puntaje,
                "/ 2"
            );

            // ------------------------------------------------
            // PORCENTAJE
            // ------------------------------------------------

            if (
                puntaje !== null
            ) {

                console.log(
                    `📊 ${codigo} porcentaje:`,
                    Math.round(
                        (puntaje / 2) * 100
                    ),
                    "%"
                );

            }

            // ------------------------------------------------
            // GUARDAR RESULTADO
            // ------------------------------------------------

            setResultadosAnalisis(
                prev => ({
                    ...prev,
                    [codigo]:
                        resultado,
                })
            );

            // ------------------------------------------------
            // GUARDAR CALIFICACIÓN
            // ------------------------------------------------

            setCalificaciones(
                prev => ({
                    ...prev,
                    [codigo]:
                        puntaje !== null
                            ? Number(
                                puntaje.toFixed(2)
                            )
                            : null,
                })
            );

            setAnalizados(
                prev => ({
                    ...prev,
                    [codigo]: true,
                })
            );

            setGuardado(false);

        } catch (error) {

            console.error(
                `❌ ERROR ANALIZANDO ${codigo}:`,
                error
            );

        } finally {

            setAnalizando(
                prev => ({
                    ...prev,
                    [codigo]: false,
                })
            );

        }

    }

    // ========================================================
    // ANALIZAR TODOS
    // ========================================================

    async function analizarTodos() {

        console.log(
            "=============================================="
        );

        console.log(
            "🤖 INICIANDO ANÁLISIS AUTOMÁTICO"
        );

        console.log(
            "=============================================="
        );

        for (
            const item
            of entregables
        ) {

            if (
                !item.entrega
            ) {
                continue;
            }

            const documentos =
                obtenerDocumentos(
                    item.entrega
                );

            if (
                documentos.length === 0
            ) {
                continue;
            }

            await analizarEntregable(
                item.codigo,
                item.entrega
            );

        }

        console.log(
            "=============================================="
        );

        console.log(
            "🤖 ANÁLISIS AUTOMÁTICO TERMINADO"
        );

        console.log(
            "=============================================="
        );

    }

    // ========================================================
    // ANALIZAR AUTOMÁTICAMENTE AL ABRIR
    // ========================================================

    const estudianteIdAnalisis =
        estudiante?.userId ||
        estudiante?.id ||
        "";

    const analisisEjecutadoRef =
        React.useRef("");

    React.useEffect(() => {

        if (
            !open ||
            !estudiante
        ) {
            return;
        }

        const clave =
            String(
                estudianteIdAnalisis
            );

        if (
            analisisEjecutadoRef.current ===
            clave
        ) {
            return;
        }

        analisisEjecutadoRef.current =
            clave;

        // ----------------------------------------------------
        // LIMPIAR
        // ----------------------------------------------------

        setCalificaciones({

            EN1: null,
            EN2: null,
            EN3: null,

        });

        setResultadosAnalisis({

            EN1: null,
            EN2: null,
            EN3: null,

        });

        setAnalizados({

            EN1: false,
            EN2: false,
            EN3: false,

        });

        setGuardado(false);

        // ----------------------------------------------------
        // ANALIZAR
        // ----------------------------------------------------

        analizarTodos();

    }, [
        open,
        estudianteIdAnalisis,
    ]);

    // ========================================================
    // TOTAL
    // ========================================================

    const notas =
        Object.values(
            calificaciones
        );

    const notasValidas =
        notas.filter(
            nota =>
                nota !== null &&
                nota !== undefined &&
                Number.isFinite(
                    Number(nota)
                )
        );

    const total =
        notasValidas.length > 0
            ? notasValidas.reduce(
                (
                    suma,
                    nota
                ) =>
                    suma +
                    Number(nota),
                0
            )
            : null;

    const totalRedondeado =
        total !== null
            ? Number(
                total.toFixed(2)
            )
            : null;

    const porcentaje =
        total !== null
            ? Math.min(
                (
                    total / 6
                ) * 100,
                100
            )
            : 0;

    // ========================================================
    // CAMBIAR CALIFICACIÓN MANUAL
    // ========================================================

    function cambiarCalificacion(
        codigo,
        valor
    ) {

        if (
            valor === ""
        ) {

            setCalificaciones(
                prev => ({
                    ...prev,
                    [codigo]: null,
                })
            );

            setGuardado(false);

            return;

        }

        let numero =
            Number(valor);

        if (
            !Number.isFinite(
                numero
            )
        ) {
            return;
        }

        if (
            numero < 0
        ) {
            numero = 0;
        }

        if (
            numero > 2
        ) {
            numero = 2;
        }

        numero =
            Math.round(
                numero * 100
            ) / 100;

        setCalificaciones(
            prev => ({
                ...prev,
                [codigo]: numero,
            })
        );

        setGuardado(false);

    }

    // ========================================================
    // GUARDAR CALIFICACIONES
    // ========================================================

    async function guardarCalificaciones() {

        if (
            !onSaveGrades
        ) {

            console.warn(
                "No se proporcionó onSaveGrades"
            );

            return;

        }

        try {

            setGuardando(true);

            setGuardado(false);

            await onSaveGrades({

                estudiante,

                estudianteId:
                    userId,

                calificaciones: {

                    EN1:
                        calificaciones.EN1,

                    EN2:
                        calificaciones.EN2,

                    EN3:
                        calificaciones.EN3,

                },

                total:
                    totalRedondeado,

                maximo: 6,

                resultadosAnalisis,

            });

            setGuardado(true);

        } catch (
            error
        ) {

            console.error(
                "❌ Error guardando calificaciones:",
                error
            );

        } finally {

            setGuardando(false);

        }

    }

    // ========================================================
    // ESC
    // ========================================================

    React.useEffect(() => {

        function manejarKeyDown(
            evento
        ) {

            if (
                evento.key ===
                "Escape"
            ) {

                onClose?.();

            }

        }

        document.addEventListener(
            "keydown",
            manejarKeyDown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                manejarKeyDown
            );

        };

    }, [
        onClose,
    ]);

    // ========================================================
    // NO MOSTRAR
    // ========================================================

    if (
        !open ||
        !estudiante
    ) {

        return null;

    }

    // ========================================================
    // CONTADOR ENTREGABLES
    // ========================================================

    const cantidadEntregas =
        entregables.filter(
            item =>
                item.entrega
        ).length;

    const cantidadAnalizados =
        Object.values(
            analizados
        ).filter(
            Boolean
        ).length;

    const cantidadAnalizando =
        Object.values(
            analizando
        ).filter(
            Boolean
        ).length;

    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-slate-950/50
                p-4
                backdrop-blur-sm
            "
            onMouseDown={(
                evento
            ) => {

                if (
                    evento.target ===
                    evento.currentTarget
                ) {

                    onClose?.();

                }

            }}
        >

            <div
                className="
                    flex
                    w-full
                    max-w-4xl
                    max-h-[92vh]
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-2xl
                "
            >

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div
                    className="
                        flex
                        shrink-0
                        items-start
                        justify-between
                        gap-4
                        border-b
                        border-slate-200
                        bg-white
                        px-6
                        py-5
                    "
                >

                    <div className="min-w-0">

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
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-blue-600
                                    text-lg
                                    font-black
                                    text-white
                                    shadow-lg
                                    shadow-blue-200
                                "
                            >
                                {nombre
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="min-w-0">

                                <h2
                                    className="
                                        truncate
                                        text-xl
                                        font-black
                                        text-slate-900
                                    "
                                >
                                    {nombre}
                                </h2>

                                {email && (

                                    <p
                                        className="
                                            mt-1
                                            truncate
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        {email}
                                    </p>

                                )}

                            </div>

                        </div>

                        {userId && (

                            <p
                                className="
                                    mt-3
                                    text-xs
                                    text-slate-400
                                "
                            >
                                ID: {userId}
                            </p>

                        )}

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-xl
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>

                {/* ================================================= */}
                {/* CONTENIDO */}
                {/* ================================================= */}

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        px-6
                        py-6
                    "
                >

                    {/* ================================================= */}
                    {/* RESUMEN */}
                    {/* ================================================= */}

                    <div
                        className="
                            mb-6
                            grid
                            gap-4
                            md:grid-cols-2
                        "
                    >

                        {/* ENTREGABLES */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
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
                                        Entregables
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-3xl
                                            font-black
                                            text-slate-900
                                        "
                                    >
                                        {cantidadEntregas}

                                        <span
                                            className="
                                                text-sm
                                                font-medium
                                                text-slate-400
                                            "
                                        >
                                            {" "} / 3
                                        </span>
                                    </p>

                                </div>

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white
                                        shadow-sm
                                    "
                                >
                                    📚
                                </div>

                            </div>

                            <p
                                className="
                                    mt-3
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                {cantidadAnalizando > 0
                                    ? `Analizando ${cantidadAnalizando} documento(s)...`
                                    : `${cantidadAnalizados} de ${cantidadEntregas} analizado(s)`}
                            </p>

                        </div>

                        {/* PUNTAJE */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-blue-100
                                bg-gradient-to-br
                                from-blue-50
                                to-indigo-50
                                p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            text-blue-500
                                        "
                                    >
                                        Puntaje del análisis
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-3xl
                                            font-black
                                            text-blue-700
                                        "
                                    >
                                        {totalRedondeado !== null
                                            ? totalRedondeado.toFixed(2)
                                            : "—"}

                                        <span
                                            className="
                                                ml-1
                                                text-base
                                                font-semibold
                                                text-blue-400
                                            "
                                        >
                                            / 6
                                        </span>

                                    </p>

                                </div>

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white
                                        text-lg
                                        shadow-sm
                                    "
                                >
                                    🎯
                                </div>

                            </div>

                            <div
                                className="
                                    mt-4
                                    h-2.5
                                    overflow-hidden
                                    rounded-full
                                    bg-blue-100
                                "
                            >

                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-blue-600
                                        transition-all
                                        duration-300
                                    "
                                    style={{
                                        width:
                                            `${porcentaje}%`,
                                    }}
                                />

                            </div>

                            <p
                                className="
                                    mt-2
                                    text-xs
                                    font-medium
                                    text-blue-500
                                "
                            >
                                {total !== null
                                    ? `${porcentaje.toFixed(0)}% del puntaje máximo`
                                    : "Esperando análisis"}
                            </p>

                        </div>

                    </div>

                    {/* ================================================= */}
                    {/* INDICACIÓN */}
                    {/* ================================================= */}

                    <div
                        className="
                            mb-5
                            rounded-2xl
                            border
                            border-blue-100
                            bg-blue-50
                            px-4
                            py-3
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >

                            <span className="text-lg">
                                🤖
                            </span>

                            <div className="flex-1">

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-blue-800
                                    "
                                >
                                    Calificación automática por análisis
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        leading-relaxed
                                        text-blue-600
                                    "
                                >
                                    Cada documento se analiza
                                    automáticamente y el puntaje
                                    obtenido se asigna al entregable
                                    correspondiente. Cada entregable
                                    tiene un valor máximo de 2 puntos.
                                </p>

                            </div>

                            {cantidadAnalizando > 0 && (

                                <div
                                    className="
                                        shrink-0
                                        rounded-lg
                                        bg-blue-100
                                        px-2.5
                                        py-1.5
                                        text-xs
                                        font-bold
                                        text-blue-700
                                    "
                                >
                                    Analizando...
                                </div>

                            )}

                        </div>

                    </div>

                    {/* ================================================= */}
                    {/* ENTREGABLES */}
                    {/* ================================================= */}

                    <div className="space-y-4">

                        {entregables.map(
                            ({
                                codigo,
                                titulo,
                                entrega,
                            }) => {

                                const estado =
                                    obtenerEstado(
                                        entrega
                                    );

                                const estiloEstado =
                                    obtenerEstiloEstado(
                                        estado
                                    );

                                const documentos =
                                    obtenerDocumentos(
                                        entrega
                                    );

                                const puntos =
                                    calificaciones[
                                        codigo
                                    ];

                                const estaAnalizando =
                                    analizando[
                                        codigo
                                    ];

                                const fueAnalizado =
                                    analizados[
                                        codigo
                                    ];

                                const resultado =
                                    resultadosAnalisis[
                                        codigo
                                    ];

                                const porcentajeEntregable =
                                    puntos !== null &&
                                    puntos !== undefined
                                        ? Math.min(
                                            (
                                                Number(
                                                    puntos
                                                ) / 2
                                            ) * 100,
                                            100
                                        )
                                        : 0;

                                return (

                                    <div
                                        key={codigo}
                                        className="
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-5
                                            shadow-sm
                                            transition
                                            hover:shadow-md
                                        "
                                    >

                                        {/* CABECERA */}

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

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            rounded-lg
                                                            bg-blue-50
                                                            px-2.5
                                                            py-1
                                                            text-xs
                                                            font-black
                                                            text-blue-700
                                                        "
                                                    >
                                                        {codigo}
                                                    </span>

                                                    <h3
                                                        className="
                                                            font-black
                                                            text-slate-800
                                                        "
                                                    >
                                                        {titulo}
                                                    </h3>

                                                </div>

                                                <p
                                                    className="
                                                        mt-2
                                                        text-xs
                                                        text-slate-500
                                                    "
                                                >
                                                    Valor máximo:
                                                    {" "}
                                                    <strong>
                                                        2 puntos
                                                    </strong>
                                                </p>

                                            </div>

                                            {/* CALIFICACIÓN */}

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >

                                                <span
                                                    className="
                                                        rounded-full
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-bold
                                                    "
                                                    style={{
                                                        backgroundColor:
                                                            estiloEstado.fondo,
                                                        color:
                                                            estiloEstado.texto,
                                                    }}
                                                >
                                                    {estado}
                                                </span>

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        rounded-xl
                                                        border
                                                        border-slate-200
                                                        bg-slate-50
                                                        px-2
                                                        py-1.5
                                                    "
                                                >

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="2"
                                                        step="0.01"
                                                        value={
                                                            puntos ??
                                                            ""
                                                        }
                                                        onChange={(
                                                            evento
                                                        ) =>
                                                            cambiarCalificacion(
                                                                codigo,
                                                                evento
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="
                                                            w-16
                                                            bg-transparent
                                                            text-center
                                                            text-base
                                                            font-black
                                                            text-slate-800
                                                            outline-none
                                                        "
                                                        placeholder="—"
                                                    />

                                                    <span
                                                        className="
                                                            pr-1
                                                            text-xs
                                                            font-bold
                                                            text-slate-400
                                                        "
                                                    >
                                                        / 2
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* ESTADO DEL ANÁLISIS */}

                                        {estaAnalizando && (

                                            <div
                                                className="
                                                    mt-4
                                                    flex
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-blue-50
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <span>
                                                    🔄
                                                </span>

                                                <p
                                                    className="
                                                        text-xs
                                                        font-bold
                                                        text-blue-700
                                                    "
                                                >
                                                    Analizando documento...
                                                </p>

                                            </div>

                                        )}

                                        {fueAnalizado &&
                                            !estaAnalizando && (

                                            <div
                                                className="
                                                    mt-4
                                                    flex
                                                    items-center
                                                    justify-between
                                                    rounded-xl
                                                    border
                                                    border-emerald-100
                                                    bg-emerald-50
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <span>
                                                        ✓
                                                    </span>

                                                    <p
                                                        className="
                                                            text-xs
                                                            font-bold
                                                            text-emerald-700
                                                        "
                                                    >
                                                        Análisis completado
                                                    </p>

                                                </div>

                                                {resultado?.puntaje && (

                                                    <span
                                                        className="
                                                            text-xs
                                                            font-black
                                                            text-emerald-700
                                                        "
                                                    >
                                                        Resultado del análisis:
                                                        {" "}
                                                        {resultado
                                                            .puntaje
                                                            .porcentaje
                                                            ??
                                                            Math.round(
                                                                (
                                                                    Number(
                                                                        puntos
                                                                    ) /
                                                                    2
                                                                ) *
                                                                100
                                                            )}
                                                        %
                                                    </span>

                                                )}

                                            </div>

                                        )}

                                        {/* INDICADOR */}

                                        <div className="mt-4">

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    text-xs
                                                "
                                            >

                                                <span
                                                    className="
                                                        font-semibold
                                                        text-slate-400
                                                    "
                                                >
                                                    Puntaje del análisis
                                                </span>

                                                <span
                                                    className="
                                                        font-black
                                                        text-slate-600
                                                    "
                                                >
                                                    {puntos !== null &&
                                                    puntos !== undefined
                                                        ? `${Number(
                                                            puntos
                                                        ).toFixed(2)} / 2`
                                                        : estaAnalizando
                                                            ? "Analizando..."
                                                            : "Sin calificar"}
                                                </span>

                                            </div>

                                            <div
                                                className="
                                                    mt-2
                                                    h-1.5
                                                    overflow-hidden
                                                    rounded-full
                                                    bg-slate-100
                                                "
                                            >

                                                <div
                                                    className="
                                                        h-full
                                                        rounded-full
                                                        bg-blue-500
                                                        transition-all
                                                        duration-300
                                                    "
                                                    style={{
                                                        width:
                                                            `${porcentajeEntregable}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>

                                        {/* DOCUMENTOS */}

                                        <div
                                            className="
                                                mt-5
                                                border-t
                                                border-slate-100
                                                pt-4
                                            "
                                        >

                                            <p
                                                className="
                                                    mb-3
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wide
                                                    text-slate-400
                                                "
                                            >
                                                Documento enviado
                                            </p>

                                            {documentos.length === 0 ? (

                                                <div
                                                    className="
                                                        rounded-xl
                                                        border
                                                        border-dashed
                                                        border-slate-200
                                                        bg-slate-50
                                                        px-4
                                                        py-5
                                                        text-center
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-sm
                                                            font-semibold
                                                            text-slate-500
                                                        "
                                                    >
                                                        No se encontró un documento
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xs
                                                            text-slate-400
                                                        "
                                                    >
                                                        Este entregable todavía
                                                        no tiene un archivo disponible.
                                                    </p>

                                                </div>

                                            ) : (

                                                <div className="space-y-2">

                                                    {documentos.map(
                                                        (
                                                            documento,
                                                            indice
                                                        ) => {

                                                            const nombreArchivo =
                                                                obtenerNombreArchivo(
                                                                    documento
                                                                );

                                                            const url =
                                                                obtenerUrlDocumento(
                                                                    documento
                                                                );

                                                            return (

                                                                <div
                                                                    key={
                                                                        documento?.id ||
                                                                        documento?.fileId ||
                                                                        indice
                                                                    }
                                                                    className="
                                                                        flex
                                                                        flex-col
                                                                        gap-3
                                                                        rounded-xl
                                                                        border
                                                                        border-slate-200
                                                                        bg-slate-50
                                                                        p-3
                                                                        sm:flex-row
                                                                        sm:items-center
                                                                        sm:justify-between
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
                                                                                h-10
                                                                                w-10
                                                                                shrink-0
                                                                                items-center
                                                                                justify-center
                                                                                rounded-xl
                                                                                bg-white
                                                                                text-blue-600
                                                                                shadow-sm
                                                                            "
                                                                        >
                                                                            📄
                                                                        </div>

                                                                        <div className="min-w-0">

                                                                            <p
                                                                                className="
                                                                                    truncate
                                                                                    text-sm
                                                                                    font-bold
                                                                                    text-slate-700
                                                                                "
                                                                            >
                                                                                {nombreArchivo}
                                                                            </p>

                                                                            <p
                                                                                className="
                                                                                    mt-0.5
                                                                                    text-xs
                                                                                    text-slate-400
                                                                                "
                                                                            >
                                                                                Documento del {codigo}
                                                                            </p>

                                                                        </div>

                                                                    </div>

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            shrink-0
                                                                            items-center
                                                                            gap-2
                                                                        "
                                                                    >

                                                                        {url && (

                                                                            <a
                                                                                href={url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="
                                                                                    rounded-xl
                                                                                    border
                                                                                    border-slate-200
                                                                                    bg-white
                                                                                    px-3
                                                                                    py-2
                                                                                    text-xs
                                                                                    font-bold
                                                                                    text-slate-600
                                                                                    transition
                                                                                    hover:border-blue-200
                                                                                    hover:bg-blue-50
                                                                                    hover:text-blue-700
                                                                                "
                                                                            >
                                                                                Abrir
                                                                            </a>

                                                                        )}

                                                                        {onOpenDocument && (

                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    onOpenDocument(
                                                                                        documento,
                                                                                        {
                                                                                            codigo,
                                                                                            entrega,
                                                                                            estudiante,
                                                                                        }
                                                                                    )
                                                                                }
                                                                                className="
                                                                                    rounded-xl
                                                                                    bg-blue-600
                                                                                    px-3
                                                                                    py-2
                                                                                    text-xs
                                                                                    font-bold
                                                                                    text-white
                                                                                    transition
                                                                                    hover:bg-blue-700
                                                                                "
                                                                            >
                                                                                Ver documento
                                                                            </button>

                                                                        )}

                                                                    </div>

                                                                </div>

                                                            );

                                                        }
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                </div>

                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <div
                    className="
                        flex
                        shrink-0
                        flex-col
                        gap-3
                        border-t
                        border-slate-200
                        bg-slate-50
                        px-6
                        py-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        {guardado ? (

                            <p
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    font-semibold
                                    text-green-600
                                "
                            >
                                <span>
                                    ✓
                                </span>

                                Calificaciones guardadas correctamente
                            </p>

                        ) : cantidadAnalizando > 0 ? (

                            <p
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    font-semibold
                                    text-blue-600
                                "
                            >
                                <span>
                                    🔄
                                </span>

                                Analizando documentos...
                            </p>

                        ) : (

                            <p
                                className="
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Cada entregable vale hasta 2 puntos.
                                Puntaje máximo: 6.
                            </p>

                        )}

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-bold
                                text-slate-600
                                transition
                                hover:bg-slate-100
                            "
                        >
                            Cerrar
                        </button>

                        <button
                            type="button"
                            onClick={guardarCalificaciones}
                            disabled={
                                guardando ||
                                cantidadAnalizando > 0 ||
                                !onSaveGrades
                            }
                            className="
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-2.5
                                text-sm
                                font-bold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-blue-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {guardando
                                ? "Guardando..."
                                : "Guardar calificaciones"}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}
