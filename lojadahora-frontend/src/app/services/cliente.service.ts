import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private apiUrl = '/api/clientes';

    constructor(private http: HttpClient) { }

    listar(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    adicionar(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }

    atualizar(id: number, cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
    }

    remover(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
