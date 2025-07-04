import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActividadService } from '../../../services/actividad.service/actividad.service';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { ServicioRegistroActividadService } from '../../../services/servicioRegistroActividad/servicio-registro-actividad.service';

declare var bootstrap: any;

@Component({
  selector: 'app-form-asistencia',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-asistencia.component.html',
  styleUrl: './form-asistencia.component.css'
})
export class FormAsistenciaComponent {
  dniIngresado: any;
  usuarios: Array<any> = [];
  actividades: Array<any> = [];
  mensajeAsistencia: string = '';
  mensajeConsultar: string = '';
  ArrayMiActivdades: Array<any> = [];
  ArrayDatoUsuario: Array<any> = [];
  actividadesDisponiblesParaAsistencia: any[] = [];
  usuarioSeleccionadoParaAsistencia: string = '';
  historial: any[] = [];

  constructor(
    private activadadServicio: ActividadService,
    private usuarioService: ServicioUsuarioService,
    private registroActivdad: ServicioRegistroActividadService
  ) {
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
    const usuario = this.usuarios.find(u => u.dni === this.dniIngresado);

    if (!usuario) {
      this.mensajeAsistencia = "Usuario No encontrado";
      this.mostrarModal('modalValidar');
      return;
    }

    const actividadesDelUsuario = this.actividades.filter(act =>
      act.inscriptos.includes(usuario._id)
    );

    if (actividadesDelUsuario.length === 0) {
      this.mensajeAsistencia = "El DNI no está registrado a ninguna actividad.";
      this.mostrarModal('modalValidar');
      return;
    }

    if (actividadesDelUsuario.length === 1) {
      const actividad = actividadesDelUsuario[0];
      this.actividadesDisponiblesParaAsistencia = [actividad];

const nombreParaMostrar = actividad.titulo || actividad.nombre;
this.registrarAsistencia(actividad._id, usuario._id, nombreParaMostrar);
console.log("Nombre de actividad para mensaje:", nombreParaMostrar);
      return;
    }

    this.actividadesDisponiblesParaAsistencia = actividadesDelUsuario;
    this.usuarioSeleccionadoParaAsistencia = usuario._id;
    this.mostrarModal('modalSeleccionActividad');
  }

registrarAsistencia(idActividad: string, idUsuario: string, nombreActividad?: string) {
  console.log(`Registrando asistencia en actividad ${idActividad} para usuario ${idUsuario}`);

  // Cierra el modal de selección si está abierto
  const modalSeleccion = bootstrap.Modal.getInstance(document.getElementById('modalSeleccionActividad')!);
  modalSeleccion?.hide();

  // Guarda el mensaje personalizado
  this.mensajeAsistencia = nombreActividad
    ? `¡La asistencia fue registrada correctamente a la actividad "${nombreActividad}"!`
    : '¡La asistencia fue registrada correctamente!';

  // Muestra el modal de confirmación, no el de advertencia
  this.mostrarModal('modalConfirmacionAsistencia');
}


  mostrarModal(idModal: string) {
    const modal = new bootstrap.Modal(document.getElementById(idModal)!);
    modal.show();
  }

  ConsultarUsuario() {
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);

    if (!usuarioEncontrado) {
      this.ArrayDatoUsuario = [];
      this.ArrayMiActivdades = [];
      this.mensajeConsultar = "DNI no encontrado";
      return;
    }

    const inscrito = this.actividades.some(actividad =>
      actividad.inscriptos.includes(usuarioEncontrado._id)
    );

    if (inscrito) {
      this.mensajeConsultar = `El usuario con DNI ${this.dniIngresado} está inscripto en alguna actividad.`;
      this.UsuarioPorId();
    } else {
      this.ArrayDatoUsuario = [];
      this.ArrayMiActivdades = [];
      this.mensajeConsultar = `El usuario con DNI ${this.dniIngresado} NO está inscripto en ninguna actividad.`;
    }
  }

  UsuarioPorId() {
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);

    if (!usuarioEncontrado) return;

    this.ArrayDatoUsuario = [];
    this.usuarioService.getUsuarioPorId(usuarioEncontrado._id).subscribe(result => {
      console.log("Resultado del usuario encontrado", result);
      this.ArrayDatoUsuario = [result];
    });
  }

  getHistorialUsuario(usuarioId: string) {
    this.activadadServicio.getHistorialUsuario(usuarioId).subscribe({
      next: (data) => {
        this.historial = data.filter((item: any) => item.actividad !== null);
        console.log("historial", this.historial)
      },
      error: (err) => {
        console.error('Error al cargar actividades', err);
        alert('Error al cargar tus actividades');
      },
    });
  }
}
