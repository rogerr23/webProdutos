import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.scss'
})
export class ConsultaProdutosComponent implements OnInit {

  // Atributos 
  produtos: any[] = [];
  paginador: number = 1;
  produto: any = {};
  mensagem: string = '';

  // Declarando um objeto HttpClient
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    // Fazendo uma requisiçao para o serviço de consulta de produtos
    this.httpClient.get('http://localhost:8081/api/produtos')
      .subscribe({
        next: (data) => {
          this.produtos = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

  // Funçao para avançar e voltar na regua de paginaçao 
  pageChange(event: any): void {
    this.paginador = event;
  }

  // Funçao para capturar os dados do produto que sera exibido na janela modal
  onSelect(value: any): void {
    this.produto = value;
  }

  //função para realizar a exclusão do produto
  onDelete(): void {
    this.httpClient.delete
      (`http://localhost:8081/api/produtos/${this.produto.id}`)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Produto '${data.nome}',
  excluído com sucesso.`;
          this.ngOnInit(); //executando a consulta novamente
        },
        error: (e) => {
          console.log(e.error);
        }
      })

  }

}


