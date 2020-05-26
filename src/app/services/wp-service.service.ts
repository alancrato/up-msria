import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class WpServiceService {

  apiUrlV1: any = 'https://www.miseria.com.br/wp-json/';
  apiUrlV2: any = 'https://miseria.com.br/wp-json/wp/v2/';

  constructor(private http: HttpClient) { }

  public getMch(): any {
      return this.http.get(this.apiUrlV2 + 'posts/?status=publish&categories=3&per_page=1');
  }

  public getPostsInit(category: number, perPage: number): any {
      return this.http
          .get(this.apiUrlV2 + 'posts/?status=publish&categories=' + category + '&per_page=' + perPage);
  }

  public getPostsCategory(category: number, page: number, perPage: number): any {
      return this.http
          .get(this.apiUrlV2 + 'posts/?status=publish&categories=' + category + '&per_page=' + perPage + '&page=' + page);
  }

  public getPost(id: string): any {
      return this.http.get(this.apiUrlV2 + 'posts/' + id);
  }

  public getCategory(id: number): any {
      return this.http.get(this.apiUrlV2 + 'categories/' + id);
  }

  public getPosts(page: number): any {
      return this.http.get(this.apiUrlV2 + 'posts/?status=publish&page=' + page + '&per_page=6&categories_exclude=3,4,5,7');
  }

  public getPopularPosts(): any {
      return this.http.get(this.apiUrlV1 + 'wordpress-popular-posts/v1/popular-posts?range=last24hours&limit=15');
  }

  public getPopularPostsOffset(): any {
      return this.http.get(this.apiUrlV1 + 'wordpress-popular-posts/v1/popular-posts?range=last24hours&limit=15&offset=15');
  }

  public getLive(): any {
      return this.http.get(this.apiUrlV2 + 'lives?status=publish&per_page=1');
  }

  public getPostsIndexOffsetInfinite(page: number): any {
      return this.http.get(this.apiUrlV2 + 'posts/?status=publish&offset=7&page' + page + '&per_page=6');
  }

  public getImd(): any {
      return this.http.get(this.apiUrlV2 + 'posts/?status=publish&categories=7&per_page=2');
  }

  public getCategories(): any {
      return this.http.get(this.apiUrlV2 + 'categories?order_by=count&order=desc');
  }

  public getPostsByCat(categoryName: string, page: number): any {
      return this.http.get(this.apiUrlV2 + 'posts/?status=publish&category=' + categoryName + '&page=' + page);
  }

  public getMedia(id: string): any {
      return this.http.get(this.apiUrlV2 + '/media/' + id);
  }

  public search(searchStr: string, page: number): any {
      return this.http.get(this.apiUrlV2 + 'posts/?status=publish&search=' + searchStr + '&page=' + page);
  }

  public getPage(id: number): any {
      return this.http.get(this.apiUrlV2 + 'pages/' + id);
  }
}
