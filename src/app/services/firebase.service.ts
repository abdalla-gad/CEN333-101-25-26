import { Injectable } from '@angular/core';
import { initializeApp} from 'firebase/app';
import {getDatabase, ref, push, onValue} from 'firebase/database';
import {environment} from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db: any;

  constructor() { 
    const app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(app);
  }

  saveReading(age:number,heartRate:number): Promise<void>{
    const readingsref = ref(this.db,'readings');
    return push(readingsref,{
      age:age,
      heartRate:heartRate,
      timestamp:new Date().toISOString()
    }).then(()=>{});

  }

  getReading(callback: (readings: any[])=>void){
    const readingsref = ref(this.db,'readings');
    onValue(readingsref,
      (snapshot)=>{
        const data = snapshot.val();
        if(data){
          const readings = Object.keys(data).map(
            key => ({
              id:key,
              ...data[key]
            })
          );
          callback(readings);
        }else{
          callback([]);
        }
      }
    )
  }
}
