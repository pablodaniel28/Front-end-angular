import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aulas } from './models/aulas'; // Cambio de Modulos a Aulas
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulasService { // Cambio de ModulosService a AulasService

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async getAllAulas(token: string): Promise<Aulas[]> { // Cambio de getAllModulos a getAllAulas y Modulos a Aulas
    const url = `${this.BASE_URL}/aulas`; // Cambio de modulos aulas
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const response = await this.http.get<Aulas[]>(url, { headers }).toPromise(); // Cambio de Modulos a Aulas
    return response || []; // Ensure the response is not undefined
  }

  async guardarAula(aula: Aulas, token: string): Promise<any> { // Cambio de guardarModulo a guardarAula y Modulos a Aulas
    const url = `${this.BASE_URL}/aulas`; // Cambio de modulos aulas
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.post(url, aula, { headers }).toPromise(); // Cambio de Modulos a Aulas
    } catch (error) {
      throw error;
    }
  }

  async editarAula(aula: Aulas, token: string): Promise<any> { // Cambio de editarModulo a editarAula y Modulos a Aulas
    const url = `${this.BASE_URL}/aulas/${aula.id}`; // Cambio de modulos aulas
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.put(url, aula, { headers }).toPromise(); // Cambio de Modulos a Aulas
    } catch (error) {
      throw error;
    }
  }

  async eliminarAula(id: number, token: string): Promise<any> { // Cambio de eliminarModulo a eliminarAula
    const url = `${this.BASE_URL}/aulas/${id}`; // Cambio de modulos aulas
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.delete(url, { headers }).toPromise(); // Cambio de Modulos a Aulas
    } catch (error) {
      throw error;
    }
  }

  // Add this method
  async getAulaById(id: number, token: string): Promise<Aulas | null> { // Cambio de Modulos a Aulas
    const url = `${this.BASE_URL}/aulas/${id}`; // Cambio de modulos aulas
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<Aulas>(url, { headers }).toPromise(); // Cambio de Modulos a Aulas
      return response || null;
    } catch (error) {
      console.error('Error fetching aula by ID:', error);
      return null;
    }
  }

}
