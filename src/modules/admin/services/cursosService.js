import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../../auth/firebase";

const cursosRef =
  collection(db, "cursos");

// ============================================================
// LISTAR
// ============================================================

export async function obtenerCursosAdmin() {
  try {
    const snapshot =
      await getDocs(cursosRef);

    const cursos =
      snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

    return {
      cursos,
    };
  } catch (error) {
    console.error(
      "ERROR OBTENIENDO CURSOS:",
      error
    );

    throw new Error(
      "No se pudieron cargar los cursos."
    );
  }
}

// ============================================================
// CREAR
// ============================================================

export async function crearCursoAdmin(datos) {
  try {
    const referencia =
      await addDoc(
        cursosRef,
        datos
      );

    return {
      id: referencia.id,
      ...datos,
    };
  } catch (error) {
    console.error(
      "ERROR CREANDO CURSO:",
      error
    );

    throw new Error(
      "No se pudo crear el curso."
    );
  }
}

// ============================================================
// ACTUALIZAR
// ============================================================

export async function actualizarCursoAdmin(
  id,
  datos
) {
  try {
    const referencia =
      doc(db, "cursos", id);

    await updateDoc(
      referencia,
      datos
    );

    return {
      ok: true,
    };
  } catch (error) {
    console.error(
      "ERROR ACTUALIZANDO CURSO:",
      error
    );

    throw new Error(
      "No se pudo actualizar el curso."
    );
  }
}

// ============================================================
// ELIMINAR
// ============================================================

export async function eliminarCursoAdmin(id) {
  try {
    const referencia =
      doc(db, "cursos", id);

    await deleteDoc(referencia);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(
      "ERROR ELIMINANDO CURSO:",
      error
    );

    throw new Error(
      "No se pudo eliminar el curso."
    );
  }
}
