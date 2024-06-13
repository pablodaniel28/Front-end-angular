import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aulas } from './models/aulas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async getAllAulas(token: string): Promise<Aulas[]> {
    const url = `${this.BASE_URL}/aulas`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const response = await this.http.get<Aulas[]>(url, { headers }).toPromise();
    return response || [];
  }

  async guardarAula(aula: Aulas, token: string): Promise<any> {
    const url = `${this.BASE_URL}/aulas?moduloId=${aula.moduloId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.post(url, aula, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async editarAula(aula: Aulas, token: string): Promise<any> {
    const url = `${this.BASE_URL}/aulas/${aula.id}?moduloId=${aula.moduloId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.put(url, aula, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async eliminarAula(id: number, token: string): Promise<any> {
    const url = `${this.BASE_URL}/aulas/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.delete(url, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getAulaById(id: number, token: string): Promise<Aulas | null> {
    const url = `${this.BASE_URL}/aulas/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<Aulas>(url, { headers }).toPromise();
      return response || null;
    } catch (error) {
      throw error;
    }
  }
}
