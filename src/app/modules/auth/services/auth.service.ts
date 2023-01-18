import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredentials } from '../models';
import { GoogleAuthProvider } from 'firebase/auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly auth: AngularFireAuth) {}

  handleSignIn({ email, password }: UserCredentials) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  handleSignUp({ email, password }: UserCredentials) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  handleSignOut() {
    return this.auth.signOut();
  }

  handleGoogleAuthentication() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
  }
}
