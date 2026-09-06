import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../auth/firebase";

const carrerasRef =
  collection(db, "carreras");

// ============================================================
// LISTAR CARRERAS
// ============================================================

export async function obtenerCarrerasAdmin() {
  try {
    const snapshot =
      await getDocs(carrerasRef);

    const carreras =
      snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

    return {
      carreras,
    };
  } catch (error) {
    console.error(
      "ERROR OBTENIENDO CARRERAS:",
      error
    );

    throw new Error(
      "No se pudieron cargar las carreras."
    );
  }
}

// ============================================================
// CREAR
// ============================================================

export async function crearCarreraAdmin(datos) {
  try {
    const referencia =
      await addDoc(
        carrerasRef,
        datos
      );

    return {
      id: referencia.id,
      ...datos,
    };
  } catch (error) {
    console.error(
      "ERROR CREANDO CARRERA:",
      error
    );

    throw new Error(
      "No se pudo crear la carrera."
    );
  }
}

// ============================================================
// ACTUALIZAR
// ============================================================

export async function actualizarCarreraAdmin(
  id,
  datos
) {
  try {
    const referencia =
      doc(db, "carreras", id);

    await updateDoc(
      referencia,
      datos
    );

    return {
      ok: true,
    };
  } catch (error) {
    console.error(
      "ERROR ACTUALIZANDO CARRERA:",
      error
    );

    throw new Error(
      "No se pudo actualizar la carrera."
    );
  }
}

// ============================================================
// ELIMINAR
// ============================================================

export async function eliminarCarreraAdmin(id) {
  try {
    const referencia =
      doc(db, "carreras", id);

    await deleteDoc(referencia);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(
      "ERROR ELIMINANDO CARRERA:",
      error
    );

    throw new Error(
      "No se pudo eliminar la carrera."
    );
  }
}
