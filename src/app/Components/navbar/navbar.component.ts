import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { socket } from 'src/environments/socket';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  b1: boolean = false;
  b2: boolean = false;
  b3: boolean = false;
  b4: boolean = false;
  b5: boolean = false;
  b6: boolean = false;
  Usuarios = [] as any;
  contador: number = 0;
  suscripcion?: Subscription;

  socketID: any;
  unido: boolean = false;
  ngOnInit(): void {
    this.getUsuarios();
    this.suscripcion = this.userService.getUsuarios().pipe(map((response: any) => {
      console.log(response);
      this.Usuarios = response;
    })).subscribe();
    socket.on('connect', () => {
      console.log('Conectado al servidor');
      console.log(socket.id);
      this.socketID = socket.id;
    });
    this.cd.detectChanges();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  unirse() {
    console.log("Unirse");
    socket.emit('barco', { id: socket.id });
    this.unido = true;

    socket.on('usuarios', (data) => {
      console.log("Los usuario son: " + data);
      console.log("Arreglo: " + data.length);

      if (data.length == 1) {
        this.b1 = true;
        this.cd.detectChanges();
      }
      if (data.length == 2) {
        this.b2 = true;
        this.cd.detectChanges();
      }
    }
    );
  }

  monitor1() {
    console.log("Monitor 1");
    socket.emit('monitor', { monitor: 1 });
  }
  monitor2() {
    console.log("Monitor 2");
    socket.emit('monitor', { monitor: 2 });
  }
  monitor3() {
    console.log("Monitor 3");
    socket.emit('monitor', { monitor: 3 });
  }
  monitor4() {
    console.log("Monitor 4");
    socket.emit('monitor', { monitor: 4 });
  }
  monitor5() {
    console.log("Monitor 5");
    socket.emit('monitor', { monitor: 5 });
  }
  monitor6() {
    console.log("Monitor 6");
    socket.emit('monitor', { monitor: 6 });
  }

  Iniciar() {
    socket.emit('iniciar', { id: socket.id });
  }

  getUsuarios() {
    this.userService.getUsuarios().subscribe((response: any) => {
      console.log(response);
      this.Usuarios = response;
    });
  }

}


