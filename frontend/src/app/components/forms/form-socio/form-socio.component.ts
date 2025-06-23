import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuarios/usuario';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { ServicioRolService } from '../../../services/servicioRol/servicio-rol.service';
import { Rol } from '../../../models/rol/rol';
//import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-socio',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './form-socio.component.html',
  styleUrl: './form-socio.component.css',
})
export class FormSocioComponent {
  accion: string = '';
  usuario: Usuario;
  ArrayRoles: Array<Rol>;
  constructor( private activateRouter: ActivatedRoute, private servicioUsuario: ServicioUsuarioService, private servicioRol: ServicioRolService, private router: Router){
    this.usuario = new Usuario();
    this.ArrayRoles = new Array<Rol>();
    this.cargarRol();
  }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      // const id = +params['_id'];
      if (params['id'] == 0) {
        this.accion = 'new';
      } else {
        this.accion = 'update';
        this.CargarFormulario(params['id']);
      }
    });
  }

  CargarFormulario(id: any) {
    this.servicioUsuario.getUsuarioPorId(id).subscribe((result) => {
      console.log('Usuario recibido:', result);
      Object.assign(this.usuario, result[0]);
      this.usuario.rol = this.ArrayRoles.find((Rol) => Rol._id === this.usuario.rol._id)!;
    });
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
  ActualizarUsuario() {
    this.servicioUsuario.updateUsuario(this.usuario).subscribe((result) => {
      console.log(result);
      if (result.status == 1) {
        alert('se actualizo correctamente');
        this.router.navigate(['/admin/usuario-listado']);
      }
    });
  }
  RegistrarUsuario() {
    this.servicioUsuario.addUsuario(this.usuario).subscribe((result) => {
      console.log(result);
      if (result.status == 1) {
        alert('se agrego correctamente');
        this.router.navigate(['/admin/usuario-listado']);
      }
    });
  }
}
