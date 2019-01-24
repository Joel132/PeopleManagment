import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginObject} from "../models/login";
import {Session} from "../models/session";
import {environment} from "../../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private basePath = '/api/v1/auth/';

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(environment.apiUrl+this.basePath + 'login', loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }

  
}
