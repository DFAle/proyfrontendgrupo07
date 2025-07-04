import { CommonModule } from '@angular/common';
import { Component, resolveForwardRef } from '@angular/core';
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
  arrayInscriptos: Array<any> = [];
  i: number = 0;
  usuarios: Array<any> = [];
  actividades: Array<any> = [];
  mensajeAsistencia: string = '';
  mensajeConsultar: string = '';
  idActividad: string = '';
  ArrayMiActivdades: Array<any> = [];
  ArrayDatoUsuario: Array<any> = [];
  actividadesDisponiblesParaAsistencia: any[] = [];
  usuarioSeleccionadoParaAsistencia: string = '';


  constructor(private activadadServicio: ActividadService, private usuarioService: ServicioUsuarioService, private registroActivdad: ServicioRegistroActividadService) {
    this.BuscarSocio();
    this.BuscarUsuario();
    //  this.IdgetAtividadId();

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

    const actividadesDelUsuario = this.actividades.filter(
      actividad => actividad.inscriptos.includes(usuarioEncontrado._id)
    );

    if (actividadesDelUsuario.length === 0) {
      this.mensajeAsistencia = `El usuario con DNI ${this.dniIngresado} NO está inscripto en ninguna actividad.`;
    } else if (actividadesDelUsuario.length === 1) {
      // Solo una => tomar asistencia directa
      this.registrarAsistencia(actividadesDelUsuario[0]._id, usuarioEncontrado._id);
    } else {
      // Más de una => guardar y mostrar modal de selección
      console.log("a ver:" ,actividadesDelUsuario)
      this.actividadesDisponiblesParaAsistencia = actividadesDelUsuario;
      this.usuarioSeleccionadoParaAsistencia = usuarioEncontrado._id;
      const modal = new bootstrap.Modal(document.getElementById('modalSeleccionActividad')!);
      modal.show();
    }
  }
  registrarAsistencia(idActividad: string, idUsuario: string) {
    // Aquí deberías hacer una llamada a tu backend para registrar la asistencia
    console.log(`Registrando asistencia en actividad ${idActividad} para usuario ${idUsuario}`);
    this.mensajeAsistencia = `Asistencia registrada correctamente para la actividad seleccionada.`;

   // Cerrar el modal anterior si está abierto
  const modalAnterior = bootstrap.Modal.getInstance(document.getElementById('modalSeleccionActividad')!);
  modalAnterior?.hide();

  // Mostrar el modal de confirmación
  const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacionAsistencia')!);
  modalConfirmacion.show();

  // Cuando se cierre el modal de confirmación, volver a mostrar el anterior
  const confirmModalElement = document.getElementById('modalConfirmacionAsistencia')!;
  confirmModalElement.addEventListener('hidden.bs.modal', () => {
    const volverModal = new bootstrap.Modal(document.getElementById('modalSeleccionActividad')!);
    volverModal.show();
  }, { once: true }); // `once` para que se ejecute una sola vez
  }

  ConsultarUsuario() {
    // 1. Buscar al usuario con ese DNI
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);
    if (!usuarioEncontrado) {
      this.mensajeConsultar = "DNI no encontrado ";
      return;
    }
    // 2. Verificar si el _id del usuario está en alguna actividad
    const inscrito = this.actividades.some(actividad => actividad.inscriptos.includes(usuarioEncontrado._id));
    if (inscrito) {
      this.mensajeConsultar = ` El usuario con DNI ${this.dniIngresado} está inscripto en alguna actividad.`;
      this.UsuarioPorId();
      this.registroActivdad.getUsuarioId(usuarioEncontrado._id).subscribe(
        (result) => {
          console.log("Mis activiades", result);
          this.ArrayMiActivdades = result;
        },
        (error) => {
          console.error("Error", error);
        }
      );
    } //else {
    //this.mensajeConsultar=` El usuario con DNI ${this.dniIngresado} NO está inscripto en ninguna actividad.`;
    // }
  }
  IdgetAtividadId() {
    this.activadadServicio.getActividadId(this.idActividad).subscribe((
      result) => {
      console.log(result);
      result.forEach((element: any) => {
        //   let vactividad: Actividad = new Actividad();
        //   Object.assign(vactividad, element);
        //  this.actividades.push(vactividad);
      });
    });
  }

  UsuarioPorId() {
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);
    this.usuarioService.getUsuarioPorId(usuarioEncontrado._id).subscribe((
      result) => {
      console.log(result);
      this.ArrayDatoUsuario = result;
      //    result.forEach((element: any) => {
      //   let vactividad: Actividad = new Actividad();
      //   Object.assign(vactividad, element);
      //  this.actividades.push(vactividad);
      //     });
    });
  }
}
