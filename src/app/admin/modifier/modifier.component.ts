import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { AdminService } from '../../services/admin.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css'
})
export class ModifierComponent implements OnInit {
 
    parfumForm!: FormGroup;
    parfumId!: string;
  
    constructor(
      private route: ActivatedRoute,
      private adminService: AdminService,
      private router: Router,
      private fb: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.parfumId = this.route.snapshot.paramMap.get('id')!;
      this.adminService.getParfums().subscribe((parfums: any[]) => {
        const parfum = parfums.find(p => p.id === this.parfumId);
        this.parfumForm = this.fb.group({
          nom: [parfum.nom, Validators.required],
          prix: [parfum.prix, [Validators.required, Validators.min(0)]],
          photo: [parfum.photo, Validators.required],
          dateSortie: [parfum.dateSortie, Validators.required],  // Nouveau champ
          description: [parfum.description, Validators.required] // Nouveau champ
        });
         
      });
    }
  
   
    onUpdate(): void {
      if (this.parfumForm.valid) {
        const updatedParfum: Parfum = {
          id: this.parfumId,
          ...this.parfumForm.value
        };
        this.adminService.updateParfum(updatedParfum).subscribe(() => {
          alert("parfum modifié avec succès")
          this.router.navigate(['/user/hAdmin/adF']); // Redirection vers la liste des parfums
        }, error => {
          console.error('Erreur lors de la mise à jour du parfum', error);
        });
      }
    }
  }

