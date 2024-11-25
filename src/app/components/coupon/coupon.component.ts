import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { ParFemmeService } from '../../services/par-femme.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule],
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  parfums: Parfum[] = [];
  parfumFService: ParFemmeService = inject(ParFemmeService);
  readonly fb: FormBuilder = inject(FormBuilder);
  parForm!: FormGroup;

  ngOnInit(): void {
    this.parForm = this.fb.nonNullable.group({
      code: ['', [Validators.required, Validators.pattern('YM2024')]] // ajouter une validation de pattern ici
    });
  }

  valider(): void {
    if (this.parForm.valid) {
      console.log('Code promo valide:', this.parForm.value.code);
    } else {
      console.log('Code promo invalide');
    }
  }

  // Pour gérer l'état du lien basé sur la validation du formulaire
  get isFormValid(): boolean {
    return this.parForm.valid;
  }
}