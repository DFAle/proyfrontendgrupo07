import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuarios/usuario';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';
import { ServicioRolService } from '../../../services/servicioRol/servicio-rol.service';
import { Rol } from '../../../models/rol/rol';
import Swal from 'sweetalert2';

//import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-socio',
  imports: [CommonModule, FormsModule, RouterLink,ReactiveFormsModule],
  templateUrl: './form-socio.component.html',
  styleUrl: './form-socio.component.css',
})
export class FormSocioComponent implements OnInit {
  accion: string = '';
  usuario: Usuario;
  ArrayRoles: Array<Rol>;
// Agrega esta propiedad en tu componente
showPassword: boolean = false;
socioForm: FormGroup;
  loading: boolean = false;
    id: string = '';



  constructor( private activateRouter: ActivatedRoute, private servicioUsuario: ServicioUsuarioService, private servicioRol: ServicioRolService,
     private router: Router,private fb: FormBuilder){
    this.usuario = new Usuario();
    this.ArrayRoles = new Array<Rol>();
    this.cargarRol();

     this.activateRouter.params.subscribe((params) => {
      // const id = +params['_id'];
      if (params['id'] == 0) {
        this.accion = 'new';
      } else {
        this.accion = 'update';
        this.CargarFormulario(params['id']);
      }
    });

      this.socioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
   
  }



// Agrega este método en tu componente
togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


  CargarFormulario(id: string) {
    this.id=id;
    this.servicioUsuario.getUsuarioPorId(id).subscribe((result) => {
      console.log('res'+result);
       this.socioForm.patchValue({
        nombre: result.nombre,
        apellido: result.apellido,
        dni: result.dni,
        correo: result.correo,
        username: result.username,
        password: result.password,
        rol: result.rol
      });
    });
        this.socioForm.markAsPristine();
    this.socioForm.markAsUntouched();
    console.log('formulario '+this.socioForm.value);
  }

  cargarRol() {
    this.ArrayRoles = new Array<Rol>();
    this.servicioRol.getRoles().subscribe((result) => {
      console.log('lsitado de roles', result);
      result.forEach((element: any) => {
        let vrol: Rol = new Rol();
        Object.assign(vrol, element);
        this.ArrayRoles.push(element);
        vrol = new Rol();
      });
    });
  }
  ActualizarUsuario() {
    console.log('Usuario a actualizar:', this.socioForm.value);
    Object.assign(this.usuario, this.socioForm.value);
  
    this.loading = true;
        this.usuario._id = this.id;

    this.servicioUsuario.updateUsuario(this.usuario).subscribe((result) => {
      if (result.status == 1) {
        this.loading = false;
          Swal.fire('¡Éxito!', 'Usuario actualizado correctamente', 'success');        
          this.router.navigate(['/admin/usuario-listado']);
      }
    });
  }
  RegistrarUsuario() {
    Object.assign(this.usuario, this.socioForm.value);
    console.log(this.usuario);
      const rolEncontrado = this.ArrayRoles.find((r) => r._id == this.socioForm.value.rol);
   if (rolEncontrado) {
    this.usuario.rol = rolEncontrado;
} else {
    throw new Error('Rol no encontrado');
}
    this.loading = true;
    this.servicioUsuario.addUsuario(this.usuario).subscribe((result) => {
      if (result.status == 1) {
        this.loading = false;
        Swal.fire('¡Éxito!', 'Usuario registrado correctamente', 'success');
        this.router.navigate(['/admin/usuario-listado']);
      }
    });
  }
}
