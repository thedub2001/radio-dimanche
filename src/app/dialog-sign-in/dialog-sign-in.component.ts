import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dialog-sign-in',
  templateUrl: './dialog-sign-in.component.html',
  styleUrls: ['./dialog-sign-in.component.css']
})

export class DialogSignInComponent implements OnInit, OnDestroy {
  public signInForm: FormGroup;
  public signInFailed: boolean;
  public userAuth: Subscription;
  public userData : any;

  constructor(public fb: FormBuilder, public fs: FirebaseService, public router: Router,private matDialog: MatDialog) {
      this.signInFailed = false;
      this.signInForm = this.fb.group({
          email: new FormControl('', [ Validators.required, Validators.email ]),
          password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
      });

      this.userAuth = this.fs.signedIn.subscribe((user) => {
          if (user) {
            this.matDialog.closeAll();
          }
      });

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
      if (this.userAuth) this.userAuth.unsubscribe();
  }

  async signIn(fg: FormGroup) {
      try {
          this.signInFailed = false;
          if (!fg.valid) throw new Error('Invalid sign-in credentials');
          const result = await this.fs.signIn(fg.value.email, fg.value.password);
          console.log('that tickles', result);
          if (result) this.router.navigate([ 'dimanche' ]);
          else throw new Error('Sign-in failed');
      } catch (error) {
          console.log(error);
          this.signInFailed = true;
      }
  }

}