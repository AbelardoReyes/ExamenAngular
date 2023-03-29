import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { socket } from 'src/environments/socket';
import { Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
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
  variable:any;
  private dataArray: any[] = [];
  private arregloSubjetct: Subject<number> = new Subject<number>();
  socketID: any;
  unido: boolean = false;
  ngOnInit(): void {
    socket.on('connect', () => {
      console.log('Conectado al servidor');
      console.log(socket.id);
      this.socketID = socket.id;
    });

    socket.on('usuarios', (data) => {
      console.log("Los usuario son: " + data);
      console.log(data.length);
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
    }
    );

    socket.on('orden', (data) => {
      console.log("El orden es: " + data);
    });

    this.cd.detectChanges();
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
    socket.emit('monitor', { id: socket.id ,turno:1});
  }
  monitor2() {
    console.log("Monitor 2");
    socket.emit('monitor', { id: socket.id ,turno:2});
  }
  monitor3() {
    console.log("Monitor 3");
    socket.emit('monitor', { id: socket.id ,turno:3});
  }
  monitor4() {
    console.log("Monitor 4");
    socket.emit('monitor', { id: socket.id ,turno:4});
  }
  monitor5() {
    console.log("Monitor 5");
    socket.emit('monitor', { id: socket.id ,turno:5});
  }
  monitor6() {
    console.log("Monitor 6");
    socket.emit('monitor', { id: socket.id ,turno:6});
  }

  Iniciar() {
    socket.emit('iniciar', { id: socket.id });
  }
  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    socket.emit('desconnect', { id: socket.id });
  }
}


