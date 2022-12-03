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
}
