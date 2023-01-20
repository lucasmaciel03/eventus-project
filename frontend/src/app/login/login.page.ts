import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import{ AuthenticationService} from'src/app/services/auth/authentication.service';
import { Preferences } from '@capacitor/preferences'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  constructor(
    private Router : Router,
    private authService : AuthenticationService,
    private toastController: ToastController,
    private loadingCtrl : LoadingController,
    private router : Router,

  ) { }
    usernameInput : any;
    passwordInput : any;

  ngOnInit() { }

  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
    }
  };

  async login() {
    const login ={
      username : this.usernameInput,
      password : this.passwordInput,
    };

    this.authService.login(login).subscribe(
      async (res) => {
        const toast = await this.toastController.create({
          message: "Login realizado com sucesso!",
          duration: 2000,
          color: "success"
        });
        toast.present();
        await this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
      },
      async (err: HttpErrorResponse) => {
        let message = "Erro ao iniciar sessão!";
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
