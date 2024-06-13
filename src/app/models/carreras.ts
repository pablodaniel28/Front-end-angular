// models/carreras.ts
import { Facultad } from './facultad'; // Asegúrate de importar la interfaz Facultad o la clase Facultad adecuada

export interface Carreras {
  id: number;
  nombre: string;
  nro: string;
  facultad: Facultad; // Asegúrate de que la propiedad facultad tenga la estructura correcta
}
