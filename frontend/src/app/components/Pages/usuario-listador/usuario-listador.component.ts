import { Component, resource } from '@angular/core';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-listador',
  imports: [FormsModule,CommonModule],
  templateUrl: './usuario-listador.component.html',
  styleUrl: './usuario-listador.component.css'
})
export class UsuarioListadorComponent {
     
  constructor(private servicioUsuario: ServicioUsuarioService){

      }
    ngOnInit(): void {
      this.getUsuarios();
    }
    arrayUsuarios: any[] = [];
    getUsuarios(){  
        this.servicioUsuario.getUsuarios().subscribe(
          result => {
            console.log(result);
            this.arrayUsuarios = result;
          }
        )
    }
}
