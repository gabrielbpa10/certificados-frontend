import { Component, OnInit } from '@angular/core';
import { Certificado } from 'src/app/model/certificado';
import { CertificadoService } from 'src/app/services/certificado.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

	page: number = 0;
	pageSize!: number;
	collectionSize!: number;
	certificados!: Certificado[];
	certificadosService!: CertificadoService;

  constructor(certificadoService: CertificadoService) {
	this.certificadosService = certificadoService;
	
  }

  async ngOnInit(): Promise<void> {
	await this.carregarPagina(1);
 }

 async carregarPagina(pagina: number) {
  this.page = pagina;
  this.certificadosService.getCertificados(pagina-1).subscribe({
    next: (data) => {
	  this.collectionSize = (data.totalRegistros/5);
      this.certificados = data.itens;
      this.pageSize = data.totalPaginas;
    },
    error: (e) => console.error(e)
  });
}

  mudarPagina(pagina: number) {
	this.carregarPagina(pagina);
  }
	
	baixarCertificado(id: number) {
		this.showLoading();
		this.certificadosService.downloadCertificadoById(id).subscribe({
			next: (data) => {
				const blob = new Blob([data], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				this.hideLoading();
				window.open(url);
			},
			error: (e) => console.error(e)	
		});
	}

	showLoading() {
		const loadingContainer = document.querySelector('.loading-container') as HTMLElement;
		loadingContainer.style.display = 'flex';
	}

	hideLoading() {
		const loadingContainer = document.querySelector('.loading-container') as HTMLElement;
		loadingContainer.style.display = 'none';
	}
}
