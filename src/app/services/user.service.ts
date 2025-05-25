import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, User } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = inject(Auth);
  private firestore = inject(Firestore);

  constructor() { }

  async createUser(userData: {username: string, email: string, password: string}) {
    let credential = await createUserWithEmailAndPassword(this.auth, userData.email, userData.password);
    let userDoc = doc(this.firestore, '/users', credential.user.uid);
    await Promise.all([
      updateProfile(credential.user, {displayName: userData.username}),
      setDoc(userDoc, {username: userData.username})
    ]);
    return true;
  }
  async signInWithEmailAndPassword(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
    return true;
  }

  async updateUserPersonalInformation(username: string, email: string) {
    let user = this.getCurrentUser()!;
    let userDoc = doc(this.firestore, '/users', user.uid);
    await Promise.all([
      updateProfile(user, {displayName: username}),
      updateEmail(user, email),
      setDoc(userDoc, {username})
    ]);
    return true;
  }

  async updateUserPassword(password: string) {
    let user = this.getCurrentUser()!;
    await updatePassword(user, password);
    return true;
  }

  logOut() {
    signOut(this.auth);
  }

  getCurrentUser = toSignal(authState(this.auth))
}
