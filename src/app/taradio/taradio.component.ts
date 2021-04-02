import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {Router} from '@angular/router';

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
            this.dialog.open(DialogWriteContent).afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });
            break;
        case "record": //code block statement2;
            this.dialog.open(DialogRecordContent).afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });
            break;        
        case "file": //code block statement3;
            this.dialog.open(DialogFileContent).afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });        
            break;        
        case "playlist": //code block statement3;
            this.route.navigate(['/tracklist']);      
            break;
        default:
            //default block statement;
    }
;


  }


  ngOnInit(): void {
  }

}


@Component({
  selector: 'dialog-write',
  templateUrl: 'dialog-write.html',
})

export class DialogWriteContent {
	
	uploadPercent: Observable<number>;	
	downloadURL: Observable<string>;
  userMessage='rien à dire';



  messageForm = this.fb.group({
    pseudo: [null, Validators.required],
    message: [null, Validators.required]
  });

  constructor(	private fb: FormBuilder,
  				private storage: AngularFireStorage
  				) {}

  onSubmit(): void {
    alert('Thanks!');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'test02';
    const fileRef = this.storage.ref(filePath);
    // Without Metadata
    // const task = this.storage.upload(filePath, file);
    
    // With Metadata
    const task = fileRef.put(file, { customMetadata: { message: this.userMessage } });

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
}

@Component({
  selector: 'dialog-file',
  templateUrl: 'dialog-file.html',
})

export class DialogFileContent {
	
	uploadPercent: Observable<number>;	
	downloadURL: Observable<string>;
	userMessage='rien à dire';

  messageForm = this.fb.group({
    pseudo: [null, Validators.required],
    message: [null, Validators.required]
  });

  constructor(	private fb: FormBuilder,
  				private storage: AngularFireStorage
  				) {}

  onSubmit(): void {
    alert('Thanks!');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'test02';
    const fileRef = this.storage.ref(filePath);
    // Without Metadata
    // const task = this.storage.upload(filePath, file);
    
    // With Metadata
    const task = fileRef.put(file, { customMetadata: { message: this.userMessage } });

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
}

@Component({
  selector: 'dialog-record',
  templateUrl: 'dialog-record.html',
})

export class DialogRecordContent {
  
  uploadPercent: Observable<number>;  
  downloadURL: Observable<string>;
  userMessage='rien à dire';

  messageForm = this.fb.group({
    pseudo: [null, Validators.required],
    message: [null, Validators.required]
  });


  constructor(  private fb: FormBuilder,
          private storage: AngularFireStorage
          ) {}

  onSubmit(): void {
    alert('Thanks!');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'test02';
    const fileRef = this.storage.ref(filePath);
    // Without Metadata
    // const task = this.storage.upload(filePath, file);
    
    // With Metadata
    const task = fileRef.put(file, { customMetadata: { message: this.userMessage } });

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
}
