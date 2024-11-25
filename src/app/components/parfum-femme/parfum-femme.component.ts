import { Component,Input } from '@angular/core';
import { Parfum } from '../../classes/parfum';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { StarRatingPipe } from '../star-rating.pipe';

@Component({
  selector: 'app-parfum-femme',
  standalone: true,
  imports: [NgClass,RouterLink,CurrencyPipe,StarRatingPipe],
  templateUrl: './parfum-femme.component.html',
  styleUrl: './parfum-femme.component.css'
})
export class ParfumFemmeComponent {
  @Input('parfumF') pf!:Parfum;
}
