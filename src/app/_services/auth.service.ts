import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { collection, Firestore } from "@angular/fire/firestore";
import { from } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthServiceTest {
    firebaseAuth = inject(Auth);
    firestore = inject(Firestore);

    async register(email: string, password: string) {
        await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
        // const userId = userCredential.user?.uid
    
        // //Dodaj użytkownika do Firestore z domyślną rolą
        // if (userCredential) {
        // const announcementsRef = collection(this.firestore, 'announcements');
        //   collection(this.firestore,'users').doc(userId).set({
        //     email: email,
        //     role: 'user'
        //   });
        // }
      }

    login(email: string, password: string) {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
        return from(promise);
    }

}