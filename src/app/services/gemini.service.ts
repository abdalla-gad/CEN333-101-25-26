import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
  async generateText(prompt: string): Promise<string>{
    const url = this.endpoint + '?key=' + environment.geminiApiKey;

    const body = {
      contents: [{
        parts: [{text:prompt}]
      }]
    };

    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    })
    console.log(response);
    const data = await response.json();
    console.log(data);
    const text = data.candidates[0].content.parts[0].text;
    console.log(text);
    return text || 'no response'
  }

  async analyzeImage(prompt:string, image:string,type:string):Promise<string>{
    const url = this.endpoint + '?key=' + environment.geminiApiKey;

    const body = {
      contents: [{
        parts: [
          {inlineData: {data:image, mimeType: type}},
          {text:prompt}]
      }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    })
    console.log(response);
    const data = await response.json();
    console.log(data);
    const text = data.candidates[0].content.parts[0].text;
    console.log(text);
    return text || 'no response'
  }
}
