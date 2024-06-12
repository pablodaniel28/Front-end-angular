import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AulasService } from 'src/app/aulas.service'; // Cambio de ModulosService a AulasService
import { Aulas } from 'src/app/models/aulas'; // Cambio de Modulos a Aulas
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-up-aulas', // Cambio de 'app-up-modulos' a 'app-up-aulas'
  standalone: true,
  imports: [FormsModule],
  templateUrl: './up-aulas.component.html',
  styleUrls: ['./up-aulas.component.scss']
})
export class UpAulasComponent implements OnInit {
  id: number = 0;
  nombre: string = '';
  nro: string = '';

  constructor(
    private route: ActivatedRoute,
    private aulasService: AulasService, // Cambio de modulosService a aulasService
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'] || 0;
      this.loadAula(this.id); // Cambio de loadModulo a loadAula
    });
  }

  async loadAula(id: number) { // Cambio de loadModulo a loadAula
    try {
      const token = localStorage.getItem('token') || '';
      const aula = await this.aulasService.getAulaById(id, token); // Cambio de getModuloById a getAulaById
      if (aula) {
        this.nombre = aula.nombre;
        this.nro = aula.nro;
      } else {
        console.error('No se encontró el aula con el ID especificado.');
      }
    } catch (error) {
      console.error('Error loading aula:', error); // Cambio de Error loading modulo a Error loading aula
    }
  }

  async editarAula() { // Cambio de editarModulo a editarAula
    try {
      const token = localStorage.getItem('token') || '';
      const aula: Aulas = { id: this.id, nombre: this.nombre, nro: this.nro }; // Cambio de Modulos a Aulas
      await this.aulasService.editarAula(aula, token); // Cambio de editarModulo a editarAula y editarModulo a editarAula
      this.location.back();
    } catch (error) {
      console.error('Error editing aula:', error); // Cambio de Error editing modulo a Error editing aula
    }
  }
}