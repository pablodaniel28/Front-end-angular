import { Component } from '@angular/core';
import { AsistenciasService } from 'src/app/asistencias.service';
import { Asistencia } from 'src/app/models/asistencias';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent {
  asistencia: Asistencia[] = [];

  constructor(private asistenciaService: AsistenciasService) { }

  ngOnInit(): void {
    this.loadAsistencia();
  }

  async loadAsistencia() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.asistencia = await this.asistenciaService.getAllAsistencia(token);
      console.log('Carreras cargadas:', this.asistencia); // Muestra las carreras cargadas en la consola
    } catch (error) {
      console.error('Error cargando carreras:', error); // Maneja los errores al cargar las carreras
    }
  }
}
