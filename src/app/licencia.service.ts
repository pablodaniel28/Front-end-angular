import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  // Adjust the import path as necessary
import { Licencia } from './models/licencia';
import { environment } from './env';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getAllLicencia(token: string): Promise<Licencia[]> {
    const url = `${this.BASE_URL}/licencias`; // Asegúrate de apuntar a la URL correcta
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.get<Licencia[]>(url, { headers }).toPromise();
      console.log('Licencias cargadas:', response); // Verifica los horarios cargados en la consola
      return response || [];
    } catch (error) {
      console.error('Error cargando Horarios:', error); // Maneja los errores al cargar los horarios
      throw error; // Lanza el error para manejarlo en el componente
    }
  }
}
