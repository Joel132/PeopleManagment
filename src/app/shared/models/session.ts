export class Session{
     constructor(public accessToken: string, public tokenType: string, public rol: number){
          this.rol=1;
     }

}