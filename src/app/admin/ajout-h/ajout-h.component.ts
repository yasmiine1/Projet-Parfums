import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Parfum } from '../../classes/parfum';
import { AdminService } from '../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ajout-h',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './ajout-h.component.html',
  styleUrl: './ajout-h.component.css'
})
export class AjoutHComponent {
  parfums: Parfum[] = [];
  ajService: AdminService = inject(AdminService);
  readonly fb: FormBuilder = inject(FormBuilder);
  ajForm!: FormGroup;
  ngOnInit(): void {

    this.ajForm = this.fb.nonNullable.group({
      
      id: ['',Validators.required],
      nom: ['',Validators.required],
      photo:['',Validators.required],
      prix: [0 , [Validators.required,Validators.min(20)]],
      dispo: [true],
      description:['',Validators.required],
      dateSortie:['',[Validators.required, Validators.pattern(/^(1[0-9]{3}|[2-9][0-9]{3})\/([1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])$/)]]
      
    })
   
  }
  public get ajId(){
    return this.ajForm.get('id');
  }
  public get ajnom(){
    return this.ajForm.get('nom');
  }
  public get ajdecs(){
    return this.ajForm.get('description');
  }
  public get ajphoto(){
    return this.ajForm.get('photo');
  }
  public get ajprix(){
    return this.ajForm.get('prix');
  }
  public get ajdateS(){
    return this.ajForm.get('dateS');
  }
  public isValidId(){
    return this.ajForm.get('id')?.errors?.['required']&& this.ajForm.get('id')?.touched;
  }
  public isValidNom(){
    return this.ajForm.get('nom')?.errors?.['required']&& this.ajForm.get('nom')?.touched;
  }
  public isValidDesc(){
    return this.ajForm.get('description')?.errors?.['required']&& this.ajForm.get('description')?.touched;
  }
  public isValidDate(){
    return this.ajForm.get('dateSortie')?.errors?.['required']&& this.ajForm.get('dateSortie')?.touched;
  }
  public isValidDateS(){
    return this.ajForm.get('dateSortie')?.errors?.['pattern']&& this.ajForm.get('dateSortie')?.touched;
  }
  public isValidPhoto(){
    return this.ajForm.get('photo')?.errors?.['required']&& this.ajForm.get('photo')?.touched;
  }
  public isValidPrix(){
    return this.ajForm.get('prix')?.errors?.['required']&& this.ajForm.get('prix')?.touched;
  }
  public isValidPrixM(){
    return this.ajForm.get('prix')?.errors?.['min']&& this.ajForm.get('prix')?.touched;
  }
  get isFormValid(): boolean {
    return this.ajForm.valid;
  }
  onSubmit(): void {
    if (this.ajForm.valid) {
      const newParfum: Parfum = this.ajForm.value; // Get form values and create a Parfum object
      this.ajService.addParfumH(newParfum).subscribe({
        next: (response: any) => {
          console.log('Parfum ajouté avec succès:', response);
          // Fetch updated parfums list after addition
          this.fetchParfums();
          alert("parfum ajouté avec succès")
        },
        error: (err: any) => {
          console.error('Erreur lors de l\'ajout du parfum:', err);
        }
      });
    }
  }

  // Fetch the list of parfums
  fetchParfums(): void {
    this.ajService.getParfumsH().subscribe({
      next: (data: any) => {
        this.parfums = data;
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des parfums:', err);
      }
    });
  }
}

