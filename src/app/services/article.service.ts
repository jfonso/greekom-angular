import { Injectable, inject } from '@angular/core';
import { ArticleListItem } from '../interfaces/article-list-item';
import { Article } from '../interfaces/article';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private firestore = inject(Firestore);
  private databaseService = inject(DatabaseService);
  private mainCharactersCollection = collection(this.firestore, '/index-character-list');
  private mainLocationsCollection = collection(this.firestore, '/index-location-list');
  private mainMythsCollection = collection(this.firestore, '/index-myth-list');
  private navbarCharactersCollection = collection(this.firestore, '/navbar-character-list');
  private navbarLocationsCollection = collection(this.firestore, '/navbar-location-list');
  private navbarMythsCollection = collection(this.firestore, '/navbar-myth-list');

  constructor() {
  }

  getMainCharacters = toSignal(collectionData(this.mainCharactersCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMainLocations = toSignal(collectionData(this.mainLocationsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMainMyths = toSignal(collectionData(this.mainMythsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getCharacters = toSignal(collectionData(this.navbarCharactersCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getLocations = toSignal(collectionData(this.navbarLocationsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMyths = toSignal(collectionData(this.navbarMythsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getFavoritCharacters = toSignal(toObservable(this.databaseService.getFavoriteArticles).pipe(
    map(favorites => {
      return favorites.filter(favorite => this.getCharacters().findIndex(character => character.id === favorite.id)!==-1);
    })
  ),{initialValue:[]});

  getFavoritLocations = toSignal(toObservable(this.databaseService.getFavoriteArticles).pipe(
    map(favorites => {
      return favorites.filter(favorite => this.getLocations().findIndex(character => character.id === favorite.id)!==-1);
    })
  ),{initialValue:[]});

  getFavoritMyhts = toSignal(toObservable(this.databaseService.getFavoriteArticles).pipe(
    map(favorites => {
      return favorites.filter(favorite => this.getMyths().findIndex(character => character.id === favorite.id)!==-1);
    })
  ),{initialValue:[]});

  getArticle(id: string) {
    let articleDoc = doc(this.firestore, '/article', id);
    return docData(articleDoc) as Observable<Article>;
  }

  async addToFavorites(id: string) {
    let articleLists = {
      character: this.getCharacters,
      locations: this.getLocations,
      myths: this.getMyths
    };
    let favoriteArticle = null;
    for (const type in articleLists) {
      const item = articleLists[type as keyof typeof articleLists]().find(item => item.id === id);
      if (!item) continue;
      favoriteArticle = {
        id: item.id,
        title: item.name,
        type,
        image_url: item.image_url
      };
      break;
    }
    if (!favoriteArticle) return;
    return this.databaseService.addFavoriteArticle(favoriteArticle);
  }

  async removeFromFavorites(id: string) {
    return this.databaseService.removeFavoriteArticle(id);
  }

  isFavorite(id: string) {
    return this.databaseService.isFavoriteArticle(id);
  }
}
