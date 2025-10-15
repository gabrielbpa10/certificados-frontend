import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Certificado } from '../model/certificado';
import { Observable } from 'rxjs';
import { Listagem } from '../model/Listagem';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private apiUrl = environment.urlCertificados + '/certificados/api';

  constructor(private http: HttpClient) { }

  getCertificados(): Observable<Listagem<Certificado>> {
    return this.http.get<Listagem<Certificado>>(`${this.apiUrl}/listar?pagina=0&tamanho=10`);
  }

  downloadCertificadoById(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }
}
