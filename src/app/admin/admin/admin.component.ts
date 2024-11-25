import { Component ,inject,OnInit } from '@angular/core';
import { Admin } from '../../classes/admin';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  admin!: Admin 
  adminService: AdminService = inject(AdminService);
  readonly fb: FormBuilder = inject(FormBuilder);
  adForm!: FormGroup;
  parfums: any;
  readonly router: Router = inject(Router);
  ngOnInit(): void {
    
    this.adForm = this.fb.nonNullable.group({
      login: ['', Validators.required] ,
     mdp: ['', Validators.required]
     
    });
  }
  public get adName(){
    return this.adForm.get('login');
  }
  public get adMdp(){
    return this.adForm.get('mdp');
  }
  public isValidLogin(){
    return this.adForm.get('login')?.errors?.['required']&& this.adForm.get('login')?.touched;
  }
  public isValidMdp(){
    return this.adForm.get('mdp')?.errors?.['required']&& this.adForm.get('mdp')?.touched;
  }

  
  
  get isFormValid(): boolean {
    return this.adForm.valid;
  }
  login(login: string, password: string): void {
    this.adminService.getAdmin().subscribe(
      admins => {
        const admin = admins.find(a => a.login === login && a.password === password);
        if (admin) {
          localStorage.setItem("state", "connected");
          this.router.navigate(['/user']);
        } else {
          localStorage.setItem("state", "disconnected");
          this.router.navigate(['/admin']);
          alert('Login ou mot de passe incorrect');
        }
      },
      error => {
        console.error('Erreur lors de la récupération des admins', error);
      }
    );
  }
  onSubmit(): void{
    
    this.login(this.adForm.value.login, this.adForm.value.mdp);
   }

}
