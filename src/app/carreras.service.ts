import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carreras } from './models/carreras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async getAllCarreras(token: string): Promise<Carreras[]> {
    const url = `${this.BASE_URL}/carreras`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<Carreras[]>(url, { headers }).toPromise();
      return response || [];
    } catch (error) {
      throw error;
    }
  }

  async guardarCarrera(carrera: Carreras, token: string): Promise<any> {
    const url = `${this.BASE_URL}/carreras`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.post(url, carrera, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async editarCarrera(carrera: Carreras, token: string): Promise<any> {
    const url = `${this.BASE_URL}/carreras/${carrera.id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.put(url, carrera, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async eliminarCarrera(id: number, token: string): Promise<any> {
    const url = `${this.BASE_URL}/carreras/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.delete(url, { headers }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getCarreraById(id: number, token: string): Promise<Carreras | null> {
    const url = `${this.BASE_URL}/carreras/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<Carreras>(url, { headers }).toPromise();
      return response || null;
    } catch (error) {
      console.error('Error fetching carrera by ID:', error);
      return null;
    }
  }
}
