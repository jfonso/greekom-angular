import { Injectable, inject } from '@angular/core';
import { ArticleListItem } from '../interfaces/article-list-item';
import { Article } from '../interfaces/article';
import aphrodite from '../data/article/aphrodite.json';
import { Firestore, addDoc, collection, collectionData, collectionSnapshots, doc, getDoc, query, setDoc, where } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private firestore = inject(Firestore);
  private mainCharactersCollection = collection(this.firestore, '/index-character-list');
  private mainLocationsCollection = collection(this.firestore, '/index-location-list');
  private mainMythsCollection = collection(this.firestore, '/index-myth-list');
  private navbarCharactersCollection = collection(this.firestore, '/navbar-character-list');
  private navbarLocationsCollection = collection(this.firestore, '/navbar-location-list');
  private navbarMythsCollection = collection(this.firestore, '/navbar-myth-list');
  private articlesCollection = collection(this.firestore, '/article');

  constructor() {
  }

  getMainCharacters = toSignal(collectionData(this.mainCharactersCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMainLocations = toSignal(collectionData(this.mainLocationsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMainMyths = toSignal(collectionData(this.mainMythsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getCharacters = toSignal(collectionData(this.navbarCharactersCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getLocations = toSignal(collectionData(this.navbarLocationsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  getMyths = toSignal(collectionData(this.navbarMythsCollection) as Observable<ArticleListItem[]>,{initialValue:[]});

  async getArticle(id: string) {
    return (await getDoc(doc(this.firestore,'article',id))).data();
  }
}
