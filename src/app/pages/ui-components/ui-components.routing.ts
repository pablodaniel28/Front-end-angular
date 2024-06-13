import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AulasComponent } from './aulas/aulas.component'; // Ajusta la ruta según sea necesario
import { AddCarrerasComponent } from './add-carreras/add-carreras.component'; // Ajusta la ruta según sea necesario
import { AddMateriasComponent } from './add-materias/add-materias.component';
import { UpMateriasComponent } from './up-materias/up-materias.component';
import { AddModulosComponent } from './add-modulos/add-modulos.component';
import { ModulosComponent } from './modulos/modulos.component';
import { UpModulosComponent } from './up-modulos/up-modulos.component';
import { UpCarrerasComponent } from './up-carreras/up-carreras.component';
import { SistemasacademicosComponent } from './sistemasacademicos/sistemasacademicos.component';
import { AddSistemasacademicosComponent } from './add-sistemasacademicos/add-sistemasacademicos.component';
import { UpSistemasacademicosComponent } from './up-sistemasacademicos/up-sistemasacademicos.component';
import { AddAulasComponent } from './add-aulas/add-aulas.component';
import { UpAulasComponent } from './up-aulas/up-aulas.component';
import { UpUsuarioComponent } from './up-usuario/up-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FacultadComponent } from './facultad/facultad.component';
import { AddFacultadComponent } from './add-facultad/add-facultad.component';
import { CarreraComponent } from './carrera/carrera.component';




export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'carreras',
        component: CarreraComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'aulas',  // Nueva ruta para AulaComponent
        component: AulasComponent,
      },
      {
        path: 'addcarreras',  // Nueva ruta para AulaComponent
        component: AddCarrerasComponent,
      },
      {
        path: 'upcarreras',  // Nueva ruta para AulaComponent
        component: UpCarrerasComponent,
      },

      {
        path: 'addmaterias',  // Nueva ruta add para AulaComponent
        component: AddMateriasComponent,
      },
      {
        path: 'upmaterias',  // Nueva ruta editar para AulaComponent
        component: UpMateriasComponent,
      },
      {
        path: 'modulos',  // Nueva ruta editar para AulaComponent
        component: ModulosComponent,
      },
      {
        path: 'addmodulos',  // Nueva ruta editar para AulaComponent
        component: AddModulosComponent,
      },
      {
        path: 'upmodulos',  // Nueva ruta editar para AulaComponent
        component: UpModulosComponent,
      },

      {
        path: 'sistemasacademicos',  // Nueva ruta editar para AulaComponent
        component: SistemasacademicosComponent,
      },
      {
        path: 'addsistemasacademicos',  // Nueva ruta editar para AulaComponent
        component: AddSistemasacademicosComponent,
      },
      {
        path: 'upsistemasacademicos',  // Nueva ruta editar para AulaComponent
        component: UpSistemasacademicosComponent,
      },
      {
        path: 'addaulas',  // Nueva ruta editar para AulaComponent
        component: AddAulasComponent,
      },
      {
        path: 'upaulas',  // Nueva ruta editar para AulaComponent
        component: UpAulasComponent,
      },
      {
        path: 'admin/usuarios',  // Nueva ruta editar para AulaComponent
        component: UsuarioComponent,
      },
      {
        path: 'admin/update',  // Nueva ruta editar para AulaComponent
        component: UpUsuarioComponent,
      },
      {
        path: 'facultad',  // Nueva ruta editar para facuComponent
        component: FacultadComponent,
      },
      {
        path: 'addfacultad',  // Nueva ruta editar para addfacuComponent
        component: AddFacultadComponent,
      },
    ],
  },
];
