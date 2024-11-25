import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Parfum } from '../../classes/parfum';
import { ParHommeService } from '../../services/par-homme.service';
import { ParfumHommeComponent } from '../parfum-homme/parfum-homme.component';

@Component({
  selector: 'app-liste-parfum-homme',
  standalone: true,
  imports: [ParfumHommeComponent,FormsModule],
  templateUrl: './liste-parfum-homme.component.html',
  styleUrl: './liste-parfum-homme.component.css'
})
export class ListeParfumHommeComponent implements OnInit{
  parfums: Parfum[] = [];
  filteredParfums: Parfum[] = []; // Ajout d'une liste filtrée
  searchTerm: string = ''; // Variable pour le terme de recherche
  lesParfums$!: Observable<Parfum[]>;
  binding: Parfum[] = [];
  bindingp: Parfum[] = [];
  minPrice?:number;
  maxPrice?:number;
 


  private readonly parfumService:ParHommeService=inject(ParHommeService);

  
  ngOnInit(): void {
    this.parfumService.getParfums().subscribe((data: Parfum[])=>this.parfums=data)
    this.lesParfums$=this.parfumService.getParfums();
  }onSearch(): void {
    this.onSearchP()
    if(this.maxPrice || this.minPrice){
      this.filteredParfums = this.bindingp.filter(pf =>
        pf.nom.toLowerCase().includes(this.searchTerm)
      );
    }else{
      this.filteredParfums = this.parfums.filter(pf =>
        pf.nom.toLowerCase().includes(this.searchTerm)
      );
    }
    
   
    this.binding=this.filteredParfums
  }
  onSearchP(): void {
    if(this.searchTerm==''){
      this.filteredParfums = this.parfums.filter(pf =>
        (this.minPrice? pf.prix >= this.minPrice:true)
        &&
        (this.maxPrice? pf.prix <= this.maxPrice:true)
      
      );
    }
    else{
    this.filteredParfums = this.binding.filter(pf =>
      (this.minPrice? pf.prix >= this.minPrice:true)
      &&
      (this.maxPrice? pf.prix <= this.maxPrice:true)
    
    );
  }
  this.bindingp=this.filteredParfums
  }}
  
  


