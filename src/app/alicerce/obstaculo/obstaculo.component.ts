import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Obstaculo } from '../model/obstaculo';
import { ObstaculoService } from '../service/obstaculo.service';

@Component({
    selector: 'app-obstaculo',
    templateUrl: './obstaculo.component.html',
    styleUrls: ['./obstaculo.component.scss'],
    providers: [ConfirmationService]
})
export class ObstaculoComponent implements OnInit {

    obstaculoForm!: FormGroup;
    obstaculos: Obstaculo[] = [];
    obstaculo: Obstaculo = {};
    renderedCadastro: boolean = false;
    pesquisa: string = '';

    constructor(
        private confirmationService: ConfirmationService,
        private obstaculoService: ObstaculoService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.filtrar();
        this.carregarObstaculoForm();
    }

    public carregarObstaculoForm(): void {
        this.obstaculoForm = this.fb.group({
            id: this.fb.control(this.obstaculo.id, []),
            nome: this.fb.control(this.obstaculo.nome, [Validators.required]),
            comoSuperar: this.fb.control(this.obstaculo.comoSuperar, [Validators.required])
        });
    }

    get nome() { return this.obstaculoForm.get('nome')!; }
    get comoSuperar() { return this.obstaculoForm.get('comoSuperar')!; }

    public filtrar(): void {
        this.obstaculoService.getObstaculos(this.pesquisa)
        .subscribe({
            next: (results) => {
                this.obstaculos = results;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    public novo(): void {
        this.obstaculo = new Obstaculo();
        this.carregarObstaculoForm();
        this.renderedCadastro = true;
    }

    public editar(obstaculo: Obstaculo): void {
        this.obstaculo = obstaculo;
        this.carregarObstaculoForm();
        this.renderedCadastro = true;
    }

    public salvar(): void {
        if (this.obstaculoForm.invalid) {
            return;
        }
        this.obstaculoService.saveObstaculo(this.obstaculoForm.getRawValue())
        .subscribe({
            next: () => {
                this.renderedCadastro = false;
                this.filtrar();
            }
        });
    }

    public cancelar(): void {
        this.renderedCadastro = false;
    }

    public deletar(obstaculo: Obstaculo): void {
        this.confirmationService.confirm({
            message: 'Deseja excluir o registro?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.obstaculoService.deleteObstaculo(obstaculo)
                .subscribe({
                    next: () => {
                        this.filtrar();
                    }
                });
            }
        });
    }

}
