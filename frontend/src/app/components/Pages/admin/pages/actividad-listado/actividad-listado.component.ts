import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import printJS from 'print-js';
declare var bootstrap: any;

@Component({
  selector: 'app-actividad-listado',
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-listado.component.html',
  styleUrl: './actividad-listado.component.css',
})
export class ActividadListadoComponent {
  actividades: Array<Actividad>;
  inscriptosSeleccionados: any[] = [];
  actividadSeleccionada?: Actividad;

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private actividadService: ActividadService,
    private servicioUsuario: ServicioUsuarioService
  ) {
    this.actividades = new Array<Actividad>();
    this.getActividad();
  }

  agregarActividad() {
    this.router.navigate(['/admin/register-actividad', '0']);
  }

  getActividad(): void {
    this.actividadService.consumirActividad().subscribe({
      next: (result: any[]) => {
        console.log(result);
        this.actividades = result.map((element: any) => {
          const vactividad = Object.assign(new Actividad(), element);
          return vactividad;
        });
      },
      error: (error) => {
        console.error('Error al obtener actividades', error);
      },
    });
  }

  editarActividad(actividades: Actividad) {
    this.router.navigate(['/admin/register-actividad', actividades._id]);
  }

  eliminarActividad(actividades: Actividad) {
    this.actividadService.deleteActividad(actividades).subscribe({
      next: (result) => {
        if (result.status == 1) {
          alert('Se eliminó correctamente');
          this.actividades = [];
          this.getActividad();
        } else {
          alert('Error al eliminar: ' + (result.msg || 'Error desconocido'));
        }
      },
      error: (error) => {
        console.error('Error en deleteActividad:', error);
        alert(
          'Error al eliminar actividad: ' +
            (error.error?.msg || error.message || 'Error desconocido')
        );
      },
    });
  }

  verInscriptos(actividad: Actividad) {
    this.actividadSeleccionada = actividad;

    const ids = (actividad.inscriptos || []).map((id) => String(id));

    this.servicioUsuario.getUsuarios().subscribe({
      next: (usuarios: any[]) => {
        this.inscriptosSeleccionados = usuarios.filter((u: any) =>
          ids.includes(String(u._id))
        );

        console.log('TOTAL esperados:', ids.length);
        console.log('TOTAL encontrados:', this.inscriptosSeleccionados.length);

        const modalElement = document.getElementById('modalInscriptos');
        if (modalElement) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.inscriptosSeleccionados = [];
      },
    });
  }

 imprimir() {
  const dataAImprimir = this.procesarListado(this.actividades);

  printJS({
    printable: dataAImprimir,
    type: 'json',
    properties: [
      { field: 'titulo', displayName: 'Título' },
      { field: 'dia', displayName: 'Día' },
      { field: 'horario', displayName: 'Horario' },
      { field: 'estado', displayName: 'Estado' },
      { field: 'nivel', displayName: 'Nivel' },
      { field: 'cuposDisponibles', displayName: 'Cupos' },
      { field: 'inscriptos', displayName: 'Inscriptos' },
      { field: 'profesor', displayName: 'Profesor' }
    ],
    header: 'Listado de Actividades',
    style: 'table { width: 100%; border-collapse: collapse; font-size: 12px; } td, th { border: 1px solid #ccc; padding: 5px; }',
    scanStyles: false
  });
}

procesarListado(actividades: Array<any>): Array<any> {
  return actividades.map(a => ({
    titulo: a.titulo,
    dia: a.horarios?.[0]?.dia ?? '-',
    horario: `${a.horarios?.[0]?.horaInicial ?? '-'} - ${a.horarios?.[0]?.horaFinal ?? '-'}`,
    estado: a.estado,
    nivel: a.nivel,
    cuposDisponibles: a.cuposDisponibles,
    inscriptos: a.inscriptos?.length ?? 0,
    profesor: `${a.profesor?.nombre ?? '-'} ${a.profesor?.apellido ?? ''}`.trim()
  }));
}

}
