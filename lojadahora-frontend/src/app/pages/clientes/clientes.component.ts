import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
    selector: 'app-clientes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    clientes: Cliente[] = [];
    clienteForm: Cliente = { nome: '', email: '', telefone: '', cpf: '' };
    editandoId: number | null = null;
    mensagem: string = '';
    erro: boolean = false;

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.carregarClientes();
    }

    carregarClientes(): void {
        this.clienteService.listar().subscribe({
            next: (data) => this.clientes = data,
            error: () => this.exibirMensagem('Erro ao carregar clientes.', true)
        });
    }

    salvar(): void {
        if (this.editandoId !== null) {
            const id = this.editandoId;
            this.clienteService.atualizar(id, this.clienteForm).subscribe({
                next: (clienteAtualizado) => {
                    const index = this.clientes.findIndex(c => c.id === id);
                    if (index !== -1) this.clientes[index] = clienteAtualizado;
                    this.exibirMensagem('Cliente atualizado com sucesso!', false);
                    this.resetarFormulario();
                },
                error: () => this.exibirMensagem('Erro ao atualizar cliente.', true)
            });
        } else {
            this.clienteService.adicionar(this.clienteForm).subscribe({
                next: (clienteSalvo) => {
                    this.clientes.push(clienteSalvo);
                    this.exibirMensagem('Cliente cadastrado com sucesso!', false);
                    this.resetarFormulario();
                },
                error: () => this.exibirMensagem('Erro ao cadastrar cliente.', true)
            });
        }
    }

    editar(cliente: Cliente): void {
        this.editandoId = cliente.id!;
        this.clienteForm = { ...cliente };
    }

    remover(id: number): void {
        if (confirm('Deseja remover este cliente?')) {
            this.clienteService.remover(id).subscribe({
                next: () => {
                    this.clientes = this.clientes.filter(c => c.id !== id);
                    this.exibirMensagem('Cliente removido com sucesso!', false);
                },
                error: () => this.exibirMensagem('Erro ao remover cliente.', true)
            });
        }
    }

    cancelarEdicao(): void {
        this.resetarFormulario();
    }

    private resetarFormulario(): void {
        this.clienteForm = { nome: '', email: '', telefone: '', cpf: '' };
        this.editandoId = null;
    }

    private exibirMensagem(msg: string, isErro: boolean): void {
        this.mensagem = msg;
        this.erro = isErro;
        setTimeout(() => this.mensagem = '', 3000);
    }
}
