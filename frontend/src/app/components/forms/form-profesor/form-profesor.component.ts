import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfesoresService } from '../../../services/serviceProfesores/profesores.service';
import { Profesores } from '../../../models/Profesores/profesores';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form-profesor',
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './form-profesor.component.html',
  styleUrl: './form-profesor.component.css'
})
export class FormProfesorComponent {
  accion: string = '';
  profesor: Profesores;
  profesorForm: FormGroup;
  id: string = '';
  loading: boolean=false;



  constructor(private router: Router, private serviceProfesor: ProfesoresService, private activateRouter: ActivatedRoute,
    private domSanitizer: DomSanitizer, private fb: FormBuilder) {
    this.profesor = new Profesores();

    this.profesorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      espcializacion: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$'), Validators.minLength(10), Validators.maxLength(10)]],
      activo: [true, [Validators.required]]
    });

      this.activateRouter.params.subscribe((params) => {
      // const id = +params['_id'];
      
      if (params['id'] == 0) {
        this.accion = 'new';
      } else {
        this.accion = 'update';
        this.CargarProfesor(params['id']);
      }
    });

  }

  ngOnInit(): void {
  
      

  }

  CargarProfesor(id: string) {
    this.id = id;
    this.serviceProfesor.getProfesorId(id).subscribe((result) => {
      console.log(result);
      this.profesorForm.patchValue({
        nombre: result.nombre,
        apellido: result.apellido,
        espcializacion: result.espcializacion,
        correo: result.correo,
        telefono: result.telefono,
        activo: result.activo,
        foto: result.foto || null
      });
    });
       this.profesorForm.markAsPristine();
    this.profesorForm.markAsUntouched();
  }

  RegistrarUsuario() {
    console.log('Profesor a registrar:', this.profesor);
    if (this.profesorForm.valid) {
      Object.assign(this.profesor, this.profesorForm.value);
      this.loading = true;
      this.serviceProfesor.addProfesor(this.profesor).subscribe((
        result) => {
        if (result.status == 1) {
          this.loading = false;
          Swal.fire('¡Éxito!', 'Profesor registrado correctamente', 'success');
          this.router.navigate(['/admin/profesor-listado']);
        }
      },
        (error) => {
          this.loading = false;
          Swal.fire('Error', error.error.message || 'Ocurrió un error', 'error');
        });
    }


  }

  ModificarProfesor() {
    Object.assign(this.profesor, this.profesorForm.value);
    this.profesor._id = this.id;
    this.loading = true;

    this.serviceProfesor.updateProfesor(this.profesor).subscribe((result) => {
      if (result.status === "1") {
        this.loading = false;

        Swal.fire('¡Éxito!', 'Profesor actualizado correctamente', 'success');
        this.router.navigate(['/admin/profesor-listado']);
      } else {
        this.loading = false;
        Swal.fire('¡Error!', 'Error al actualizar el profesor', 'error');
      }
    }, (error) => {
      this.loading = false;
      Swal.fire('Error', error.error.message || 'Ocurrió un error', 'error');
    });
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profesorForm.patchValue({
          foto: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

}
