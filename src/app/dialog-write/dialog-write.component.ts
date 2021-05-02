import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-dialog-write',
  templateUrl: './dialog-write.component.html',
  styleUrls: ['./dialog-write.component.css']
})

export class DialogWriteComponent {
	
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
