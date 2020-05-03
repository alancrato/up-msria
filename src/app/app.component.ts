import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [NativeStorage]
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
    private nativeStorage: NativeStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#01579b');
      this.splashScreen.hide();
      this.natStorage();
    });
  }

  natStorage() {
    this.nativeStorage.setItem('notify', {property: 'value', anotherProperty: 'true'})
        .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );

    this.nativeStorage.getItem('notify')
        .then(
            data => this.notify = data,
            error => console.error(error)
        );
  }
}
