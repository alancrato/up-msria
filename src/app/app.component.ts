import { Component } from '@angular/core';

import { AlertController, LoadingController, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [NativeStorage, OneSignal]
})
export class AppComponent {

  public selectedIndex = 0;
  public appPages = [
    { title: 'Cariri', url: '/', icon: 'documents', category_id: 10 },
    { title: 'Polícia', url: '/', icon: 'documents', category_id: 9 },
    { title: 'Política', url: '/', icon: 'documents', category_id: 12 },
    { title: 'Esportes', url: '/', icon: 'documents', category_id: 13 },
    { title: 'Região', url: '/', icon: 'documents', category_id: 935 },
    { title: 'Entretenimento', url: '/', icon: 'documents', category_id: 14},
    { title: 'Vc Viu?', url: '/', icon: 'documents', category_id: 101 }
  ];

  constructor(
    private menu: MenuController,
    private loadingController: LoadingController,
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
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  getNotification() {
    this.nativeStorage.getItem('notify')
        .then(
            r => this.presentLoading(),
            e => this.presentAlertConfirm()
        );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
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
            this.setNotificationTrue();
          }
        }
      ]
    });

    await alert.present();
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

  async pushOneSignal() {
    await this.oneSignal.startInit('87a36160-4e53-45a5-a73d-a3a292cd2ece', '1021708848899');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived()
        .subscribe(result => {});

    this.oneSignal.handleNotificationOpened()
        .subscribe(result => {
          result.notification.isAndroid = true;
          // result.notification.payload.launchURL = 'https://g1.globo.com';
          // result.notification.payload.title = 'New title';
        });

    this.oneSignal.endInit();
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('87a36160-4e53-45a5-a73d-a3a292cd2ece', '1021708848899');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      const msg = data.payload.body;
      const title = data.payload.title;
      const additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task).then(r => {});
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      const additionalData = data.notification.payload.additionalData;

      this.showAlert('Notification opened', 'You already read this before', additionalData.task).then(r => {});
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    await alert.present();
  }

  closeMenu() {
    this.menu.close('first').then(r => {});
  }

}
