import { Injectable, inject } from '@angular/core';
import { ArticleListItem } from '../interfaces/article-list-item';
import { Article } from '../interfaces/article';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { combineLatestWith, firstValueFrom, map, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatabaseService } from './database.service';
import { FavoriteArticle } from '../interfaces/favorite-article';

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
    combineLatestWith(toObservable(this.getCharacters)),
    map(([favorites,list]) => {
      return favorites.filter(favorite => list.findIndex(character => character.id === favorite.id)!==-1);
    })
  ),{initialValue:[]});

  getFavoritLocations = toSignal(toObservable(this.databaseService.getFavoriteArticles).pipe(
    combineLatestWith(toObservable(this.getLocations)),
    map(([favorites,list]) => {
      return favorites.filter(favorite => list.findIndex(character => character.id === favorite.id)!==-1);
    })
  ),{initialValue:[]});

  getFavoritMyhts = toSignal(toObservable(this.databaseService.getFavoriteArticles).pipe(
    combineLatestWith(toObservable(this.getMyths)),
    map(([favorites,list]) => {
      return favorites.filter(favorite => list.findIndex(character => character.id === favorite.id)!==-1);
    })
  ),{initialValue:[]});

  getArticle(id: string) {
    let articleDoc = doc(this.firestore, '/article', id);
    return docData(articleDoc) as Observable<Article>;
  }

  async addToFavorites(favoriteData: FavoriteArticle) {
    return this.databaseService.addFavoriteArticle(favoriteData);
  }

  async removeFromFavorites(id: string) {
    return this.databaseService.removeFavoriteArticle(id);
  }

  isFavorite(id: string) {
    return this.databaseService.isFavoriteArticle(id);
  }
}
