import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { MMainMenuComponent } from "../../m-framework/components/m-main-menu/m-main-menu.component";
import { FormsModule } from '@angular/forms';
import { MTimeseriesChartComponent } from "../../m-framework/components/m-timeserieschart/m-timeserieschart.component";

import { MTableComponent } from '../../m-framework/components/m-table/m-table.component';
import { MSearchButtonComponent } from '../../m-framework/components/m-search-button/m-search-button.component';
@Component({
  selector: 'app-cropguard',
  standalone: true,
  imports: [MContainerComponent, MMainMenuComponent, FormsModule, MTimeseriesChartComponent, MTableComponent, MSearchButtonComponent],
  templateUrl: './cropguard.component.html',
  styleUrl: './cropguard.component.css'
})
export class CropguardComponent {

  activeSection: string='Log Reading';

  dateValue: string='';
  phValue: number=0;
  moistureValue: number=0;


  phReadings: {date:string,value:number}[]=[];
  moistureReadings: {date:string,value:number}[]=[];
  filterTerm:string = '';
  validationError:string ='';
  constructor(){
    const ph = localStorage.getItem('phValues');
    this.phReadings = ph ? JSON.parse(ph): [];

    const moisture = localStorage.getItem('moistureValues');
    this.moistureReadings = moisture ? JSON.parse(moisture): [];
  }

  onMenuClick(item: any){
    this.activeSection = item;
  }

  updateReading(
    readings: {date:string,value:number}[],
    date: string,
    value: number
  ):{date:string,value:number}[]{

    console.log(readings);
    let filtered = readings.filter(r => r.date!=date);
    console.log(filtered);
    filtered.push({date,value});
    console.log(filtered);
    return filtered.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());

  }
  isValid(): boolean{
    if(!this.dateValue){
      this.validationError = "Please insert a date"
      return false;
    }
    if(isNaN(this.phValue) || this.phValue<0 || this.phValue>14){
      this.validationError = "pH value must be between 0 and 14"
      return false;
    }
    if(isNaN(this.moistureValue) || this.moistureValue<0 || this.moistureValue>100){
      this.validationError = "Moisture value must be between 0 and 100"
      return false;
    }
    this.validationError ='';
    return true;

  }
  saveReading(){
    if(this.isValid()){

    this.phReadings = this.updateReading(this.phReadings,this.dateValue,this.phValue);
    console.log(this.phReadings);
    localStorage.setItem('phValues',JSON.stringify(this.phReadings));

    this.moistureReadings = this.updateReading(this.moistureReadings,this.dateValue,this.moistureValue);
    console.log(this.moistureReadings);
    localStorage.setItem('moistureValues',JSON.stringify(this.moistureReadings));
    }
  }
}