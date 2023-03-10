import { Preferences } from '@capacitor/preferences';
import { LocalizationService } from './../../services/localization/localization.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular'; 
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-cardhistory',
  templateUrl: './cardhistory.component.html',
  styleUrls: ['./cardhistory.component.scss'],
})
export class CardhistoryComponent implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private navController: NavController,
    private router: Router,
    private translateService: TranslateService,
    private LocalizationService: LocalizationService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    public modalController: ModalController
  ) {
  }
  user: any;
  events: any[] = [];
  monthNames = ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


  async ngOnInit() {
    await this.getToken();
    this.getEventsByUserId();
  }

  async goForward(event:any) {
    this.navController.setDirection('forward');
    this.router.navigate(['/eventpage'], { queryParams: { event: JSON.stringify(event) } });
    console.log(event)
  }

  getToken = async () => {
    const token = await Preferences.get({ key: 'token' });

    if (token.value !== null) {
      const user = jwt_decode(token.value);
      this.user = user;
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

  getEventsByUserId = async () => {
    console.log('*****************' + 'ENTROU' + this.user._id)
    if (this.user) {
    this.crudService.getLikedEvents('getEventsByUserId', this.user._id).subscribe(
    (data) => {
    console.log('****************' + data);
    this.events = data;
    this.events.forEach(event => {
      event.image = `http://localhost:4243/uploads/events/${event.image}`;
    });
    });
    }
  }

  getFormattedDate(date: string) {
    let dateObj = new Date(date);
    let day = dateObj.getDate();
    let monthIndex = dateObj.getMonth();
    return `${day} ${this.monthNames[monthIndex]}`;
  }

  canDelete = async (id:any) => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
  
    actionSheet.present();
  
    const { role } = await actionSheet.onWillDismiss();
  
    if (role === 'confirm') {
      this.deleteEvent(id);
   
    }
  };
  //delete event
  deleteEvent = async (id:any) => {
   this.crudService.deleteEvent('deleteEvent',id).subscribe();
   setTimeout(() => {
    this.getEventsByUserId();
   }, 1000);
  }

  // event for open the modal 
  async openModal() {
    const modal = await this.modalController.create({
      component: 'my-modal',
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}


