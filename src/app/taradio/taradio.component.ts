import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

import {MatDialog} from '@angular/material/dialog';

import {Router} from '@angular/router';
import { DialogWriteComponent } from '../dialog-write/dialog-write.component';
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component';
import { DialogRecordComponent } from '../dialog-record/dialog-record.component';

@Component({
  selector: 'app-taradio',
  templateUrl: './taradio.component.html',
  styleUrls: ['./taradio.component.css']
})
export class TaradioComponent implements OnInit {

	actions = [
		{name: 'write', icon: '../assets/img/writer-icon.svg', comment:'Nous écrire un message',method:"openDialogWrite()"},
		{name: 'record', icon: '../assets/img/voice-recorder-icon.svg', comment:'Enregistrer un message audio',method:"openDialogWrite()"},
		{name: 'file', icon: '../assets/img/send-audio-icon.svg', comment:'Nous envoyer un fichier',method:"openDialogWrite()"},
		{name: 'playlist', icon: '../assets/img/jukebox-icon.svg', comment:'Ecouter les pistes des autres utilisateurs',method:"openDialogWrite()"},
	];

  // isHandset$ useless ?
	isHandset$= this.breakpointObserver.observe(Breakpoints.Handset)
	    .pipe(
	      map(result => result.matches)
	    );

  constructor(private breakpointObserver: BreakpointObserver,
	  			public dialog: MatDialog,
          private route:Router
	  			) { }


  openDialog(action:string) {

    switch (action) {
        case "write": //code block statement1;
            this.dialog.open(DialogWriteComponent).afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });
            break;
        case "record": //code block statement2;
            this.dialog.open(DialogRecordComponent).afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });
            break;        
        case "file": //code block statement3;
            this.dialog.open(DialogUploadComponent).afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });        
            break;        
        case "playlist": //code block statement3;
            this.route.navigate(['/tracklist']);      
            break;
        default:
            //default block statement;
    };
  }

  ngOnInit(): void {
  }

}