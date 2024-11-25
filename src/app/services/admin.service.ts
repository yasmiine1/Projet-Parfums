
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Admin } from '../classes/admin';
import { Parfum } from '../classes/parfum';




const URL="http://localhost:1000/admin";
const URLF="http://localhost:1000/parfumsF";
const URLH="http://localhost:1000/parfumsH";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private readonly http:HttpClient=inject(HttpClient);
  public getAdmin():Observable<Admin[]>{
  return this.http.get<Admin[]>(URL);
  }
  getUserById( id:string): Observable<Admin> {
    return this.http.get<Admin>(URL +'/'+id);
  }


  login(login: string, password: string): Observable<boolean> {
    // Admin fictif dans le service
    const admin: Admin = {
      id: 1,
      login: "ym_admin",
      password: "ym2004"
    };
    
    const connected = (login === admin.login && password === admin.password);
    if (connected) {
      localStorage.setItem("state", "connected");
    } else {
      localStorage.setItem("state", "disconnected");
    }
    return of(connected);
  }
  

  logout(){
    localStorage.setItem("state","disconnected")
  }
  public updateAdmin(admin: Admin): Observable<Admin> {
    const updateUrl = `${URL}/${admin.id}`; // Mettre à jour l'URL pour cibler l'admin
    return this.http.put<Admin>(updateUrl, admin); // Envoyer une requête PUT pour mettre à jour l'admin
  }
  

  constructor() { }

  
  
  public suppF(parfumId:String): Observable<void> {  // Use an ID for the delete request
    const deleteUrl = `${URLF}/${parfumId}`; // Adjust URL to include the parfum ID
    return this.http.delete<void>(deleteUrl);
  }
  public suppH(parfumId:String): Observable<void> {  // Use an ID for the delete request
    const deleteUrl = `${URLH}/${parfumId}`; // Adjust URL to include the parfum ID
    return this.http.delete<void>(deleteUrl);
  }
  public addParfum(p:Parfum):Observable<Parfum[]>{
    return this.http.post<Parfum[]>(URLF,p);
  }
  public addParfumH(p:Parfum):Observable<Parfum[]>{
    return this.http.post<Parfum[]>(URLH,p);
  }
  public getParfumsH(): Observable<Parfum[]> {
    return this.http.get<Parfum[]>(URLH);
  }
  public getParfums(): Observable<Parfum[]> {
    return this.http.get<Parfum[]>(URLF);
  }
  public updateParfum(parfum: Parfum): Observable<Parfum> {
    const updateUrl = `${URLF}/${parfum.id}`; // L'URL pour mettre à jour le parfum
    return this.http.put<Parfum>(updateUrl, parfum); // Envoie l'objet parfum complet
  }
  public updateParfumH(parfum: Parfum): Observable<Parfum> {
    const updateUrl = `${URLH}/${parfum.id}`; // L'URL pour mettre à jour le parfum
    return this.http.put<Parfum>(updateUrl, parfum); // Envoie l'objet parfum complet
  }
}
