import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    RouterModule // si usás routerLink en el HTML
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  // tus datos
  CantidadActividad: number = 0;
  UsuarioTotales: number = 0;
  UsuarioAdmin: number = 0;
  UsuarioPersonalMesa: number = 0;
  UsuarioAdministrativo: number = 0;
  UsuarioEstandar: number = 0;
  UsuarioProfesor: number = 0;

  constructor(
    private servicioActividades: ActividadService,
    private servicioUsuario: ServicioUsuarioService,
    private profesorService: ProfesoresService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getActividad();
    this.getUsuario();
    this.getProfesores();
  }

  // ✅ NUEVO formato correcto para Chart.js v4 + ng2-charts
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Usuarios', 'Admins', 'Personal Administrativo', 'Personal Mesa', 'Profesores'],
    datasets: [
      {
        data: [], // ← se llena después
        backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#0dcaf0', '#6c757d']
      }
    ]
  };

  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true }
    }
  };

  actualizarChart() {
    this.pieChartData.datasets[0].data = [
      this.UsuarioEstandar,
      this.UsuarioAdmin,
      this.UsuarioAdministrativo,
      this.UsuarioPersonalMesa,
      this.UsuarioProfesor
    ];
  }

getActividad() {
  this.servicioActividades.consumirActividad().subscribe(result => {
    this.CantidadActividad = result.length;

    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColors: string[] = [];

    result.forEach((actividad: any, index: number) => {
      labels.push(actividad.titulo);
      data.push(actividad.inscriptos.length);
      backgroundColors.push(this.colores[index % this.colores.length]);
    });

    this.actividadChartLabels = labels;

    this.actividadChartData = {
      labels,
      datasets: [
        {
          label: 'Inscriptos por Actividad',
          data,
          backgroundColor: backgroundColors
        }
      ]
    };
    console.log('Datos del gráfico de actividades:', this.actividadChartData); // ¡Agrega esto!
  });
}


  private datosCargados = {
  usuarios: false,
  profesores: false
};

  getUsuario() {
  this.servicioUsuario.getUsuarios().subscribe(result => {
    this.UsuarioTotales = result.length;
    result.forEach((usuario: any) => {
      if (usuario.rol?.tipo == "Personal Mesa de Entrada") this.UsuarioPersonalMesa++;
      if (usuario.rol?.tipo == "Usuario") this.UsuarioEstandar++;
      if (usuario.rol?.tipo == "Personal Administrativo") this.UsuarioAdministrativo++;
      if (usuario.rol?.tipo == "Admin") this.UsuarioAdmin++;
    });

    this.datosCargados.usuarios = true;
    this.verificarDatosCompletos();
  });
}

getProfesores() {
  this.profesorService.getProfesores().subscribe(result => {
    this.UsuarioProfesor = result.length;
    this.datosCargados.profesores = true;
    this.verificarDatosCompletos();
  });
}

verificarDatosCompletos() {
  if (this.datosCargados.usuarios && this.datosCargados.profesores) {
    this.actualizarChart();
  }
}

  rutasProfesor() {
    this.route.navigate(['admin/profesor-listado']);
  }

  rutasActividad() {
    this.route.navigate(['admin/actividad-lista']);
  }

  rutasUsiarios() {
    this.route.navigate(['admin/usuario-listado']);
  }



  public actividadChartLabels: string[] = [];
public actividadChartData = {
  labels: [] as string[],
  datasets: [
    {
      label: 'Inscriptos por Actividad',
      data: [] as number[],
      backgroundColor: [] as string[]
    }
  ]
};

public colores: string[] = [
  '#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#20c997', '#fd7e14', '#6610f2'
];




}
