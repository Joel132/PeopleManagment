
/**
 * Clase Session
 * 
 * Almacena el token y el rol de la sesion actual.
 */
export class Session{
     constructor(public accessToken: string, public tokenType: string, public id: number, public rol: string){}
}