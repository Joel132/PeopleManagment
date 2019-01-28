import { Injectable } from '@angular/core';
import {Session} from "../models/session";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

/**
 * Clase StorageService
 * 
 * Gestiona la sesión actual.
 */
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  /**
   * Método setCurrentSession
   * Asigna la sesión actual.
   * 
   * @param session {Session} La sesión actual
   */
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  /**
   * Método loadSessionData
   * 
   * Retorna la sesión a partir del JSON
   * @return {Session}
   */
  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  /**
   * Método getCurrentSession.
   * 
   * @return {Session}.
   */
  getCurrentSession(): Session {
    return this.currentSession;
  }

  /**
   * Método removeCurrentSession.
   * 
   * Elimina la sesión (JSON) del localStorageService
   * y el objeto Session.
   */
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  /**
   * Método getCurrentTokenType.
   * 
   * Retorna el tipo de token.
   * @return {string}
   */
  getCurrentTokenType(): string {
    var session: Session = this.getCurrentSession();
    return (session && session.tokenType) ? session.tokenType : null;
  };

  /**
   * Método setCurrentRol.
   * 
   * Asigna el rol de una sesión pudiendo tener los siguientes valores:
   * rol=1 Admin
   * rol=2 Scrum Master
   * rol=3 Usuario
   * 
   * @param rol {number} Tipo de sesión
   */
  setCurrentRol(rol: string){
    var session: Session = this.getCurrentSession();
    session.rol = rol;
  }

  /**
   * Método getCurrentRol.
   * 
   * Obtiene el rol de la sesión actual.
   * @return {number}
   */
  getCurrentRol(): string{
    var session: Session = this.getCurrentSession();
    return session.rol;
  }

  /**
   * Método isAuthenticated.
   * 
   * Verifica si la sesión está autorizada.
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  /**
   * Método getCurrentToken
   * 
   * Devuelve la sesión actual.
   * 
   * @return {string}
   */
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.accessToken) ? session.accessToken : null;
  };

  /**
   * Método logout
   * 
   * Elimina la sesión y redirecciona a /login
   */
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
