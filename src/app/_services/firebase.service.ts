import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { collection, collectionData, Firestore, query, where } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    firestore = inject(Firestore);
    // announcements = collection(this.firestore, 'announcements');
    // firebaseAuth = inject(Auth);

    getAnnouncements(): Observable<any[]> {
        const announcementsRef = collection(this.firestore, 'announcements');
        const q = query(announcementsRef, where('status', '==', 'approved'));

        // Korzystamy z kolekcji z filtrem na "status: 'approved'"
        return collectionData(q, { idField: 'id' });
    }
}