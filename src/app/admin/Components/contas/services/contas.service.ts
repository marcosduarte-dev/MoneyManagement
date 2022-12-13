import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ContasModel } from '../models/contasModel';

@Injectable({
  providedIn: 'root'
})

export class ContasService {

  baseUrl = environment.baseUrl + '/contas/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ContasModel[]> {
    return this.httpClient.get<ContasModel[]>(this.baseUrl);
  }

  getByUserId(id_user: Number): Observable<ContasModel[]> {
    return this.httpClient.get<ContasModel[]>(this.baseUrl + `?id_user=${id_user}`);
  }

  cadastrar(conta: ContasModel): Observable<ContasModel>{
    return this.httpClient.post<ContasModel>(this.baseUrl, conta)
  }
}
