import { Component } from '@angular/core';
import { MatriculaService } from '../../services/matricula/matricula.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-lista-matricula',
    standalone: true,
    imports: [],
    templateUrl: './lista-matricula.component.html',
    styleUrl: './lista-matricula.component.css'
})
export class ListaMatriculaComponent {
    matriculasDocente1: any[] = [];
    matriculasDocente2: any[] = [];

    constructor(private matriculaService: MatriculaService) {}

    async ngOnInit() {
        const matriculas = await this.matriculaService.getListaMatricula();
        
        // Filtramos las matrículas por docente
        this.matriculasDocente1 = matriculas.filter((m:any) => m.docente === 'Erick E. Aguilar Altamirano'); 
        this.matriculasDocente2 = matriculas.filter((m:any) => m.docente === 'Freddy G. Rivera Garamendi'); 
    }

    exportToExcel(): void {
        // Crear un nuevo libro de trabajo
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();

        // Convertir las matrículas del Docente 1 a una hoja de trabajo y agregarla al libro
        const worksheetDocente1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.matriculasDocente1);
        XLSX.utils.book_append_sheet(workbook, worksheetDocente1, 'Grupo 1');

        // Convertir las matrículas del Docente 2 a una hoja de trabajo y agregarla al libro
        const worksheetDocente2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.matriculasDocente2);
        XLSX.utils.book_append_sheet(workbook, worksheetDocente2, 'Grupo 2');

        // Exportar el archivo con ambas hojas
        XLSX.writeFile(workbook, `Matriculados Lab. ES-282.xlsx`);
    }
}
