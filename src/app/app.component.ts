import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [GoogleAnalytics, NativeStorage, SecureStorage]
})
export class AppComponent {
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
    private ga: GoogleAnalytics,
    private nativeStorage: NativeStorage,
    private secureStorage: SecureStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#01579b');
      this.splashScreen.hide();
    });
  }

  GoogleAnalytics() {
    this.ga.startTrackerWithId('UA-62779740-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Últimas App', '/', true).then(r => {});
          // Tracker is ready
          // You can now track pages or set additional information such as AppVersion or UserId
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  natStorage() {
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
        .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );

    this.nativeStorage.getItem('myitem')
        .then(
            data => console.log(data),
            error => console.error(error)
        );
  }

  secStorage() {
    this.secureStorage.create('app_msr')
        .then((storage: SecureStorageObject) => {

          storage.get('key')
              .then(
                  data => console.log(data),
                  error => console.log(error)
              );

          storage.set('key', 'value')
              .then(
                  data => console.log(data),
                  error => console.log(error)
              );

          storage.remove('key')
              .then(
                  data => console.log(data),
                  error => console.log(error)
              );

        });
  }
}
