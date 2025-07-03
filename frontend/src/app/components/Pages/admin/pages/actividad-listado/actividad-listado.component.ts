import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioUsuarioService } from '../../../../../services/servicioUsuario/servicio-usuario.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 

declare var bootstrap: any; 

@Component({
  selector: 'app-actividad-listado',
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-listado.component.html',
  styleUrl: './actividad-listado.component.css',
})
export class ActividadListadoComponent {
  actividades: Array<Actividad>;
  inscriptosSeleccionados: any[] = [];
  actividadSeleccionada?: Actividad;

  constructor(
    private router: Router, 
    private activateRouter: ActivatedRoute, 
    private actividadService: ActividadService, 
    private servicioUsuario: ServicioUsuarioService
) {
    this.actividades = new Array<Actividad>();
    this.getActividad();
  }

  agregarActividad() {
    this.router.navigate(['/admin/register-actividad', '0']);
  }

  getActividad(): void {
    this.actividadService.consumirActividad().subscribe({
      next: (result: any[]) => {
        console.log(result);
        this.actividades = result.map((element: any) => {
          const vactividad = Object.assign(new Actividad(), element);
          return vactividad;
        });
      },
      error: (error) => {
        console.error('Error al obtener actividades', error);
      }
    });
  }

  editarActividad(actividades: Actividad) {
    this.router.navigate(['/admin/register-actividad', actividades._id]);
  }

  eliminarActividad(actividades: Actividad) {
    this.actividadService.deleteActividad(actividades).subscribe({
      next: (result) => {
        if (result.status == 1) {
          alert('Se eliminó correctamente');
          this.actividades = [];
          this.getActividad();
        } else {
          alert('Error al eliminar: ' + (result.msg || 'Error desconocido'));
        }
      },
      error: (error) => {
        console.error("Error en deleteActividad:", error);
        alert("Error al eliminar actividad: " + (error.error?.msg || error.message || 'Error desconocido'));
      }
    });
  }

  verInscriptos(actividad: Actividad) {
    this.actividadSeleccionada = actividad;

    const ids = (actividad.inscriptos || []).map(id => String(id)); 

    this.servicioUsuario.getUsuarios().subscribe({
      next: (usuarios: any[]) => {
        this.inscriptosSeleccionados = usuarios.filter((u: any) => ids.includes(String(u._id)));

        console.log("TOTAL esperados:", ids.length);
        console.log("TOTAL encontrados:", this.inscriptosSeleccionados.length);

        const modalElement = document.getElementById('modalInscriptos');
        if (modalElement) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.inscriptosSeleccionados = [];
      }
    });
  }

  // Función auxiliar para eliminar emojis del texto
  removeEmojis(text: string): string {
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    return text.replace(emojiRegex, '').trim();
  }

  exportarPDF() {
    console.log("Botón Descargar Listado clickeado para Actividades."); 
    console.log("Actividades en exportarPDF():", this.actividades); 

    if (this.actividades.length === 0) {
      console.warn("La lista de actividades está vacía. No se generará un PDF con datos.");
      alert("No hay actividades para exportar a PDF.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Listado de Actividades', 14, 15); 

    const headers: string[] = ['Título', 'Días', 'Horario', 'Nivel', 'Inscriptos', 'Profesor'];

    const data: any[][] = this.actividades.map(a => [
      // CAMBIO AQUÍ: Convertir explícitamente a string primitivo
      this.removeEmojis(String(a.titulo || '')), 
      a.horarios?.[0]?.dia || 'N/A', 
      `${a.horarios?.[0]?.horaInicial || 'N/A'} - ${a.horarios?.[0]?.horaFinal || 'N/A'}`,
      a.nivel || '',
      (a.inscriptos?.length || 0).toString(), 
      `${a.profesor?.nombre || ''} ${a.profesor?.apellido || ''}`.trim() || 'N/A' 
    ]);

    try {
      autoTable(doc, { 
        head: [headers],
        body: data,
        startY: 25,
        theme: 'grid',
        styles: {
          fontSize: 9,
          cellPadding: 2,
          overflow: 'linebreak',
          minCellHeight: 10,
          halign: 'left',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [40, 167, 69], 
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
        },
        columnStyles: {
          0: { cellWidth: 35 }, 
          1: { cellWidth: 20 }, 
          2: { cellWidth: 25 }, 
          3: { cellWidth: 25 }, 
          4: { cellWidth: 20 }, 
          5: { cellWidth: 45 }, 
        },
      });
      doc.save('listado_actividades.pdf');
      console.log("PDF de actividades generado y descargado exitosamente.");
    } catch (e) {
      console.error("Error al generar el PDF de actividades con autoTable:", e); 
      alert("Hubo un error al generar el PDF de actividades. Revisa la consola para más detalles.");
    }
  }
}
