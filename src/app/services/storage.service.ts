import { Injectable, inject } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { DatabaseUpgradeStatements } from '../upgrades/database.upgrade.statements';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DbnameVersionService } from './dbname-version.service';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoriteThread } from '../interfaces/favorite-thread';
import { FavoriteArticle } from '../interfaces/favorite-article';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sqliteService = inject(SQLiteService);
  private dbVerService = inject(DbnameVersionService);
  private databaseName = '';
  private dbUpStmts = new DatabaseUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;
  private isFavoriteThreadReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isFavoriteArticleReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private favoriteThreadsList = new BehaviorSubject<FavoriteThread[]>([]);
  private favoriteArticlesList = new BehaviorSubject<FavoriteArticle[]>([]);

  constructor() {
    this.versionUpgrades = this.dbUpStmts.userUpgrades;
    this.loadToVersion = this.versionUpgrades[this.versionUpgrades.length-1].toVersion;
  }
  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;
    await this.sqliteService.addUpgradeStatement({database: this.databaseName, upgrade: this.versionUpgrades});
    this.db = await this.sqliteService.openDatabase(
      this.databaseName,
      false,
      'no-encryption',
      this.loadToVersion,
      false
    );
    this.dbVerService.set(this.databaseName,this.loadToVersion);
    await Promise.all([
      this.getFavoriteThreads(),
      this.getFavoriteArticles()
    ]);
  }
  favoriteThreadState() {
    return this.isFavoriteThreadReady.asObservable();
  }
  favoriteArticleState() {
    return this.isFavoriteArticleReady.asObservable();
  }
  fetchFavoriteThreads() {
    return this.favoriteThreadsList.asObservable();
  }
  fetchFavoriteArticles() {
    return this.favoriteArticlesList.asObservable();
  }
  async loadFavoriteThreads() {
    const favoriteThreads = (await this.db.query('SELECT * FROM favorite_threads;')).values as FavoriteThread[];
    this.favoriteThreadsList.next(favoriteThreads);
  }
  async loadFavoriteArticles() {
    const favoriteArticles = (await this.db.query('SELECT * FROM favorite_articles;')).values as FavoriteArticle[];
    this.favoriteArticlesList.next(favoriteArticles);
  }
  async getFavoriteThreads() {
    await this.loadFavoriteThreads();
    this.isFavoriteThreadReady.next(true);
  }
  async getFavoriteArticles() {
    await this.loadFavoriteArticles();
    this.isFavoriteArticleReady.next(true);
  }
  async addFavoriteThread(userRef: string, threadRef: string) {
    const sql = `INSERT INTO favorite_threads (user_ref,thread_ref) VALUES (?,?)`;
    await this.db.run(sql,[userRef,threadRef]);
    await this.getFavoriteThreads();
  }
  async deleteFavoriteThread(id: string) {
    const sql = `DELETE FROM favorite_threads WHERE id = ?`;
    await this.db.run(sql,[id]);
    await this.getFavoriteThreads();
  }
  async addFavoriteArticle(userRef: string, articleRef: string) {
    const sql = `INSERT INTO favorite_articles (user_ref,article_ref) VALUES (?,?)`;
    await this.db.run(sql,[userRef,articleRef]);
    await this.getFavoriteArticles();
  }
  async deleteFavoriteArticle(id: string) {
    const sql = `DELETE FROM favorite_articles WHERE id = ?`;
    await this.db.run(sql,[id]);
    await this.getFavoriteArticles();
  }
}
