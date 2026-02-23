import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
    selector: 'app-produtos',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

    produtos: Produto[] = [];
    produtoForm: Produto = { nome: '', descricao: '', preco: 0, quantidadeEstoque: 0, categoria: '' };
    editandoId: number | null = null;
    mensagem: string = '';
    erro: boolean = false;

    constructor(private produtoService: ProdutoService) { }

    ngOnInit(): void {
        this.carregarProdutos();
    }

    carregarProdutos(): void {
        this.produtoService.listar().subscribe({
            next: (data) => this.produtos = data,
            error: () => this.exibirMensagem('Erro ao carregar produtos.', true)
        });
    }

    salvar(): void {
        if (this.editandoId !== null) {
            this.produtoService.atualizar(this.editandoId, this.produtoForm).subscribe({
                next: () => {
                    this.exibirMensagem('Produto atualizado com sucesso!', false);
                    this.resetarFormulario();
                    this.carregarProdutos();
                },
                error: () => this.exibirMensagem('Erro ao atualizar produto.', true)
            });
        } else {
            this.produtoService.adicionar(this.produtoForm).subscribe({
                next: () => {
                    this.exibirMensagem('Produto cadastrado com sucesso!', false);
                    this.resetarFormulario();
                    this.carregarProdutos();
                },
                error: () => this.exibirMensagem('Erro ao cadastrar produto.', true)
            });
        }
    }

    editar(produto: Produto): void {
        this.editandoId = produto.id!;
        this.produtoForm = { ...produto };
    }

    remover(id: number): void {
        if (confirm('Deseja remover este produto?')) {
            this.produtoService.remover(id).subscribe({
                next: () => {
                    this.exibirMensagem('Produto removido com sucesso!', false);
                    this.carregarProdutos();
                },
                error: () => this.exibirMensagem('Erro ao remover produto.', true)
            });
        }
    }

    cancelarEdicao(): void {
        this.resetarFormulario();
    }

    private resetarFormulario(): void {
        this.produtoForm = { nome: '', descricao: '', preco: 0, quantidadeEstoque: 0, categoria: '' };
        this.editandoId = null;
    }

    private exibirMensagem(msg: string, isErro: boolean): void {
        this.mensagem = msg;
        this.erro = isErro;
        setTimeout(() => this.mensagem = '', 3000);
    }
}
