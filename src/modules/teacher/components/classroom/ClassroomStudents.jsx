import React, {
    useMemo,
    useState,
} from "react";

import ClassroomStudentModal
    from "./ClassroomStudentModal.jsx";


import { analizarDocumento } from "../../services/teacherService.js";


// ============================================================
// CONFIGURACIÓN
// ============================================================

const ENTREGABLES = [
    "EN1",
    "EN2",
    "EN3",
];

// ============================================================
// OBTENER USER ID
// ============================================================

function obtenerUserId(objeto) {

    if (!objeto) {
        return "";
    }

    return String(
        objeto?.userId ||
        objeto?.userID ||
        objeto?.userid ||
        objeto?.studentId ||
        objeto?.studentID ||
        objeto?.studentid ||
        objeto?.user?.userId ||
        objeto?.user?.id ||
        objeto?.student?.userId ||
        objeto?.student?.id ||
        objeto?.userProfile?.userId ||
        objeto?.userProfile?.id ||
        objeto?.id ||
        ""
    ).trim();
}

// ============================================================
// OBTENER NOMBRE
// ============================================================

function obtenerNombre(objeto) {

    if (!objeto) {
        return "Alumno";
    }

    const profile =
        objeto?.userProfile ||
        objeto?.profile ||
        objeto?.student?.profile ||
        objeto?.student ||
        objeto?.user ||
        {};

    const name =
        profile?.name ||
        objeto?.name ||
        {};

    const nombreCompleto =
        name?.fullName ||
        name?.displayName ||
        name?.nombreCompleto ||
        profile?.fullName ||
        profile?.nombreCompleto ||
        objeto?.studentName ||
        objeto?.nombreAlumno ||
        objeto?.nombreCompleto ||
        objeto?.nombre ||
        objeto?.displayName ||
        "";

    if (nombreCompleto) {
        return String(
            nombreCompleto
        ).trim();
    }

    const nombres = [
        name?.givenName,
        name?.firstName,
        profile?.givenName,
        profile?.firstName,
        objeto?.givenName,
        objeto?.firstName,
    ].filter(Boolean);

    const apellidos = [
        name?.familyName,
        name?.lastName,
        profile?.familyName,
        profile?.lastName,
        objeto?.familyName,
        objeto?.lastName,
    ].filter(Boolean);

    return [
        ...nombres,
        ...apellidos,
    ]
        .join(" ")
        .trim() || "Alumno";
}

// ============================================================
// OBTENER EMAIL
// ============================================================

function obtenerEmail(objeto) {

    if (!objeto) {
        return "";
    }

    const profile =
        objeto?.userProfile ||
        objeto?.profile ||
        objeto?.student ||
        objeto?.user ||
        {};

    return String(
        profile?.emailAddress ||
        profile?.email ||
        objeto?.emailAddress ||
        objeto?.email ||
        objeto?.correo ||
        ""
    ).trim();
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
        entrega?.analisis?.puntaje?.obtenido ??
        entrega?.resultadoAnalisis?.puntaje?.obtenido ??
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
        ""
    )
        .trim()
        .toUpperCase();
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
// OBTENER URL DOCUMENTO
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
// OBTENER ENTREGAS DEL ESTUDIANTE
// ============================================================

function obtenerEntregasEstudiante(
    estudiante,
    entregasPorEstudiante
) {

    const userId =
        obtenerUserId(estudiante);

    // --------------------------------------------------------
    // CASO 1
    // --------------------------------------------------------

    if (estudiante?.entregas) {

        return {
            EN1:
                estudiante.entregas.EN1 ||
                null,

            EN2:
                estudiante.entregas.EN2 ||
                null,

            EN3:
                estudiante.entregas.EN3 ||
                null,
        };
    }

    // --------------------------------------------------------
    // CASO 2
    // --------------------------------------------------------

    if (
        entregasPorEstudiante &&
        !Array.isArray(
            entregasPorEstudiante
        )
    ) {

        const porUsuario =
            entregasPorEstudiante[
                userId
            ];

        if (porUsuario) {

            return {
                EN1:
                    porUsuario.EN1 ||
                    null,

                EN2:
                    porUsuario.EN2 ||
                    null,

                EN3:
                    porUsuario.EN3 ||
                    null,
            };
        }
    }

    // --------------------------------------------------------
    // CASO 3
    // --------------------------------------------------------

    if (
        Array.isArray(
            entregasPorEstudiante
        )
    ) {

        const resultado = {
            EN1: null,
            EN2: null,
            EN3: null,
        };

        for (
            const item
            of entregasPorEstudiante
        ) {

            if (!item) {
                continue;
            }

            const itemUserId =
                obtenerUserId(item);

            if (
                itemUserId !== userId
            ) {
                continue;
            }

            const entregable =
                item?.entregable ||
                item?.codigo ||
                item?.tipo ||
                "";

            const codigo =
                String(
                    entregable
                )
                    .trim()
                    .toUpperCase();

            if (
                ENTREGABLES.includes(
                    codigo
                )
            ) {

                resultado[codigo] =
                    item;
            }
        }

        return resultado;
    }

    return {
        EN1: null,
        EN2: null,
        EN3: null,
    };
}

// ============================================================
// TIENE DOCUMENTO
// ============================================================

function tieneDocumento(entrega) {

    return (
        obtenerDocumentos(
            entrega
        ).length > 0
    );
}

// ============================================================
// OBTENER ESTADO DE ANÁLISIS
// ============================================================

function obtenerEstadoAnalisis(
    analisis,
    codigo
) {

    if (!analisis) {
        return "pendiente";
    }

    if (
        analisis[codigo]
            ?.analizando
    ) {
        return "analizando";
    }

    if (
        analisis[codigo]
            ?.error
    ) {
        return "error";
    }

    if (
        analisis[codigo]
            ?.puntaje !== null &&
        analisis[codigo]
            ?.puntaje !== undefined
    ) {
        return "completado";
    }

    return "pendiente";
}

// ============================================================
// COMPONENTE
// ============================================================

export default function ClassroomStudents({

    estudiantes = [],

    entregasPorEstudiante = {},

    onOpenDocument,

    onSaveGrades,

}) {

    // ========================================================
    // ESTADOS
    // ========================================================

    const [
        busqueda,
        setBusqueda
    ] = useState("");

    const [
        estudianteSeleccionado,
        setEstudianteSeleccionado
    ] = useState(null);

    const [
        calificacionesGuardadas,
        setCalificacionesGuardadas
    ] = useState({});

    const [
        analisisAutomaticos,
        setAnalisisAutomaticos
    ] = useState({});

    const [
        analizandoTodos,
        setAnalizandoTodos
    ] = useState(false);

    // ========================================================
    // NORMALIZAR ESTUDIANTES
    // ========================================================

    const estudiantesNormalizados =
        useMemo(
            () => {

                if (
                    !Array.isArray(
                        estudiantes
                    )
                ) {
                    return [];
                }

                return estudiantes.map(
                    estudiante => {

                        const userId =
                            obtenerUserId(
                                estudiante
                            );

                        const nombre =
                            obtenerNombre(
                                estudiante
                            );

                        const email =
                            obtenerEmail(
                                estudiante
                            );

                        const entregas =
                            obtenerEntregasEstudiante(
                                estudiante,
                                entregasPorEstudiante
                            );

                        return {
                            ...estudiante,

                            userId,

                            nombre,

                            email,

                            entregas,
                        };
                    }
                );
            },
            [
                estudiantes,
                entregasPorEstudiante,
            ]
        );

    // ========================================================
    // FILTRAR
    // ========================================================

    const estudiantesFiltrados =
        useMemo(
            () => {

                const texto =
                    busqueda
                        .trim()
                        .toLowerCase();

                if (!texto) {
                    return estudiantesNormalizados;
                }

                return estudiantesNormalizados.filter(
                    estudiante => {

                        return (
                            estudiante.nombre
                                .toLowerCase()
                                .includes(texto) ||

                            estudiante.email
                                .toLowerCase()
                                .includes(texto) ||

                            estudiante.userId
                                .toLowerCase()
                                .includes(texto)
                        );
                    }
                );
            },
            [
                estudiantesNormalizados,
                busqueda,
            ]
        );

    // ========================================================
    // RESUMEN
    // ========================================================

    const resumen =
        useMemo(
            () => {

                let conEN1 = 0;
                let conEN2 = 0;
                let conEN3 = 0;

                estudiantesNormalizados.forEach(
                    estudiante => {

                        if (
                            tieneDocumento(
                                estudiante.entregas.EN1
                            )
                        ) {
                            conEN1++;
                        }

                        if (
                            tieneDocumento(
                                estudiante.entregas.EN2
                            )
                        ) {
                            conEN2++;
                        }

                        if (
                            tieneDocumento(
                                estudiante.entregas.EN3
                            )
                        ) {
                            conEN3++;
                        }
                    }
                );

                return {
                    total:
                        estudiantesNormalizados.length,

                    conEN1,

                    conEN2,

                    conEN3,
                };
            },
            [
                estudiantesNormalizados,
            ]
        );

    // ========================================================
    // ABRIR ESTUDIANTE
    // ========================================================

    function abrirEstudiante(
        estudiante
    ) {

        setEstudianteSeleccionado(
            estudiante
        );
    }

    // ========================================================
    // CERRAR MODAL
    // ========================================================

    function cerrarModal() {

        setEstudianteSeleccionado(
            null
        );
    }

    // ========================================================
    // GUARDAR CALIFICACIONES DEL MODAL
    // ========================================================

    function guardarCalificacionesEstudiante({

        estudiante,

        estudianteId,

        calificaciones,

        total,

    }) {

        const id =
            estudianteId ||
            obtenerUserId(
                estudiante
            );

        if (!id) {

            console.warn(
                "No se pudo identificar al estudiante."
            );

            return;
        }

        setCalificacionesGuardadas(
            prev => ({

                ...prev,

                [id]: {

                    EN1:
                        calificaciones?.EN1 ??
                        null,

                    EN2:
                        calificaciones?.EN2 ??
                        null,

                    EN3:
                        calificaciones?.EN3 ??
                        null,

                    total:
                        total ??
                        null,
                },
            })
        );

        // ----------------------------------------------------
        // TAMBIÉN AVISAMOS AL COMPONENTE PADRE
        // ----------------------------------------------------

        if (onSaveGrades) {

            onSaveGrades({

                estudiante,

                estudianteId: id,

                calificaciones,

                total,

                maximo: 6,
            });
        }
    }

    // ========================================================
    // ANALIZAR UN DOCUMENTO
    // ========================================================

    async function analizarEntregable(
        estudiante,
        codigo,
        entrega
    ) {

        const id =
            obtenerUserId(
                estudiante
            );

        const documentos =
            obtenerDocumentos(
                entrega
            );

        if (
            !documentos.length
        ) {

            return null;
        }

        // ----------------------------------------------------
        // POR AHORA ANALIZAMOS EL PRIMER DOCUMENTO
        // ----------------------------------------------------

        const documento =
            documentos[0];

        const url =
            obtenerUrlDocumento(
                documento
            );

        if (!url) {

            console.warn(
                `No hay URL para ${codigo}`
            );

            return null;
        }

        // ----------------------------------------------------
        // MARCAR ANALIZANDO
        // ----------------------------------------------------

        setAnalisisAutomaticos(
            prev => ({

                ...prev,

                [id]: {

                    ...(prev[id] || {}),

                    [codigo]: {

                        analizando: true,

                        error: false,

                        puntaje: null,
                    },
                },
            })
        );

        try {

            console.log(
                "================================"
            );

            console.log(
                `🤖 ANALIZANDO ${codigo}`
            );

            console.log(
                "Estudiante:",
                estudiante.nombre
            );

            console.log(
                "URL:",
                url
            );

            console.log(
                "================================"
            );

            const resultado =
                await analizarDocumento(
                    url
                );

            console.log(
                `✅ RESULTADO ${codigo}:`,
                resultado
            );

            // ------------------------------------------------
            // OBTENER PUNTAJE DEL BACKEND
            // ------------------------------------------------

            const puntaje =
                Number(
                    resultado
                        ?.puntaje
                        ?.obtenido ??
                    resultado
                        ?.data
                        ?.puntaje
                        ?.obtenido ??
                    0
                );

            const maximo =
                Number(
                    resultado
                        ?.puntaje
                        ?.maximo ??
                    resultado
                        ?.data
                        ?.puntaje
                        ?.maximo ??
                    2
                );

            const porcentaje =
                Number(
                    resultado
                        ?.puntaje
                        ?.porcentaje ??
                    resultado
                        ?.data
                        ?.puntaje
                        ?.porcentaje ??
                    (
                        maximo > 0
                            ? (
                                puntaje /
                                maximo
                            ) *
                            100
                            : 0
                    )
                );

            console.log(
                `📊 ${codigo}:`,
                puntaje,
                "/",
                maximo
            );

            // ------------------------------------------------
            // GUARDAR RESULTADO
            // ------------------------------------------------

            setAnalisisAutomaticos(
                prev => ({

                    ...prev,

                    [id]: {

                        ...(prev[id] || {}),

                        [codigo]: {

                            analizando:
                                false,

                            error:
                                false,

                            puntaje,

                            maximo,

                            porcentaje,

                            resultado,
                        },
                    },
                })
            );

            return {
                codigo,
                puntaje,
                maximo,
                porcentaje,
                resultado,
            };

        } catch (error) {

            console.error(
                `❌ ERROR ANALIZANDO ${codigo}:`,
                error
            );

            setAnalisisAutomaticos(
                prev => ({

                    ...prev,

                    [id]: {

                        ...(prev[id] || {}),

                        [codigo]: {

                            analizando:
                                false,

                            error:
                                true,

                            mensaje:
                                error?.message ||
                                "Error de análisis",

                            puntaje:
                                null,
                        },
                    },
                })
            );

            return null;
        }
    }

    // ========================================================
    // ANALIZAR TODOS LOS ESTUDIANTES
    // ========================================================

    async function analizarTodosLosEstudiantes() {

        if (
            analizandoTodos
        ) {
            return;
        }

        setAnalizandoTodos(
            true
        );

        console.log(
            "=========================================="
        );

        console.log(
            "🚀 INICIANDO ANÁLISIS AUTOMÁTICO"
        );

        console.log(
            "Estudiantes:",
            estudiantesNormalizados.length
        );

        console.log(
            "=========================================="
        );

        try {

            for (
                const estudiante
                of estudiantesNormalizados
            ) {

                const id =
                    obtenerUserId(
                        estudiante
                    );

                if (!id) {
                    continue;
                }

                console.log(
                    "------------------------------------------"
                );

                console.log(
                    "👨‍🎓 ESTUDIANTE:",
                    estudiante.nombre
                );

                // --------------------------------------------
                // ANALIZAR EN1
                // --------------------------------------------

                if (
                    tieneDocumento(
                        estudiante.entregas.EN1
                    )
                ) {

                    await analizarEntregable(
                        estudiante,
                        "EN1",
                        estudiante.entregas.EN1
                    );
                }

                // --------------------------------------------
                // ANALIZAR EN2
                // --------------------------------------------

                if (
                    tieneDocumento(
                        estudiante.entregas.EN2
                    )
                ) {

                    await analizarEntregable(
                        estudiante,
                        "EN2",
                        estudiante.entregas.EN2
                    );
                }

                // --------------------------------------------
                // ANALIZAR EN3
                // --------------------------------------------

                if (
                    tieneDocumento(
                        estudiante.entregas.EN3
                    )
                ) {

                    await analizarEntregable(
                        estudiante,
                        "EN3",
                        estudiante.entregas.EN3
                    );
                }
            }

        } finally {

            setAnalizandoTodos(
                false
            );

            console.log(
                "=========================================="
            );

            console.log(
                "🏁 ANÁLISIS AUTOMÁTICO FINALIZADO"
            );

            console.log(
                "=========================================="
            );
        }
    }

    // ========================================================
    // CALCULAR RESULTADO DE ESTUDIANTE
    // ========================================================

    function obtenerCalificacionFinal(
        estudiante
    ) {

        const id =
            obtenerUserId(
                estudiante
            );

        const guardada =
            calificacionesGuardadas[
                id
            ];

        if (guardada) {
            return guardada;
        }

        const analisis =
            analisisAutomaticos[
                id
            ] || {};

        const EN1 =
            analisis.EN1?.puntaje ??
            null;

        const EN2 =
            analisis.EN2?.puntaje ??
            null;

        const EN3 =
            analisis.EN3?.puntaje ??
            null;

        const valores = [
            EN1,
            EN2,
            EN3,
        ].filter(
            valor =>
                valor !== null &&
                valor !== undefined &&
                Number.isFinite(
                    Number(valor)
                )
        );

        const total =
            valores.length > 0
                ? Number(
                    valores
                        .reduce(
                            (
                                suma,
                                valor
                            ) =>
                                suma +
                                Number(
                                    valor
                                ),
                            0
                        )
                        .toFixed(2)
                )
                : null;

        return {
            EN1,
            EN2,
            EN3,
            total,
        };
    }

    // ========================================================
    // SIN ESTUDIANTES
    // ========================================================

    if (
        estudiantesNormalizados.length === 0
    ) {

        return (

            <div
                className="
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    bg-white
                    px-6
                    py-14
                    text-center
                "
            >

                <div
                    className="
                        mx-auto
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-100
                        text-2xl
                    "
                >
                    👥
                </div>

                <h3
                    className="
                        text-lg
                        font-black
                        text-slate-800
                    "
                >
                    No hay estudiantes
                </h3>

                <p
                    className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        text-slate-500
                    "
                >
                    No se encontraron estudiantes
                    para este tema o para los
                    entregables seleccionados.
                </p>

            </div>
        );
    }

    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="space-y-5">

            {/* ================================================= */}
            {/* CABECERA */}
            {/* ================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-xl
                            font-black
                            text-slate-900
                        "
                    >
                        Estudiantes
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
                    >
                        Analiza automáticamente los
                        documentos de todos los estudiantes.
                    </p>

                </div>

                <div
                    className="
                        flex
                        flex-col
                        gap-2
                        sm:flex-row
                    "
                >

                    {/* BUSCADOR */}

                    <input
                        type="text"
                        value={busqueda}
                        onChange={
                            evento =>
                                setBusqueda(
                                    evento.target.value
                                )
                        }
                        placeholder="Buscar estudiante..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-50
                            sm:w-72
                        "
                    />

                    {/* ANALIZAR TODOS */}

                    <button
                        type="button"
                        onClick={
                            analizarTodosLosEstudiantes
                        }
                        disabled={
                            analizandoTodos
                        }
                        className="
                            whitespace-nowrap
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-3
                            text-sm
                            font-black
                            text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        {analizandoTodos
                            ? "🤖 Analizando..."
                            : "🤖 Analizar todos"}

                    </button>

                </div>

            </div>

            {/* ================================================= */}
            {/* RESUMEN */}
            {/* ================================================= */}

            <div
                className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:grid-cols-4
                "
            >

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                    "
                >

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate-400
                        "
                    >
                        Estudiantes
                    </p>

                    <p
                        className="
                            mt-1
                            text-2xl
                            font-black
                            text-slate-900
                        "
                    >
                        {resumen.total}
                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-blue-100
                        bg-blue-50
                        p-4
                    "
                >

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-blue-500
                        "
                    >
                        EN1
                    </p>

                    <p
                        className="
                            mt-1
                            text-2xl
                            font-black
                            text-blue-700
                        "
                    >
                        {resumen.conEN1}
                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-violet-100
                        bg-violet-50
                        p-4
                    "
                >

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-violet-500
                        "
                    >
                        EN2
                    </p>

                    <p
                        className="
                            mt-1
                            text-2xl
                            font-black
                            text-violet-700
                        "
                    >
                        {resumen.conEN2}
                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-emerald-100
                        bg-emerald-50
                        p-4
                    "
                >

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-emerald-500
                        "
                    >
                        EN3
                    </p>

                    <p
                        className="
                            mt-1
                            text-2xl
                            font-black
                            text-emerald-700
                        "
                    >
                        {resumen.conEN3}
                    </p>

                </div>

            </div>

            {/* ================================================= */}
            {/* TABLA */}
            {/* ================================================= */}

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                <div className="overflow-x-auto">

                    <table
                        className="
                            min-w-[950px]
                            w-full
                            border-collapse
                        "
                    >

                        <thead>

                            <tr
                                className="
                                    border-b
                                    border-slate-200
                                    bg-slate-50
                                "
                            >

                                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-400">
                                    Estudiante
                                </th>

                                <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wide text-slate-400">
                                    EN1
                                </th>

                                <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wide text-slate-400">
                                    EN2
                                </th>

                                <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wide text-slate-400">
                                    EN3
                                </th>

                                <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wide text-slate-400">
                                    Total
                                </th>

                                <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wide text-slate-400">
                                    Descuento
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-400">
                                    Acción
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {estudiantesFiltrados.map(
                                estudiante => {

                                    const {
                                        userId,
                                        nombre,
                                        email,
                                        entregas,
                                    } = estudiante;

                                    const calificacion =
                                        obtenerCalificacionFinal(
                                            estudiante
                                        );

                                    const total =
                                        calificacion.total;

                                    const descuento =
                                        total !== null
                                            ? Number(
                                                (
                                                    total -
                                                    6
                                                ).toFixed(2)
                                            )
                                            : null;

                                    const analisis =
                                        analisisAutomaticos[
                                            userId
                                        ] || {};

                                    return (

                                        <tr
                                            key={
                                                userId ||
                                                `${nombre}-${email}`
                                            }
                                            className="
                                                border-b
                                                border-slate-100
                                                transition
                                                hover:bg-slate-50
                                            "
                                        >

                                            {/* ESTUDIANTE */}

                                            <td className="px-5 py-4">

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
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-[#EEF3FF]
                                                            text-sm
                                                            font-black
                                                            text-[#1D3681]
                                                        "
                                                    >
                                                        {nombre
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p
                                                            className="
                                                                truncate
                                                                text-sm
                                                                font-bold
                                                                text-slate-800
                                                            "
                                                        >
                                                            {nombre}
                                                        </p>

                                                        {email && (
                                                            <p
                                                                className="
                                                                    mt-0.5
                                                                    truncate
                                                                    text-xs
                                                                    text-slate-400
                                                                "
                                                            >
                                                                {email}
                                                            </p>
                                                        )}

                                                    </div>

                                                </div>

                                            </td>

                                            {/* EN1 */}

                                            <td className="px-4 py-4 text-center">

                                                <EstadoEntregable
                                                    entrega={
                                                        entregas.EN1
                                                    }

                                                    analisis={
                                                        analisis.EN1
                                                    }
                                                />

                                            </td>

                                            {/* EN2 */}

                                            <td className="px-4 py-4 text-center">

                                                <EstadoEntregable
                                                    entrega={
                                                        entregas.EN2
                                                    }

                                                    analisis={
                                                        analisis.EN2
                                                    }
                                                />

                                            </td>

                                            {/* EN3 */}

                                            <td className="px-4 py-4 text-center">

                                                <EstadoEntregable
                                                    entrega={
                                                        entregas.EN3
                                                    }

                                                    analisis={
                                                        analisis.EN3
                                                    }
                                                />

                                            </td>

                                            {/* TOTAL */}

                                            <td
                                                className="
                                                    px-4
                                                    py-4
                                                    text-center
                                                "
                                            >

                                                <span
                                                    className="
                                                        inline-flex
                                                        rounded-xl
                                                        bg-blue-50
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        font-black
                                                        text-blue-700
                                                    "
                                                >
                                                    {total !== null
                                                        ? `${total.toFixed(2)} / 6`
                                                        : "—"}
                                                </span>

                                            </td>

                                            {/* DESCUENTO */}

                                            <td
                                                className="
                                                    px-4
                                                    py-4
                                                    text-center
                                                "
                                            >

                                                <span
                                                    className={`
                                                        inline-flex
                                                        rounded-xl
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        font-black
                                                        ${
                                                            descuento !== null &&
                                                            descuento < 0
                                                                ? "bg-red-50 text-red-600"
                                                                : "bg-slate-100 text-slate-600"
                                                        }
                                                    `}
                                                >
                                                    {descuento !== null
                                                        ? descuento.toFixed(2)
                                                        : "—"}
                                                </span>

                                            </td>

                                            {/* ACCIÓN */}

                                            <td
                                                className="
                                                    px-5
                                                    py-4
                                                    text-right
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        abrirEstudiante(
                                                            estudiante
                                                        )
                                                    }
                                                    className="
                                                        rounded-xl
                                                        bg-[#1D3681]
                                                        px-4
                                                        py-2
                                                        text-xs
                                                        font-bold
                                                        text-white
                                                        transition
                                                        hover:bg-[#16295f]
                                                    "
                                                >
                                                    Revisar
                                                </button>

                                            </td>

                                        </tr>
                                    );
                                }
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ================================================= */}
            {/* MODAL */}
            {/* ================================================= */}

            {estudianteSeleccionado && (

                <ClassroomStudentModal

                    open={
                        Boolean(
                            estudianteSeleccionado
                        )
                    }

                    estudiante={
                        estudianteSeleccionado
                    }

                    entregas={
                        estudianteSeleccionado.entregas
                    }

                    onClose={
                        cerrarModal
                    }

                    onOpenDocument={
                        onOpenDocument
                    }

                    onSaveGrades={
                        guardarCalificacionesEstudiante
                    }

                />

            )}

        </div>
    );
}

// ============================================================
// ESTADO ENTREGABLE
// ============================================================

function EstadoEntregable({

    entrega,

    analisis,

}) {

    if (!entrega) {

        return (
            <span
                className="
                    inline-flex
                    rounded-full
                    bg-red-50
                    px-2.5
                    py-1
                    text-xs
                    font-bold
                    text-red-600
                "
            >
                Sin entrega
            </span>
        );
    }

    const puntos =
        obtenerPuntos(
            entrega
        );

    const tieneArchivo =
        tieneDocumento(
            entrega
        );

    if (
        analisis?.analizando
    ) {

        return (
            <div
                className="
                    inline-flex
                    flex-col
                    items-center
                    gap-1
                "
            >

                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-blue-50
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        text-blue-600
                    "
                >
                    🤖 Analizando
                </span>

            </div>
        );
    }

    if (
        analisis?.error
    ) {

        return (
            <div
                className="
                    inline-flex
                    flex-col
                    items-center
                    gap-1
                "
            >

                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-red-50
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        text-red-600
                    "
                >
                    Error
                </span>

            </div>
        );
    }

    if (
        analisis?.puntaje !== null &&
        analisis?.puntaje !== undefined
    ) {

        return (
            <div
                className="
                    inline-flex
                    flex-col
                    items-center
                    gap-1
                "
            >

                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-emerald-50
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        text-emerald-600
                    "
                >
                    ✓ Analizado
                </span>

                <span
                    className="
                        text-xs
                        font-black
                        text-slate-600
                    "
                >
                    {Number(
                        analisis.puntaje
                    ).toFixed(2)}{" "}
                    / 2
                </span>

            </div>
        );
    }

    if (tieneArchivo) {

        return (
            <div
                className="
                    inline-flex
                    flex-col
                    items-center
                    gap-1
                "
            >

                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-emerald-50
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        text-emerald-600
                    "
                >
                    Entregado
                </span>

                {puntos !== null && (
                    <span
                        className="
                            text-xs
                            font-black
                            text-slate-500
                        "
                    >
                        {Number(
                            puntos
                        ).toFixed(2)}{" "}
                        pts
                    </span>
                )}

            </div>
        );
    }

    return (
        <span
            className="
                inline-flex
                rounded-full
                bg-amber-50
                px-2.5
                py-1
                text-xs
                font-bold
                text-amber-600
            "
        >
            Registrado
        </span>
    );
}
