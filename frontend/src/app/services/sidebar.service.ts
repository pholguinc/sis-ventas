import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Almacén',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    iconMenu: '<span class="menu-arrow"></span>',
    submenu: [
      {title: 'Categorías', url: 'mantenimientos/marcas'},
      {title: 'Productos', url: 'mantenimientos/clientes'},
      {title: 'Inventario', url: 'mantenimientos/clientes'}
    ]
    },
    {
      title: 'Administración',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    iconMenu: '<span class="menu-arrow"></span>',
    submenu: [
      {title: 'Usuarios', url: 'mantenimientos/marcas'},
      {title: 'Roles', url: 'mantenimientos/clientes'}
    ]
    },
    {
      title: 'Mantenimientos',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    iconMenu: '<span class="menu-arrow"></span>',
    submenu: [
      {title: 'Marcas', url: 'mantenimientos/marcas'},
      {title: 'Clientes', url: 'mantenimientos/clientes'}
    ]
    },
    {
      title: 'Compras',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    iconMenu: '<span class="menu-arrow"></span>',
    submenu: [
      {title: 'Ingreso de Productos', url: 'mantenimientos/marcas'},
      {title: 'Detalle de Entradas', url: 'mantenimientos/marcas'},
    ]
    },
    {
      title: 'Ventas',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    iconMenu: '<span class="menu-arrow"></span>',
    submenu: [
      {title: 'Posventa', url: 'mantenimientos/clientes'},
      {title: 'Detalle de Ventas', url: 'mantenimientos/marcas'},
      {title: 'Proveedores', url: 'mantenimientos/clientes'}

    ]
    },
    {
      title: 'Reportes',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    url:"/"
    },
    {
      title: 'Base de Datos',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    iconMenu: '<span class="menu-arrow"></span>',
    submenu: [
      {title: 'Restaurar BD', url: 'mantenimientos/clientes'},
      {title: 'Backup BD', url: 'mantenimientos/marcas'},

    ]
    },
    {
      title: 'Config',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    url:"/"
    },
    {
      title: 'Acerca De',
      icon: `<span class="svg-icon svg-icon-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    </span>`,
    url:"/"
    }
  ];
  constructor() { }
}
