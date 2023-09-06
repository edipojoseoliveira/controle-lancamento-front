import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { GatilhoMental } from 'src/app/alicerce/model/gatilhomental';
import { GatilhoMentalService } from '../service/gatilho-mental.service';


@Component({
  selector: 'app-gatilho-mental',
  templateUrl: './gatilho-mental.component.html',
  styleUrls: ['./gatilho-mental.component.scss'],
  providers: [ConfirmationService, GatilhoMentalService]
})
export class GatilhoMentalComponent implements OnInit {

  gatilhoMentalForm!: FormGroup;
  gatilhosMentais: GatilhoMental[] = [];
  gatilhoMental: GatilhoMental = {};
  renderedCadastro: boolean = false;
  pesquisa: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private gatilhoMentalService: GatilhoMentalService
  ) { }

  ngOnInit(): void {
    this.filtrar();
    this.carregarGatilhoMentalForm();
  }

  carregarGatilhoMentalForm(): void {
    this.gatilhoMentalForm = new FormGroup({
      id: new FormControl(this.gatilhoMental.id),
      nome: new FormControl(this.gatilhoMental.nome, Validators.required),
      beneficioDeAplicar: new FormControl(this.gatilhoMental.beneficioDeAplicar, Validators.required),
      ondeAplicar: new FormControl(this.gatilhoMental.ondeAplicar, Validators.required),
      comoAplicar: new FormControl(this.gatilhoMental.comoAplicar, Validators.required),
      visaoGeral: new FormControl(this.gatilhoMental.visaoGeral, Validators.required),
      observacao: new FormControl(this.gatilhoMental.observacao, Validators.required)
    });
  }

  get nome() { return this.gatilhoMentalForm.get('nome')!; }
  get beneficioDeAplicar() { return this.gatilhoMentalForm.get('beneficioDeAplicar')!; }
  get ondeAplicar() { return this.gatilhoMentalForm.get('ondeAplicar')!; }
  get comoAplicar() { return this.gatilhoMentalForm.get('comoAplicar')!; }
  get visaoGeral() { return this.gatilhoMentalForm.get('visaoGeral')!; }
  get observacao() { return this.gatilhoMentalForm.get('observacao')!; }

  filtrar(): void {
    this.gatilhoMentalService.getGatilhosMentais(this.pesquisa)
    .subscribe({
      next: (lista) => {
        this.gatilhosMentais = lista;
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

  novo(): void {
    this.gatilhoMental = {};
    this.carregarGatilhoMentalForm();
    this.renderedCadastro = true;
  }

  editar(gatilhoMental: GatilhoMental): void {
    this.gatilhoMental = gatilhoMental;
    this.carregarGatilhoMentalForm();
    this.renderedCadastro = true;
  }

  salvar(): void {
    if (this.gatilhoMentalForm.invalid) {
      return;
    }
    this.gatilhoMentalService.saveGatilhoMental(this.gatilhoMentalForm.getRawValue()).subscribe(response => {
      this.renderedCadastro = false;
      this.filtrar();
    });
  }

  cancelar(): void {
    this.renderedCadastro = false;
  }

  deletar(gatilhoMental: GatilhoMental): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir o registro?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gatilhoMentalService.deleteGatilhoMental(gatilhoMental).subscribe(response => {
          this.filtrar();
        });
      },
      reject: () => { }
    });
  }

}
