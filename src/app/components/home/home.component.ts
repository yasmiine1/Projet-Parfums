import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiComponent } from '../api/api.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApiComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
