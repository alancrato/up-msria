import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [WpServiceService, YoutubeVideoPlayer, HttpClient]
})
export class Tab3Page implements OnInit {

  posts: any [];
  url;
  apiKey = 'AIzaSyBuXMVAxc_fiRgXhKeQRpSthWuzdPhkFbM';
  channelId = 'UCZZPgUIorPao48a1tBYSDgg'; // Devdactic Channel ID
  apiUrlYtb = 'https://www.googleapis.com/youtube/v3/playlists?key=';

  constructor(
      private wordpressService: WpServiceService,
      private sanitizer: DomSanitizer,
      private youtube: YoutubeVideoPlayer,
      private http: HttpClient
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

  getPlaylistsForChannel() {
    this.http.get(this.apiUrlYtb + this.apiKey + '&channelId=' + this.channelId + '&part=snippet,id&maxResults=20')
        .subscribe(data => {
            console.log(data);
        });
  }


}
