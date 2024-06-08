import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/carreras.service'; // Cambio de MateriasService a CarrerasService
import { Carreras } from 'src/app/models/carreras'; // Cambio de Materias a Carreras

@Component({
  selector: 'app-list',
  templateUrl: './lists.component.html'
})

export class AppListsComponent implements OnInit {
  Carrera: any; // Cambio de Materia a Carrera

  constructor(private carrerasService: CarrerasService) { } // Inyecta el servicio

  ngOnInit(): void {
    this.loadCarreras(); // Llama al método para cargar las carreras al inicializar el componente
  }

  hidden = false;
  carreras: Carreras[] = []; // Variable para almacenar las carreras

  async loadCarreras() { // Cambio de loadMaterias a loadCarreras
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.carreras = await this.carrerasService.getAllCarreras(token); // Obtén las carreras desde el servicio
    } catch (error) {
      console.error('Error loading carreras:', error); // Maneja los errores
    }
  }

  async guardarCarrera(carrera: Carreras) { // Cambio de guardarMateria a guardarCarrera
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      await this.carrerasService.guardarCarrera(carrera, token); // Guarda la carrera utilizando el servicio
      // Vuelve a cargar las carreras después de guardar
      this.loadCarreras();
    } catch (error) {
      console.error('Error saving carrera:', error); // Maneja los errores
    }
  }

  async editarCarrera(carrera: Carreras) { // Cambio de editarMateria a editarCarrera
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      await this.carrerasService.editarCarrera(carrera, token); // Edita la carrera utilizando el servicio
      // Vuelve a cargar las carreras después de editar
      this.loadCarreras();
    } catch (error) {
      console.error('Error editing carrera:', error); // Maneja los errores
    }
  }

  async eliminarCarrera(id: number) { // Cambio de eliminarMateria a eliminarCarrera
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      await this.carrerasService.eliminarCarrera(id, token); // Elimina la carrera utilizando el servicio
      // Vuelve a cargar las carreras después de eliminar
      this.loadCarreras();
    } catch (error) {
      console.error('Error deleting carrera:', error); // Maneja los errores
    }
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}
