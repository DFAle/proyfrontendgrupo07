import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../../models/actividad/actividad';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private apiUrl = 'https://proybackendgrupo07.onrender.com/api/mp/qr'; // tu endpoint en el backend

  constructor(private http: HttpClient) {}

  generarQR(actividad:Actividad){
    return this.http.post<any>(this.apiUrl, {
      titulo: actividad.titulo,
      detalle: actividad.detalle,
      foto: actividad.foto,
      category_id: 'category123', 
      quantity : 1,
      precio: actividad.precio,
    })
  }
}
