import { Funcionario } from './../../shared/models/funcionario';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnviarArchivoService } from 'src/app/shared/helpers/enviar-archivo.service';
import { PasswordValidation } from './../../shared/models/password-validators';
import { AgregarFuncionarioService } from '../../shared/helpers/agregar-funcionario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-crear-funcionarios',
  templateUrl: './crear-funcionarios.component.html',
  styleUrls: ['./crear-funcionarios.component.css']
})

export class CrearFuncionariosComponent implements OnInit {
  /**
   * Atributo que contiene el form del funcionario a crear. Los datos precargados y los que se actualizaran
  */
  public formCrearFuncionario: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);


 
  /**
   * Atributo usado para mostrar el nombre del archivo del desafio en el input
   */
  public desafioName: string='';
  
  /**
   * Atributo usado para mostrar el nombre del archivo del CV en el input 
   */
  public cvName: string='';


  /**
   * Atributo usado para vincular el input file del desafio en el template(se puede referenciar al archivo seleccionado)
   */
  @ViewChild('desafioInput') desafioInput;
  
  /**
   * Atributo usado para vincular el input file del CV en el template(se puede referenciar al archivo seleccionado) 
   */
  @ViewChild('curriculumInput') curriculumInput;

  /**
   * Atributo usado para vincular el input file de la foto en el template(se puede referenciar al archivo seleccionado) 
   */
  @ViewChild('fotoInput') fotoInput ;
  
  /**
   * Atributo que indica si la foto se esta cargando en el servidor
   */
  public isLoadingFoto: boolean=false;

  /**
   * Atributo que indica si ha ocurrido un error al cargar la foto
   */
  public errorFoto: boolean=false;

   /**
   * Atributo que indica si el CV se esta cargando en el servidor 
   */
  public isLoadingCV: boolean=false;

  /**
   * Atributo que indica si ha ocurrido un error al cargar el CV
   */
  public errorCV: boolean=false;
  
  /**
   * Atributo que indica si el CV se esta cargando en el servidor 
   */
  public isLoadingDesafio: boolean=false;

  /**
   * Atributo que indica si ha ocurrido un error al cargar el CV
   */
  public errorDesafio: boolean=false;

  public errorCVPesado: boolean=false;

  public errorDesafioPesado: boolean=false;

  public errorFotoPesado: boolean=false;

  public error: 'Archivo pesado'|'Error en el servidor'|'';

  /**
   * Atributos para validar la fecha de Nacimiento
   */
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(2040, 0, 1);
  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;

  constructor(private formBuilder: FormBuilder, private enviarArchivo: EnviarArchivoService,
  private servicioAgregar: AgregarFuncionarioService, private router: Router
  ) { }
  /**
   * ocultar password
   */
  hide:boolean= true;
  hide2:boolean=true;
    
  ngOnInit() {
    this.formCrearFuncionario = this.formBuilder.group({
        idUsuario: new FormControl(0),
        fotoUrl:new FormControl(''),
        nombre: new FormControl('', [Validators.required]),
        apellido:new FormControl('', [Validators.required]),  
        documento:new FormControl(''),
        genero: new FormControl(''),
        beneficiario:new FormControl(''),
        email:  new FormControl('', [Validators.required, Validators.email]),
        direccion: new FormControl(''),
        celular: new FormControl(''),
        fechaInicio:new FormControl(),
        fechaVencimiento:new FormControl(),
        fechaDeNacimiento: new FormControl(),
        usuario:new FormControl(''),
        rol:new FormControl('user3'),
        curriculumUrl:new FormControl(),
        desafioUrl:new FormControl(''),
        activo:new FormControl('true'),
        clave: ['', [Validators.required, Validators.minLength(4)]],
        confirmarContraseña: ['', Validators.required]
      }, {
      validator: PasswordValidation.MatchPassword   
      });
    }
  
/**
   * Pasa los valores del formulario al método agregarPostulante
   */
  onSubmit() {
    console.log(this.formCrearFuncionario.value);
    this.servicioAgregar.agregarFuncionario(this.formCrearFuncionario.value).subscribe(data => {
      this.recibidoCorrectamente(data);
      console.log(data);

    },error=>this.errorRecibido(error));
  }


  recibidoCorrectamente(data: Funcionario){
    console.log("Funcionario Creado :)"+data);
    this.formCrearFuncionario.reset();
  }


  errorRecibido(error){

  }

 /**
  * Utiliza el Router para redireccionar a la lista de funcionarios
  */
 volverAlListado(){
  this.router.navigate(['/funcionario']);
}



    
  getErrorEmailMessage() {
    return (this.formCrearFuncionario.get("email") as (FormControl)).hasError('required') ? 'You must enter a value' :
        (this.formCrearFuncionario.get("email") as (FormControl)).hasError('email') ? 'Not a valid email' :'';
          //return this.formEditarPostulante.errors;
  } 


  /**
   * Metodo para vaciar el cv seleccionado
   */
  vaciarInputCV(){
    this.isLoadingCV=false;
    this.curriculumInput.nativeElement.value='';
    this.cvName='';
    this.formCrearFuncionario.get('curriculumUrl').setValue('');
  }

  /**
   * Metodo para vaciar el desafio seleccionado
   */
  vaciarInputDesafio(){
    this.desafioInput.nativeElement.value='';
    this.desafioName='';
    this.formCrearFuncionario.get('desafioUrl').setValue('');
  }

  /**
   * Metodo para desvincular el archivo del input de la foto
   */
  public eliminarFoto(){
    this.isLoadingFoto=false;
    this.urlFoto = null;
    this.fotoInput.nativeElement.value='';
  }

  /**
   * Metodo para subir el archivo del curriculum al input correspondiente
   */
  cargarCV(){
    if(this.curriculumInput.nativeElement.files[0].size>1e+7){
      this.errorCV=true;
      this.errorCVPesado=true;
      this.vaciarInputCV();
      return ;
    }
     if (this.curriculumInput.nativeElement && this.curriculumInput.nativeElement.files[0]) {
      this.errorCVPesado=false;
      this.errorCV=false;
      this.isLoadingCV=true;
      this.enviar(this.curriculumInput,'curriculumUrl');
      this.cvName=this.curriculumInput.nativeElement.files[0].name;
    } 
    
  }

  /**
   * Metodo para poder manipular la foto(vista previa)
   */
  urlFoto = '';
  cargarFoto() {

    if(this.fotoInput.nativeElement.files[0].size>1e+7){
      this.errorFoto=true;
      this.errorFotoPesado=true;
      this.vaciarInputDesafio();
      return ;
    }
    /**
     * Validacion para saber si el input de la foto contiene un archivo asociado
     */
    if (this.fotoInput.nativeElement && this.fotoInput.nativeElement.files[0]) {
      this.errorFotoPesado=false;
      this.errorFoto=false;
      this.isLoadingFoto=true;
      var reader = new FileReader();

      reader.readAsDataURL(this.fotoInput.nativeElement.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.urlFoto = event.target.result;
      }
      this.enviar(this.fotoInput,'fotoUrl');
    }
  }

  /**
   * Metodo para subir el archivo del desafio al input correspondiente
   * 
   */
  cargarDesafio(){
    if(this.desafioInput.nativeElement.files[0].size>1e+7){
      this.errorDesafio=true;
      this.errorDesafioPesado=true;
      this.vaciarInputDesafio();
      return ;
    }
    if (this.desafioInput.nativeElement && this.desafioInput.nativeElement.files[0]) {
      this.errorDesafio=false;
      this.errorDesafioPesado=false;
      this.isLoadingDesafio=true;
      this.enviar(this.desafioInput,'desafioUrl');
      this.desafioName=this.desafioInput.nativeElement.files[0].name;
    }
  }

  /**
 * Metodo que sirve para alzar el archivo. Utiliza un servicio para alzar dicho archivo
 * @param fileInput la referencia a un input file dado(foto, cv o desafio)
 * @param campo contiene el nombre del input del formulario a completar luego de enviar el archivo
 */
  enviar(fileInput,campo: 'desafioUrl'|'curriculumUrl'|'fotoUrl'){
    this.desafioInput.error="";
    let file: File= fileInput.nativeElement.files[0];
    this.enviarArchivo.enviarArchivo(file).subscribe(
      (resultPath) => {
        this.formCrearFuncionario.get(campo).setValue(resultPath);
        if(campo=='fotoUrl'){
          this.isLoadingFoto=false;
        }
        if(campo=='curriculumUrl'){
          this.isLoadingCV=false;
        }
        if(campo=='desafioUrl'){
          this.isLoadingCV=false;
        }
        console.log("Se subio correctamente el archivo");
      },
      (error) => {
        
        
        console.log(this.errorFoto);
        if(campo=='fotoUrl'){
          this.errorFoto=true;
          this.eliminarFoto();
        }
        if(campo=='curriculumUrl'){
          this.errorCV=true;
          this.vaciarInputCV();
        }
        if(campo=='desafioUrl'){
          this.errorDesafio=true;
          this.vaciarInputDesafio();
        }

        console.log("Ha ocurrido un error al subir el archivo");
      }
    );
    
  }
}