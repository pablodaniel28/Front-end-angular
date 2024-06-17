import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute para obtener el parámetro de la URL
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
import { Grupos } from 'src/app/models/grupos'; // Importa el modelo de Grupos

@Component({
  selector: 'app-up-grupos',
  templateUrl: './up-grupos.component.html',
  styleUrls: ['./up-grupos.component.scss']
})
export class UpGruposComponent implements OnInit {

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
  id: number = 0;

  constructor(
    private usersService: UsersService,
    private grupoService: GruposService,
    private carreraService: CarrerasService,
    private gestionService: GestionesService,
    private materiaService: MateriasService,
    private sistemasAcademicosService: SistemasacademicosService,
    private route: ActivatedRoute, // Inyecta ActivatedRoute para obtener el parámetro de la URL
    private location: Location
  ) {}

  ngOnInit(): void {
    // Usamos paramMap para obtener el parámetro 'id' de la URL
    this.id = Number(this.route.snapshot.queryParamMap.get('id'));

    // Luego cargamos los detalles del grupo utilizando el ID obtenido
    this.loadGrupoDetails();
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

  async loadGrupoDetails(): Promise<void> {
    try {
      const token = localStorage.getItem('token') || '';
      const grupo = await this.grupoService.getGrupoById(this.id, token); // Llama a tu servicio para obtener el grupo por ID
      if (grupo) {
        this.nombre = grupo.nombre;
        this.cupo = grupo.cupo;
        this.selectedCarrera = grupo.carrera.id;
        this.selectedGestion = grupo.gestion.id;
        this.selectedMateria = grupo.materia.id;
        this.selectedOurUser = grupo.ourUsers.id;
        this.selectedSistemaAcademico = grupo.sistemaacademico.id;
      } else {
        console.error(`No se encontró grupo con id ${this.id}`);
      }
    } catch (error) {
      console.error(`Error cargando detalles del grupo con id ${this.id}:`, error);
    }
  }

  async updateGrupo(): Promise<void> {
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
        await this.grupoService.updateGrupo(this.id, grupoData, token);
        console.log(`Grupo con id ${this.id} actualizado.`);
        this.location.back(); // Regresa a la vista anterior después de actualizar
      } else {
        console.error('Debe seleccionar todas las relaciones requeridas');
      }
    } catch (error) {
      console.error(`Error actualizando grupo con id ${this.id}:`, error);
    }
  }
}
