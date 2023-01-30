import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  selected = '';
  constructor(private translate: TranslateService) {}

  async setInitialAppLanguage() {
    let userlanguage = await (
      await Preferences.get({ key: 'user-lang' })
    ).value;

    if (userlanguage === null) {
      userlanguage = 'pt';
    }

    await this.translate.setDefaultLang(userlanguage);
    await this.setLanguage(userlanguage);
  }

  async setLanguage(lng: string) {
    this.selected = lng;
    await this.translate.use(lng);
    await Preferences.set({ key: 'user-lang', value: lng });
  }
}
