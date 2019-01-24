/**
 * Objeto Login
 * 
 * Se manda al backend para verificar que exista un usuario con las credenciales
 */

export class LoginObject{
    
    email: string;
    password: string;
    constructor(object: any){
        this.email=object.email;
        this.password=object.password;
    }
}