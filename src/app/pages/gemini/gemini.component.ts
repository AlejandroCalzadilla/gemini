import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGeminiProService } from './services/api.service';
import { PresciosService } from './services/precios.service';
@Component({
  selector: 'app-gemini',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.css'
})
export class GeminiComponent {
  habitaciones: Array<{ value: string, label: string }> = [];
  key:string="AIzaSyDJC0j6SEPr-KRcEWxACfp-5PIITWCtg3Y"
  productForm!: FormGroup
  title = 'ng-gemini-test';
  result = '';
  json={
    "proyecto": {
      "nombre": "Construcción de Habitación",
      "ubicación": "Ciudad XYZ",
      "cliente": {
        "nombre": "Juan Pérez",
        "contacto": "juan.perez@example.com",
        "teléfono": "+123456789"
      },
      "dimensiones": {
        "largo": 5.0,
        "ancho": 4.0,
        "alto": 3.0
      },
      "materiales": [
        {
          "nombre": "Cemento",
          "cantidad": "50 bolsas",
          "costo_unitario": 150.0,
          "costo_total": 7500.0
        },
        {
          "nombre": "Arena",
          "cantidad": "20 m³",
          "costo_unitario": 50.0,
          "costo_total": 1000.0
        },
        {
          "nombre": "Grava",
          "cantidad": "15 m³",
          "costo_unitario": 70.0,
          "costo_total": 1050.0
        },
        {
          "nombre": "Ladrillos",
          "cantidad": "3000 unidades",
          "costo_unitario": 0.5,
          "costo_total": 1500.0
        },
        {
          "nombre": "Acero",
          "cantidad": "500 kg",
          "costo_unitario": 2.0,
          "costo_total": 1000.0
        },
        {
          "nombre": "Madera",
          "cantidad": "100 m²",
          "costo_unitario": 30.0,
          "costo_total": 3000.0
        },
        {
          "nombre": "Pintura",
          "cantidad": "20 litros",
          "costo_unitario": 20.0,
          "costo_total": 400.0
        }
      ],
      "mano_de_obra": {
        "trabajadores": 5,
        "días": 30,
        "tarifa_diaria_por_trabajador": 100.0,
        "costo_total": 15000.0
      },
      "costos_adicionales": [
        {
          "nombre": "Herramientas",
          "descripción": "Alquiler de herramientas diversas",
          "costo": 500.0
        },
        {
          "nombre": "Transporte",
          "descripción": "Costo del transporte de materiales",
          "costo": 800.0
        },
        {
          "nombre": "Permisos",
          "descripción": "Costos de permisos de construcción",
          "costo": 300.0
        }
      ],
      "costo_estimado_total": 31450.0,
      "fecha_inicio": "2024-07-01",
      "fecha_fin": "2024-07-31",
      "notas": "Este presupuesto es una estimación inicial y puede variar según las condiciones del proyecto."
    }
  }
  
    
  

  prompt:string = `con la siguiente informacion de habitaciones genera un presupuesto aproximado para bolvivia de construccion , ya te pase los precios en una anterior consulta,  devuelve un json con el presupuesto  `;
  constructor(private googleGeminiPro: GoogleGeminiProService ,private fb: FormBuilder,private  precioService:PresciosService){

    this.habitaciones = [
      { value: 'Dormitorio matrimonial', label: 'Dormitorio matrimonial' },
      { value: 'Dormitorio infantil', label: 'Dormitorio infantil' },
      { value: 'GA', label: 'Gaming/Console' },
      { value: 'PH', label: 'Phones' }
    ];
    this.googleGeminiPro.initialize(this.key);
  }

  

  ngOnInit(): void {
    this.productForm = this.fb.group({
      estilo: ['', ],
      habitacion: ['', Validators.required],
      ancho: ['',Validators.required ],
      largo: ['', ],
      alto: ['',],
      obra:['',]
    });
  }
  

 for (){
   
   //this.precioService.cerrajeria()
 
   
   
 }




  onSubmit(): void {
  
      console.log(this.productForm.value);
      // Llama a tu función con los valores del formulario
      this.addProduct(this.productForm.value);
    
  }

  addProduct(productData: any): void {
    console.log(this.precioService.accesorios_electricos.accesorios_electricos,'precios')
     
     this.prompt = this.prompt + productData.habitacion + ' ancho en metros: ' + productData.ancho  + ' largo  en metros: ' + productData.largo    + ' alto  en metros: ' + productData.alto   +' tipo obra: ' + productData.obra   +',';
     console.log(this.prompt, 'que devuelve')
     this.result=this.result +this.prompt

    // Aquí puedes manejar el envío del formulario
    console.log('Product Data:', productData);
  }

 


    
  

  async generate() {
  
    console.log('llama o nel')
     this.prompt=this.prompt ;
     const algo=`,precios del año 2023   ,debes devolver como este formato el resultado del   presupuesto aproximado {
    "proyecto": {
      "nombre": "Construcción de Habitación",
      "ubicación": "Ciudad XYZ",
      "dimensiones": {
        "largo": 5.0,
        "ancho": 4.0,
        "alto": 3.0
      },
      "materiales": [
        {
          "nombre": "Cemento",
          "cantidad": "50 bolsas",
          "costo_unitario": 150.0,
          "costo_total": 7500.0
        },
        {
          "nombre": "Arena",
          "cantidad": "20 m³",
          "costo_unitario": 50.0,
          "costo_total": 1000.0
        },
        {
          "nombre": "Grava",
          "cantidad": "15 m³",
          "costo_unitario": 70.0,
          "costo_total": 1050.0
        },
        {
          "nombre": "Ladrillos",
          "cantidad": "3000 unidades",
          "costo_unitario": 0.5,
          "costo_total": 1500.0
        },
        {
          "nombre": "Acero",
          "cantidad": "500 kg",
          "costo_unitario": 2.0,
          "costo_total": 1000.0
        },
        {
          "nombre": "Madera",
          "cantidad": "100 m²",
          "costo_unitario": 30.0,
          "costo_total": 3000.0
        },
        {
          "nombre": "Pintura",
          "cantidad": "20 litros",
          "costo_unitario": 20.0,
          "costo_total": 400.0
        }
      ],
      "mano_de_obra": {
        "trabajadores":1,
        "días": 30,
        "tarifa_diaria_por_trabajador": 100.0,
        "costo_total": 15000.0
      },
       
      ],
      "costo_estimado_total": 31450.0,
      "notas": "Este presupuesto es una estimación inicial y puede variar según las condiciones del proyecto."
    }`

    //this.prompt =""
    //this.prompt= "existe alguna manera de que te conectes con mis archivos de google sheet"


    console.log('llego por aca')
    this.result = await this.googleGeminiPro.generateText(this.prompt);
  }











}
