import { Component } from '@angular/core';

import {AlertController, MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [NativeStorage, OneSignal]
})
export class AppComponent {

  launchURL;
  launchURLTwo;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Cariri',
      url: '/',
      icon: 'documents',
      category_id: 10
    },
    {
      title: 'Polícia',
      url: '/',
      icon: 'documents',
      category_id: 9
    },
    {
      title: 'Política',
      url: '/',
      icon: 'documents',
      category_id: 12
    },
    {
      title: 'Esportes',
      url: '/',
      icon: 'documents',
      category_id: 13
    },
    {
      title: 'Região',
      url: '/',
      icon: 'documents',
      category_id: 935
    },
    {
      title: 'Entretenimento',
      url: '/',
      icon: 'documents',
      category_id: 14
    },
    {
      title: 'Vc Viu?',
      url: '/',
      icon: 'documents',
      category_id: 101
    }
  ];
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    private nativeStorage: NativeStorage,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#01579b');
      this.splashScreen.hide();
      this.getNotification();
    });
  }

  getNotification() {
    this.nativeStorage.getItem('notify')
        .then(
            r => {},
            e => this.presentAlertConfirm()
        );
  }

  setNotificationTrue() {
    this.nativeStorage
        .setItem('notify', {property: 'value', anotherProperty: 'true'})
        .then(r => {});
  }

  setNotificationFalse() {
    this.nativeStorage
        .setItem('notify', {property: 'value', anotherProperty: 'false'})
        .then(r => {});
  }

  removeNotification() {
    this.nativeStorage
        .remove('notify').then(r => {});
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Deseja receber notificações?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.setNotificationFalse();
          }
        }, {
          text: 'Receber',
          handler: () => {
            this.pushOneSignal();
            this.setNotificationTrue();
          }
        }
      ]
    });

    await alert.present();
  }

  async pushOneSignal() {
    await this.oneSignal.startInit('87a36160-4e53-45a5-a73d-a3a292cd2ece', '1021708848899');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((result) => {
      // do something when notification is received, log
      result.payload.launchURL = 'https://g1.globo.com/';
      result.payload.title = 'New title';
    });

    /*this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened, log
    });*/

    /*this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
      alert(JSON.stringify(jsonData));
      jsonData.notification.payload.launchURL = 'https://g1.globo.com/';
      this.nav.push(DuyurularPage);
    });*/

    this.oneSignal.handleNotificationOpened().subscribe((result) => {
      /*alert(result.notification.payload.launchURL);
      this.launchURLTwo = result.notification.payload.launchURL;*/
      result.notification.payload.launchURL = 'https://g1.globo.com/';
      result.notification.payload.title = 'New title';
    });

    this.oneSignal.endInit();
  }

  closeMenu() {
    this.menu.close('first').then(r => {});
  }

}
