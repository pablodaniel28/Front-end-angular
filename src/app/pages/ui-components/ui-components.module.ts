import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AddCarrerasComponent } from './add-carreras/add-carreras.component'; // Ajusta la ruta según sea necesario
import { AulasComponent } from './aulas/aulas.component'; // Ajusta la ruta según sea necesario
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AddMateriasComponent } from './add-materias/add-materias.component';
import { UpMateriasComponent } from './up-materias/up-materias.component';
import {ModulosComponent  } from './modulos/modulos.component';
import { AddModulosComponent } from './add-modulos/add-modulos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule
      // Importa el componente como independiente

  ],
  declarations: [
    AppBadgeComponent,
    AulasComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,
    AddMateriasComponent,
    AddCarrerasComponent,
    AddModulosComponent,
    ModulosComponent,

  ],
})
export class UicomponentsModule {}
