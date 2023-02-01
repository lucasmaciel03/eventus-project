import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './../services/localization/localization.service';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
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
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentEmail: string = '';
  newEmail: string = '';

  presentingElement: HTMLElement | undefined = undefined;
  constructor(
    private navController: NavController,
    private router: Router,
    private crudService: CrudService,
    private translateService: TranslateService,
    private toastController: ToastController,
    private LocalizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.getToken();
    this.checkToken();

    this.presentingElement = document.getElementById('main-content')!;
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
  };

  async updatePicture() {
    const formData = new FormData();
    formData.append('profilePicture', this.pictureInput);
    this.crudService
      .updatePicture('updateProfilePicture', this.user._id, formData)
      .subscribe((data) => {
        alert('Foto de perfil atualizada com sucesso!');
        this.getUser();
      });
  }

  async goBack() {
    this.navController.setDirection('back');
    await this.router.navigate(['/tabs/tab1'], {
      replaceUrl: true,
    });
  }

  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.LocalizationService.setLanguage(language);
    await this.showToast();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('language as been changed'),
      duration: 4000,
    });
    await toast.present();
  }

  async updatePasswordAndEmail() {
    console.log('change password');
  }
}
