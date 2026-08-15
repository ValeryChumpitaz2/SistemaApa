import {
  Loader2,
  Sparkles,
  Clock3,
  Check,
  FileSearch,
} from "lucide-react";

export default function ProcesamientoConsolidacion({
  cargando,
  tiempoTranscurrido,
  paso,
  mensajeProceso,
  etapaActual,
  carpetas,
  resultado,
}) {

  function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);

    const segundosRestantes = segundos % 60;

    return (
      String(minutos).padStart(2, "0") +
      ":" +
      String(segundosRestantes).padStart(2, "0")
    );
  }

  function estadoEtapa(numero) {

    if (!cargando) {

      if (resultado && numero <= 3) {
        return "completa";
      }

      return "pendiente";
    }

    if (numero < etapaActual) {
      return "completa";
    }

    if (numero === etapaActual) {
      return "activa";
    }

    return "pendiente";
  }

  if (!cargando) {
    return null;
  }

  const etapas = [
    {
      codigo: "EN1",
      numero: 0,
      titulo: "Entregable 1",
    },
    {
      codigo: "EN2",
      numero: 1,
      titulo: "Entregable 2",
    },
    {
      codigo: "EN3",
      numero: 2,
      titulo: "Entregable 3",
    },
  ];

  return (
    <div
      className="
        bg-white
        border
        border-blue-200
        rounded-3xl
        shadow-lg
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
          px-6
          py-6
          bg-gradient-to-r
          from-[#1D3681]
          via-blue-700
          to-indigo-700
          text-white
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-white/15
                border
                border-white/10
                flex
                items-center
                justify-center
              "
            >
              <Sparkles
                size={26}
                className="animate-pulse"
              />
            </div>

            <div>

              <p className="text-xl font-black">
                Consolidando entregables
              </p>

              <p className="text-sm text-blue-100 mt-1">
                El servidor está procesando los documentos.
              </p>

            </div>

          </div>

          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              bg-white/10
              border
              border-white/10
              rounded-xl
              px-4
              py-2
            "
          >
            <Clock3 size={17} />

            <span className="font-mono font-bold">
              {formatearTiempo(tiempoTranscurrido)}
            </span>
          </div>

        </div>

        <div
          className="
            mt-6
            h-1.5
            w-full
            bg-white/15
            rounded-full
            overflow-hidden
          "
        >
          <div
            className="
              h-full
              w-1/3
              bg-white
              rounded-full
            "
            style={{
              animation:
                "loading 1.5s ease-in-out infinite",
            }}
          />
        </div>

        <style>
          {`
            @keyframes loading {
              0% {
                transform: translateX(-120%);
              }

              50% {
                transform: translateX(100%);
              }

              100% {
                transform: translateX(320%);
              }
            }
          `}
        </style>

      </div>

      {/* CONTENIDO */}

      <div className="p-6">

        <div
          className="
            flex
            items-center
            gap-4
            bg-blue-50
            border
            border-blue-100
            rounded-2xl
            p-5
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Loader2
              size={21}
              className="animate-spin"
            />
          </div>

          <div className="min-w-0">

            <p
              className="
                font-bold
                text-blue-900
              "
            >
              {paso}
            </p>

            <p
              className="
                text-sm
                text-blue-700
                mt-1
              "
            >
              {mensajeProceso}
            </p>

          </div>

        </div>

        {/* TIEMPO */}

        <div
          className="
            mt-4
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-500
            "
          >

            <Clock3 size={15} />

            Tiempo transcurrido:

            <span
              className="
                font-mono
                font-bold
                text-slate-700
              "
            >
              {formatearTiempo(tiempoTranscurrido)}
            </span>

          </div>

          <p className="text-xs text-slate-400">
            No cierres ni recargues esta página.
          </p>

        </div>

        {/* ETAPAS */}

        <div className="mt-6 space-y-3">

          {etapas.map((etapa) => {

            const estado =
              estadoEtapa(etapa.numero);

            const tiene =
              carpetas[etapa.codigo].trim() !== "";

            return (
              <div
                key={etapa.codigo}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  p-4
                  transition-all
                  ${
                    !tiene
                      ? "opacity-40 border-slate-200 bg-slate-50"
                      : estado === "completa"
                        ? "border-green-200 bg-green-50"
                        : estado === "activa"
                          ? "border-blue-300 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-slate-50"
                  }
                `}
              >

                <div
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    font-black
                    text-xs
                    shrink-0
                    ${
                      !tiene
                        ? "bg-slate-200 text-slate-400"
                        : estado === "completa"
                          ? "bg-green-600 text-white"
                          : estado === "activa"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-500"
                    }
                  `}
                >
                  {!tiene ? (
                    etapa.codigo
                  ) : estado === "completa" ? (
                    <Check size={18} />
                  ) : (
                    etapa.codigo
                  )}
                </div>

                <div className="flex-1">

                  <p
                    className="
                      font-bold
                      text-slate-800
                    "
                  >
                    {etapa.titulo}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      mt-0.5
                    "
                  >
                    {!tiene
                      ? "No seleccionado"
                      : estado === "completa"
                        ? "Procesamiento completado"
                        : estado === "activa"
                          ? "Procesando documentos..."
                          : "Pendiente"}
                  </p>

                </div>

                {tiene &&
                  estado === "activa" && (
                    <Loader2
                      size={19}
                      className="
                        text-blue-600
                        animate-spin
                      "
                    />
                  )}

              </div>
            );
          })}

          {/* CONSOLIDACIÓN */}

          <div
            className={`
              flex
              items-center
              gap-4
              rounded-2xl
              border
              p-4
              transition-all
              ${
                estadoEtapa(3) === "completa"
                  ? "border-green-200 bg-green-50"
                  : estadoEtapa(3) === "activa"
                    ? "border-blue-300 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-slate-50"
              }
            `}
          >

            <div
              className={`
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                shrink-0
                ${
                  estadoEtapa(3) === "completa"
                    ? "bg-green-600 text-white"
                    : estadoEtapa(3) === "activa"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500"
                }
              `}
            >
              {estadoEtapa(3) === "completa" ? (
                <Check size={19} />
              ) : (
                <FileSearch size={19} />
              )}
            </div>

            <div className="flex-1">

              <p
                className="
                  font-bold
                  text-slate-800
                "
              >
                Consolidación
              </p>

              <p
                className="
                  text-xs
                  text-slate-500
                  mt-0.5
                "
              >
                {estadoEtapa(3) === "completa"
                  ? "Resultados preparados"
                  : estadoEtapa(3) === "activa"
                    ? "Calculando resultados finales..."
                    : "Pendiente"}
              </p>

            </div>

            {estadoEtapa(3) === "activa" && (
              <Loader2
                size={19}
                className="
                  text-blue-600
                  animate-spin
                "
              />
            )}

          </div>

        </div>

        {/* AVISO */}

        <div
          className="
            mt-6
            rounded-2xl
            bg-slate-50
            border
            border-slate-200
            p-4
          "
        >

          <div className="flex items-start gap-3">

            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-amber-100
                text-amber-700
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Clock3 size={16} />
            </div>

            <div>

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-700
                "
              >
                El análisis puede tardar varios minutos
              </p>

              <p
                className="
                  text-xs
                  text-slate-500
                  mt-1
                  leading-relaxed
                "
              >
                Cada documento puede requerir análisis
                individual. Mantén esta página abierta
                hasta recibir los resultados.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}