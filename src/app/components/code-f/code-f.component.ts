
import { ParFemmeService } from '../../services/par-femme.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Parfum } from '../../classes/parfum';
import { NgClass } from '@angular/common';
import { ParfumFemmeComponent } from '../parfum-femme/parfum-femme.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-code-f',
  standalone: true,
  imports: [ParfumFemmeComponent,RouterLink,NgClass,CurrencyPipe],
  templateUrl: './code-f.component.html',
  styleUrl: './code-f.component.css'
})
export class CodeFComponent implements OnInit {
  private readonly parfumService:ParFemmeService=inject(ParFemmeService);
  parfums:Parfum[]=[];
  lesParfums$!:Observable<Parfum[]>;
  
  ngOnInit(): void {
    this.parfumService.getParfums().subscribe((data: Parfum[])=>this.parfums=data)
    this.lesParfums$=this.parfumService.getParfums();
  }
}