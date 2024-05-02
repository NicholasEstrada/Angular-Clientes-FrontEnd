import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { dominioClass } from 'src/app/servico-prestado/dominioClass';
import { ClientesService } from 'src/app/clientes.service';
import { dadoSensiveis } from '../dadoSensiveis';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  message: string;
  dominios: any[] = [];
  dominioSelecionadoId: number;
  dadosSensiveis: any[] = [];

  constructor(
    private clienteService: ClientesService
  ) {
   }

  ngOnInit(): void {
    this.carregarDominios();
  }

  carregarDominios() {
    // Lógica para carregar a lista de domínios do seu serviço
    this.clienteService.getDominios().subscribe((dominios: any[]) => {
      this.dominios = dominios;
    });
  }

  consultar() {
    if (!this.dominioSelecionadoId) {
      this.message = 'Por favor, selecione um domínio.';
      return;
    }

    // Lógica para buscar os dados sensíveis relacionados ao domínio selecionado
    this.clienteService.getDadosSensiveisPorDominio(this.dominioSelecionadoId).subscribe((dados: any[]) => {
      this.dadosSensiveis = dados;
      this.message = '';
    });
  }

  consultarDadosSensiveis(pathLocationId: number): void {
    this.clienteService.consultarDadosSensiveisPorPathLocation(pathLocationId)
      .subscribe((dados: any[]) => {
        this.dadosSensiveis = dados;
      });
  }

}
