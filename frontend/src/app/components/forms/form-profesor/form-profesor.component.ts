import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfesoresService } from '../../../services/serviceProfesores/profesores.service';
import { Profesores } from '../../../models/Profesores/profesores';
import { DomSanitizer } from '@angular/platform-browser';


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

  constructor(private router: Router, private serviceProfesor: ProfesoresService, private activateRouter: ActivatedRoute,  
    private domSanitizer: DomSanitizer,private fb: FormBuilder){
    this.profesor = new Profesores();

      this.profesorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required,Validators.minLength(3)]],
      espcializacion: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$'),Validators.minLength(10), Validators.maxLength(10)]],
      activo: [true, [Validators.required]]
    });
  }

  ngOnInit(): void {
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

  CargarProfesor(id: string) {
    this.serviceProfesor.getProfesorId(id).subscribe((result) => {
      console.log(result);
          Object.assign(this.profesorForm.value, result)

    });
    console.log(this.profesorForm.value);
  }

  RegistrarUsuario() {
    console.log("valido"+ this.profesorForm.valid);
    if (this.profesorForm.valid)
          console.log('Profesor a registrar:', this.profesorForm.value);
        Object.assign(this.profesor, this.profesorForm.value);
    console.log('Profesor a registrar:', this.profesor);
    if (this.profesorForm.valid) {
      console.log('Profesor a registrar:', this.profesorForm.value);
      this.serviceProfesor.addProfesor(this.profesor).subscribe((
      result) => {
        console.log(result);
        if (result.status == 1) {
          alert('se agrego correctamente');
          this.router.navigate(['/admin/profesor-listado']);
        }
    });
      // Lógica para registrar
    }
    
    /*
    */
  }
  
  ModificarProfesor() {
    this.serviceProfesor.updateProfesor(this.profesor).subscribe((result) => {
      if (result.status === "1") {
        alert('Profesor modificado correctamente');
        this.router.navigate(['/admin/profesor-listado']);
      } else {
        alert('Error al modificar el profesor');
      }
    }, (error) => {
      console.error('Error al modificar:', error);
      alert('Error en la petición');
    });
  }

  /** 
  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
     this.profesorForm.value.foto = base64; // Aquí se guarda la imagen en base64
    };
    reader.readAsDataURL(file);
  }
}
  */
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
