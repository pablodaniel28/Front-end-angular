import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gestiones } from './models/gestiones';
import { environment } from './env';

@Injectable({
  providedIn: 'root'
})
export class GestionesService {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getAllGestiones(token: string): Promise<Gestiones[]> {
    const url = `${this.BASE_URL}/gestiones`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.get<Gestiones[]>(url, { headers }).toPromise();
      return response || [];
    } catch (error) {
      console.error('Error fetching gestiones:', error);
      throw error;
    }
  }

  async createGestion(gestionData: { nombre: string }, token: string): Promise<Gestiones> {
    const url = `${this.BASE_URL}/gestiones`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.post<Gestiones>(url, gestionData, { headers }).toPromise();
      return response as Gestiones;
    } catch (error) {
      console.error('Error creating gestion:', error); // Aquí se muestra el error en la consola
      throw error; // Lanza el error para que sea manejado en el componente que llama a este método
    }
  }


  async deleteGestion(id: number, token: string): Promise<void> {
    const url = `${this.BASE_URL}/gestiones/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      await this.http.delete(url, { headers }).toPromise();
      console.log(`Gestión con ID ${id} eliminada correctamente`);
    } catch (error) {
      console.error(`Error deleting gestion with ID ${id}:`, error);
      throw error;
    }
  }

}
