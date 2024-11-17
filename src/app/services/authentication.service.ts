import { Injectable, Optional } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  DocumentReference,
  doc,
  getDoc,
  docData,
  DocumentData,
} from '@angular/fire/firestore';
import {
  Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataProvider } from './data-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userDoc: DocumentReference | undefined;
  checkerUserDoc: DocumentReference | undefined;
  public loggedIn: boolean = false;
  private userServerSubscription: Subscription | undefined = undefined;
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    public dataProvider:DataProvider
  ) {
    console.log('Auth service started');
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(map((u) => !!u))
        .subscribe((isLoggedIn) => {
          console.log('Logged In');
          this.loggedIn = isLoggedIn;
        });
    } else {
      this.loggedIn = false;
      // console.log('auth is null');
      // signInAnonymously(this.auth);
      // this.router.navigate([''])
      // console.log('Anonymous authentcation started')
    }
  }
  public async loginEmailPassword(email: string, password: string){
    this.dataProvider.pageSettings.blur = true;
    let data = await signInWithEmailAndPassword(this.auth, email, password).then((credentials:UserCredential)=>{
      this.dataProvider.pageSettings.blur = false;
      this.router.navigate(['admin']);
    }).catch((error)=>{
      alert('Some error occured. '+error.message);
      this.dataProvider.pageSettings.blur = false;
    });
    this.dataProvider.pageSettings.blur = false;
  }
  public async logout() {
    return await signOut(this.auth);
  }
}
