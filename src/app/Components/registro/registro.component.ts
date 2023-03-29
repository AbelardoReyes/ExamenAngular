import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  user?: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  OnSubmit(values: User) {
    if(this.form.valid) {
      this.userService.registerUser(values).subscribe((response:any)=>{
        if (response.status == 201) {
          this.router.navigate(['/login']);
        }
      });

    }
  }

}

