import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = environment.apiUrl + '/usuario/registrar';
  private logearUsuario = environment.apiUrl + '/usuario/login';
  private getUserUrl = environment.apiUrl + '/usuario/monitores';
  private logoutUrl = environment.apiUrl + '/usuario/logout';

  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.logearUsuario, user).pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.getUserUrl + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getToken() {
    return this.http.get<User>(this.getUserUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  logout(): Observable<User> {
    return this.http.get<User>(this.logoutUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error inesperado ha ocurrido:', error.error);
    } else if (error.status === 400) {
      alert('Error: ' + error.error.message);
      console.error(
        `Error en el servidor: ${error.status}, \nRespuesta:`, error.error
      )
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtelo de nuevo más tarde.'));
  }
}
