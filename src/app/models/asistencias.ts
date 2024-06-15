export interface Asistencia {
  id: number;
  descripcion: string;
  hora: string; // O `Time` si tienes un tipo de dato específico para el tiempo
  fecha: string; // O `Date` si tienes un tipo de dato específico para la fecha
  tiempo: string; // O `Time` si tienes un tipo de dato específico para el tiempo
  estado: string;
  grupo: {
    id: number
  } // Considera cambiar esto si tienes una interfaz `Grupo`
}
