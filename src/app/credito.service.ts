import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditoService {
  url =
    'http://gen.abaccusapi.com.br:8181/rest/regraofertarprodutosfinanceiros';

  constructor(private http: HttpClient) {}

  executarMotor(variaveis: any): Observable<any> {
    let param: any[] = [
      {
        filtrar: 'TUDO',
        variaveis,
      },
    ];

    return this.http.post(this.url, param);
  }

  executarMotorSemCredito(value: any) {
    return of([
      {
        bom: 'ofertarprodutosfinanceiros',
        variaveis: {
          faturamentoAnual: 100000,
          porteEmpresa: 'PEQ',
          situacaoMargemLucroCliente: 'EXP',
          tempoCasa: 5,
          valorCredito: 1000000,
        },
        rastreio: '5d894849-a8f9-51fc-8ca0-0832804cc499',
        regras: [],
        calculos: [
          {
            codigoRetorno: 0,
            nomeAmigavel: 'Pricing Produtos',
            devolutiva: '',
            formulas: [
              {
                formula: 'valorCredito12x',
                resultado: '1018999.9999999999',
                devolutiva: '',
              },
              {
                formula: 'valorCredito24x',
                resultado: '1029189.9999999999',
                devolutiva: '',
              },
              {
                formula: 'valorCredito36x',
                resultado: '1039379.9999999999',
                devolutiva: '',
              },
              {
                formula: 'valorAntecipacaoBase',
                resultado: '8337.5',
                devolutiva: '',
              },
            ],
          },
        ],
        procedimentos: [],
        tabelas: [
          {
            codigoRetorno: 0,
            nomeAmigavel: 'Tabela de produtos dispon?veis',
            devolutiva: '',
            resultados: [
              {
                resultado: 'MENSAGEM_1',
                saida:
                  'Neste momento, infelizmente, nosso produto nao esta disponivel para a sua empresa.',
              },
              {
                resultado: 'PRODUTO_1',
                saida: 'N/A',
              },
              {
                resultado: 'PRODUTO_2',
                saida: 'N/A',
              },
            ],
          },
        ],
      },
    ]);
  }
}
