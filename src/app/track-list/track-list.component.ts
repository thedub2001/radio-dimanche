import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

export interface MixcloudData {
  data: {};
  name: string;
}

export interface SoundcloudData {
  title: string;
  uri: string;
}

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})

export class TrackListComponent implements OnInit {

  public MixcloudTracks: MixcloudData | undefined;
  public SoundcloudTracks : SoundcloudData[] = [];
  private MixcloudUserUrl = 'https://api.mixcloud.com/spartacus/cloudcasts/';  // URL to Mixcloud web api
  private SoundcloudUserUrl = 'https://api.soundcloud.com/users/14341196/playlists?client_id=31478aadfa8f9db41f03ffb13b43a57d';  // URL to Soundcloud web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html' }) //or json
  };

	elements = [
	{name: 'write',date:"10/01/2021", icon: '../assets/img/writer-icon.svg', comment:'Nous écrire un message',method:"openDialogWrite()"},
	{name: 'record',date:"10/01/2021", icon: '../assets/img/voice-recorder-icon.svg', comment:'Enregistrer un message audio',method:"openDialogWrite()"},
	{name: 'file',date:"10/01/2021", icon: '../assets/img/send-audio-icon.svg', comment:'Nous envoyer un fichier',method:"openDialogWrite()"},
	{name: 'playlist',date:"10/01/2021", icon: '../assets/img/jukebox-icon.svg', comment:'Ecouter les pistes des autres utilisateurs',method:"openDialogWrite()"},

	];

  constructor(private http: HttpClient) {

   }

  getMixcloudTracks() {
    console.log('getting MixcloudTracks')
    return this.http.get<MixcloudData>(this.MixcloudUserUrl)
      .pipe(
        tap(_ => console.log('fetched MixcloudTracks')),
        catchError(this.handleError<MixcloudData>('getMixcloudTracks'))
      );
  }


  getSoundcloudTracks() : Observable<SoundcloudData[]>{
    console.log('getting SoundcloudTracks')
    return this.http.get<SoundcloudData[]>(this.SoundcloudUserUrl)
      .pipe(
        tap(_ => console.log('fetched SoundcloudTracks')),
        catchError(this.handleError<SoundcloudData[]>('getSoundcloudTracks'))
      );
  }

  ngOnInit(): void {
    this.getMixcloudTracks().subscribe(n=>this.MixcloudTracks={data: n.data,name:n.name});
    this.getSoundcloudTracks().subscribe(n=>this.SoundcloudTracks=n);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
