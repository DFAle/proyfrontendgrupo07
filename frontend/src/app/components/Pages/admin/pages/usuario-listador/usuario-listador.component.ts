import { Component, resource } from '@angular/core';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../../models/Usuarios/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-listador',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-listador.component.html',
  styleUrl: './usuario-listador.component.css'
})
export class UsuarioListadorComponent {
  ArrayUsuario: Array<Usuario>;
  constructor(private servicioUsuario: ServicioUsuarioService,private router: Router,private rutaactiva:ActivatedRoute) {
    this.ArrayUsuario = new Array<Usuario>();
  }
  ngOnInit(): void {
    this.getUsuarios();
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
      this.router.navigate(['register', '0']);
  }
  EditarUsuario(usuario:Usuario){
    this.router.navigate(['register', usuario._id]);
  }
  eliminarUsuario(usuario:Usuario){
    this.servicioUsuario.deleteUsuario(usuario).subscribe(
      result => {
        console.log(result);
      }
    )
  }
}
