import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ApiStatusService } from './services/api-status.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Loja da Hora';

  constructor(public apiStatus: ApiStatusService) { }
}
