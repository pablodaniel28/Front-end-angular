import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from './models/horario';
import { Aulas2 } from './models/aulas2';
import { Time } from '@angular/common';
import { environment } from './env';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getAllHorarios(token: string): Promise<Horario[]> {
    const url = `${this.BASE_URL}/horarios`; // Asegúrate de apuntar a la URL correcta
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.get<Horario[]>(url, { headers }).toPromise();
      console.log('Horarios cargados:', response); // Verifica los horarios cargados en la consola
      return response || [];
    } catch (error) {
      console.error('Error cargando Horarios:', error); // Maneja los errores al cargar los horarios
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  async createHorario(horarioData: { dia: string; horainicio: string; horafin: string; aula: { id: number }; grupo: { id: number } }, token: string): Promise<Horario> {
    const url = `${this.BASE_URL}/horarios`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    try {
      const response = await this.http.post<Horario>(url, horarioData, { headers }).toPromise();
      return response as Horario;
    } catch (error) {
      console.error('Error creating horario:', error);
      throw error;
    }
  }


  async getHorarioById(id: number, token: string): Promise<Horario> {
    const url = `${this.BASE_URL}/horarios/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const response = await this.http.get<Horario>(url, { headers }).toPromise();
      return response as Horario;
    } catch (error) {
      console.error('Error fetching horario:', error);
      throw error;
    }
  }

  async updateHorario(id: number, horarioData: { dia: string; horainicio: string; horafin: string; aula: { id: number }; grupo: { id: number } }, token: string): Promise<Horario> {
    const url = `${this.BASE_URL}/horarios/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    try {
      const response = await this.http.put<Horario>(url, horarioData, { headers }).toPromise();
      return response as Horario;
    } catch (error) {
      console.error('Error updating horario:', error);
      throw error;
    }
  }

  async deleteHorario(id: number, token: string): Promise<void> {
    const url = `${this.BASE_URL}/horarios/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      await this.http.delete<void>(url, { headers }).toPromise();
      console.log('Horario eliminado correctamente');
    } catch (error) {
      console.error('Error deleting horario:', error);
      throw error;
    }
  }

}
