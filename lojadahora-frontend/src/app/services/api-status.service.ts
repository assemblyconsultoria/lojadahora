import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, catchError, switchMap, startWith, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiStatusService {

    // Pinga o backend a cada 10 segundos
    readonly isOnline$: Observable<boolean> = timer(0, 10000).pipe(
        switchMap(() =>
            this.http.get('/api/clientes', { observe: 'response' }).pipe(
                map(() => true),
                catchError(() => of(false))
            )
        ),
        startWith(false),
        distinctUntilChanged(),
        shareReplay(1)
    );

    constructor(private http: HttpClient) { }
}
