import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PowerPlantComponent } from './features/power-plant/power-plant.component';
export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'powerplant',component:PowerPlantComponent}
 
];
