import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PowerPlantComponent } from './features/power-plant/power-plant.component';
import { CropguardComponent } from './features/cropguard/cropguard.component';
import { CropguardLoginComponent } from './features/cropguard-login/cropguard-login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'powerplant',component:PowerPlantComponent},
    {path:'cropguard', component:CropguardComponent, canActivate:[authGuard]},
    {path:'cropguardlogin',component:CropguardLoginComponent}
];
