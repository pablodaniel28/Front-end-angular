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

    const response = await this.http.get<Gestiones[]>(url, { headers }).toPromise();
    return response || [];
  }

  async createGestion(gestionData: { nro: string; nombre: string; facultad: { id: number}; }, token: string): Promise<Gestiones> {
    const url = `${this.BASE_URL}/gestiones`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.post<any>(url, gestionData, { headers }).toPromise();
      return response as Gestiones;
    } catch (error) {
      console.error('Error creating gestion:', error);
      throw error;
    }
  }

  async updateGestion(id: number, gestionData: { nro: string; nombre: string; facultad: { id: number}; }, token: string): Promise<Gestiones> {
    const url = `${this.BASE_URL}/gestiones/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.put<any>(url, gestionData, { headers }).toPromise();
      return response as Gestiones;
    } catch (error) {
      console.error('Error updating gestion:', error);
      throw error;
    }
  }

}
