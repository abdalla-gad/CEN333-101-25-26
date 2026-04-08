import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { MAhaComponent } from '../../m-framework/components/m-aha/m-aha.component';
import { MFormUlaComponent } from '../../m-framework/components/m-form-ula/m-form-ula.component';
import { MResultBoxComponent } from '../../m-framework/components/m-result-box/m-result-box.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-power-plant',
  standalone: true,
  imports: [MContainerComponent, MAhaComponent, MFormUlaComponent, MResultBoxComponent,FormsModule],
  templateUrl: './power-plant.component.html',
  styleUrl: './power-plant.component.css'
})
export class PowerPlantComponent {
loadPercent: number=0
ratedCapacity: number=0;
currentLoad: number=0;
calculated: boolean=false;
fuelType: string='coal';

constructor(){

}
getCondition(value: number): string{
  let threshold = this.getThreshold();

  if(value<40){
    console.log('get condition finished')
    return 'warning'
  } else if (value<=threshold){
    console.log('get condition finished')
    return 'success'
  }else{
    console.log('get condition finished')
  return 'error';
  }
 
}

getThreshold(): number{
  if(this.fuelType==='nuclear') return 75;
  else if(this.fuelType==='coal') return 70;
  else if(this.fuelType==='Solar') return 80;
  else return 90;
}



calculate(){
  this.loadPercent = Math.min(100,(this.currentLoad/this.ratedCapacity)*100);
  this.calculated = true;

}
}
