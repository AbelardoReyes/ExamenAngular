import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent {
  form: FormGroup;
  user?: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  OnSubmit(values: User) {
    if (this.form.valid) {
      this.userService.login(values).subscribe((response: any) => {
        console.log(response);
      });
      console.log("Formulario valido");
    }
    else {
      console.log("Formulario no valido");
    }
  }
}
