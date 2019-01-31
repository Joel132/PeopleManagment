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

@Component({
  selector: 'app-editar-postulante',
  templateUrl: './editar-postulante.component.html',
  styleUrls: ['./editar-postulante.component.scss']
})


export class EditarPostulanteComponent implements OnInit {
  //email validations

  //email = new FormControl();
  public formEditarPostulante: FormGroup;

 email = new FormControl('', [Validators.required, Validators.email]);
  postulante : Postulante;
 desafioUrl: string;
 cvUrl: string;
 fotoUrl: string;
  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('desafioInput') desafioInput;
  @ViewChild('curriculumInput') curriculumInput;
  //@ViewChild('desafioInput') desafioInput;
  queue: Observable<FileQueueObject[]>;

  percentDone: number;
  uploadSuccess: boolean;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http:HttpClient,public uploader: FileUploaderService, private editarServicio: EditarPostulanteService, private recibirPostulante: RecibirPostulanteService) { }

   
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log( this.formEditarPostulante.value);
   this.editarServicio.editarPostulante(this.
   formEditarPostulante.value).subscribe(data => this.editadoCorrectamente(data),error=>this.editadoIncorrecto(error));
      
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


  getErrorMessage() {
    return (this.formEditarPostulante.get("mail") as (FormControl)).hasError('required') ? 'You must enter a value' :
        (this.formEditarPostulante.get("mail") as (FormControl)).hasError('email') ? 'Not a valid email' :'';
          //return this.formEditarPostulante.errors;
  } 
    
  //file upload
  selectFile: File = null;
 
 //form date
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(2040, 0, 1);
  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;
 //file n2g
  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {
        console.log('done')
      })
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File){
    this.http.post('https://file.io', file)
      .subscribe(event => {
        console.log('done')
      })
  }

  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))

    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){
    this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }
//file upload 
  onFileSelected(event){
    this.selectFile = <File>event.target.files[0];
  }
 

  name = 'Angular 7';
  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(event.target);
      }
    }
  }
  public delete(){
    this.url = null;
  }

  /*onUpload(){
    const fd =new FormData();
    fd.append('image', this.selectFile, this.selectFile.name);
    this.http.post('',fd).subscribe(res=>){
      console.log(res);
    });
  }*/
  
  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;

    const id = +this.route.snapshot.paramMap.get('id');
    this.getPostulante(id);

    

    

  }

  getPostulante(id: number){
    this.recibirPostulante.getPostulante(id).subscribe(
      respuesta=>{
        this.postulante=respuesta;
        this.cargarFormulario();
      },
      error_respuesta=>{
        console.log("Ha ocurrido un error");
      }
      );
  }

  cargarFormulario(){

    this.formEditarPostulante = this.formBuilder.group({
      id: new FormControl(this.postulante.id),
      nombre : new FormControl(this.postulante.nombre, [Validators.required,Validators.pattern('[/a-zA-Z]*')]),
      apellido : new FormControl(this.postulante.apellido, [Validators.required,Validators.pattern('[/a-zA-Z]*')] ),
      documento : new FormControl(this.postulante.documento, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      celular : new FormControl(this.postulante.celular),
      fecha_nac : new FormControl(),
      mail : new FormControl(this.postulante.mail, [Validators.required, Validators.email]),
      direccion : new FormControl(),
      estado : new FormControl(this.postulante.estado),
      desafioUrl: new FormControl(this.postulante.desafioUrl),
      curriculumUrl: new FormControl(this.postulante.curriculumUrl),
      comentario: new FormControl(this.postulante.comentario),
      comentarioSM:new FormControl(this.postulante.comentarioSm),
      comentarioAdmin: new FormControl(this.postulante.comentarioAdmin),
      comentarioTeam: new FormControl(this.postulante.comentarioTeam),
      comentarioDesafio: new FormControl(this.postulante.comentarioDesafio)
    });
  }
  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueueDesafio() {
    const fileBrowser = this.desafioInput.nativeElement;
    this.uploader.delete("desafio");
    this.uploader.addToQueue(fileBrowser.files,"desafio");
  }

  addToQueueCV() {
    const fileBrowser = this.curriculumInput.nativeElement;
    this.uploader.delete("CV");
    console.log(fileBrowser.files);
    this.uploader.addToQueue(fileBrowser.files,"CV");
  }
  
  /**
   * Metodo para asignar las respuestas del servidor en una variable local  una vez que se suba un archivo
   * @param isSuccess 
   * @param item 
   */
  procesarUrl(isSuccess: any,item:FileQueueObject){
    if(isSuccess){
      switch (item.tipo){
        case 'CV':{
          this.cvUrl=(item.response as HttpResponse<any>).body;
          console.log(this.cvUrl);
          break;
        }
        case 'desafio':{
          this.desafioUrl=(item.response as HttpResponse<any>).body;
          console.log(this.desafioUrl);
          break;
        }
        case 'imagen':{
          break;
        }

      }
        

    }
    return isSuccess;
  }

  vaciarDatosAdjuntos(){
    this.curriculumInput.nativeElement.value='';
    this.desafioInput.nativeElement.value='';
    this.uploader.clearQueue();
  }
  //hdhdh
  /*
  @Input()
  httpRequestHeaders: HttpHeaders | {
    [header: string]: string | string[];
  } = new HttpHeaders().set("sampleHeader", "headerValue").set("sampleHeader1", "headerValue1");

  @Input()
  httpRequestParams: HttpParams | {
    [param: string]: string | string[];
  } = new HttpParams().set("sampleRequestParam", "requestValue").set("sampleRequestParam1", "requestValue1");

  public uploadEvent($event: any) {
    console.log('from client' + JSON.stringify($event));
  }*/
  

}




