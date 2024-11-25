import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  standalone: true
})
export class StarRatingPipe implements PipeTransform {

  transform(rating: number, maxRating: number = 5): string {
    let stars = '';
    
    // Créer les étoiles pleines
    for (let i = 0; i < Math.floor(rating); i++) {
      stars += '★'; // étoile pleine
    }
    
    // Ajouter une demi-étoile si nécessaire
    if (rating % 1 !== 0) {
      stars += '☆'; // demi-étoile
    }
    
    // Ajouter les étoiles vides restantes
    for (let i = stars.length; i < maxRating; i++) {
      stars += '☆'; // étoile vide
    }
    
    return stars;
  }
}