import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { dadoSensiveis } from '../dadoSensiveis';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { dominioClass } from '../dominioClass';

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

  constructor(
    private clienteService: ClientesService,
    private service: ServicoPrestadoService
  ) {
    this.dominio = new dadoSensiveis();
   }

  ngOnInit(): void {
    this.clienteService
      .getDominios()
      .subscribe( response => this.clientes = response );
  }

  onSubmit(){
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
    }



}
