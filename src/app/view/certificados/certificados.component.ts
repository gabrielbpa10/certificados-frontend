import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Certificado } from 'src/app/model/certificado';
import { CertificadoService } from 'src/app/services/certificado.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

	page = 1;
	pageSize = 10;
	collectionSize!: number;
	certificados!: Certificado[];
	firestone!: AngularFirestore;
	certificadosService!: CertificadoService;

  constructor(firestone: AngularFirestore, certificadoService: CertificadoService) {
	this.firestone = firestone;
	this.certificadosService = certificadoService;
	// this.iniciarDados();
	this.inciarDadosV2();
  }

  async ngOnInit(): Promise<void> {
  }

  async iniciarDados() {
	this.firestone.collection('certificados').valueChanges().forEach((data: any) => {
		this.collectionSize = data.length;
		this.certificados = data.map((certificado: any, i: number) => ({ id: i + 1, ...certificado })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	});
  }

  async inciarDadosV2() {
	this.certificadosService.getCertificados().subscribe({
		next: (data) => {
			this.collectionSize = data.totalRegistros;
			this.certificados = data.itens;
			this.pageSize = data.totalPaginas;
			this.page = data.paginaAtual;
		},
		error: (e) => console.error(e)	
	});
 }
  async pesquisarCertificado() {
    this.firestone.collection('certificados', 
		ref => ref.where("titulo", "==", "Spring Boot")
		).valueChanges().forEach(
      	value => console.log(value)
    );
  }

  mudarPagina() {
	this.firestone.collection('certificados').valueChanges().forEach((data: any) => {
		this.certificados = data.map((certificado: any, i: number) => ({ id: i + 1, ...certificado })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	});
	}
	
	baixarCertificado(id: number) {
		this.certificadosService.downloadCertificadoById(100).subscribe({
			next: (data) => {
				const blob = new Blob([data], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			},
			error: (e) => console.error(e)	
		});
	}
}
