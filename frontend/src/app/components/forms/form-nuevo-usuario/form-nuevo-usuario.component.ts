import { Component, OnInit } from '@angular/core';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { ServicioRolService } from '../../../services/servicioRol/servicio-rol.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuarios/usuario';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-nuevo-usuario',
  imports: [FormsModule,CommonModule,RouterLink, ReactiveFormsModule],
  standalone:true,
  templateUrl: './form-nuevo-usuario.component.html',
  styleUrl: './form-nuevo-usuario.component.css'
})
export class FormNuevoUsuarioComponent implements OnInit {


  public registroUsuarioForm: FormGroup;
  loading: boolean = false;

  usuario: Usuario;
  msgUsername: string = '';
  msgEmail: string = '';
  valido= {
    emailValido: false,
    usuarioValido: false
  }
  usuarioRegistrado={
    'nombre':''
  }



  constructor(
    private servicioUsuario: ServicioUsuarioService,
    private servicioRol: ServicioRolService,
    private router: Router,
    private usuarioLogin: LoginFinalService, private fb: FormBuilder
  ) {
    this.usuario = new Usuario();

    this.registroUsuarioForm = this.fb.group({
      username: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      correo: new FormControl ('',[Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl  ('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]+$/)])
    });
  }

  ngOnInit() {



    // Asignar automáticamente el rol "Usuario"
    this.servicioRol.getRoles().subscribe((roles) => {
      const rolUsuario = roles.find((r: any) => r.tipo === 'Usuario');
      if (rolUsuario) {
        this.usuario.rol = rolUsuario;
      } else {
        console.error('Rol "Usuario" no encontrado');
      }
    });
  }

  RegistrarUsuario() {
        console.log(this.usuario.nombre)


    this.usuarioLogin.verificarUsuario(this.usuario.username).subscribe((result) => {
      console.log(result.registrado);
              this.valido.usuarioValido = result.registrado;

      if (this.valido.usuarioValido) {
        this.msgUsername = "El usuario ya está registrado, ingrese otro usuario";
      }
    });

    this.usuarioLogin.verificarUsuario(this.usuario.correo).subscribe((result) => {
      console.log(result.registrado);
              this.valido.emailValido = result.registrado;

   if (this.valido.emailValido) {
        this.msgEmail = "El correo ya está registrado, ingrese otro correo electronico";
      }
    });
    Object.assign(this.usuario, this.registroUsuarioForm.value);
    console.log(this.usuario)
    if(!(this.valido.usuarioValido && this.valido.emailValido) && this.registroUsuarioForm.valid){
       this.loading = true; 
    console.log(this.usuario)
    this.servicioUsuario.addUsuario(this.usuario).subscribe((result) => {
      console.log(result);
      if (result.status == 1) {
         this.loading = false;
        Swal.fire('¡Éxito!', 'Usuario registrado correctamente', 'success');
        this.router.navigate(['/home/login']);
      }
    },
      (error) => {
        this.loading = false;
      Swal.fire('Error', error.error.message || 'Ocurrió un error', 'error');

    });
  }

}


  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

cancelar() {
  this.router.navigate(['/home']);
}
}
