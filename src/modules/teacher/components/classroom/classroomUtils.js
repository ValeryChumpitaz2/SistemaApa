// ============================================================
// NORMALIZAR TEXTO
// ============================================================

export function normalizarTexto(
  texto = ""
) {

  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();

}


// ============================================================
// OBTENER TÍTULO DE ACTIVIDAD
// ============================================================

export function obtenerTitulo(
  actividad
) {

  return String(

    actividad?.title ||

    actividad?.name ||

    actividad?.nombre ||

    actividad?.courseWorkTitle ||

    actividad?.courseworkTitle ||

    actividad?.titulo ||

    ""

  ).trim();

}


// ============================================================
// OBTENER COURSE WORK ID
// ============================================================

export function obtenerCourseWorkId(
  actividad
) {

  return String(

    actividad?.courseWorkId ||

    actividad?.courseworkId ||

    actividad?.course_work_id ||

    actividad?.id ||

    ""

  ).trim();

}


// ============================================================
// OBTENER TOPIC ID
// ============================================================

export function obtenerTopicId(
  tema
) {

  if (!tema) {

    return "";

  }


  return String(

    tema?.topicId ||

    tema?.topicID ||

    tema?.topicid ||

    tema?.topic?.topicId ||

    tema?.topic?.topicID ||

    tema?.topic?.id ||

    tema?.id ||

    ""

  ).trim();

}


// ============================================================
// OBTENER NOMBRE DEL TEMA
// ============================================================

export function obtenerNombreTema(
  tema
) {

  if (!tema) {

    return "Tema sin nombre";

  }


  return String(

    tema?.name ||

    tema?.nombre ||

    tema?.topicName ||

    tema?.title ||

    "Tema sin nombre"

  ).trim();

}


// ============================================================
// RECONOCER ENTREGABLE
// ============================================================

export function reconocerEntregable(
  actividad
) {

  const titulo =
    obtenerTitulo(
      actividad
    );


  const texto =
    normalizarTexto(
      titulo
    );


  // ----------------------------------------------------------
  // EN1
  // ----------------------------------------------------------

  if (

    texto.includes(
      "ENTREGABLE 1"
    ) ||

    texto.includes(
      "ENTREGABLE1"
    ) ||

    /\bEN1\b/.test(
      texto
    )

  ) {

    return "EN1";

  }


  // ----------------------------------------------------------
  // EN2
  // ----------------------------------------------------------

  if (

    texto.includes(
      "ENTREGABLE 2"
    ) ||

    texto.includes(
      "ENTREGABLE2"
    ) ||

    /\bEN2\b/.test(
      texto
    )

  ) {

    return "EN2";

  }


  // ----------------------------------------------------------
  // EN3
  // ----------------------------------------------------------

  if (

    texto.includes(
      "ENTREGABLE 3"
    ) ||

    texto.includes(
      "ENTREGABLE3"
    ) ||

    /\bEN3\b/.test(
      texto
    )

  ) {

    return "EN3";

  }


  return null;

}


// ============================================================
// RECONOCER REVISOR DE INFORMES
// ============================================================

export function esRevisorInformes(
  actividad
) {

  const texto =
    normalizarTexto(
      obtenerTitulo(
        actividad
      )
    );


  return (

    texto.includes(
      "REVISOR"
    ) &&

    texto.includes(
      "INFORME"
    )

  );

}


// ============================================================
// EXTRAER USER ID
// ============================================================

export function obtenerUserId(
  entrega
) {

  if (!entrega) {

    return "";

  }


  return String(

    entrega?.userId ||

    entrega?.userID ||

    entrega?.userid ||

    entrega?.studentId ||

    entrega?.studentID ||

    entrega?.studentid ||

    entrega?.user?.userId ||

    entrega?.user?.id ||

    entrega?.student?.userId ||

    entrega?.student?.id ||

    entrega?.userProfile?.userId ||

    entrega?.userProfile?.id ||

    ""

  ).trim();

}


// ============================================================
// OBTENER NOMBRE DESDE OBJETO
// ============================================================

export function obtenerNombreDesdeObjeto(
  objeto
) {

  if (!objeto) {

    return "";

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

    objeto?.nombre ||

    objeto?.nombreCompleto ||

    objeto?.userName ||

    "";


  if (
    nombreCompleto
  ) {

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

    objeto?.firstName

  ].filter(Boolean);


  const apellidos = [

    name?.familyName,

    name?.lastName,

    profile?.familyName,

    profile?.lastName,

    objeto?.familyName,

    objeto?.lastName

  ].filter(Boolean);


  return [

    ...nombres,

    ...apellidos

  ]

    .join(" ")

    .trim();

}


// ============================================================
// OBTENER DOCUMENTOS DE UNA ENTREGA
// ============================================================

export function obtenerDocumentosEntrega(
  entrega
) {

  if (!entrega) {

    return [];

  }


  const documentos =

    entrega?.assignmentSubmission
      ?.attachments ||

    entrega?.assignmentSubmission
      ?.driveFileAttachments ||

    entrega?.attachments ||

    entrega?.documentos ||

    [];


  return Array.isArray(
    documentos
  )

    ? documentos

    : [];

}


// ============================================================
// OBTENER NOMBRE DESDE DOCUMENTOS
// ============================================================

export function obtenerNombreDesdeDocumentos(
  documentos
) {

  if (
    !Array.isArray(
      documentos
    )
  ) {

    return "";

  }


  for (
    const documento
    of documentos
  ) {

    if (!documento) {

      continue;

    }


    const driveFile =

      documento?.driveFile ||

      documento?.driveFileAttachment ||

      documento?.file ||

      {};


    const nombreArchivo =

      documento?.title ||

      documento?.name ||

      documento?.fileName ||

      documento?.filename ||

      driveFile?.title ||

      driveFile?.name ||

      driveFile?.fileName ||

      "";


    if (
      nombreArchivo
    ) {

      const limpio =

        String(
          nombreArchivo
        )
          .replace(
            /\.[^/.]+$/,
            ""
          )
          .trim();


      if (
        limpio
      ) {

        return limpio;

      }

    }

  }


  return "";

}


// ============================================================
// OBTENER INFORMACIÓN DE UNA ENTREGA
// ============================================================

export function obtenerInformacionEntrega(
  entrega
) {

  if (!entrega) {

    return {

      id: "",

      userId: "",

      nombre: "",

      email: "",

      estado: "",

      puntos: null,

      documentos: [],

      raw: null

    };

  }


  const userId =
    obtenerUserId(
      entrega
    );


  const documentos =
    obtenerDocumentosEntrega(
      entrega
    );


  const nombreDirecto =
    obtenerNombreDesdeObjeto(
      entrega
    );


  const nombreDocumento =
    obtenerNombreDesdeDocumentos(
      documentos
    );


  const nombre =

    nombreDirecto ||

    nombreDocumento ||

    "Alumno";


  const profile =

    entrega?.userProfile ||

    entrega?.profile ||

    entrega?.student ||

    entrega?.user ||

    {};


  const email =

    profile?.emailAddress ||

    profile?.email ||

    entrega?.emailAddress ||

    entrega?.email ||

    entrega?.correo ||

    "";


  const estado =

    entrega?.state ||

    entrega?.status ||

    entrega?.estado ||

    "";


  const puntos =

    entrega?.assignedGrade ??

    entrega?.assignedPoints ??

    entrega?.grade ??

    entrega?.puntaje ??

    null;


  return {

    id:

      String(

        entrega?.id ||

        entrega?.studentSubmissionId ||

        ""

      ).trim(),


    userId,


    nombre:

      String(
        nombre
      ).trim(),


    email:

      String(
        email
      ).trim(),


    estado:

      String(
        estado
      ).trim(),


    puntos,


    documentos,


    raw:
      entrega

  };

}


// ============================================================
// CONSTANTES DE EVALUACIÓN
// ============================================================

export const ENTREGABLES_OBJETIVO = [

  "EN1",

  "EN2",

  "EN3"

];


export const PUNTAJE_POR_ENTREGABLE = 2;


// ============================================================
// OBTENER ETIQUETA DEL ENTREGABLE
// ============================================================

export function obtenerEtiquetaEntregable(
  entregable
) {

  const etiquetas = {

    EN1:
      "Entregable 1",

    EN2:
      "Entregable 2",

    EN3:
      "Entregable 3"

  };


  return (

    etiquetas[
      entregable
    ] ||

    entregable

  );

}


// ============================================================
// CALCULAR PUNTAJE DEL ENTREGABLE
// ============================================================

export function calcularPuntajeEntregable(
  descuento
) {

  const valor =
    Number(
      descuento
    );


  if (
    !Number.isFinite(
      valor
    )
  ) {

    return PUNTAJE_POR_ENTREGABLE;

  }


  return Math.max(

    0,

    PUNTAJE_POR_ENTREGABLE -
      valor

  );

}


// ============================================================
// CALCULAR NOTA FINAL
// ============================================================

export function calcularNotaFinal(
  puntajes = {}
) {

  return (

    Number(
      puntajes.EN1
    ) || 0

  ) + (

    Number(
      puntajes.EN2
    ) || 0

  ) + (

    Number(
      puntajes.EN3
    ) || 0

  );

}
