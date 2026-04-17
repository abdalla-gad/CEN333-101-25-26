import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vitaltrend',
  standalone: true,
  imports: [MContainerComponent],
  templateUrl: './vitaltrend.component.html',
  styleUrl: './vitaltrend.component.css'
})
export class VitaltrendComponent {
  constructor (private firebaseService: FirebaseService, private router: Router){}

  saveReading(){
    this.firebaseService.saveReading(30,100);
  }
}
