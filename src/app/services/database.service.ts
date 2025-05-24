import {Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Platform} from '@ionic/angular';
import { FavoriteArticle } from '../interfaces/favorite-article';
import { BehaviorSubject, from, map, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FavoriteThread } from '../interfaces/favorite-thread';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService {


  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly ARTICLES_STORAGE_KEY = 'favorite_articles';
  private readonly THREADS_STORAGE_KEY = 'favorite_threads';
  private readonly STORAGE_DB = 'favoritesDB';

  private favoriteArticlesChanged = new BehaviorSubject<void>(undefined);
  private favoriteArticles = new BehaviorSubject<FavoriteArticle[]>([]);

  private favoriteThreadsChanged = new BehaviorSubject<void>(undefined);
  private favoriteThreads = new BehaviorSubject<FavoriteThread[]>([]);

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
            id TEXT PRIMARY KEY,
            title TEXT
          );
        `);
        await db.execute(`
          CREATE TABLE IF NOT EXISTS favorite_articles (
            id TEXT PRIMARY KEY,
            title TEXT,
            type TEXT,
            image_url TEXT
          );
        `);
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
    this.favoriteArticlesChanged.next();
    this.favoriteThreadsChanged.next();
  }

  async addFavoriteArticle(item: FavoriteArticle): Promise<void> {
    if (this.isWeb) {
      const favorites = this.getFavoriteArticles();
      const exists = favorites.some(fav => fav.id === item.id);
      if (!exists) {

        const favoriteItem = {
          id: item.id,
          title: item.title,
          type: item.type,
          image_url: item.image_url
        };

        favorites.push(favoriteItem);

        localStorage.setItem(this.ARTICLES_STORAGE_KEY, JSON.stringify(favorites));
        this.favoriteArticlesChanged.next();
      }
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO favorite_articles (id, title, type, image_url) VALUES (?, ?, ?, ?)`,
        [item.id, item.title, item.type, item.image_url]
      );
      this.favoriteArticlesChanged.next();
    }
  }

  async addFavoriteThread(item: FavoriteThread): Promise<void> {
    if (this.isWeb) {
      const favorites = this.getFavoriteThreads();
      const exists = favorites.some(fav => fav.id === item.id);
      if (!exists) {

        const favoriteItem = {
          id: item.id,
          title: item.title
        };

        favorites.push(favoriteItem);

        localStorage.setItem(this.THREADS_STORAGE_KEY, JSON.stringify(favorites));
        this.favoriteThreadsChanged.next();
      }
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO favorite_threads (id, title) VALUES (?, ?)`,
        [item.id, item.title]
      );
      this.favoriteThreadsChanged.next();
    }
  }


  async removeFavoriteArticle(id: string): Promise<void> {
    if (this.isWeb) {
      const favorites = this.getFavoriteArticles();
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem(this.ARTICLES_STORAGE_KEY, JSON.stringify(updatedFavorites));
      this.favoriteArticlesChanged.next();
    } else if (this.db) {
      await this.db.run(`DELETE FROM favorite_articles WHERE id = ?`, [id]);
      this.favoriteArticlesChanged.next();
    }
  }


  async removeFavoriteThread(id: string): Promise<void> {
    if (this.isWeb) {
      const favorites = this.getFavoriteThreads();
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem(this.THREADS_STORAGE_KEY, JSON.stringify(updatedFavorites));
      this.favoriteThreadsChanged.next();
    } else if (this.db) {
      await this.db.run(`DELETE FROM favorite_threads WHERE id = ?`, [id]);
      this.favoriteThreadsChanged.next();
    }
  }

  getFavoriteArticles = toSignal(this.favoriteArticlesChanged.pipe(
    switchMap(() => {
      this.loadFavoriteArticles();
      return this.favoriteArticles;
    })
  ),{initialValue:[]});

  private async loadFavoriteArticles() {
    this.favoriteArticles.next(await this.fetchFavoriteArticles());
  }

  private async fetchFavoriteArticles(): Promise<FavoriteArticle[]> {
    if (this.isWeb) {
      const stored = localStorage.getItem(this.ARTICLES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } else if (this.db) {
      const res = await this.db.query(`SELECT * FROM favorite_articles`);
      return res.values ?? [];
    }
    return [];
  }

  getFavoriteThreads = toSignal(this.favoriteThreadsChanged.pipe(
    switchMap(() => {
      this.loadFavoriteThreads();
      return this.favoriteThreads;
    })
  ),{initialValue:[]});

  private async loadFavoriteThreads() {
    this.favoriteThreads.next(await this.fetchFavoriteThreads());
  }

  private async fetchFavoriteThreads(): Promise<FavoriteThread[]> {
    if (this.isWeb) {
      const stored = localStorage.getItem(this.THREADS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } else if (this.db) {
      const res = await this.db.query(`SELECT * FROM favorite_threads`);
      return res.values ?? [];
    }
    return [];
  }

  isFavoriteArticle(id: string) {
    if (this.isWeb) return this.favoriteArticles.pipe(map(favorites => favorites.findIndex(favorite => favorite.id === id)!==-1));
    return this.favoriteArticlesChanged.pipe(
      switchMap(() => {
        return from(this.checkFavoriteArticleInDB(id));
      })
    );
  }

  private async checkFavoriteArticleInDB(id: string): Promise<boolean> {
    if (this.db) {
      const res =
        await this.db.query(`SELECT id FROM favorite_articles WHERE id = ?`, [id]);
      //return res.values?.length > 0 ?? false;
      return !!(res.values && res.values.length > 0);
    }

    return false;
  }

  isFavoriteThread(id: string) {
    if (this.isWeb) return this.favoriteThreads.pipe(map(favorites => favorites.findIndex(favorite => favorite.id === id)!==-1));
    return this.favoriteThreadsChanged.pipe(
      switchMap(() => {
        return from(this.checkFavoriteThreadInDB(id));
      })
    );
  }

  private async checkFavoriteThreadInDB(id: string): Promise<boolean> {
    if (this.db) {
      const res =
        await this.db.query(`SELECT id FROM favorite_threads WHERE id = ?`, [id]);
      //return res.values?.length > 0 ?? false;
      return !!(res.values && res.values.length > 0);
    }

    return false;
  }

  async clearFavoriteArticles(): Promise<void> {
    if (this.isWeb) {
      localStorage.removeItem(this.ARTICLES_STORAGE_KEY);
      this.favoriteArticlesChanged.next();
    } else if (this.db) {
      await this.db.execute(`DELETE FROM favorite_articles`);
      this.favoriteArticlesChanged.next();
    }
  }

  async clearFavoriteThreads(): Promise<void> {
    if (this.isWeb) {
      localStorage.removeItem(this.THREADS_STORAGE_KEY);
      this.favoriteThreadsChanged.next();
    } else if (this.db) {
      await this.db.execute(`DELETE FROM favorite_threads`);
      this.favoriteThreadsChanged.next();
    }
  }

}
