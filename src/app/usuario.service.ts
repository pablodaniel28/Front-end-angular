import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  getUsuarioById(userId: string) {
    throw new Error('Method not implemented.');
  }
  updateUser(id: any, usuarioSeleccionado: any, token: string) {
    throw new Error('Method not implemented.');
  }

  private BASE_URL = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }

  async getAllUsers(token: string): Promise<any> {
    const url = `${this.BASE_URL}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en getAllUsers:', error);
      throw error;
    }
  }

  async deleteUser(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error en deleteUser:', error);
      throw error;
    }
  }
}
