import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../../../../services/servicemp/mercado-pago.service';

@Component({
  selector: 'app-lista-pagos',
  imports: [CommonModule,FormsModule],
  templateUrl: './lista-pagos.component.html',
  styleUrl: './lista-pagos.component.css'
})
export class ListaPagosComponent {

   pagos: any[] = [];
  pagosFiltrados: any[] = [];

  filtroUsuario: string = '';
  filtroEstado: string = '';
  constructor(private mercadoPagoService: MercadoPagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.mercadoPagoService.getPagos().subscribe({
      next: (data) => {
        this.pagos = data;
        this.pagosFiltrados = data; // ← Esta línea faltaba
      },
      error: (err) => {
        console.error('Error cargando pagos:', err);
      }
    });
  }
   filtrarPagos(): void {
    this.pagosFiltrados = this.pagos.filter(p => {
      const nombre = `${p.userId?.nombre || ''} ${p.userId?.apellido || ''}`.toLowerCase();
      const coincideUsuario = nombre.includes(this.filtroUsuario.toLowerCase());
      const coincideEstado = this.filtroEstado === '' || p.status === this.filtroEstado;
      return coincideUsuario && coincideEstado;
    });
  }
}

