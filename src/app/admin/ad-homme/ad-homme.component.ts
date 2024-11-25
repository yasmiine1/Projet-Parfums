



import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { NgClass } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ParHommeService } from '../../services/par-homme.service';
import { ParfumHommeComponent } from '../../components/parfum-homme/parfum-homme.component';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ad-homme',
  standalone: true,
  imports: [ParfumHommeComponent,RouterLink,NgClass,CurrencyPipe,FormsModule],
  templateUrl: './ad-homme.component.html',
  styleUrl: './ad-homme.component.css'
})
export class AdHommeComponent implements OnInit{
  private readonly parfumService:ParHommeService=inject(ParHommeService);
  parfums:Parfum[]=[];
  filteredParfums: Parfum[] = []; 
  searchTerm: string = ''; // Variable pour le terme de recherche
  lesParfums$!:Observable<Parfum[]>;
  private readonly adminService:AdminService=inject(AdminService);
  
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
    this.adminService.suppH(parfumId).subscribe({
      next: () => {
        // On success, remove the parfum from the local list
        this.parfums = this.parfums.filter(pH => pH.id !== parfumId);
        this.filteredParfums = this.filteredParfums.filter(pH => pH.id !== parfumId); // Mise à jour de la liste filtrée
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


