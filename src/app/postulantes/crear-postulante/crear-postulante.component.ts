import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AgregarPostulanteService } from '../../shared/helpers/agregar.service';
import { Postulante } from 'src/app/shared/models/postulante';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';
import { EnviarArchivoService } from 'src/app/shared/helpers/enviar-archivo.service';


/**
 * Componente Crear Postulante.
 */

@Component({
  selector: 'app-crear-postulante',
  templateUrl: './crear-postulante.component.html',
  styleUrls: ['./crear-postulante.component.css']
})

export class CrearPostulanteComponent implements OnInit {
  public titulo: string = 'Crear Postulante';
  formCrearPostulantes: FormGroup;
  url = '';
  urlFoto = '';
  enviandoCambios:boolean = false;

/**
   * Atributo usado para mostrar el nombre del archivo del desafio en el input
   */
  public desafioName: string='';
  
  /**
   * Atributo usado para mostrar el nombre del archivo del CV en el input 
   */
  public cvName: string='';

  @Output() onCompleteItem = new EventEmitter();

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

  constructor(private formBuilder: FormBuilder,
              private servicioAgregar: AgregarPostulanteService,
              private snackBar: MatSnackBar,
              private router: Router, 
              private enviarArchivo: EnviarArchivoService,
              private tituloService: ObtenerTituloService
              ) { }
              
ngOnInit() {

  this.formCrearPostulantes = this.formBuilder.group({
    id: new FormControl(0),
    nombre : new FormControl('', [Validators.required,Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*')]), //solo letras, requerido
    apellido : new FormControl('', [Validators.required,Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*')] ), //solo letras, requerido
    documento : new FormControl('', [Validators.pattern('[/0-9]*')]), //, hasta 7 cifras
    celular : new FormControl('', [Validators.pattern('[[/+][/0-9]+]|[/0-9]+'),Validators.minLength(6)]),
    fechaDeNacimiento : new FormControl({value:'',disabled: false}),
    mail : new FormControl('', [Validators.required, Validators.email]), //direccion valida, requerido
    direccion : new FormControl(''), 
    estado : new FormControl('1'),
    genero : new FormControl('Otro'),
    desafioUrl: new FormControl(),
    curriculumUrl: new FormControl(),
    comentario: new FormControl(),
    fotoUrl: new FormControl()
  });
  this.tituloService.asignarTitulo(this.titulo);
}

/**
 * Pasa los valores del formulario al método agregarPostulante
 */
public onSubmit() {

  this.enviandoCambios = true;  
  console.log(this.formCrearPostulantes.value);
  this.servicioAgregar.agregarPostulante(this.formCrearPostulantes.value).subscribe(
        data => this.recibidoCorrectamente(data),
        error=>this.errorRecibido(error)
      );
}

/**
 * Utiliza un SnackBar para informar al usuario que creó correctamente un postulante
 * @param data {Postulante} Datos del postulante
 */
public recibidoCorrectamente(data: Postulante){
  console.log("Creado "+data);
  //this.formCrearPostulantes.reset();
  this.openSnackBar("Postulante creado exitosamente","Entendido");

  //se vuelve al listado de postulantes
  this.volverAlListado();

}

/**
 * Genera el SnackBar con el mensaje recibido como parámetro y redirecciona a la lista de postulantes
 * @param message {string} Mensaje de éxito
 * @param action {string} Acción utilizada: cerrar
 */
public openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 4000,
    
  });
}

public openSnackBarError(message: string, action: string) {
  let error = this.snackBar.open(message, action, {
    duration: 4000,
    
  })
  
  error.onAction().subscribe(()=>this.volverAlListado())
}

/**
* Mensaje de error
* @param error 
*/
public errorRecibido(error){
  this.enviandoCambios = false;
  this.openSnackBarError("No se pudo guardar los cambios","Volver al Listado");
}

/**
* Utiliza el Router para redireccionar a la lista de postulantes
*/
public volverAlListado(){
  this.enviandoCambios = false;
  this.router.navigate(['/postulante']);
}

/**
 * Metodo para vaciar el cv seleccionado
 */
public vaciarInputCV(){
  this.isLoadingCV=false;
  this.curriculumInput.nativeElement.value='';
  this.cvName='';
  this.formCrearPostulantes.get('curriculumUrl').setValue('');
}

/**
 * Metodo para vaciar el desafio seleccionado
 */
public vaciarInputDesafio(){
  this.desafioInput.nativeElement.value='';
  this.desafioName='';
  this.formCrearPostulantes.get('desafioUrl').setValue('');
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
 * 
 */
public cargarCV(){
  if(this.curriculumInput.nativeElement.files[0].size>1e+6){
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

public cargarFoto() {

  if(this.fotoInput.nativeElement.files[0].size>1e+6){
    this.errorFoto=true;
    this.errorFotoPesado=true;
    this.vaciarInputDesafio();
    return ;
  }

  //Validacion para saber si el input de la foto contiene un archivo asociado
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
public cargarDesafio(){
  if(this.desafioInput.nativeElement.files[0].size>1e+6){
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

public enviar(fileInput,campo: 'desafioUrl'|'curriculumUrl'|'fotoUrl'){
  this.desafioInput.error="";
    let file: File= fileInput.nativeElement.files[0];
  this.enviarArchivo.enviarArchivo(file).subscribe(
    (resultPath) => {
      this.formCrearPostulantes.get(campo).setValue(resultPath);
      if(campo=='fotoUrl'){
        this.isLoadingFoto=false;
      }
      if(campo=='curriculumUrl'){
        this.isLoadingCV=false;
      }
      if(campo=='desafioUrl'){
        this.isLoadingDesafio=false;
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
  

}//fin de la clase
