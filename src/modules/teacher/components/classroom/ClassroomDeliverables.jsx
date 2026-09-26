import React from "react";

import {
  reconocerEntregable,
  obtenerTitulo,
  obtenerCourseWorkId,
} from "./classroomUtils";

/* ============================================================
   ESTILOS DEL COMPONENTE
   Todo el CSS queda dentro de este mismo archivo JSX.
============================================================ */

const CLASSROOM_DELIVERABLES_STYLES = `
  .deliverables-panel {
    position: relative;
    overflow: hidden;
    margin-top: 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    padding: 1.5rem;
    box-shadow:
      0 10px 30px rgba(15, 23, 42, 0.06),
      0 2px 8px rgba(15, 23, 42, 0.04);
  }

  .deliverables-panel::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1d3681, #2563eb, #60a5fa);
  }

  .deliverables-header {
    position: relative;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .deliverables-step {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    border-radius: 999px;
    background: #eff6ff;
    padding: 0.35rem 0.7rem;
    color: #2563eb;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .deliverables-title {
    margin-top: 0.65rem;
    color: #0f172a;
    font-size: 1.35rem;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  .deliverables-count {
    margin-top: 0.4rem;
    color: #64748b;
    font-size: 0.875rem;
  }

  .deliverables-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .deliverable-card {
    position: relative;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    background: rgba(248, 250, 252, 0.88);
    padding: 1.1rem;
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .deliverable-card::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background: transparent;
    transition: background 180ms ease;
  }

  .deliverable-card:hover {
    transform: translateY(-2px);
    border-color: #bfdbfe;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      rgba(239, 246, 255, 0.7) 100%
    );
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.08);
  }

  .deliverable-card:hover::before {
    background: #2563eb;
  }

  .deliverable-content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    gap: 1rem;
  }

  .deliverable-info {
    min-width: 0;
    flex: 1;
  }

  .deliverable-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  .deliverable-type {
    color: #2563eb;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .classroom-badge {
    display: inline-flex;
    align-items: center;
    border: 1px solid #e2e8f0;
    border-radius: 999px;
    background: #f1f5f9;
    padding: 0.2rem 0.55rem;
    color: #64748b;
    font-size: 0.58rem;
    font-weight: 800;
  }

  .deliverable-name {
    margin-top: 0.4rem;
    overflow-wrap: anywhere;
    color: #1e293b;
    font-size: 0.9rem;
    line-height: 1.45;
    font-weight: 900;
  }

  .deliverable-id {
    margin-top: 0.45rem;
    overflow-wrap: anywhere;
    color: #94a3b8;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.62rem;
  }

  .deliverable-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .deliverable-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2rem;
    border-radius: 0.7rem;
    padding: 0.4rem 0.75rem;
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 800;
    white-space: nowrap;
  }

  .deliverable-status.is-deliverable {
    border: 1px solid #a7f3d0;
    background: #ecfdf5;
    color: #047857;
  }

  .deliverable-status.is-activity {
    border: 1px solid #e2e8f0;
    background: #f1f5f9;
    color: #64748b;
  }

  .deliverable-button {
    display: inline-flex;
    min-height: 2.25rem;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #1d3681, #2563eb);
    padding: 0.55rem 1rem;
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 5px 12px rgba(29, 54, 129, 0.18);
    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      filter 160ms ease;
  }

  .deliverable-button:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgba(29, 54, 129, 0.24);
  }

  .deliverable-button:active {
    transform: scale(0.98);
  }

  .deliverable-button:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.25);
    outline-offset: 2px;
  }

  .deliverables-state {
    margin-top: 1.5rem;
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  }

  .deliverables-state.error {
    border: 1px solid #fecaca;
    background: linear-gradient(135deg, #fff7f7, #fef2f2);
  }

  .deliverables-state.empty {
    border: 1px solid #fde68a;
    background: linear-gradient(135deg, #fffdf5, #fffbeb);
  }

  .deliverables-state-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 900;
  }

  .deliverables-state.error .deliverables-state-title {
    color: #b91c1c;
  }

  .deliverables-state.empty .deliverables-state-title {
    color: #b45309;
  }

  .deliverables-state-text {
    margin-top: 0.5rem;
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .deliverables-state.error .deliverables-state-text {
    color: #dc2626;
  }

  .deliverables-state.empty .deliverables-state-text {
    color: #d97706;
  }

  @media (min-width: 640px) {
    .deliverable-content {
      flex-direction: row;
      align-items: center;
    }

    .deliverables-panel {
      padding: 1.5rem;
    }
  }

  @media (max-width: 639px) {
    .deliverables-panel {
      border-radius: 1rem;
      padding: 1rem;
    }

    .deliverables-title {
      font-size: 1.15rem;
    }

    .deliverable-card {
      padding: 0.9rem;
    }

    .deliverable-actions {
      width: 100%;
    }

    .deliverable-status,
    .deliverable-button {
      flex: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .deliverable-card,
    .deliverable-button,
    .deliverable-card::before {
      transition: none;
    }
  }
`;

export default function ClassroomDeliverables({
  actividades = [],
  onSelectDeliverable,
}) {
  console.log(
    "========== CLASSROOM DELIVERABLES =========="
  );

  console.log(
    "Actividades recibidas:",
    actividades
  );

  console.log(
    "Cantidad:",
    Array.isArray(actividades)
      ? actividades.length
      : "NO ES ARRAY"
  );

  // ============================================================
  // VALIDAR ARRAY
  // ============================================================

  if (!Array.isArray(actividades)) {
    return (
      <>
        <style>{CLASSROOM_DELIVERABLES_STYLES}</style>

        <div className="deliverables-state error">
          <h2 className="deliverables-state-title">
            Error
          </h2>

          <p className="deliverables-state-text">
            ClassroomDeliverables recibió un
            valor que no es un array.
          </p>
        </div>
      </>
    );
  }

  // ============================================================
  // SIN ACTIVIDADES
  // ============================================================

  if (actividades.length === 0) {
    return (
      <>
        <style>{CLASSROOM_DELIVERABLES_STYLES}</style>

        <div className="deliverables-state empty">
          <h2 className="deliverables-state-title">
            No hay actividades
          </h2>

          <p className="deliverables-state-text">
            El tema fue seleccionado correctamente,
            pero no llegaron actividades desde
            Classroom.
          </p>
        </div>
      </>
    );
  }

  // ============================================================
  // NORMALIZAR ACTIVIDADES
  // ============================================================

  const actividadesNormalizadas =
    actividades.map(
      (
        actividad,
        index
      ) => {
        const titulo =
          obtenerTitulo(
            actividad
          ) ||
          "Actividad sin título";

        const courseWorkId =
          obtenerCourseWorkId(
            actividad
          );

        let tipo = null;

        try {
          tipo =
            reconocerEntregable(
              actividad
            );
        } catch (error) {
          console.error(
            "Error reconociendo entregable:",
            error,
            actividad
          );
        }

        return {
          actividad,
          titulo,
          courseWorkId,
          tipo,
          index,
        };
      }
    );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <style>{CLASSROOM_DELIVERABLES_STYLES}</style>

      <div className="deliverables-panel">
        {/* ======================================================
            CABECERA
        ======================================================= */}

        <div className="deliverables-header">
          <p className="deliverables-step">
            Paso 3
          </p>

          <h2 className="deliverables-title">
            Entregables
          </h2>

          <p className="deliverables-count">
            {actividades.length} actividad(es)
            encontrada(s).
          </p>
        </div>

        {/* ======================================================
            LISTA
        ======================================================= */}

        <div className="deliverables-list">
          {actividadesNormalizadas.map(
            ({
              actividad,
              titulo,
              courseWorkId,
              tipo,
              index,
            }) => {
              const esEntregable =
                Boolean(tipo);

              return (
                <div
                  key={
                    courseWorkId ||
                    `actividad-${index}`
                  }
                  className="deliverable-card"
                >
                  <div className="deliverable-content">
                    {/* ==================================================
                        INFORMACIÓN
                    =================================================== */}

                    <div className="deliverable-info">
                      <div className="deliverable-meta">
                        <p className="deliverable-type">
                          {tipo || "ACTIVIDAD"}
                        </p>

                        {courseWorkId && (
                          <span className="classroom-badge">
                            Classroom
                          </span>
                        )}
                      </div>

                      <h3 className="deliverable-name">
                        {titulo}
                      </h3>

                      {courseWorkId && (
                        <p className="deliverable-id">
                          ID: {courseWorkId}
                        </p>
                      )}
                    </div>

                    {/* ==================================================
                        ACCIONES
                    =================================================== */}

                    <div className="deliverable-actions">
                      <span
                        className={`deliverable-status ${
                          esEntregable
                            ? "is-deliverable"
                            : "is-activity"
                        }`}
                      >
                        {esEntregable
                          ? tipo
                          : "Actividad"}
                      </span>

                      {esEntregable &&
                        courseWorkId && (
                          <button
                            type="button"
                            onClick={() => {
                              console.log(
                                "========== SELECCIONANDO ENTREGABLE =========="
                              );

                              console.log(
                                "Tipo:",
                                tipo
                              );

                              console.log(
                                "CourseWork ID:",
                                courseWorkId
                              );

                              console.log(
                                "Actividad:",
                                actividad
                              );

                              if (
                                typeof onSelectDeliverable ===
                                "function"
                              ) {
                                onSelectDeliverable({
                                  actividad,
                                  tipo,
                                  courseWorkId,
                                });
                              }
                            }}
                            className="deliverable-button"
                          >
                            Ver entregas
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
 