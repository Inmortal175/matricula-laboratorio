import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../../models/curso';
import { 
    Firestore,
    addDoc,
    collection,
    collectionData,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from '@angular/fire/firestore';

@Injectable({
providedIn: 'root'
})
export class MatriculaService {

constructor(private firestore: Firestore) { }

    // Método para obtener todos los cursos
    async getCursos() {
        const cursosCollection = collection(this.firestore, 'cursos'); // Referencia a la colección
        const consulta = query(cursosCollection);

        const querySnapshot = await getDocs(consulta);
        const cursos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return cursos;
    }

    async getCursoPorId(cursoId: string) {
        const cursoRef = doc(this.firestore, 'cursos', cursoId); // Referencia al documento específico
        const docSnap = await getDoc(cursoRef); // Obtiene el documento
    
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() }; // Devuelve los datos del curso
        } else {
          console.log("No existe el documento con ese ID");
          return null; // Retorna null si no existe el documento
        }
    }

    async updateVacante(cursoId: string, nuevaVacante: number) {
        const cursoRef = doc(this.firestore, 'cursos', cursoId); // Referencia al documento específico
        try {
          await updateDoc(cursoRef, { vacante: nuevaVacante }); // Actualiza el campo "vacante"
        //   console.log(`Vacante actualizada a ${nuevaVacante} para el curso con ID: ${cursoId}`);
        } catch (error) {
        //   console.error("Error actualizando vacante:", error);
          throw error; // Lanza el error para manejarlo en el componente
        }
    }

    async getListaMatricula(){
        const matriculaCollect = collection(this.firestore, 'matricula');
        const consulta = query(matriculaCollect)

        const querySnapshot = await getDocs(consulta);
        const matriculas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return matriculas;
    }

    async addMatricula(matriculaData: any) {
        const matriculaCollect = collection(this.firestore, 'matricula');
        try {
          const docRef = await addDoc(matriculaCollect, matriculaData);
        //   console.log("Documento escrito con ID: ", docRef.id);
          return docRef.id; // Devuelve el ID del documento creado
        } catch (error) {
        //   console.error("Error añadiendo documento: ", error);
          throw error; // Lanza el error para manejarlo en el componente
        }
    }
}
