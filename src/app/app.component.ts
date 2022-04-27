import { Component } from '@angular/core';
import { ApiService } from './Service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-commerce-app';

  constructor(public api: ApiService) {}
}
