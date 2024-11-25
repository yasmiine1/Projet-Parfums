import { Component,inject ,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parfum } from '../../classes/parfum';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParHommeService } from '../../services/par-homme.service';


@Component({
  selector: 'app-homme-selected',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, UpperCasePipe,RouterLink],
  templateUrl: './homme-selected.component.html',
  styleUrl: './homme-selected.component.css'
})
export class HommeSelectedComponent {
  private readonly parfumServiceH:ParHommeService=inject(ParHommeService);
  parfumsH:Parfum[]=[];
  lesParfumsH$!:Observable<Parfum[]>;
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
idParfumH!:String;
  ngOnInit(): void {
    this.idParfumH=this.activatedRoute.snapshot.params["idh"];
    this.parfumServiceH.getParfums().subscribe((data: Parfum[])=>this.parfumsH=data)
    this.lesParfumsH$=this.parfumServiceH.getParfums();
  }
}
