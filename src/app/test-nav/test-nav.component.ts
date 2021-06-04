import { Component, NgZone, OnInit, ViewChild  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { FirebaseService } from '../firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignInComponent } from '../dialog-sign-in/dialog-sign-in.component';
import { ElementRef } from '@angular/core';

// TO DO : Ne pas aller chercher les icones sur le net et le moins de librairies possible !

@Component({
  selector: 'app-test-nav',
  templateUrl: './test-nav.component.html',
  styleUrls: ['./test-nav.component.css']
})

export class TestNavComponent implements OnInit {

  public signedIn : boolean;
  public viewLoaded : boolean = false;
  
  @ViewChild('LoginButton') LoginButton: ElementRef; // for educational purpose

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
  			  public dialog: MatDialog,
  			  public fs: FirebaseService,
          private ngZone: NgZone
  ) {
  }

  openSigninDialog() {
    this.dialog.open(DialogSignInComponent).afterClosed().subscribe(result => {
      console.log(`Dialog result  : ${JSON.stringify(result)}`);
      if(result.signedIn){
        this.signedIn=true;
      }else {
        this.signedIn=false;
      }
      // for educational purpose
      // this.LoginButton.nativeElement.doSomething();
    });        
  }

	ngOnInit() {
	}
  
  signOut() {
      this.fs.signOut();
      this.signedIn=false;
  }

}