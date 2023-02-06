import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './../services/localization/localization.service';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/api/crud.service';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HttpErrorResponse } from '@angular/common/http';

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
  nameInput: any;
  surnameInput: any;
  newEmail: any;
  locationInput: any;
  birthDateInput: any;
  locations: any[] = [];
  

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
    this.getLocations();
    
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
    this.locationInput = this.user.locationName;
    this.getUser();
  }


  logout = async () => {
    const token = await Preferences.get({ key: 'token' });

    // console.log(token.value !== null);
    if (token) {
      Preferences.remove({ key: 'token' });
      window.location.reload();
    }
  };


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
      this.profilePicture = `http://localhost:4243/uploads/users/${data.profilePicture}`;
      this.locationName = data.locationName;
      this.birthDate = data.birthDate;
      this.joinedDate = data.joinedDate;
    });
  };

  getLocations = async () => {
    this.crudService.getLocations('getLocations').subscribe((data) => {
      this.locations = data;
    });
  };


  async createFoto(image: any) {

    const file = this.dataURLtoFile(image.dataUrl, `profilePicture.${image.format}`);

    let formData = new FormData();
    formData.append('profilePicture', file);

    this.crudService
    .updatePicture('updateProfilePicture', this.user._id, formData)
    .subscribe( async (data) => {
      const toast = await this.toastController.create({
        message: 'Foto de perfil atualizada com sucesso!',
        duration: 2000,
        color: "success"
    });
    toast.present();
      this.getUser();
    });
  }

  async updatePicture2(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      presentationStyle: 'fullscreen'
    });

     await this.createFoto(image);
  }

  async updatePicture() {
    const formData = new FormData();
    const file = this.pictureInput ;
    if (file) {
      formData.append('profilePicture', file);
      this.crudService
        .updatePicture('updateProfilePicture', this.user._id, formData)
        .subscribe( async (data) => {
          const toast = await this.toastController.create({
            message: 'Foto de perfil atualizada com sucesso!',
            duration: 2000,
            color: "success"
        });
        toast.present();
          this.getUser();
        });
    } else {
      const toast = await this.toastController.create({
        message: 'Selecione uma foto!',
        duration: 2000,
        color: "danger"
    });
    toast.present();
    }
  }
  

  dataURLtoFile(dataurl : any, filename : any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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

  async updateUser() {
    let changedName = false;
    let changedSurname = false;
    let changedEmail = false;
    let changedLocation = false;
    let changedBirthDate = false;

    if (this.nameInput !== this.user.name) {
      changedName = true;
    }
    if (this.surnameInput !== this.user.surname) {
      changedSurname = true;
    }
    if (this.newEmail !== this.user.email) {
      changedEmail = true;
    }
    if (this.locationInput !== this.user.locationName) {
      changedLocation = true;
    }
    if (this.birthDateInput !== this.user.birthDate) {
      changedBirthDate = true;
    }


    const newUpdate = {
      name : this.nameInput,
      surname : this.surnameInput,
      email : this.newEmail,
      locationName: this.locationInput,
      birthDate: this.birthDateInput
    }
    this.crudService
      .updateUser('updateUser', this.user._id, newUpdate)
      .subscribe(
        async (res) => {
          this.getUser();
          // If all equal false send message nothing changed
          if (!changedName && !changedSurname && !changedEmail && !changedLocation && !changedBirthDate) {
            const toast = await this.toastController.create({
              message: 'Nada foi alterado',
              duration: 2000,
              color: "medium"
          });
          toast.present();
          }
          if (changedName) {
            const toast = await this.toastController.create({
              message: 'O nome foi alterado',
              duration: 2000,
              color: "success"
          });
          toast.present();
          }
          if (changedSurname) {
            const toast = await this.toastController.create({
              message: 'O sobrenome foi alterado',
              duration: 2000,
              color: "success"
          });
          toast.present();
          }
          if (changedEmail) {
            const toast = await this.toastController.create({
              message: 'O email foi alterado',
              duration: 2000,
              color: "success"
          });
          toast.present();
          }
          if (changedLocation) {
            const toast = await this.toastController.create({
              message: 'A localização foi alterada',
              duration: 2000,
              color: "success"
          });
          toast.present();
          }
          if (changedBirthDate) {
            const toast = await this.toastController.create({
              message: 'A data de nascimento foi alterada',
              duration: 2000,
              color: "success"
          });
          toast.present();
          }
        },
        async (err) => {
          const toast = await this.toastController.create({
            message: 'Ocorreu um erro ao atualizar os dados',
            duration: 2000,
            color: "danger"
        });
        toast.present();
        }
      );
  }
}


