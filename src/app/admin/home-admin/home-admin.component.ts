import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../services/admin.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [MenuAdminComponent,RouterLink],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
 
}
