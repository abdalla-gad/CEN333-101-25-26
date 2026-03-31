import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { MLoginComponent } from "../../m-framework/components/m-login/m-login.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-cropguard-login',
  standalone: true,
  imports: [MContainerComponent, MLoginComponent],
  templateUrl: './cropguard-login.component.html',
  styleUrl: './cropguard-login.component.css'
})
export class CropguardLoginComponent {

  constructor (private router: Router){}

  onLoginSuccess(){
    
    localStorage.setItem('cropguard_auth','true');
    this.router.navigateByUrl('/cropguard');
  }
}
