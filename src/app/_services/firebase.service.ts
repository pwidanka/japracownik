import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore, query, where, addDoc, doc, updateDoc, deleteDoc, docData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    firestore = inject(Firestore);

    getAnnouncements(): Observable<any> {
        const announcementsRef = collection(this.firestore, 'announcements');
        const q = query(announcementsRef, where('status', '==', 'approved'));

        // Korzystamy z kolekcji z filtrem na "status: 'approved'"
        return collectionData(q, { idField: 'id' });
    }

    // Dodawanie ogłoszenia
    addAnnouncement(announcement: any) {
        const announcementsRef = collection(this.firestore, 'announcements');
        return addDoc(announcementsRef, announcement);
    }

    // Aktualizacja ogłoszenia
    updateAnnouncement(id: string, data: any) {
        const docRef = doc(this.firestore, 'announcements', id);
        return updateDoc(docRef, data);
    }

    // Usuwanie ogłoszenia
    deleteAnnouncement(id: string) {
        const docRef = doc(this.firestore, 'announcements', id);
        return deleteDoc(docRef);
    }

    // Dodaj nową metodę do pobierania pojedynczego ogłoszenia
    getAnnouncementById(id: string): Observable<any> {
        const docRef = doc(this.firestore, 'announcements', id);
        return docData(docRef);
    }
}