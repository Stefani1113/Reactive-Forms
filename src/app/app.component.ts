import { Component } from '@angular/core';
import { UserSummary } from './features/form/component/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'formulario';

  registeredData: UserSummary | null = null;

  onUserRegistered(data: UserSummary): void {
    this.registeredData = data;
  }
}
