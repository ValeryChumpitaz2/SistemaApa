import {
  CheckCircle,
  AlertTriangle,
  CalendarDays,
  Clock,
  Download,
} from "lucide-react";

import { useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ResultCard({ analysis = {} }) {
  // ==================================================
  // ESTADO
  // ==================================================

  const [generandoPDF, setGenerandoPDF] = useState(false);

  // ==================================================
  // PUNTAJE
  // ==================================================

  const obtenidoRaw =
    analysis?.puntaje?.obtenido ??
    analysis?.puntaje ??
    analysis?.resumen?.obtenido ??
    analysis?.resumen?.puntaje ??
    analysis?.resultado?.obtenido ??
    0;

  const maximoRaw =
    analysis?.puntaje?.maximo ??
    analysis?.resumen?.maximo ??
    analysis?.resultado?.maximo ??
    2;

  const porcentajeRaw =
    analysis?.puntaje?.porcentaje ??
    analysis?.resumen?.porcentaje ??
    analysis?.resultado?.porcentaje ??
    null;

  const obtenido = Number(obtenidoRaw);
  const maximo = Number(maximoRaw);

  const puntajeFinal = Number.isFinite(obtenido)
    ? obtenido
    : 0;

  const maximoFinal =
    Number.isFinite(maximo) && maximo > 0
      ? maximo
      : 2;

  let porcentaje;

  if (
    porcentajeRaw !== null &&
    porcentajeRaw !== undefined &&
    porcentajeRaw !== ""
  ) {
    const porcentajeNumero = Number(
      porcentajeRaw
    );

    porcentaje = Number.isFinite(
      porcentajeNumero
    )
      ? porcentajeNumero
      : Math.round(
          (puntajeFinal / maximoFinal) * 100
        );
  } else {
    porcentaje =
      maximoFinal > 0
        ? Math.round(
            (puntajeFinal / maximoFinal) * 100
          )
        : 0;
  }

  porcentaje = Math.min(
    Math.max(porcentaje, 0),
    100
  );

  const descuento = Math.max(
    0,
    Number(
      (maximoFinal - puntajeFinal).toFixed(2)
    )
  );

  const cumple = porcentaje >= 95;

  // ==================================================
  // CRITERIOS
  // ==================================================

  const criterios = Array.isArray(
    analysis?.criterios
  )
    ? analysis.criterios
    : [];

  // ==================================================
  // FUNCIONES DE CRITERIOS
  // ==================================================

  function obtenerNombreCriterio(
    criterio,
    index
  ) {
    return (
      criterio?.nombre ||
      criterio?.criterio ||
      criterio?.titulo ||
      criterio?.descripcion ||
      `Criterio ${index + 1}`
    );
  }

  function obtenerCumplimiento(
    criterio
  ) {
    if (
      criterio &&
      criterio.cumple !== undefined &&
      criterio.cumple !== null
    ) {
      if (
        typeof criterio.cumple === "string"
      ) {
        return criterio.cumple
          .toLowerCase()
          .trim() === "true" ||
          criterio.cumple
            .toLowerCase()
            .includes("cumple");
      }

      return Boolean(criterio.cumple);
    }

    if (
      criterio?.cumplimiento !== undefined &&
      criterio?.cumplimiento !== null
    ) {
      const valor =
        criterio.cumplimiento;

      if (typeof valor === "boolean") {
        return valor;
      }

      const texto = String(valor)
        .toLowerCase()
        .trim();

      return (
        texto.includes("cumple") &&
        !texto.includes("no cumple")
      );
    }

    if (criterio?.estado) {
      const texto = String(
        criterio.estado
      )
        .toLowerCase()
        .trim();

      return (
        texto.includes("cumple") &&
        !texto.includes("no cumple")
      );
    }

    const puntajeCriterio = Number(
      criterio?.puntaje ?? 0
    );

    const maximoCriterio = Number(
      criterio?.maximo ?? 0
    );

    if (
      Number.isFinite(maximoCriterio) &&
      maximoCriterio > 0
    ) {
      return (
        puntajeCriterio >=
        maximoCriterio - 0.001
      );
    }

    return false;
  }

  function obtenerDescuentoCriterio(
    criterio
  ) {
    const valor =
      criterio?.descuento ??
      criterio?.descuentoPuntos ??
      criterio?.puntosDescontados ??
      criterio?.penalizacion ??
      0;

    const numero = Number(valor);

    return Number.isFinite(numero)
      ? numero
      : 0;
  }

  function obtenerObservacion(
    criterio
  ) {
    return (
      criterio?.observacion ||
      criterio?.observaciones ||
      criterio?.comentario ||
      criterio?.detalle ||
      criterio?.explicacion ||
      "Sin observaciones."
    );
  }

  function obtenerRecomendacion(
    criterio
  ) {
    return (
      criterio?.recomendacion ||
      criterio?.recomendaciones ||
      criterio?.sugerencia ||
      criterio?.sugerencias ||
      ""
    );
  }

  const criteriosCumplidos =
    criterios.filter((criterio) =>
      obtenerCumplimiento(criterio)
    ).length;

  const criteriosPendientes =
    criterios.length -
    criteriosCumplidos;

  // ==================================================
  // FECHA
  // ==================================================

  function obtenerFecha() {
    const valor =
      analysis?.fechaAnalisis ||
      analysis?.fecha ||
      analysis?.createdAt ||
      analysis?.fechaCreacion;

    if (!valor) {
      return null;
    }

    try {
      if (
        valor &&
        typeof valor.toDate === "function"
      ) {
        return valor.toDate();
      }

      const fecha =
        valor instanceof Date
          ? valor
          : new Date(valor);

      if (
        Number.isNaN(
          fecha.getTime()
        )
      ) {
        return null;
      }

      return fecha;
    } catch {
      return null;
    }
  }

  const fechaRevision =
    obtenerFecha();

  // ==================================================
  // FORMATO DE FECHA
  // ==================================================

  function formatearFechaRevision(
    fecha
  ) {
    if (!fecha) {
      return "Fecha no disponible";
    }

    const dia = String(
      fecha.getDate()
    ).padStart(2, "0");

    const mes = String(
      fecha.getMonth() + 1
    ).padStart(2, "0");

    const anio = String(
      fecha.getFullYear()
    ).slice(-2);

    const hora = String(
      fecha.getHours()
    ).padStart(2, "0");

    const minutos = String(
      fecha.getMinutes()
    ).padStart(2, "0");

    return `${dia}/${mes}/${anio} - ${hora}:${minutos}`;
  }

  const fechaFormateada =
    formatearFechaRevision(
      fechaRevision
    );

  // ==================================================
  // RESUMEN
  // ==================================================

  const resumenTexto =
    analysis?.resumen?.descripcion ||
    analysis?.resumen?.resumen ||
    analysis?.resumen?.texto ||
    analysis?.resumen?.observacion ||
    (cumple
      ? "El documento cumple los criterios evaluados."
      : "El documento presenta criterios que requieren atención.");

  const nombreDocumento =
    analysis?.nombre ||
    analysis?.resumen?.nombre ||
    "Documento analizado";

  // ==================================================
  // GENERAR PDF
  // ==================================================

  async function generarReportePDF() {
    try {
      setGenerandoPDF(true);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // ==================================================
      // COLORES
      // ==================================================

      const azul = [29, 54, 129];
      const azulClaro = [239, 246, 255];

      const verde = [21, 128, 61];
      const verdeClaro = [240, 253, 244];

      const rojo = [220, 38, 38];
      const rojoClaro = [254, 242, 242];

      const amarillo = [217, 119, 6];
      const amarilloClaro = [255, 251, 235];

      const gris = [100, 116, 139];
      const grisTexto = [30, 41, 59];

      const grisBorde = [226, 232, 240];

      // ==================================================
      // VARIABLES
      // ==================================================

      let y = 40;

      // ==================================================
      // ENCABEZADO
      // ==================================================

      function agregarEncabezado() {
        doc.setFillColor(...azul);

        doc.rect(
          0,
          0,
          210,
          30,
          "F"
        );

        doc.setTextColor(
          255,
          255,
          255
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(17);

        doc.text(
          "VG SMART REVIEW",
          15,
          12
        );

        doc.setFontSize(9);

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          "INFORME DE VERIFICACIÓN DE EVALUACIÓN",
          15,
          20
        );

        doc.text(
          fechaFormateada,
          195,
          20,
          {
            align: "right",
          }
        );
      }

      agregarEncabezado();

      // ==================================================
      // CONTROL DE PÁGINA
      // ==================================================

      function verificarEspacio(
        altura = 25
      ) {
        if (y + altura > 275) {
          doc.addPage();

          agregarEncabezado();

          y = 40;
        }
      }

      // ==================================================
      // INFORMACIÓN
      // ==================================================

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Información de la evaluación",
        15,
        y
      );

      y += 8;

      doc.setFontSize(9);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Documento:",
        15,
        y
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      const documentoLineas =
        doc.splitTextToSize(
          String(nombreDocumento),
          140
        );

      doc.text(
        documentoLineas,
        45,
        y
      );

      y += Math.max(
        6,
        documentoLineas.length * 4.5
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Estudiante:",
        15,
        y
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      const estudiante =
        analysis?.correo ||
        analysis?.estudiante ||
        "No registrado";

      const estudianteLineas =
        doc.splitTextToSize(
          String(estudiante),
          140
        );

      doc.text(
        estudianteLineas,
        45,
        y
      );

      y += Math.max(
        6,
        estudianteLineas.length * 4.5
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Fecha:",
        15,
        y
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        fechaFormateada,
        45,
        y
      );

      y += 12;

      // ==================================================
      // RESULTADO GENERAL
      // ==================================================

      verificarEspacio(55);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.setTextColor(
        ...grisTexto
      );

      doc.text(
        "Resultado de la evaluación",
        15,
        y
      );

      y += 5;

      doc.setFillColor(
        ...azulClaro
      );

      doc.roundedRect(
        15,
        y,
        180,
        39,
        4,
        4,
        "F"
      );

      // ==================================================
      // PUNTAJE
      // ==================================================

      doc.setTextColor(
        ...azul
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(8);

      doc.text(
        "PUNTAJE OBTENIDO",
        23,
        y + 9
      );

      doc.setFontSize(18);

      doc.text(
        String(puntajeFinal),
        23,
        y + 20
      );

      doc.setFontSize(9);

      doc.setTextColor(
        ...gris
      );

      doc.text(
        `/ ${maximoFinal} puntos`,
        44,
        y + 20
      );

      // ==================================================
      // PORCENTAJE
      // ==================================================

      doc.setTextColor(
        ...azul
      );

      doc.setFontSize(8);

      doc.text(
        "CUMPLIMIENTO",
        78,
        y + 9
      );

      doc.setFontSize(18);

      doc.text(
        `${porcentaje}%`,
        78,
        y + 20
      );

      // ==================================================
      // META
      // ==================================================

      doc.setFontSize(8);

      doc.setTextColor(
        ...gris
      );

      doc.text(
        "META",
        123,
        y + 9
      );

      doc.setFontSize(13);

      doc.setTextColor(
        ...grisTexto
      );

      doc.text(
        "95%",
        123,
        y + 20
      );

      // ==================================================
      // DESCUENTO
      // ==================================================

      doc.setFontSize(8);

      doc.setTextColor(
        ...gris
      );

      doc.text(
        "DESCUENTO",
        155,
        y + 9
      );

      doc.setFontSize(13);

      doc.setTextColor(
        ...(descuento > 0
          ? rojo
          : verde)
      );

      doc.text(
        descuento > 0
          ? `-${descuento}`
          : "0",
        155,
        y + 20
      );

      // ==================================================
      // ESTADO
      // ==================================================

      doc.setFontSize(8);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setTextColor(
        ...(cumple
          ? verde
          : rojo)
      );

      doc.text(
        cumple
          ? "LISTO PARA ENTREGA"
          : "REQUIERE REVISION",
        23,
        y + 31
      );

      y += 48;

      // ==================================================
      // META
      // ==================================================

      const diferenciaMeta =
        Math.max(
          0,
          95 - porcentaje
        );

      const mensajeMeta =
        cumple
          ? "El documento alcanza la meta establecida del 95%."
          : `Faltan ${diferenciaMeta} puntos porcentuales para alcanzar la meta del 95%.`;

      const mensajeMetaLineas =
        doc.splitTextToSize(
          mensajeMeta,
          168
        );

      const alturaMeta = Math.max(
        15,
        mensajeMetaLineas.length *
          4.5 +
          8
      );

      verificarEspacio(
        alturaMeta + 8
      );

      doc.setFillColor(
        ...(cumple
          ? verdeClaro
          : amarilloClaro)
      );

      doc.roundedRect(
        15,
        y,
        180,
        alturaMeta,
        3,
        3,
        "F"
      );

      doc.setTextColor(
        ...(cumple
          ? verde
          : amarillo)
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(9);

      doc.text(
        mensajeMetaLineas,
        21,
        y + 6
      );

      y += alturaMeta + 8;

      // ==================================================
      // RESUMEN
      // ==================================================

      verificarEspacio(45);

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Resumen de la evaluación",
        15,
        y
      );

      y += 6;

      const resumenLineas =
        doc.splitTextToSize(
          String(resumenTexto),
          175
        );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.setTextColor(
        ...gris
      );

      doc.text(
        resumenLineas,
        15,
        y
      );

      y +=
        resumenLineas.length *
          4.5 +
        10;

      // ==================================================
      // TABLA DE CRITERIOS
      // ==================================================

      verificarEspacio(50);

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Resumen de criterios",
        15,
        y
      );

      y += 5;

      const filasResumen =
        criterios.map(
          (criterio, index) => {
            const puntajeCriterioRaw =
              Number(
                criterio?.puntaje ?? 0
              );

            const maximoCriterioRaw =
              Number(
                criterio?.maximo ?? 0
              );

            const puntajeCriterio =
              Number.isFinite(
                puntajeCriterioRaw
              )
                ? puntajeCriterioRaw
                : 0;

            const maximoCriterio =
              Number.isFinite(
                maximoCriterioRaw
              )
                ? maximoCriterioRaw
                : 0;

            const cumpleCriterio =
              obtenerCumplimiento(
                criterio
              );

            const descuentoCriterio =
              obtenerDescuentoCriterio(
                criterio
              );

            let estado = "NO CUMPLE";

            if (cumpleCriterio) {
              estado = "CUMPLE";
            } else if (
              puntajeCriterio > 0
            ) {
              estado = "PARCIAL";
            }

            return [
              `${index + 1}. ${obtenerNombreCriterio(
                criterio,
                index
              )}`,
              `${puntajeCriterio}`,
              `${maximoCriterio}`,
              estado,
              descuentoCriterio > 0
                ? `-${descuentoCriterio}`
                : "0",
            ];
          }
        );

      if (
        filasResumen.length > 0
      ) {
        autoTable(doc, {
          startY: y,

          theme: "grid",

          head: [
            [
              "Criterio",
              "Obtenido",
              "Máximo",
              "Estado",
              "Descuento",
            ],
          ],

          body: filasResumen,

          margin: {
            left: 15,
            right: 15,
          },

          styles: {
            fontSize: 8.5,
            cellPadding: 3,
            valign: "middle",
            textColor: grisTexto,
          },

          headStyles: {
            fillColor: azul,
            textColor: 255,
            fontStyle: "bold",
          },

          columnStyles: {
            0: {
              cellWidth: 82,
            },

            1: {
              cellWidth: 22,
              halign: "center",
            },

            2: {
              cellWidth: 22,
              halign: "center",
            },

            3: {
              cellWidth: 28,
              halign: "center",
            },

            4: {
              cellWidth: 26,
              halign: "center",
            },
          },

          didParseCell: (data) => {
            if (
              data.section ===
                "body" &&
              data.column.index === 3
            ) {
              const texto = String(
                data.cell.raw || ""
              );

              if (
                texto === "CUMPLE"
              ) {
                data.cell.styles.textColor =
                  verde;
              } else if (
                texto === "PARCIAL"
              ) {
                data.cell.styles.textColor =
                  amarillo;
              } else {
                data.cell.styles.textColor =
                  rojo;
              }

              data.cell.styles.fontStyle =
                "bold";
            }
          },
        });

        if (
          doc.lastAutoTable &&
          typeof doc.lastAutoTable.finalY ===
            "number"
        ) {
          y =
            doc.lastAutoTable.finalY +
            12;
        } else {
          y += 30;
        }
      } else {
        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(9);

        doc.setTextColor(
          ...gris
        );

        doc.text(
          "No se registraron criterios para esta evaluación.",
          15,
          y + 5
        );

        y += 15;
      }

      // ==================================================
      // CRITERIOS QUE REQUIEREN ATENCIÓN
      // ==================================================

      const criteriosProblema =
        criterios.filter(
          (criterio) =>
            !obtenerCumplimiento(
              criterio
            )
        );

      verificarEspacio(45);

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Criterios que requieren atención",
        15,
        y
      );

      y += 6;

      if (
        criteriosProblema.length === 0
      ) {
        const mensajeTodos =
          "Todos los criterios cumplen correctamente.";

        const mensajeTodosLineas =
          doc.splitTextToSize(
            mensajeTodos,
            165
          );

        const alturaTodos =
          Math.max(
            18,
            mensajeTodosLineas.length *
              4.5 +
              10
          );

        verificarEspacio(
          alturaTodos + 5
        );

        doc.setFillColor(
          ...verdeClaro
        );

        doc.roundedRect(
          15,
          y,
          180,
          alturaTodos,
          3,
          3,
          "F"
        );

        doc.setTextColor(
          ...verde
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(9);

        doc.text(
          mensajeTodosLineas,
          21,
          y + 11
        );

        y += alturaTodos + 9;
      } else {
        doc.setFillColor(
          ...rojoClaro
        );

        doc.roundedRect(
          15,
          y,
          180,
          16,
          3,
          3,
          "F"
        );

        doc.setTextColor(
          ...rojo
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(9);

        doc.text(
          `${criteriosProblema.length} criterio(s) requieren atención.`,
          21,
          y + 10
        );

        y += 23;

        criteriosProblema.forEach(
          (criterio) => {
            const nombre =
              obtenerNombreCriterio(
                criterio,
                criterios.indexOf(
                  criterio
                )
              );

            const puntajeCriterioRaw =
              Number(
                criterio?.puntaje ?? 0
              );

            const maximoCriterioRaw =
              Number(
                criterio?.maximo ?? 0
              );

            const puntajeCriterio =
              Number.isFinite(
                puntajeCriterioRaw
              )
                ? puntajeCriterioRaw
                : 0;

            const maximoCriterio =
              Number.isFinite(
                maximoCriterioRaw
              )
                ? maximoCriterioRaw
                : 0;

            const descuentoCriterio =
              obtenerDescuentoCriterio(
                criterio
              );

            const observacion =
              obtenerObservacion(
                criterio
              );

            const recomendacion =
              obtenerRecomendacion(
                criterio
              );

            const nombreLineas =
              doc.splitTextToSize(
                String(nombre),
                168
              );

            const observacionLineas =
              doc.splitTextToSize(
                String(observacion),
                165
              );

            const recomendacionLineas =
              recomendacion
                ? doc.splitTextToSize(
                    String(
                      recomendacion
                    ),
                    165
                  )
                : [];

            const alturaEstimada =
              15 +
              nombreLineas.length *
                4.5 +
              14 +
              observacionLineas.length *
                4.2 +
              15 +
              (recomendacion
                ? recomendacionLineas.length *
                    4.2 +
                  12
                : 0) +
              12;

            verificarEspacio(
              Math.min(
                alturaEstimada,
                100
              )
            );

            // ------------------------------------------
            // TÍTULO
            // ------------------------------------------

            const alturaTitulo =
              Math.max(
                10,
                nombreLineas.length *
                  4.5 +
                  6
              );

            doc.setFillColor(
              ...amarilloClaro
            );

            doc.roundedRect(
              15,
              y,
              180,
              alturaTitulo,
              2,
              2,
              "F"
            );

            doc.setTextColor(
              ...grisTexto
            );

            doc.setFont(
              "helvetica",
              "bold"
            );

            doc.setFontSize(9);

            doc.text(
              nombreLineas,
              21,
              y + 6
            );

            y += alturaTitulo + 5;

            // ------------------------------------------
            // PUNTAJE
            // ------------------------------------------

            doc.setFont(
              "helvetica",
              "normal"
            );

            doc.setFontSize(8);

            doc.setTextColor(
              ...gris
            );

            doc.text(
              `Puntaje: ${puntajeCriterio} / ${maximoCriterio}`,
              21,
              y
            );

            if (
              descuentoCriterio > 0
            ) {
              doc.setTextColor(
                ...rojo
              );

              doc.text(
                `Descuento: -${descuentoCriterio} puntos`,
                100,
                y
              );
            }

            y += 6;

            // ------------------------------------------
            // OBSERVACIÓN
            // ------------------------------------------

            doc.setTextColor(
              ...grisTexto
            );

            doc.setFont(
              "helvetica",
              "bold"
            );

            doc.setFontSize(8);

            doc.text(
              "Problema detectado:",
              21,
              y
            );

            y += 4.5;

            doc.setFont(
              "helvetica",
              "normal"
            );

            doc.setTextColor(
              ...grisTexto
            );

            doc.text(
              observacionLineas,
              21,
              y
            );

            y +=
              observacionLineas.length *
                4.2 +
              5;

            // ------------------------------------------
            // RECOMENDACIÓN
            // ------------------------------------------

            if (recomendacion) {
              doc.setTextColor(
                ...azul
              );

              doc.setFont(
                "helvetica",
                "bold"
              );

              doc.text(
                "Recomendación:",
                21,
                y
              );

              y += 4.5;

              doc.setTextColor(
                ...grisTexto
              );

              doc.setFont(
                "helvetica",
                "normal"
              );

              doc.text(
                recomendacionLineas,
                21,
                y
              );

              y +=
                recomendacionLineas.length *
                  4.2 +
                6;
            }

            y += 5;

            doc.setDrawColor(
              ...grisBorde
            );

            doc.line(
              15,
              y,
              195,
              y
            );

            y += 8;
          }
        );
      }

      // ==================================================
      // EVIDENCIA DE VERIFICACIÓN
      // ==================================================

      verificarEspacio(40);

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Evidencia de verificación",
        15,
        y
      );

      y += 6;

      doc.setTextColor(
        ...gris
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8.5);

      const evidenciaIntro =
        "Detalle de los elementos utilizados para determinar el resultado de cada criterio.";

      const evidenciaIntroLineas =
        doc.splitTextToSize(
          evidenciaIntro,
          175
        );

      doc.text(
        evidenciaIntroLineas,
        15,
        y
      );

      y +=
        evidenciaIntroLineas.length *
          4.2 +
        8;

      // ==================================================
      // DETALLE DE CRITERIOS
      // ==================================================

      criterios.forEach(
        (criterio, index) => {
          const nombre =
            obtenerNombreCriterio(
              criterio,
              index
            );

          const puntajeCriterioRaw =
            Number(
              criterio?.puntaje ?? 0
            );

          const maximoCriterioRaw =
            Number(
              criterio?.maximo ?? 0
            );

          const puntajeCriterio =
            Number.isFinite(
              puntajeCriterioRaw
            )
              ? puntajeCriterioRaw
              : 0;

          const maximoCriterio =
            Number.isFinite(
              maximoCriterioRaw
            )
              ? maximoCriterioRaw
              : 0;

          const cumpleCriterio =
            obtenerCumplimiento(
              criterio
            );

          const nombreCriterioLineas =
            doc.splitTextToSize(
              `${index + 1}. ${String(nombre)}`,
              145
            );

          const alturaCabecera =
            Math.max(
              12,
              nombreCriterioLineas.length *
                4.5 +
                6
            );

          verificarEspacio(
            alturaCabecera + 35
          );

          // ------------------------------------------
          // CABECERA DEL CRITERIO
          // ------------------------------------------

          doc.setFillColor(
            ...(cumpleCriterio
              ? verdeClaro
              : amarilloClaro)
          );

          doc.roundedRect(
            15,
            y,
            180,
            alturaCabecera,
            2,
            2,
            "F"
          );

          doc.setTextColor(
            ...grisTexto
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(9);

          doc.text(
            nombreCriterioLineas,
            21,
            y + 7
          );

          doc.text(
            `${puntajeCriterio} / ${maximoCriterio}`,
            188,
            y + 7,
            {
              align: "right",
            }
          );

          y +=
            alturaCabecera + 5;

          // ------------------------------------------
          // DETALLES
          // ------------------------------------------

          const detalles =
            Array.isArray(
              criterio?.detalles
            )
              ? criterio.detalles
              : [];

          if (
            detalles.length === 0
          ) {
            verificarEspacio(15);

            doc.setFont(
              "helvetica",
              "normal"
            );

            doc.setFontSize(8);

            doc.setTextColor(
              ...gris
            );

            const textoSinEvidencia =
              "No se registraron evidencias detalladas para este criterio.";

            const textoSinEvidenciaLineas =
              doc.splitTextToSize(
                textoSinEvidencia,
                165
              );

            doc.text(
              textoSinEvidenciaLineas,
              21,
              y
            );

            y +=
              textoSinEvidenciaLineas.length *
                4.2 +
              8;
          } else {
            detalles.forEach(
              (detalle) => {
                const titulo =
                  detalle?.titulo ||
                  "Verificación";

                const descripcion =
                  detalle?.descripcion ||
                  "";

                const detalleCumple =
                  Boolean(
                    detalle?.cumple
                  );

                const descripcionLineas =
                  descripcion
                    ? doc.splitTextToSize(
                        String(
                          descripcion
                        ),
                        158
                      )
                    : [];

                verificarEspacio(
                  Math.max(
                    18,
                    descripcionLineas.length *
                      4.2 +
                      12
                  )
                );

                doc.setFont(
                  "helvetica",
                  "bold"
                );

                doc.setFontSize(8);

                doc.setTextColor(
                  ...(detalleCumple
                    ? verde
                    : rojo)
                );

                doc.text(
                  detalleCumple
                    ? "OK"
                    : "!",
                  21,
                  y
                );

                doc.setTextColor(
                  ...grisTexto
                );

                doc.text(
                  String(titulo),
                  29,
                  y
                );

                y += 4.5;

                if (
                  descripcion
                ) {
                  doc.setFont(
                    "helvetica",
                    "normal"
                  );

                  doc.setTextColor(
                    ...gris
                  );

                  doc.text(
                    descripcionLineas,
                    29,
                    y
                  );

                  y +=
                    descripcionLineas.length *
                      4.2 +
                    4;
                }
              }
            );
          }

          y += 3;

          doc.setDrawColor(
            ...grisBorde
          );

          doc.line(
            15,
            y,
            195,
            y
          );

          y += 7;
        }
      );

      // ==================================================
      // CONCLUSIÓN FINAL
      // ==================================================

      const conclusion = cumple
        ? `El documento obtuvo ${puntajeFinal} de ${maximoFinal} puntos (${porcentaje}%). Se cumplieron los ${criterios.length} criterios evaluados y se alcanzó la meta establecida.`
        : `El documento obtuvo ${puntajeFinal} de ${maximoFinal} puntos (${porcentaje}%). Se cumplieron ${criteriosCumplidos} de ${criterios.length} criterios evaluados. Se recomienda corregir los ${criteriosPendientes} criterio(s) que requieren atención antes de la entrega.`;

      const conclusionLineas =
        doc.splitTextToSize(
          conclusion,
          165
        );

      const alturaConclusion =
        Math.max(
          24,
          conclusionLineas.length *
            4.5 +
            12
        );

      verificarEspacio(
        alturaConclusion + 10
      );

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        "Conclusión de la revisión",
        15,
        y
      );

      y += 6;

      doc.setFillColor(
        ...(cumple
          ? verdeClaro
          : rojoClaro)
      );

      doc.roundedRect(
        15,
        y,
        180,
        alturaConclusion,
        3,
        3,
        "F"
      );

      doc.setTextColor(
        ...grisTexto
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.text(
        conclusionLineas,
        21,
        y + 8
      );

      y +=
        alturaConclusion + 8;

      // ==================================================
      // PIE DE PÁGINA
      // ==================================================

      const totalPaginas =
        doc.getNumberOfPages();

      for (
        let pagina = 1;
        pagina <= totalPaginas;
        pagina++
      ) {
        doc.setPage(pagina);

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(8);

        doc.setTextColor(
          148,
          163,
          184
        );

        doc.text(
          "VG Smart Review · Informe generado automáticamente",
          15,
          290
        );

        doc.text(
          `Página ${pagina} de ${totalPaginas}`,
          195,
          290,
          {
            align: "right",
          }
        );
      }

      // ==================================================
      // GUARDAR PDF
      // ==================================================

      let nombreArchivo = String(
        nombreDocumento
      )
        .normalize("NFD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )
        .replace(
          /[^a-zA-Z0-9_-]/g,
          "_"
        )
        .replace(
          /_+/g,
          "_"
        )
        .replace(
          /^_+|_+$/g,
          ""
        )
        .substring(0, 80);

      if (!nombreArchivo) {
        nombreArchivo =
          "Documento_analizado";
      }

      doc.save(
        `Informe_Verificacion_${nombreArchivo}.pdf`
      );
    } catch (error) {
      console.error(
        "Error generando PDF:",
        error
      );

      alert(
        "No fue posible generar el informe PDF. Revisa la consola para obtener más detalles."
      );
    } finally {
      setGenerandoPDF(false);
    }
  }

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        shadow-sm
        overflow-hidden
      "
    >
      {/* CABECERA */}

      <div
        className="
          p-5
          md:p-6
          border-b
          border-slate-100
          dark:border-slate-800
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-black
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-600
                "
              />

              Resultado de evaluación
            </div>

            <h2
              className="
                text-xl
                md:text-2xl
                font-black
                text-slate-800
                dark:text-white
                mt-2
              "
            >
              Estado del documento
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
                mt-1
                truncate
              "
            >
              {nombreDocumento}
            </p>
          </div>

          <button
            type="button"
            onClick={generarReportePDF}
            disabled={generandoPDF}
            className="
              shrink-0
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-[#1D3681]
              hover:bg-[#162b68]
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              text-sm
              font-bold
              shadow-sm
              transition
            "
          >
            <Download size={17} />

            {generandoPDF
              ? "Generando..."
              : "Descargar PDF"}
          </button>
        </div>

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            text-xs
            text-slate-500
            dark:text-slate-400
          "
        >
          <CalendarDays
            size={15}
            className="text-blue-600"
          />

          <span>Revisión:</span>

          <span
            className="
              font-semibold
              text-slate-700
              dark:text-slate-200
            "
          >
            {fechaFormateada}
          </span>

          <Clock
            size={14}
            className="
              ml-2
              text-slate-400
            "
          />
        </div>
      </div>

      {/* RESULTADO GENERAL */}

      <div className="p-5 md:p-6">

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1.1fr_1fr]
            gap-4
          "
        >

          {/* ==========================================
              DESCUENTO - PRIMERO
          ========================================== */}

          <div
            className="
              rounded-2xl
              border
              border-red-100
              dark:border-red-900/40
              p-5
              bg-red-50
              dark:bg-red-900/10
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

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    font-black
                    text-red-500
                    dark:text-red-400
                  "
                >
                  Descuento
                </p>

                <p
                  className="
                    mt-1
                    text-3xl
                    font-black
                    text-red-600
                    dark:text-red-400
                  "
                >
                  {descuento > 0
                    ? `-${descuento}`
                    : "0"}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                    mt-1
                  "
                >
                  puntos descontados
                </p>
              </div>

              {/* CUMPLIMIENTO PEQUEÑO */}

              <div
                className="
                  text-right
                  shrink-0
                "
              >
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wide
                    font-black
                    text-slate-400
                  "
                >
                  Cumplimiento
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-black
                    text-[#1D3681]
                    dark:text-blue-300
                  "
                >
                  {porcentaje}%
                </p>

                <div
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    mt-1
                    px-2
                    py-1
                    rounded-full
                    text-[10px]
                    font-black
                    ${
                      cumple
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }
                  `}
                >
                  {cumple ? (
                    <CheckCircle size={11} />
                  ) : (
                    <AlertTriangle size={11} />
                  )}

                  {cumple
                    ? "Listo"
                    : "Requiere revisión"}
                </div>
              </div>
            </div>

            {/* BARRA DE CUMPLIMIENTO */}

            <div
              className="
                mt-4
                h-1.5
                rounded-full
                bg-slate-200
                dark:bg-slate-700
                overflow-hidden
              "
            >
              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  ${
                    cumple
                      ? "bg-green-500"
                      : "bg-[#1D3681]"
                  }
                `}
                style={{
                  width: `${Math.min(
                    Math.max(
                      porcentaje,
                      0
                    ),
                    100
                  )}%`,
                }}
              />
            </div>

            <div
              className="
                flex
                justify-between
                mt-1.5
                text-[10px]
                text-slate-400
              "
            >
              <span>0%</span>
              <span>Meta 95%</span>
              <span>100%</span>
            </div>

            <p
              className="
                mt-2
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              {cumple
                ? "El documento alcanza la meta establecida."
                : `Faltan ${Math.max(
                    0,
                    95 - porcentaje
                  )} puntos porcentuales para alcanzar la meta del 95%.`}
            </p>
          </div>

          {/* ==========================================
              INFORMACIÓN SECUNDARIA
          ========================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            {/* PUNTAJE OBTENIDO */}

            <div
              className="
                rounded-2xl
                bg-blue-50
                dark:bg-blue-900/20
                p-4
                border
                border-blue-100
                dark:border-blue-900/50
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wide
                  font-black
                  text-blue-600
                  dark:text-blue-400
                "
              >
                Puntaje obtenido
              </p>

              <p
                className="
                  mt-1
                  text-xl
                  font-black
                  text-slate-800
                  dark:text-white
                "
              >
                {puntajeFinal}

                <span
                  className="
                    text-xs
                    font-bold
                    text-slate-400
                  "
                >
                  {" "}
                  / {maximoFinal}
                </span>
              </p>

              <p
                className="
                  text-[10px]
                  text-slate-500
                  mt-0.5
                "
              >
                puntos
              </p>
            </div>

            {/* META */}

            <div
              className="
                rounded-2xl
                bg-slate-50
                dark:bg-slate-800
                p-4
                border
                border-slate-200
                dark:border-slate-700
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wide
                  font-black
                  text-slate-400
                "
              >
                Meta
              </p>

              <p
                className="
                  mt-1
                  text-xl
                  font-black
                  text-slate-700
                  dark:text-slate-200
                "
              >
                95%
              </p>

              <p
                className="
                  text-[10px]
                  text-slate-500
                  mt-0.5
                "
              >
                objetivo
              </p>
            </div>

            {/* CRITERIOS */}

            <div
              className="
                col-span-2
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-700
                p-4
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-wide
                    font-black
                    text-slate-400
                  "
                >
                  Criterios
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-bold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {criteriosCumplidos} de{" "}
                  {criterios.length} cumplidos
                </p>
              </div>

              <div
                className="text-right"
              >
                <p
                  className="
                    text-[10px]
                    text-slate-400
                  "
                >
                  Pendientes
                </p>

                <p
                  className={`
                    text-lg
                    font-black
                    ${
                      criteriosPendientes >
                      0
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }
                  `}
                >
                  {criteriosPendientes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            RESUMEN
        ========================================== */}

        <div
          className="
            mt-4
            rounded-2xl
            bg-slate-50
            dark:bg-slate-800
            border
            border-slate-200
            dark:border-slate-700
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              mb-2
            "
          >
            <div
              className="
                h-2
                w-2
                rounded-full
                bg-[#1D3681]
              "
            />

            <p
              className="
                text-xs
                uppercase
                tracking-wide
                font-black
                text-slate-400
              "
            >
              Resumen de la evaluación
            </p>
          </div>

          <p
            className="
              text-sm
              leading-relaxed
              text-slate-600
              dark:text-slate-300
            "
          >
            {resumenTexto}
          </p>
        </div>
      </div>
    </div>
  );
}
