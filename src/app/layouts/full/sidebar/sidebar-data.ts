import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Administracion',
  },

  {
    displayName: 'Asistencia',
    iconName: 'poker-chip',
    route: '/ui-components/asistencia',
    adminOnly: true,
  },
  {
    displayName: 'Prog. Academica',
    iconName: 'list',
    route: '/ui-components/grupos',
    adminOnly: true,
  },
  {
    displayName: 'Horario',
    iconName: 'rosette',
    route: '/ui-components/horario',
    adminOnly: true,
  },
  {
    displayName: 'Materia',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/badge',
    adminOnly: true,
  },
  {
    displayName: 'Modulo',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/modulos',
    adminOnly: true,
  },
  {
    displayName: 'Facultad',
    iconName: 'layout-navbar-expand',

    route: '/ui-components/facultad',
    adminOnly: true,
  },
  {
    displayName: 'Carrera',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/carreras',
    adminOnly: true,
  },


  {
    displayName: 'Aula',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/aulas',
    adminOnly: true,
  },
  {
    displayName: 'Sistema Academico',
    iconName: 'tooltip',
    route: '/ui-components/sistemasacademicos',
    adminOnly: true,
  },
  {
    displayName: 'Gestion',
    iconName: 'tooltip',
    route: '/ui-components/gestiones',
    adminOnly: true,
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Usuarios',
    iconName: 'user',
    route: '/ui-components/admin/usuarios',
    adminOnly: true,
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
    adminOnly: true,
  },
  // {
  //   navCap: 'Extra',
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'mood-smile',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
