import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css'
})
export class ApiComponent implements OnInit{
  private readonly http: HttpClient = inject(HttpClient);
  product: any;

  ngOnInit(): void {
    // URL de l'API d'exemple (produits cosmétiques)
    const apiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log(data);
        this.product = data[0]; // Accéder au premier produit
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
}