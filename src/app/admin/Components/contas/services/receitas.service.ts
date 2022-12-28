import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReceitasModel } from '../models/receitasModel';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  baseUrl = environment.baseUrl + '/receitas/';

  constructor(private httpClient: HttpClient) { }

  getByContaId(id_conta: string): Observable<ReceitasModel[]> {
    return this.httpClient.get<ReceitasModel[]>(this.baseUrl+`?id_conta=${id_conta}`);
  }

  cadastrar(receita: ReceitasModel): Observable<ReceitasModel>{
    return this.httpClient.post<ReceitasModel>(this.baseUrl, receita)
  }
}
