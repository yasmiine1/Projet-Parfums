import { Component,Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Parfum } from '../../classes/parfum';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { StarRatingPipe } from '../star-rating.pipe';

@Component({
  selector: 'app-parfum-homme',
  standalone: true,
  imports: [NgClass,RouterLink,CurrencyPipe,StarRatingPipe],
  templateUrl: './parfum-homme.component.html',
  styleUrl: './parfum-homme.component.css'
})
export class ParfumHommeComponent {
  @Input('parfumH') ph!:Parfum;
}
