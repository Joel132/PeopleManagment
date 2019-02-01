import { Funcionario } from './../../shared/models/funcionario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecibirFuncionarioService } from 'src/app/shared/helpers/recibir-funcionario.service';

@Component({
  selector: 'app-ver-funcionario',
  templateUrl: './ver-funcionario.component.html',
  styleUrls: ['./ver-funcionario.component.css']
})
export class VerFuncionarioComponent implements OnInit {
  step = 0;
  usuarios: Funcionario;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  
  constructor(private usuariosService: RecibirFuncionarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFuncionario();
  }

  
  getFuncionario(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuariosService.getFuncionario(id).subscribe(data => {this.usuarios = data;console.log("hola",this.usuarios)});
}

}
