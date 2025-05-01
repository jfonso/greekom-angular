import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth = inject(Auth);

  constructor() { }

  login(username: string, password: string) {
    
  }

  async signUp(username: string, email: string, password: string) {
    let credentials = await createUserWithEmailAndPassword(this.firebaseAuth,email,password);
    await updateProfile(credentials.user, {
      displayName: username
    });
    return this.firebaseAuth.currentUser;
  }
}
