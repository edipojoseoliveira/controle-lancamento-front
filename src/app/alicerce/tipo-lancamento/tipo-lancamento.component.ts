import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TipoLancamento } from '../model/tipolancamento';
import { TipoLancamentoService } from '../service/tipo-lancamento.service';

@Component({
    selector: 'app-tipo-lancamento',
    templateUrl: './tipo-lancamento.component.html',
    styleUrls: ['./tipo-lancamento.component.scss'],
    providers: [ConfirmationService]
})
export class TipoLancamentoComponent implements OnInit {

    formGroup!: FormGroup;
    lista: TipoLancamento[] = [];
    pesquisa: string = '';
    record: TipoLancamento = {};
    renderedCadastro: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: TipoLancamentoService
    ) {}

    ngOnInit() {
        this.filtrar();
        this.carregarFormGroup();
    }

    public carregarFormGroup(): void {
        this.formGroup = this.fb.group({
            id: this.fb.control(this.record.id),
            nome: this.fb.control(this.record.nome, [Validators.required]),
            descricao: this.fb.control(this.record.descricao, [Validators.required]),
        });
    }

    get nome() { return this.formGroup.get('nome')!; }
    get descricao() { return this.formGroup.get('descricao')!; }

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

    public novo(): void {
        this.record = {};
        this.carregarFormGroup();
        this.renderedCadastro = true;
    }

    public editar(record: TipoLancamento): void {
        this.record = record;
        this.carregarFormGroup();
        this.renderedCadastro = true;
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

    public cancelar(): void {
        this.renderedCadastro = false;
    }

    public deletar(record: TipoLancamento): void {
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

}
