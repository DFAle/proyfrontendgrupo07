import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Actividad, ActividadService } from '../../../../../services/actividad.service/actividad.service';

declare var bootstrap: any;

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent {
  actividades: Actividad[] = [];
  actividadSeleccionada?: Actividad;
  verConCupos: boolean = true;

  constructor(private actividadService: ActividadService) {}

ngOnInit(): void {
  this.actividadService.getActividades().subscribe({
    next: (data) => {
      console.log('✅ Datos recibidos desde la API:', data); // 👈 MOSTRÁ EN CONSOLA
      this.actividades = data;
    },
    error: (err) => {
      console.error('❌ Error al obtener actividades:', err); // 👈 SI FALLA
    }
  });
}
  get actividadesFiltradas(): Actividad[] {
    return this.actividades.filter(act =>
      this.verConCupos ? act.cuposDisponibles > 0 : act.cuposDisponibles === 0
    );
  }
profesoresSeleccionados: any[] = []; 

  abrirModal(act: Actividad) {
  this.actividadSeleccionada = act;
  this.profesoresSeleccionados = act.profesor || [];
  const modal = new bootstrap.Modal(document.getElementById('modalActividad')!);
  modal.show();
}


  confirmarInscripcion() {
    if (!this.actividadSeleccionada || this.actividadSeleccionada.cuposDisponibles <= 0) {
      alert('No hay cupos disponibles.');
      return;
    }

  const actividadActualizada = {
    ...this.actividadSeleccionada,
    cuposDisponibles: this.actividadSeleccionada.cuposDisponibles - 1,
    cantidadInscriptos: (this.actividadSeleccionada.cantidadInscriptos || 0) + 1
  };

    this.actividadService.actualizarActividad(actividadActualizada._id!, actividadActualizada).subscribe({
      next: () => {
        this.actividades = this.actividades.map(act =>
          act._id === actividadActualizada._id ? actividadActualizada : act
        );

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalActividad')!)!;
        modal.hide();

        alert('Inscripción confirmada.');
      },
      error: (err: any) => {
        console.error('Error al actualizar actividad:', err);
        alert('Ocurrió un error al confirmar la inscripción.');
      }
    });
  }
}