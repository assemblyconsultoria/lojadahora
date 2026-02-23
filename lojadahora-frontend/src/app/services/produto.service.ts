import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    private apiUrl = '/api/produtos';

    constructor(private http: HttpClient) { }

    listar(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.apiUrl);
    }

    adicionar(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this.apiUrl, produto);
    }

    atualizar(id: number, produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
    }

    remover(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
