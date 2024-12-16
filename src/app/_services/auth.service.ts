import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from "@angular/fire/auth";
import { from } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthServiceTest {
    private auth: Auth = inject(Auth);
    
    // Observable do śledzenia stanu zalogowania
    isLoggedIn$ = user(this.auth).pipe(
        map(user => !!user)
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
}