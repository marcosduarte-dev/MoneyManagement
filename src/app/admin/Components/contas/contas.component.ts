/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastrarContasComponent } from './components/cadastrar-contas/cadastrar-contas.component';
import { CadastrarReceitasComponent } from './components/cadastrar-receitas/cadastrar-receitas.component';
import { ContasModel } from './models/contasModel';
import { ReceitasModel } from './models/receitasModel';
import { ContasService } from './services/contas.service';
import { ReceitasService } from './services/receitas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css'],
  providers: [DialogService, MessageService],
})
export class ContasComponent implements OnInit {
  contas: ContasModel[] = [];
  items!: MenuItem[];

  showContas = false;

  receitaTotal = 0;

  saldoInicial = 0;
  tipodeContaSelecionado!: string;
  nomeConta!: string;

  contaParaCadastrar: ContasModel = {} as ContasModel;

  tiposdeContas;

  constructor(
    public contasService: ContasService,
    public dialogService: DialogService,
    public receitasService: ReceitasService,
    private messageService: MessageService
  ) {
    this.tiposdeContas = [
      { tipo: 'Conta Corrente' },
      { tipo: 'Renda Fixa' },
      { tipo: 'Carteira' },
      { tipo: 'Outros' },
    ];
  }

  user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

  ngOnInit(): void {
    this.contasService
      .getByUserId(this.user.user_id)
      .subscribe((contas: ContasModel[]) => {
        this.contas = contas;
        this.contas.forEach((element) => {
          this.receitasService
            .getByContaId(element.id_conta)
            .subscribe((receitas: ReceitasModel[]) => {
              this.receitaTotal = 0;
              receitas.forEach((e) => {
                this.receitaTotal += e.valor;
              });
              element.receitaTotal = this.receitaTotal;
            });

        });
      });

    this.items = [
      {
        label: 'Adicionar',
        items: [
          {
            label: 'Receitas',
            icon: 'pi pi-fw pi-plus',
            command: (onclick) => {
              this.showCadastrarReceitas();
            },
          },
          { label: 'Despesas', icon: 'pi pi-fw pi-minus' },
          {
            label: 'Contas',
            icon: 'pi pi-fw pi-wallet',
            command: (onclick) => {
              this.showCadastrarContas();
            },
          },
        ],
      },
    ];

    console.log(this.getReceitaDaConta('7c073401-08dd-430a-bcbd-e6c54640d1a6'));
  }

  showCadastrarContas(): void {
    const ref = this.dialogService.open(CadastrarContasComponent, {
      header: 'Criar uma nova conta',
      width: '70vh',
    });

    ref.onClose.subscribe((sucesso: boolean) => {
      if (sucesso) {
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro de Conta',
          detail: 'Conta Cadastrada com Sucesso!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Cadastro de Conta',
          detail: 'Conta não cadastrada!',
        });
      }
    });
  }

  showCadastrarReceitas(): void {
    const ref = this.dialogService.open(CadastrarReceitasComponent, {
      header: 'Adicionar uma nova receita',
      width: '70vh',
    });

    ref.onClose.subscribe((sucesso: boolean) => {
      if (sucesso) {
        this.messageService.add({
          severity: 'success',
          summary: 'Adicionar Receita',
          detail: 'Receita adicionada com Sucesso!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Adicionar Receita',
          detail: 'Receita não adicionada!',
        });
      }
    });
  }

  getReceitaDaConta(id_conta: string): number {
    let TotalReceita = 0;
    this.receitasService
      .getByContaId(id_conta)
      .subscribe((receitas: ReceitasModel[]) => {
        receitas.forEach((e) => {
          TotalReceita += e.valor;
        });
        return TotalReceita;
      });
    return TotalReceita;
  }
}
