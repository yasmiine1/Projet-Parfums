
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parfum } from '../classes/parfum';

const URL="http://localhost:1000/parfumsF";
@Injectable({
  providedIn: 'root'
})
export class ParFemmeService {

  constructor() { }
  private readonly http:HttpClient=inject(HttpClient);
  public getParfums():Observable<Parfum[]>{
  return this.http.get<Parfum[]>(URL);
  }

  
}

