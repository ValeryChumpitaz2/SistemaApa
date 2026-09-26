import React from "react";
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
// OBTENER URL DEL DOCUMENTO
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
// OBTENER URL DE LA ENTREGA
// ============================================================
//
// Toma el primer documento enviado.
//
// ============================================================

function obtenerUrlEntrega(entrega) {

    const documentos =
        obtenerDocumentos(entrega);


    if (
        !Array.isArray(documentos) ||
        documentos.length === 0
    ) {
        return "";
    }


    return obtenerUrlDocumento(
        documentos[0]
    );
}


// ============================================================
// OBTENER PUNTOS DE CLASSROOM
// ============================================================
//
// Se conserva únicamente como respaldo.
// El puntaje principal ahora viene del análisis.
//
// ============================================================

function obtenerPuntosClassroom(entrega) {

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


    const numero =
        Number(puntos);


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
// COLOR DEL ESTADO
// ============================================================

function obtenerEstiloEstado(estado) {

    const texto =
        String(
            estado || ""
        ).toUpperCase();


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
    // ESTADO DE CALIFICACIONES
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
    // RESULTADOS COMPLETOS DEL ANÁLISIS
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
    // ESTADO DE ANÁLISIS
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
    // ERRORES DE ANÁLISIS
    // ========================================================

    const [
        erroresAnalisis,
        setErroresAnalisis
    ] = React.useState({

        EN1: null,
        EN2: null,
        EN3: null,

    });


    // ========================================================
    // ESTADO DE GUARDADO
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
    // INFORMACIÓN DEL ESTUDIANTE
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

    const entregables = [

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

    ];


    // ========================================================
    // ANALIZAR UN ENTREGABLE
    // ========================================================

    async function analizarEntregable(
        codigo,
        entrega
    ) {

        const url =
            obtenerUrlEntrega(
                entrega
            );


        // ----------------------------------------------------
        // SIN DOCUMENTO
        // ----------------------------------------------------

        if (!url) {

            console.warn(
                `No se encontró documento para ${codigo}`
            );


            setErroresAnalisis(
                prev => ({
                    ...prev,

                    [codigo]:
                        "No se encontró un documento para analizar.",

                })
            );


            return null;

        }


        try {

            // ------------------------------------------------
            // ACTIVAR LOADING
            // ------------------------------------------------

            setAnalizando(
                prev => ({
                    ...prev,

                    [codigo]: true,

                })
            );


            setErroresAnalisis(
                prev => ({
                    ...prev,

                    [codigo]: null,

                })
            );


            console.log(
                "================================================"
            );


            console.log(
                `🧪 ANALIZANDO ${codigo}`
            );


            console.log(
                "URL:",
                url
            );


            console.log(
                "================================================"
            );


            // ------------------------------------------------
            // LLAMAR TEACHER SERVICE
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
            // VALIDAR RESULTADO
            // ------------------------------------------------

            const puntaje =
                resultado?.puntaje;


            if (!puntaje) {

                throw new Error(
                    `El análisis de ${codigo} no devolvió información de puntaje.`
                );

            }


            // ------------------------------------------------
            // OBTENER VALORES
            // ------------------------------------------------

            const obtenido =
                Number(
                    puntaje?.obtenido
                );


            const maximo =
                Number(
                    puntaje?.maximo
                );


            const porcentaje =
                Number(
                    puntaje?.porcentaje
                );


            // ------------------------------------------------
            // VALIDAR PUNTAJE
            // ------------------------------------------------

            if (
                !Number.isFinite(
                    obtenido
                )
            ) {

                throw new Error(
                    `El puntaje obtenido de ${codigo} no es válido.`
                );

            }


            // ------------------------------------------------
            // LA NOTA DEL ENTREGABLE
            //
            // El backend ya devuelve:
            //
            // obtenido: 1.44
            // maximo: 2
            // porcentaje: 72
            //
            // Por tanto:
            //
            // EN1 = 1.44 / 2
            //
            // ------------------------------------------------

            let nota =
                obtenido;


            // ------------------------------------------------
            // ASEGURAR RANGO
            // ------------------------------------------------

            if (nota < 0) {
                nota = 0;
            }


            if (nota > 2) {
                nota = 2;
            }


            // ------------------------------------------------
            // REDONDEAR
            // ------------------------------------------------

            nota =
                Math.round(
                    nota * 100
                ) / 100;


            // ------------------------------------------------
            // GUARDAR RESULTADO COMPLETO
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
                        nota,

                })
            );


            setGuardado(false);


            console.log(
                `📊 ${codigo}:`,
                nota,
                "/ 2"
            );


            console.log(
                `📊 ${codigo} porcentaje:`,
                Number.isFinite(porcentaje)
                    ? porcentaje
                    : "N/D",
                "%"
            );


            console.log(
                `📊 ${codigo} máximo backend:`,
                Number.isFinite(maximo)
                    ? maximo
                    : "N/D"
            );


            return resultado;

        }
        catch (error) {

            console.error(
                `❌ ERROR ANALIZANDO ${codigo}:`,
                error
            );


            setErroresAnalisis(
                prev => ({
                    ...prev,

                    [codigo]:
                        error?.message ||
                        "No se pudo analizar el documento.",

                })
            );


            return null;

        }
        finally {

            // ------------------------------------------------
            // DESACTIVAR LOADING
            // ------------------------------------------------

            setAnalizando(
                prev => ({
                    ...prev,

                    [codigo]: false,

                })
            );

        }

    }


    // ========================================================
    // ANALIZAR TODOS LOS ENTREGABLES
    // ========================================================

    React.useEffect(() => {

        if (!estudiante) {
            return;
        }


        // ----------------------------------------------------
        // LIMPIAR ESTADO
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


        setErroresAnalisis({

            EN1: null,
            EN2: null,
            EN3: null,

        });


        setAnalizando({

            EN1: false,
            EN2: false,
            EN3: false,

        });


        setGuardado(false);


        // ----------------------------------------------------
        // LISTA
        // ----------------------------------------------------

        const lista = [

            {
                codigo: "EN1",

                entrega:
                    entregas?.EN1 ||
                    estudiante?.entregas?.EN1 ||
                    null,
            },

            {
                codigo: "EN2",

                entrega:
                    entregas?.EN2 ||
                    estudiante?.entregas?.EN2 ||
                    null,
            },

            {
                codigo: "EN3",

                entrega:
                    entregas?.EN3 ||
                    estudiante?.entregas?.EN3 ||
                    null,
            },

        ];


        // ----------------------------------------------------
        // ANALIZAR
        // ----------------------------------------------------

        async function analizarTodo() {

            for (
                const item
                of lista
            ) {

                if (
                    !item.entrega
                ) {
                    continue;
                }


                const url =
                    obtenerUrlEntrega(
                        item.entrega
                    );


                if (!url) {
                    continue;
                }


                await analizarEntregable(
                    item.codigo,
                    item.entrega
                );

            }

        }


        analizarTodo();


        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [
        estudiante,
        entregas,
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
                nota !== "" &&
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
                    total /
                    6
                ) * 100,

                100
            )

            : 0;


    // ========================================================
    // ¿SE ESTÁ ANALIZANDO ALGO?
    // ========================================================

    const hayAnalisisActivo =
        Object.values(
            analizando
        ).some(
            valor => valor === true
        );


    // ========================================================
    // CAMBIAR CALIFICACIÓN
    //
    // Se conserva por si quieres permitir edición manual
    // en el futuro.
    //
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

                    [codigo]:
                        null,

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

                [codigo]:
                    numero,

            })
        );


        setGuardado(false);

    }


    // ========================================================
    // GUARDAR
    // ========================================================

    async function guardarCalificaciones() {

        if (!onSaveGrades) {

            console.warn(
                "No se proporcionó onSaveGrades"
            );


            return;
        }


        try {

            setGuardando(
                true
            );


            setGuardado(
                false
            );


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

                maximo:
                    6,

                // --------------------------------------------
                // ENVIAMOS TAMBIÉN LOS RESULTADOS DEL ANÁLISIS
                // --------------------------------------------

                resultadosAnalisis,

            });


            setGuardado(
                true
            );

        }
        catch (error) {

            console.error(
                "Error guardando calificaciones:",
                error
            );

        }
        finally {

            setGuardando(
                false
            );

        }

    }


    // ========================================================
    // CERRAR CON ESC
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
        onClose
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

            onMouseDown={(evento) => {

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

                        {/* ----------------------------------------- */}
                        {/* ENTREGABLES */}
                        {/* ----------------------------------------- */}

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

                                        {
                                            entregables.filter(
                                                item =>
                                                    item.entrega
                                            ).length
                                        }

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

                        </div>


                        {/* ----------------------------------------- */}
                        {/* PUNTAJE */}
                        {/* ----------------------------------------- */}

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


                            {/* BARRA */}

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

                                {hayAnalisisActivo

                                    ? "Analizando documentos..."

                                    : total !== null

                                        ? `${porcentaje.toFixed(0)}% del puntaje máximo`

                                        : "Aún no se han analizado documentos"}

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


                            <div>

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
                                    Cada documento se analiza automáticamente
                                    y el puntaje obtenido se asigna al
                                    entregable correspondiente. Cada entregable
                                    tiene un valor máximo de 2 puntos.
                                </p>

                            </div>

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


                                const resultado =
                                    resultadosAnalisis[
                                        codigo
                                    ];


                                const analizandoActual =
                                    analizando[
                                        codigo
                                    ];


                                const errorAnalisis =
                                    erroresAnalisis[
                                        codigo
                                    ];


                                const porcentajeAnalisis =
                                    Number(
                                        resultado?.puntaje?.porcentaje
                                    );


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

                                        {/* ========================================= */}
                                        {/* CABECERA */}
                                        {/* ========================================= */}

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


                                            {/* ========================================= */}
                                            {/* ESTADO + CALIFICACIÓN */}
                                            {/* ========================================= */}

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
                                                        px-3
                                                        py-2
                                                    "
                                                >

                                                    {analizandoActual ? (

                                                        <span
                                                            className="
                                                                text-sm
                                                                font-bold
                                                                text-blue-600
                                                            "
                                                        >
                                                            Analizando...
                                                        </span>

                                                    ) : (

                                                        <>

                                                            <span
                                                                className="
                                                                    min-w-[3rem]
                                                                    text-center
                                                                    text-base
                                                                    font-black
                                                                    text-slate-800
                                                                "
                                                            >

                                                                {puntos !== null &&
                                                                puntos !== undefined

                                                                    ? Number(
                                                                        puntos
                                                                    ).toFixed(2)

                                                                    : "—"}

                                                            </span>


                                                            <span
                                                                className="
                                                                    text-xs
                                                                    font-bold
                                                                    text-slate-400
                                                                "
                                                            >
                                                                / 2
                                                            </span>

                                                        </>

                                                    )}

                                                </div>

                                            </div>

                                        </div>


                                        {/* ========================================= */}
                                        {/* RESULTADO DEL ANÁLISIS */}
                                        {/* ========================================= */}

                                        {resultado && !analizandoActual && (

                                            <div
                                                className="
                                                    mt-4
                                                    rounded-xl
                                                    border
                                                    border-green-100
                                                    bg-green-50
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        gap-2
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
                                                                text-green-700
                                                            "
                                                        >
                                                            ✓ Análisis completado
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                text-xs
                                                                text-green-600
                                                            "
                                                        >

                                                            {Number.isFinite(
                                                                porcentajeAnalisis
                                                            )

                                                                ? `Resultado del análisis: ${porcentajeAnalisis}%`

                                                                : "Documento analizado correctamente"}

                                                        </p>

                                                    </div>


                                                    <div
                                                        className="
                                                            text-sm
                                                            font-black
                                                            text-green-700
                                                        "
                                                    >

                                                        {puntos !== null &&
                                                        puntos !== undefined

                                                            ? `${Number(puntos).toFixed(2)} / 2`

                                                            : "—"}

                                                    </div>

                                                </div>

                                            </div>

                                        )}


                                        {/* ========================================= */}
                                        {/* ERROR DEL ANÁLISIS */}
                                        {/* ========================================= */}

                                        {errorAnalisis && (

                                            <div
                                                className="
                                                    mt-4
                                                    rounded-xl
                                                    border
                                                    border-red-100
                                                    bg-red-50
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        font-bold
                                                        text-red-700
                                                    "
                                                >
                                                    No se pudo analizar este documento
                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        text-xs
                                                        leading-relaxed
                                                        text-red-600
                                                    "
                                                >
                                                    {errorAnalisis}
                                                </p>

                                            </div>

                                        )}


                                        {/* ========================================= */}
                                        {/* INDICADOR DE NOTA */}
                                        {/* ========================================= */}

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

                                                    {analizandoActual

                                                        ? "Analizando..."

                                                        : puntos !== null &&
                                                          puntos !== undefined

                                                            ? `${Number(
                                                                puntos
                                                            ).toFixed(2)} / 2`

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

                                                            puntos !== null &&
                                                            puntos !== undefined

                                                                ? `${Math.min(
                                                                    (
                                                                        Number(puntos) /
                                                                        2
                                                                    ) * 100,

                                                                    100
                                                                )}%`

                                                                : "0%",
                                                    }}

                                                />

                                            </div>

                                        </div>


                                        {/* ========================================= */}
                                        {/* DOCUMENTOS */}
                                        {/* ========================================= */}

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

                        ) : (

                            <p
                                className="
                                    text-xs
                                    text-slate-500
                                "
                            >

                                {hayAnalisisActivo

                                    ? "Analizando los documentos del estudiante..."

                                    : "Cada entregable vale hasta 2 puntos. Puntaje máximo: 6."}

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

                            onClick={
                                guardarCalificaciones
                            }

                            disabled={
                                guardando ||
                                !onSaveGrades ||
                                hayAnalisisActivo
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

                                : hayAnalisisActivo

                                    ? "Analizando..."

                                    : "Guardar calificaciones"}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}
