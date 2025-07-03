import { CommonModule } from '@angular/common';
import { Component, resolveForwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActividadService } from '../../../services/actividad.service/actividad.service';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';

@Component({
  selector: 'app-form-asistencia',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-asistencia.component.html',
  styleUrl: './form-asistencia.component.css'
})
export class FormAsistenciaComponent {
  dniIngresado: any;
  arrayInscriptos: Array<any> = [];
  i: number = 0;
  usuarios: Array<any> = [];
  actividades: Array<any> = [];
  mensajeAsistencia: string = '';


  constructor(private activadadServicio: ActividadService, private usuarioService: ServicioUsuarioService) {
    this.BuscarSocio();
    this.BuscarUsuario();
  }

  BuscarUsuario() {
    this.usuarioService.getUsuarios().subscribe(
      (result) => {
        this.usuarios = result;
        console.log("Listado de todos los usuarios", this.usuarios);
      },
      (error) => {
        console.error("Error en la petición de usuarios:", error);
      }
    );
  }
  BuscarSocio() {
    this.activadadServicio.consumirActividad().subscribe(
      (result) => {
        this.actividades = result;
        console.log("Actividades con inscriptos:", this.actividades);
      },
      (error) => {
        console.error("Error en la petición de actividades:", error);
      }
    );
  }
  TomarAsistencia() {
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);

    if (!usuarioEncontrado) {
      this.mensajeAsistencia = "DNI no encontrado en la base de usuarios.";
      return;
    }

    const inscrito = this.actividades.some(actividad =>
      actividad.inscriptos.includes(usuarioEncontrado._id)
    );

    if (inscrito) {
      this.mensajeAsistencia = `El usuario con DNI ${this.dniIngresado} se le tomó la asistencia correctamente.`;
    } else {
      this.mensajeAsistencia = `El usuario con DNI ${this.dniIngresado} NO está inscripto en ninguna actividad.`;
    }
  }
  ConsultarUario() {
    // 1. Buscar al usuario con ese DNI
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);

    if (!usuarioEncontrado) {
      console.log("DNI no encontrado en la base de usuarios.");
      return;
    }

    // 2. Verificar si el _id del usuario está en alguna actividad
    const inscrito = this.actividades.some(actividad =>
      actividad.inscriptos.includes(usuarioEncontrado._id)
    );
    if (inscrito) {
      console.log(` El usuario con DNI ${this.dniIngresado} está inscripto en alguna actividad.`);
    } else {
      console.log(` El usuario con DNI ${this.dniIngresado} NO está inscripto en ninguna actividad.`);
    }
  }
}
