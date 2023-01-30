import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/api/crud.service';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user: any;
  username: any;
  name: any;
  surname: any;
  email: any;
  password: any;
  profilePicture: any;
  locationName: any;
  birthDate: any;
  joinedDate: any;
  pictureInput: any;

  presentingElement: any = null;

  constructor(
    private navController: NavController,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.getToken();
    this.checkToken();

    this.presentingElement = document.querySelector('.ion-page');
  }

  ionViewWillEnter() {
    this.username = this.user.username;
    this.name = this.user.name;
    this.surname = this.user.surname;
    this.email = this.user.email;
    this.password = this.user.password;
    this.profilePicture = this.user.profilePicture;
    this.locationName = this.user.locationName;
    this.birthDate = this.user.birthDate;
    this.joinedDate = this.user.joinedDate;
    this.getUser();
  }

  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      this.getUser();
    }
  };

  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('tabs/tab4', { replaceUrl: true });
    }
  };

  getUser = async () => {
    this.crudService.getUser('getUserById', this.user._id).subscribe((data) => {
      this.username = data.username;
      this.name = data.name;
      this.surname = data.surname;
      this.email = data.email;
      this.password = data.password;
      this.profilePicture = `http://localhost:4243/uploads/${data.profilePicture}`;
      this.locationName = data.locationName;
      this.birthDate = data.birthDate;
      this.joinedDate = data.joinedDate;
    });
}

  async updatePicture() {
    const formData = new FormData();
    formData.append('profilePicture', this.pictureInput);
    this.crudService.updatePicture("updateProfilePicture", this.user._id, formData)
    .subscribe((data) => {
      alert("Foto de perfil atualizada com sucesso!");
      this.getUser();
    });
  }


  async goBack() {
    this.navController.setDirection('back');
    await this.router.navigate(['/tabs/tab1'], {
      replaceUrl: true,
    });
  }
}
