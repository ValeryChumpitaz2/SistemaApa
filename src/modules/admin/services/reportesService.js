import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../auth/firebase";

// ============================================================
// ESTADÍSTICAS GENERALES
// ============================================================

export async function obtenerEstadisticasAdmin() {
  try {
    const [
      estudiantesSnapshot,
      docentesSnapshot,
      cursosSnapshot,
      carrerasSnapshot,
    ] = await Promise.all([
      getDocs(
        collection(db, "estudiantes")
      ),

      getDocs(
        collection(db, "docentes")
      ),

      getDocs(
        collection(db, "cursos")
      ),

      getDocs(
        collection(db, "carreras")
      ),
    ]);

    return {
      estudiantes:
        estudiantesSnapshot.size,

      docentes:
        docentesSnapshot.size,

      cursos:
        cursosSnapshot.size,

      carreras:
        carrerasSnapshot.size,
    };
  } catch (error) {
    console.error(
      "ERROR OBTENIENDO ESTADÍSTICAS:",
      error
    );

    throw new Error(
      "No se pudieron obtener las estadísticas."
    );
  }
}
    