import { Injectable, inject } from '@angular/core';
import charactersList from '../data/navbar/characters-list.json';
import locationsList from '../data/navbar/locations-list.json';
import mythsList from '../data/navbar/myths-list.json';
import { ArticleListItem } from '../interfaces/article-list-item';
import { Article } from '../interfaces/article';
import aphrodite from '../data/article/aphrodite.json';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private firestore = inject(Firestore);
  private mainCharactersCollection = collection(this.firestore, '/index-character-list');
  private mainLocationsCollection = collection(this.firestore, '/index-location-list');
  private mainMythsCollection = collection(this.firestore, '/index-myths-list');

  constructor() { }

  getMainCharacters(): Observable<ArticleListItem[]> {
    return collectionData(this.mainCharactersCollection) as Observable<ArticleListItem[]>;
  }

  getMainLocations(): Observable<ArticleListItem[]> {
    return collectionData(this.mainLocationsCollection) as Observable<ArticleListItem[]>;
  }

  getMainMyths(): Observable<ArticleListItem[]> {
    return collectionData(this.mainMythsCollection) as Observable<ArticleListItem[]>;
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
