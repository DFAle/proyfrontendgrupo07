import { Component, resource } from '@angular/core';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../../models/Usuarios/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import printJS from 'print-js';
import { Rol } from '../../../../../models/rol/rol';
import { ServicioRolService } from '../../../../../services/servicioRol/servicio-rol.service';




@Component({
  selector: 'app-usuario-listador',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-listador.component.html',
  styleUrl: './usuario-listador.component.css'
})
export class UsuarioListadorComponent {
  ArrayUsuario: Array<Usuario>;
    ArrayRoles: Array<Rol>;
    usuariosFiltrados: any[] = [];
    filtroUsuario: string = '';

  
  constructor(private servicioUsuario: ServicioUsuarioService,private router: Router,private rutaactiva:ActivatedRoute,
    private servicioRol: ServicioRolService) {
    this.ArrayUsuario = new Array<Usuario>();
     this.ArrayRoles = new Array<Rol>();
    this.cargarRol();
  }
  ngOnInit(): void {
    this.getUsuarios();
     this.usuariosFiltrados = this.ArrayUsuario;
  }

     filtrarUsuarios(): void {
      if (this.filtroUsuario !== '')
        this.usuariosFiltrados = this.ArrayUsuario.filter(p => (p.rol._id === this.filtroUsuario))
    else
      this.usuariosFiltrados = this.ArrayUsuario;
  }

    cargarRol() {
    this.ArrayRoles = new Array<Rol>();
    this.servicioRol.getRoles().subscribe((result) => {
      console.log('lsitado de roles', result);
      result.forEach((element: any) => {
        let vrol: Rol = new Rol();
        Object.assign(vrol, element);
        this.ArrayRoles.push(element);
        vrol = new Rol();
      });
    });
  }

  getUsuarios() {
    this.servicioUsuario.getUsuarios().subscribe(
      result => {
        console.log(result);
        result.forEach((element: any) => {
          let vusuario: Usuario = new Usuario();
          Object.assign(vusuario, element);
          this.ArrayUsuario.push(element);
          vusuario = new Usuario();
        });
      }
    )
  }
  agregarUsuario() {
      this.router.navigate(['/admin/register', '0']);
  }
  EditarUsuario(usuario:Usuario){
    this.router.navigate(['/admin/register', usuario._id]);
  }
  eliminarUsuario(usuario:Usuario){
    this.servicioUsuario.deleteUsuario(usuario).subscribe(
      result => {
        console.log(result);
        this.ArrayUsuario=[];
        this.getUsuarios();
      }
    )
  }


puedeEditar(usuario: Usuario): boolean {
  const rolActual = localStorage.getItem("rol");

  if (!rolActual) return false;

  if (rolActual === 'Personal Administrativo') {
    const rolUsuario = usuario?.rol?.tipo;
    // No puede editar Admin ni Personal Administrativo
    return rolUsuario !== 'Admin' && rolUsuario !== 'Personal Administrativo';
  }

  // Si es Admin u otro, puede editar
  return true;
}
puedeEliminar(usuario: Usuario): boolean {
  const rolActual = localStorage.getItem("rol");

  if (!rolActual) return false;

  if (rolActual === 'Personal Administrativo') {
    const rolUsuario = usuario?.rol?.tipo;
    // No puede eliminar Admin ni Personal Administrativo
    return rolUsuario !== 'Admin' && rolUsuario !== 'Personal Administrativo';
  }

  // Si es Admin u otro, puede eliminar
  return true;

}
imprimir() {
  const dataAImprimir = this.procesarListado(this.ArrayUsuario);

  printJS({
    printable: dataAImprimir,
    type: 'json',
    properties: [
      { field: 'nombre', displayName: 'Nombre' },
      { field: 'apellido', displayName: 'Apellido' },
      { field: 'dni', displayName: 'DNI' },
      { field: 'username', displayName: 'Usuario' },
      { field: 'correo', displayName: 'Correo' },
      { field: 'rol', displayName: 'Rol' },
      { field: 'activo', displayName: 'Estado' }
    ],
    header: 'Listado de Usuarios',
    style: 'table { width: 100%; border-collapse: collapse; font-size: 12px; } td, th { border: 1px solid #ccc; padding: 5px; }',
    scanStyles: false
  });
}

procesarListado(usuarios: Array<any>): Array<any> {
  return usuarios.map(user => ({
    nombre: user.nombre,
    apellido: user.apellido,
    dni: user.dni,
    username: user.username,
    correo: user.correo,
    rol: user.rol?.tipo ?? '-', // por si no viene definido
    activo: user.activo ? 'Activo' : 'Inactivo'
  }));
}



}