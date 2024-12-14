export interface Curso {
    id?: string; // ID opcional
    codigo: string;
    nombre: string;
    horario: string;
    vacante: number;
    docente: string
}

export type Cursos = Curso[]