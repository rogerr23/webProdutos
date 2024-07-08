import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  produtos: any[] = [];

  //Declarando um objeto HttpClient
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // Fazendo uma requisiçao para o serviço de consulta de produtos
    this.httpClient.get('http://localhost:8081/api/produtos')
      .subscribe({
        next: (data) => { // Capturando o retorn da API
          // Armazenando os dados do produto obtido da API
          this.produtos = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })

  }





  title = 'webProdutos';
}
