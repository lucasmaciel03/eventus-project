import { Event } from './../services/api/crud.service';
import { LocalizationService } from './../services/localization/localization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CrudService } from 'src/app/services/api/crud.service';
import { CommentWithUser } from '../services/api/crud.service';
import { CommentsResponse } from '../services/api/crud.service';


@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  event: any;
  favorite: boolean = false;
  constructor(
    private toastCtrl: ToastController,
    private navController: NavController,
    private router: Router,
    private toastController: ToastController,
    private translateService: TranslateService,
    private LocalizationService: LocalizationService,
    private route: ActivatedRoute,
    private crudService: CrudService

  ) {}
  monthNames = ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  user : any;
  profilePicture : any;
  commentInput : any;
  comments: CommentWithUser[] = [];
  totalComments: number = 0;

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.event = JSON.parse(params['event']);
      console.log('++++++++++++++++++'+this.event.id)
    });
    await this.getToken();
    console.log(this.event)
    this.getUser();
    this.getEventComments();
  }


  async presentToast() {
    this.favorite = !this.favorite;
    let message = this.favorite
      ? 'Adicionado aos favoritos'
      : 'Removido dos favoritos';
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'primary',
    });

    toast.present();
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
    console.log(language);
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('language as been changed'),
      duration: 4000,
    });
    await toast.present();
  }

  getFormattedDate(date: string) {
    let dateObj = new Date(date);
    let day = dateObj.getDate();
    let monthIndex = dateObj.getMonth();
    return `${day} ${this.monthNames[monthIndex]}`;
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
  
  getUser = async () => {
    this.crudService.getUser('getUserById', this.user._id).subscribe((data) => {
      this.profilePicture = `http://localhost:4243/uploads/users/${data.profilePicture}`;
    });
  };

  createEventComment = async () => {
    const comment = {
      comment: this.commentInput,
      user: this.user._id,
      event: this.event.id,
    };
    this.crudService.createEventComment('createEventComment', this.user._id, this.event.id, comment).subscribe(
      (data) => {
        console.log(data);
        this.commentInput = '';
        // RELOAD COMMENTS
        this.getEventComments();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEventComments = async () => {
    this.crudService.getEventComments('getEventComments', this.event.id).subscribe(
      (data: CommentsResponse) => {
        this.comments = [];
        this.comments.push(...data.commentsWithUser);
        console.log('*********************************'+this.comments);
        this.totalComments = this.comments.length;
        console.log('+++++++++++++++++++++++++++++++++++++++'+this.totalComments)
        this.comments.forEach((comment) => {
          comment.user.profilePicture = `http://localhost:4243/uploads/users/${comment.user.profilePicture}`;
        }
        );
      }
    );
  }
  
  
  
}

