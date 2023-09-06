import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Jornada } from '../model/jornada';
import { Marco } from '../model/marco';
import { JornadaService } from '../service/jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss'],
  providers: [ ConfirmationService ]
})
export class JornadaComponent implements OnInit {

  public jornadaForm!: FormGroup;
  public marcoForm!: FormGroup;
  public jornadas: Jornada[] = [];
  public renderedCadastro: boolean = false;
  public renderedCadastroMarco: boolean = false;
  public pesquisa: string = '';

  public constructor(
    private confirmationService: ConfirmationService,
    private jornadaService: JornadaService,
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.filtrar();
    this.carregarJornadaForm(new Jornada());
    this.carregarMarcoForm(new Marco());
    /*this.marcos = [
      {
        nome: 'Marco 1',
        descricao: 'Assistir a aula mais importante da FL',
        icon: PrimeIcons.CHECK_CIRCLE
      },
      {
        nome: 'Marco 2',
        descricao: 'Resumir os módulos 1 a 5',
        icon: PrimeIcons.CHECK_CIRCLE
      },
      {
        nome: 'Marco 3',
        descricao: 'Fazer a atividade de Nicho e Avatar e postar na comunidade',
        icon: PrimeIcons.CHECK_CIRCLE
      },
      {
        nome: 'Marco 4',
        descricao: 'Definir a sua Roma',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 5',
        descricao: 'Aulas de Tráfego - Distribuição de Conteúdo',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 6',
        descricao: 'Postar e distribuir 2 raízes por semana',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 7',
        descricao: 'Tráfego - Leads para Lançamento Semente',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 8',
        descricao: 'Executar um Lançamento Semente com 100 participantes',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 9',
        descricao: 'Fazer pelo menos 1 venda no seu Lançamento Semente',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 10',
        descricao: 'Resumir o módulo 6',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 11',
        descricao: 'Tráfego - Leads para Lançamento Clássico',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 12',
        descricao: 'Primeira venda no Lançamento Clássico',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 13',
        descricao: 'Aumentar a produção de conteúdo para 2 raízes e 7 nutellas',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 14',
        descricao: 'Marcar a data dos próximos 7 lançamentos',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 15',
        descricao: 'Faturar seus primeiros R$ 30 mil',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 16',
        descricao: 'Faturar seus primeiros R$ 70 mil',
        icon: PrimeIcons.CIRCLE
      },
      {
        nome: 'Marco 17',
        descricao: 'Faturar seu primeiro 6 em 7 - R$ 100 mil em 7 dias',
        icon: PrimeIcons.CIRCLE
      }
    ]*/
  }

  public carregarJornadaForm(jornada: Jornada): void {
    this.jornadaForm = this.fb.group({
      id: this.fb.control(jornada.id, []),
      nome: this.fb.control(jornada.nome, [Validators.required]),
      marcos: this.fb.array(jornada.marcos, []),
    });
  }

  get nome() { return this.jornadaForm.get('nome')!; }
  get marcos() { return this.jornadaForm.get("marcos")! as FormArray; }

  public carregarMarcoForm(marco: Marco): void {
    this.marcoForm = this.fb.group({
      id: this.fb.control(marco.id, []),
      posicao: this.fb.control(marco.posicao, []),
      nome: this.fb.control(marco.nome, []),
      meta: this.fb.control(marco.meta, []),
      concluido: this.fb.control(marco.concluido, []),
    });
  }

  public filtrar(): void {
    this.jornadaService.getJornadas(this.pesquisa)
    .subscribe({
      next: (lista) => {
        this.jornadas = lista;
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

  public novo(): void {
    this.carregarJornadaForm(new Jornada());
    this.renderedCadastro = true;
  }

  public novoMarco(): void {
    this.renderedCadastroMarco = true;
  }

  public editar(jornada: Jornada): void {
    this.carregarJornadaForm(jornada);
    this.renderedCadastro = true;
  }

  public deletar(jornada: Jornada): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir o registro?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jornadaService.deleteJornada(jornada).subscribe(response => {
          this.filtrar();
        });
      },
      reject: () => { }
    });
  }

  public salvar(): void {
    if (this.jornadaForm.invalid) {
      return;
    }
    this.jornadaService.saveJornada(this.jornadaForm.value).subscribe(response => {
      this.renderedCadastro = false;
      this.filtrar();
    });
  }

  public salvarMarco(): void {
    if (this.marcoForm.invalid) {
      return;
    }
    this.marcos.push(this.fb.group(this.marcoForm.getRawValue()));
    this.renderedCadastroMarco = false;
  }

  public cancelar(): void {
    this.renderedCadastro = false;
  }

  public cancelarMarco(): void {
    this.renderedCadastroMarco = false;
  }

}
