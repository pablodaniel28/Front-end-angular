import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad } from './models/facultad';
import { environment } from './env';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllFacultades(token: string): Observable<Facultad[]> {
    const url = `${this.BASE_URL}/facultades`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Facultad[]>(url, { headers });
  }

  getFacultadById(id: number, token: string): Observable<Facultad> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Facultad>(`${this.BASE_URL}/facultades/${id}`, { headers });
  }

  guardarFacultad(facultad: Facultad, token: string): Observable<Facultad> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Facultad>(`${this.BASE_URL}/facultades`, facultad, { headers });
  }

  actualizarFacultad(id: number, facultad: Facultad, token: string): Observable<Facultad> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Facultad>(`${this.BASE_URL}/facultades/${id}`, facultad, { headers });
  }

  eliminarFacultad(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.BASE_URL}/facultades/${id}`, { headers });
  }
}
