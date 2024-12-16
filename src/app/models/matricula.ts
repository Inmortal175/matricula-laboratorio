export interface Matricula {
    id?:string;
    correo: string | undefined | null;
    docente: string;
    alumno: string | undefined |null;
    codigo: string;
    foto?: string | null |undefined
}