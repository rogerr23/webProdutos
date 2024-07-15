import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.scss'
})
export class CadastroProdutosComponent implements OnInit {

  // Atributos
  categorias: any[] = [];
  mensagem: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8081/api/categorias')
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }

  // Estrutura com os campos do formulario
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required])
  });

  // Funçao para verificar quais campos do formulario estao com erro de validaçao / preenchimento
  get f() {
    return this.form.controls;
  }

  // Funçao para capturar o evento SUBMIT do formulario
  onSumbit() {
    this.httpClient.post('http://localhost:8081/api/produtos',
      this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Produto '${data.nome}' cadastrado com sucesso!`;
          this.form.reset();
        },
        error: (e) => {
          console.log(e.error);
        }
      })


  }


}
