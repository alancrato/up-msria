import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {WpServiceService} from '../services/wp-service.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.page.html',
  styleUrls: ['./office.page.scss'],
  providers: [WpServiceService]
})
export class OfficePage implements OnInit {

  pageId = 384;
  content;

  constructor(
      private wordpressService: WpServiceService,
      private menu: MenuController
  ) { }

  ngOnInit() {
    this.getPage();
  }

  openFirst() {
    this.menu.enable(true, 'first').then(r => {});
    this.menu.open('first').then(r => {});
  }

  getPage() {
    this.wordpressService.getPage(this.pageId)
        .subscribe(data => {
          this.content = data.content.rendered;
        });
  }
}
