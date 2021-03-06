import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
  providers: [WpServiceService, SocialSharing]
})
export class SinglePage implements OnInit {

  getId;

  title;
  subtitle;
  author;
  date;
  content = '';
  thumb = [];
  iframe;
  url;
  link;

  categoryId;
  categoryName: string;

  constructor(
      public wordpressService: WpServiceService,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer,
      private socialSharing: SocialSharing
  ) {
      this.getId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    setTimeout(() => {
        this.getPost();
    }, 10);
    setTimeout(() => {
          this.getCategory();
      }, 1000);
  }

  getPost() {
    this.wordpressService
        .getPost(this.getId)
        .subscribe(data => {
          this.categoryId = data.categories[0];
          this.author = data.autor;
          this.title = data.title.rendered;
          this.subtitle = data.subtitulo;
          this.date = data.date;
          this.thumb = data.better_featured_image ? data.better_featured_image.source_url : [];
          this.content = data.content.rendered;
          this.iframe = data.iframe;
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data.iframe);
          this.link = data.link;
        });
  }

  getCategory() {
      this.wordpressService
          .getCategory(this.categoryId)
          .subscribe(data => {
              this.categoryName = data.name;
          });
  }

  sendShare(message, subject, url) {
      this.socialSharing.share(message, subject, null, url)
          .then(res => {
              console.log(res);
          })
          .catch(err => {
              console.log(err);
          });
  }

}
