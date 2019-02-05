import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../shared/helpers/authentication.service";
import {StorageService} from "../shared/helpers/storage.service";
import {Router} from "@angular/router";
import {LoginObject} from "../shared/models/login";
import {Session} from "../shared/models/session";
import {JwtService} from "../shared/helpers/jwt.service";
/**
 * Login Component
 * 
 * Componente que maneja la vista del login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
/**
 * Constructor con los siguientes atributos publicos del componente
 * 
 * @param formBuilder atributo usado para facilitar la creacion de form group
 * @param authenticationService servicio que se usa en el componente para hacer la llamada al backend
 * @param storageService servicio que se usa para almacenar datos relacionados con las sesion
 * @param router atributo uado para redireccionar una vez logueado
 */
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router,
              private jwt: JwtService) { }

  /**
   * Se inicializa el form con valores vacios por defecto
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  /**
   * Metodo para realizar la llamada el servidor a traves del servicio authentication
   */
  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error;
        }
      )
    }
  }

  /**
   * Metodo usado en el caso que las credenciales enviadas sean validas
   * @param {Session} data atributo que representa el response del servidor
   */
  private correctLogin(data: Session){
    let token = this.jwt.decode(data.accessToken);

    data.id = token.sub;
    data.rol = token.scopes;
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/']);
  }

}
