import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActividadService } from '../../../services/actividad.service/actividad.service';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [HttpClientModule,RouterLink,CommonModule],
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css'
})
export class PagoExitosoComponent  implements OnInit {
   message = 'Procesando tu pago...';
  userId: string = '';
  actividadId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['collection_id'] || params['payment_id'];
      const paymentStatus = params['collection_status'] || params['status'];
      const externalReference = params['external_reference'];

      if (paymentId && paymentStatus === 'approved') {
        this.message = '¡Tu pago fue aprobado! Confirmando...';
       

        // 👇 Desglosar el external_reference
        if (externalReference?.includes('_')) {
          const [user, actividad] = externalReference.split('_');
          this.userId = user;
          this.actividadId = actividad;
           this.suscribirse();
        }

        this.http.post('https://proybackendgrupo07.onrender.com/api/mp/confirm', {
          paymentId,
          externalReference
        }).subscribe(() => {
          this.message = '✅ ¡Pago confirmado exitosamente!';
        }, () => {
          this.message = '⚠️ Error al confirmar el pago con el servidor.';
        });

      } else if (paymentStatus === 'pending') {
        this.message = '⌛ Tu pago está pendiente.';
      } else {
        this.message = '❌ Tu pago fue rechazado o falló.';
      }
    });
  }


 
     suscribirse() {
 
    this.actividadService.suscribirseActividad(this.actividadId, this.userId).subscribe({
      next: (res) => {
        alert(res.msg);
        console.log(res)
      },
      error: (err) => {
        alert(err.error?.msg || 'Error al suscribirse');
        
      }
    });
  }
  }


