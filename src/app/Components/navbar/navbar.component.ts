import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Socket, io } from 'socket.io-client';
import { socket } from 'src/environments/socket';
import { Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { window } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  window = window;
  animationState = 'paused';
  b1: boolean = false;
  b2: boolean = false;
  b3: boolean = false;
  b4: boolean = false;
  b5: boolean = false;
  b6: boolean = false;
  Usuarios = [] as any;
  contador: number = 0;
  suscripcion?: Subscription;
  btns = [this.b1, this.b2, this.b3, this.b4, this.b5, this.b6];
  variable: any;
  socketID: any;
  unido: boolean = false;
  screenWidth: number = 0;
  screenHeight: number = 0;
  getScreenSize(): any {
    var window: any;
    this.screenWidth = window.innerWidth;
  }
  ngOnInit(): void {
    this.getScreenSize();
    socket.on('connect', () => {
      console.log('Conectado al servidor');
      console.log(socket.id);
      this.socketID = socket.id;
    });

    socket.on('usuarios', (data) => {
      console.log("Los usuario son: " + data);
      console.log(data.length);
      console.log("hola");
      if (data.length == 0) {
        this.b1 = false;
        this.b2 = false;
        this.b3 = false;
        this.b4 = false;
        this.b5 = false;
        this.b6 = false;
      }
      if (data.length == 1) {
        this.b1 = true;
        this.b2 = false;
        this.b3 = false;
        this.b4 = false;
        this.b5 = false;
        this.b6 = false;
      }
      if (data.length == 2) {

        this.b1 = true;
        this.b2 = true;
        this.b3 = false;
        this.b4 = false;
        this.b5 = false;
        this.b6 = false;
      }
      console.log(data);
      this.cd.detectChanges();
    }
    );

    socket.on('orden', (data) => {
      console.log("El orden es: " + data);

    });


    //Barco
    //this.iniciarAnimacion();
    socket.on('encender', (data) => {
      socket.emit('cambio', { data: data })
      console.log("Encendiendo", data);
      //this.iniciarAnimacion();
    });
    socket.on('apagar', (data) => {
      socket.emit('cambio', { data: data})
      console.log("Apagando", data);
      //this.pausarAnimacion();
    });
    //const socket = io('http://192.168.1.70:3333');
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,) { }

  unirse() {
    console.log("Unirse");
    socket.emit('barco', { id: socket.id });
    this.unido = true;

  }
  monitor1() {
    console.log("Monitor 1");
    socket.emit('monitor', { id: socket.id, turno: 1 });
  }
  monitor2() {
    console.log("Monitor 2");
    socket.emit('monitor', { id: socket.id, turno: 2 });
  }
  monitor3() {
    console.log("Monitor 3");
    socket.emit('monitor', { id: socket.id, turno: 3 });
  }
  monitor4() {
    console.log("Monitor 4");
    socket.emit('monitor', { id: socket.id, turno: 4 });
  }
  monitor5() {
    console.log("Monitor 5");
    socket.emit('monitor', { id: socket.id, turno: 5 });
  }
  monitor6() {
    console.log("Monitor 6");
    socket.emit('monitor', { id: socket.id, turno: 6 });
  }


  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    socket.emit('desconnect', { id: socket.id });
  }


  //Barco
  timer = 10;
  animacion = 'paused';


  empezarJuego() {
    console.log("Empezando siuuu");
    this.iniciarAnimacion();
  }

  iniciarAnimacion() {
    const boat = document.querySelector("img");
    const animation = boat?.getAnimations()[0];
    let turno = ""
    this.animationState = this.animationState === 'paused' ? 'running' : 'paused';
    const boating = document.getElementById('boat-img');
    if (this.animationState === 'running') {
      turno = "apagado"
      socket.emit('apagado', { data: turno })
      animation?.pause();
    } else {
      turno = "encendido"
      socket.emit('encender', { data: turno })
      animation?.play();
    }
    socket.emit('cambio', { data: turno })
    this.cd.detectChanges();
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


