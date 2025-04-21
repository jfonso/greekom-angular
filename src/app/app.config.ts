import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "greekom-a009b", appId: "1:138065545618:web:3d37b218f355a107bd994b", storageBucket: "greekom-a009b.firebasestorage.app", apiKey: "AIzaSyB-JWwRQcHvkBivcHBmiaPt3wt8D1YIeDs", authDomain: "greekom-a009b.firebaseapp.com", messagingSenderId: "138065545618" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
