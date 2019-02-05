import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EditarPostulanteService } from 'src/app/shared/helpers/editar-postulante.service';
import { Postulante } from 'src/app/shared/models/postulante';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
import { EnviarArchivoService } from 'src/app/shared/helpers/enviar-archivo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editar-postulante',
  templateUrl: './editar-postulante.component.html',
  styleUrls: ['./editar-postulante.component.scss']
})
/**
 * 
 */

export class EditarPostulanteComponent implements OnInit {
  

  /**
   * Atributo que contiene el form del postulante a editar. Los datos precargados y los que se actualizaran
   */
  public formEditarPostulante: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  

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
  //form date
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(2040, 0, 1);
  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;

  public enviandoCambios: boolean=false;
  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private editarServicio: EditarPostulanteService, 
    private recibirPostulante: RecibirPostulanteService,
    private enviarArchivo: EnviarArchivoService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');//Se obtiene el id de la ruta 
      //Para el servidor
      this.getPostulante(id);

      //Para el mock. Servidor caido
      //this.cargarFormulario({id:1,celular:'213',apellido:'Florentin',nombre:'Joel',comentario:'sad',comentarioAdmin:'dsa',comentarioDesafio:'sda',comentarioTeam:'dsa',comentarioSm:'sad',curriculumUrl:'df',desafioUrl:'ad',documento:'ad',estado:'Rechazado',foto:'ad',mail:'das',fechaDeNacimiento:'',genero:''});
  }
   
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log( this.formEditarPostulante.value);
   
   if(this.formEditarPostulante.valid) {
    this.enviandoCambios=true;
     this.editarServicio.editarPostulante(
      this.formEditarPostulante.value).subscribe(
       data => this.editadoCorrectamente(data),
       error=>this.editadoIncorrecto(error));
    }
      
  }

  /**
   * Metodo que se ejecuta en caso que la actualizacion de los datos de un postulante dado haya sido exitosa
   * @param data objeto que representa al postulante editado con los datos correctos
   */
  editadoCorrectamente(data: Postulante){
    
    console.log("Editado Correctamente");
    console.log(data);
    this.openSnackExito("Postulante editado exitosamente","Entendido");
    //this.formPostulantes.reset();
  }

  openSnackExito(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
    this.enviandoCambios=false;
    this.volverAlListado();
  }

  openSnackError(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    }).onAction().subscribe(()=>this.volverAlListado());
    this.enviandoCambios=false;
    
  }

  /**
   * Metodo que se ejecuta si ocurre un error al tratar de editar un postulante
   * @param error 
   */
  editadoIncorrecto(error){
    this.enviandoCambios=false;
    this.openSnackError("No se ha podido guardar los cambios. Error en el servidor!","Volver al listado");
    console.log("No se ha podido guardar los cambios. Error en el servidor!");
    console.log(error);
  }

  volverAlListado(){
    this.router.navigate(['/postulante']);
  }

  getErrorEmailMessage() {
    return (this.formEditarPostulante.get("mail") as (FormControl)).hasError('required') ? 'You must enter a value' :
        (this.formEditarPostulante.get("mail") as (FormControl)).hasError('email') ? 'Not a valid email' :'';
          //return this.formEditarPostulante.errors;
  } 




  
  
  /**
   * Metodo que llama al servicio para obtener el postulante segun un id dado. Al final se sobrecarga el formulario
   * @param id Atributo a tener en cuenta para obtener un postulante
   */
  getPostulante(id: number){
    this.recibirPostulante.getPostulante(id).subscribe(
      respuesta=>{
        this.cargarFormulario(respuesta);
        this.cargarInputsFile(respuesta);
      },
      error_respuesta=>{
        console.log("Ha ocurrido un error al intentar cargar los datos del postulante");
        console.log(error_respuesta);
      }
      );
  }

  /**
   * Metodo que sirve para precargar el formulario segun un postulante dado
   * @param postulante Atributo a tener en cuenta para cargar el formulario
   */
  cargarFormulario(postulante: Postulante){
    //TODO: averiguar como obtener el nombre del archivo cuando ya tiene una url asignada
    this.formEditarPostulante = this.formBuilder.group({
      id: new FormControl(postulante.id),
      nombre : new FormControl(postulante.nombre, [Validators.required,Validators.pattern('[/a-zA-Z ]*')]),
      apellido : new FormControl(postulante.apellido, [Validators.required,Validators.pattern('[/a-zA-Z ]*')] ),
      documento : new FormControl(postulante.documento, [Validators.pattern('[/0-9]*')]),
      celular : new FormControl(postulante.celular,[Validators.pattern('[[/+][/0-9]+]|[/0-9]+')]),
      fechaDeNacimiento	 : new FormControl(postulante.fechaDeNacimiento?{value: new Date(postulante.fechaDeNacimiento),disabled: true}:{value:'',disabled:true}),
      mail : new FormControl(postulante.mail, [Validators.required, Validators.email]),
      direccion : new FormControl(postulante.direccion),
      estado : new FormControl(postulante.estado),
      desafioUrl: new FormControl(postulante.desafioUrl),
      curriculumUrl: new FormControl(postulante.curriculumUrl),
      comentario: new FormControl(postulante.comentario),
      comentarioSm:new FormControl(postulante.comentarioSm),
      comentarioAdmin: new FormControl(postulante.comentarioAdmin),
      comentarioTeam: new FormControl(postulante.comentarioTeam),
      comentarioDesafio: new FormControl(postulante.comentarioDesafio),
      genero: new FormControl(postulante.genero),
      fotoUrl: new FormControl()
    });
    
  }

 /**
  * Vincular todos los inputs file con los nombres de sus archivos correspondientes de un postulante
  * @param postulante 
  */
  cargarInputsFile(postulante: Postulante){
    this.desafioName=this.extraerNombre(postulante.desafioUrl);
    this.cvName=this.extraerNombre(postulante.curriculumUrl);
  }
  
/**
 * Extrae el nombre del archivo de la url enviada del servidor
 * @param url la url a examinar para extraer el nombre
 */
  extraerNombre(url: string): string{

    if(url){
      return url.substring(66,url.length);
    }
    return '';
  }
  /**
   * Metodo para vaciar el cv seleccionado
   */
  vaciarInputCV(){
    this.isLoadingCV=false;
    this.curriculumInput.nativeElement.value='';
    this.cvName='';
    this.formEditarPostulante.get('curriculumUrl').setValue('');
  }

  /**
   * Metodo para vaciar el desafio seleccionado
   */
  vaciarInputDesafio(){
    this.desafioInput.nativeElement.value='';
    this.desafioName='';
    this.formEditarPostulante.get('desafioUrl').setValue('');
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
  cargarCV(){
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
  urlFoto = '';
  cargarFoto() {

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
  cargarDesafio(){
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
  enviar(fileInput,campo: 'desafioUrl'|'curriculumUrl'|'fotoUrl'){
    this.desafioInput.error="";
     let file: File= fileInput.nativeElement.files[0];
    this.enviarArchivo.enviarArchivo(file).subscribe(
      (resultPath) => {
        
        this.formEditarPostulante.get(campo).setValue(resultPath);
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

  
}




