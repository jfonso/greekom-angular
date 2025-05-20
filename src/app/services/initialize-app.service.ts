import { Injectable, inject } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { StorageService } from './storage.service';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;
  private sqliteService = inject(SQLiteService);
  private storageService = inject(StorageService);

  async initializeApp() {
    return await this.sqliteService.initializePlugin().then(async (ret) => {
        this.platform = this.sqliteService.platform;
        try {
            if( this.sqliteService.platform === 'web') {
                await this.sqliteService.initWebStore();
            }
            // Initialize the myfavoritedb database
            const DB_USERS = 'myfavoritedb'
            await this.storageService.initializeDatabase(DB_USERS);
            // Here Initialize MOCK_DATA if required

            // Initialize whatever database and/or MOCK_DATA you like

            if( this.sqliteService.platform === 'web') {
                await this.sqliteService.saveToStore(DB_USERS);
            }

            this.isAppInit = true;

        } catch (error) {
            console.log(`initializeAppError: ${error}`);
            await Toast.show({
            text: `initializeAppError: ${error}`,
            duration: 'long'
            });
        }
    });
}
}
