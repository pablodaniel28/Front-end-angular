import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/carreras.service'; // Cambio de MateriasService a CarrerasService
import { Carreras } from 'src/app/models/carreras'; // Cambio de Materias a Carreras
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-carreras', // Cambio de 'app-add-materias' a 'app-add-carreras'
  templateUrl: './add-carreras.component.html',
  styleUrls: ['./add-carreras.component.scss']
})
export class AddCarrerasComponent implements OnInit {
  id: number = 0;
  nombre: string = '';
  nro: string = ''; // Cambio de sigla a nro
  carreras: Carreras[] = []; // Cambio de Materias a Carreras

  constructor(private carrerasService: CarrerasService, private location: Location) { } // Cambio de MateriasService a CarrerasService

  ngOnInit(): void {
    this.loadCarreras(); // Cambio de loadMaterias a loadCarreras
  }

  async loadCarreras() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.carreras = await this.carrerasService.getAllCarreras(token); // Cambio de getAllMaterias a getAllCarreras
    } catch (error) {
      console.error('Error loading carreras:', error); // Maneja los errores
    }
  }

  async guardarCarrera() { // Cambio de guardarMateria a guardarCarrera
    try {
      const carrera: Carreras = { id: this.id, nombre: this.nombre, nro: this.nro }; // Cambio de sigla a nro
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      await this.carrerasService.guardarCarrera(carrera, token); // Cambio de guardarMateria a guardarCarrera
      // Vuelve a cargar las carreras después de guardar
      this.loadCarreras(); // Cambio de loadMaterias a loadCarreras
      // Regresa a la vista anterior
      this.location.back();
    } catch (error) {
      console.error('Error saving carrera:', error); // Maneja los errores
    }
  }
}
