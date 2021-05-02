import { Component, OnInit, OnDestroy  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-test-nav',
  templateUrl: './test-nav.component.html',
  styleUrls: ['./test-nav.component.css']
})
export class TestNavComponent implements OnInit{



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
  			  public dialog: MatDialog,
  			  public fs: FirebaseService,
			 ) {}




  openSigninDialog() {
    this.dialog.open(DialogSigninContent).afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    });        
  }

	ngOnInit() {
	    }
  

    signOut() {
        this.fs.signOut();
    }

}

@Component({
  selector: 'sign-in',
  templateUrl: 'sign-in.html',
})


export class DialogSigninContent implements OnInit, OnDestroy {
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