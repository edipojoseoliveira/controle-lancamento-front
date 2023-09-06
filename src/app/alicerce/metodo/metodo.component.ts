import { MetodoModulo } from './../model/metodomodulo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { Metodo } from '../model/metodo';
import { MetodoModuloService } from '../service/metodo-modulo.service';
import { MetodoService } from '../service/metodo.service';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrls: ['./metodo.component.scss'],
  providers: [ConfirmationService],
})
export class MetodoComponent implements OnInit {

    formGroup!: FormGroup;
    lista: Metodo[] = [];
    pesquisa: string = '';
    record: Metodo = {};
    renderedCadastro: boolean = false;

    modulos!: TreeNode[];
    moduloSelecionado!: TreeNode;

    moduloFormGroup!: FormGroup;
    modulo: MetodoModulo = {};
    renderedCadastroModulo: boolean = false;

    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: MetodoService,
        private moduloService: MetodoModuloService
    ) {}

    ngOnInit() {
        this.filtrar();
        this.carregarFormGroup();
        this.carregarModuloFormGroup();
    }

    public carregarFormGroup(): void {
        this.formGroup = this.fb.group({
            id: this.fb.control(this.record.id),
            nome: this.fb.control(this.record.nome, [Validators.required]),
        });
    }

    get id() { return this.formGroup.get('id')!; }
    get nome() { return this.formGroup.get('nome')!; }

    public carregarModuloFormGroup(): void {
        this.moduloFormGroup = this.fb.group({
            id: this.fb.control(this.modulo.id, []),
            nome: this.fb.control(this.modulo.nome, [Validators.required]),
            descricao: this.fb.control(this.modulo.descricao, [Validators.required]),
            idMetodo: this.fb.control(this.modulo.idMetodo, []),
            idMetodoModuloPai: this.fb.control(this.modulo.idMetodoModuloPai, [])
        });
    }

    get nomeModulo() { return this.moduloFormGroup.get('nome')!; }
    get descricaoModulo() { return this.moduloFormGroup.get('descricao')!; }

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

    public nodeModuloExpand(event: any): void {
        if (event.node) {
            this.moduloService.list(this.record.id, event.node.data.id)
            .subscribe({
                next: (results: MetodoModulo[]) => {
                    let lista = [];
                    for (let result of results) {
                        lista.push({
                            label: result.nome,
                            data: result,
                            leaf: false
                        });
                    }
                    event.node.children = lista;
                }
            });
        }
    }

    public novo(): void {
        this.record = {};
        this.carregarFormGroup();
        this.renderedCadastro = true;
    }

    public novoModulo(): void {
        this.modulo = new MetodoModulo();
        this.modulo.idMetodo = this.record.id;
        if (this.moduloSelecionado.data != null) {
            this.modulo.idMetodoModuloPai = this.moduloSelecionado.data.id;
        }
        this.carregarModuloFormGroup();
        this.renderedCadastroModulo = true;
    }

    public editar(record: Metodo): void {
        this.record = record;
        this.carregarFormGroup();
        this.renderedCadastro = true;
        this.modulos = [];
        this.moduloService.list(record.id, '')
        .subscribe({
            next: (results: MetodoModulo[]) => {
                let lista = [];
                for (let result of results) {
                    lista.push({
                        label: result.nome,
                        data: result,
                        leaf: false
                    });
                }
                this.modulos = lista;
            }
        });
    }

    public salvar(): void {
        if (this.formGroup.invalid) { return; }

        let metodo: Metodo = this.formGroup.getRawValue();
        let criarModuloInicial: boolean = metodo.id ? false : true;

        this.service.save(this.formGroup.getRawValue()).subscribe((metodo: Metodo) => {
            if (criarModuloInicial) {
                let moduloInicial: MetodoModulo = new MetodoModulo();
                moduloInicial.nome = 'Módulos';
                moduloInicial.descricao = 'Listagem de módulos';
                moduloInicial.idMetodo = metodo.id;
                this.moduloService.save(moduloInicial).subscribe(() => {
                    this.renderedCadastro = false;
                    this.filtrar();
                });
            } else {
                this.renderedCadastro = false;
                this.filtrar();
            }
        });
    }

    public salvarModulo(): void {
        if (this.moduloFormGroup.invalid) {
            return;
        }
        this.moduloService.save(this.moduloFormGroup.getRawValue())
        .subscribe(() => {
            this.moduloService.list(this.record.id, this.moduloSelecionado.data.id)
            .subscribe({
                next: (results: MetodoModulo[]) => {
                    let lista = [];
                    for (let result of results) {
                        lista.push({
                            label: result.nome,
                            data: result,
                            leaf: false
                        });
                    }
                    this.moduloSelecionado.children = lista;
                }
            });
            this.renderedCadastroModulo = false;
        });
    }

    public cancelar(): void {
        this.renderedCadastro = false;
    }

    public cancelarModulo(): void {
        this.renderedCadastroModulo = false;
    }

    public deletar(record: Metodo): void {
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
