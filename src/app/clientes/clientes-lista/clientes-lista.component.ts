import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';
import { dominioClass } from 'src/app/servico-prestado/dominioClass';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  dominio: dominioClass[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: ClientesService,
    private router: Router) {}

  ngOnInit(): void {
    this.service
    .getDominios()
    .subscribe(resposta => this.dominio = resposta);
  }

  novoCadastro() {
    this.router.navigate(['/inventor-data/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    if (this.clienteSelecionado) {
      this.service
      .deletar(this.clienteSelecionado)
      .subscribe(response => {
        console.log('Resposta do servidor:', response); // Adicione este log
        this.mensagemSucesso = response.message || "Cliente deletado com sucesso!";
        this.mensagemErro = null; // Limpar a mensagem de erro se o sucesso ocorreu
        this.ngOnInit();
      },
      erro => {
        if(erro.statusText == "OK"){
          this.mensagemSucesso ="Cliente deletado com sucesso!";
          this.ngOnInit();
        }else{
          console.error('Erro ao deletar cliente:', erro); // Adicione este log
          this.mensagemErro = erro.error.message || "Ocorreu um erro ao deletar o cliente.";
          this.mensagemSucesso = null; // Limpar a mensagem de sucesso se erro ocorreu
        }
      });
    }
  }
}
