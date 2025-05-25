import {inject, Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Platform} from '@ionic/angular';
import { BehaviorSubject, combineLatestWith, firstValueFrom, from, map, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';
import { Favorite } from '../interfaces/favorite';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService {


  private userService = inject(UserService);
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly ARTICLES_STORAGE_KEY = 'favorite_articles';
  private readonly THREADS_STORAGE_KEY = 'favorite_threads';
  private readonly STORAGE_DB = 'favoritesDB';

  private favoriteArticlesChanged = new BehaviorSubject<void>(undefined);
  private favoriteArticles = new BehaviorSubject<Favorite[]>([]);

  private favoriteThreadsChanged = new BehaviorSubject<void>(undefined);
  private favoriteThreads = new BehaviorSubject<Favorite[]>([]);

  private userObservable = toObservable(this.userService.getCurrentUser);

  private favoriteTypeDic = {
    article: {
      storageKey: this.ARTICLES_STORAGE_KEY,
      table: 'favorite_articles',
      favoritesChanged: this.favoriteArticlesChanged,
      favorites: this.favoriteArticles
    },
    thread: {
      storageKey: this.THREADS_STORAGE_KEY,
      table: 'favorite_threads',
      favoritesChanged: this.favoriteThreadsChanged,
      favorites: this.favoriteThreads
    }
  };

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  private async init() {
    await this.platform.ready();
    this.isWeb = Capacitor.getPlatform() === 'web';

    if (!this.isWeb) {
      try {
        const db = await this.sqlite.createConnection(
          this.STORAGE_DB, false, 'no-encryption', 1, false
        );
        await db.open();
        this.db = db;
        await db.execute(`
          CREATE TABLE IF NOT EXISTS favorite_threads (
            favorite_id TEXT,
            user_uid TEXT,
            PRIMARY KEY (favorite_id, user_uid)
          );
        `);
        await db.execute(`
          CREATE TABLE IF NOT EXISTS favorite_articles (
            favorite_id TEXT,
            user_uid TEXT,
            PRIMARY KEY (favorite_id, user_uid)
          );
        `);
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
    this.favoriteArticlesChanged.next();
    this.favoriteThreadsChanged.next();
  }

  private async addFavorite(type: keyof typeof this.favoriteTypeDic, id: string): Promise<void> {
    let userUid = this.userService.getCurrentUser()?.uid!;
    if (!userUid) return;
    if (this.isWeb) {
      const favorites = await firstValueFrom(this.favoriteTypeDic[type].favorites);
      const exists = favorites.some(fav => fav.favorite_id === id && fav.user_uid === userUid);
      if (!exists) {

        const favoriteItem = {
          favorite_id: id,
          user_uid: userUid
        };

        favorites.push(favoriteItem);

        localStorage.setItem(this.favoriteTypeDic[type].storageKey, JSON.stringify(favorites));
        this.favoriteTypeDic[type].favoritesChanged.next();
      }
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO ${this.favoriteTypeDic[type].table} (favorite_id, user_uid) VALUES (?, ?)`,
        [id, userUid]
      );
      this.favoriteTypeDic[type].favoritesChanged.next();
    }
  }

  async addFavoriteArticle(id: string): Promise<void> {
    return this.addFavorite('article', id);
  }

  async addFavoriteThread(id: string): Promise<void> {
    return this.addFavorite('thread', id);
  }


  private async removeFavorite(type: keyof typeof this.favoriteTypeDic, id: string): Promise<void> {
    let userUid = this.userService.getCurrentUser()?.uid!;
    if (!userUid) return;
    if (this.isWeb) {
      const favorites = await firstValueFrom(this.favoriteTypeDic[type].favorites);
      const updatedFavorites = favorites.filter(fav => fav.favorite_id !== id && fav.user_uid !== userUid);
      localStorage.setItem(this.favoriteTypeDic[type].storageKey, JSON.stringify(updatedFavorites));
      this.favoriteTypeDic[type].favoritesChanged.next();
    } else if (this.db) {
      await this.db.run(`DELETE FROM ${this.favoriteTypeDic[type].table} WHERE favorite_id = ? and user_uid = ?`, [id,userUid]);
      this.favoriteTypeDic[type].favoritesChanged.next();
    }
  }

  async removeFavoriteArticle(id: string): Promise<void> {
    return this.removeFavorite('article', id);
  }


  async removeFavoriteThread(id: string): Promise<void> {
    return this.removeFavorite('thread', id);
  }

  getFavoriteArticles = toSignal(this.favoriteArticlesChanged.pipe(
    combineLatestWith(this.userObservable),
    switchMap(() => {
      this.loadFavoriteArticles();
      return this.favoriteArticles;
    })
  ),{initialValue:[]});

  getFavoriteThreads = toSignal(this.favoriteThreadsChanged.pipe(
    combineLatestWith(this.userObservable),
    switchMap(() => {
      this.loadFavoriteThreads();
      return this.favoriteThreads;
    })
  ),{initialValue:[]});

  private async loadFavoriteArticles() {
    this.favoriteArticles.next(await this.fetchFavorites('article'));
  }

  private async loadFavoriteThreads() {
    this.favoriteThreads.next(await this.fetchFavorites('thread'));
  }

  private async fetchFavorites(type: keyof typeof this.favoriteTypeDic): Promise<Favorite[]> {
    let userUid = this.userService.getCurrentUser()?.uid!;
    if (!userUid) return [];
    if (this.isWeb) {
      const stored = localStorage.getItem(this.favoriteTypeDic[type].storageKey);
      return ((stored ? JSON.parse(stored) : []) as Favorite[]).filter(fav => fav.user_uid === userUid);
    } else if (this.db) {
      const res = await this.db.query(`SELECT * FROM ${this.favoriteTypeDic[type].table} where user_uid = ?`,[userUid]);
      return res.values ?? [];
    }
    return [];
  }

  private isFavorite(type: keyof typeof this.favoriteTypeDic, id: string) {
    return this.userObservable.pipe(
      switchMap(user => {
        if (this.isWeb) return this.favoriteTypeDic[type].favorites.pipe(map(favorites => favorites.findIndex(favorite => favorite.favorite_id === id && favorite.user_uid === user?.uid)!==-1));
        return this.favoriteTypeDic[type].favoritesChanged.pipe(
          switchMap(() => {
            return from(this.checkFavoriteInDB(type, id));
          })
        );
      })
    );
  }

  private async checkFavoriteInDB(type: keyof typeof this.favoriteTypeDic, id: string): Promise<boolean> {
    let userUid = this.userService.getCurrentUser()?.uid!;
    if (!userUid) return false;
    if (this.db) {
      const res =
        await this.db.query(`SELECT id FROM ${this.favoriteTypeDic[type].table} WHERE favorite_id = ? and user_uid`, [id,userUid]);
      //return res.values?.length > 0 ?? false;
      return !!(res.values && res.values.length > 0);
    }

    return false;
  }

  isFavoriteArticle(id: string) {
    return this.isFavorite('article', id);
  }

  isFavoriteThread(id: string) {
    return this.isFavorite('thread', id);
  }

}
