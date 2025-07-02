import { Component } from '@angular/core';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-administrador',
  imports: [],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  CantidadActividad: number = 0;
  UsuarioTotales: number = 0;
  UsuarioAdmin: number = 0;
  UsuarioPersonalMesa: number = 0;
  UsuarioAdministrativo: number = 0;
  UsuarioEstandar: number = 0;
  UsuarioProfesor: number = 0;


  constructor(private servicioActividades: ActividadService, private servicioUsuario: ServicioUsuarioService, private profesorService: ProfesoresService,private route:Router) { 

  }

  ngOnInit() {
    this.getActividad();
    this.getUsuario();
    this.getProfesores();
  }
  getActividad() {
    this.servicioActividades.consumirActividad().subscribe(
      result => {
        console.log(result);
        this.CantidadActividad = result.length;
        console.log(this.CantidadActividad);
      });
  }
  getUsuario() {
    this.servicioUsuario.getUsuarios().subscribe(
      result => {
        console.log(result);
        this.UsuarioTotales = result.length;
        console.log(this.UsuarioTotales);

        result.forEach((usuario: any, i: number) => {
          console.log(`Usuario ${i + 1}: ${usuario.rol?.tipo}`);
          if (usuario.rol?.tipo == "Personal Mesa de Entrada") {
            this.UsuarioPersonalMesa++;
          }
          if (usuario.rol?.tipo == "Usuario") {
            this.UsuarioEstandar++;
          }
          if (usuario.rol?.tipo == "Personal Administrativo") {
            this.UsuarioAdministrativo++;
          }
          if (usuario.rol?.tipo == "Admin") {
            this.UsuarioAdmin++;
          }
        });
        console.log("Cantidad de personal de Mesa de Entrada: ", this.UsuarioPersonalMesa);
        console.log("Cantidad de Usuario Estandar: ", this.UsuarioEstandar);
        console.log("Cantidad de Personal Administrativo: ", this.UsuarioAdministrativo);
        console.log("Cantidad de Administradores ", this.UsuarioAdmin);
      });
  }
  getProfesores() {
    this.profesorService.getProfesores().subscribe(
      result => {
        console.log(result);
        this.UsuarioProfesor = result.length;
        console.log(this.UsuarioProfesor);
      });
  }
  rutasProfesor() {
    this.route.navigate(['admin/profesor-listado']);
  }
   rutasActividad() {
    this.route.navigate(['admin']);
  }
   rutasUsiarios() {
    this.route.navigate(['admin/usuario-listado']);
  }


}

