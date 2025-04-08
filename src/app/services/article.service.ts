import { Injectable } from '@angular/core';
import mainCharactersList from '../data/index/characters-list.json';
import mainLocationsList from '../data/index/locations-list.json';
import mainMythsList from '../data/index/myths-list.json';
import charactersList from '../data/navbar/characters-list.json';
import locationsList from '../data/navbar/locations-list.json';
import mythsList from '../data/navbar/myths-list.json';
import { ArticleListItem } from '../interfaces/article-list-item';
import { Article } from '../interfaces/article';
import aphrodite from '../data/article/aphrodite.json';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }

  async getMainCharacters(): Promise<ArticleListItem[]> {
    return mainCharactersList;
  }

  async getMainLocations(): Promise<ArticleListItem[]> {
    return mainLocationsList;
  }

  async getMainMyths(): Promise<ArticleListItem[]> {
    return mainMythsList;
  }

  async getCharacters(): Promise<ArticleListItem[]> {
    return charactersList;
  }

  async getLocations(): Promise<ArticleListItem[]> {
    return locationsList;
  }

  async getMyths(): Promise<ArticleListItem[]> {
    return mythsList;
  }

  async getArticle(id: string): Promise<Article> {
    return aphrodite[0];
  }
}
