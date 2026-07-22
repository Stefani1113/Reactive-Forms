import { Component, Input } from '@angular/core';
import { UserSummary } from '../login/login.component';

@Component({
  selector: 'app-data',
  standalone: false,
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

  @Input() userData: UserSummary | null = null;
}
