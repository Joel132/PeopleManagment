import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginObject} from "../models/login";
import {Session} from "../models/session";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private basePath = 'http://10.128.3.82:8080/api/v1/auth/';

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'login', loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }

  
}
