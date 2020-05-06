import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ WpServiceService ]
})
export class Tab1Page implements OnInit {

  id;
  title;
  subtitle;

  dest: any = [];
  mDest: any = [];
  imd: any = [];

  page = 1;
  maximumPages = 100;
  items: any = [];

  liveStatus;
  titleLive;

  constructor(
      private wordpressService: WpServiceService
  ) {}

  ngOnInit() {
    this.getMch()
        .then(r => {});
    this.getLive()
        .then(r => {});
    setTimeout(() => {
      this.getDest().then(r => {});
    }, 10);
    setTimeout(() => {
      this.getMDest().then(r => {});
    }, 10);
    setTimeout(() => {
      this.getImd().then(r => {});
    }, 10);
    setTimeout(() => {
      this.getPosts().then(r => {});
    }, 10);
  }

  doRefresh(event) {
    /*console.log('Begin async operation');*/

    setTimeout(() => {
      /*console.log('Async operation has ended');*/
      event.target.complete();
    }, 10);
  }

  async getLive() {
      await this.wordpressService.getLive()
          .subscribe(data => {
              for (const  load of data) {
                  this.liveStatus = load.status;
                  this.titleLive = load.title.rendered;
              }
          });
  }

  async getMch() {
    await this.wordpressService.getMch()
        .subscribe(data => {
          for (const  load of data) {
            this.id = load.id;
            this.title = load.title.rendered;
            this.subtitle = load.subtitulo;
          }
        });
  }

  async getDest() {
    await this.wordpressService.getPostsInit(5, 2)
        .subscribe(data => {
          this.dest = data;
        });
  }

  async getMDest() {
    await this.wordpressService.getPostsInit(4, 2)
        .subscribe(data => {
          this.mDest = data;
        });
  }

  async getImd() {
    await this.wordpressService.getPostsInit(7, 2)
        .subscribe(data => {
          this.imd = data;
        });
  }

  async getPosts() {
      await this.wordpressService.getPosts(this.page)
          .subscribe(data => {
              this.items = data;
          });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.wordpressService.getPosts(this.page)
          .subscribe(data => {
            this.items.push({
               title: 'PUBLICIDADE',
            });
            for (const item of data) {
              this.items.push(item);
            }
          });
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.items.length === this.maximumPages) {
        event.target.disabled = true;
      }
    }, 1000);
  }

}
