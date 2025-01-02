import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from "@angular/fire/auth";
import { from, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class AuthServiceTest {
    private auth: Auth = inject(Auth);
    private firebaseService = inject(FirebaseService);
    
    // Observable do śledzenia stanu zalogowania
    isLoggedIn$ = user(this.auth).pipe(
        map(user => !!user)
    );

    isEmployer$: Observable<boolean> = this.isLoggedIn$.pipe(
        switchMap((isLoggedIn: boolean) => {
          if (!isLoggedIn) return of(false);
          const currentUser = this.getCurrentUser();
          return this.firebaseService.isApprovedEmployer(currentUser?.uid || '');
        })
      );

    login(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    register(email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    logout() {
        return from(signOut(this.auth));
    }

    getCurrentUser() {
        return this.auth.currentUser;
    }

    loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return from(signInWithPopup(this.auth, provider));
    }

    async isEmployer(): Promise<boolean> {
        const currentUser = this.getCurrentUser();
        console.log(currentUser);
        if (!currentUser) return false;
        return this.firebaseService.isApprovedEmployer(currentUser.uid);
    }
}