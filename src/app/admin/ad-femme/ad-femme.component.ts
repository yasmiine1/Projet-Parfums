
import { ParfumFemmeComponent } from '../../components/parfum-femme/parfum-femme.component';
import { ParFemmeService } from '../../services/par-femme.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { NgClass } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ad-femme',
  standalone: true,
  imports: [ParfumFemmeComponent,FormsModule,RouterLink,NgClass,CurrencyPipe],
  templateUrl: './ad-femme.component.html',
  styleUrl: './ad-femme.component.css'
})
export class AdFemmeComponent implements OnInit{
  private readonly parfumService: ParFemmeService = inject(ParFemmeService);
  parfums: Parfum[] = [];
  filteredParfums: Parfum[] = [];
  searchTerm: string = '';
  lesParfums$!: Observable<Parfum[]>;
  private readonly adminService: AdminService = inject(AdminService);

  ngOnInit(): void {
    this.parfumService.getParfums().subscribe((data: Parfum[]) => {
      this.parfums = data;
      this.filteredParfums = data; // Initialiser la liste filtrée
    });
    this.lesParfums$ = this.parfumService.getParfums();
  }

  onSupprimer(parfumId: string): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce parfum ?');
  if (confirmation) {
    this.adminService.suppF(parfumId).subscribe({
      next: () => {
        // On success, remove the parfum from the local list
        this.parfums = this.parfums.filter(pf => pf.id !== parfumId);
        this.filteredParfums = this.filteredParfums.filter(pf => pf.id !== parfumId); // Mise à jour de la liste filtrée
      },
      error: (err) => {
        console.error('Error deleting parfum', err);
      }
    });
  }}


  onSearch(): void {
  
      this.filteredParfums = this.parfums.filter(pf =>
        pf.nom.toLowerCase().includes(this.searchTerm)
      );
    }
    
   
 
  }
  
