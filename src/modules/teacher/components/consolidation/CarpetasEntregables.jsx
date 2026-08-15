import {
  FolderOpen,
  Link,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function CarpetasEntregables({
  carpetas,
  cambiarCarpeta,
  cargando,
  error,
}) {
  const carpetasSeleccionadas = [
    carpetas.EN1,
    carpetas.EN2,
    carpetas.EN3,
  ].filter(
    (carpeta) =>
      carpeta.trim() !== ""
  ).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Carpetas de entregables
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Selecciona una carpeta para cada entregable.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
          <FolderOpen size={15} />

          {carpetasSeleccionadas} de 3 carpetas
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {["EN1", "EN2", "EN3"].map(
          (entregable) => {

            const tieneCarpeta =
              carpetas[entregable].trim() !== "";

            return (
              <div
                key={entregable}
                className={`
                  border rounded-2xl p-5 transition
                  ${
                    tieneCarpeta
                      ? "border-green-200 bg-green-50/40"
                      : "border-slate-200 bg-slate-50"
                  }
                `}
              >

                <div className="flex items-center justify-between mb-4">

                  <div>
                    <span className="font-black text-lg text-slate-900">
                      {entregable}
                    </span>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Entregable{" "}
                      {entregable.replace(
                        "EN",
                        ""
                      )}
                    </p>
                  </div>

                  <div
                    className={`
                      rounded-xl p-2.5
                      ${
                        tieneCarpeta
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {tieneCarpeta ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <FolderOpen size={20} />
                    )}
                  </div>

                </div>

                <div className="relative">

                  <Link
                    size={17}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    value={
                      carpetas[entregable]
                    }
                    disabled={cargando}
                    onChange={(e) =>
                      cambiarCarpeta(
                        entregable,
                        e.target.value
                      )
                    }
                    placeholder="URL de Google Drive"
                    className="
                      w-full
                      pl-10
                      pr-3
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:border-blue-500
                      disabled:bg-slate-100
                    "
                  />

                </div>

                <div className="mt-3 flex items-center gap-2">

                  <div
                    className={`
                      w-2 h-2 rounded-full
                      ${
                        tieneCarpeta
                          ? "bg-green-500"
                          : "bg-slate-300"
                      }
                    `}
                  />

                  <span className="text-xs text-slate-500">
                    {tieneCarpeta
                      ? "Carpeta configurada"
                      : "Esperando carpeta"}
                  </span>

                </div>

              </div>
            );
          }
        )}

      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">

          <AlertCircle
            size={20}
            className="shrink-0 mt-0.5"
          />

          <div>
            <p className="font-bold">
              No se pudo realizar la consolidación
            </p>

            <p className="text-sm mt-1">
              {error}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}