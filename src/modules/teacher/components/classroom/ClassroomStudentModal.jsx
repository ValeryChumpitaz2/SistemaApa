import React from "react";

// ============================================================\
// ESTILOS\
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

// ============================================================\
// OBTENER NOMBRE DE ARCHIVO\
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

// ============================================================\
// OBTENER URL DEL DOCUMENTO\
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

// ============================================================\
// OBTENER DOCUMENTOS\
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

// ============================================================\
// OBTENER PUNTOS\
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
        puntos === null || puntos === undefined ||

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

// ============================================================\
// OBTENER ESTADO\
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

// ============================================================\
// COLOR DEL ESTADO\
// ============================================================

function obtenerEstiloEstado(estado) {

    const texto =
        String(estado || "")
            .toUpperCase();

    if (
        texto.includes("TURNED\_IN") ||
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

// ============================================================\
// COMPONENTE\
// ============================================================

export default function ClassroomStudentModal({

    open = true,

    estudiante = null,

    entregas = {},

    onClose,

    onOpenDocument,

}) {

    if (!open || !estudiante) {
        return null;
    }

    // ----------------------------------------------------------\
    // INFORMACIÓN DEL ESTUDIANTE\
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------\
    // ENTREGABLES\
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------\
    // TOTAL\
    // ----------------------------------------------------------

    const puntos = entregables.map(
        item =>
            obtenerPuntos(
                item.entrega
            )
    );

    const puntosValidos =
        puntos.filter(
    punto =>
    punto !== null
 );

    const total =
        puntosValidos.length > 0
 ?puntosValidos.reduce(
            (suma, punto) =>
            suma + punto, 
            0
    ) 
 : null;

    // ----------------------------------------------------------\
    // CERRAR CON ESC\
    // ----------------------------------------------------------

    function manejarKeyDown(evento) {

        
if (
  evento.key === "Escape"
) {
  onClose?.();
}


    }

    React.useEffect(() => {

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


 });

// ----------------------------------------------------------\
// RENDER\
// ----------------------------------------------------------

return (
<div
    className="
 fixed
 inset-0
 z-[100]
 flex
 items-center
 justify-center
 bg-black/50
 p-4
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
      w-full
      max-w-4xl
      max-h-[90vh]
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
        items-start
        justify-between
        gap-4
        border-b
        border-slate-200
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
              bg-blue-50
              text-blue-600
              text-lg
              font-black
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
        max-h-[calc(90vh-180px)]
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
          sm:grid-cols-2
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
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
            Entregables
          </p>

          <p
            className="
              mt-1
              text-2xl
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
            Puntaje actual
          </p>
 
          <p
            className="
              mt-1
              text-2xl
              font-black
              text-blue-700
            "
          >
            {total !== null
              ? total
              : "—"}
 
            <span
              className="
                ml-1
                text-sm
                font-medium
                text-blue-400
              "
            >
              / 6
            </span>
          </p>
 
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
              obtenerPuntos(
                entrega
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
                "
              >
 

                {/* CABECERA ENTREGABLE */}


                <div
                  className="
                    flex
                    flex-col
                    gap-3
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
                      Valor máximo: 2 puntos
                    </p>
 
                  </div>
 
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
 
                    <span
                      className="
                        rounded-xl
                        bg-slate-100
                        px-3
                        py-1.5
                        text-sm
                        font-black
                        text-slate-700
                      "
                    >
                      {puntos !== null
                        ? `${puntos} pts`
                        : "Sin nota"}
</span>
 
                  </div>
    
                </div>
   
{/* DOCUMENTOS */ }
 
    <div
className="
mt-4
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
     
{
    documentos.length === 0 ? (
         
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
        Este entregable todavía no tiene
                        un archivo disponible.
                      </p>
         

 
                    </div>
     
                  ) : (
 
        <div className="space-y-2" >
 
    {
        documentos.map(
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
        )
    }
   
                     </div>
       
                  )
}
 
                </div>
    
              </div>
            );
 
          }
        )}
 
       </div>
    
    </div>
     
{/* ================================================= */ }
{/* FOOTER */ }
{/* ================================================= */ }
 
     <div
className="
flex
items-center
justify-between
gap-4
border-t
border-slate-200
bg-slate-50
px-6
py-4
"
    >
    
    <p
className="
text-xs
text-slate-500
"
    >
    La calificación detallada se realizará
        posteriormente según los lineamientos.
      </p>
    
    <button
type="button"
onClick = { onClose }
className="
rounded-xl
bg-slate-900
px-5
py-2.5
text-sm
font-bold
text-white
transition
hover:bg-slate-800
"
    >
    Cerrar
      </button>
 

    </div>
 
  </div>
 
</div>
);
}
