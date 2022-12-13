import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastrarContasComponent } from './components/cadastrar-contas/cadastrar-contas.component';
import { ContasModel } from './models/contasModel';
import { ContasService } from './services/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css'],
  providers: [DialogService, MessageService]
})
export class ContasComponent implements OnInit{

  contas: ContasModel[] = [];
  items!: MenuItem[];

  showContas = false;

  saldoInicial = 0;
  tipodeContaSelecionado!: string;
  nomeConta!: string;

  contaParaCadastrar: ContasModel = {} as ContasModel;

  tiposdeContas;

  constructor(public contasService: ContasService, public dialogService: DialogService, private messageService: MessageService) {
    this.tiposdeContas = [
      {tipo: 'Conta Corrente'},
      {tipo: 'Renda Fixa'},
      {tipo: 'Carteira'},
      {tipo: 'Outros'},
    ]
  }

  user = JSON.parse(sessionStorage.getItem("currentUser") || '{}');

  ngOnInit(): void {

    this.contasService.getByUserId(this.user.user_id).subscribe((contas: ContasModel[]) => {
      this.contas = contas
    })

    this.items = [{
      label: 'Adicionar',
      items: [
          {label: 'Receitas', icon: 'pi pi-fw pi-plus',},
          {label: 'Despesas', icon: 'pi pi-fw pi-minus'},
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          {label: 'Contas', icon: 'pi pi-fw pi-wallet', command: (onclick)=> {this.showCadastrarContas()}},
      ]
    },
    ];

  }

  showCadastrarContas(): void {
    const ref = this.dialogService.open(CadastrarContasComponent, {
      header: 'Criar uma nova conta',
      width: '70vh'
    })

    ref.onClose.subscribe((sucesso: boolean) => {
      if (sucesso) {
        this.messageService.add({severity:'success', summary:'Cadastro de Conta', detail:'Conta Cadastrada com Sucesso!'});
      } else {
        this.messageService.add({severity:'error', summary:'Cadastro de Conta', detail:'Conta não cadastrada!'});
      }
  });
  }

}
