import { Component, resource } from '@angular/core';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../../models/Usuarios/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable, { CellInput, UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable'; // <--- CAMBIO CLAVE AQUÍ



@Component({
  selector: 'app-usuario-listador',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-listador.component.html',
  styleUrl: './usuario-listador.component.css'
})
export class UsuarioListadorComponent {
  ArrayUsuario: Array<Usuario>;
  constructor(private servicioUsuario: ServicioUsuarioService,private router: Router,private rutaactiva:ActivatedRoute,) {
    this.ArrayUsuario = new Array<Usuario>();
  }
  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.servicioUsuario.getUsuarios().subscribe(
      result => {
        console.log(result);
        result.forEach((element: any) => {
          let vusuario: Usuario = new Usuario();
          Object.assign(vusuario, element);
          this.ArrayUsuario.push(element);
          vusuario = new Usuario();
        });
      }
    )
  }
  agregarUsuario() {
      this.router.navigate(['/admin/register', '0']);
  }
  EditarUsuario(usuario:Usuario){
    this.router.navigate(['/admin/register', usuario._id]);
  }
  eliminarUsuario(usuario:Usuario){
    this.servicioUsuario.deleteUsuario(usuario).subscribe(
      result => {
        console.log(result);
        this.ArrayUsuario=[];
        this.getUsuarios();
      }
    )
  }


puedeEditar(usuario: Usuario): boolean {
  const rolActual = sessionStorage.getItem("rol");

  if (!rolActual) return false;

  if (rolActual === 'Personal Administrativo') {
    const rolUsuario = usuario?.rol?.tipo;
    // No puede editar Admin ni Personal Administrativo
    return rolUsuario !== 'Admin' && rolUsuario !== 'Personal Administrativo';
  }

  // Si es Admin u otro, puede editar
  return true;
}
puedeEliminar(usuario: Usuario): boolean {
  const rolActual = sessionStorage.getItem("rol");

  if (!rolActual) return false;

  if (rolActual === 'Personal Administrativo') {
    const rolUsuario = usuario?.rol?.tipo;
    // No puede eliminar Admin ni Personal Administrativo
    return rolUsuario !== 'Admin' && rolUsuario !== 'Personal Administrativo';
  }

  // Si es Admin u otro, puede eliminar
  return true;

}



exportarPDF() {
  // Configuración inicial del documento
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Colores corporativos (tipados correctamente)
  const colors = {
    primary: [51, 102, 153] as [number, number, number],
    secondary: [220, 220, 220] as [number, number, number],
    accent: [255, 153, 0] as [number, number, number],
    white: [255, 255, 255] as [number, number, number],
    textDark: [40, 40, 40] as [number, number, number]
  };

  // Encabezado
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, 297, 30, 'F');
  doc.setFontSize(18);
  doc.setTextColor(...colors.white);
  doc.setFont('helvetica', 'bold');
  doc.text('LISTADO DE USUARIOS', 148.5, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, 15, 25);

  // Configuración de columnas
  const headers: CellInput[] = [
    'N°',
    'NOMBRE',
    'APELLIDO',
    'DNI',
    'CORREO',
    'ROL'
  ];

  // Preparar datos con tipado explícito
  const data: CellInput[][] = this.ArrayUsuario.map((user, index) => [
    (index + 1).toString(),
    user.nombre?.toString() || '--',
    user.apellido?.toString() || '--',
    user.dni?.toString() || '--',
    user.correo?.toString() || '--',
    user.rol?.tipo?.toString() || '--'
  ]);

  // Opciones de la tabla con tipado correcto
  const tableOptions: UserOptions = {
    startY: 40,
    head: [headers],
    body: data,
    margin: { left: 10, right: 10 },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      overflow: 'linebreak',
      halign: 'center',
      valign: 'middle',
      textColor: colors.textDark
    },
    headStyles: {
      fillColor: colors.primary,
      textColor: colors.white,
      fontStyle: 'bold',
      fontSize: 11,
      cellPadding: 6
    },
    bodyStyles: {
      fillColor: colors.white,
      textColor: colors.textDark,
      lineColor: colors.secondary,
      lineWidth: 0.3
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { cellWidth: 15 },  // N°
      1: { cellWidth: 35 },  // Nombre
      2: { cellWidth: 35 },  // Apellido
      3: { cellWidth: 25 },  // DNI
      4: { cellWidth: 50 },  // Correo
      5: { cellWidth: 30 }   // Rol
    },
    didDrawPage: (data: { pageNumber: number }) => {
      // Pie de página
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'italic');
      doc.text(`Página ${data.pageNumber}`, 280, 200, { align: 'right' });
      doc.text('Sistema de Gestión de Usuarios', 15, 200);
    }
  };

  autoTable(doc, tableOptions);
  doc.save(`Listado_Usuarios_${new Date().toISOString().slice(0, 10)}.pdf`);
}
}
