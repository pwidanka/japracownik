import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore, query, where, addDoc, doc, updateDoc, deleteDoc, docData, getDocs } from "@angular/fire/firestore";
import { map, Observable } from "rxjs";
import { Employer } from "../_models/employes.interface";

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

    addEmployer(employer: Employer) {
        const employersRef = collection(this.firestore, 'employers');
        return addDoc(employersRef, employer);
    }

    async checkEmployerStatus(uid: string): Promise<boolean> {
        const employersRef = collection(this.firestore, 'employers');
        const q = query(employersRef, where('uid', '==', uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return true; // Not an employer, allow login

        const employer = snapshot.docs[0].data();
        return employer['status'] === 'approved';
    }

    async isApprovedEmployer(uid: string): Promise<boolean> {
        const employersRef = collection(this.firestore, 'employers');
        const q = query(employersRef, where('uid', '==', uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return false; // Not an employer at all

        const employer = snapshot.docs[0].data();
        return employer['status'] === 'approved'; // Only approved employers can view
    }

}