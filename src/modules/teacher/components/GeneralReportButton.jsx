import { FileDown, BarChart3 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function GeneralReportButton({
  resultados = [],
}) {


  const generarReporte = () => {

    if (!resultados.length) {
      alert("No hay datos para exportar");
      return;
    }


    const doc = new jsPDF();


    const azul = [15,45,100];


    const fecha =
      new Date().toLocaleDateString(
        "es-PE"
      );


    const aprobados =
      resultados.filter(
        x =>
          Number(
            x.puntaje?.porcentaje ?? 0
          ) >= 70
      ).length;


    const revisar =
      resultados.length -
      aprobados;


    const promedio =
      resultados.reduce(
        (a,b)=>
          a+
          Number(
            b.puntaje?.porcentaje ?? 0
          ),
        0
      ) /
      resultados.length;



    // PORTADA

    doc.setFillColor(
      ...azul
    );

    doc.rect(
      0,
      0,
      210,
      45,
      "F"
    );


    doc.setTextColor(
      255,
      255,
      255
    );


    doc.setFontSize(24);


    doc.text(
      "Reporte General",
      105,
      25,
      {
        align:"center"
      }
    );



    doc.setTextColor(
      30,
      30,
      30
    );


    doc.setFontSize(12);


    doc.text(
      `Fecha: ${fecha}`,
      20,
      65
    );


    doc.text(
      `Total evaluaciones: ${resultados.length}`,
      20,
      75
    );



    autoTable(doc,{

      startY:90,


      head:[
        [
          "Indicador",
          "Resultado"
        ]
      ],


      body:[
        [
          "Aprobados",
          aprobados
        ],
        [
          "Requieren revisión",
          revisar
        ],
        [
          "Promedio general",
          `${promedio.toFixed(2)}%`
        ]
      ],


      theme:"grid",


      headStyles:{
        fillColor:azul
      }

    });



    // TABLA GENERAL


    doc.addPage();



    doc.setFontSize(18);

    doc.setTextColor(
      ...azul
    );


    doc.text(
      "Resultados Generales",
      20,
      25
    );



    const filas =
      resultados.map(
        item=>[

          item.nombre ??
          "Sin nombre",

          `${item.puntaje?.obtenido ?? 0}/${
            item.puntaje?.maximo ?? 0
          }`,

          `${item.puntaje?.porcentaje ?? 0}%`,


          Number(
            item.puntaje?.porcentaje ?? 0
          ) >=70
          ?
          "APROBADO"
          :
          "REVISAR"

        ]
      );



    autoTable(doc,{

      startY:35,


      head:[[
        "Documento",
        "Puntaje",
        "%",
        "Estado"
      ]],


      body:filas,


      styles:{
        fontSize:8
      },


      headStyles:{
        fillColor:[
          15,
          45,
          100
        ],
        textColor:255
      },


      alternateRowStyles:{
        fillColor:[
          235,
          242,
          255
        ]
      }

    });



    doc.save(
      "Reporte_General.pdf"
    );

  };



  return (

    <button
      onClick={generarReporte}
      className="
        group
        relative
        overflow-hidden
        flex
        items-center
        gap-3
        px-6
        py-3
        rounded-2xl
        bg-gradient-to-r
        from-blue-900
        via-blue-700
        to-indigo-600
        text-white
        font-bold
        shadow-xl
        hover:scale-105
        transition
      "
    >

      <BarChart3
        size={22}
        className="
          group-hover:rotate-12
          transition
        "
      />

      Reporte General PDF


    </button>

  );
}