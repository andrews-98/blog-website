import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {catchError, Observable, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  errorMsg: string

  constructor(private http: HttpClient) {}

  get token(): string | any {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any>{
    user.returnSecureToken = true
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

 public handleError(error: HttpErrorResponse) {
   this.errorMsg = error.error.error.message
   switch (this.errorMsg) {
     case 'EMAIL_NOT_FOUND':
       this.errorMsg = 'Еmail is not found'
       break
     case 'INVALID_PASSWORD':
       this.errorMsg = 'Invalid password'
       break
     case 'INVALID_EMAIL':
       this.errorMsg = 'Invalid email'
       break
   }
    return throwError(error)
  }

  logout(){
   this.setToken(null)
  }

  isAuthentificated(): boolean{
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null){
    if(response){
      // @ts-ignore
      const expDate: any = new Date( new Date().getTime() + +response.expiresIn * 1000)
      // @ts-ignore
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }



  }

}
