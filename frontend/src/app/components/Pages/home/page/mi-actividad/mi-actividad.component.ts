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
  styleUrls: ['./mi-actividad.component.css']
})
export class MiActividadComponent implements OnInit {
  actividades: any[] = [];
  constructor(private actividadService: ActividadService, public loginService: LoginFinalService) {

  }

  ngOnInit(): void {
    const usuarioId = this.loginService.idLogged();
    if (usuarioId) {
      this.getActividadesByUsuario(usuarioId);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }

  }

  getActividadesByUsuario(usuarioId: string) {
    this.actividadService.getActividadesPorUsuario(usuarioId).subscribe({
      next: (actividades) => {
        this.actividades = actividades;
        console.log(this.actividades)
      },
      error: (err) => {
        console.error('Error al cargar actividades', err);
        alert('Error al cargar tus actividades');
      }
    });
  }
}