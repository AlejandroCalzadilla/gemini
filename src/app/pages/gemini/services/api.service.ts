import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PresciosService } from './precios.service';


@Injectable({
  providedIn: 'root'
})
export class GoogleGeminiProService {

  genIA: any;
  model: any;

   
   constructor(private preciosService:PresciosService){}

  initialize(key: string, config?: any) {

    this.genIA = new GoogleGenerativeAI(key);
    let model = config ? config : { model: 'gemini-1.5-pro-latest' };
    this.model = this.genIA.getGenerativeModel({ model: 'gemini-1.5-pro-latest', systemInstruction: "eres el mejor contratista de bolivia y das los mejores presupuestos para construccion de viviendas" });

  }
 

  
  async generateText(prompt: string) {

    if (!this.model) {
      return;
    } 
    
   

    const result = await this.model.startChat(prompt);
    let text = '';
    const response = await result.response;

    return response.text();

  }


  async entrenamiento(prompt:string){
 
    const chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "hola te pasare precios de construccion para bolivia " }],
        },
        {
          role: "model",
          parts: [{ text: "esta bien " }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
  
    const msg = "How many paws are in my house?";
  
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);



  }

}



