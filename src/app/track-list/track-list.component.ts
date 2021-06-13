import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

export interface cloudcastsData {
  data: {};
  name: string;
}

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})

export class TrackListComponent implements OnInit {

  public tracks: cloudcastsData | undefined;
  private cloudcastsUrl = 'https://api.mixcloud.com/spartacus/cloudcasts/';  // URL to Mixcloud web api
  // private cloudcasts = 'https://api.soundcloud.com/users/14341196/playlists?client_id=31478aadfa8f9db41f03ffb13b43a57d';  // URL to Soundcloud web api


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

  getHeroes() {
    console.log('getting heroes')
    return this.http.get<cloudcastsData>(this.cloudcastsUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<cloudcastsData>('getHeroes'))
      );
  }


  ngOnInit(): void {
    this.getHeroes().subscribe(n=>this.tracks={data: n.data,name:n.name});
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
