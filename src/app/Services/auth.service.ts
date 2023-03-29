import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiToken = environment.apiUrl +'/user'

  constructor(private http: HttpClient) { }

  verifyToken(token:string){
    return this.http.get(this.apiToken, {headers:{'Authorization':token}})
   }
}
