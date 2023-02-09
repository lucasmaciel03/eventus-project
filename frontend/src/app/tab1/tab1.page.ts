import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalizationService } from './../services/localization/localization.service';
import { CrudService } from '../services/api/crud.service';
import jwt_decode from 'jwt-decode';
import { request } from 'http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  
  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private LocalizationService: LocalizationService,
    private http: HttpClient,
    private crudService: CrudService,
    private router: Router,
    private navCtrl: NavController,


  ) {}

  ngOnInit() {
    this.getToken();
    this.checkToken();
    this.getLocations();
    this.getCategories();
  }

  isModalOpen = false;
  user: any;
  locations: any[] = [];
  categories: any[] = [];

  // Variables to create event
  titleInput: any;
  descriptionInput: any;
  locationInput: any;
  adressInput: any;
  startDateInput: any;
  endDateInput: any;
  categoryInput: any;
  imageInput: any ;
  

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
      console.log('++++++++++++++++++++++++' + this.user._id);
    }
  };

  checkToken = async () => {
    const hasToken = await Preferences.get({ key: 'token' });
    if (hasToken.value === null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
    }
  };

  getLocations = async () => {
    this.crudService.getLocations('getLocations').subscribe((data) => {
      this.locations = data;
    });
  };

  getCategories = async () => {
    this.crudService.getCategories('getCategories').subscribe((data) => {
      this.categories = data;
    });
  }

  

  createEvent = async () => {
    let formData = new FormData();
    // I need save the file.filename for the this.imageInput variable but I don't know how to do it
    let file = this.imageInput;
    console.log(this.imageInput)
    if (file) {
      formData.append('image',this.imageInput);
      formData.append('title', this.titleInput);
      formData.append('description', this.descriptionInput);
      formData.append('locationName', this.locationInput);
      formData.append('adress', this.adressInput);
      formData.append('startDate', this.startDateInput);
      formData.append('endDate', this.endDateInput);
      formData.append('categoryName', this.categoryInput);
  
      this.crudService
        .createEvent('addEvent', this.user._id, formData)
        .subscribe(async (data) => {
          const toast = await this.toastController.create({
            message: 'Evento criado com sucesso!',
            duration: 2000,
            color: 'success',
          });
          toast.present();
        });
    } else {
      const toast = await this.toastController.create({
        message: 'Selecione uma imagem para o evento!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
  
}
