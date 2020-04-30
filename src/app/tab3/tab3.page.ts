import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [WpServiceService]
})
export class Tab3Page implements OnInit {

  posts: any [];
  url;

  constructor(
      private wordpressService: WpServiceService,
      private sanitizer: DomSanitizer
  ) {
    this.getSafeUrl('https://www.youtube.com/embed/dDMg3v6uH9s');
  }

  getSafeUrl(url) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.getPostsTv();
  }

  getPostsTv() {
    this.wordpressService.getPostsCategory(8, 1, 10)
        .subscribe(data => {
          this.posts = data;
        });
  }
}
