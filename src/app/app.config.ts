import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { Capacitor } from '@capacitor/core';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { InitializeAppService } from './services/initialize-app.service';

const platform = Capacitor.getPlatform();
if (platform === 'web') {
  jeepSqlite(window);
  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    await customElements.whenDefined('jeep-sqlite');
    jeepEl.autoSave = true;
  });
}

export function initializeFactory() {
  return () => inject(InitializeAppService).initializeApp();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "greekom-a009b", appId: "1:138065545618:web:3d37b218f355a107bd994b", storageBucket: "greekom-a009b.firebasestorage.app", apiKey: "AIzaSyB-JWwRQcHvkBivcHBmiaPt3wt8D1YIeDs", authDomain: "greekom-a009b.firebaseapp.com", messagingSenderId: "138065545618" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideIonicAngular({}),provideAppInitializer(initializeFactory())]
};
