// licencia.ts
export interface Licencia {
  id: number;
  descripcion: string;
  hora: string; // Using string to represent Time
  fecha: string; // Using string to represent Date
  grupo: {
    id: number;
    nombre: string;
  }
  ourUsers: {
    id: number;
    name: string;
  }
}
