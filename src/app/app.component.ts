import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreditoService } from './credito.service';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { ResultadoDialogComponent } from './resultado-dialog/resultado-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading = false;
  formCredito!: FormGroup;

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: CreditoService
  ) {}
  ngOnInit(): void {
    this.formCredito = this.fb.group({
      cnpj: new FormControl(null, Validators.required),
      porteEmpresa: new FormControl('', Validators.required),
      faturamentoAnual: new FormControl(null, Validators.required),
      situacaoMargemLucroCliente: new FormControl('', Validators.required),
      tempoCasa: new FormControl(null),
      valorCredito: new FormControl(null, [
        Validators.required,
        Validators.min(5000),
        Validators.max(800000),
      ]),
    });
  }

  onSubmit() {
    this.formCredito.get('situacaoMargemLucroCliente')?.markAsTouched();
    if (this.formCredito.valid) {
      this.isLoading = true;
      this.service
        .executarMotor(this.formCredito.getRawValue())
        .subscribe((resp) => {
          const data = this.parseResposta(resp);

          this.isLoading = false;
          this.dialog.open(ResultadoDialogComponent, { width: '500', data });
        });
    }
  }

  parseResposta(resp: any) {
    let retorno: {
      valorCredito: any;
      mensagem: string;
      creditos: any[];
      valorAntecipacao: any;
    } = {
      valorCredito: this.formCredito.value['valorCredito'],
      mensagem: '',
      creditos: [],
      valorAntecipacao: null,
    };

    let mensagem = resp[0].tabelas[0].resultados.find(
      (result: any) => result.resultado === 'MENSAGEM_1'
    );

    let possuiAntecipacao = resp[0].tabelas[0].resultados.find(
      (result: any) => result.resultado === 'PRODUTO_2'
    );

    let possuiCredito = resp[0].tabelas[0].resultados.find(
      (result: any) => result.resultado === 'PRODUTO_1'
    );

    if (mensagem.saida !== 'N/A') {
      retorno.mensagem = mensagem.saida;
      return retorno;
    }

    if (possuiAntecipacao.saida !== 'N/A') {
      retorno.valorAntecipacao = resp[0].calculos[0].formulas.find(
        (item: any) => item.formula === 'valorAntecipacaoBase'
      )?.resultado;
    }

    if (possuiCredito.saida !== 'N/A') {
      console.log(
        resp[0].calculos[0].formulas.forEach((item: any) => {
          if (item.formula.includes('valorCredito')) {
            if (item.formula.includes('12')) {
              item.parcelas = 12;
            } else if (item.formula.includes('24')) {
              item.parcelas = 24;
            } else {
              item.parcelas = 36;
            }
            retorno.creditos.push(item);
          }
        })
      );
    }

    return retorno;
  }

  abreHelp() {
    this.dialog.open(HelpDialogComponent);
  }

  limparForm() {
    this.formDirective.resetForm();
  }
}
