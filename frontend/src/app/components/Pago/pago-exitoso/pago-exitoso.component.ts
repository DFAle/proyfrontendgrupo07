import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  imports: [],
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css'
})
export class PagoExitosoComponent {
  message  = 'Procesando tu pago...';

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router, private routerActivated:RouterLink) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['collection_id'] || params['payment_id'];
      const paymentStatus = params['collection_status'] || params['status'];
      const externalReference = params['external_reference'];

      if (paymentId && paymentStatus === 'approved') {
        this.message  = '¡Tu pago fue aprobado! Confirmando...';

        this.http.post('https://proybackendgrupo07.onrender.com/api/mp/confirm', {
          paymentId,
          externalReference
        }).subscribe(() => {
          this.message  = '✅ ¡Pago confirmado exitosamente!';
        }, () => {
          this.message  = '⚠️ Error al confirmar el pago con el servidor.';
        });

      } else if (paymentStatus === 'pending') {
        this.message  = '⌛ Tu pago está pendiente.';
      } else {
        this.message  = '❌ Tu pago fue rechazado o falló.';
      }
    });
  }


}
