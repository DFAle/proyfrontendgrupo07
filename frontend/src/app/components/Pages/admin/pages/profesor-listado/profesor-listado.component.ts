import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { Profesores } from '../../../../../models/Profesores/profesores';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable, { CellInput, UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable'; // <--- CAMBIO CLAVE AQUÍ


@Component({
  selector: 'app-profesor-listado',
  imports: [CommonModule],
  templateUrl: './profesor-listado.component.html',
  styleUrl: './profesor-listado.component.css'
})
export class ProfesorListadoComponent {
  ArrayProfesores: Array<Profesores>;

  constructor(private servicioProfesor: ProfesoresService, private router: Router) {
    this.ArrayProfesores = new Array<Profesores>();
    this.getProfe();
  }

  getProfe() {
    this.servicioProfesor.getProfesores().subscribe(
      result => {
        console.log("Datos recibidos del servicio de profesores:", result);
        this.ArrayProfesores = [];
        result.forEach((element: any) => {
          let vprofe: Profesores = new Profesores();
          Object.assign(vprofe, element);
          this.ArrayProfesores.push(vprofe);
        });
        console.log("ArrayProfesores después de cargar:", this.ArrayProfesores);
      },
      error => {
        console.error("Error al cargar profesores desde el servicio:", error);
      }
    );
  }

  agregarProfesor() {
    this.router.navigate(['/admin/register-profesor', '0']);
  }

  editarProfesor(profesor: Profesores) {
    this.router.navigate(['/admin/register-profesor', profesor._id]);
  }

  eliminarProfesor(profesor: Profesores) {
    const confirmar = confirm(`¿Seguro que deseas eliminar a ${profesor.nombre} ${profesor.apellido}?`);
    if (confirmar && profesor._id) {
      this.servicioProfesor.deleteProfesor(profesor._id).subscribe(
        (result) => {
          if (result.status === "1") {
            alert("Profesor eliminado correctamente");
            this.getProfe();
          } else {
            alert("No se pudo eliminar el profesor");
          }
        },
        (error) => {
          console.error("Error al eliminar profesor:", error);
          alert("Error al eliminar profesor");
        }
      );
    }
  }

  exportarPDF() {
  // Configuración inicial del documento
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Colores corporativos
  const primaryColor = [9, 82, 86] as [number, number, number];
  const secondaryColor = [178, 210, 212] as [number, number, number];
  const accentColor = [255, 138, 101] as [number, number, number];

  // --- ENCABEZADO ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 30, 'F');
  
  // Título
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('LISTADO DE PROFESORES', 105, 20, { align: 'center' });

  // Fecha generación
  doc.setFontSize(10);
  doc.text(`Generado: ${new Date().toLocaleDateString()}`, 15, 25);

  // --- CUERPO ---
  const startY = 40;

  // Configuración de columnas
  const headers = ['NOMBRE', 'APELLIDO', 'CORREO', 'ESPECIALIDAD', 'TELÉFONO'];

  // Preparar datos como array de arrays (formato compatible)
  const data = this.ArrayProfesores.map(prof => [
    prof.nombre?.toString() || '--',
    prof.apellido?.toString() || '--',
    prof.correo?.toString() || '--',
    prof.espcializacion?.toString() || '--',
    prof.telefono?.toString() || '--'
  ]);

  // Opciones de la tabla con tipado correcto
  const tableOptions: UserOptions = {
    startY,
    head: [headers],
    body: data,
    margin: { top: startY, left: 15, right: 15 },
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 4,
      halign: 'left',
      valign: 'middle',
      textColor: [60, 60, 60]
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 11,
      halign: 'center'
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      lineColor: secondaryColor,
      lineWidth: 0.2
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    columnStyles: {
      0: { cellWidth: 25, fontStyle: 'bold' },
      1: { cellWidth: 25 },
      2: { cellWidth: 45 },
      3: { cellWidth: 40 },
      4: { cellWidth: 25, halign: 'center' }
    },
    didDrawPage: (data: { pageNumber: number }) => {
      // Pie de página
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'italic');
      
      const pageCount = doc.internal.pages.length;
      const currentPage = data.pageNumber;
      
      doc.text(`Página ${currentPage} de ${pageCount}`, 195, 287, { align: 'right' });
      
      // Línea decorativa
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
      doc.line(15, 285, 195, 285);
      
      // Texto institucional
      doc.text('Sistema de Gestión Académica', 15, 290);
    }
  };

  autoTable(doc, tableOptions);

  // Guardar el PDF
  const fileName = `Profesores_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
}