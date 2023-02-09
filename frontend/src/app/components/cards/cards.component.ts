import { Preferences } from '@capacitor/preferences';
import { LocalizationService } from './../../services/localization/localization.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  favorite: boolean = false;
  constructor(
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private navController: NavController,
    private router: Router,
    private translateService: TranslateService,
    private LocalizationService: LocalizationService,
    private crudService: CrudService,
    private route: ActivatedRoute
  ) {}
  user: any;
  events: any[] = [];
  eventsComments: any[] = [];
  monthNames = ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  // Create variable caegoryId for default value 1
  categoryId: number = 1;

  async ngOnInit() {
    await this.getToken();
    this.getEventsByUserIdAndCategoryId()
  }

  async presentToast(event:any) {
    this.favorite = !this.favorite;

    try {
      const response = await this.crudService.addLike('addLike', this.user._id, event.id, event);
      const result = await response.toPromise();
  
      console.log(result);
      /* display a success toast */
    } catch (error) {
      console.error(error);
      /* display an error toast */
      console.log(event.id)
    }
  }

  async goForward(event:any) {
    this.navController.setDirection('forward');
    this.router.navigate(['/eventpage'], { queryParams: { event: JSON.stringify(event) } });
    console.log('***************************' + event)
    console.log(event)
  }

  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.LocalizationService.setLanguage(language);
    await this.showToast();
    console.log(language);
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
      console.log('******************************' + this.user._id);
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

  getEvents() {
    this.crudService.getEvents('getAllEvents').subscribe((data) => {
      this.events = data;
      console.log(data)
        this.events.forEach((event) => {
          event.image = `http://localhost:4243/uploads/events/${event.image}`;
        });
    });
  }

  getEventsByUserIdAndCategoryId(){
    this.crudService.getEventsByUserIdAndCategoryId('getEventsByUserIdAndCategoryId', this.user._id, this.categoryId).subscribe((data) => {
      this.events = data;
      console.log(data)
        this.events.forEach((event) => {
          event.image = `http://localhost:4243/uploads/events/${event.image}`;
          if(event.like == true){
            this.favorite = true;
          } else {
            this.favorite = false;
          }
          event.profilePicture = `http://localhost:4243/uploads/users/${event.profilePicture}`;
        });
    }
    
    );
  }

  getFormattedDate(date: string) {

    let dateObj = new Date(date);
    let day = dateObj.getDate();
    let monthIndex = dateObj.getMonth();
    return `${day} ${this.monthNames[monthIndex]}`;
  }
}
