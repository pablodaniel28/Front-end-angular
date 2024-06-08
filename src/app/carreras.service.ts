import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carreras } from './models/carreras'; // Cambio de Materias a Carreras
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService { // Cambio de MateriasService a CarrerasService

  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  async getAllCarreras(token: string): Promise<Carreras[]> { // Cambio de getAllMaterias a getAllCarreras
    const url = `${this.BASE_URL}/carreras`; // Cambio de materias a carreras
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const response = await this.http.get<Carreras[]>(url, { headers }).toPromise(); // Cambio de Materias a Carreras
    return response || []; // Ensure the response is not undefined
  }

  async guardarCarrera(carrera: Carreras, token: string): Promise<any> { // Cambio de guardarMateria a guardarCarrera
    const url = `${this.BASE_URL}/carreras`; // Cambio de materias a carreras
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.post(url, carrera, { headers }).toPromise(); // Cambio de materia a carrera
    } catch (error) {
      throw error;
    }
  }

  async editarCarrera(carrera: Carreras, token: string): Promise<any> { // Cambio de editarMateria a editarCarrera
    const url = `${this.BASE_URL}/carreras/${carrera.id}`; // Cambio de materias a carreras
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.put(url, carrera, { headers }).toPromise(); // Cambio de materia a carrera
    } catch (error) {
      throw error;
    }
  }

  async eliminarCarrera(id: number, token: string): Promise<any> { // Cambio de eliminarMateria a eliminarCarrera
    const url = `${this.BASE_URL}/carreras/${id}`; // Cambio de materias a carreras
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      return await this.http.delete(url, { headers }).toPromise(); // Cambio de materias a carreras
    } catch (error) {
      throw error;
    }
  }

  async getCarreraById(id: number, token: string): Promise<Carreras | null> { // Cambio de getMateriaById a getCarreraById
    const url = `${this.BASE_URL}/carreras/${id}`; // Cambio de materias a carreras
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<Carreras>(url, { headers }).toPromise(); // Cambio de Materias a Carreras
      return response || null;
    } catch (error) {
      console.error('Error fetching carrera by ID:', error); // Cambio de materia a carrera
      return null;
    }
  }

}
