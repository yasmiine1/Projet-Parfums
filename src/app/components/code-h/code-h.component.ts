import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { ParHommeService } from '../../services/par-homme.service';
import { ParfumHommeComponent } from '../parfum-homme/parfum-homme.component';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-code-h',
  standalone: true,
  imports: [ParfumHommeComponent,RouterLink,NgClass,CurrencyPipe],
  templateUrl: './code-h.component.html',
  styleUrl: './code-h.component.css'
})
export class CodeHComponent {
  private readonly parfumService:ParHommeService=inject(ParHommeService);
  parfums:Parfum[]=[];
  lesParfums$!:Observable<Parfum[]>;
  
  ngOnInit(): void {
    this.parfumService.getParfums().subscribe((data: Parfum[])=>this.parfums=data)
    this.lesParfums$=this.parfumService.getParfums();
  }

}
