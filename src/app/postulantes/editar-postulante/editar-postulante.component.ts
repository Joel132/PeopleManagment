import { HttpClient } from '@angular/common/http';
import {HttpClientModule, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileQueueObject, FileUploaderService } from '../../shared/helpers/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import { EditarPostulanteService } from 'src/app/shared/helpers/editar-postulante.service';
import { Postulante } from 'src/app/shared/models/postulante';
import { ActivatedRoute } from '@angular/router';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http:HttpClient,public uploader: FileUploaderService, private editarServicio: EditarPostulanteService) { }

   
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log( this.formEditarPostulante.value);
   this.editarServicio.editarPostulante(this.
   formEditarPostulante.value).subscribe(data => this.recibidoCorrectamente(data),error=>this.errorRecibido(error));
      
  }
  recibidoCorrectamente(data: Postulante){
    console.log("Editado "+data);
    //this.formPostulantes.reset();
  }

  errorRecibido(error){
''
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

    this.formEditarPostulante = this.formBuilder.group({
      id: new FormControl(+this.route.snapshot.paramMap.get('id')),
      nombre : new FormControl('', [Validators.required,Validators.pattern('[/a-zA-Z]*')]),
      apellido : new FormControl('', [Validators.required,Validators.pattern('[/a-zA-Z]*')] ),
      documento : new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      celular : new FormControl(),
      fecha_nac : new FormControl(),
      mail : new FormControl('', [Validators.required, Validators.email]),
      direccion : new FormControl(),
      estado : new FormControl(),
      desafioUrl: new FormControl(),
      curriculumUrl: new FormControl(),
      comentario: new FormControl(),
      comentarioSM:new FormControl(),
      comentarioAdmin: new FormControl(),
      comentarioTeam: new FormControl(),
      comentarioDesafio: new FormControl()
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




