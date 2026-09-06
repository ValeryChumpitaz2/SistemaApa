export async function getAdminStats() {

  return {
    docentes: 0,
    estudiantes: 0,
    cursos: 0,
    carreras: 0,
  };

}


export async function getSystemSummary() {

  return {
    docentesActivos: 0,
    docentesInactivos: 0,
    estudiantesActivos: 0,
    estudiantesInactivos: 0,
  };

}
