import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Reading } from './reading.model';
import { MContainerComponent } from '../../m-framework/components/m-container/m-container.component';
import { MTableComponent } from '../../m-framework/components/m-table/m-table.component';
import { MSearchButtonComponent } from '../../m-framework/components/m-search-button/m-search-button.component';
import { polynomialRegression, evaluatePolynomial } from './regression.helper';
import { MRegressionchartComponent } from '../../m-framework/components/m-regressionchart/m-regressionchart.component';

@Component({
  selector: 'app-vitaltrend',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MContainerComponent, MTableComponent, MSearchButtonComponent,MRegressionchartComponent
  ],
  templateUrl: './vitaltrend.component.html',
  styleUrl: './vitaltrend.component.css'
})
export class VitaltrendComponent implements OnInit {

  arrayofobject: {date: string, heartrate:number,}[] = [];
  ageInput: number = 0;
  heartRateInput: number = 0;
  readings: Reading[] = [];
  filterTerm: string = '';
  selectedDegree: number = 1;

  ageArray: number[] = [];
  heartRateArray: number[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getReadings((data) => {
      this.readings = data;
      this.ageArray = [...data.map(r => r.age)];
      this.heartRateArray = [...data.map(r => r.heartRate)];
    });
    
  }

  saveReading() {
    this.firebaseService.saveReading(
      this.ageInput, this.heartRateInput
    );
    this.ageInput = 0;
    this.heartRateInput = 0;
  }

  testRegression() {
    if (this.readings.length < 2) return;
  
    const xData = this.readings.map(r => r.age);
    const yData = this.readings.map(r => r.heartRate);
  
    const coeffs = polynomialRegression(xData, yData, 2);
    console.log('Coefficients:', coeffs);
  
    const predicted = evaluatePolynomial(coeffs, 40);
    console.log('Predicted heart rate at age 40:', predicted);
  }

}