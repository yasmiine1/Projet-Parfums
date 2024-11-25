import { Component,inject ,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parfum } from '../../classes/parfum';

import { ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ParFemmeService } from '../../services/par-femme.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-femme-selected',
  standalone: true,
  imports: [RouterLink,DatePipe,UpperCasePipe,TitleCasePipe],
  templateUrl: './femme-selected.component.html',
  styleUrl: './femme-selected.component.css'
})
export class FemmeSelectedComponent implements OnInit {

  private readonly parfumServiceF:ParFemmeService=inject(ParFemmeService);
  parfumsF:Parfum[]=[];
  lesParfumsF$!:Observable<Parfum[]>;
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
idParfumF!:String;
  ngOnInit(): void {
    this.idParfumF=this.activatedRoute.snapshot.params["idf"];
    this.parfumServiceF.getParfums().subscribe((data: Parfum[])=>this.parfumsF=data)
    this.lesParfumsF$=this.parfumServiceF.getParfums();
  }
}
