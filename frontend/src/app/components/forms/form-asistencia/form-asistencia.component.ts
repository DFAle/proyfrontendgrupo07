import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core'; // Import ViewChild
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
import { ActividadService } from '../../../services/actividad.service/actividad.service';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { ServicioRegistroActividadService } from '../../../services/servicioRegistroActividad/servicio-registro-actividad.service';

declare var bootstrap: any;

@Component({
  selector: 'app-form-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-asistencia.component.html',
  styleUrl: './form-asistencia.component.css'
})
export class FormAsistenciaComponent {
  @ViewChild('dniForm') dniForm!: NgForm; // Obtener una referencia al formulario

  dniIngresado: any;
  usuarios: Array<any> = [];
  actividades: Array<any> = []; // Todas las actividades disponibles
  mensajeAsistencia: string = '';
  mensajeConsultar: string = '';
  ArrayMiActivdades: Array<any> = []; // Actividades en las que el usuario actual está inscrito
  ArrayDatoUsuario: Array<any> = [];
  actividadesDisponiblesParaAsistencia: any[] = [];
  usuarioSeleccionadoParaAsistencia: string = '';
  historial: any[] = []; // Historial de inscripciones/bajas del usuario

  constructor(
    private activadadServicio: ActividadService,
    private usuarioService: ServicioUsuarioService,
    private registroActivdad: ServicioRegistroActividadService
  ) {
    this.BuscarSocio(); // Carga todas las actividades
    this.BuscarUsuario(); // Carga todos los usuarios
  }

  /**
   * Busca y carga todos los usuarios del servicio.
   */
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

  /**
   * Busca y carga todas las actividades del servicio.
   */
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

  /**
   * Proceso para tomar asistencia de un usuario.
   * Verifica el DNI, si el usuario está inscrito en actividades,
   * y muestra un modal de selección si hay múltiples actividades.
   */
  TomarAsistencia() {
    const usuario = this.usuarios.find(u => u.dni === this.dniIngresado);

    if (!usuario) {
      this.mensajeAsistencia = "Usuario No encontrado";
      this.mostrarModal('modalConfirmacionAsistencia'); // Usar modal de confirmación
      return;
    }

    // Filtra las actividades en las que el usuario está inscrito
    const actividadesDelUsuario = this.actividades.filter(act =>
      act.inscriptos.includes(usuario._id)
    );

    if (actividadesDelUsuario.length === 0) {
      this.mensajeAsistencia = "El DNI no está registrado a ninguna actividad.";
      this.mostrarModal('modalConfirmacionAsistencia'); // Usar modal de confirmación
      return;
    }

    if (actividadesDelUsuario.length === 1) {
      // Si solo hay una actividad, registrar asistencia directamente
      const actividad = actividadesDelUsuario[0];
      const nombreParaMostrar = actividad.titulo || actividad.nombre; // Obtener nombre de la actividad
      this.registrarAsistencia(actividad._id, usuario._id, nombreParaMostrar);
      console.log("Nombre de actividad para mensaje:", nombreParaMostrar);
      return;
    }

    // Si hay múltiples actividades, mostrar modal de selección
    this.actividadesDisponiblesParaAsistencia = actividadesDelUsuario;
    this.usuarioSeleccionadoParaAsistencia = usuario._id;
    this.mostrarModal('modalSeleccionActividad');
  }

  /**
   * Registra la asistencia para una actividad y un usuario específicos.
   * @param idActividad ID de la actividad.
   * @param idUsuario ID del usuario.
   * @param nombreActividad (Opcional) Nombre de la actividad para el mensaje de confirmación.
   */
  registrarAsistencia(idActividad: string, idUsuario: string, nombreActividad?: string) {
    console.log(`Registrando asistencia en actividad ${idActividad} para usuario ${idUsuario}`);

    // Cierra el modal de selección si está abierto
    const modalSeleccion = bootstrap.Modal.getInstance(document.getElementById('modalSeleccionActividad')!);
    modalSeleccion?.hide();

    // Guarda el mensaje personalizado para la confirmación
    this.mensajeAsistencia = nombreActividad
      ? `¡La asistencia fue registrada correctamente a la actividad "${nombreActividad}"!`
      : '¡La asistencia fue registrada correctamente!';

    // Muestra el modal de confirmación
    this.mostrarModal('modalConfirmacionAsistencia');

    // Se eliminaron las líneas para limpiar el campo DNI y reiniciar el formulario.
    // El DNI permanecerá en el input hasta que el usuario lo borre manualmente.
  }

  /**
   * Muestra un modal de Bootstrap.
   * @param idModal El ID del modal a mostrar.
   */
  mostrarModal(idModal: string) {
    const modal = new bootstrap.Modal(document.getElementById(idModal)!);
    modal.show();
  }

  /**
   * Consulta la información de un usuario por su DNI y sus actividades inscritas.
   */
  ConsultarUsuario() {
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);

    if (!usuarioEncontrado) {
      this.ArrayDatoUsuario = [];
      this.ArrayMiActivdades = [];
      this.mensajeConsultar = "No se encontró información para el DNI ingresado.";
      return;
    }

    // Carga los datos del usuario encontrado
    this.ArrayDatoUsuario = [usuarioEncontrado];

    // Filtra las actividades en las que el usuario está inscrito
    this.ArrayMiActivdades = this.actividades.filter(actividad =>
      actividad.inscriptos.includes(usuarioEncontrado._id)
    );

    // Carga el historial del usuario
    this.getHistorialUsuario(usuarioEncontrado._id);

    // Limpia el mensaje de consulta si se encontró el usuario
    this.mensajeConsultar = '';
  }

  /**
   * Obtiene los datos de un usuario por su ID (redundante con ConsultarUsuario, pero se mantiene si es necesario para otros flujos).
   */
  UsuarioPorId() {
    const usuarioEncontrado = this.usuarios.find(user => user.dni === this.dniIngresado);

    if (!usuarioEncontrado) return;

    this.ArrayDatoUsuario = [];
    this.usuarioService.getUsuarioPorId(usuarioEncontrado._id).subscribe(result => {
      console.log("Resultado del usuario encontrado", result);
      this.ArrayDatoUsuario = [result];
    });
  }

  /**
   * Obtiene el historial de actividades (inscripciones/bajas) de un usuario.
   * @param usuarioId El ID del usuario.
   */
  getHistorialUsuario(usuarioId: string) {
    this.activadadServicio.getHistorialUsuario(usuarioId).subscribe({
      next: (data) => {
        // Filtra los ítems del historial que tienen una actividad válida
        this.historial = data.filter((item: any) => item.actividad !== null);
        console.log("Historial del usuario:", this.historial);
      },
      error: (err) => {
        console.error('Error al cargar el historial de actividades', err);
        // Usar un modal personalizado en lugar de alert()
        this.mensajeConsultar = 'Error al cargar el historial de actividades.';
        this.mostrarModal('modalConfirmacionAsistencia'); // O un modal de error específico
      },
    });
  }
}