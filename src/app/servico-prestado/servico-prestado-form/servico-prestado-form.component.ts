import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { dadoSensiveis } from '../dadoSensiveis';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { dominioClass } from '../dominioClass';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: dominioClass[] = []
  dominio: dadoSensiveis;
  success: boolean = false;
  errors: String[];
  status: number = -1;

  constructor(
    private clienteService: ClientesService,
    private service: ServicoPrestadoService,
    private router: Router
  ) {
    this.dominio = new dadoSensiveis();
   }

  ngOnInit(): void {
    this.clienteService
      .getDominios()
      .subscribe( response => this.clientes = response );
  }

  /*onSubmit(){
    this.service
      .salvar(this.dominio)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.dominio = new dadoSensiveis();
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
    }*/
    onSubmit() {
      const requestBody = {
        dominio: this.dominio.dominio
      };

      this.service
        .salvar(requestBody)
        .subscribe(
          response => {
            this.success = true;
            this.errors = null;
            this.dominio = new dadoSensiveis();

            this.monitorTaskStatus();
            //this.router.navigate(['/clientes']);
          },
          errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
            //this.router.navigate(['/clientes']);
          }

        );
    }

    monitorTaskStatus() {
      this.service.getTaskStatus().subscribe(
        (status: number) => {
          this.status = status;
          if (status === 0) {
          } else if (status === -1) {
            // Tarefa falhou
          }
        },
        error => {
          console.error('Error receiving task status:', error);
          this.status = -1; // Em caso de erro, definir status como -1
        }
      );
    }
}
