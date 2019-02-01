import { HttpClient } from '@angular/common/http';
import {HttpClientModule, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileQueueObject, FileUploaderService } from '../../shared/helpers/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import { EditarPostulanteService } from 'src/app/shared/helpers/editar-postulante.service';
import { Postulante } from 'src/app/shared/models/postulante';
import { ActivatedRoute } from '@angular/router';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
import { EnviarArchivoService } from 'src/app/shared/helpers/enviar-archivo.service';

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
  
  //form date
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(2040, 0, 1);
  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private http:HttpClient,
    public uploader: FileUploaderService, 
    private editarServicio: EditarPostulanteService, 
    private recibirPostulante: RecibirPostulanteService,
    private enviarArchivo: EnviarArchivoService
    ) { }

  ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');//Se obtiene el id de la ruta 
      //this.getPostulante(id);
      this.cargarFormulario({id:1,celular:'213',apellido:'Florentin',nombre:'Joel',comentario:'sad',comentarioAdmin:'dsa',comentarioDesafio:'sda',comentarioTeam:'dsa',comentarioSm:'sad',curriculumUrl:'df',desafioUrl:'ad',documento:'ad',estado:'Rechazado',foto:'ad',mail:'das'});
  }
   
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log( this.formEditarPostulante.value);
   
   if(this.formEditarPostulante.valid) {
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
    console.log("Editado "+data);
    //this.formPostulantes.reset();
  }

  /**
   * Metodo que se ejecuta si ocurre un error al tratar de editar un postulante
   * @param error 
   */
  editadoIncorrecto(error){
  }


  getErrorEmailMessage() {
    return (this.formEditarPostulante.get("mail") as (FormControl)).hasError('required') ? 'You must enter a value' :
        (this.formEditarPostulante.get("mail") as (FormControl)).hasError('email') ? 'Not a valid email' :'';
          //return this.formEditarPostulante.errors;
  } 



/**
 * Metodo para poder manipular la foto(vista previa)
 */
  urlFoto = '';
  cargarFoto() {
    if (this.fotoInput.nativeElement && this.fotoInput.nativeElement.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(this.fotoInput.nativeElement.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.urlFoto = event.target.result;
      }
    }
  }

  /**
   * Metodo para desvincular el archivo del input de la foto
   */
  public eliminarFoto(){
    this.urlFoto = null;
    this.fotoInput.nativeElement.value='';
  }
  
  /**
   * Metodo que llama al servicio para obtener el postulante segun un id dado
   * @param id Atributo a tener en cuenta para obtener un postulante
   */
  getPostulante(id: number){
    this.recibirPostulante.getPostulante(id).subscribe(
      respuesta=>{
        this.cargarFormulario(respuesta);
      },
      error_respuesta=>{
        console.log("Ha ocurrido un error");
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
      documento : new FormControl(postulante.documento, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      celular : new FormControl(postulante.celular),
      fecha_nac : new FormControl(),
      mail : new FormControl(postulante.mail, [Validators.required, Validators.email]),
      direccion : new FormControl(),
      estado : new FormControl(postulante.estado),
      desafioUrl: new FormControl(postulante.desafioUrl),
      curriculumUrl: new FormControl(postulante.curriculumUrl),
      comentario: new FormControl(postulante.comentario),
      comentarioSM:new FormControl(postulante.comentarioSm),
      comentarioAdmin: new FormControl(postulante.comentarioAdmin),
      comentarioTeam: new FormControl(postulante.comentarioTeam),
      comentarioDesafio: new FormControl(postulante.comentarioDesafio)
    });
  }
 

  /**
   * Metodo para vaciar el cv seleccionado
   */
  vaciarInputCV(){
    this.curriculumInput.nativeElement.value='';
    this.cvName='';
  }

  /**
   * Metodo para vaciar el desafio seleccionado
   */
  vaciarInputDesafio(){
    this.desafioInput.nativeElement.value='';
    this.desafioName='';
  }

  /**
   * Metodo para colocar el nombre del archivo del curriculum al input correspondiente
   * 
   */
  nombrarCV(){
    this.cvName=this.curriculumInput.nativeElement.files[0].name;
  }

  /**
   * Metodo para colocar el nombre del archivo del desafio al input correspondiente
   * 
   */
  nombrarDesafio(){
    this.desafioName=this.desafioInput.nativeElement.files[0].name;
  }

/**
 * Metodo que sirve para alzar el archivo. Utiliza un servicio para alzar
 * @param fileInput la referencia a un input file dado(foto, cv o desafio)
 * @param campo contiene el nombre del campo del input
 */
  enviar(fileInput,campo: 'desafioUrl'|'curriculumUrl'){
     let file: File= fileInput.nativeElement.files[0];
    this.enviarArchivo.enviarArchivo(file).subscribe(
      (resultPath) => {
        this.formEditarPostulante.get(campo).setValue(resultPath);
      },
      (error) => {
        console.log("Ha ocurrido un error al subir el archivo");
      }
    );
    
  }
}




