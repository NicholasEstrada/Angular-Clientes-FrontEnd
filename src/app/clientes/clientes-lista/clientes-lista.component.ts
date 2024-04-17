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
    private router : Router) {}

  ngOnInit(): void {
    this.service
    .getDominios()
    .subscribe( resposta => this.dominio = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(response => {
      this.mensagemSucesso = "Cliente deletado com sucesso!"
      this.ngOnInit()
    },
    erro => this.mensagemErro = "Ocorreu um erro ao deletar o cliente.")
  }

}
