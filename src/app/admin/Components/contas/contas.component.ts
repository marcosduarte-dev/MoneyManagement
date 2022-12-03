import { Component, OnInit } from '@angular/core';
import { ContasModel } from './models/contasModel';
import { ContasService } from './services/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit{

  contas: ContasModel[] = [];

  constructor(public contasService: ContasService) {}

  ngOnInit(): void {
    this.contasService.getAll().subscribe((contas: ContasModel[]) => {
      console.log(contas)
      this.contas = contas
    })
  }
}
