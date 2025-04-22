import { Injectable, inject } from '@angular/core';
import testList from '../data/index/myths-list.json';
import charactersList from '../data/navbar/characters-list.json';
import locationsList from '../data/navbar/locations-list.json';
import mythsList from '../data/navbar/myths-list.json';
import { ArticleListItem } from '../interfaces/article-list-item';
import { Article } from '../interfaces/article';
import aphrodite from '../data/article/aphrodite.json';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private firestore = inject(Firestore);
  private mainCharactersCollection = collection(this.firestore, '/index-character-list');
  private mainLocationsCollection = collection(this.firestore, '/index-location-list');
  private mainMythsCollection = collection(this.firestore, '/index-myth-list');
  private charactersCollection = collection(this.firestore, '/navbar-character-list');
  private locationsCollection = collection(this.firestore, '/navbar-location-list');
  private mythsCollection = collection(this.firestore, '/navbar-myth-list');

  constructor() {
  }

  getMainCharacters = toSignal(collectionData(this.mainCharactersCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMainLocations = toSignal(collectionData(this.mainLocationsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMainMyths = toSignal(collectionData(this.mainMythsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getCharacters = toSignal(collectionData(this.charactersCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getLocations = toSignal(collectionData(this.locationsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMyths = toSignal(collectionData(this.mythsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  async getArticle(id: string): Promise<Article> {
    return aphrodite[0];
  }
}
