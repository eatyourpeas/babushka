import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  grades: any;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public angularFirestore: AngularFirestore
  ) {
    this.grades = [
      {long: 'Foundation Year 1-3', short: 'FY1-3'},
      {long: 'Specialty Trainee 1-3', short: 'ST1-3'},
      {long: 'Specialty Trainee 4-8', short: 'FY4-8'},
      {long: 'Consultant', short: 'Consultant'}
    ];
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signUpWithFacebook() {
    return this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  signUpWithTwitter() {
    return this.angularFireAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  signUpWithGoogle() {
    return this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  createProfile(uid: string, screenName: string, grade: string, email: string) {
    const newUser = {
      screen_name: screenName,
      clinician_grade: grade,
      clinician_email: email
    };
    return this.angularFirestore.collection('Profiles').doc(uid).set(newUser);
  }

  signedInStatus() {
    return this.angularFireAuth.authState;
  }
}

