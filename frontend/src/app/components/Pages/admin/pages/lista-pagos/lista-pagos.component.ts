import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-pagos',
  imports: [CommonModule],
  templateUrl: './lista-pagos.component.html',
  styleUrl: './lista-pagos.component.css'
})
export class ListaPagosComponent {


  pagos = [
  {
    id: '117188242878',
    usuario: {
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juanperez@example.com'
    },
    fecha: new Date('2025-06-20T14:30:00'),
    monto: 4500,
    metodo: 'account_money',
    estado: 'approved'
  },
  {
    id: '117188242879',
    usuario: {
      nombre: 'Lucía',
      apellido: 'Gómez',
      correo: 'lucia.gomez@example.com'
    },
    fecha: new Date('2025-06-22T09:15:00'),
    monto: 3200,
    metodo: 'credit_card',
    estado: 'pending'
  },
  {
    id: '117188242880',
    usuario: {
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      correo: 'carlosr@example.com'
    },
    fecha: new Date('2025-06-25T17:45:00'),
    monto: 5000,
    metodo: 'debit_card',
    estado: 'rejected'
  }
];

}
