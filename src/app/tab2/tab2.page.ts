import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [WpServiceService]
})
export class Tab2Page implements OnInit {

  popularPosts: any = [];
  popularPostsOffset: any = [];

  constructor(
      private wordpressService: WpServiceService,
      private loadingController: LoadingController
  ) {
      this.getPopularPosts();
  }

  ngOnInit(): void {
    this.presentLoading().then(r => {
        setTimeout(() => {
            this.getPopularPostsOffset();
        }, 1000);
    });
  }

  async presentLoading() {
      const loading = await this.loadingController.create({
          duration: 2000,
          message: 'Buscando Mais Lidas...'
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
  }

  getPopularPosts() {
    this.wordpressService.getPopularPosts()
        .subscribe(data => {
          this.popularPosts = data;
        });
  }

  getPopularPostsOffset() {
     this.wordpressService.getPopularPostsOffset()
        .subscribe(data => {
          this.popularPostsOffset = data;
        });
  }
}
