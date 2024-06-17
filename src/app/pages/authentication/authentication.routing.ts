import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { AppSideProfileComponent } from './profile/profile.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { AdminGuard } from 'src/app/AdminGuard';


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'profile',
        component: AppSideProfileComponent,
      },
      {
        path: 'actualizar',
        component: ActualizarComponent,
      },
    ],
  },
];
