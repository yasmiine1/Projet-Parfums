import { Routes } from '@angular/router';
import { AdFemmeComponent } from './admin/ad-femme/ad-femme.component';
import { AdHommeComponent } from './admin/ad-homme/ad-homme.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AjoutHComponent } from './admin/ajout-h/ajout-h.component';
import { AjouterComponent } from './admin/ajouter/ajouter.component';
import { ChangeMpComponent } from './admin/change-mp/change-mp.component';
import { FemmeSelectedComponent } from './admin/femme-selected/femme-selected.component';
import { guardGuard } from './admin/guard.guard';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HommeSelectedComponent } from './admin/homme-selected/homme-selected.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import { ModifierHComponent } from './admin/modifier-h/modifier-h.component';
import { ModifierComponent } from './admin/modifier/modifier.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CodeFComponent } from './components/code-f/code-f.component';
import { CodeHComponent } from './components/code-h/code-h.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ListeParfumFemmeComponent } from './components/liste-parfum-femme/liste-parfum-femme.component';
import { ListeParfumHommeComponent } from './components/liste-parfum-homme/liste-parfum-homme.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParfumFSelectedComponent } from './components/parfum-f-selected/parfum-f-selected.component';
import { ParfumHSelectedComponent } from './components/parfum-h-selected/parfum-h-selected.component';
import { ParfumsComponent } from './components/parfums/parfums.component';

export const routes: Routes = [
  
    { path: '', title: 'Parfums menu', component: MenuComponent ,
    children:[    
        { path: 'home', title: 'Home', component: HomeComponent },
        { path: 'code', title: 'Code Promos', component: CouponComponent },
        { path: 'parfums/:idh', title: 'Parfum Homme Sélectionné', component: ParfumHSelectedComponent },
        { path: 'parfums/f/:idf', title: 'Parfum Femme Sélectionné', component: ParfumFSelectedComponent },
        { path: 'code/parfums/h', title: 'Parfums Homme', component: CodeHComponent },
        { path: 'code/parfums/f', title: 'Parfums Femme', component: CodeFComponent },
        { path: 'aboutus', title: 'aboutus', component:AboutusComponent },
    { path: 'parfums', title: 'Liste Parfums ', component:ParfumsComponent,
    children:[    

        { path: 'femme/f', title: 'Liste Parfums Femme', component: ListeParfumFemmeComponent },
        { path: 'homme/h', title: 'Liste Parfums Homme', component: ListeParfumHommeComponent },
        { path: '', redirectTo: 'femme/f', pathMatch: 'full' }, 
    ] }, 
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]},
        

   
    
    
    { path: 'user', title: ' menu admin', component: MenuAdminComponent,
    children:[
        { path: 'hAdmin/adF/:idf', title: 'Femme Sélectionnée', component: FemmeSelectedComponent },
        { path: 'hAdmin/adH/:idh', title: 'Homme Sélectionné', component: HommeSelectedComponent },
        { path: 'modifier-parfum/:id', title: 'Modifier Parfum femme', component: ModifierComponent },
        { path: 'modifier-parfumh/:idh', title: 'Modifier Parfum homme', component: ModifierHComponent },
        { path: 'hAdmin', title: 'Home Admin', component: HomeAdminComponent },
        { path: 'ajout', title: 'Ajouter Parfum femme', component: AjouterComponent },
        { path: 'ajoutH', title: 'Ajouter Parfum homme', component: AjoutHComponent },
        { path: 'hAdmin/adF', title: 'Admin Femme', component: AdFemmeComponent },
        { path: 'hAdmin/adH', title: 'Admin Homme', component: AdHommeComponent },
        { path: '', redirectTo: 'hAdmin', pathMatch: 'full' },
    ],canActivate:[guardGuard]

},
    
    { path: 'admin', title: 'Admin', component: AdminComponent },
    { path: 'changeMdp', component: ChangeMpComponent }, // Route pour changer le mot de passe
 
 { path: '**', title: 'Erreur', component: ErrorComponent }
];