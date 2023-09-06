import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Principio } from '../model/principio';
import { PrincipioService } from '../service/principio.service';

@Component({
    selector: 'app-principio',
    templateUrl: './principio.component.html',
    styleUrls: ['./principio.component.scss'],
    providers: [ConfirmationService],
})
export class PrincipioComponent implements OnInit {
    principioForm!: FormGroup;
    principios: Principio[] = [];
    principio: Principio = {};
    renderedCadastro: boolean = false;
    pesquisa: string = '';

    constructor(
        private confirmationService: ConfirmationService,
        private principioService: PrincipioService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.filtrar();
        this.carregarPrincipioForm();
    }

    public carregarPrincipioForm(): void {
        this.principioForm = this.fb.group({
            id: this.fb.control(this.principio.id, []),
            nome: this.fb.control(this.principio.nome, [Validators.required]),
            descricao: this.fb.control(this.principio.descricao, []),
        });
    }

    get nome() {
        return this.principioForm.get('nome')!;
    }

    public filtrar(): void {
        this.principioService.getPrincipios(this.pesquisa).subscribe({
            next: (results) => {
                this.principios = results;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    public novo(): void {
        this.principio = {};
        this.carregarPrincipioForm();
        this.renderedCadastro = true;
    }

    public editar(principio: Principio): void {
        this.principio = principio;
        this.carregarPrincipioForm();
        this.renderedCadastro = true;
    }

    public salvar(): void {
        if (this.principioForm.invalid) {
            return;
        }
        this.principio = this.principioForm.getRawValue();
        this.principioService.savePrincipio(this.principio).subscribe({
            next: () => {
                this.renderedCadastro = false;
                this.filtrar();
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    public cancelar(): void {
        this.renderedCadastro = false;
    }

    public deletar(principio: Principio): void {
        this.confirmationService.confirm({
            message: 'Deseja excluir o registro?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.principioService.deletePrincipio(principio).subscribe({
                    next: () => {
                        this.filtrar();
                    },
                });
            }
        });
    }
}
