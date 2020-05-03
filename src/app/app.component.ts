import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
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

  notify;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Últimas',
      url: '/',
      icon: 'home',
      category_id: 1
    },
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
      this.setNotificationFalse();
      setTimeout(() => {
        if (this.notify === 'false') {
          this.presentAlertConfirm().then(r => {});
        }
      }, 1000);
    });
  }

  getNotification() {
    if (!this.nativeStorage.getItem('notify')) {
      this.presentAlertConfirm().then(r => {});
    } else {
      this.pushOneSignal().then(r => {});
    }
  }

  setNotificationTrue() {
    this.nativeStorage
        .setItem('notify', {property: 'value', anotherProperty: 'true'})
        .then(response => {
          this.pushOneSignal().then(data => {});
        });
  }

  setNotificationFalse() {
    this.nativeStorage
        .setItem('notify', {property: 'value', anotherProperty: 'false'})
        .then(data => this.notify = data);
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
          }
        }
      ]
    });

    await alert.present();
  }

  async pushOneSignal() {
    await this.oneSignal.startInit('87a36160-4e53-45a5-a73d-a3a292cd2ece', '1021708848899');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received, log
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened, log
    });

    this.oneSignal.endInit();
  }

}
