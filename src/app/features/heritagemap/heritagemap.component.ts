import { Component, ViewChild } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap, MapMarker, MapInfoWindow, MapPolyline } from '@angular/google-maps';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
@Component({
  selector: 'app-heritagemap',
  standalone: true,
  imports: [MContainerComponent, GoogleMap, MapMarker, MapInfoWindow,FormsModule, MapPolyline],
  templateUrl: './heritagemap.component.html',
  styleUrl: './heritagemap.component.css'
})
export class HeritagemapComponent {
  heatmapPoints: any[] = [];
  showHeatmap:boolean=false;
  isExplaining: boolean=false;
  
  newSite: string='';
  newEra: string='';
  newCategory: string='';

  clickedLat: number=0;
  clickedLng:number=0;
  routePath:{lat:number,lng:number}[]=[];
  sites = [
    {
      name: 'Qasr Al Hosn',
      category: 'Fort',
      era: 'Pre-Islamic',
      lat: 24.4707,
      lng: 54.3697,
      description: ''
    },
    {
      name: 'Sheikh Zayed Grand Mosque',
      category: 'Mosque',
      era: 'Modern',
      lat: 24.4128,
      lng: 54.4748,
      description: ''
    },
    {
      name: 'Louvre Abu Dhabi',
      category: 'Museum',
      era: 'Modern',
      lat: 24.5347,
      lng: 54.3982,
      description: ''
    },
    {
      name: 'Qasr Al Watan',
      category: 'Palace',
      era: 'Modern',
      lat: 24.4644,
      lng: 54.3414,
      description: ''
    }
  ];

  mapCenter = {lat:24.4539, lng:54.3773};
  selectedSite: any;
  constructor(private geminiService: GeminiService){}

  ngOnInit(){
    this.captureUserLocation();
  }

  @ViewChild(MapInfoWindow) infoWindow!:MapInfoWindow;

  async testGemini(){
    try{
      const reply = await this.geminiService.generateText(
        'Say hello in 3 different languages, one per line'
      );
      alert(reply);
    }catch(err){
      alert(err);
    }
  }

  captureUserLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      this.mapCenter={lat:position.coords.latitude,lng:position.coords.longitude};

    });
  }

  getMarkerColor(category: string): string{

    if(category==='Fort') return '#c62828';
    if(category=== 'Mosque') return '#2e7d32';
    if(category=== 'Palace') return '#1565c0';
    if(category=== 'Museum') return '#f9a825'
    return ''
  }

  onMarkerClick(site:any, marker: MapMarker){
    this.selectedSite = site;
    this.infoWindow.open(marker);
    
  }
  onMapClick(event:any){
    this.clickedLat = event.latLng.lat();
    this.clickedLng = event.latLng.lng();
    console.log(this.clickedLat);
    console.log(this.clickedLng);
  }

  addSite(){
    this.sites.push({
      name: this.newSite,
      era: this.newEra,
      category:this.newCategory,
      description:'',
      lat:this.clickedLat,
      lng:this.clickedLng
    })
  }

  async explainSite(site:any){
    this.isExplaining=true;

    const prompt = `You are a cultural heritage guide. 
    Write a 3-sentence description of a 
    visitor about the following heritage site
    -Name: ${site.name}
    -Category: ${site.category}
    -Era: ${site.era}
    Keep the tone informative and accessible`

    const description = await this.geminiService.generateText(prompt);
    site.description = description;

    this.isExplaining=false;

  }

  async generateRouteToSite(site:any){
    this.routePath = [
      {lat:this.mapCenter.lat, lng:this.mapCenter.lng },
      {lat:site.lat, lng:site.lng}

    ]

  }
  private overlay = new GoogleMapsOverlay({});

  onMapReady(map: google.maps.Map) {
    this.overlay.setMap(map);  
    
  }
  
  buildHeatMap() {
    console.log("building heatmap")
    const points = this.sites.map(site => ({
      position: [site.lng, site.lat],  
      weight: 1
    }));
  
    const heatmap = new HeatmapLayer({
      id: 'heatmap',
      data: points,
      getPosition: (d: any) => d.position,
      getWeight: (d: any) => d.weight,
      radiusPixels: 30,   
      opacity: 0.7,
    });
  
    this.overlay.setProps({ layers: [heatmap] });
    this.showHeatmap = true;
  }

}
