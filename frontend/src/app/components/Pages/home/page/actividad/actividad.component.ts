import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { LoginFinalService } from '../../../../../services/LoginFinal/login-final.service';
import { Router } from '@angular/router';
import { MercadoPagoService } from '../../../../../services/servicemp/mercado-pago.service';

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
  constructor(private actividadService: ActividadService, public loginService: LoginFinalService, private router: Router, private marcadoPagoService: MercadoPagoService) {
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

  qrUrl: string = '';
  linkdepago: string = '';
  actividadSeleccionada?: Actividad;
  initPoint: any;



  pagar2(actividad: Actividad) {
  this.actividadSeleccionada = actividad;
  const usuarioId = this.loginService.idLogged(); // ✅ Obtener el user ID
  if (!usuarioId) {
    alert("Error: No se pudo obtener el ID del usuario.");
    return;
  }
  this.marcadoPagoService.generarQR(actividad, usuarioId).subscribe(
    (result) => {
      this.qrUrl = result.qr_code;
      this.linkdepago = result.init_point;
      console.log(result);
    },
    (error) => {
      console.error(error);
    }
  );
}



  ngOnInit(): void {
    this.rolLogueado = this.loginService.rolLogged();
    console.log('ROL LOGUEADO:', this.rolLogueado); // Verificá que se imprima
  }
  logout() {
    this.loginService.clearLocalStorage();
  }
  handleVerMas(actividad: any) {
    const usuarioId = this.loginService.idLogged(); 
    if (!this.loginService.userLoggedIn()) {
      this.router.navigate(['/home/nuevo-usuario']);
      return;
    }

    const rol = this.loginService.rolLogged();

    if (rol === 'Usuario') {
      this.actividadSeleccionada = actividad;

     this.marcadoPagoService.generarQR(actividad, usuarioId!).subscribe(
      (result) => {
        this.qrUrl = result.qr_code;
        this.linkdepago = result.init_point;
        console.log(result);
        this.abrirModal();  // ✅ Mostrar QR solo si se genera correctamente
      },
      (error) => {
      console.error('Error generando QR:', error);
      }
    );

    } else {
      alert('Solo los socios pueden inscribirse');
    }
  }

  abrirModal() {
    const modalElement = document.getElementById('modalDetalle');
    console.log('modalElement:', modalElement);
    if (modalElement) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    } else {
      console.error('No se encontró el modal con id "modalDetalle"');
    }
  }

  cantidadInscriptos: number = 0;

obtenerCantidadCupos(id: string): void {
  this.actividadService.getActividadId(id).subscribe({
    next: (actividad: any) => {
      console.log('Actividad obtenida:', actividad);

      // Asegurate de que "inscriptos" (o como se llame) sea un array
      if (actividad.inscriptos && Array.isArray(actividad.inscriptos)) {
        this.cantidadInscriptos = actividad.inscriptos.length;
        console.log('Cantidad de cupos usados:', this.cantidadInscriptos);
      } else {
        console.warn('La actividad no tiene inscriptos definidos como array.');
        this.cantidadInscriptos = 0;
      }
    },
    error: (error) => {
      console.error('Error al obtener actividad por ID', error);
    }
  });
}

hayCuposDisponibles(actividad: Actividad): boolean {
  const cupos = Number(actividad.cuposDisponibles) || 0;
  const inscriptos = actividad.inscriptos?.length || 0;
  return inscriptos < cupos;
}


}