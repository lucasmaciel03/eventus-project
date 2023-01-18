import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

// Variável que controla o tipo do input tipo boolean
  type:boolean=true;


  constructor(
 
  ) { }

  ngOnInit() {
  }

  exibirouocultar(){
    this.type=!this.type
  }

}
