import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [WpServiceService]
})
export class SearchPage implements OnInit {

  result: any = [];
  searchStr: string;
  searching: boolean;
  page = 1;

  constructor(
      private wordpressService: WpServiceService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {}

  search() {
    this.wordpressService.search(this.searchStr, this.page)
        .subscribe(data => {
          this.presentLoading()
              .then(r => {
                this.result = data;
              }).catch(e => console.log(e));
        });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: 'Pesquisando Por: ' + this.searchStr
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
