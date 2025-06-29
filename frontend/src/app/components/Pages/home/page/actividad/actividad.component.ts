import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { LoginFinalService } from '../../../../../services/LoginFinal/login-final.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
})
export class ActividadComponent {
  actividades = Array<Actividad>();
  constructor(private actividadService: ActividadService , public loginService: LoginFinalService,  private router: Router) {
    this.actividades = new Array<Actividad>();
    this.getAtividad();
    
  }
 rolLogueado: string | null = null;


  getAtividad() {
    this.actividadService.consumirActividad().subscribe((result) => {
      result.forEach((element: any) => {
        let vactividad: Actividad = new Actividad();
        Object.assign(vactividad, element);
        this.actividades.push(vactividad);
      });
    });
  }
  ngOnInit(): void {
    this.rolLogueado = this.loginService.rolLogged();
    console.log('ROL LOGUEADO:', this.rolLogueado); // Verificá que se imprima
  }
   logout(){
    this.loginService.clearLocalStorage();
 }
 
handleVerMas(actividad: any) {
  if (!this.loginService.userLoggedIn()) {
    // Si no está logueado, redirige al registro
    this.router.navigate(['/home/nuevo-usuario']);
    return;
  }

  const rol = this.loginService.rolLogged();

  if (rol === 'Usuario') {
    this.abrirModal(); // Mostrar modal SOLO si es un usuario
  } else {
    alert('Solo los socios pueden inscribirse');
  }
}


 abrirModal() {
  const modal = new bootstrap.Modal(document.getElementById('modalDetalle'));
  modal.show();
}



}










