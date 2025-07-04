import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-fallido',
  imports: [],
  templateUrl: './pago-fallido.component.html',
  styleUrl: './pago-fallido.component.css'
})
export class PagoFallidoComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      const externalReference = params['external_reference'];

      if (paymentId && externalReference) {
        this.http.post('https://proybackendgrupo07.onrender.com/api/mp/confirm', {
          paymentId,
          externalReference
        }).subscribe({
          next: () => 
            console.log('Pago fallido registrado en backend' 
          ),
          error: err => console.error(err)
        });
      }
    });
  }
}
