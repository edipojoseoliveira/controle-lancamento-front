import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { QuestionarioRaioX } from '../model/questionarioraiox';
import { QuestionarioRaioXService } from '../service/questionario-raio-x.service';

@Component({
  selector: 'app-questionario-raio-x',
  templateUrl: './questionario-raio-x.component.html',
  styleUrls: ['./questionario-raio-x.component.scss'],
  providers: [ConfirmationService]
})
export class QuestionarioRaioXComponent implements OnInit {

    formGroup!: FormGroup;
    lista: QuestionarioRaioX[] = [];
    pesquisa: string = '';
    record: QuestionarioRaioX = {};
    renderedCadastro: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: QuestionarioRaioXService
    ) {}

    ngOnInit() {
        this.filtrar();
        this.carregarFormGroup();
    }

    public carregarFormGroup(): void {
        this.formGroup = this.fb.group({
            id: this.fb.control(this.record.id),
            pergunta: this.fb.control(this.record.pergunta, [Validators.required]),
            resposta: this.fb.control(this.record.resposta, [Validators.required]),
        });
    }

    get pergunta() { return this.formGroup.get('pergunta')!; }
    get resposta() { return this.formGroup.get('resposta')!; }

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

    public editar(record: QuestionarioRaioX): void {
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

    public deletar(record: QuestionarioRaioX): void {
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
