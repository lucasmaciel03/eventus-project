import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CrudService } from '../services/api/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
// Variável para criar conta
  usernameInput : any;
  nameInput : any;
  surnameInput : any;
  emailInput : any;
  passwordInput : any;
  password_confirmationInput : any;

// Variável que controla o tipo do input tipo boolean
  type:boolean=true;
  

  constructor(
    private crudService: CrudService,
  ) { }

  ngOnInit() {
  }

  exibirouocultar(){
    this.type=!this.type
  }

  createAccount(){
    const createAccount = {
      username : this.usernameInput,
      name : this.nameInput,
      surname : this.surnameInput,
      email : this.emailInput,
      password : this.passwordInput,
    }
    this.crudService.createAccount('createAccount', createAccount).subscribe((res) => {
      console.log(res);
      if (res == 200) {
        console.log("Conta criada com sucesso!");
      } else {
        console.log("Erro ao criar conta!");
      }
    });
  }

}
