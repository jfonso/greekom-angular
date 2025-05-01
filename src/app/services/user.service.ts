import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = inject(Auth);

  constructor() { }

  async createUser(userData: {username: string, email: string, password: string}) {
    let credential = await createUserWithEmailAndPassword(this.auth, userData.email, userData.password);
    await updateProfile(credential.user, {displayName: userData.username});
    return true;
  }
  async signInWithEmailAndPassword(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
    return true;
  }
}
