import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TipoSubNichoEnum } from '../enumerator/TipoSubNichoEnum.enum';
import { Nicho } from '../model/nicho';
import { SubNicho } from '../model/subnicho';
import { NichoService } from '../service/nicho.service';
import { SubNichoService } from '../service/sub-nicho.service';

@Component({
  selector: 'app-nicho',
  templateUrl: './nicho.component.html',
  styleUrls: ['./nicho.component.scss'],
  providers: [ConfirmationService]
})
export class NichoComponent implements OnInit {

    formGroup!: FormGroup;
    tiposSubNicho: any[] = [
        {
            label: 'Área de atuação',
            enum: TipoSubNichoEnum.AREA_ATUACAO
        },
        {
            label: 'Ganhar dinheiro',
            enum: TipoSubNichoEnum.GANHAR_DINHEIRO
        },
        {
            label: 'Hobbies',
            enum: TipoSubNichoEnum.HOBBIES
        }
    ];
    subNichoFormGroup!: FormGroup;
    lista: Nicho[] = [];
    listaSubNicho: SubNicho[] = [];
    pesquisa: string = '';
    record: Nicho = {};
    recordSubNicho: SubNicho = {};
    renderedCadastro: boolean = false;
    renderedCadastroSubNicho: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: NichoService,
        private subNichoService: SubNichoService
    ) {}

    ngOnInit() {
        this.filtrar();
        this.carregarFormGroup();
        this.carregarSubNichoFormGroup();
    }

    public carregarFormGroup(): void {
        this.formGroup = this.fb.group({
            id: this.fb.control(this.record.id),
            nome: this.fb.control(this.record.nome, [Validators.required]),
            ativo: this.fb.control(this.record.ativo, []),
        });
    }

    get nome() { return this.formGroup.get('nome')!; }

    public carregarSubNichoFormGroup(): void {
        this.subNichoFormGroup = this.fb.group({
            id: this.fb.control(this.recordSubNicho.id),
            nome: this.fb.control(this.recordSubNicho.nome, [Validators.required]),
            tipo: this.fb.control(this.recordSubNicho.tipo),
            resultadoDoExpert: this.fb.control(this.recordSubNicho.resultadoDoExpert),
            resultadoDeClientes: this.fb.control(this.recordSubNicho.resultadoDeClientes),
            pessoasPedindoProduto: this.fb.control(this.recordSubNicho.pessoasPedindoProduto),
            ativo: this.fb.control(this.recordSubNicho.ativo),
        });
    }

    get nomeSubNicho() { return this.subNichoFormGroup.get('nome')!; }

    public filtrar(): void {
        this.service.list(this.pesquisa)
        .subscribe({
            next: (lista) => {
                this.lista = lista;
            },
            error: (erro) => {
                console.log(erro);
            }
        });
    }

    public filtrarSubNichos(): void {
        this.subNichoService.list('')
        .subscribe({
            next: (lista: SubNicho[]) => {
                this.listaSubNicho = lista;
            }
        });
    }

    public novo(): void {
        this.record = {};
        this.carregarFormGroup();
        this.renderedCadastro = true;
    }

    public novoSubNicho(): void {
        this.recordSubNicho = {};
        this.carregarSubNichoFormGroup();
        this.renderedCadastroSubNicho = true;
    }

    public editar(record: Nicho): void {
        this.record = record;
        this.carregarFormGroup();
        this.filtrarSubNichos();
        this.renderedCadastro = true;
    }

    public editarSubNicho(record: SubNicho): void {
        this.recordSubNicho = record;
        this.carregarSubNichoFormGroup();
        this.renderedCadastroSubNicho = true;
    }

    public salvar(): void {
        if (this.formGroup.invalid) {
            return;
        }
        this.service.save(this.formGroup.getRawValue())
        .subscribe(() => {
            this.renderedCadastro = false;
            this.filtrar();
        });
    }

    public salvarSubNicho(): void {
        if (this.subNichoFormGroup.invalid) {
            return;
        }
        this.subNichoService.save(this.subNichoFormGroup.getRawValue())
        .subscribe(() => {
            this.filtrarSubNichos();
            this.renderedCadastroSubNicho = false;
        });
    }

    public cancelar(): void {
        this.renderedCadastro = false;
    }

    public cancelarSubNicho(): void {
        this.renderedCadastroSubNicho = false;
    }

    public deletar(record: Nicho): void {
        this.confirmationService.confirm({
            message: 'Deseja excluir o registro?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(record)
                .subscribe(() => {
                    this.filtrar();
                });
            }
        });
    }

    public deletarSubNicho(record: SubNicho): void {

    }

}
