    import React from "react";

    import {
    X,
    FileText,
    ExternalLink,
    Download,
    FileSpreadsheet,
    FileImage,
    FileType,
    Presentation,
    File,
    AlertCircle,
    } from "lucide-react";


    // ============================================================
    // OBTENER NOMBRE DEL DOCUMENTO
    // ============================================================

    function obtenerNombreDocumento(
    documento
    ) {

    if (!documento) {
        return "Documento sin nombre";
    }


    const driveFile =
        documento?.driveFile ||
        documento?.driveFileAttachment ||
        documento?.file ||
        {};


    return String(

        documento?.title ||

        documento?.name ||

        documento?.fileName ||

        documento?.filename ||

        driveFile?.title ||

        driveFile?.name ||

        driveFile?.fileName ||

        "Documento sin nombre"

    ).trim();

    }


    // ============================================================
    // OBTENER URL
    // ============================================================

    function obtenerUrlDocumento(
    documento
    ) {

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

        documento?.viewUrl ||

        documento?.link ||

        documento?.downloadUrl ||

        driveFile?.alternateLink ||

        driveFile?.webViewLink ||

        driveFile?.url ||

        driveFile?.viewUrl ||

        driveFile?.link ||

        ""

    ).trim();

    }


    // ============================================================
    // OBTENER MIME TYPE
    // ============================================================

    function obtenerMimeType(
    documento
    ) {

    if (!documento) {
        return "";
    }


    const driveFile =
        documento?.driveFile ||
        documento?.driveFileAttachment ||
        documento?.file ||
        {};


    return String(

        documento?.mimeType ||

        documento?.mime_type ||

        driveFile?.mimeType ||

        driveFile?.mime_type ||

        ""

    ).toLowerCase();

    }


    // ============================================================
    // OBTENER EXTENSIÓN
    // ============================================================

    function obtenerExtension(
    nombre
    ) {

    const partes =
        String(nombre)
        .toLowerCase()
        .split(".");


    if (
        partes.length < 2
    ) {

        return "";

    }


    return partes.pop();

    }


    // ============================================================
    // ICONO DEL DOCUMENTO
    // ============================================================

    function obtenerIconoDocumento(
    documento
    ) {

    const nombre =
        obtenerNombreDocumento(
        documento
        );


    const mimeType =
        obtenerMimeType(
        documento
        );


    const extension =
        obtenerExtension(
        nombre
        );


    if (
        mimeType.includes(
        "spreadsheet"
        ) ||
        [
        "xlsx",
        "xls",
        "csv"
        ].includes(extension)
    ) {

        return FileSpreadsheet;

    }


    if (
        mimeType.includes(
        "presentation"
        ) ||
        [
        "ppt",
        "pptx"
        ].includes(extension)
    ) {

        return Presentation;

    }


    if (
        mimeType.includes(
        "image"
        ) ||
        [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp"
        ].includes(extension)
    ) {

        return FileImage;

    }


    if (
        mimeType.includes(
        "pdf"
        ) ||
        extension === "pdf"
    ) {

        return FileType;

    }


    if (
        mimeType.includes(
        "document"
        ) ||
        [
        "doc",
        "docx"
        ].includes(extension)
    ) {

        return FileText;

    }


    return File;

    }


    // ============================================================
    // TIPO LEGIBLE
    // ============================================================

    function obtenerTipoDocumento(
    documento
    ) {

    const nombre =
        obtenerNombreDocumento(
        documento
        );


    const mimeType =
        obtenerMimeType(
        documento
        );


    const extension =
        obtenerExtension(
        nombre
        );


    if (
        mimeType.includes(
        "pdf"
        ) ||
        extension === "pdf"
    ) {

        return "PDF";

    }


    if (
        mimeType.includes(
        "word"
        ) ||
        [
        "doc",
        "docx"
        ].includes(extension)
    ) {

        return "Documento Word";

    }


    if (
        mimeType.includes(
        "spreadsheet"
        ) ||
        [
        "xls",
        "xlsx",
        "csv"
        ].includes(extension)
    ) {

        return "Hoja de cálculo";

    }


    if (
        mimeType.includes(
        "presentation"
        ) ||
        [
        "ppt",
        "pptx"
        ].includes(extension)
    ) {

        return "Presentación";

    }


    if (
        mimeType.includes(
        "image"
        ) ||
        [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp"
        ].includes(extension)
    ) {

        return "Imagen";

    }


    return "Archivo";

    }


    // ============================================================
    // COMPONENTE
    // ============================================================

    export default function ClassroomDocumentViewer({

    documento = null,

    documentos = [],

    open = true,

    onClose,

    nombreEstudiante = "",

    entregable = "",

    }) {

    // ----------------------------------------------------------
    // NORMALIZAR DOCUMENTOS
    // ----------------------------------------------------------

    const listaDocumentos =

        Array.isArray(
        documentos
        ) && documentos.length > 0

        ? documentos

        : documento

            ? [documento]

            : [];


    // ----------------------------------------------------------
    // SI NO ESTÁ ABIERTO
    // ----------------------------------------------------------

    if (!open) {

        return null;

    }


    // ----------------------------------------------------------
    // SIN DOCUMENTOS
    // ----------------------------------------------------------

    if (
        listaDocumentos.length === 0
    ) {

        return (
        <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            "
        >

            <div
            className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
            "
            >

            <div
                className="
                flex
                items-start
                justify-between
                gap-4
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
                    bg-red-50
                    text-red-500
                    "
                >

                    <AlertCircle
                    size={20}
                    />

                </div>


                <div>

                    <h2
                    className="
                        text-sm
                        font-black
                        text-slate-800
                    "
                    >
                    Sin documento
                    </h2>


                    <p
                    className="
                        mt-0.5
                        text-xs
                        text-slate-500
                    "
                    >
                    No se encontró ningún archivo.
                    </p>

                </div>

                </div>


                <button
                type="button"
                onClick={onClose}
                className="
                    rounded-lg
                    p-2
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                "
                aria-label="Cerrar"
                >

                <X
                    size={18}
                />

                </button>

            </div>

            </div>

        </div>
        );

    }


    // ----------------------------------------------------------
    // HEADER
    // ----------------------------------------------------------

    return (
        <div
        className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
            sm:p-6
        "
        onMouseDown={(event) => {

            if (
            event.target === event.currentTarget &&
            typeof onClose === "function"
            ) {

            onClose();

            }

        }}
        >

        <div
            className="
            flex
            max-h-[90vh]
            w-full
            max-w-4xl
            flex-col
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
            "
        >

            {/* ===================================================
                HEADER
            ==================================================== */}

            <div
            className="
                flex
                shrink-0
                items-center
                justify-between
                gap-4
                border-b
                border-slate-200
                px-5
                py-4
            "
            >

            <div
                className="
                min-w-0
                "
            >

                <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                "
                >

                {entregable && (

                    <span
                    className="
                        rounded-full
                        bg-blue-100
                        px-2.5
                        py-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wide
                        text-blue-700
                    "
                    >
                    {entregable}
                    </span>

                )}


                {nombreEstudiante && (

                    <span
                    className="
                        text-xs
                        font-bold
                        text-slate-500
                    "
                    >
                    {nombreEstudiante}
                    </span>

                )}

                </div>


                <h2
                className="
                    mt-1
                    truncate
                    text-base
                    font-black
                    text-slate-900
                "
                >
                Documentos entregados
                </h2>

            </div>


            <button
                type="button"
                onClick={onClose}
                className="
                shrink-0
                rounded-xl
                p-2
                text-slate-400
                transition-colors
                hover:bg-slate-100
                hover:text-slate-700
                "
                aria-label="Cerrar visor"
            >

                <X
                size={20}
                />

            </button>

            </div>


            {/* ===================================================
                LISTA DE DOCUMENTOS
            ==================================================== */}

            <div
            className="
                flex-1
                overflow-y-auto
                bg-slate-50
                p-5
            "
            >

            <div
                className="
                space-y-3
                "
            >

                {listaDocumentos.map(
                (
                    item,
                    index
                ) => {

                    const nombre =
                    obtenerNombreDocumento(
                        item
                    );


                    const url =
                    obtenerUrlDocumento(
                        item
                    );


                    const tipo =
                    obtenerTipoDocumento(
                        item
                    );


                    const Icon =
                    obtenerIconoDocumento(
                        item
                    );


                    return (
                    <div
                        key={
                        item?.id ||
                        item?.fileId ||
                        item?.driveFile?.id ||
                        index
                        }
                        className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        "
                    >

                        <div
                        className="
                            flex
                            items-center
                            gap-4
                        "
                        >

                        {/* ICONO */}

                        <div
                            className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-[#1D3681]
                            "
                        >

                            <Icon
                            size={23}
                            strokeWidth={2}
                            />

                        </div>


                        {/* INFORMACIÓN */}

                        <div
                            className="
                            min-w-0
                            flex-1
                            "
                        >

                            <p
                            className="
                                break-words
                                text-sm
                                font-bold
                                text-slate-800
                            "
                            >
                            {nombre}
                            </p>


                            <div
                            className="
                                mt-1
                                flex
                                flex-wrap
                                items-center
                                gap-2
                            "
                            >

                            <span
                                className="
                                rounded-full
                                bg-slate-100
                                px-2
                                py-0.5
                                text-[10px]
                                font-bold
                                text-slate-500
                                "
                            >
                                {tipo}
                            </span>


                            {url && (

                                <span
                                className="
                                    text-[10px]
                                    text-emerald-600
                                    font-semibold
                                "
                                >
                                Disponible
                                </span>

                            )}

                            </div>

                        </div>


                        {/* ACCIONES */}

                        <div
                            className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            "
                        >

                            {url ? (

                            <>

                                <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[#1D3681]
                                    px-3
                                    py-2
                                    text-xs
                                    font-bold
                                    text-white
                                    transition-colors
                                    hover:bg-[#162b68]
                                "
                                >

                                <ExternalLink
                                    size={14}
                                />

                                Abrir

                                </a>


                                <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-2
                                    text-slate-500
                                    transition-colors
                                    hover:bg-slate-50
                                    hover:text-[#1D3681]
                                "
                                title="Descargar"
                                >

                                <Download
                                    size={15}
                                />

                                </a>

                            </>

                            ) : (

                            <span
                                className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-xl
                                bg-amber-50
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-amber-700
                                "
                            >

                                <AlertCircle
                                size={14}
                                />

                                Sin enlace

                            </span>

                            )}

                        </div>

                        </div>

                    </div>
                    );

                }
                )}

            </div>


            {/* =================================================
                AVISO
            ================================================== */}

            <div
                className="
                mt-5
                rounded-xl
                border
                border-blue-100
                bg-blue-50
                px-4
                py-3
                text-xs
                leading-5
                text-blue-700
                "
            >

                El documento se abre en una pestaña
                nueva de Google Drive. Más adelante
                podremos incorporar aquí el análisis
                automático según los lineamientos de
                evaluación.

            </div>

            </div>

        </div>

        </div>
    );

    }
