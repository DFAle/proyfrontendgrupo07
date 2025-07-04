import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../../../../services/servicemp/mercado-pago.service';
import printJS from 'print-js';

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
  totalRecaudado: number = 0;

  constructor(private mercadoPagoService: MercadoPagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.mercadoPagoService.getPagos().subscribe({
      next: (data) => {
        this.pagos = data;
        this.pagosFiltrados = data; // ← Esta línea faltaba
        this.totalRecaudado = this.pagos
        .filter(p => p.status === 'approved')
        .reduce((sum, p) => sum + (p.monto || 0), 0);
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


  imprimir(): void {
  const datosAImprimir = this.procesarListadoPagos(this.pagosFiltrados);

  printJS({
    printable: datosAImprimir,
    type: 'json',
    properties: [
      { field: 'nro', displayName: 'N°' },
      { field: 'id', displayName: 'ID Pago' },
      { field: 'usuario', displayName: 'Usuario' },
      { field: 'correo', displayName: 'Correo' },
      { field: 'fecha', displayName: 'Fecha' },
      { field: 'monto', displayName: 'Monto ($)' },
      { field: 'metodo', displayName: 'Método' },
      { field: 'estado', displayName: 'Estado' }
    ],
    header: 'Listado de Pagos',
    style: `
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th, td { border: 1px solid #ccc; padding: 5px; text-align: left; }
      th { background-color: #f0f0f0; }
    `,
    scanStyles: false
  });
}

procesarListadoPagos(pagos: any[]): any[] {
  return pagos.map((p, i) => ({
    nro: i + 1,
    id: p._id || '-',
    usuario: `${p.userId?.nombre || '-'} ${p.userId?.apellido || ''}`.trim(),
    correo: p.userId?.correo || '-',
    fecha: new Date(p.fecha).toLocaleString('es-AR'),
    monto: p.monto || 0,
    metodo: p.metodo || 'Desconocido',
    estado: p.status || '-'
  }));
}

}

