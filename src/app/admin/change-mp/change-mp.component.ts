import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-change-mp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-mp.component.html',
  styleUrl: './change-mp.component.css'
})
export class ChangeMpComponent {
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly adminService: AdminService = inject(AdminService);
  readonly router: Router = inject(Router);

  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required], // Mot de passe actuel
      newPassword: ['', [Validators.required, Validators.minLength(6)]], // Nouveau mot de passe
      confirmPassword: ['', Validators.required], // Confirmation du nouveau mot de passe
    });
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
  public isValidCP(){
    return this.changePasswordForm.get('currentPassword')?.errors?.['required']&& this.changePasswordForm.get('currentPassword')?.touched;
  }
  public isValidNP(){
    return this.changePasswordForm.get('newPassword')?.errors?.['required']&& this.changePasswordForm.get('newPassword')?.touched;
  }
  public isValidNPL(){
    return this.changePasswordForm.get('newPassword')?.errors?.['minlength']&& this.changePasswordForm.get('newPassword')?.touched;
  }
  public isValidCNP(){
    return this.changePasswordForm.get('confirmPassword')?.errors?.['required']&& this.changePasswordForm.get('confirmPassword')?.touched;
  }

  onSubmit(): void {
    const currentPassword = this.changePasswordForm.value.currentPassword;
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      alert('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }

    this.adminService.getAdmin().subscribe(
      (admins) => {
        const admin = admins.find((a) => a.password === currentPassword);
        if (admin) {
          admin.password = newPassword; // Mise à jour locale du mot de passe
          // Appeler le service pour mettre à jour le mot de passe côté serveur
          this.adminService.updateAdmin(admin).subscribe(() => {
            alert('Mot de passe changé avec succès.');
            this.router.navigate(['/admin']); // Redirection vers la page d'administration
          });
        } else {
          alert('Le mot de passe actuel est incorrect.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des administrateurs', error);
      }
    );
  }
}

