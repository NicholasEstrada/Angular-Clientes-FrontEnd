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
  page: number = 0;
  size: number = 100;
  totalElements: number = 0;

  constructor(
    private clienteService: ClientesService
  ) { }

  ngOnInit(): void {
    this.carregarDominios();
  }

  carregarDominios() {
    this.clienteService.getDominios().subscribe(response => {
      this.dominios = response;
    }, error => {
      console.error('Error loading domains', error);
    });
  }

  consultar() {
    if (!this.dominioSelecionadoId) {
      this.message = 'Por favor, selecione um domínio.';
      return;
    }

    this.clienteService.getDadosSensiveisPorDominio(this.dominioSelecionadoId, this.page, this.size).subscribe(response => {
      this.dadosSensiveis = response.content;
      this.totalElements = response.totalElements;
      this.groupDataByPathLocation();
      this.message = '';
    }, error => {
      console.error('Error loading sensitive data', error);
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
      }, error => {
        console.error('Error loading sensitive data by path location', error);
      });
  }

  onPageChange(event: Event, page: number) {
    event.preventDefault();
    if (page >= 0 && page < Math.ceil(this.totalElements / this.size)) {
      this.page = page;
      this.consultar(); // Atualiza a consulta ao mudar de página
    }
  }

}
