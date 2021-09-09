import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { TestNavComponent } from './test-nav/test-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TestTableComponent } from './test-table/test-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { TaradioComponent } from './taradio/taradio.component';

import { TaskListComponent } from './task-list/task-list.component';
import { DialogTableComponent } from './dialog-table/dialog-table.component';
import { DialogTableBoxComponent } from './dialog-table-box/dialog-table-box.component';
import { DialogUploadComponent } from './dialog-upload/dialog-upload.component';
import { DialogWriteComponent } from './dialog-write/dialog-write.component';
import { DialogRecordComponent } from './dialog-record/dialog-record.component';
import { DialogSignInComponent } from './dialog-sign-in/dialog-sign-in.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import {FirebaseService} from './firebase.service';
import { SoundcloudService } from './soundcloud.service';
import { MainComponent } from './main/main.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { LiveComponent } from './live/live.component';
import { EmptyComponent } from './empty/empty.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import {OverlayModule} from '@angular/cdk/overlay';
import { DialogPlaylistComponent } from './dialog-playlist/dialog-playlist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatTabsModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxAudioPlayerModule,
    OverlayModule,
    FontAwesomeModule,
  ],
  providers:[
    FirebaseService,
    SoundcloudService
  ],
  declarations: [
    AppComponent,
    TestNavComponent,
    TestTableComponent,
    TaradioComponent,
    TaskListComponent,
    DialogTableComponent,
    DialogTableBoxComponent,
    DialogUploadComponent,
    DialogWriteComponent,
    DialogRecordComponent,
    DialogSignInComponent,
    AccessDeniedComponent,
    MainComponent,
    JavascriptComponent,
    AboutComponent,
    ContactComponent,
    PlaylistComponent,
    LiveComponent,
    EmptyComponent,
    DialogPlaylistComponent,

  ],
    entryComponents: [
    TaradioComponent
  ],
  bootstrap: 
  [ 
    AppComponent
  ]

})
export class AppModule { }