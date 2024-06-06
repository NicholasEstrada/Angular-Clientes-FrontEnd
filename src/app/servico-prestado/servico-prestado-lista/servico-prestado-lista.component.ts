import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';

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
  groupedData: any[] = [];

  constructor(
    private clienteService: ClientesService
  ) { }

  ngOnInit(): void {
    this.carregarDominios();
  }

  carregarDominios() {
    this.clienteService.getDominios().subscribe((dominios: any[]) => {
      this.dominios = dominios;
    });
  }

  consultar() {
    if (!this.dominioSelecionadoId) {
      this.message = 'Por favor, selecione um domínio.';
      return;
    }

    this.clienteService.getDadosSensiveisPorDominio(this.dominioSelecionadoId).subscribe((dados: any[]) => {
      this.dadosSensiveis = dados;
      this.groupDataByPathLocation();
      this.message = '';
    });
  }

  groupDataByPathLocation() {
    const grouped = this.dadosSensiveis.reduce((acc, current) => {
      const pathId = current.pathLocation.id;
      if (!acc[pathId]) {
        acc[pathId] = {
          id: pathId,
          path: current.pathLocation.pathLocation.split('|')[1],
          tipoDeArquivo: current.pathLocation.tipoDeArquivo,
          processamento: current.pathLocation.processamento,
          pathParent: current.pathLocation.pathParent.split('|')[1],
          sensitiveData: []
        };
      }
      acc[pathId].sensitiveData.push(current);
      return acc;
    }, {});
    this.groupedData = Object.values(grouped);
  }

  toggleCollapse(id: number) {
    const collapseElement = document.getElementById('collapse' + id);
    if (collapseElement) {
      collapseElement.classList.toggle('show');
    }
  }

  consultarDadosSensiveis(pathLocationId: number): void {
    this.clienteService.consultarDadosSensiveisPorPathLocation(pathLocationId)
      .subscribe((dados: any[]) => {
        this.dadosSensiveis = dados;
        this.groupDataByPathLocation();
      });
  }
}
