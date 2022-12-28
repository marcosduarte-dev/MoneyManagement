import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataTransformacoesService } from 'src/app/public/services/data-transformacoes.service';
import { ContasModel } from '../../models/contasModel';
import { ReceitasModel } from '../../models/receitasModel';
import { ContasService } from '../../services/contas.service';
import { ReceitasService } from '../../services/receitas.service';

@Component({
  selector: 'app-cadastrar-receitas',
  templateUrl: './cadastrar-receitas.component.html',
  styleUrls: ['./cadastrar-receitas.component.css'],
})
export class CadastrarReceitasComponent implements OnInit {
  saldoInicial = 0;
  tipodeContaSelecionado!: string;
  nomeConta!: string;
  cadastrou = false;
  dataLancamento!: Date;
  dataReceita!: Date;

  receitaParaCadastrar: ReceitasModel = {} as ReceitasModel;

  contasDoUsuario: ContasModel[] = [];

  user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

  form!: FormGroup;

  constructor(
    public receitasService: ReceitasService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public contasService: ContasService,
    public dataService: DataTransformacoesService,
  ) {
    this.contasService
      .getByUserId(this.user.user_id)
      .subscribe((contas: ContasModel[]) => {
        this.contasDoUsuario = contas;
      });

    this.form = this.formBuilder.group({
      id_conta: [{ value: '' }, Validators.required],
      valor: [{ value: '' }, Validators.required],
      data_receita: [{ value: '' }, Validators.required],
      data_lancamento: [{ value: '' }, Validators.required],
    });
  }
  ngOnInit(): void {
    console.log(this.form.getRawValue());
    this.form.controls['valor'].setValue(0.0);
  }

  onCadastrar() {
    this.receitaParaCadastrar = this.form.getRawValue();

    this.receitaParaCadastrar.data_lancamento = this.dataService.getAnoMesDia(this.form.controls['data_lancamento'].value)
    this.receitaParaCadastrar.data_receita = this.dataService.getAnoMesDia(this.form.controls['data_receita'].value)

    if (this.form.valid) {
      this.receitasService
        .cadastrar(this.receitaParaCadastrar)
        .subscribe((res) => {
          if (res) {
            this.cadastrou = true;
            this.ref.close(this.cadastrou);
          } else {
            this.cadastrou = false;
            this.ref.close(this.cadastrou);
          }
        });
    } else {
      // PREENCHA OS CAMPOS
    }
  }
}
