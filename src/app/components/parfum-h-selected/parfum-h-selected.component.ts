import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parfum } from '../../classes/parfum';
import { ParHommeService } from '../../services/par-homme.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-parfum-h-selected',
  standalone: true,
  imports: [UpperCasePipe,TitleCasePipe,DatePipe,RouterLink],
  templateUrl: './parfum-h-selected.component.html',
  styleUrl: './parfum-h-selected.component.css'
})
export class ParfumHSelectedComponent implements OnInit {

  private readonly parfumService:ParHommeService=inject(ParHommeService);
  parfums:Parfum[]=[];
  lesParfums$!:Observable<Parfum[]>;
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
idParfumH!:String;
  ngOnInit(): void {
    this.idParfumH=this.activatedRoute.snapshot.params["idh"];
    this.parfumService.getParfums().subscribe((data: Parfum[])=>this.parfums=data)
    this.lesParfums$=this.parfumService.getParfums();
  }
  
}
