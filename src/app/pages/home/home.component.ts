import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { IArticle } from 'src/app/model/iarticle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articlesSubscription = new Subscription();
  ArticlesList: IArticle[] = [];
  isLoading = false;

  constructor(private articlesService : ArticlesService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.isLoading = false;
    this.articlesSubscription = this.articlesService.getArticles().subscribe((response) => {
      this.ArticlesList = response;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.articlesSubscription.unsubscribe();
  }

}
