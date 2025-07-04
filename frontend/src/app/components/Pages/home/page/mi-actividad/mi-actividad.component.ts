import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { FormsModule } from '@angular/forms';
import { LoginFinalService } from '../../../../../services/LoginFinal/login-final.service';

@Component({
  selector: 'app-mi-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-actividad.component.html',
  styleUrls: ['./mi-actividad.component.css'],
})
export class MiActividadComponent implements OnInit {
  actividades: any[] = [];
  historial: any[] = [];
  constructor(
    private actividadService: ActividadService,
    public loginService: LoginFinalService
  ) {}

  ngOnInit(): void {
    const usuarioId = this.loginService.idLogged();
    if (usuarioId) {
      this.getActividadesByUsuario(usuarioId);
      this.getHistorialUsuario(usuarioId);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  getActividadesByUsuario(usuarioId: string) {
    this.actividadService.getActividadesPorUsuario(usuarioId).subscribe({
      next: (actividades) => {
        this.actividades = actividades;
      },
      error: (err) => {
        console.error('Error al cargar actividades', err);
        alert('Error al cargar tus actividades');
      },
    });
  }

  getHistorialUsuario(usuarioId: string) {
    this.actividadService.getHistorialUsuario(usuarioId).subscribe({
      next: (data) => {
        this.historial = data.filter((item: any) => item.actividad !== null);
      },
      error: (err) => {
        console.error('Error al cargar actividades', err);
        alert('Error al cargar tus actividades');
      },
    });
  }

  bajaActividad(actividadId: string) {
    const usuarioId = this.loginService.idLogged();
    if (actividadId && usuarioId) {
      this.actividadService
        .desuscribirseActividad(actividadId, usuarioId)
        .subscribe({
          next: (res) => {
            alert(res.msg);
            console.log(res);
          },
          error: (err) => {
            alert(err.error?.msg || 'Error al suscribirse');
          },
        });
    } else {
      alert('actividad o usuario no encontrado');
    }
  }
}
