import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/carreras.service';
import { Carreras } from 'src/app/models/carreras';
import { Location } from '@angular/common';
import { Facultad } from 'src/app/models/facultad';
import { FacultadesService } from 'src/app/facultades.service';

@Component({
  selector: 'app-add-carreras',
  templateUrl: './add-carreras.component.html',
  styleUrls: ['./add-carreras.component.scss']
})
export class AddCarrerasComponent implements OnInit {
  id: number = 0;
  nombre: string = '';
  nro: string = '';
  selectedFacultadId: number | undefined;
  facultades: Facultad[] = [];

  constructor(
    private carrerasService: CarrerasService,
    private facultadesService: FacultadesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadFacultades();
  }

  loadFacultades() {
    const token = localStorage.getItem('token') || '';
    this.facultadesService.getAllFacultades(token).subscribe(
      (facultades) => {
        this.facultades = facultades;
      },
      (error) => {
        console.error('Error loading facultades:', error);
      }
    );
  }

  async guardarCarrera() {
    try {
      if (!this.selectedFacultadId) {
        throw new Error('Debe seleccionar una facultad');
      }

      const carrera: Carreras = {
        id: this.id,
        nombre: this.nombre,
        nro: this.nro,
        facultad: { id: this.selectedFacultadId, nombre: 'Nombre de la Facultad' } // Asegúrate de proporcionar el nombre correcto aquí
      };

      const token = localStorage.getItem('token') || '';
      await this.carrerasService.guardarCarrera(carrera, token);
      this.location.back();
    } catch (error) {
      console.error('Error saving carrera:', error);
    }
  }
}
