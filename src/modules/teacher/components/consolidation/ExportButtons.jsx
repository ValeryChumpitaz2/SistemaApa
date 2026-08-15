import {
  Download,
  FileDown,
} from "lucide-react";

export default function ExportButtons({
  resultadosFiltrados,
  exportarCSV,
  exportarPDF,
}) {

  if (!resultadosFiltrados?.length) {
    return null;
  }

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-end
        gap-2
      "
    >

      <button
        onClick={exportarCSV}
        className="
          flex
          items-center
          justify-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          bg-green-600
          hover:bg-green-700
          text-white
          font-bold
          transition
        "
      >
        <Download size={18} />
        Descargar CSV
      </button>

      <button
        onClick={exportarPDF}
        className="
          flex
          items-center
          justify-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          bg-red-600
          hover:bg-red-700
          text-white
          font-bold
          transition
        "
      >
        <FileDown size={18} />
        Descargar PDF
      </button>

    </div>
  );
}