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
    displayName: 'Materia',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Modulo',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/modulos',
  },
  {
    displayName: 'Facultad',
    iconName: 'poker-chip',
    route: '/ui-components/facultad',
  },
  {
    displayName: 'Carrera',
    iconName: 'list',
    route: '/ui-components/carreras',
  },
  {
    displayName: 'Grupo',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },

  {
    displayName: 'Docente',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Aula',
    iconName: 'tooltip',
    route: '/ui-components/aulas',
  },
  {
    displayName: 'Sistema Academico',
    iconName: 'tooltip',
    route: '/ui-components/sistemasacademicos',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Usuarios',
    iconName: 'tooltip',
    route: '/ui-components/admin/usuarios',
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
