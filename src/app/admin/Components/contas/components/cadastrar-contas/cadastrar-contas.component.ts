import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContasModel } from '../../models/contasModel';
import { ContasService } from '../../services/contas.service';

@Component({
  selector: 'app-cadastrar-contas',
  templateUrl: './cadastrar-contas.component.html',
  styleUrls: ['./cadastrar-contas.component.css'],
  providers: [DialogService]
})
export class CadastrarContasComponent implements OnInit{
  saldoInicial: Number = 0;
  tipodeContaSelecionado!: String;
  nomeConta!: String;
  cadastrou: boolean = false;

  contaParaCadastrar: ContasModel = {} as ContasModel;

  tiposdeContas;

  user = JSON.parse(sessionStorage.getItem("currentUser") || '{}');

  form!: FormGroup;

  constructor(public contaService: ContasService, public dialogService: DialogService, public ref: DynamicDialogRef, private formBuilder: FormBuilder) {
    this.tiposdeContas = [
      {tipo: 'Conta Corrente'},
      {tipo: 'Renda Fixa'},
      {tipo: 'Carteira'},
      {tipo: 'Outros'},
    ]

    this.form = this.formBuilder.group({
      tipo_conta: [{value: ''}, Validators.required],
      nome_conta: [{value: '' }, Validators.required],
      saldo_inicial: [{value: ''}, Validators.required],
      id_user: [{value: ''}],
    })

  }
  ngOnInit(): void {

    console.log(this.form.getRawValue())

    this.form.controls['saldo_inicial'].setValue(0.0);
    this.form.controls['nome_conta'].setValue('');

  }

  onCadastrar() {
    /*this.contaParaCadastrar.id_user = this.user.user_id;
    this.contaParaCadastrar.nome_conta = this.nomeConta;
    this.contaParaCadastrar.saldo_inicial = this.saldoInicial;
    this.contaParaCadastrar.tipo_conta = this.tipodeContaSelecionado;*/

    this.form.controls['id_user'].setValue(this.user.user_id);

    if(this.form.valid) {
      this.contaService.cadastrar(this.form.getRawValue()).subscribe(res => {
        if (res) {
          this.cadastrou = true;
          this.ref.close(this.cadastrou);
        } else {
          this.cadastrou = false;
          this.ref.close(this.cadastrou);
        }
      })
    } else {
      // PREENCHA OS CAMPOS
    }
  }
}
