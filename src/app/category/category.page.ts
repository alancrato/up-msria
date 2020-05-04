import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WpServiceService} from '../services/wp-service.service';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  providers: [WpServiceService]
})
export class CategoryPage implements OnInit {

  categoryId;
  categoryName;
  page = 1;
  perPage = 6;
  maximumPages = 100;
  posts: any = [];

  constructor(
      private route: ActivatedRoute,
      private menu: MenuController,
      public wordpressService: WpServiceService
  ) {
    this.categoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    setTimeout(() => {
      this.getCategory();
    }, 10);
    this.getPostsCategory();
  }

  getCategory() {
    this.wordpressService
        .getCategory(this.categoryId)
        .subscribe(data => {
          this.categoryName = data.name;
        });
  }

  getPostsCategory() {
    this.wordpressService.getPostsCategory(this.categoryId, this.page, this.perPage)
        .subscribe(data => {
          this.posts = data;
        });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.wordpressService.getPostsCategory(this.categoryId, this.page, this.perPage)
          .subscribe(data => {
            this.posts.push({
              title: 'PUBLICIDADE',
            });
            for (const item of data) {
              this.posts.push(item);
            }
          });
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.posts.length === this.maximumPages) {
        event.target.disabled = true;
      }
    }, 10);
  }

  openFirst() {
    this.menu.enable(true, 'first').then(r => {});
    this.menu.open('first').then(r => {});
  }

}
