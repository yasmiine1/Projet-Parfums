import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { AdminService } from '../../services/admin.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-editer-parfum-h',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './modifier-h.component.html',
  styleUrl: './modifier-h.component.css'
})
export class ModifierHComponent implements OnInit {
  formParfum!: FormGroup; // Renommé parfumForm -> formParfum
  idParfum!: string;      // Renommé parfumId -> idParfum

  constructor(
    private routeActive: ActivatedRoute, // Renommé route -> routeActive
    private serviceAdmin: AdminService,  // Renommé adminService -> serviceAdmin
    private routeur: Router,             // Renommé router -> routeur
    private formBuilder: FormBuilder     // Renommé fb -> formBuilder
  ) {}

  ngOnInit(): void {
    this.idParfum = this.routeActive.snapshot.paramMap.get('idh')!; // Utilisation du nouveau nom

    this.serviceAdmin.getParfumsH().subscribe((listeParfums: any[]) => { // parfums -> listeParfums

      const parfumTrouve = listeParfums.find(p => p.id === this.idParfum); // parfum -> parfumTrouve
      if (!parfumTrouve) {
        console.log("Parfum non trouvé");
        return; // Ajout d'un return si le parfum n'est pas trouvé
      }

      this.formParfum = this.formBuilder.group({
        nom: [parfumTrouve.nom, Validators.required],
        prix: [parfumTrouve.prix, [Validators.required, Validators.min(0)]],
        photo: [parfumTrouve.photo, Validators.required],
        dateSortie: [parfumTrouve.dateSortie, Validators.required],  // Nouveau champ
        description: [parfumTrouve.description, Validators.required] // Nouveau champ
      });
    });
  }

  onUpdateH(): void {
    if (this.formParfum.valid) {
      const parfumMiseAJour: Parfum = {
        id: this.idParfum,
        ...this.formParfum.value
      };

      this.serviceAdmin.updateParfumH(parfumMiseAJour).subscribe(() => {
        alert("parfum modifié avec succès")
        this.routeur.navigate(['/user/hAdmin/adH']); // Redirection vers la liste des parfums
      }, erreur => {
        console.error('Erreur lors de la mise à jour du parfum', erreur);
      });
    }
  }
}
