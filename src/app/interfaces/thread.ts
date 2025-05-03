import { DocumentReference, Timestamp } from '@angular/fire/firestore'

export interface Thread {
    title: string
    content: string
    creatorRef: DocumentReference
    updated: Timestamp
}