import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { trigger, transition, style, animate } from '@angular/animations';

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

  ngOnInit(): void {
    const socket = io('http://192.168.1.70:3333');
  }

}
