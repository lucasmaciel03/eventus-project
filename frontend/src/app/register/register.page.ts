import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CrudService } from '../services/api/crud.service';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';



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
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  exibirouocultar(){
    this.type=!this.type
  }
  async createAccount() {
    // Check if password and password_confirmation are the same
    if(this.passwordInput != this.password_confirmationInput) {
      const toast = await this.toastController.create({
        message: "As senhas não são iguais!",
        duration: 2000,
        color: "danger"
      });
      toast.present();
      return;
    }
    // Create account
    const createAccount = {
      username : this.usernameInput,
      name : this.nameInput,
      surname : this.surnameInput,
      email : this.emailInput,
      password : this.passwordInput,
    }
    this.crudService.createAccount('createAccount', createAccount).subscribe(
      async (res) => {
          const toast = await this.toastController.create({
            message: "Conta criada com sucesso, Bem vindo!",
            duration: 2000,
            color: "success"
            
          });
          toast.present();
          setTimeout(() => { // Delay to show the toast
            this.navCtrl.navigateRoot('/tabs/tab1');
          }
          , 2000);
      },
      async (err: HttpErrorResponse) => {
        let message = "Erro ao criar conta!";
        if(err.error && err.error.message) {
          message = err.error.message;
        }
        const toast = await this.toastController.create({
          message: message,
          duration: 2000,
          color: "danger"
        });
        toast.present();
      }
    );
  }



}
