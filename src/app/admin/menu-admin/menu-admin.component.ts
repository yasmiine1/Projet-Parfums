import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  authservice:AdminService=inject(AdminService);
  router:Router=inject(Router);
  onDisconnect(){
    this.authservice.logout();
    this.router.navigate(['/admin'])
  }
}
