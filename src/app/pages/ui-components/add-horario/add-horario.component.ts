import { Component, OnInit } from '@angular/core';
import { HorariosService } from 'src/app/horarios.service';
import { Horario } from 'src/app/models/horario';
import { Location } from '@angular/common';
import { Aulas2 } from 'src/app/models/aulas2'; // Asegúrate de tener este modelo definido
import { AulasService } from 'src/app/aulas.service';
import { Modulos } from 'src/app/models/modulos';
import { GruposService } from 'src/app/grupos.service';
import { Grupos } from 'src/app/models/grupos';

@Component({
  selector: 'app-add-horario',
  templateUrl: './add-horario.component.html',
})
export class AddHorarioComponent implements OnInit {
  dia: string = '';
  horainicio: string = '';
  horafin: string = '';
  selectedAula: number | null = null;
  selectedGrupo: number | null = null;
  aulas: Aulas2[] = [];
  modulos: Modulos[] = [];
  horarios: Horario[] = [];
  grupos: Grupos[] = [];

  constructor(
    private horariosService: HorariosService,
    private grupoService: GruposService,
    private aulasService: AulasService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadAulas();
    this.loadGrupos();
  }

  async loadAulas() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.aulas = await this.aulasService.getAllAulas(token); // Obtén las aulas desde el servicio
    } catch (error) {
      console.error('Error loading aulas:', error); // Maneja los errores
    }
  }

  async loadGrupos() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.grupos = await this.grupoService.getAllGrupos(token); // Obtén las aulas desde el servicio
    } catch (error) {
      console.error('Error loading aulas:', error); // Maneja los errores
    }
  }


  async guardarHorario(): Promise<void> {
    try {
      if (this.selectedAula !== null && this.selectedGrupo !== null) {
        const horarioData = {
          dia: this.dia,
          horainicio: this.horainicio + ':00', // Agregar ':00' para segundos si es necesario
          horafin: this.horafin + ':00', // Agregar ':00' para segundos si es necesario
          aula: {
            id: this.selectedAula
          },
          grupo: { // Cambiar 'grupos' a 'grupo'
            id: this.selectedGrupo // Asegúrate de usar 'this.selectedGrupo'
          }
        };

        const token = localStorage.getItem('token') || '';
        const response = await this.horariosService.createHorario(horarioData, token);
        console.log('Horario creado:', response);
        this.location.back();
      } else {
        console.error('Debe seleccionar un aula y un grupo');
      }
    } catch (error) {
      console.error('Error guardando horario:', error);
    }
  }


}
