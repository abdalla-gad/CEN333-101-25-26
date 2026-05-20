import { Component, ViewChild, ElementRef } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GeminiService } from '../../services/gemini.service';

interface circuitAnalysis {

  circuitType: string
  components:{id:string, type:string,value:number,unit:string}[]
  totals: {totalResistance:number, totalCurrent:number, totalPower: number}
  voltageDrops: {id:string, voltage:number}[]
  explanation: string
  confidence: string
}
@Component({
  selector: 'app-schematicscan',
  standalone: true,
  imports: [MContainerComponent],
  templateUrl: './schematicscan.component.html',
  styleUrl: './schematicscan.component.css'
})
export class SchematicscanComponent {

  constructor(private gemini: GeminiService){}
  imagePreview: string = "";
  imageBase64: string = "";
  imageType: string = "";
  response: circuitAnalysis | null = null;

  @ViewChild( 'video ') videoElement !: ElementRef <HTMLVideoElement >;
  @ViewChild( 'canvas ') canvasElement !: ElementRef <HTMLCanvasElement >;

  stream: MediaStream | null = null;
  prompt: string = `You are electrical circuit analyst. 
  The image shows circuit schematic. Analyse it and return a single JSON:

  {

  circuitType: series or parallel or mixed
  components:{id:R1, type:resistor,value:30k,unit:ohm}[]
  totals: {totalResistance:30k, totalCurrent:40k, totalPower: 40watt}
  voltageDrops: {id:R1, voltage:2V}[]
  explanation: 2 to 4 sentences explaining the solution
  confidence: low or medium or high
}
  `;
onImport(event:any){
  const file: File = event.target.files[0];
  console.log(file);

  this.imageType = file.type;
  console.log(this.imageType);
  const reader = new FileReader();

  reader.onload = () => {
    this.imagePreview = reader.result as string;
    this.imageBase64 = this.imagePreview.split(',')[1];
    console.log(this.imagePreview);
    console.log(this.imageBase64);
  }
  reader.readAsDataURL(file);
}

async analyzeImageButton(){
  
const reply = await this.gemini.analyzeImage(this.prompt,this.imageBase64,this.imageType);
this.response = JSON.parse(reply) as circuitAnalysis
console.log(reply)
console.log(this.response)
  
}

async startCamera(){
  console.log(this.videoElement);
  this.stream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode:'environment'}
  });
  this.videoElement.nativeElement.srcObject = this.stream;
}

stopCamera(){
  console.log(this.stream);
  if(this.stream){
  this.stream.getTracks().forEach(track => track.stop());
  this.stream = null;
  }
}

captureImage(){
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx!.drawImage(video,0,0,canvas.width,canvas.height);
  const imageUrl = canvas.toDataURL('image/jpeg',0.9);
  console.log(imageUrl)
  this.imagePreview = imageUrl;
  this.imageBase64 = this.imagePreview.split(',')[1];
  this.imageType = 'image/jpeg';
}



}
