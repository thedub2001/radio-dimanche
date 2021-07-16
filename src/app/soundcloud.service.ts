import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface SoundcloudData {
  title: string;
  uri: string;
}

@Injectable({
  providedIn: 'root'
})
export class SoundcloudService {

  public SoundcloudTracks : SoundcloudData[] = [];
  private SoundcloudUserUrl = 'https://api.soundcloud.com/users/14341196/playlists?client_id=31478aadfa8f9db41f03ffb13b43a57d';  // URL to Soundcloud web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html' }) //or json
  };

  constructor(private http: HttpClient) {

    this.getSoundcloudTracks().subscribe(n=>{this.SoundcloudTracks=n;this.SoundcloudTracks = this.SoundcloudTracks;});
    // TO DO : do something with the SoundcloudTracks array
   }

  getSoundcloudTracks() : Observable<SoundcloudData[]>{
    console.log('getting SoundcloudTracks')
    return this.http.get<SoundcloudData[]>(this.SoundcloudUserUrl)
      .pipe(
        tap(_ => console.log('fetched SoundcloudTracks')),
        catchError(this.handleError<SoundcloudData[]>('getSoundcloudTracks'))
      );
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
