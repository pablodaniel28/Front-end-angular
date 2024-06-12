import { Component, OnInit } from '@angular/core';
import { AulasService } from 'src/app/aulas.service'; // Cambio de ModulosService a AulasService
import { Aulas } from 'src/app/models/aulas'; // Cambio de Modulos a Aulas
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-aulas', // Cambio de 'app-add-modulos' a 'app-add-aulas'
  templateUrl: './add-aulas.component.html',
  styleUrls: ['./add-aulas.component.scss']
})
export class AddAulasComponent implements OnInit {
  id: number = 0;
  nombre: string = '';
  nro: string = '';
  aulas: Aulas[] = []; // Variable para almacenar las aulas

  constructor(private aulasService: AulasService, private location: Location) { }

  ngOnInit(): void {
    this.loadAulas(); // Llama al método para cargar las aulas al inicializar el componente
  }

  async loadAulas() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.aulas = await this.aulasService.getAllAulas(token); // Obtén las aulas desde el servicio
    } catch (error) {
      console.error('Error loading aulas:', error); // Maneja los errores
    }
  }

  async guardarAula() { // Cambio de guardarModulo a guardarAula
    try {
      const aula: Aulas = { id: this.id, nombre: this.nombre, nro: this.nro };
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      await this.aulasService.guardarAula(aula, token); // Guarda el aula utilizando el servicio
      // Vuelve a cargar las aulas después de guardar
      this.loadAulas();
      // Regresa a la vista anterior
      this.location.back();
    } catch (error) {
      console.error('Error saving aula:', error); // Maneja los errores
    }
  }
}
