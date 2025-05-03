import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { addDoc, collection, collectionData, CollectionReference, collectionSnapshots, doc, docData, DocumentData, DocumentReference, Firestore, getDocs, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { combineLatestWith, from, last, map, merge, Observable, pipe, switchMap } from 'rxjs';
import { Thread } from '../interfaces/thread';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  private firestore = inject(Firestore);
  private threadsCollection = collection(this.firestore, 'threads');
  private usersCollection = collection(this.firestore, 'users');

  getThreads = toSignal(
    collectionSnapshots(this.threadsCollection as CollectionReference<DocumentData&Thread>).pipe(
      switchMap(threads => {
        let creatorIds = [...new Set(threads.map(thread => thread.data().creatorRef.id))];
        return from(getDocs(query(this.usersCollection as CollectionReference<DocumentData&{username:string}>, where('__name__', 'in', creatorIds)))).pipe(
          map(userDocs => {
            let usernames = userDocs.docs.reduce((c,v) => {
              c[v.id] = v.data()['username'];
              return c;
            }, {} as { [key:string]: string });
            return threads.map(thread => ({id: thread.id, ...thread.data(), creatorName: usernames[thread.data().creatorRef.id]})).sort((a,b) => {
              if (a.updated < b.updated) return 1;
              if (b.updated < a.updated) return -1;
              return 0;
            });
          })
        );
      })
    )
  );

  getThread(id: string) {
    let threadDoc = doc(this.firestore, 'threads', id) as DocumentReference<DocumentData&Thread>;
    let postsCollection = collection(this.firestore, 'threads', id, 'posts') as CollectionReference<DocumentData&Post>;
    return docData(threadDoc).pipe(
      combineLatestWith(collectionSnapshots(postsCollection)),
      switchMap(([thread,posts]) => {
        let creatorIds = [...new Set([thread!.creatorRef.id].concat(posts.map(post => post.data().creatorRef.id)))];
        return from(getDocs(query(this.usersCollection as CollectionReference<DocumentData&{username:string}>, where('__name__', 'in', creatorIds)))).pipe(
          map(userDocs=> {
            let usernames = userDocs.docs.reduce((c,v) => {
              c[v.id] = v.data()['username'];
              return c;
            }, {} as { [key:string]: string });
            let sortedPosts = posts.map(post => ({id: post.id, ...post.data(), creatorName: usernames[post.data().creatorRef.id]})).sort((a,b) => {
              if (a.created < b.created) return -1;
              if (b.created < a.created) return 1;
              return 0;
            });
            return {id,...thread, creatorName: usernames[thread!.creatorRef.id], posts: sortedPosts}
          })
        );
      })
    );
  }

  async createThread(creatorId: string, threadData: Omit<Thread, "creatorRef" | "updated">) {
    let creatorRef = doc(this.firestore, 'users', creatorId);
    let updated = serverTimestamp();
    let threadRef = await addDoc(this.threadsCollection, {...threadData,creatorRef,updated});
    return threadRef.id;
  }

  async createPost(creatorId: string, threadId: string, postData: Omit<Post, "creatorRef" | "created">) {
    let creatorRef = doc(this.firestore, 'users', creatorId);
    let created = serverTimestamp();
    let threadDoc = doc(this.firestore, 'threads', threadId) as DocumentReference<DocumentData&Thread>;
    let postsCollection = collection(this.firestore, 'threads', threadId, 'posts') as CollectionReference<DocumentData&Post>;
    let postRef = await addDoc(postsCollection, {...postData, creatorRef, created});
    await updateDoc(threadDoc, {updated: created});
    return postRef.id;
  }

  constructor() { }
}
