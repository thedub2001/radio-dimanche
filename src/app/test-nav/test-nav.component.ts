import { Component, OnInit  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { FirebaseService } from '../firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignInComponent } from '../dialog-sign-in/dialog-sign-in.component';

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
    this.dialog.open(DialogSignInComponent).afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    });        
  }

	ngOnInit() {
	}
  
  signOut() {
      this.fs.signOut();
  }

}