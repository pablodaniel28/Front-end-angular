import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/grupos.service';
import { CarrerasService } from 'src/app/carreras.service';
import { GestionesService } from 'src/app/gestiones.service';
import { MateriasService } from 'src/app/materias.service';
import { SistemasacademicosService } from 'src/app/sistemasacademicos.service';
import { Location } from '@angular/common';
import { Carreras } from 'src/app/models/carreras';
import { Gestiones } from 'src/app/models/gestiones';
import { Materias } from 'src/app/models/materias';
import { Sistemasacademicos } from 'src/app/models/sistemasacademicos';
import { UsersService } from 'src/app/users.service';
import { usuarios } from 'src/app/models/usuarios';
import { Horario } from 'src/app/models/horario';
import { HorariosService } from 'src/app/horarios.service';

@Component({
  selector: 'app-add-grupos',
  templateUrl: './add-grupos.component.html',
})
export class AddGruposComponent implements OnInit {
  nombre: string = '';
  cupo: string = '';
  selectedCarrera: number | null = null;
  selectedGestion: number | null = null;
  selectedMateria: number | null = null;
  selectedOurUser: number | null = null;
  selectedSistemaAcademico: number | null = null;

  carreras: Carreras[] = [];
  gestiones: Gestiones[] = [];
  materias: Materias[] = [];
  users: usuarios[] = []; // Lista para almacenar los usuarios
  sistemasAcademicos: Sistemasacademicos[] = [];

  token: string = '';

  constructor(
    private usersService: UsersService,
    private grupoService: GruposService,
    private carreraService: CarrerasService,
    private gestionService: GestionesService,
    private materiaService: MateriasService,
    private sistemasAcademicosService: SistemasacademicosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadCarreras();
    this.loadGestiones();
    this.loadMaterias();
    this.loadUsers();
    this.loadSistemasAcademicos();
  }

  loadCarreras(): void {
    const token = localStorage.getItem('token') || '';
    this.carreraService.getAllCarreras(token).then(
      (data: Carreras[]) => {
        this.carreras = data;
      }
    ).catch(
      (error) => {
        console.error('Error loading carreras:', error);
      }
    );
  }

  loadGestiones(): void {
    const token = localStorage.getItem('token') || '';
    this.gestionService.getAllGestiones(token).then(
      (data: Gestiones[]) => {
        this.gestiones = data;
      },
      (error) => {
        console.error('Error loading gestiones:', error);
      }
    );
  }

  loadMaterias(): void {
    const token = localStorage.getItem('token') || '';
    this.materiaService.getAllMaterias(token).then(
      (data: Materias[]) => {
        this.materias = data;
      }
    ).catch(
      (error) => {
        console.error('Error loading materias:', error);
      }
    );
  }

  async loadUsers(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No Token Found");
      }
      this.token = token;
      const response = await this.usersService.getAllUsers(this.token);
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.users = response.ourUsersList;
      } else {
        console.error('No users found.');
      }
    } catch (error: any) {
      console.error('Error loading users:', error.message);
    }
  }

  loadSistemasAcademicos(): void {
    const token = localStorage.getItem('token') || '';
    this.sistemasAcademicosService.getAllSistemasacademicos(token).then(
      (data: Sistemasacademicos[]) => {
        this.sistemasAcademicos = data;
        console.log('Sistemas Academicos cargados:', this.sistemasAcademicos); // Verificar los datos aquí
      },
      (error) => {
        console.error('Error al cargar sistemas academicos:', error);
      }
    );
  }

  async guardarGrupo(): Promise<void> {
    try {
      if (
        this.selectedCarrera !== null &&
        this.selectedGestion !== null &&
        this.selectedMateria !== null &&
        this.selectedOurUser !== null &&
        this.selectedSistemaAcademico !== null
      ) {
        const grupoData = {
          nombre: this.nombre,
          cupo: this.cupo,
          carrera: { id: this.selectedCarrera },
          gestion: { id: this.selectedGestion },
          materia: { id: this.selectedMateria },
          ourUsers: { id: this.selectedOurUser },
          sistemaacademico: { id: this.selectedSistemaAcademico }
        };
        const token = localStorage.getItem('token') || '';
        const response = await this.grupoService.createGrupo(grupoData, token);
        console.log('Grupo creado:', response);
        this.location.back(); // Regresa a la vista anterior después de guardar
      } else {
        console.error('Debe seleccionar todas las relaciones requeridas');
      }
    } catch (error) {
      console.error('Error saving grupo:', error);
    }
  }
}
