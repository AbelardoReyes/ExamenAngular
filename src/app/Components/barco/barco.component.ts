import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { trigger, transition, style, animate } from '@angular/animations';
import { socket } from 'src/environments/socket';

@Component({
  selector: 'app-barco',
  templateUrl: './barco.component.html',
  styleUrls: ['./barco.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class BarcoComponent implements OnInit {
  timer = 10;
  animacion = 'paused';
  ngOnInit(): void {
    this.iniciarAnimacion();
    socket.on('encender', (data) => {
      console.log("Encendiendo");
      this.iniciarAnimacion();
    });
    socket.on('apagar', (data) => {
      console.log("Apagando");
      this.pausarAnimacion();
    });
    //const socket = io('http://192.168.1.70:3333');


    socket.on('usuarios', (data) => {
      console.log("Los usuario son: " + data);
      console.log(data.length);
      console.log("hola");
      if (data.length >= 1 ) {
        this.iniciarAnimacion();
      }
    });
  }
  iniciarAnimacion() {
    console.log("Iniciando animacion");
    this.animacion = 'running';
  }
  pausarAnimacion() {
    console.log("Pausando animacion");
    this.animacion = 'paused';
  }

  onAnimationEnd() {
    console.log("Animacion terminada");
    this.animacion = 'paused';
    socket.emit('apagar', { data: 'terminar' });

  }
}

