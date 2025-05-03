import { DocumentReference, Timestamp } from '@angular/fire/firestore'

export interface Post {
    content: string
    created: Timestamp
    creatorRef: DocumentReference
}