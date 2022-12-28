/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransformacoesService {

  constructor() { }

  adicionaZero(numero: number){
    if (numero <= 9)
        return "0" + numero;
    else
        return numero;
  }

  getAnoMesDia(data: Date) {
    return (data.getFullYear() + "-" + (this.adicionaZero(data.getMonth()+1).toString()) + "-" + this.adicionaZero(data.getDate()))
  }
}
