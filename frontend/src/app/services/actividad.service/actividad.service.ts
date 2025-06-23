import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Horario {
  dia: string;
  horaInicial: string;
  horaFinal: string;
}

export interface Profesor {
  nombre: string;
  apellido: string; // ✅ agregamos esto
  dni: string;
  correo: string;
  espcializacion?: string;
  foto?: string;
}


export interface Actividad {
  _id?: string;
  titulo: string;
  detalle: string;
  estado: boolean;
  nivel: string;
  foto: string;
  cuposDisponibles: number;
  cantidadInscriptos: number;
  horarios: Horario[];
  profesor: Profesor[];
}

@Injectable({ providedIn: 'root' })
export class ActividadService {
  private apiUrl = 'https:proybackendgrupo07.onrender.com/api/actividad';

  constructor(private http: HttpClient) {}

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

 actualizarActividad(id: string, datos: Actividad) {
  return this.http.put<Actividad>(`${this.apiUrl}/actividades/${id}`, datos);
}

}