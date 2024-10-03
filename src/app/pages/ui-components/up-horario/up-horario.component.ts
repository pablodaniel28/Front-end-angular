import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorariosService } from 'src/app/horarios.service';
import { Horario } from 'src/app/models/horario';
import { Location } from '@angular/common';
import { Aulas2 } from 'src/app/models/aulas2';
import { AulasService } from 'src/app/aulas.service';
import { GruposService } from 'src/app/grupos.service';
import { Grupos } from 'src/app/models/grupos';

@Component({
  selector: 'app-up-horario',
  templateUrl: './up-horario.component.html',
})
export class UpHorarioComponent implements OnInit {
  horario: Horario = {
    id: 0,
    dia: '',
    horainicio: '',
    horafin: '',
    aula: { id: 0, nombre: '' },
    grupo: { id: 0, nombre: '' },
  };
  aulas: Aulas2[] = [];
  grupos: Grupos[] = [];

  constructor(
    private route: ActivatedRoute,
    private horariosService: HorariosService,
    private grupoService: GruposService,
    private aulasService: AulasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadAulas();
    this.loadGrupos();
    this.loadHorario(id);
  }

  async loadHorario(id: number): Promise<void> {
    const token = localStorage.getItem('token') || '';
    try {
      const horario = await this.horariosService.getHorarioById(id, token);
      this.horario = horario;
    } catch (error) {
      console.error('Error loading horario:', error);
    }
  }

  async loadAulas(): Promise<void> {
    const token = localStorage.getItem('token') || '';
    try {
      this.aulas = await this.aulasService.getAllAulas(token);
    } catch (error) {
      console.error('Error loading aulas:', error);
    }
  }

  async loadGrupos(): Promise<void> {
    const token = localStorage.getItem('token') || '';
    try {
      this.grupos = await this.grupoService.getAllGrupos(token);
    } catch (error) {
      console.error('Error loading grupos:', error);
    }
  }

  async updateHorario(): Promise<void> {
    const token = localStorage.getItem('token') || '';
    const updatedHorario = {
      dia: this.horario.dia,
      horainicio: this.horario.horainicio,
      horafin: this.horario.horafin,
      aula: { id: this.horario.aula.id },
      grupo: { id: this.horario.grupo.id }
    };
    try {
      await this.horariosService.updateHorario(this.horario.id, updatedHorario, token);
      console.log('Horario updated');
      this.location.back();
    } catch (error) {
      console.error('Error updating horario:', error);
    }
  }

  cancel(): void {
    this.location.back();
  }
}
